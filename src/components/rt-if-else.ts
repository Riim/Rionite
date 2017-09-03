import { ComponentDecorator } from '../ComponentDecorator';
import { RtIfThen } from './rt-if-then';

@ComponentDecorator({
	elementIs: 'rt-if-else',
	elementExtends: 'template'
})
export class RtIfElse extends RtIfThen {
	_elseMode = true;
}
