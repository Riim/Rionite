import { JS } from 'cellx';
import Component from './Component';

let componentConstructorMap = new JS.Map<string, typeof Component>();

export default componentConstructorMap;
