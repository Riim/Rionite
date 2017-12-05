import { Map } from '@riim/map-set-polyfill';
import { BaseComponent } from './BaseComponent';

export let componentConstructorMap = new Map<string, typeof BaseComponent>();
