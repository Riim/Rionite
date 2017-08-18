import { Map } from '@riim/map-set-polyfill';
import { Component } from './Component';

export let componentConstructorMap = new Map<string, typeof Component>();
