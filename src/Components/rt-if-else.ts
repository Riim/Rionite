import d from '../d';
import RtIfThen from './rt-if-then';

@d.Component({
	elementIs: 'rt-if-else',
	elementExtends: 'template'
})
export default class RtIfElse extends RtIfThen {
	_elseMode = true;
}
