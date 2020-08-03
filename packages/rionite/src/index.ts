import './lib/polyfills';
import './lib/templateTransformers';

export { configure } from './config';
export { InterruptError } from './lib/InterruptError';
export { formatters } from './lib/formatters';
export { Component } from './decorators/Component';
export { Param } from './decorators/Param';
export { Listen } from './decorators/Listen';
export { Callback } from './decorators/Callback';
export { Interruptible } from './decorators/Interruptible';
export { KEY_PARAMS_CONFIG, KEY_PARAM_VALUES } from './Constants';
export {
	IDisposable,
	IDisposableListening,
	IDisposableTimeout,
	IDisposableInterval,
	IDisposableCallback,
	TListeningTarget,
	TListener,
	IComponentParamConfig,
	I$ComponentParamConfig,
	IPossiblyComponentElement,
	IComponentElement,
	TComponentListeningTarget,
	TComponentListeningEventType,
	TEventHandler,
	IComponentEvents,
	TComponentLifecycleHook,
	onReady,
	onConnected,
	onDisconnected,
	onElementMoved,
	BaseComponent
} from './BaseComponent';
export { KEY_ELEMENT_CONNECTED } from './ElementProtoMixin';
export { ComponentParams } from './ComponentParams';
export {
	NodeType as TemplateNodeType,
	IBlock as ITemplateBlock,
	KEY_CONTENT_TEMPLATE,
	Template
} from './Template2';
export { registerComponent } from './registerComponent';
export { RnCondition } from './components/RnCondition';
export {
	TList as TRnRepeatList,
	I$Item as IRnRepeatItem,
	T$ItemsMap as TRnRepeatItemsMap,
	RnRepeat
} from './components/RnRepeat';
export { RnSlot } from './components/RnSlot';
export { RnHtml } from './components/RnHtml';
