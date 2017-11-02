import { RtIfThen } from './rt-if-then';

@RtIfThen.Config({
	elementIs: 'rt-if-else',
	elementExtends: 'template'
})
export class RtIfElse extends RtIfThen {
	_elseMode = true;
}
