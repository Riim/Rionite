import { Parser as BemlParser, Template as BemlTemplate } from '@riim/beml';
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
import formatters from './formatters';
import { ILocaleSettings, ILocalizationTexts, IGetTextConfig, IGetText, default as getText } from './getText';
import {
	IComponentElement,
	IComponentTemplate,
	IComponentElementClassNameMap,
	IComponentEvents,
	default as Component
} from './Component';
import RtContent from './Components/rt-content';
import RtSlot from './Components/rt-slot';
import { TRtIfThenIfCell, default as RtIfThen } from './Components/rt-if-then';
import RtIfElse from './Components/rt-if-else';
import {
	TRtRepeatListCell,
	TRtRepeatItem,
	TRtRepeatItemList,
	TRtRepeatItemMap,
	default as RtRepeat
} from './Components/rt-repeat';
import { IComponentProperties, default as ComponentProperties } from './ComponentProperties';
import d from './d';
import camelize from './Utils/camelize';
import hyphenize from './Utils/hyphenize';
import isRegExp from './Utils/isRegExp';
import defer from './Utils/defer';

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
	BemlParser,
	BemlTemplate,
	IDisposable,
	IDisposableListening,
	IDisposableTimeout,
	IDisposableInterval,
	IDisposableCallback,
	TListeningTarget,
	IListener,
	DisposableMixin,

	formatters,

	ILocaleSettings,
	ILocalizationTexts,
	IGetTextConfig,
	IGetText,
	getText,

	IComponentElement,
	IComponentTemplate,
	IComponentElementClassNameMap,
	IComponentEvents,
	Component,

	TRtIfThenIfCell,
	TRtRepeatListCell,
	TRtRepeatItem,
	TRtRepeatItemList,
	TRtRepeatItemMap,
	Components,

	IComponentProperties,
	ComponentProperties,

	d,

	Utils
};
