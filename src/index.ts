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
	TOEventHandler,
	TEventHandler,
	IComponentOEvents,
	IComponentEvents,
	Component
} from './Component';
export { KEY_ELEMENT_CONNECTED } from './lib/KEY_ELEMENT_CONNECTED';
export { IComponentParams, ComponentParams } from './ComponentParams';
export { componentParamValueMap } from './componentParamValueMap';
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
