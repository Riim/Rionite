import { escapeHTML, unescapeHTML } from '@riim/escape-html';
import {
	getText,
	IGetText,
	IGetTextConfig,
	ILocaleSettings,
	ILocalizationTexts
	} from '@riim/gettext';
import escapeString from 'escape-string';
import htmlToFragment from 'html-to-fragment';
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
import { RtContent } from './Components/rt-content';
import { RtIfElse } from './Components/rt-if-else';
import { RtIfThen, TIfCell as TRtIfThenIfCell } from './Components/rt-if-then';
import {
	IItem as IRtRepeatItem,
	RtRepeat,
	TItemList as TRtRepeatItemList,
	TItemMap as TRtRepeatItemMap,
	TListCell as TRtRepeatListCell
	} from './Components/rt-repeat';
import { RtSlot } from './Components/rt-slot';
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
import { camelize } from './Utils/camelize';
import { defer } from './Utils/defer';
import { hyphenize } from './Utils/hyphenize';
import { isRegExp } from './Utils/isRegExp';

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
	escapeString,
	escapeHTML,
	unescapeHTML,
	isRegExp,
	defer,
	htmlToFragment
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

	ILocaleSettings,
	ILocalizationTexts,
	IGetTextConfig,
	IGetText,
	getText,

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
