import escapeString from './Utils/escapeString';
import escapeHTML from './Utils/escapeHTML';
import namePattern from './namePattern';

let keypathPattern = '(?:' + namePattern + '|\\[\\d+\\])(?:\\.' + namePattern + '|\\[\\d+\\])*';
let re = RegExp(
	'\\{\\{' +
		'(?:' +
			'\\s*(?:' +
				'block\\s+(' + namePattern + ')|(\\/)block|(s)uper\\(\\)|(' + keypathPattern + ')' +
			')\\s*|\\{\\s*(' + keypathPattern + ')\\s*\\}' +
		')' +
	'\\}\\}'
);

interface ComponentTemplateBlockDescription {
	name: string | null;
	source: Array<string>;
}

interface ComponentTemplateBlock {
	(
		this: ComponentTemplateBlockMap,
		data: Object
	): string;
}

interface ComponentTemplateBlockInner {
	(
		this: ComponentTemplateBlockMap,
		$super: ComponentTemplateBlock,
		data: Object,
		escape: (value: string) => string
	): string;
}

interface ComponentTemplateRenderer {
	(
		this: ComponentTemplateBlockMap,
		data: Object,
		escape: (value: string) => string
	): string;
}

interface ComponentTemplateBlockMap {
	[name: string]: ComponentTemplateBlock;
}

export default class ComponentTemplate {
	parent: ComponentTemplate | null;

	_renderer: ComponentTemplateRenderer;
	_blockMap: ComponentTemplateBlockMap;

	constructor(tmpl: string, parent: ComponentTemplate | null = null) {
		this.parent = parent;

		let currentBlock = { name: null, source: [] } as ComponentTemplateBlockDescription;

		let blocks = [currentBlock];
		let blockMap = {} as { [name: string]: ComponentTemplateBlockDescription };

		let splittedTemplate = tmpl.split(re);

		for (let i = 0, l = splittedTemplate.length; i < l;) {
			if (i % 6) {
				let blockName = splittedTemplate[i];

				if (blockName) {
					currentBlock.source.push(`this.${ blockName }.call(this, data)`);

					currentBlock = { name: blockName, source: [] };
					blocks.push((blockMap[blockName] = currentBlock));
				} else if (splittedTemplate[i + 1]) {
					if (blocks.length > 1) {
						blocks.pop();
						currentBlock = blocks[blocks.length - 1];
					}
				} else if (splittedTemplate[i + 2]) {
					if (parent && blocks.length > 1 && parent._blockMap[currentBlock.name as string]) {
						currentBlock.source.push('$super.call(this, data)');
					}
				} else {
					let keypath = splittedTemplate[i + 3];
					currentBlock.source.push(keypath ? `escape(data.${ keypath })` : 'data.' + splittedTemplate[i + 4]);
				}

				i += 5;
			} else {
				let text = splittedTemplate[i];

				if (text) {
					currentBlock.source.push(`'${ escapeString(text) }'`);
				}

				i++;
			}
		}

		this._renderer = parent ? parent._renderer : Function(
			'data', 'escape',
			`return [${ blocks[0].source.join(', ') }].join('');`
		) as ComponentTemplateRenderer;

		Object.keys(blockMap).forEach(function(this: ComponentTemplateBlockMap, name: string) {
			let parentBlock = parent && parent._blockMap[name];
			let inner = Function(
				'$super', 'data', 'escape',
				`return [${ blockMap[name].source.join(', ') }].join('');`
			) as ComponentTemplateBlockInner;

			this[name] = function(this: ComponentTemplateBlockMap, data: Object): string {
				return inner.call(this, parentBlock, data, escapeHTML);
			};
		}, (this._blockMap = Object.create(parent && parent._blockMap) as any));
	}

	extend(tmpl: string) {
		return new ComponentTemplate(tmpl, this);
	}

	render(data?: Object): string {
		return this._renderer.call(this._blockMap, data || {}, escapeHTML);
	}
}
