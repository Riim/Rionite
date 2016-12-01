import namePattern from './namePattern';
import escapeString from './Utils/escapeString';
import escapeHTML from './Utils/escapeHTML';

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

interface IComponentTemplateBlockDescription {
	name: string | null;
	source: Array<string>;
}

export interface IComponentTemplateBlock {
	(
		this: IComponentTemplateBlockMap,
		data: Object
	): string;
}

interface IComponentTemplateBlockInner {
	(
		this: IComponentTemplateBlockMap,
		$super: IComponentTemplateBlock,
		data: Object,
		escape: (value: string) => string
	): string;
}

export interface IComponentTemplateRenderer {
	(
		this: IComponentTemplateBlockMap,
		data: Object,
		escape: (value: string) => string
	): string;
}

export interface IComponentTemplateBlockMap {
	[name: string]: IComponentTemplateBlock;
}

export default class ComponentTemplate {
	parent: ComponentTemplate | null;

	_renderer: IComponentTemplateRenderer;
	_blockMap: IComponentTemplateBlockMap;

	constructor(tmpl: string, parent?: ComponentTemplate) {
		this.parent = parent || null;

		let currentBlock: IComponentTemplateBlockDescription = { name: null, source: [] };

		let blocks = [currentBlock];
		let blockMap: { [name: string]: IComponentTemplateBlockDescription; } = {};

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
		) as IComponentTemplateRenderer;

		Object.keys(blockMap).forEach(function(this: IComponentTemplateBlockMap, name: string) {
			let parentBlock = parent && parent._blockMap[name];
			let inner = Function(
				'$super', 'data', 'escape',
				`return [${ blockMap[name].source.join(', ') }].join('');`
			) as IComponentTemplateBlockInner;

			this[name] = function(this: IComponentTemplateBlockMap, data: Object): string {
				return inner.call(this, parentBlock, data, escapeHTML);
			};
		}, (this._blockMap = Object.create(parent ? parent._blockMap : null) as IComponentTemplateBlockMap));
	}

	extend(tmpl: string) {
		return new ComponentTemplate(tmpl, this);
	}

	render(data?: Object): string {
		return this._renderer.call(this._blockMap, data || {}, escapeHTML);
	}
}
