import { Container } from '@riim/di';
import { logger } from '@riim/logger';
import {
	IBlock as INelmBlock,
	NodeType as NelmNodeType,
	Parser as NelmParser,
	Template
	} from 'nelm';
import {
	Component,
	IComponentElement,
	IComponentElementClassNameMap,
	IComponentEvents,
	IComponentOEvents,
	IPossiblyComponentElement,
	TEventHandler,
	TOEventHandler
	} from './Component';
import { ComponentConfigDecorator } from './ComponentConfigDecorator';
import { ComponentInput, IComponentInput } from './ComponentInput';
import { componentInputValueMap } from './componentInputValueMap';
import { RtContent } from './components/rt-content';
import { RtIfElse } from './components/rt-if-else';
import { RtIfThen, TIfCell as TRtIfThenIfCell } from './components/rt-if-then';
import {
	IItem as IRtRepeatItem,
	RtRepeat,
	TItemList as TRtRepeatItemList,
	TItemMap as TRtRepeatItemMap,
	TListCell as TRtRepeatListCell
	} from './components/rt-repeat';
import { RtSlot } from './components/rt-slot';
import {
	DisposableMixin,
	IDisposable,
	IDisposableCallback,
	IDisposableInterval,
	IDisposableListening,
	IDisposableTimeout,
	TListener,
	TListeningTarget
	} from './DisposableMixin';
import { formatters } from './formatters';
import { KEY_ELEMENT_CONNECTED } from './KEY_ELEMENT_CONNECTED';
import './templateHelpers';

export {
	NelmNodeType,
	INelmBlock,
	NelmParser,
	Template,
	IDisposable,
	IDisposableListening,
	IDisposableTimeout,
	IDisposableInterval,
	IDisposableCallback,
	TListeningTarget,
	TListener,
	DisposableMixin,
	formatters,
	ComponentConfigDecorator as ComponentConfig,
	IPossiblyComponentElement,
	IComponentElement,
	IComponentElementClassNameMap,
	TOEventHandler,
	TEventHandler,
	IComponentOEvents,
	IComponentEvents,
	Component,
	KEY_ELEMENT_CONNECTED,
	IComponentInput,
	ComponentInput,
	componentInputValueMap,
	RtContent,
	RtSlot,
	TRtIfThenIfCell,
	RtIfThen,
	RtIfElse,
	TRtRepeatListCell,
	IRtRepeatItem,
	TRtRepeatItemList,
	TRtRepeatItemMap,
	RtRepeat
};

Container.registerService('logger', logger);
