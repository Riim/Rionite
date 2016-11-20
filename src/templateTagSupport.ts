let div = document.createElement('div');
div.innerHTML = '<template>1</template>';

let template = div.firstChild;

export let templateTagSupport = !template.firstChild;
