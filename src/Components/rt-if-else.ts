import RtIfThen from './rt-if-then';

export default class RtIfElse extends RtIfThen {
	static elementIs = 'rt-if-else';
	static elementExtends = 'template';

	_elseMode = true;
}

RtIfThen.register(RtIfElse);
