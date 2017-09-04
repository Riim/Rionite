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
import { ComponentDecorator } from './ComponentDecorator';
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
import './nelmTemplateHelpers';
import { camelize } from './utils/camelize';
import { defer } from './utils/defer';
import { hyphenize } from './utils/hyphenize';
import { isRegExp } from './utils/isRegExp';

let Components = {
	RtContent,
	RtSlot,
	RtIfThen,
	RtIfElse,
	RtRepeat
};

let d = {
	Component: ComponentDecorator
};

let Utils = {
	camelize,
	hyphenize,
	isRegExp,
	defer
};

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

	TRtIfThenIfCell,
	TRtRepeatListCell,
	IRtRepeatItem,
	TRtRepeatItemList,
	TRtRepeatItemMap,
	Components,

	d,

	Utils
};
