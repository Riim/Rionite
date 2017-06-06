import { NodeType as NelmNodeType, Parser as NelmParser } from 'nelm-parser';
import escapeString from 'escape-string';
import { escapeHTML, unescapeHTML } from '@riim/escape-html';
import htmlToFragment from 'html-to-fragment';
import {
	IDisposable,
	IDisposableListening,
	IDisposableTimeout,
	IDisposableInterval,
	IDisposableCallback,
	TListeningTarget,
	IListener,
	default as DisposableMixin
} from './DisposableMixin';
import Template from './Template';
import formatters from './formatters';
import { ILocaleSettings, ILocalizationTexts, IGetTextConfig, IGetText, default as getText } from './getText';
import {
	IPossiblyComponentElement,
	IComponentElement,
	IComponentElementClassNameMap,
	IComponentEvents,
	default as Component
} from './Component';
import KEY_ELEMENT_CONNECTED from './KEY_ELEMENT_CONNECTED';
import KEY_COMPONENT_INPUT_VALUES from './KEY_COMPONENT_INPUT_VALUES';
import { IComponentInput, default as ComponentInput } from './ComponentInput';
import RtContent from './Components/rt-content';
import RtSlot from './Components/rt-slot';
import { TIfCell as TRtIfThenIfCell, default as RtIfThen } from './Components/rt-if-then';
import RtIfElse from './Components/rt-if-else';
import {
	TListCell as TRtRepeatListCell,
	IItem as IRtRepeatItem,
	TItemList as TRtRepeatItemList,
	TItemMap as TRtRepeatItemMap,
	default as RtRepeat
} from './Components/rt-repeat';
import d from './d';
import camelize from './Utils/camelize';
import hyphenize from './Utils/hyphenize';
import isRegExp from './Utils/isRegExp';
import defer from './Utils/defer';
import './nelmTemplateHelpers';

let Components = {
	RtContent,
	RtSlot,
	RtIfThen,
	RtIfElse,
	RtRepeat
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
	NelmParser,
	IDisposable,
	IDisposableListening,
	IDisposableTimeout,
	IDisposableInterval,
	IDisposableCallback,
	TListeningTarget,
	IListener,
	DisposableMixin,
	Template,

	formatters,

	ILocaleSettings,
	ILocalizationTexts,
	IGetTextConfig,
	IGetText,
	getText,

	IPossiblyComponentElement,
	IComponentElement,
	IComponentElementClassNameMap,
	IComponentEvents,
	Component,

	KEY_ELEMENT_CONNECTED,
	KEY_COMPONENT_INPUT_VALUES,

	IComponentInput,
	ComponentInput,

	TRtIfThenIfCell,
	TRtRepeatListCell,
	IRtRepeatItem,
	TRtRepeatItemList,
	TRtRepeatItemMap,
	Components,

	d,

	Utils
};
