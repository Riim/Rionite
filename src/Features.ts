let div = document.createElement('div');
div.innerHTML = '<template>1</template>';

let template = div.firstChild;

export let templateTag = !template.firstChild;

let CustomElementRegistry = (window as any).CustomElementRegistry;

export let nativeCustomElements = !!CustomElementRegistry &&
	Object.prototype.toString.call(CustomElementRegistry).indexOf('[native code]') > -1;
