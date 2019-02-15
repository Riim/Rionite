import './lib/polyfills';
import './lib/templateHelpers';

export { Container, Inject } from './DI';
export { formatters } from './lib/formatters';
export { Component } from './decorators/Component';
export { Param } from './decorators/Param';
export { KEY_PARAMS_CONFIG, KEY_PARAMS } from './Constants';
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
	IComponentElementClassNameMap,
	TEventHandler,
	IComponentEvents,
	BaseComponent
} from './BaseComponent';
export { KEY_ELEMENT_CONNECTED } from './ElementProtoMixin';
export { ComponentParams } from './ComponentParams';
export { NodeType as TemplateNodeType, IBlock as ITemplateBlock, Template } from './Template2';
export { registerComponent } from './registerComponent';
export { RnIfThen } from './components/RnIfThen';
export { RnIfElse } from './components/RnIfElse';
export {
	TList as TRnRepeatList,
	I$Item as IRnRepeatItem,
	T$ItemMap as TRnRepeatItemMap,
	RnRepeat
} from './components/RnRepeat';
export { RnSlot } from './components/RnSlot';
