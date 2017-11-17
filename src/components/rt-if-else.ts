import { RtIfThen } from './rt-if-then';

@RtIfThen.Config({
	elementIs: 'RtIfElse',
	elementExtends: 'template'
})
export class RtIfElse extends RtIfThen {
	_elseMode = true;
}
