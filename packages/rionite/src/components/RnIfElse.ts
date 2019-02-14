import { Component } from '../decorators/Component';
import { RnIfThen } from './RnIfThen';

@Component({
	elementIs: 'RnIfElse',
	elementExtends: 'template'
})
export class RnIfElse extends RnIfThen {
	_elseMode = true;
}
