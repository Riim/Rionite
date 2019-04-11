import {
	IBlock,
	IElement,
	IElementAttributes,
	INode,
	NodeType,
	TContent
	} from '@riim/rionite-template-parser';

export function walk(
	node: IBlock | IElement | TContent,
	callbacks: Record<number, (node: INode) => void>
) {
	if (Array.isArray(node)) {
		walkContent(node, callbacks);
	} else {
		if (node.nodeType == NodeType.ELEMENT && (node as IElement).attributes) {
			walkAttributes((node as IElement).attributes!, callbacks);
		}

		if ((node as IBlock | IElement).content) {
			walkContent((node as IElement).content!, callbacks);
		}
	}
}

export function walkContent(content: TContent, callbacks: Record<number, (node: INode) => void>) {
	for (let node of content) {
		if (callbacks[node.nodeType]) {
			callbacks[node.nodeType](node);
		}

		if (node.nodeType == NodeType.ELEMENT) {
			if ((node as IElement).attributes) {
				walkAttributes((node as IElement).attributes!, callbacks);
			}

			if ((node as IElement).content) {
				walkContent((node as IElement).content!, callbacks);
			}
		}
	}
}

export function walkAttributes(
	attrs: IElementAttributes,
	callbacks: Record<number, (node: INode) => void>
) {
	if (attrs.superCall && callbacks[NodeType.SUPER_CALL]) {
		callbacks[NodeType.ELEMENT_ATTRIBUTE](attrs.superCall);
	}

	if (callbacks[NodeType.ELEMENT_ATTRIBUTE]) {
		for (let attr of attrs.list) {
			callbacks[NodeType.ELEMENT_ATTRIBUTE](attr);
		}
	}
}
