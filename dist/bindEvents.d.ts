import Component from './Component';
export default function bindEvents(component: Component, events: {
    [assetName: string]: {
        [eventName: string]: Function;
    };
}): void;
