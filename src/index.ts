import { Container } from '@riim/di';
import { logger } from '@riim/logger';
import './lib/polyfills';
import './lib/templateHelpers';

export { NodeType as NelmNodeType, IBlock as INelmBlock, Parser as NelmParser } from 'nelm-parser';
export { Template } from './Template';
export {
	IDisposable,
	IDisposableListening,
	IDisposableTimeout,
	IDisposableInterval,
	IDisposableCallback,
	TListeningTarget,
	TListener,
	DisposableMixin
} from './DisposableMixin';
export { formatters } from './lib/formatters';
export { Component } from './decorators/Component';
export { Param } from './decorators/Param';
export {
	IComponentParamConfig,
	I$ComponentParamConfig,
	IPossiblyComponentElement,
	IComponentElement,
	IComponentElementClassNameMap,
	TEventHandler,
	IComponentEvents,
	KEY_PARAMS_CONFIG,
	KEY_PARAMS,
	BaseComponent
} from './BaseComponent';
export { KEY_IS_ELEMENT_CONNECTED } from './ElementProtoMixin';
export { ComponentParams } from './ComponentParams';
export { componentParamValueMap } from './componentParamValueMap';
export { registerComponent } from './registerComponent';
export { TIfCell as TRtIfThenIfCell, RtIfThen } from './components/RtIfThen';
export { RtIfElse } from './components/RtIfElse';
export {
	TList as TRtRepeatList,
	TListCell as TRtRepeatListCell,
	I$Item as IRtRepeatItem,
	T$ItemMap as TRtRepeatItemMap,
	RtRepeat
} from './components/RtRepeat2';
export { RtSlot } from './components/RtSlot';

Container.registerService('logger', logger);
