import escapeString from 'escape-string';
import {
	IContentTextTextNode,
	IContentTextBinding,
	TContentText,
	default as ContentTextParser
} from './ContentTextParser';
import bindingToJSExpression from './bindingToJSExpression';
import formatters from './formatters';
import Component from './Component';
import KEY_COMPONENT_INPUT_VALUES from './KEY_COMPONENT_INPUT_VALUES';
import getUID from './Utils/getUID';

let ContentTextNodeType = ContentTextParser.ContentTextNodeType;

let keyCounter = 0;

let cache = Object.create(null);

export default function compileContentText(
	contentText: TContentText,
	contentTextString: string,
	ownerComponent?: Component
): () => any {
	let key = (ownerComponent ? getUID(ownerComponent) + '/' : '/') + contentTextString;

	if (cache[key]) {
		return cache[key];
	}

	let inner: Function;

	if (contentText.length == 1) {
		inner = Function(
			'formatters',
			`var temp; return ${
				contentText[0].nodeType == ContentTextNodeType.TEXT ?
					`'${ escapeString((contentText[0] as IContentTextTextNode).value) }'` :
					bindingToJSExpression(contentText[0] as IContentTextBinding)
			};`
		);
	} else {
		let jsExpr: Array<string> = [];

		for (let node of contentText) {
			jsExpr.push(
				node.nodeType == ContentTextNodeType.TEXT ?
					`'${ escapeString(node.value) }'` :
					bindingToJSExpression(node)
			);
		}

		inner = Function('formatters', `var temp; return [${ jsExpr.join(', ') }].join('');`);
	}

	return (cache[key] = ownerComponent ? function() {
		let value = inner.call(this, formatters);

		if (value && typeof value == 'object') {
			let key = String(++keyCounter);

			(
				ownerComponent[KEY_COMPONENT_INPUT_VALUES] ||
					(ownerComponent[KEY_COMPONENT_INPUT_VALUES] = new Map())
			).set(key, value);

			return key;
		}

		return value;
	} : function() {
		return inner.call(this, formatters);
	});
}
