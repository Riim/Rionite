import { Component } from '../decorators/Component';
import { RnIfThen } from './RnIfThen';

@Component({
	elementExtends: 'template'
})
export class RnIfElse extends RnIfThen {
	_elseMode = true;
}
