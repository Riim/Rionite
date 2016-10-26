export default function bindEvents(component, events) {
	for (let assetName in events) {
		let asset;

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
