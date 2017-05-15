import { IComponentEvents, default as Component } from './Component';

export default function bindEvents(component: Component, events: IComponentEvents<Component>) {
	for (let elName in events) {
		let asset: Component | Element | null;

		if (elName == ':component') {
			asset = component;
		} else if (elName == ':element') {
			asset = component.element;
		} else {
			asset = component.$(elName);

			if (!asset) {
				continue;
			}
		}

		let assetEvents = events[elName];

		for (let evtName in assetEvents) {
			component.listenTo(asset, evtName, assetEvents[evtName]);
		}
	}
}
