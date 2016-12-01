"use strict";
var div = document.createElement('div');
div.innerHTML = '<template>1</template>';
var template = div.firstChild;
exports.templateTag = !template.firstChild;
var CustomElementRegistry = window.CustomElementRegistry;
exports.nativeCustomElements = !!CustomElementRegistry &&
    Object.prototype.toString.call(CustomElementRegistry).indexOf('[native code]') > -1;
