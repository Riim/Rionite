/*!

Copyright (C) 2014-2016 by Andrea Giammarchi - @WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
;(function(window, polyfill){'use strict';

  // DO NOT USE THIS FILE DIRECTLY, IT WON'T WORK
  // THIS IS A PROJECT BASED ON A BUILD SYSTEM
  // THIS FILE IS JUST WRAPPED UP RESULTING IN
  // build/document-register-element.js
  // and its .max.js counter part

  var
    document = window.document,
    Object = window.Object
  ;

  var htmlClass = (function (info) {
    // (C) Andrea Giammarchi - @WebReflection - MIT Style
    var
      catchClass = /^[A-Z]+[a-z]/,
      filterBy = function (re) {
        var arr = [], tag;
        for (tag in register) {
          if (re.test(tag)) arr.push(tag);
        }
        return arr;
      },
      add = function (Class, tag) {
        tag = tag.toLowerCase();
        if (!(tag in register)) {
          register[Class] = (register[Class] || []).concat(tag);
          register[tag] = (register[tag.toUpperCase()] = Class);
        }
      },
      register = (Object.create || Object)(null),
      htmlClass = {},
      i, section, tags, Class
    ;
    for (section in info) {
      for (Class in info[section]) {
        tags = info[section][Class];
        register[Class] = tags;
        for (i = 0; i < tags.length; i++) {
          register[tags[i].toLowerCase()] =
          register[tags[i].toUpperCase()] = Class;
        }
      }
    }
    htmlClass.get = function get(tagOrClass) {
      return typeof tagOrClass === 'string' ?
        (register[tagOrClass] || (catchClass.test(tagOrClass) ? [] : '')) :
        filterBy(tagOrClass);
    };
    htmlClass.set = function set(tag, Class) {
      return (catchClass.test(tag) ?
        add(tag, Class) :
        add(Class, tag)
      ), htmlClass;
    };
    return htmlClass;
  }({
    "collections": {
      "HTMLAllCollection": [
        "all"
      ],
      "HTMLCollection": [
        "forms"
      ],
      "HTMLFormControlsCollection": [
        "elements"
      ],
      "HTMLOptionsCollection": [
        "options"
      ]
    },
    "elements": {
      "Element": [
        "element"
      ],
      "HTMLAnchorElement": [
        "a"
      ],
      "HTMLAppletElement": [
        "applet"
      ],
      "HTMLAreaElement": [
        "area"
      ],
      "HTMLAttachmentElement": [
        "attachment"
      ],
      "HTMLAudioElement": [
        "audio"
      ],
      "HTMLBRElement": [
        "br"
      ],
      "HTMLBaseElement": [
        "base"
      ],
      "HTMLBodyElement": [
        "body"
      ],
      "HTMLButtonElement": [
        "button"
      ],
      "HTMLCanvasElement": [
        "canvas"
      ],
      "HTMLContentElement": [
        "content"
      ],
      "HTMLDListElement": [
        "dl"
      ],
      "HTMLDataElement": [
        "data"
      ],
      "HTMLDataListElement": [
        "datalist"
      ],
      "HTMLDetailsElement": [
        "details"
      ],
      "HTMLDialogElement": [
        "dialog"
      ],
      "HTMLDirectoryElement": [
        "dir"
      ],
      "HTMLDivElement": [
        "div"
      ],
      "HTMLDocument": [
        "document"
      ],
      "HTMLElement": [
        "element",
        "abbr",
        "address",
        "article",
        "aside",
        "b",
        "bdi",
        "bdo",
        "cite",
        "code",
        "command",
        "dd",
        "dfn",
        "dt",
        "em",
        "figcaption",
        "figure",
        "footer",
        "header",
        "i",
        "kbd",
        "mark",
        "nav",
        "noscript",
        "rp",
        "rt",
        "ruby",
        "s",
        "samp",
        "section",
        "small",
        "strong",
        "sub",
        "summary",
        "sup",
        "u",
        "var",
        "wbr"
      ],
      "HTMLEmbedElement": [
        "embed"
      ],
      "HTMLFieldSetElement": [
        "fieldset"
      ],
      "HTMLFontElement": [
        "font"
      ],
      "HTMLFormElement": [
        "form"
      ],
      "HTMLFrameElement": [
        "frame"
      ],
      "HTMLFrameSetElement": [
        "frameset"
      ],
      "HTMLHRElement": [
        "hr"
      ],
      "HTMLHeadElement": [
        "head"
      ],
      "HTMLHeadingElement": [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6"
      ],
      "HTMLHtmlElement": [
        "html"
      ],
      "HTMLIFrameElement": [
        "iframe"
      ],
      "HTMLImageElement": [
        "img"
      ],
      "HTMLInputElement": [
        "input"
      ],
      "HTMLKeygenElement": [
        "keygen"
      ],
      "HTMLLIElement": [
        "li"
      ],
      "HTMLLabelElement": [
        "label"
      ],
      "HTMLLegendElement": [
        "legend"
      ],
      "HTMLLinkElement": [
        "link"
      ],
      "HTMLMapElement": [
        "map"
      ],
      "HTMLMarqueeElement": [
        "marquee"
      ],
      "HTMLMediaElement": [
        "media"
      ],
      "HTMLMenuElement": [
        "menu"
      ],
      "HTMLMenuItemElement": [
        "menuitem"
      ],
      "HTMLMetaElement": [
        "meta"
      ],
      "HTMLMeterElement": [
        "meter"
      ],
      "HTMLModElement": [
        "del",
        "ins"
      ],
      "HTMLOListElement": [
        "ol"
      ],
      "HTMLObjectElement": [
        "object"
      ],
      "HTMLOptGroupElement": [
        "optgroup"
      ],
      "HTMLOptionElement": [
        "option"
      ],
      "HTMLOutputElement": [
        "output"
      ],
      "HTMLParagraphElement": [
        "p"
      ],
      "HTMLParamElement": [
        "param"
      ],
      "HTMLPictureElement": [
        "picture"
      ],
      "HTMLPreElement": [
        "pre"
      ],
      "HTMLProgressElement": [
        "progress"
      ],
      "HTMLQuoteElement": [
        "blockquote",
        "q",
        "quote"
      ],
      "HTMLScriptElement": [
        "script"
      ],
      "HTMLSelectElement": [
        "select"
      ],
      "HTMLShadowElement": [
        "shadow"
      ],
      "HTMLSlotElement": [
        "slot"
      ],
      "HTMLSourceElement": [
        "source"
      ],
      "HTMLSpanElement": [
        "span"
      ],
      "HTMLStyleElement": [
        "style"
      ],
      "HTMLTableCaptionElement": [
        "caption"
      ],
      "HTMLTableCellElement": [
        "td",
        "th"
      ],
      "HTMLTableColElement": [
        "col",
        "colgroup"
      ],
      "HTMLTableElement": [
        "table"
      ],
      "HTMLTableRowElement": [
        "tr"
      ],
      "HTMLTableSectionElement": [
        "thead",
        "tbody",
        "tfoot"
      ],
      "HTMLTemplateElement": [
        "template"
      ],
      "HTMLTextAreaElement": [
        "textarea"
      ],
      "HTMLTimeElement": [
        "time"
      ],
      "HTMLTitleElement": [
        "title"
      ],
      "HTMLTrackElement": [
        "track"
      ],
      "HTMLUListElement": [
        "ul"
      ],
      "HTMLUnknownElement": [
        "unknown",
        "vhgroupv",
        "vkeygen"
      ],
      "HTMLVideoElement": [
        "video"
      ]
    },
    "nodes": {
      "Attr": [
        "node"
      ],
      "Audio": [
        "audio"
      ],
      "CDATASection": [
        "node"
      ],
      "CharacterData": [
        "node"
      ],
      "Comment": [
        "#comment"
      ],
      "Document": [
        "#document"
      ],
      "DocumentFragment": [
        "#document-fragment"
      ],
      "DocumentType": [
        "node"
      ],
      "HTMLDocument": [
        "#document"
      ],
      "Image": [
        "img"
      ],
      "Option": [
        "option"
      ],
      "ProcessingInstruction": [
        "node"
      ],
      "ShadowRoot": [
        "#shadow-root"
      ],
      "Text": [
        "#text"
      ],
      "XMLDocument": [
        "xml"
      ]
    }
  }));
  
  
    
  // passed at runtime, configurable via nodejs module
  if (typeof polyfill !== 'object') polyfill = {type: polyfill || 'auto'};
  
  var
    // V0 polyfill entry
    REGISTER_ELEMENT = 'registerElement',
  
    // IE < 11 only + old WebKit for attributes + feature detection
    EXPANDO_UID = '__' + REGISTER_ELEMENT + (window.Math.random() * 10e4 >> 0),
  
    // shortcuts and costants
    ADD_EVENT_LISTENER = 'addEventListener',
    ATTACHED = 'attached',
    CALLBACK = 'Callback',
    DETACHED = 'detached',
    EXTENDS = 'extends',
  
    ATTRIBUTE_CHANGED_CALLBACK = 'attributeChanged' + CALLBACK,
    ATTACHED_CALLBACK = ATTACHED + CALLBACK,
    CONNECTED_CALLBACK = 'connected' + CALLBACK,
    DISCONNECTED_CALLBACK = 'disconnected' + CALLBACK,
    CREATED_CALLBACK = 'created' + CALLBACK,
    DETACHED_CALLBACK = DETACHED + CALLBACK,
  
    ADDITION = 'ADDITION',
    MODIFICATION = 'MODIFICATION',
    REMOVAL = 'REMOVAL',
  
    DOM_ATTR_MODIFIED = 'DOMAttrModified',
    DOM_CONTENT_LOADED = 'DOMContentLoaded',
    DOM_SUBTREE_MODIFIED = 'DOMSubtreeModified',
  
    PREFIX_TAG = '<',
    PREFIX_IS = '=',
  
    // valid and invalid node names
    validName = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,
    invalidNames = [
      'ANNOTATION-XML',
      'COLOR-PROFILE',
      'FONT-FACE',
      'FONT-FACE-SRC',
      'FONT-FACE-URI',
      'FONT-FACE-FORMAT',
      'FONT-FACE-NAME',
      'MISSING-GLYPH'
    ],
  
    // registered types and their prototypes
    types = [],
    protos = [],
  
    // to query subnodes
    query = '',
  
    // html shortcut used to feature detect
    documentElement = document.documentElement,
  
    // ES5 inline helpers || basic patches
    indexOf = types.indexOf || function (v) {
      for(var i = this.length; i-- && this[i] !== v;){}
      return i;
    },
  
    // other helpers / shortcuts
    OP = Object.prototype,
    hOP = OP.hasOwnProperty,
    iPO = OP.isPrototypeOf,
  
    defineProperty = Object.defineProperty,
    empty = [],
    gOPD = Object.getOwnPropertyDescriptor,
    gOPN = Object.getOwnPropertyNames,
    gPO = Object.getPrototypeOf,
    sPO = Object.setPrototypeOf,
  
    // jshint proto: true
    hasProto = !!Object.__proto__,
  
    // V1 helpers
    fixGetClass = false,
    DRECEV1 = '__dreCEv1',
    customElements = window.customElements,
    usableCustomElements = !/^force/.test(polyfill.type) && !!(
      customElements &&
      customElements.define &&
      customElements.get &&
      customElements.whenDefined
    ),
    Dict = Object.create || Object,
    Map = window.Map || function Map() {
      var K = [], V = [], i;
      return {
        get: function (k) {
          return V[indexOf.call(K, k)];
        },
        set: function (k, v) {
          i = indexOf.call(K, k);
          if (i < 0) V[K.push(k) - 1] = v;
          else V[i] = v;
        }
      };
    },
    Promise = window.Promise || function (fn) {
      var
        notify = [],
        done = false,
        p = {
          'catch': function () {
            return p;
          },
          'then': function (cb) {
            notify.push(cb);
            if (done) setTimeout(resolve, 1);
            return p;
          }
        }
      ;
      function resolve(value) {
        done = true;
        while (notify.length) notify.shift()(value);
      }
      fn(resolve);
      return p;
    },
    justCreated = false,
    constructors = Dict(null),
    waitingList = Dict(null),
    nodeNames = new Map(),
    secondArgument = function (is) {
      return is.toLowerCase();
    },
  
    // used to create unique instances
    create = Object.create || function Bridge(proto) {
      // silly broken polyfill probably ever used but short enough to work
      return proto ? ((Bridge.prototype = proto), new Bridge()) : this;
    },
  
    // will set the prototype if possible
    // or copy over all properties
    setPrototype = sPO || (
      hasProto ?
        function (o, p) {
          o.__proto__ = p;
          return o;
        } : (
      (gOPN && gOPD) ?
        (function(){
          function setProperties(o, p) {
            for (var
              key,
              names = gOPN(p),
              i = 0, length = names.length;
              i < length; i++
            ) {
              key = names[i];
              if (!hOP.call(o, key)) {
                defineProperty(o, key, gOPD(p, key));
              }
            }
          }
          return function (o, p) {
            do {
              setProperties(o, p);
            } while ((p = gPO(p)) && !iPO.call(p, o));
            return o;
          };
        }()) :
        function (o, p) {
          for (var key in p) {
            o[key] = p[key];
          }
          return o;
        }
    )),
  
    // DOM shortcuts and helpers, if any
  
    MutationObserver = window.MutationObserver ||
                       window.WebKitMutationObserver,
  
    HTMLElementPrototype = (
      window.HTMLElement ||
      window.Element ||
      window.Node
    ).prototype,
  
    IE8 = !iPO.call(HTMLElementPrototype, documentElement),
  
    safeProperty = IE8 ? function (o, k, d) {
      o[k] = d.value;
      return o;
    } : defineProperty,
  
    isValidNode = IE8 ?
      function (node) {
        return node.nodeType === 1;
      } :
      function (node) {
        return iPO.call(HTMLElementPrototype, node);
      },
  
    targets = IE8 && [],
  
    attachShadow = HTMLElementPrototype.attachShadow,
    dispatchEvent = HTMLElementPrototype.dispatchEvent,
    getAttribute = HTMLElementPrototype.getAttribute,
    hasAttribute = HTMLElementPrototype.hasAttribute,
    removeAttribute = HTMLElementPrototype.removeAttribute,
    setAttribute = HTMLElementPrototype.setAttribute,
  
    // replaced later on
    createElement = document.createElement,
    patchedCreateElement = createElement,
  
    // shared observer for all attributes
    attributesObserver = MutationObserver && {
      attributes: true,
      characterData: true,
      attributeOldValue: true
    },
  
    // useful to detect only if there's no MutationObserver
    DOMAttrModified = MutationObserver || function(e) {
      doesNotSupportDOMAttrModified = false;
      documentElement.removeEventListener(
        DOM_ATTR_MODIFIED,
        DOMAttrModified
      );
    },
  
    // will both be used to make DOMNodeInserted asynchronous
    asapQueue,
    asapTimer = 0,
  
    // internal flags
    V0 = REGISTER_ELEMENT in document &&
         !/^force-all/.test(polyfill.type),
    setListener = true,
    justSetup = false,
    doesNotSupportDOMAttrModified = true,
    dropDomContentLoaded = true,
  
    // needed for the innerHTML helper
    notFromInnerHTMLHelper = true,
  
    // optionally defined later on
    onSubtreeModified,
    callDOMAttrModified,
    getAttributesMirror,
    observer,
    observe,
  
    // based on setting prototype capability
    // will check proto or the expando attribute
    // in order to setup the node once
    patchIfNotAlready,
    patch
  ;
  
  // only if needed
  if (!V0) {
  
    if (sPO || hasProto) {
        patchIfNotAlready = function (node, proto) {
          if (!iPO.call(proto, node)) {
            setupNode(node, proto);
          }
        };
        patch = setupNode;
    } else {
        patchIfNotAlready = function (node, proto) {
          if (!node[EXPANDO_UID]) {
            node[EXPANDO_UID] = Object(true);
            setupNode(node, proto);
          }
        };
        patch = patchIfNotAlready;
    }
  
    if (IE8) {
      doesNotSupportDOMAttrModified = false;
      (function (){
        var
          descriptor = gOPD(HTMLElementPrototype, ADD_EVENT_LISTENER),
          addEventListener = descriptor.value,
          patchedRemoveAttribute = function (name) {
            var e = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true});
            e.attrName = name;
            e.prevValue = getAttribute.call(this, name);
            e.newValue = null;
            e[REMOVAL] = e.attrChange = 2;
            removeAttribute.call(this, name);
            dispatchEvent.call(this, e);
          },
          patchedSetAttribute = function (name, value) {
            var
              had = hasAttribute.call(this, name),
              old = had && getAttribute.call(this, name),
              e = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true})
            ;
            setAttribute.call(this, name, value);
            e.attrName = name;
            e.prevValue = had ? old : null;
            e.newValue = value;
            if (had) {
              e[MODIFICATION] = e.attrChange = 1;
            } else {
              e[ADDITION] = e.attrChange = 0;
            }
            dispatchEvent.call(this, e);
          },
          onPropertyChange = function (e) {
            // jshint eqnull:true
            var
              node = e.currentTarget,
              superSecret = node[EXPANDO_UID],
              propertyName = e.propertyName,
              event
            ;
            if (superSecret.hasOwnProperty(propertyName)) {
              superSecret = superSecret[propertyName];
              event = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true});
              event.attrName = superSecret.name;
              event.prevValue = superSecret.value || null;
              event.newValue = (superSecret.value = node[propertyName] || null);
              if (event.prevValue == null) {
                event[ADDITION] = event.attrChange = 0;
              } else {
                event[MODIFICATION] = event.attrChange = 1;
              }
              dispatchEvent.call(node, event);
            }
          }
        ;
        descriptor.value = function (type, handler, capture) {
          if (
            type === DOM_ATTR_MODIFIED &&
            this[ATTRIBUTE_CHANGED_CALLBACK] &&
            this.setAttribute !== patchedSetAttribute
          ) {
            this[EXPANDO_UID] = {
              className: {
                name: 'class',
                value: this.className
              }
            };
            this.setAttribute = patchedSetAttribute;
            this.removeAttribute = patchedRemoveAttribute;
            addEventListener.call(this, 'propertychange', onPropertyChange);
          }
          addEventListener.call(this, type, handler, capture);
        };
        defineProperty(HTMLElementPrototype, ADD_EVENT_LISTENER, descriptor);
      }());
    } else if (!MutationObserver) {
      documentElement[ADD_EVENT_LISTENER](DOM_ATTR_MODIFIED, DOMAttrModified);
      documentElement.setAttribute(EXPANDO_UID, 1);
      documentElement.removeAttribute(EXPANDO_UID);
      if (doesNotSupportDOMAttrModified) {
        onSubtreeModified = function (e) {
          var
            node = this,
            oldAttributes,
            newAttributes,
            key
          ;
          if (node === e.target) {
            oldAttributes = node[EXPANDO_UID];
            node[EXPANDO_UID] = (newAttributes = getAttributesMirror(node));
            for (key in newAttributes) {
              if (!(key in oldAttributes)) {
                // attribute was added
                return callDOMAttrModified(
                  0,
                  node,
                  key,
                  oldAttributes[key],
                  newAttributes[key],
                  ADDITION
                );
              } else if (newAttributes[key] !== oldAttributes[key]) {
                // attribute was changed
                return callDOMAttrModified(
                  1,
                  node,
                  key,
                  oldAttributes[key],
                  newAttributes[key],
                  MODIFICATION
                );
              }
            }
            // checking if it has been removed
            for (key in oldAttributes) {
              if (!(key in newAttributes)) {
                // attribute removed
                return callDOMAttrModified(
                  2,
                  node,
                  key,
                  oldAttributes[key],
                  newAttributes[key],
                  REMOVAL
                );
              }
            }
          }
        };
        callDOMAttrModified = function (
          attrChange,
          currentTarget,
          attrName,
          prevValue,
          newValue,
          action
        ) {
          var e = {
            attrChange: attrChange,
            currentTarget: currentTarget,
            attrName: attrName,
            prevValue: prevValue,
            newValue: newValue
          };
          e[action] = attrChange;
          onDOMAttrModified(e);
        };
        getAttributesMirror = function (node) {
          for (var
            attr, name,
            result = {},
            attributes = node.attributes,
            i = 0, length = attributes.length;
            i < length; i++
          ) {
            attr = attributes[i];
            name = attr.name;
            if (name !== 'setAttribute') {
              result[name] = attr.value;
            }
          }
          return result;
        };
      }
    }
  
    // set as enumerable, writable and configurable
    document[REGISTER_ELEMENT] = function registerElement(type, options) {
      upperType = type.toUpperCase();
      if (setListener) {
        // only first time document.registerElement is used
        // we need to set this listener
        // setting it by default might slow down for no reason
        setListener = false;
        if (MutationObserver) {
          observer = (function(attached, detached){
            function checkEmAll(list, callback) {
              for (var i = 0, length = list.length; i < length; callback(list[i++])){}
            }
            return new MutationObserver(function (records) {
              for (var
                current, node, newValue,
                i = 0, length = records.length; i < length; i++
              ) {
                current = records[i];
                if (current.type === 'childList') {
                  checkEmAll(current.addedNodes, attached);
                  checkEmAll(current.removedNodes, detached);
                } else {
                  node = current.target;
                  if (notFromInnerHTMLHelper &&
                      node[ATTRIBUTE_CHANGED_CALLBACK] &&
                      current.attributeName !== 'style') {
                    newValue = getAttribute.call(node, current.attributeName);
                    if (newValue !== current.oldValue) {
                      node[ATTRIBUTE_CHANGED_CALLBACK](
                        current.attributeName,
                        current.oldValue,
                        newValue
                      );
                    }
                  }
                }
              }
            });
          }(executeAction(ATTACHED), executeAction(DETACHED)));
          observe = function (node) {
            observer.observe(
              node,
              {
                childList: true,
                subtree: true
              }
            );
            return node;
          };
          observe(document);
          if (attachShadow) {
            HTMLElementPrototype.attachShadow = function () {
              return observe(attachShadow.apply(this, arguments));
            };
          }
        } else {
          asapQueue = [];
          document[ADD_EVENT_LISTENER]('DOMNodeInserted', onDOMNode(ATTACHED));
          document[ADD_EVENT_LISTENER]('DOMNodeRemoved', onDOMNode(DETACHED));
        }
  
        document[ADD_EVENT_LISTENER](DOM_CONTENT_LOADED, onReadyStateChange);
        document[ADD_EVENT_LISTENER]('readystatechange', onReadyStateChange);
  
        [HTMLElementPrototype, DocumentFragment.prototype].forEach(function(proto) {
          var origCloneNode = proto.cloneNode;

          proto.cloneNode = function (deep) {
            var
              node = origCloneNode.call(this, !!deep),
              i
            ;
            if (node.nodeType === Node.ELEMENT_NODE) {
              i = getTypeIndex(node);
              if (-1 < i) patch(node, protos[i]);
            }
            if (deep && query.length) loopAndSetup(node.querySelectorAll(query));
            return node;
          };
        });

        var origImportNode = document.importNode;

        document.importNode = function (node, deep) {
          var
            importedNode = origImportNode.call(this, node, !!deep),
            i
          ;
          if (importedNode.nodeType === Node.ELEMENT_NODE) {
            i = getTypeIndex(importedNode);
            if (-1 < i) patch(importedNode, protos[i]);
          }
          if (deep && query.length) loopAndSetup(importedNode.querySelectorAll(query));
          return importedNode;
        };
      }

      if (justSetup) return (justSetup = false);
  
      if (-2 < (
        indexOf.call(types, PREFIX_IS + upperType) +
        indexOf.call(types, PREFIX_TAG + upperType)
      )) {
        throwTypeError(type);
      }
  
      if (!validName.test(upperType) || -1 < indexOf.call(invalidNames, upperType)) {
        throw new Error('The type ' + type + ' is invalid');
      }
  
      var
        constructor = function () {
          return extending ?
            document.createElement(nodeName, upperType) :
            document.createElement(nodeName);
        },
        opt = options || OP,
        extending = hOP.call(opt, EXTENDS),
        nodeName = extending ? options[EXTENDS].toUpperCase() : upperType,
        upperType,
        i
      ;
  
      if (extending && -1 < (
        indexOf.call(types, PREFIX_TAG + nodeName)
      )) {
        throwTypeError(nodeName);
      }
  
      i = types.push((extending ? PREFIX_IS : PREFIX_TAG) + upperType) - 1;
  
      query = query.concat(
        query.length ? ',' : '',
        extending ? nodeName + '[is="' + type.toLowerCase() + '"]' : nodeName
      );
  
      constructor.prototype = (
        protos[i] = hOP.call(opt, 'prototype') ?
          opt.prototype :
          create(HTMLElementPrototype)
      );
  
      if (query.length) loopAndVerify(
        document.querySelectorAll(query),
        ATTACHED
      );
  
      return constructor;
    };
  
    document.createElement = (patchedCreateElement = function (localName, typeExtension) {
      var
        is = getIs(typeExtension),
        node = is ?
          createElement.call(document, localName, secondArgument(is)) :
          createElement.call(document, localName),
        name = '' + localName,
        i = indexOf.call(
          types,
          (is ? PREFIX_IS : PREFIX_TAG) +
          (is || name).toUpperCase()
        ),
        setup = -1 < i
      ;
      if (is) {
        node.setAttribute('is', is = is.toLowerCase());
        if (setup) {
          setup = isInQSA(name.toUpperCase(), is);
        }
      }
      notFromInnerHTMLHelper = !document.createElement.innerHTMLHelper;
      if (setup) patch(node, protos[i]);
      return node;
    });
  
  }
  
  function ASAP() {
    var queue = asapQueue.splice(0, asapQueue.length);
    asapTimer = 0;
    while (queue.length) {
      queue.shift().call(
        null, queue.shift()
      );
    }
  }
  
  function loopAndVerify(list, action) {
    for (var i = 0, length = list.length; i < length; i++) {
      verifyAndSetupAndAction(list[i], action);
    }
  }
  
  function loopAndSetup(list) {
    for (var i = 0, length = list.length, node; i < length; i++) {
      node = list[i];
      patch(node, protos[getTypeIndex(node)]);
    }
  }
  
  function executeAction(action) {
    return function (node) {
      if (isValidNode(node)) {
        verifyAndSetupAndAction(node, action);
        if (query.length) loopAndVerify(
          node.querySelectorAll(query),
          action
        );
      }
    };
  }
  
  function getTypeIndex(target) {
    var
      is = getAttribute.call(target, 'is'),
      nodeName = target.nodeName.toUpperCase(),
      i = indexOf.call(
        types,
        is ?
            PREFIX_IS + is.toUpperCase() :
            PREFIX_TAG + nodeName
      )
    ;
    return is && -1 < i && !isInQSA(nodeName, is) ? -1 : i;
  }
  
  function isInQSA(name, type) {
    return -1 < query.indexOf(name + '[is="' + type + '"]');
  }
  
  function onDOMAttrModified(e) {
    var
      node = e.currentTarget,
      attrChange = e.attrChange,
      attrName = e.attrName,
      target = e.target,
      addition = e[ADDITION] || 2,
      removal = e[REMOVAL] || 3
    ;
    if (notFromInnerHTMLHelper &&
        (!target || target === node) &&
        node[ATTRIBUTE_CHANGED_CALLBACK] &&
        attrName !== 'style' && (
          e.prevValue !== e.newValue ||
          // IE9, IE10, and Opera 12 gotcha
          e.newValue === '' && (
            attrChange === addition ||
            attrChange === removal
          )
    )) {
      node[ATTRIBUTE_CHANGED_CALLBACK](
        attrName,
        attrChange === addition ? null : e.prevValue,
        attrChange === removal ? null : e.newValue
      );
    }
  }
  
  function onDOMNode(action) {
    var executor = executeAction(action);
    return function (e) {
      asapQueue.push(executor, e.target);
      if (asapTimer) clearTimeout(asapTimer);
      asapTimer = setTimeout(ASAP, 1);
    };
  }
  
  function onReadyStateChange(e) {
    if (dropDomContentLoaded) {
      dropDomContentLoaded = false;
      e.currentTarget.removeEventListener(DOM_CONTENT_LOADED, onReadyStateChange);
    }
    if (query.length) loopAndVerify(
      (e.target || document).querySelectorAll(query),
      e.detail === DETACHED ? DETACHED : ATTACHED
    );
    if (IE8) purge();
  }
  
  function patchedSetAttribute(name, value) {
    // jshint validthis:true
    var self = this;
    setAttribute.call(self, name, value);
    onSubtreeModified.call(self, {target: self});
  }
  
  function setupNode(node, proto) {
    setPrototype(node, proto);
    if (observer) {
      observer.observe(node, attributesObserver);
    } else {
      if (doesNotSupportDOMAttrModified) {
        node.setAttribute = patchedSetAttribute;
        node[EXPANDO_UID] = getAttributesMirror(node);
        node[ADD_EVENT_LISTENER](DOM_SUBTREE_MODIFIED, onSubtreeModified);
      }
      node[ADD_EVENT_LISTENER](DOM_ATTR_MODIFIED, onDOMAttrModified);
    }
    if (node[CREATED_CALLBACK] && notFromInnerHTMLHelper) {
      node.created = true;
      node[CREATED_CALLBACK]();
      node.created = false;
    }
  }
  
  function purge() {
    for (var
      node,
      i = 0,
      length = targets.length;
      i < length; i++
    ) {
      node = targets[i];
      if (!documentElement.contains(node)) {
        length--;
        targets.splice(i--, 1);
        verifyAndSetupAndAction(node, DETACHED);
      }
    }
  }
  
  function throwTypeError(type) {
    throw new Error('A ' + type + ' type is already registered');
  }
  
  function verifyAndSetupAndAction(node, action) {
    var
      fn,
      i = getTypeIndex(node),
      counterAction
    ;
    if (-1 < i) {
      patchIfNotAlready(node, protos[i]);
      i = 0;
      if (action === ATTACHED && !node[ATTACHED]) {
        node[DETACHED] = false;
        node[ATTACHED] = true;
        counterAction = 'connected';
        i = 1;
        if (IE8 && indexOf.call(targets, node) < 0) {
          targets.push(node);
        }
      } else if (action === DETACHED && !node[DETACHED]) {
        node[ATTACHED] = false;
        node[DETACHED] = true;
        counterAction = 'disconnected';
        i = 1;
      }
      if (i && (fn = (
        node[action + CALLBACK] ||
        node[counterAction + CALLBACK]
      ))) fn.call(node);
    }
  }
  
  
  
  // V1 in da House!
  function CustomElementRegistry() {}
  
  CustomElementRegistry.prototype = {
    constructor: CustomElementRegistry,
    // a workaround for the stubborn WebKit
    define: usableCustomElements ?
      function (name, Class, options) {
        if (options) {
          CERDefine(name, Class, options);
        } else {
          var NAME = name.toUpperCase();
          constructors[NAME] = {
            constructor: Class,
            create: [NAME]
          };
          nodeNames.set(Class, NAME);
          customElements.define(name, Class);
        }
      } :
      CERDefine,
    get: usableCustomElements ?
      function (name) {
        return customElements.get(name) || get(name);
      } :
      get,
    whenDefined: usableCustomElements ?
      function (name) {
        return Promise.race([
          customElements.whenDefined(name),
          whenDefined(name)
        ]);
      } :
      whenDefined
  };
  
  function CERDefine(name, Class, options) {
    var
      is = options && options[EXTENDS] || '',
      CProto = Class.prototype,
      proto = create(CProto),
      attributes = Class.observedAttributes || empty,
      definition = {prototype: proto}
    ;
    // TODO: is this needed at all since it's inherited?
    // defineProperty(proto, 'constructor', {value: Class});
    safeProperty(proto, CREATED_CALLBACK, {
        value: function () {
          if (justCreated) justCreated = false;
          else if (!this[DRECEV1]) {
            this[DRECEV1] = true;
            new Class(this);
            if (CProto[CREATED_CALLBACK])
              CProto[CREATED_CALLBACK].call(this);
            var info = constructors[nodeNames.get(Class)];
            if (!usableCustomElements || info.create.length > 1) {
              notifyAttributes(this);
            }
          }
      }
    });
    safeProperty(proto, ATTRIBUTE_CHANGED_CALLBACK, {
      value: function (name) {
        if (-1 < indexOf.call(attributes, name))
          CProto[ATTRIBUTE_CHANGED_CALLBACK].apply(this, arguments);
      }
    });
    if (CProto[CONNECTED_CALLBACK]) {
      safeProperty(proto, ATTACHED_CALLBACK, {
        value: CProto[CONNECTED_CALLBACK]
      });
    }
    if (CProto[DISCONNECTED_CALLBACK]) {
      safeProperty(proto, DETACHED_CALLBACK, {
        value: CProto[DISCONNECTED_CALLBACK]
      });
    }
    if (is) definition[EXTENDS] = is;
    name = name.toUpperCase();
    constructors[name] = {
      constructor: Class,
      create: is ? [is, secondArgument(name)] : [name]
    };
    nodeNames.set(Class, name);
    document[REGISTER_ELEMENT](name.toLowerCase(), definition);
    whenDefined(name);
    waitingList[name].r();
  }
  
  function get(name) {
    var info = constructors[name.toUpperCase()];
    return info && info.constructor;
  }
  
  function getIs(options) {
    return typeof options === 'string' ?
        options : (options && options.is || '');
  }
  
  function notifyAttributes(self) {
    var
      callback = self[ATTRIBUTE_CHANGED_CALLBACK],
      attributes = callback ? self.attributes : empty,
      i = attributes.length,
      attribute
    ;
    while (i--) {
      attribute =  attributes[i]; // || attributes.item(i);
      callback.call(
        self,
        attribute.name || attribute.nodeName,
        null,
        attribute.value || attribute.nodeValue
      );
    }
  }
  
  function whenDefined(name) {
    name = name.toUpperCase();
    if (!(name in waitingList)) {
      waitingList[name] = {};
      waitingList[name].p = new Promise(function (resolve) {
        waitingList[name].r = resolve;
      });
    }
    return waitingList[name].p;
  }
  
  function polyfillV1() {
    if (customElements) delete window.customElements;
    defineProperty(window, 'customElements', {
      configurable: true,
      value: new CustomElementRegistry()
    });
    defineProperty(window, 'CustomElementRegistry', {
      configurable: true,
      value: CustomElementRegistry
    });
    for (var
      patchClass = function (name) {
        var Class = window[name];
        if (Class) {
          window[name] = function CustomElementsV1(self) {
            var info, isNative;
            if (!self) self = this;
            if (!self[DRECEV1]) {
              justCreated = true;
              info = constructors[nodeNames.get(self.constructor)];
              isNative = usableCustomElements && info.create.length === 1;
              self = isNative ?
                Reflect.construct(Class, empty, info.constructor) :
                document.createElement.apply(document, info.create);
              self[DRECEV1] = true;
              justCreated = false;
              if (!isNative) notifyAttributes(self);
            }
            return self;
          };
          window[name].prototype = Class.prototype;
          try {
            Class.prototype.constructor = window[name];
          } catch(WebKit) {
            fixGetClass = true;
            defineProperty(Class, DRECEV1, {value: window[name]});
          }
        }
      },
      Classes = htmlClass.get(/^HTML[A-Z]*[a-z]/),
      i = Classes.length;
      i--;
      patchClass(Classes[i])
    ) {}
    (document.createElement = function (name, options) {
      var is = getIs(options);
      return is ?
        patchedCreateElement.call(this, name, secondArgument(is)) :
        patchedCreateElement.call(this, name);
    });
    if (!V0) {
      justSetup = true;
      document[REGISTER_ELEMENT]('');
    }
  }
  
  // if customElements is not there at all
  if (!customElements || /^force/.test(polyfill.type)) polyfillV1();
  else if(!polyfill.noBuiltIn) {
    // if available test extends work as expected
    try {
      (function (DRE, options, name) {
        options[EXTENDS] = 'a';
        DRE.prototype = create(HTMLAnchorElement.prototype);
        DRE.prototype.constructor = DRE;
        window.customElements.define(name, DRE, options);
        if (
          getAttribute.call(document.createElement('a', {is: name}), 'is') !== name ||
          (usableCustomElements && getAttribute.call(new DRE(), 'is') !== name)
        ) {
          throw options;
        }
      }(
        function DRE() {
          return Reflect.construct(HTMLAnchorElement, [], DRE);
        },
        {},
        'document-register-element-a'
      ));
    } catch(o_O) {
      // or force the polyfill if not
      // and keep internal original reference
      polyfillV1();
    }
  }
  
  // FireFox only issue
  if(!polyfill.noBuiltIn) {
    try {
      createElement.call(document, 'a', 'a');
    } catch(FireFox) {
      secondArgument = function (is) {
        return {is: is.toLowerCase()};
      };
    }
  }
  
}(window));

;(function(d) {
	if ('content' in d.createElement('template')) {
		return;
	}

	var style = d.createElement('style');
	style.type = 'text/css';
	style.textContent = 'template { display: none !important }';
	d.getElementsByTagName('head')[0].appendChild(style);

	Object.defineProperty(HTMLElement.prototype, 'content', {
		configurable: true,
		enumerable: true,

		get: function() {
			if (this.__$$content__) {
				return this.__$$content__;
			}

			if (this.tagName == 'TEMPLATE') {
				var df = this.__$$content__ = d.createDocumentFragment();

				for (var child; (child = this.firstChild); ) {
					df.appendChild(child);
				}

				return df;
			}
		}
	});
})(document);

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@riim/map-set-polyfill"), require("cellx"), require("@riim/symbol-polyfill"), require("nelm"), require("@riim/escape-html"), require("@riim/gettext"), require("escape-string"), require("html-to-fragment"), require("@riim/next-tick"), require("@riim/error-logger"), require("@riim/mixin"));
	else if(typeof define === 'function' && define.amd)
		define(["@riim/map-set-polyfill", "cellx", "@riim/symbol-polyfill", "nelm", "@riim/escape-html", "@riim/gettext", "escape-string", "html-to-fragment", "@riim/next-tick", "@riim/error-logger", "@riim/mixin"], factory);
	else if(typeof exports === 'object')
		exports["rionite"] = factory(require("@riim/map-set-polyfill"), require("cellx"), require("@riim/symbol-polyfill"), require("nelm"), require("@riim/escape-html"), require("@riim/gettext"), require("escape-string"), require("html-to-fragment"), require("@riim/next-tick"), require("@riim/error-logger"), require("@riim/mixin"));
	else
		root["Rionite"] = root["rionite"] = factory(root["@riim/map-set-polyfill"], root["cellx"], root["@riim/symbol-polyfill"], root["nelm"], root["@riim/escape-html"], root["@riim/gettext"], root["escape-string"], root["html-to-fragment"], root["@riim/next-tick"], root["@riim/error-logger"], root["@riim/mixin"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_18__, __WEBPACK_EXTERNAL_MODULE_19__, __WEBPACK_EXTERNAL_MODULE_20__, __WEBPACK_EXTERNAL_MODULE_21__, __WEBPACK_EXTERNAL_MODULE_32__, __WEBPACK_EXTERNAL_MODULE_42__, __WEBPACK_EXTERNAL_MODULE_46__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 34);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var map_set_polyfill_1 = __webpack_require__(0);
var cellx_1 = __webpack_require__(1);
var html_to_fragment_1 = __webpack_require__(21);
var attachChildComponentElements_1 = __webpack_require__(5);
var bindContent_1 = __webpack_require__(6);
var bindEvents_1 = __webpack_require__(38);
var componentBinding_1 = __webpack_require__(39);
var componentConstructorMap_1 = __webpack_require__(25);
var ComponentInput_1 = __webpack_require__(26);
var DisposableMixin_1 = __webpack_require__(28);
var ElementProtoMixin_1 = __webpack_require__(3);
var Features_1 = __webpack_require__(7);
var handledEvents_1 = __webpack_require__(43);
var handleEvent_1 = __webpack_require__(44);
var registerComponent_1 = __webpack_require__(45);
var camelize_1 = __webpack_require__(14);
var getUID_1 = __webpack_require__(16);
var moveContent_1 = __webpack_require__(17);
var map = Array.prototype.map;
var reClassBlockElement = / class="([a-zA-Z][\-\w]*)__([a-zA-Z][\-\w]*)(?:\s[^"]*)?"/g;
var reInputChangeEventName = /input\-([\-0-9a-z]*)\-change/;
function createClassBlockElementReplacer(contentBlockName, events, evtPrefix) {
    return function (match, blockName, elName) {
        var elEvents;
        if (blockName == contentBlockName && (elEvents = events[elName])) {
            var eventAttrs = [];
            for (var type in elEvents) {
                eventAttrs.push(" " + evtPrefix + type + "=\":" + elName + "\"");
            }
            return match + eventAttrs.join('');
        }
        return match;
    };
}
function findChildComponents(node, ownerComponent, context, childComponents) {
    for (var child = node.firstChild; child; child = child.nextSibling) {
        if (child.nodeType == Node.ELEMENT_NODE) {
            var childComponent = child.$component;
            if (childComponent) {
                childComponent.ownerComponent = ownerComponent;
                childComponent.input.$context = context;
                (childComponents || (childComponents = [])).push(childComponent);
            }
            if (child.firstChild &&
                (!childComponent || childComponent.constructor.template == null)) {
                childComponents = findChildComponents(child, ownerComponent, context, childComponents);
            }
        }
    }
    return childComponents || null;
}
var created;
var initialize;
var ready;
var elementConnected;
var elementDisconnected;
var elementAttached;
var elementDetached;
var elementMoved;
var Component = (function (_super) {
    __extends(Component, _super);
    function Component(el) {
        var _this = _super.call(this) || this;
        _this.ownerComponent = null;
        _this._parentComponent = null;
        _this._attached = false;
        _this.initialized = false;
        _this.isReady = false;
        DisposableMixin_1.DisposableMixin.call(_this);
        var constr = _this.constructor;
        if (!componentConstructorMap_1.componentConstructorMap.has(constr.elementIs)) {
            throw new TypeError('Component must be registered');
        }
        if (!el) {
            el = document.createElement(constr.elementIs);
        }
        _this.element = el;
        el.rioniteComponent = _this;
        Object.defineProperty(el, '$component', { value: _this });
        _this.created();
        return _this;
    }
    Object.defineProperty(Component.prototype, "parentComponent", {
        get: function () {
            if (this._parentComponent !== undefined) {
                return this._parentComponent;
            }
            for (var node = void 0; (node = (node || this.element).parentNode);) {
                if (node.$component) {
                    return (this._parentComponent = node.$component);
                }
            }
            return (this._parentComponent = null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "input", {
        get: function () {
            var input = ComponentInput_1.ComponentInput.init(this);
            Object.defineProperty(this, 'input', {
                configurable: true,
                enumerable: true,
                writable: true,
                value: input
            });
            return input;
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype._on = function (type, listener, context) {
        if (!type.lastIndexOf('input-', 0) && reInputChangeEventName.test(type)) {
            cellx_1.EventEmitter.currentlySubscribing = true;
            this.input[camelize_1.camelize(RegExp.$1)];
            cellx_1.EventEmitter.currentlySubscribing = false;
        }
        _super.prototype._on.call(this, type, listener, context);
    };
    Component.prototype._handleEvent = function (evt) {
        _super.prototype._handleEvent.call(this, evt);
        if (evt.bubbles !== false && !evt.isPropagationStopped) {
            var parentComponent = this.parentComponent;
            if (parentComponent) {
                parentComponent._handleEvent(evt);
            }
            else {
                var targetOwnerComponent = evt.target.ownerComponent;
                if (targetOwnerComponent) {
                    handleEvent_1.handleEvent(evt, targetOwnerComponent.element);
                }
            }
        }
    };
    Component.prototype.listenTo = function (target, type, listener, context, useCapture) {
        return DisposableMixin_1.DisposableMixin.prototype.listenTo.call(this, typeof target == 'string' ? this.$(target) : target, type, listener, context, useCapture);
    };
    Component.prototype._listenTo = function (target, type, listener, context, useCapture) {
        if (target instanceof Component) {
            var index = void 0;
            if (type.charAt(0) == '<' && (index = type.indexOf('>', 1)) > 1) {
                var targetName = type.slice(1, index);
                if (targetName != '*') {
                    var targetConstr_1 = componentConstructorMap_1.componentConstructorMap.get(targetName);
                    if (!targetConstr_1) {
                        throw new TypeError("Component \"" + targetName + "\" is not defined");
                    }
                    var inner_1 = listener;
                    listener = function (evt) {
                        if (evt.target instanceof targetConstr_1) {
                            return inner_1.call(this, evt);
                        }
                    };
                }
                type = type.slice(index + 1);
            }
            else if (type.indexOf(':') == -1) {
                var inner_2 = listener;
                listener = function (evt) {
                    if (evt.target == target) {
                        return inner_2.call(this, evt);
                    }
                };
            }
        }
        return DisposableMixin_1.DisposableMixin.prototype._listenTo.call(this, target, type, listener, context, useCapture);
    };
    Component.prototype._attach = function () {
        var _this = this;
        this._attached = true;
        if (!this.initialized) {
            var result = this.initialize();
            if (result) {
                result.then(function () {
                    _this.initialized = true;
                    _this._attach();
                });
                return;
            }
            this.initialized = true;
        }
        var constr = this.constructor;
        if (this.isReady) {
            this._unfreezeBindings();
            if (constr.oevents) {
                bindEvents_1.bindEvents(this, constr.oevents);
            }
        }
        else {
            var el = this.element;
            el.className = constr._blockNamesString + el.className;
            if (constr.template == null) {
                this.input;
                this._bindings = null;
                var childComponents = findChildComponents(el, this.ownerComponent, this.input.$context);
                if (childComponents) {
                    attachChildComponentElements_1.attachChildComponentElements(childComponents);
                }
                if (constr.oevents) {
                    bindEvents_1.bindEvents(this, constr.oevents);
                }
            }
            else {
                if (el.firstChild) {
                    ElementProtoMixin_1.suppressConnectionStatusCallbacks();
                    this.input.$content = moveContent_1.moveContent(document.createDocumentFragment(), el);
                    ElementProtoMixin_1.resumeConnectionStatusCallbacks();
                }
                else {
                    this.input.$content = document.createDocumentFragment();
                }
                var rawContent = constr._rawContent;
                if (!rawContent) {
                    var contentHTML = constr.template.render();
                    if (constr.events) {
                        contentHTML = contentHTML.replace(reClassBlockElement, createClassBlockElementReplacer(constr._contentBlockNames[0], constr.events, 'oncomponent-'));
                    }
                    if (constr.domEvents) {
                        contentHTML = contentHTML.replace(reClassBlockElement, createClassBlockElementReplacer(constr._contentBlockNames[0], constr.domEvents, 'on-'));
                    }
                    rawContent = constr._rawContent = html_to_fragment_1.default(contentHTML);
                }
                var content = rawContent.cloneNode(true);
                if (!Features_1.templateTag) {
                    var templates = content.querySelectorAll('template');
                    for (var i = 0, l = templates.length; i < l;) {
                        i += templates[i].content.querySelectorAll('template').length + 1;
                    }
                }
                var _a = bindContent_1.bindContent(content, this, this, { 0: null, 1: null }), bindings = _a[0], childComponents = _a[1];
                this._bindings = bindings;
                ElementProtoMixin_1.suppressConnectionStatusCallbacks();
                this.element.appendChild(content);
                ElementProtoMixin_1.resumeConnectionStatusCallbacks();
                if (childComponents) {
                    attachChildComponentElements_1.attachChildComponentElements(childComponents);
                }
                if (constr.oevents) {
                    bindEvents_1.bindEvents(this, constr.oevents);
                }
            }
            this.ready();
            this.isReady = true;
        }
        this.elementAttached();
    };
    Component.prototype._detach = function () {
        this._attached = false;
        this.elementDetached();
        this.dispose();
    };
    Component.prototype.dispose = function () {
        this._freezeBindings();
        return DisposableMixin_1.DisposableMixin.prototype.dispose.call(this);
    };
    Component.prototype._freezeBindings = function () {
        if (this._bindings) {
            componentBinding_1.freezeBindings(this._bindings);
        }
    };
    Component.prototype._unfreezeBindings = function () {
        if (this._bindings) {
            componentBinding_1.unfreezeBindings(this._bindings);
        }
    };
    Component.prototype._destroyBindings = function () {
        var bindings = this._bindings;
        if (bindings) {
            for (var i = bindings.length; i;) {
                bindings[--i].off();
            }
            this._bindings = null;
        }
    };
    // Callbacks
    Component.prototype.created = function () { };
    Component.prototype.initialize = function () { };
    Component.prototype.ready = function () { };
    Component.prototype.elementConnected = function () { };
    Component.prototype.elementDisconnected = function () { };
    Component.prototype.elementAttached = function () { };
    Component.prototype.elementDetached = function () { };
    Component.prototype.elementMoved = function () { };
    // Utils
    Component.prototype.$ = function (name, container) {
        var elList = this._getElementList(name, container);
        return (elList && elList.length ? elList[0].$component || elList[0] : null);
    };
    Component.prototype.$$ = function (name, container) {
        var elList = this._getElementList(name, container);
        return elList ? map.call(elList, function (el) { return el.$component || el; }) : [];
    };
    Component.prototype._getElementList = function (name, container) {
        var elListMap = this._elementListMap || (this._elementListMap = new map_set_polyfill_1.Map());
        var containerEl = container ?
            (container instanceof Component ? container.element : container) :
            this.element;
        var key = container ? getUID_1.getUID(containerEl) + '/' + name : name;
        var elList = elListMap.get(key);
        if (!elList) {
            var constr = this.constructor;
            var className = constr._elementClassNameMap[name];
            if (className) {
                elList = containerEl.getElementsByClassName(className);
                elListMap.set(key, elList);
            }
            else {
                var contentBlockNames = constr._contentBlockNames;
                for (var i = contentBlockNames.length - 1;; i--) {
                    className = contentBlockNames[i] + '__' + name;
                    elList = containerEl.getElementsByClassName(className);
                    if (elList.length) {
                        constr._elementClassNameMap[name] = className;
                        elListMap.set(key, elList);
                        break;
                    }
                    if (!i) {
                        break;
                    }
                }
                if (!elList.length) {
                    return;
                }
            }
        }
        return elList;
    };
    Component.register = registerComponent_1.registerComponent;
    Component.elementExtends = null;
    Component.input = null;
    Component.i18n = null;
    Component.template = null;
    Component.oevents = null;
    Component.events = null;
    Component.domEvents = null;
    return Component;
}(cellx_1.EventEmitter));
exports.Component = Component;
var disposableMixinProto = DisposableMixin_1.DisposableMixin.prototype;
var componentProto = Component.prototype;
Object.getOwnPropertyNames(disposableMixinProto).forEach(function (name) {
    if (!(name in componentProto)) {
        Object.defineProperty(componentProto, name, Object.getOwnPropertyDescriptor(disposableMixinProto, name));
    }
});
created = componentProto.created;
initialize = componentProto.initialize;
ready = componentProto.ready;
elementConnected = componentProto.elementConnected;
elementDisconnected = componentProto.elementDisconnected;
elementAttached = componentProto.elementAttached;
elementDetached = componentProto.elementDetached;
elementMoved = componentProto.elementMoved;
document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
    document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
    handledEvents_1.handledEvents.forEach(function (type) {
        document.documentElement.addEventListener(type, function (evt) {
            if (evt.target != document.documentElement) {
                handleEvent_1.handleEvent(evt, document.documentElement);
            }
        });
    });
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Features_1 = __webpack_require__(7);
var KEY_ELEMENT_CONNECTED_1 = __webpack_require__(8);
var defer_1 = __webpack_require__(29);
var isConnectionStatusCallbacksSuppressed = false;
function suppressConnectionStatusCallbacks() {
    isConnectionStatusCallbacksSuppressed = true;
}
exports.suppressConnectionStatusCallbacks = suppressConnectionStatusCallbacks;
function resumeConnectionStatusCallbacks() {
    isConnectionStatusCallbacksSuppressed = false;
}
exports.resumeConnectionStatusCallbacks = resumeConnectionStatusCallbacks;
exports.ElementProtoMixin = (_a = {
        rioniteComponent: null,
        get $component() {
            return this.rioniteComponent || new this.constructor._rioniteComponentConstructor(this);
        }
    },
    _a[KEY_ELEMENT_CONNECTED_1.KEY_ELEMENT_CONNECTED] = false,
    _a.connectedCallback = function () {
        this[KEY_ELEMENT_CONNECTED_1.KEY_ELEMENT_CONNECTED] = true;
        if (isConnectionStatusCallbacksSuppressed) {
            return;
        }
        var component = this.rioniteComponent;
        if (component) {
            component.elementConnected();
            if (component._attached) {
                if (component._parentComponent === null) {
                    component._parentComponent = undefined;
                    component.elementMoved();
                }
            }
            else {
                component._parentComponent = undefined;
                component._attach();
            }
        }
        else {
            defer_1.defer(function () {
                if (this[KEY_ELEMENT_CONNECTED_1.KEY_ELEMENT_CONNECTED]) {
                    var component_1 = this.$component;
                    component_1._parentComponent = undefined;
                    if (!component_1.parentComponent && !component_1._attached) {
                        component_1.elementConnected();
                        component_1._attach();
                    }
                }
            }, this);
        }
    },
    _a.disconnectedCallback = function () {
        this[KEY_ELEMENT_CONNECTED_1.KEY_ELEMENT_CONNECTED] = false;
        if (isConnectionStatusCallbacksSuppressed) {
            return;
        }
        var component = this.rioniteComponent;
        if (component && component._attached) {
            component._parentComponent = null;
            component.elementDisconnected();
            defer_1.defer(function () {
                if (component._parentComponent === null && component._attached) {
                    component._detach();
                }
            });
        }
    },
    _a.attributeChangedCallback = function (name, oldValue, value) {
        var component = this.rioniteComponent;
        if (component && component.isReady) {
            var input = component.input;
            var privateName = '_' + name;
            if (input[privateName]) {
                input[privateName](value);
            }
            else if (Features_1.nativeCustomElements) {
                throw new TypeError("Cannot write to readonly input property \"" + name + "\"");
            }
        }
    },
    _a);
var _a;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(2);
Component_1.Component.register;
function ComponentDecorator(config) {
    return function (componentConstr) {
        componentConstr.elementIs = config.elementIs;
        if (config.elementExtends !== undefined) {
            componentConstr.elementExtends = config.elementExtends;
        }
        if (config.input !== undefined) {
            componentConstr.input = config.input;
        }
        if (config.i18n !== undefined) {
            componentConstr.i18n = config.i18n;
        }
        if (config.template !== undefined) {
            componentConstr.template = config.template;
        }
        if (config.oevents !== undefined) {
            componentConstr.oevents = config.oevents;
        }
        if (config.events !== undefined) {
            componentConstr.events = config.events;
        }
        if (config.domEvents !== undefined) {
            componentConstr.domEvents = config.domEvents;
        }
        Component_1.Component.register(componentConstr);
    };
}
exports.ComponentDecorator = ComponentDecorator;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function attachChildComponentElements(childComponents) {
    for (var _i = 0, childComponents_1 = childComponents; _i < childComponents_1.length; _i++) {
        var childComponent = childComponents_1[_i];
        if (!childComponent._attached) {
            childComponent._parentComponent = undefined;
            childComponent.elementConnected();
            childComponent._attach();
        }
    }
}
exports.attachChildComponentElements = attachChildComponentElements;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var map_set_polyfill_1 = __webpack_require__(0);
var cellx_1 = __webpack_require__(1);
var compileContentTextFragment_1 = __webpack_require__(35);
var ContentTextFragmentParser_1 = __webpack_require__(22);
var camelize_1 = __webpack_require__(14);
var setAttribute_1 = __webpack_require__(37);
var AttributeBindingCell = (function (_super) {
    __extends(AttributeBindingCell, _super);
    function AttributeBindingCell(pull, el, attrName, opts) {
        var _this = _super.call(this, pull, opts) || this;
        _this.element = el;
        _this.attributeName = attrName;
        return _this;
    }
    return AttributeBindingCell;
}(cellx_1.Cell));
var TextNodeBindingCell = (function (_super) {
    __extends(TextNodeBindingCell, _super);
    function TextNodeBindingCell(pull, textNode, opts) {
        var _this = _super.call(this, pull, opts) || this;
        _this.textNode = textNode;
        return _this;
    }
    return TextNodeBindingCell;
}(cellx_1.Cell));
function onAttributeBindingCellChange(evt) {
    setAttribute_1.setAttribute(evt.target.element, evt.target.attributeName, evt.value);
}
function onTextNodeBindingCellChange(evt) {
    evt.target.textNode.nodeValue = evt.value;
}
var ContentTextFragmentNodeType = ContentTextFragmentParser_1.ContentTextFragmentParser.ContentTextFragmentNodeType;
function bindContent(node, ownerComponent, context, result) {
    for (var child = node.firstChild; child; child = child.nextSibling) {
        switch (child.nodeType) {
            case Node.ELEMENT_NODE: {
                var childComponent = child.$component;
                var $specified = void 0;
                if (childComponent) {
                    $specified = new map_set_polyfill_1.Set();
                }
                var attrs = child.attributes;
                for (var i = attrs.length; i;) {
                    var attr = attrs.item(--i);
                    if ($specified) {
                        $specified.add(camelize_1.camelize(attr.name));
                    }
                    var value = attr.value;
                    if (value.indexOf('{') != -1) {
                        var contentTextFragment = (new ContentTextFragmentParser_1.ContentTextFragmentParser(value)).parse();
                        if (contentTextFragment.length > 1 ||
                            contentTextFragment[0].nodeType == ContentTextFragmentNodeType.BINDING) {
                            var name_1 = attr.name;
                            if (name_1.charAt(0) == '_') {
                                name_1 = name_1.slice(1);
                            }
                            var cell = new AttributeBindingCell(compileContentTextFragment_1.compileContentTextFragment(contentTextFragment, value, contentTextFragment.length == 1), child, name_1, {
                                context: context,
                                onChange: onAttributeBindingCellChange
                            });
                            setAttribute_1.setAttribute(child, name_1, cell.get());
                            (result[0] || (result[0] = [])).push(cell);
                        }
                    }
                }
                if (childComponent) {
                    childComponent.ownerComponent = ownerComponent;
                    childComponent.input.$context = context;
                    childComponent.input.$specified = $specified;
                    (result[1] || (result[1] = [])).push(childComponent);
                }
                if (child.firstChild &&
                    (!childComponent || childComponent.constructor.template == null)) {
                    bindContent(child, ownerComponent, context, result);
                }
                break;
            }
            case Node.TEXT_NODE: {
                for (var nextChild = void 0; (nextChild = child.nextSibling) && nextChild.nodeType == Node.TEXT_NODE;) {
                    child.nodeValue += nextChild.nodeValue;
                    node.removeChild(nextChild);
                }
                var value = child.nodeValue;
                if (value.indexOf('{') != -1) {
                    var contentTextFragment = (new ContentTextFragmentParser_1.ContentTextFragmentParser(value)).parse();
                    if (contentTextFragment.length > 1 ||
                        contentTextFragment[0].nodeType == ContentTextFragmentNodeType.BINDING) {
                        var cell = new TextNodeBindingCell(compileContentTextFragment_1.compileContentTextFragment(contentTextFragment, value, false), child, {
                            context: context,
                            onChange: onTextNodeBindingCellChange
                        });
                        child.nodeValue = cell.get();
                        (result[0] || (result[0] = [])).push(cell);
                    }
                }
                break;
            }
        }
    }
    return result;
}
exports.bindContent = bindContent;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dummyEl = document.createElement('div');
dummyEl.innerHTML = '<template>1</template>';
exports.templateTag = !dummyEl.firstChild.firstChild;
var nativeCustomElementsFeature = false;
function TestNativeCustomElementsFeature(self) {
    return HTMLElement.call(this, self);
}
Object.defineProperty(TestNativeCustomElementsFeature, 'observedAttributes', {
    get: function () {
        return ['test'];
    }
});
TestNativeCustomElementsFeature.prototype = Object.create(HTMLElement.prototype, {
    constructor: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: TestNativeCustomElementsFeature
    }
});
TestNativeCustomElementsFeature.prototype.attributeChangedCallback = function () {
    nativeCustomElementsFeature = true;
};
window.customElements.define('test-native-custom-elements-feature', TestNativeCustomElementsFeature);
var testNCEF = document.createElement('test-native-custom-elements-feature');
testNCEF.setAttribute('test', '');
exports.nativeCustomElements = nativeCustomElementsFeature;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var symbol_polyfill_1 = __webpack_require__(9);
exports.KEY_ELEMENT_CONNECTED = symbol_polyfill_1.Symbol('Rionite.KEY_ELEMENT_CONNECTED');


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var map_set_polyfill_1 = __webpack_require__(0);
exports.componentInputValueMap = new map_set_polyfill_1.Map();


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var namePattern_1 = __webpack_require__(13);
exports.keypathPattern = "(?:" + namePattern_1.namePattern + "|\\d+)(?:\\.(?:" + namePattern_1.namePattern + "|\\d+))*";


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.namePattern = '[$_a-zA-Z][$\\w]*';


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var reHyphen = /[-_]+([a-z]|$)/g;
var cache = Object.create(null);
function camelize(str) {
    return cache[str] || (cache[str] = str.replace(reHyphen, function (match, chr) {
        return chr.toUpperCase();
    }));
}
exports.camelize = camelize;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var reHump = /-?([A-Z])([^A-Z])/g;
var reLongHump = /-?([A-Z]+)/g;
var reMinus = /^-/;
var cache = Object.create(null);
function hyphenize(str) {
    return cache[str] || (cache[str] = str.replace(reHump, function (match, alphaChar, notAlphaChar) {
        return '-' + alphaChar.toLowerCase() + notAlphaChar;
    }).replace(reLongHump, function (match, chars) {
        return '-' + chars.toLowerCase();
    }).replace(reMinus, ''));
}
exports.hyphenize = hyphenize;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var symbol_polyfill_1 = __webpack_require__(9);
var cellx_1 = __webpack_require__(1);
var nextUID = cellx_1.Utils.nextUID;
var hasOwn = Object.prototype.hasOwnProperty;
var KEY_UID = symbol_polyfill_1.Symbol('uid');
if (typeof KEY_UID == 'symbol') {
    exports.getUID = function getUID(obj) {
        return hasOwn.call(obj, KEY_UID) ? obj[KEY_UID] : (obj[KEY_UID] = nextUID());
    };
}
else {
    exports.getUID = function getUID(obj) {
        if (!hasOwn.call(obj, KEY_UID)) {
            Object.defineProperty(obj, KEY_UID, { value: nextUID() });
        }
        return obj[KEY_UID];
    };
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function moveContent(target, source) {
    for (var child = void 0; (child = source.firstChild);) {
        target.appendChild(child);
    }
    return target;
}
exports.moveContent = moveContent;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_18__;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_19__;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_20__;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_21__;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var keypathPattern_1 = __webpack_require__(12);
var keypathToJSExpression_1 = __webpack_require__(23);
var namePattern_1 = __webpack_require__(13);
var ContentTextFragmentNodeType;
(function (ContentTextFragmentNodeType) {
    ContentTextFragmentNodeType[ContentTextFragmentNodeType["TEXT"] = 1] = "TEXT";
    ContentTextFragmentNodeType[ContentTextFragmentNodeType["BINDING"] = 2] = "BINDING";
    ContentTextFragmentNodeType[ContentTextFragmentNodeType["BINDING_KEYPATH"] = 3] = "BINDING_KEYPATH";
    ContentTextFragmentNodeType[ContentTextFragmentNodeType["BINDING_FORMATTER"] = 4] = "BINDING_FORMATTER";
    ContentTextFragmentNodeType[ContentTextFragmentNodeType["BINDING_FORMATTER_ARGUMENTS"] = 5] = "BINDING_FORMATTER_ARGUMENTS";
})(ContentTextFragmentNodeType = exports.ContentTextFragmentNodeType || (exports.ContentTextFragmentNodeType = {}));
var reNameOrNothing = RegExp(namePattern_1.namePattern + '|', 'g');
var reKeypathOrNothing = RegExp(keypathPattern_1.keypathPattern + '|', 'g');
var reBooleanOrNothing = /false|true|/g;
var reNumberOrNothing = /(?:[+-]\s*)?(?:0b[01]+|0[0-7]+|0x[0-9a-fA-F]+|(?:(?:0|[1-9]\d*)(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?|Infinity|NaN)|/g;
var reVacuumOrNothing = /null|undefined|void 0|/g;
var ContentTextFragmentParser = (function () {
    function ContentTextFragmentParser(contentTextFragment) {
        this.contentTextFragment = contentTextFragment;
    }
    ContentTextFragmentParser.prototype.parse = function () {
        var contentTextFragment = this.contentTextFragment;
        if (!contentTextFragment) {
            return [];
        }
        this.at = 0;
        var result = this.result = [];
        for (var index = void 0; (index = contentTextFragment.indexOf('{', this.at)) != -1;) {
            this._pushText(contentTextFragment.slice(this.at, index));
            this.at = index;
            this.chr = contentTextFragment.charAt(index);
            var binding = this._readBinding();
            if (binding) {
                result.push(binding);
            }
            else {
                this._pushText(this.chr);
                this._next('{');
            }
        }
        this._pushText(contentTextFragment.slice(this.at));
        return result;
    };
    ContentTextFragmentParser.prototype._pushText = function (value) {
        if (value) {
            var result = this.result;
            var resultLen = result.length;
            if (resultLen && result[resultLen - 1].nodeType == ContentTextFragmentNodeType.TEXT) {
                result[resultLen - 1].value = value;
            }
            else {
                result.push({
                    nodeType: ContentTextFragmentNodeType.TEXT,
                    value: value
                });
            }
        }
    };
    ContentTextFragmentParser.prototype._readBinding = function () {
        var at = this.at;
        this._next('{');
        this._skipWhitespaces();
        var argument = this._readValue();
        var isArgumentKeypath;
        if (!argument) {
            argument = this._readKeypath();
            isArgumentKeypath = true;
        }
        if (argument) {
            var formatters = void 0;
            for (var formatter = void 0; this._skipWhitespaces() == '|' && (formatter = this._readFormatter());) {
                (formatters || (formatters = [])).push(formatter);
            }
            if (this.chr == '}') {
                this._next();
                return {
                    nodeType: ContentTextFragmentNodeType.BINDING,
                    argument: argument,
                    isArgumentKeypath: isArgumentKeypath || false,
                    formatters: formatters || null,
                    raw: this.contentTextFragment.slice(at, this.at)
                };
            }
        }
        this.at = at;
        this.chr = this.contentTextFragment.charAt(at);
        return null;
    };
    ContentTextFragmentParser.prototype._readFormatter = function () {
        var at = this.at;
        this._next('|');
        this._skipWhitespaces();
        var name = this._readName();
        if (name) {
            var args = this.chr == '(' ? this._readFormatterArguments() : null;
            return {
                nodeType: ContentTextFragmentNodeType.BINDING_FORMATTER,
                name: name,
                arguments: args
            };
        }
        this.at = at;
        this.chr = this.contentTextFragment.charAt(at);
        return null;
    };
    ContentTextFragmentParser.prototype._readFormatterArguments = function () {
        var at = this.at;
        this._next('(');
        var args = [];
        if (this._skipWhitespaces() != ')') {
            for (;;) {
                var arg = this._readValue() || this._readKeypath(true);
                if (arg) {
                    if (this._skipWhitespaces() == ',' || this.chr == ')') {
                        args.push(arg);
                        if (this.chr == ',') {
                            this._next();
                            this._skipWhitespaces();
                            continue;
                        }
                        break;
                    }
                }
                this.at = at;
                this.chr = this.contentTextFragment.charAt(at);
                return null;
            }
        }
        this._next();
        return {
            nodeType: ContentTextFragmentNodeType.BINDING_FORMATTER_ARGUMENTS,
            value: args
        };
    };
    ContentTextFragmentParser.prototype._readValue = function () {
        switch (this.chr) {
            case '{': {
                return this._readObject();
            }
            case '[': {
                return this._readArray();
            }
            case "'":
            case '"': {
                return this._readString();
            }
        }
        var readers = ['_readBoolean', '_readNumber', '_readVacuum'];
        for (var _i = 0, readers_1 = readers; _i < readers_1.length; _i++) {
            var reader = readers_1[_i];
            var value = this[reader]();
            if (value) {
                return value;
            }
        }
        return null;
    };
    ContentTextFragmentParser.prototype._readObject = function () {
        var at = this.at;
        this._next('{');
        var obj = '{';
        while (this._skipWhitespaces() != '}') {
            var key = this.chr == "'" || this.chr == '"' ? this._readString() : this._readObjectKey();
            if (key && this._skipWhitespaces() == ':') {
                this._next();
                this._skipWhitespaces();
                var valueOrKeypath = this._readValue() || this._readKeypath(true);
                if (valueOrKeypath) {
                    if (this._skipWhitespaces() == ',') {
                        obj += key + ':' + valueOrKeypath + ',';
                        this._next();
                        continue;
                    }
                    else if (this.chr == '}') {
                        obj += key + ':' + valueOrKeypath + '}';
                        break;
                    }
                }
            }
            this.at = at;
            this.chr = this.contentTextFragment.charAt(at);
            return null;
        }
        this._next();
        return obj;
    };
    ContentTextFragmentParser.prototype._readObjectKey = function () {
        return this._readName();
    };
    ContentTextFragmentParser.prototype._readArray = function () {
        var at = this.at;
        this._next('[');
        var arr = '[';
        while (this._skipWhitespaces() != ']') {
            if (this.chr == ',') {
                arr += ',';
                this._next();
            }
            else {
                var valueOrKeypath = this._readValue() || this._readKeypath(true);
                if (valueOrKeypath) {
                    arr += valueOrKeypath;
                }
                else {
                    this.at = at;
                    this.chr = this.contentTextFragment.charAt(at);
                    return null;
                }
            }
        }
        this._next();
        return arr + ']';
    };
    ContentTextFragmentParser.prototype._readBoolean = function () {
        reBooleanOrNothing.lastIndex = this.at;
        var bool = reBooleanOrNothing.exec(this.contentTextFragment)[0];
        if (bool) {
            this.chr = this.contentTextFragment.charAt((this.at += bool.length));
            return bool;
        }
        return null;
    };
    ContentTextFragmentParser.prototype._readNumber = function () {
        reNumberOrNothing.lastIndex = this.at;
        var num = reNumberOrNothing.exec(this.contentTextFragment)[0];
        if (num) {
            this.chr = this.contentTextFragment.charAt((this.at += num.length));
            return num;
        }
        return null;
    };
    ContentTextFragmentParser.prototype._readString = function () {
        var quoteChar = this.chr;
        if (quoteChar != "'" && quoteChar != '"') {
            throw {
                name: 'SyntaxError',
                message: "Expected \"'\" instead of \"" + this.chr + "\"",
                at: this.at,
                contentTextFragment: this.contentTextFragment
            };
        }
        var at = this.at;
        var str = '';
        for (var next = void 0; (next = this._next());) {
            if (next == quoteChar) {
                this._next();
                return quoteChar + str + quoteChar;
            }
            if (next == '\\') {
                str += next + this._next();
            }
            else {
                if (next == '\r' || next == '\n') {
                    break;
                }
                str += next;
            }
        }
        this.at = at;
        this.chr = this.contentTextFragment.charAt(at);
        return null;
    };
    ContentTextFragmentParser.prototype._readVacuum = function () {
        reVacuumOrNothing.lastIndex = this.at;
        var vacuum = reVacuumOrNothing.exec(this.contentTextFragment)[0];
        if (vacuum) {
            this.chr = this.contentTextFragment.charAt((this.at += vacuum.length));
            return vacuum;
        }
        return null;
    };
    ContentTextFragmentParser.prototype._readKeypath = function (toJSExpression) {
        reKeypathOrNothing.lastIndex = this.at;
        var keypath = reKeypathOrNothing.exec(this.contentTextFragment)[0];
        if (keypath) {
            this.chr = this.contentTextFragment.charAt((this.at += keypath.length));
            return toJSExpression ? keypathToJSExpression_1.keypathToJSExpression(keypath) : keypath;
        }
        return null;
    };
    ContentTextFragmentParser.prototype._readName = function () {
        reNameOrNothing.lastIndex = this.at;
        var name = reNameOrNothing.exec(this.contentTextFragment)[0];
        if (name) {
            this.chr = this.contentTextFragment.charAt((this.at += name.length));
            return name;
        }
        return null;
    };
    ContentTextFragmentParser.prototype._skipWhitespaces = function () {
        var chr = this.chr;
        while (chr && chr <= ' ') {
            chr = this._next();
        }
        return chr;
    };
    ContentTextFragmentParser.prototype._next = function (current) {
        if (current && current != this.chr) {
            throw {
                name: 'SyntaxError',
                message: "Expected \"" + current + "\" instead of \"" + this.chr + "\"",
                at: this.at,
                contentTextFragment: this.contentTextFragment
            };
        }
        return (this.chr = this.contentTextFragment.charAt(++this.at));
    };
    ContentTextFragmentParser.ContentTextFragmentNodeType = ContentTextFragmentNodeType;
    return ContentTextFragmentParser;
}());
exports.ContentTextFragmentParser = ContentTextFragmentParser;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cache = Object.create(null);
function keypathToJSExpression(keypath) {
    if (cache[keypath]) {
        return cache[keypath];
    }
    var keys = keypath.split('.');
    var keyCount = keys.length;
    if (keyCount == 1) {
        return (cache[keypath] = "this['" + keypath + "']");
    }
    var index = keyCount - 2;
    var jsExpr = Array(index);
    while (index) {
        jsExpr[--index] = " && (temp = temp['" + keys[index + 1] + "'])";
    }
    return (cache[keypath] = "(temp = this['" + keys[0] + "'])" + jsExpr.join('') + " && temp['" + keys[keyCount - 1] + "']");
}
exports.keypathToJSExpression = keypathToJSExpression;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var gettext_1 = __webpack_require__(19);
exports.formatters = {
    or: function or(value, arg) {
        return value || arg;
    },
    default: function default_(value, arg) {
        return value === undefined ? arg : value;
    },
    not: function not(value) {
        return !value;
    },
    eq: function eq(value, arg) {
        return value == arg;
    },
    identical: function identical(value, arg) {
        return value === arg;
    },
    lt: function lt(value, arg) {
        return value < arg;
    },
    lte: function lte(value, arg) {
        return value <= arg;
    },
    gt: function gt(value, arg) {
        return value > arg;
    },
    gte: function gte(value, arg) {
        return value >= arg;
    },
    join: function join(arr, separator) {
        if (separator === void 0) { separator = ', '; }
        return arr && arr.join(separator);
    },
    t: gettext_1.getText.t,
    pt: gettext_1.getText.pt,
    nt: function nt(count, key) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        args.unshift(count);
        return gettext_1.getText('', key, true, args);
    },
    npt: function npt(count, key, context) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        args.unshift(count);
        return gettext_1.getText(context, key, true, args);
    },
    has: function has(obj, key) {
        return !!obj && (typeof obj.has == 'function' ? obj.has(key) : obj.hasOwnProperty(key));
    },
    get: function get(obj, key) {
        return obj && (typeof obj.get == 'function' ? obj.get(key) : obj[key]);
    },
    // Safary: "Cannot declare a parameter named 'key' as it shadows the name of a strict mode function."
    key: function key_(obj, key) {
        return obj && obj[key];
    },
    json: function json(value) {
        return JSON.stringify(value);
    }
};
exports.formatters.seq = exports.formatters.identical;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var map_set_polyfill_1 = __webpack_require__(0);
exports.componentConstructorMap = new map_set_polyfill_1.Map();


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(1);
var componentInputTypeMap_1 = __webpack_require__(40);
var componentInputTypeSerializerMap_1 = __webpack_require__(41);
var hyphenize_1 = __webpack_require__(15);
function initComponentInputProperty(componentInput, name, el) {
    var component = el.$component;
    var cipc = component.constructor.input[name];
    if (cipc == null) {
        return;
    }
    var type = typeof cipc;
    var defaultValue;
    var required;
    var readonly;
    if (type == 'function') {
        type = cipc;
        required = readonly = false;
    }
    else if (type == 'object' && (cipc.type !== undefined || cipc.default !== undefined)) {
        type = cipc.type;
        defaultValue = cipc.default;
        if (type === undefined) {
            type = typeof defaultValue;
        }
        else if (defaultValue !== undefined && componentInputTypeMap_1.componentInputTypeMap.has(type) &&
            componentInputTypeMap_1.componentInputTypeMap.get(type) != typeof defaultValue) {
            throw new TypeError('Specified type does not match defaultValue type');
        }
        required = cipc.required;
        readonly = cipc.readonly;
    }
    else {
        defaultValue = cipc;
        required = readonly = false;
    }
    var typeSerializer = componentInputTypeSerializerMap_1.componentInputTypeSerializerMap.get(type);
    if (!typeSerializer) {
        throw new TypeError('Unsupported component input type');
    }
    var hyphenizedName = hyphenize_1.hyphenize(name);
    var rawValue = el.getAttribute(hyphenizedName);
    if (required && rawValue === null) {
        throw new TypeError("Input property \"" + name + "\" is required");
    }
    if (rawValue === null && defaultValue != null && defaultValue !== false) {
        el.setAttribute(hyphenizedName, typeSerializer.write(defaultValue));
    }
    var value = typeSerializer.read(rawValue, defaultValue);
    var descriptor;
    if (readonly) {
        descriptor = {
            configurable: true,
            enumerable: true,
            get: function () {
                return value;
            },
            set: function (val) {
                if (val !== value) {
                    throw new TypeError("Input property \"" + name + "\" is readonly");
                }
            }
        };
    }
    else {
        var valueCell_1;
        var setRawValue = function (rawValue) {
            var val = typeSerializer.read(rawValue, defaultValue);
            if (valueCell_1) {
                valueCell_1.set(val);
            }
            else {
                value = val;
            }
        };
        componentInput['_' + name] = setRawValue;
        if (name != hyphenizedName) {
            componentInput['_' + hyphenizedName] = setRawValue;
        }
        descriptor = {
            configurable: true,
            enumerable: true,
            get: function () {
                if (valueCell_1) {
                    return valueCell_1.get();
                }
                var currentlyPulling = cellx_1.Cell.currentlyPulling;
                if (currentlyPulling || cellx_1.EventEmitter.currentlySubscribing) {
                    valueCell_1 = new cellx_1.Cell(value, {
                        onChange: function (evt) {
                            component.emit(evt.target == valueCell_1 ?
                                {
                                    type: "input-" + hyphenizedName + "-change",
                                    oldValue: evt.oldValue,
                                    value: evt.value
                                } :
                                {
                                    type: "input-" + hyphenizedName + "-change",
                                    oldValue: evt.target,
                                    value: evt.target
                                });
                        }
                    });
                    if (currentlyPulling) {
                        return valueCell_1.get();
                    }
                }
                return value;
            },
            set: function (val) {
                var rawValue = typeSerializer.write(val, defaultValue);
                if (rawValue === null) {
                    el.removeAttribute(hyphenizedName);
                }
                else {
                    el.setAttribute(hyphenizedName, rawValue);
                }
                if (valueCell_1) {
                    valueCell_1.set(val);
                }
                else {
                    value = val;
                }
            }
        };
    }
    Object.defineProperty(componentInput, name, descriptor);
}
exports.ComponentInput = {
    init: function (component) {
        var componentInputConfig = component.constructor.input;
        var el = component.element;
        var componentInput = { $content: null, $context: null, $specified: null };
        if (componentInputConfig) {
            for (var name_1 in componentInputConfig) {
                initComponentInputProperty(componentInput, name_1, el);
            }
        }
        return componentInput;
    }
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var toString = Object.prototype.toString;
function isRegExp(value) {
    return toString.call(value) == '[object RegExp]';
}
exports.isRegExp = isRegExp;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(1);
var nextUID = cellx_1.Utils.nextUID;
var DisposableMixin = (function () {
    function DisposableMixin() {
        this._disposables = {};
    }
    DisposableMixin.prototype.listenTo = function (target, type, listener, context, useCapture) {
        var _this = this;
        var listenings;
        if (typeof type == 'object') {
            listenings = [];
            if (Array.isArray(type)) {
                for (var i = 0, l = type.length; i < l; i++) {
                    listenings.push(this.listenTo(target, type[i], listener, context, useCapture));
                }
            }
            else {
                for (var name_1 in type) {
                    listenings.push(this.listenTo(target, name_1, type[name_1], listener, context));
                }
            }
        }
        else {
            if (Array.isArray(target) || target instanceof NodeList || target instanceof HTMLCollection) {
                listenings = [];
                for (var i = 0, l = target.length; i < l; i++) {
                    listenings.push(this.listenTo(target[i], type, listener, context, useCapture));
                }
            }
            else if (Array.isArray(listener)) {
                listenings = [];
                for (var i = 0, l = listener.length; i < l; i++) {
                    listenings.push(this.listenTo(target, type, listener[i], context, useCapture));
                }
            }
            else {
                return this._listenTo(target, type, listener, context !== undefined ? context : this, useCapture || false);
            }
        }
        var id = nextUID();
        var stopListening = function () {
            for (var i = listenings.length; i;) {
                listenings[--i].stop();
            }
            delete _this._disposables[id];
        };
        var listening = this._disposables[id] = {
            stop: stopListening,
            dispose: stopListening
        };
        return listening;
    };
    DisposableMixin.prototype._listenTo = function (target, type, listener, context, useCapture) {
        var _this = this;
        if (target instanceof cellx_1.EventEmitter) {
            target.on(type, listener, context);
        }
        else if (target.addEventListener) {
            if (target !== context) {
                listener = listener.bind(context);
            }
            target.addEventListener(type, listener, useCapture);
        }
        else {
            throw new TypeError('Unable to add a listener');
        }
        var id = nextUID();
        var stopListening = function () {
            if (_this._disposables[id]) {
                if (target instanceof cellx_1.EventEmitter) {
                    target.off(type, listener, context);
                }
                else {
                    target.removeEventListener(type, listener, useCapture);
                }
                delete _this._disposables[id];
            }
        };
        var listening = this._disposables[id] = {
            stop: stopListening,
            dispose: stopListening
        };
        return listening;
    };
    DisposableMixin.prototype.setTimeout = function (callback, delay) {
        var _this = this;
        var id = nextUID();
        var timeoutId = setTimeout(function () {
            delete _this._disposables[id];
            callback.call(_this);
        }, delay);
        var clearTimeout_ = function () {
            if (_this._disposables[id]) {
                clearTimeout(timeoutId);
                delete _this._disposables[id];
            }
        };
        var timeout = this._disposables[id] = {
            clear: clearTimeout_,
            dispose: clearTimeout_
        };
        return timeout;
    };
    DisposableMixin.prototype.setInterval = function (callback, delay) {
        var _this = this;
        var id = nextUID();
        var intervalId = setInterval(function () {
            callback.call(_this);
        }, delay);
        var clearInterval_ = function () {
            if (_this._disposables[id]) {
                clearInterval(intervalId);
                delete _this._disposables[id];
            }
        };
        var interval = this._disposables[id] = {
            clear: clearInterval_,
            dispose: clearInterval_
        };
        return interval;
    };
    DisposableMixin.prototype.registerCallback = function (callback) {
        var _this = this;
        var id = nextUID();
        var disposable = this;
        var cancelCallback = function () {
            delete _this._disposables[id];
        };
        var registeredCallback = function registeredCallback() {
            if (disposable._disposables[id]) {
                delete disposable._disposables[id];
                return callback.apply(disposable, arguments);
            }
        };
        registeredCallback.cancel = cancelCallback;
        registeredCallback.dispose = cancelCallback;
        this._disposables[id] = registeredCallback;
        return registeredCallback;
    };
    DisposableMixin.prototype.dispose = function () {
        var disposables = this._disposables;
        for (var id in disposables) {
            disposables[id].dispose();
        }
        return this;
    };
    return DisposableMixin;
}());
exports.DisposableMixin = DisposableMixin;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var error_logger_1 = __webpack_require__(42);
var queue;
function run() {
    var track = queue;
    queue = null;
    for (var _i = 0, track_1 = track; _i < track_1.length; _i++) {
        var item = track_1[_i];
        try {
            item.callback.call(item.context);
        }
        catch (err) {
            error_logger_1.logError(err);
        }
    }
}
function defer(callback, context) {
    if (queue) {
        queue.push({ callback: callback, context: context });
    }
    else {
        queue = [{ callback: callback, context: context }];
        setTimeout(run, 1);
    }
}
exports.defer = defer;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function clearNode(node) {
    for (var child = void 0; (child = node.firstChild);) {
        node.removeChild(child);
    }
    return node;
}
exports.clearNode = clearNode;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var next_tick_1 = __webpack_require__(32);
var cellx_1 = __webpack_require__(1);
var attachChildComponentElements_1 = __webpack_require__(5);
var bindContent_1 = __webpack_require__(6);
var compileKeypath_1 = __webpack_require__(33);
var Component_1 = __webpack_require__(2);
var ComponentDecorator_1 = __webpack_require__(4);
var ElementProtoMixin_1 = __webpack_require__(3);
var Features_1 = __webpack_require__(7);
var KEY_ELEMENT_CONNECTED_1 = __webpack_require__(8);
var keypathPattern_1 = __webpack_require__(12);
var slice = Array.prototype.slice;
var reKeypath = RegExp("^" + keypathPattern_1.keypathPattern + "$");
var RtIfThen = (function (_super) {
    __extends(RtIfThen, _super);
    function RtIfThen() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._elseMode = false;
        _this._active = false;
        return _this;
    }
    RtIfThen.prototype.elementConnected = function () {
        if (this._active) {
            return;
        }
        this._active = true;
        if (!this.initialized) {
            var if_ = (this.input['if'] || '').trim();
            if (!reKeypath.test(if_)) {
                throw new SyntaxError("Invalid value of attribute \"if\" (" + if_ + ")");
            }
            var getIfValue_1 = compileKeypath_1.compileKeypath(if_);
            this._if = new cellx_1.Cell(function () {
                return !!getIfValue_1.call(this);
            }, { context: this.input.$context });
            this.initialized = true;
        }
        this._if.on('change', this._onIfChange, this);
        this._render(false);
    };
    RtIfThen.prototype.elementDisconnected = function () {
        var _this = this;
        next_tick_1.nextTick(function () {
            if (!_this.element[KEY_ELEMENT_CONNECTED_1.KEY_ELEMENT_CONNECTED]) {
                _this._deactivate();
            }
        });
    };
    RtIfThen.prototype._onIfChange = function () {
        if (this.element.parentNode) {
            this._render(true);
        }
    };
    RtIfThen.prototype._attach = function () {
        this._attached = true;
    };
    RtIfThen.prototype._detach = function () {
        this._attached = false;
    };
    RtIfThen.prototype._render = function (changed) {
        var _this = this;
        if (this._elseMode ? !this._if.get() : this._if.get()) {
            var content = document.importNode(this.element.content, true);
            if (!Features_1.templateTag) {
                var templates = content.querySelectorAll('template');
                for (var i = 0, l = templates.length; i < l;) {
                    i += templates[i].content.querySelectorAll('template').length + 1;
                }
            }
            var _a = bindContent_1.bindContent(content, this.ownerComponent, this.input.$context, { 0: null, 1: null }), bindings = _a[0], childComponents = _a[1];
            this._nodes = slice.call(content.childNodes);
            this._bindings = bindings;
            ElementProtoMixin_1.suppressConnectionStatusCallbacks();
            this.element.parentNode.insertBefore(content, this.element.nextSibling);
            ElementProtoMixin_1.resumeConnectionStatusCallbacks();
            if (childComponents) {
                attachChildComponentElements_1.attachChildComponentElements(childComponents);
            }
        }
        else {
            var nodes = this._nodes;
            if (nodes) {
                this._destroyBindings();
                for (var i = nodes.length; i;) {
                    var node = nodes[--i];
                    var parentNode = node.parentNode;
                    if (parentNode) {
                        parentNode.removeChild(node);
                    }
                }
                this._nodes = null;
            }
        }
        if (changed) {
            cellx_1.Cell.afterRelease(function () {
                _this.emit('change');
            });
        }
    };
    RtIfThen.prototype._deactivate = function () {
        if (!this._active) {
            return;
        }
        this._active = false;
        this._if.off('change', this._onIfChange, this);
        var nodes = this._nodes;
        if (nodes) {
            this._destroyBindings();
            for (var i = nodes.length; i;) {
                var node = nodes[--i];
                var parentNode = node.parentNode;
                if (parentNode) {
                    parentNode.removeChild(node);
                }
            }
        }
    };
    RtIfThen = __decorate([
        ComponentDecorator_1.ComponentDecorator({
            elementIs: 'rt-if-then',
            elementExtends: 'template',
            input: {
                if: { type: String, required: true, readonly: true }
            }
        })
    ], RtIfThen);
    return RtIfThen;
}(Component_1.Component));
exports.RtIfThen = RtIfThen;


/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_32__;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var keypathToJSExpression_1 = __webpack_require__(23);
var cache = Object.create(null);
function compileKeypath(keypath) {
    return cache[keypath] || (cache[keypath] = Function("var temp; return " + keypathToJSExpression_1.keypathToJSExpression(keypath) + ";"));
}
exports.compileKeypath = compileKeypath;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var escape_html_1 = __webpack_require__(18);
var gettext_1 = __webpack_require__(19);
exports.getText = gettext_1.getText;
var escape_string_1 = __webpack_require__(20);
var html_to_fragment_1 = __webpack_require__(21);
var nelm_1 = __webpack_require__(10);
exports.NelmNodeType = nelm_1.NodeType;
exports.NelmParser = nelm_1.Parser;
exports.Template = nelm_1.Template;
var Component_1 = __webpack_require__(2);
exports.Component = Component_1.Component;
var ComponentDecorator_1 = __webpack_require__(4);
var ComponentInput_1 = __webpack_require__(26);
exports.ComponentInput = ComponentInput_1.ComponentInput;
var componentInputValueMap_1 = __webpack_require__(11);
exports.componentInputValueMap = componentInputValueMap_1.componentInputValueMap;
var rt_content_1 = __webpack_require__(48);
var rt_if_else_1 = __webpack_require__(49);
var rt_if_then_1 = __webpack_require__(31);
var rt_repeat_1 = __webpack_require__(50);
var rt_slot_1 = __webpack_require__(51);
var DisposableMixin_1 = __webpack_require__(28);
exports.DisposableMixin = DisposableMixin_1.DisposableMixin;
var formatters_1 = __webpack_require__(24);
exports.formatters = formatters_1.formatters;
var KEY_ELEMENT_CONNECTED_1 = __webpack_require__(8);
exports.KEY_ELEMENT_CONNECTED = KEY_ELEMENT_CONNECTED_1.KEY_ELEMENT_CONNECTED;
__webpack_require__(52);
var camelize_1 = __webpack_require__(14);
var defer_1 = __webpack_require__(29);
var hyphenize_1 = __webpack_require__(15);
var isRegExp_1 = __webpack_require__(27);
var Components = {
    RtContent: rt_content_1.RtContent,
    RtSlot: rt_slot_1.RtSlot,
    RtIfThen: rt_if_then_1.RtIfThen,
    RtIfElse: rt_if_else_1.RtIfElse,
    RtRepeat: rt_repeat_1.RtRepeat
};
exports.Components = Components;
var d = {
    Component: ComponentDecorator_1.ComponentDecorator
};
exports.d = d;
var Utils = {
    camelize: camelize_1.camelize,
    hyphenize: hyphenize_1.hyphenize,
    escapeString: escape_string_1.default,
    escapeHTML: escape_html_1.escapeHTML,
    unescapeHTML: escape_html_1.unescapeHTML,
    isRegExp: isRegExp_1.isRegExp,
    defer: defer_1.defer,
    htmlToFragment: html_to_fragment_1.default
};
exports.Utils = Utils;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var escape_string_1 = __webpack_require__(20);
var bindingToJSExpression_1 = __webpack_require__(36);
var componentInputValueMap_1 = __webpack_require__(11);
var ContentTextFragmentParser_1 = __webpack_require__(22);
var formatters_1 = __webpack_require__(24);
var ContentTextFragmentNodeType = ContentTextFragmentParser_1.ContentTextFragmentParser.ContentTextFragmentNodeType;
var keyCounter = 0;
var cache = Object.create(null);
function compileContentTextFragment(contentTextFragment, contentTextFragmentString, c) {
    var key = contentTextFragmentString + (c ? ',' : '.');
    if (cache[key]) {
        return cache[key];
    }
    var inner;
    if (contentTextFragment.length == 1) {
        inner = Function('formatters', "var temp; return " + (contentTextFragment[0].nodeType == ContentTextFragmentNodeType.TEXT ?
            "'" + escape_string_1.default(contentTextFragment[0].value) + "'" :
            bindingToJSExpression_1.bindingToJSExpression(contentTextFragment[0])) + ";");
    }
    else {
        var jsExpr = [];
        for (var _i = 0, contentTextFragment_1 = contentTextFragment; _i < contentTextFragment_1.length; _i++) {
            var node = contentTextFragment_1[_i];
            jsExpr.push(node.nodeType == ContentTextFragmentNodeType.TEXT ?
                "'" + escape_string_1.default(node.value) + "'" :
                bindingToJSExpression_1.bindingToJSExpression(node));
        }
        inner = Function('formatters', "var temp; return [" + jsExpr.join(', ') + "].join('');");
    }
    return (cache[key] = c ? function () {
        var value = inner.call(this, formatters_1.formatters);
        if (value) {
            var valueType = typeof value;
            if (valueType == 'object' || valueType == 'function') {
                var key_1 = String(++keyCounter);
                componentInputValueMap_1.componentInputValueMap.set(key_1, value);
                return key_1;
            }
        }
        return value;
    } : function () {
        return inner.call(this, formatters_1.formatters);
    });
}
exports.compileContentTextFragment = compileContentTextFragment;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cache = Object.create(null);
function formattersReducer(jsExpr, formatter) {
    var args = formatter.arguments;
    return "(this." + formatter.name + " || formatters." + formatter.name + ").call(this.$component, " + jsExpr + (args && args.value.length ? ', ' + args.value.join(', ') : '') + ")";
}
function bindingToJSExpression(binding) {
    var bindingRaw = binding.raw;
    if (cache[bindingRaw]) {
        return cache[bindingRaw];
    }
    var formatters = binding.formatters;
    if (!binding.isArgumentKeypath) {
        return (cache[bindingRaw] = formatters ? formatters.reduce(formattersReducer, binding.argument) : binding.argument);
    }
    var keys = binding.argument.split('.');
    var keyCount = keys.length;
    if (keyCount == 1) {
        return (cache[bindingRaw] = formatters ?
            formatters.reduce(formattersReducer, "this['" + keys[0] + "']") :
            "this['" + keys[0] + "']");
    }
    var index = keyCount - 2;
    var jsExprArr = Array(index);
    while (index) {
        jsExprArr[--index] = " && (temp = temp['" + keys[index + 1] + "'])";
    }
    var jsExpr = "(temp = this['" + keys[0] + "'])" + jsExprArr.join('') + " && temp['" + keys[keyCount - 1] + "']";
    return (cache[bindingRaw] = formatters ? formatters.reduce(formattersReducer, jsExpr) : jsExpr);
}
exports.bindingToJSExpression = bindingToJSExpression;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function setAttribute(el, name, value) {
    if (value === false || value == null) {
        el.removeAttribute(name);
    }
    else {
        el.setAttribute(name, value === true ? '' : value);
    }
}
exports.setAttribute = setAttribute;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function bindEvents(component, events) {
    for (var elName in events) {
        var asset = void 0;
        if (elName == ':component') {
            asset = component;
        }
        else if (elName == ':element') {
            asset = component.element;
        }
        else {
            asset = component.$(elName);
            if (!asset) {
                continue;
            }
        }
        var assetEvents = events[elName];
        for (var evtName in assetEvents) {
            component.listenTo(asset, evtName, assetEvents[evtName]);
        }
    }
}
exports.bindEvents = bindEvents;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(1);
function freezeBinding(binding) {
    var changeEvent = binding._events.get('change');
    binding._events.delete('change');
    binding._frozenState = {
        changeEventListener: changeEvent.listener,
        changeEventContext: changeEvent.context,
        value: binding._value
    };
}
function unfreezeBinding(binding) {
    var frozenState = binding._frozenState;
    binding._frozenState = null;
    binding.on('change', frozenState.changeEventListener, frozenState.changeEventContext);
    if (frozenState.value !== binding._value) {
        binding._changeEvent = {
            target: binding,
            type: 'change',
            oldValue: frozenState.value,
            value: binding._value,
            prev: null
        };
        binding._canCancelChange = true;
        binding._addToRelease();
    }
}
function freezeBindings(bindings) {
    cellx_1.Cell.forceRelease();
    for (var _i = 0, bindings_1 = bindings; _i < bindings_1.length; _i++) {
        var binding = bindings_1[_i];
        freezeBinding(binding);
    }
}
exports.freezeBindings = freezeBindings;
function unfreezeBindings(bindings) {
    cellx_1.Cell.afterRelease(function () {
        for (var _i = 0, bindings_2 = bindings; _i < bindings_2.length; _i++) {
            var binding = bindings_2[_i];
            unfreezeBinding(binding);
        }
        cellx_1.Cell.forceRelease();
    });
}
exports.unfreezeBindings = unfreezeBindings;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var map_set_polyfill_1 = __webpack_require__(0);
exports.componentInputTypeMap = new map_set_polyfill_1.Map([
    [Boolean, 'boolean'],
    ['boolean', 'boolean'],
    [Number, 'number'],
    ['number', 'number'],
    [String, 'string'],
    ['string', 'string'],
    [Object, 'object'],
    ['object', 'object']
]);


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var escape_html_1 = __webpack_require__(18);
var map_set_polyfill_1 = __webpack_require__(0);
var componentInputValueMap_1 = __webpack_require__(11);
var isRegExp_1 = __webpack_require__(27);
exports.componentInputTypeSerializerMap = new map_set_polyfill_1.Map([
    [Boolean, {
            read: function (value, defaultValue) {
                return value !== null ? value != 'no' : !!defaultValue;
            },
            write: function (value, defaultValue) {
                return value ? '' : (defaultValue ? 'no' : null);
            }
        }],
    [Number, {
            read: function (value, defaultValue) {
                return value !== null ? +value : (defaultValue !== undefined ? defaultValue : null);
            },
            write: function (value) {
                return value != null ? String(+value) : null;
            }
        }],
    [String, {
            read: function (value, defaultValue) {
                return value !== null ? value : (defaultValue !== undefined ? defaultValue : null);
            },
            write: function (value) {
                return value != null ? String(value) : null;
            }
        }],
    [Object, {
            read: function (value, defaultValue) {
                if (value === null) {
                    return defaultValue || null;
                }
                if (!componentInputValueMap_1.componentInputValueMap.has(value)) {
                    throw new TypeError('Value is not an object');
                }
                var val = componentInputValueMap_1.componentInputValueMap.get(value);
                componentInputValueMap_1.componentInputValueMap.delete(value);
                return val;
            },
            write: function (value) {
                return value != null ? '' : null;
            }
        }],
    [eval, {
            read: function (value, defaultValue) {
                return value !== null ?
                    Function("return " + escape_html_1.unescapeHTML(value) + ";")() :
                    (defaultValue !== undefined ? defaultValue : null);
            },
            write: function (value) {
                return value != null ? escape_html_1.escapeHTML(isRegExp_1.isRegExp(value) ? value.toString() : JSON.stringify(value)) : null;
            }
        }]
]);
exports.componentInputTypeSerializerMap.set('boolean', exports.componentInputTypeSerializerMap.get(Boolean));
exports.componentInputTypeSerializerMap.set('number', exports.componentInputTypeSerializerMap.get(Number));
exports.componentInputTypeSerializerMap.set('string', exports.componentInputTypeSerializerMap.get(String));
exports.componentInputTypeSerializerMap.set('object', exports.componentInputTypeSerializerMap.get(Object));


/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_42__;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.handledEvents = [
    'change',
    'click',
    'dblclick',
    'focusin',
    'focusout',
    'input',
    'mousedown',
    'mouseup',
    'submit'
];


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function handleEvent(evt, stopElement) {
    var el;
    var attrName;
    var receivers;
    var eventsName;
    if (evt instanceof Event) {
        el = evt.target;
        attrName = 'on-' + evt.type;
        eventsName = 'domEvents';
    }
    else {
        el = evt.target.element;
        attrName = 'oncomponent-' + evt.type;
        eventsName = 'events';
    }
    for (;;) {
        var parentEl = el.parentNode;
        if (!parentEl) {
            break;
        }
        if (el.hasAttribute(attrName)) {
            (receivers || (receivers = [])).push(el);
        }
        el = parentEl;
        var component = el.$component;
        if (component && receivers && receivers.length) {
            for (var i = 0;;) {
                var attrValue = receivers[i].getAttribute(attrName);
                var handler = void 0;
                if (attrValue.charAt(0) == ':') {
                    var events = component.constructor[eventsName];
                    if (events) {
                        events = events[attrValue.slice(1)];
                        if (events) {
                            handler = events[evt.type];
                        }
                    }
                }
                else {
                    handler = component[attrValue];
                }
                if (handler) {
                    if (handler.call(component, evt, receivers[i]) === false) {
                        return;
                    }
                    receivers.splice(i, 1);
                }
                else {
                    i++;
                }
                if (i == receivers.length) {
                    break;
                }
            }
        }
        if (parentEl == stopElement) {
            break;
        }
    }
}
exports.handleEvent = handleEvent;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mixin_1 = __webpack_require__(46);
var nelm_1 = __webpack_require__(10);
var componentConstructorMap_1 = __webpack_require__(25);
var elementConstructorMap_1 = __webpack_require__(47);
var ElementProtoMixin_1 = __webpack_require__(3);
var hyphenize_1 = __webpack_require__(15);
var push = Array.prototype.push;
function inheritProperty(target, source, name, depth) {
    var obj = target[name];
    var parentObj = source[name];
    if (obj && parentObj && obj != parentObj) {
        var o = target[name] = { __proto__: parentObj };
        for (var key in obj) {
            o[key] = obj[key];
            if (depth) {
                inheritProperty(o, parentObj, key, depth - 1);
            }
        }
    }
}
function registerComponent(componentConstr) {
    var elIs = componentConstr.elementIs;
    if (!elIs) {
        throw new TypeError('Static property "elementIs" is required');
    }
    if (componentConstructorMap_1.componentConstructorMap.has(elIs)) {
        throw new TypeError("Component \"" + elIs + "\" already registered");
    }
    var parentComponentConstr = Object.getPrototypeOf(componentConstr.prototype).constructor;
    inheritProperty(componentConstr, parentComponentConstr, 'input', 0);
    inheritProperty(componentConstr, parentComponentConstr, 'i18n', 0);
    componentConstr._blockNamesString = elIs + ' ' + (parentComponentConstr._blockNamesString || '');
    var template = componentConstr.template;
    if (template !== null) {
        if (template === parentComponentConstr.template) {
            componentConstr.template = template.extend('', { blockName: elIs });
        }
        else {
            if (template instanceof nelm_1.Template) {
                template.setBlockName(elIs);
            }
            else {
                componentConstr.template = parentComponentConstr.template ?
                    parentComponentConstr.template.extend(template, { blockName: elIs }) :
                    new nelm_1.Template(template, { blockName: elIs });
            }
        }
    }
    componentConstr._contentBlockNames = [elIs];
    if (parentComponentConstr._contentBlockNames) {
        push.apply(componentConstr._contentBlockNames, parentComponentConstr._contentBlockNames);
    }
    componentConstr._rawContent = undefined;
    componentConstr._elementClassNameMap = Object.create(parentComponentConstr._elementClassNameMap || null);
    inheritProperty(componentConstr, parentComponentConstr, 'oevents', 1);
    inheritProperty(componentConstr, parentComponentConstr, 'events', 1);
    inheritProperty(componentConstr, parentComponentConstr, 'domEvents', 1);
    var elExtends = componentConstr.elementExtends;
    var parentElConstr = elExtends ?
        elementConstructorMap_1.elementConstructorMap.get(elExtends) ||
            window["HTML" + (elExtends.charAt(0).toUpperCase() + elExtends.slice(1)) + "Element"] :
        HTMLElement;
    var elConstr = function (self) {
        return parentElConstr.call(this, self);
    };
    elConstr._rioniteComponentConstructor = componentConstr;
    Object.defineProperty(elConstr, 'observedAttributes', {
        configurable: true,
        enumerable: true,
        get: function () {
            var inputConfig = componentConstr.input;
            if (!inputConfig) {
                return [];
            }
            var observedAttrs = [];
            for (var name_1 in inputConfig) {
                observedAttrs.push(hyphenize_1.hyphenize(name_1));
            }
            return observedAttrs;
        }
    });
    var elProto = elConstr.prototype = Object.create(parentElConstr.prototype);
    elProto.constructor = elConstr;
    mixin_1.mixin(elProto, ElementProtoMixin_1.ElementProtoMixin);
    window.customElements.define(elIs, elConstr, elExtends ? { extends: elExtends } : null);
    componentConstructorMap_1.componentConstructorMap.set(elIs, componentConstr);
    componentConstructorMap_1.componentConstructorMap.set(elIs.toUpperCase(), componentConstr);
    elementConstructorMap_1.elementConstructorMap.set(elIs, elConstr);
    return componentConstr;
}
exports.registerComponent = registerComponent;


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_46__;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var map_set_polyfill_1 = __webpack_require__(0);
exports.elementConstructorMap = new map_set_polyfill_1.Map([
    ['a', window.HTMLAnchorElement],
    ['blockquote', window.HTMLQuoteElement],
    ['br', window.HTMLBRElement],
    ['caption', window.HTMLTableCaptionElement],
    ['col', window.HTMLTableColElement],
    ['colgroup', window.HTMLTableColElement],
    ['datalist', window.HTMLDataListElement],
    ['del', window.HTMLModElement],
    ['dir', window.HTMLDirectoryElement],
    ['dl', window.HTMLDListElement],
    ['document', window.HTMLDocument],
    ['element', Element],
    ['fieldset', window.HTMLFieldSetElement],
    ['frameset', window.HTMLFrameSetElement],
    ['h1', window.HTMLHeadingElement],
    ['h2', window.HTMLHeadingElement],
    ['h3', window.HTMLHeadingElement],
    ['h4', window.HTMLHeadingElement],
    ['h5', window.HTMLHeadingElement],
    ['h6', window.HTMLHeadingElement],
    ['hr', window.HTMLHRElement],
    ['iframe', window.HTMLIFrameElement],
    ['img', window.HTMLImageElement],
    ['ins', window.HTMLModElement],
    ['li', window.HTMLLIElement],
    ['menuitem', window.HTMLMenuItemElement],
    ['ol', window.HTMLOListElement],
    ['optgroup', window.HTMLOptGroupElement],
    ['p', window.HTMLParagraphElement],
    ['q', window.HTMLQuoteElement],
    ['tbody', window.HTMLTableSectionElement],
    ['td', window.HTMLTableCellElement],
    ['template', window.HTMLTemplateElement || HTMLElement],
    ['textarea', window.HTMLTextAreaElement],
    ['tfoot', window.HTMLTableSectionElement],
    ['th', window.HTMLTableCellElement],
    ['thead', window.HTMLTableSectionElement],
    ['tr', window.HTMLTableRowElement],
    ['ul', window.HTMLUListElement],
    ['vhgroupv', window.HTMLUnknownElement],
    ['vkeygen', window.HTMLUnknownElement]
]);


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var map_set_polyfill_1 = __webpack_require__(0);
var symbol_polyfill_1 = __webpack_require__(9);
var attachChildComponentElements_1 = __webpack_require__(5);
var bindContent_1 = __webpack_require__(6);
var Component_1 = __webpack_require__(2);
var ComponentDecorator_1 = __webpack_require__(4);
var ElementProtoMixin_1 = __webpack_require__(3);
var clearNode_1 = __webpack_require__(30);
var getUID_1 = __webpack_require__(16);
var moveContent_1 = __webpack_require__(17);
var KEY_CONTENT_MAP = symbol_polyfill_1.Symbol('contentMap');
var RtContent = (function (_super) {
    __extends(RtContent, _super);
    function RtContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RtContent.prototype._attach = function () {
        this._attached = true;
        if (this.isReady) {
            this._unfreezeBindings();
        }
        else {
            var ownerComponent = this.ownerComponent;
            var el = this.element;
            var input = this.input;
            var contentOwnerComponent = ownerComponent.ownerComponent;
            var ownerComponentContent = ownerComponent.input.$content;
            var clone = input.clone;
            var content = void 0;
            var bindings = void 0;
            var childComponents = void 0;
            if (!clone || ownerComponentContent.firstChild) {
                var selector = input.select;
                var key = getUID_1.getUID(ownerComponent) + '/' + (selector || '');
                if (selector) {
                    var contentMap = void 0;
                    if (!clone &&
                        contentOwnerComponent &&
                        (contentMap = contentOwnerComponent[KEY_CONTENT_MAP]) &&
                        contentMap.has(key)) {
                        var container = contentMap.get(key);
                        if (container.firstChild) {
                            content = moveContent_1.moveContent(document.createDocumentFragment(), container);
                            contentMap.set(key, el);
                            bindings = container.$component._bindings;
                            childComponents = container.$component._childComponents;
                        }
                    }
                    else if (ownerComponentContent.firstChild) {
                        var selectedElements = ownerComponentContent.querySelectorAll(selector);
                        var selectedElementCount = selectedElements.length;
                        if (selectedElementCount) {
                            content = document.createDocumentFragment();
                            for (var i = 0; i < selectedElementCount; i++) {
                                content.appendChild(clone ? selectedElements[i].cloneNode(true) : selectedElements[i]);
                            }
                        }
                        if (!clone && contentOwnerComponent) {
                            (contentMap ||
                                contentOwnerComponent[KEY_CONTENT_MAP] ||
                                (contentOwnerComponent[KEY_CONTENT_MAP] = new map_set_polyfill_1.Map())).set(key, el);
                        }
                    }
                }
                else if (!clone && contentOwnerComponent) {
                    var contentMap = contentOwnerComponent[KEY_CONTENT_MAP];
                    if (contentMap && contentMap.has(key)) {
                        var container = contentMap.get(key);
                        content = moveContent_1.moveContent(document.createDocumentFragment(), container);
                        contentMap.set(key, el);
                        bindings = container.$component._bindings;
                        childComponents = container.$component._childComponents;
                    }
                    else if (ownerComponentContent.firstChild) {
                        content = ownerComponentContent;
                        (contentMap || (contentOwnerComponent[KEY_CONTENT_MAP] = new map_set_polyfill_1.Map())).set(key, el);
                    }
                }
                else if (ownerComponentContent.firstChild) {
                    content = clone ? ownerComponentContent.cloneNode(true) : ownerComponentContent;
                }
            }
            if (bindings === undefined) {
                if (content || el.firstChild) {
                    _a = content ?
                        bindContent_1.bindContent(content, contentOwnerComponent, input.getContext ?
                            input.getContext.call(ownerComponent, ownerComponent.input.$context, this) :
                            ownerComponent.input.$context, { 0: null, 1: null }) :
                        bindContent_1.bindContent(el, ownerComponent, input.getContext ?
                            input.getContext.call(ownerComponent, input.$context, this) :
                            input.$context, { 0: null, 1: null }), this._bindings = _a[0], childComponents = _a[1];
                    this._childComponents = childComponents;
                }
                else {
                    this._bindings = null;
                    childComponents = this._childComponents = null;
                }
            }
            else {
                this._bindings = bindings;
                this._childComponents = childComponents;
                this._unfreezeBindings();
            }
            if (content) {
                ElementProtoMixin_1.suppressConnectionStatusCallbacks();
                if (el.firstChild) {
                    clearNode_1.clearNode(el);
                }
                el.appendChild(content);
                ElementProtoMixin_1.resumeConnectionStatusCallbacks();
            }
            if (childComponents) {
                attachChildComponentElements_1.attachChildComponentElements(childComponents);
            }
            this.isReady = true;
        }
        var _a;
    };
    RtContent.prototype._detach = function () {
        this._attached = false;
        this._freezeBindings();
    };
    RtContent = __decorate([
        ComponentDecorator_1.ComponentDecorator({
            elementIs: 'rt-content',
            input: {
                select: { type: String, readonly: true },
                clone: { default: false, readonly: true },
                getContext: { type: Object, readonly: true }
            },
            template: ''
        })
    ], RtContent);
    return RtContent;
}(Component_1.Component));
exports.RtContent = RtContent;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentDecorator_1 = __webpack_require__(4);
var rt_if_then_1 = __webpack_require__(31);
var RtIfElse = (function (_super) {
    __extends(RtIfElse, _super);
    function RtIfElse() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._elseMode = true;
        return _this;
    }
    RtIfElse = __decorate([
        ComponentDecorator_1.ComponentDecorator({
            elementIs: 'rt-if-else',
            elementExtends: 'template'
        })
    ], RtIfElse);
    return RtIfElse;
}(rt_if_then_1.RtIfThen));
exports.RtIfElse = RtIfElse;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var map_set_polyfill_1 = __webpack_require__(0);
var next_tick_1 = __webpack_require__(32);
var cellx_1 = __webpack_require__(1);
var attachChildComponentElements_1 = __webpack_require__(5);
var bindContent_1 = __webpack_require__(6);
var compileKeypath_1 = __webpack_require__(33);
var Component_1 = __webpack_require__(2);
var ComponentDecorator_1 = __webpack_require__(4);
var ElementProtoMixin_1 = __webpack_require__(3);
var Features_1 = __webpack_require__(7);
var KEY_ELEMENT_CONNECTED_1 = __webpack_require__(8);
var keypathPattern_1 = __webpack_require__(12);
var namePattern_1 = __webpack_require__(13);
var slice = Array.prototype.slice;
var reForAttrValue = RegExp("^\\s*(" + namePattern_1.namePattern + ")\\s+of\\s+(" + keypathPattern_1.keypathPattern + ")\\s*$");
var RtRepeat = (function (_super) {
    __extends(RtRepeat, _super);
    function RtRepeat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._active = false;
        return _this;
    }
    RtRepeat.prototype.elementConnected = function () {
        if (this._active) {
            return;
        }
        this._active = true;
        if (!this.initialized) {
            var input = this.input;
            var forAttrValue = input['for'].match(reForAttrValue);
            if (!forAttrValue) {
                throw new SyntaxError("Invalid value of attribute \"for\" (" + input['for'] + ")");
            }
            this._itemName = forAttrValue[1];
            this._list = new cellx_1.Cell(compileKeypath_1.compileKeypath(forAttrValue[2]), { context: input.$context });
            this._trackBy = input.trackBy;
            var rawItemContent = this._rawItemContent =
                document.importNode(this.element.content, true);
            if (input.strip) {
                var firstChild = rawItemContent.firstChild;
                var lastChild = rawItemContent.lastChild;
                if (firstChild == lastChild) {
                    if (firstChild.nodeType == Node.TEXT_NODE) {
                        firstChild.nodeValue = firstChild.nodeValue.trim();
                    }
                }
                else {
                    if (firstChild.nodeType == Node.TEXT_NODE) {
                        if (!(firstChild.nodeValue = firstChild.nodeValue.replace(/^\s+/, ''))) {
                            rawItemContent.removeChild(firstChild);
                        }
                    }
                    if (lastChild.nodeType == Node.TEXT_NODE) {
                        if (!(lastChild.nodeValue = lastChild.nodeValue.replace(/\s+$/, ''))) {
                            rawItemContent.removeChild(lastChild);
                        }
                    }
                }
            }
            this._itemMap = new map_set_polyfill_1.Map();
            this.initialized = true;
        }
        this._list.on('change', this._onListChange, this);
        this._render(false);
    };
    RtRepeat.prototype.elementDisconnected = function () {
        var _this = this;
        next_tick_1.nextTick(function () {
            if (!_this.element[KEY_ELEMENT_CONNECTED_1.KEY_ELEMENT_CONNECTED]) {
                _this._deactivate();
            }
        });
    };
    RtRepeat.prototype._onListChange = function () {
        if (this.element.parentNode) {
            this._render(true);
        }
    };
    RtRepeat.prototype._attach = function () {
        this._attached = true;
    };
    RtRepeat.prototype._detach = function () {
        this._attached = false;
    };
    RtRepeat.prototype._render = function (changed) {
        var _this = this;
        var prevItemMap = this._prevItemMap = this._itemMap;
        this._itemMap = new map_set_polyfill_1.Map();
        var list = this._list.get();
        var c = false;
        if (list) {
            this._lastNode = this.element;
            c = list.reduce(function (changed, item, index) { return _this._renderItem(item, index) || changed; }, c);
        }
        if (prevItemMap.size) {
            this._clearByItemMap(prevItemMap);
        }
        else if (!c) {
            return;
        }
        if (changed) {
            cellx_1.Cell.afterRelease(function () {
                _this.emit('change');
            });
        }
    };
    RtRepeat.prototype._renderItem = function (item, index) {
        var trackBy = this._trackBy;
        var value = trackBy ? (trackBy == '$index' ? index : item[trackBy]) : item;
        var prevItems = this._prevItemMap.get(value);
        var items = this._itemMap.get(value);
        if (prevItems) {
            var prevItem = void 0;
            if (prevItems.length == 1) {
                prevItem = prevItems[0];
                this._prevItemMap.delete(value);
            }
            else {
                prevItem = prevItems.shift();
            }
            if (items) {
                items.push(prevItem);
            }
            else {
                this._itemMap.set(value, [prevItem]);
            }
            prevItem.item.set(item);
            var nodes = prevItem.nodes;
            if (index == prevItem.index.get()) {
                this._lastNode = nodes[nodes.length - 1];
                return false;
            }
            prevItem.index.set(index);
            var nodeCount = nodes.length;
            if (nodeCount == 1) {
                var node = nodes[0];
                var nextNode = this._lastNode.nextSibling;
                if (node !== nextNode) {
                    this._lastNode.parentNode.insertBefore(node, nextNode);
                }
                this._lastNode = node;
            }
            else {
                if (nodes[0] !== this._lastNode.nextSibling) {
                    var df = document.createDocumentFragment();
                    for (var i = 0; i < nodeCount; i++) {
                        df.appendChild(nodes[i]);
                    }
                    this._lastNode.parentNode.insertBefore(df, this._lastNode.nextSibling);
                }
                this._lastNode = nodes[nodeCount - 1];
            }
            return true;
        }
        var itemCell = new cellx_1.Cell(item);
        var indexCell = new cellx_1.Cell(index);
        var content = this._rawItemContent.cloneNode(true);
        if (!Features_1.templateTag) {
            var templates = content.querySelectorAll('template');
            for (var i = 0, l = templates.length; i < l;) {
                i += templates[i].content.querySelectorAll('template').length + 1;
            }
        }
        var context = this.input.$context;
        var _a = bindContent_1.bindContent(content, this.ownerComponent, Object.create(context, (_b = {
                $component: {
                    configurable: false,
                    enumerable: false,
                    writable: false,
                    value: context.$component || context
                }
            },
            _b[this._itemName + 'Cell'] = {
                configurable: true,
                enumerable: false,
                writable: true,
                value: itemCell
            },
            _b[this._itemName] = {
                configurable: true,
                enumerable: true,
                get: function () {
                    return itemCell.get();
                }
            },
            _b.$indexCell = {
                configurable: true,
                enumerable: false,
                writable: true,
                value: indexCell
            },
            _b.$index = {
                configurable: true,
                enumerable: true,
                get: function () {
                    return indexCell.get();
                }
            },
            _b)), { 0: null, 1: null }), bindings = _a[0], childComponents = _a[1];
        var newItem = {
            item: itemCell,
            index: indexCell,
            nodes: slice.call(content.childNodes),
            bindings: bindings
        };
        if (items) {
            items.push(newItem);
        }
        else {
            this._itemMap.set(value, [newItem]);
        }
        var newLastNode = content.lastChild;
        ElementProtoMixin_1.suppressConnectionStatusCallbacks();
        this._lastNode.parentNode.insertBefore(content, this._lastNode.nextSibling);
        ElementProtoMixin_1.resumeConnectionStatusCallbacks();
        this._lastNode = newLastNode;
        if (childComponents) {
            attachChildComponentElements_1.attachChildComponentElements(childComponents);
        }
        return true;
        var _b;
    };
    RtRepeat.prototype._clearByItemMap = function (itemMap) {
        itemMap.forEach(this._clearByItems, this);
        itemMap.clear();
    };
    RtRepeat.prototype._clearByItems = function (items) {
        for (var i = items.length; i;) {
            var item = items[--i];
            var bindings = item.bindings;
            if (bindings) {
                for (var i_1 = bindings.length; i_1;) {
                    bindings[--i_1].off();
                }
            }
            var nodes = item.nodes;
            for (var i_2 = nodes.length; i_2;) {
                var node = nodes[--i_2];
                var parentNode = node.parentNode;
                if (parentNode) {
                    parentNode.removeChild(node);
                }
            }
        }
    };
    RtRepeat.prototype._deactivate = function () {
        if (!this._active) {
            return;
        }
        this._active = false;
        this._list.off('change', this._onListChange, this);
        this._clearByItemMap(this._itemMap);
    };
    RtRepeat = __decorate([
        ComponentDecorator_1.ComponentDecorator({
            elementIs: 'rt-repeat',
            elementExtends: 'template',
            input: {
                for: { type: String, required: true, readonly: true },
                trackBy: { type: String, readonly: true },
                strip: { default: false, readonly: true }
            }
        })
    ], RtRepeat);
    return RtRepeat;
}(Component_1.Component));
exports.RtRepeat = RtRepeat;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var map_set_polyfill_1 = __webpack_require__(0);
var symbol_polyfill_1 = __webpack_require__(9);
var attachChildComponentElements_1 = __webpack_require__(5);
var bindContent_1 = __webpack_require__(6);
var Component_1 = __webpack_require__(2);
var ComponentDecorator_1 = __webpack_require__(4);
var ElementProtoMixin_1 = __webpack_require__(3);
var clearNode_1 = __webpack_require__(30);
var getUID_1 = __webpack_require__(16);
var moveContent_1 = __webpack_require__(17);
var KEY_SLOT_CONTENT_MAP = symbol_polyfill_1.Symbol('slotContentMap');
var RtSlot = (function (_super) {
    __extends(RtSlot, _super);
    function RtSlot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RtSlot.prototype._attach = function () {
        this._attached = true;
        if (this.isReady) {
            this._unfreezeBindings();
        }
        else {
            var ownerComponent = this.ownerComponent;
            var el = this.element;
            var input = this.input;
            var contentOwnerComponent = ownerComponent.ownerComponent;
            var ownerComponentContent = ownerComponent.input.$content;
            var cloneContent = input.cloneContent;
            var content = void 0;
            var bindings = void 0;
            var childComponents = void 0;
            if (!cloneContent || ownerComponentContent.firstChild) {
                var name_1 = input.name;
                var key = getUID_1.getUID(ownerComponent) + '/' + (name_1 || '');
                if (name_1) {
                    var contentMap = void 0;
                    if (!cloneContent &&
                        contentOwnerComponent &&
                        (contentMap = contentOwnerComponent[KEY_SLOT_CONTENT_MAP]) &&
                        contentMap.has(key)) {
                        var container = contentMap.get(key);
                        if (container.firstChild) {
                            content = moveContent_1.moveContent(document.createDocumentFragment(), container);
                            contentMap.set(key, el);
                            bindings = container.$component._bindings;
                            childComponents = container.$component._childComponents;
                        }
                    }
                    else if (ownerComponentContent.firstChild) {
                        var selectedElements = ownerComponentContent.querySelectorAll("[rt-slot=" + name_1 + "]");
                        var selectedElementCount = selectedElements.length;
                        if (selectedElementCount) {
                            content = document.createDocumentFragment();
                            for (var i = 0; i < selectedElementCount; i++) {
                                var selectedElement = (cloneContent ? selectedElements[i].cloneNode(true) : selectedElements[i]);
                                selectedElement.className += ' ' +
                                    ownerComponent.constructor
                                        ._contentBlockNames.join('__' + name_1 + ' ') +
                                    '__' + name_1;
                                content.appendChild(selectedElement);
                            }
                        }
                        if (!cloneContent && contentOwnerComponent) {
                            (contentMap ||
                                contentOwnerComponent[KEY_SLOT_CONTENT_MAP] ||
                                (contentOwnerComponent[KEY_SLOT_CONTENT_MAP] = new map_set_polyfill_1.Map())).set(key, el);
                        }
                    }
                }
                else if (!cloneContent && contentOwnerComponent) {
                    var contentMap = contentOwnerComponent[KEY_SLOT_CONTENT_MAP];
                    if (contentMap && contentMap.has(key)) {
                        var container = contentMap.get(key);
                        content = moveContent_1.moveContent(document.createDocumentFragment(), container);
                        contentMap.set(key, el);
                        bindings = container.$component._bindings;
                        childComponents = container.$component._childComponents;
                    }
                    else if (ownerComponentContent.firstChild) {
                        content = ownerComponentContent;
                        (contentMap || (contentOwnerComponent[KEY_SLOT_CONTENT_MAP] = new map_set_polyfill_1.Map())).set(key, el);
                    }
                }
                else if (ownerComponentContent.firstChild) {
                    content = cloneContent ?
                        ownerComponentContent.cloneNode(true) :
                        ownerComponentContent;
                }
            }
            if (bindings === undefined) {
                if (content || el.firstChild) {
                    _a = content ?
                        bindContent_1.bindContent(content, contentOwnerComponent, input.getContext ?
                            input.getContext.call(ownerComponent, ownerComponent.input.$context, this) :
                            ownerComponent.input.$context, { 0: null, 1: null }) :
                        bindContent_1.bindContent(el, ownerComponent, input.getContext ?
                            input.getContext.call(ownerComponent, input.$context, this) :
                            input.$context, { 0: null, 1: null }), this._bindings = _a[0], childComponents = _a[1];
                    this._childComponents = childComponents;
                }
                else {
                    this._bindings = null;
                    childComponents = this._childComponents = null;
                }
            }
            else {
                this._bindings = bindings;
                this._childComponents = childComponents;
                this._unfreezeBindings();
            }
            if (content) {
                ElementProtoMixin_1.suppressConnectionStatusCallbacks();
                if (el.firstChild) {
                    clearNode_1.clearNode(el);
                }
                el.appendChild(content);
                ElementProtoMixin_1.resumeConnectionStatusCallbacks();
            }
            if (childComponents) {
                attachChildComponentElements_1.attachChildComponentElements(childComponents);
            }
            this.isReady = true;
        }
        var _a;
    };
    RtSlot.prototype._detach = function () {
        this._attached = false;
        this._freezeBindings();
    };
    RtSlot = __decorate([
        ComponentDecorator_1.ComponentDecorator({
            elementIs: 'rt-slot',
            input: {
                name: { type: String, readonly: true },
                cloneContent: { default: false, readonly: true },
                getContext: { type: Object, readonly: true }
            },
            template: ''
        })
    ], RtSlot);
    return RtSlot;
}(Component_1.Component));
exports.RtSlot = RtSlot;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nelm_1 = __webpack_require__(10);
nelm_1.Template.helpers['if-then'] = nelm_1.Template.helpers['if-else'] = nelm_1.Template.helpers['repeat'] = function (el) {
    var origAttrs = el.attributes;
    var attrs = {
        superCall: origAttrs && origAttrs.superCall,
        list: origAttrs ? origAttrs.list.slice() : []
    };
    attrs.list.push({
        name: 'is',
        value: 'rt-' + el.tagName
    });
    return [{
            nodeType: nelm_1.NodeType.ELEMENT,
            isHelper: false,
            tagName: 'template',
            names: el.names && el.names[0] ? ['$' + el.names[0]].concat(el.names) : el.names,
            attributes: attrs,
            content: el.content
        }];
};


/***/ })
/******/ ]);
});