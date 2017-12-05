import { Component } from '../decorators/Component';
import { RtIfThen } from './RtIfThen';

@Component({
	elementExtends: 'template'
})
export class RtIfElse extends RtIfThen {
	_elseMode = true;
}
