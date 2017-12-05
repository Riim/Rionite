import { Container } from '@riim/di';
import { logger } from '@riim/logger';
import './lib/templateHelpers';

export {
	NodeType as NelmNodeType,
	IBlock as INelmBlock,
	Parser as NelmParser,
	Template
} from 'nelm';
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
export { RtSlot } from './components/rt-slot';
export { RtContent } from './components/rt-content';
export {
	IPossiblyComponentElement,
	IComponentElement,
	IComponentElementClassNameMap,
	TEventHandler,
	IComponentEvents,
	Component
} from './Component';
export { KEY_IS_ELEMENT_CONNECTED } from './ElementProtoMixin';
export { ComponentParams } from './ComponentParams';
export { componentParamValueMap } from './componentParamValueMap';
export { ComponentParamDecorator as Param } from './ComponentParamDecorator';
export { registerComponent } from './registerComponent';
export { TIfCell as TRtIfThenIfCell, RtIfThen } from './components/rt-if-then';
export { RtIfElse } from './components/rt-if-else';
export {
	TListCell as TRtRepeatListCell,
	IItem as IRtRepeatItem,
	TItemList as TRtRepeatItemList,
	TItemMap as TRtRepeatItemMap,
	RtRepeat
} from './components/rt-repeat';

Container.registerService('logger', logger);
