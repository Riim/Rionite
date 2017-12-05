import { Component } from '../decorators/Component';
import { RtIfThen } from './rt-if-then';

@Component({
	elementIs: 'RtIfElse',
	elementExtends: 'template'
})
export class RtIfElse extends RtIfThen {
	_elseMode = true;
}
