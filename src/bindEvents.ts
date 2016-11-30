import Component from './Component';

export default function bindEvents(
	component: Component,
	events: { [assetName: string]: { [eventName: string]: Function } }
): void {
	for (let assetName in events) {
		let asset: Component | Element | null;

		if (assetName == ':component') {
			asset = component;
		} else if (assetName == ':element') {
			asset = component.element;
		} else {
			asset = component.$(assetName);

			if (!asset) {
				continue;
			}
		}

		let assetEvents = events[assetName];

		for (let evtName in assetEvents) {
			component.listenTo(asset, evtName, assetEvents[evtName]);
		}
	}
}
