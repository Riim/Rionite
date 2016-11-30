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
  
  
    
  // passed at runtime, configurable
  // via nodejs module
  if (!polyfill) polyfill = 'auto';
  
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
    usableCustomElements = polyfill !== 'force' && !!(
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
    secondArgument = String,
  
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
    setListener = false,
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
  if (!(REGISTER_ELEMENT in document)) {
  
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
      if (!setListener) {
        // only first time document.registerElement is used
        // we need to set this listener
        // setting it by default might slow down for no reason
        setListener = true;
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

          proto.cloneNode = function(deep) {
            var
              node = origCloneNode.call(this, !!deep),
              i
            ;
            if (node.nodeType !== 11) {
              i = getTypeIndex(node);
              if (-1 < i) patch(node, protos[i]);
            }
            if (deep) loopAndSetup(node.querySelectorAll(query));
            return node;
          };
        });
      }
  
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
  
      loopAndVerify(
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
        loopAndVerify(
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
    loopAndVerify(
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
      i = getTypeIndex(node)
    ;
    if (-1 < i) {
      patchIfNotAlready(node, protos[i]);
      i = 0;
      if (action === ATTACHED && !node[ATTACHED]) {
        node[DETACHED] = false;
        node[ATTACHED] = true;
        i = 1;
        if (IE8 && indexOf.call(targets, node) < 0) {
          targets.push(node);
        }
      } else if (action === DETACHED && !node[DETACHED]) {
        node[ATTACHED] = false;
        node[DETACHED] = true;
        i = 1;
      }
      if (i && (fn = node[action + CALLBACK])) fn.call(node);
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
  }
  
  // if customElements is not there at all
  if (!customElements || polyfill === 'force') polyfillV1();
  else {
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
  
  try {
    createElement.call(document, 'a', 'a');
  } catch(FireFox) {
    secondArgument = function (is) {
      return {is: is};
    };
  }
  
}(window));

;(function(d) {
	if ('content' in d.createElement('template')) {
		return;
	}

	var style = d.createElement('style');
	style.type = 'text/css';
	style.textContent = 'template { display: none !important; }';
	d.getElementsByTagName('head')[0].appendChild(style);

	Object.defineProperty(HTMLElement.prototype, 'content', {
		configurable: true,
		enumerable: true,

		get: function() {
			if (this.__contentische__) {
				return this.__contentische__;
			}

			if (this.tagName == 'TEMPLATE') {
				var df = this.__contentische__ = d.createDocumentFragment();

				for (var child; (child = this.firstChild);) {
					df.appendChild(child);
				}

				return df;
			}
		}
	});
})(document);

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("cellx"));
	else if(typeof define === 'function' && define.amd)
		define(["cellx"], factory);
	else if(typeof exports === 'object')
		exports["rionite"] = factory(require("cellx"));
	else
		root["Rionite"] = root["rionite"] = factory(root["cellx"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 42);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cellx = __webpack_require__(0);
var DisposableMixin_1 = __webpack_require__(14);
var registerComponent_1 = __webpack_require__(40);
var ElementAttributes_1 = __webpack_require__(15);
var setElementClasses_1 = __webpack_require__(41);
var initAttributes_1 = __webpack_require__(38);
var bindContent_1 = __webpack_require__(5);
var attachChildComponentElements_1 = __webpack_require__(4);
var bindEvents_1 = __webpack_require__(33);
var eventTypes_1 = __webpack_require__(37);
var onEvent_1 = __webpack_require__(39);
var camelize_1 = __webpack_require__(3);
var getUID_1 = __webpack_require__(30);
var htmlToFragment_1 = __webpack_require__(17);
var Features_1 = __webpack_require__(2);
var EventEmitter = cellx.EventEmitter;
var Map = cellx.JS.Map;
var createClass = cellx.Utils.createClass;
var map = Array.prototype.map;
var created;
var initialize;
var ready;
var elementAttached;
var beforeElementDetach;
var elementDetached;
var elementMoved;
var elementAttributeChanged;
var Component = (function (_super) {
    __extends(Component, _super);
    function Component(el, props) {
        var _this = _super.call(this) || this;
        _this.ownerComponent = null;
        _this._parentComponent = null;
        _this.isElementAttached = false;
        _this.initialized = false;
        _this.isReady = false;
        DisposableMixin_1.default.call(_this);
        var constr = _this.constructor;
        if (constr._registeredComponent !== constr) {
            throw new TypeError('Component must be registered');
        }
        if (el == null) {
            el = document.createElement(constr.elementIs);
        }
        else if (typeof el == 'string') {
            var elIs = constr.elementIs;
            var html = el;
            el = document.createElement(elIs);
            el.innerHTML = html;
            var firstChild = el.firstChild;
            if (firstChild == el.lastChild && firstChild.nodeType == 1 && (firstChild.tagName.toLowerCase() == elIs ||
                firstChild.getAttribute('is') == elIs)) {
                el = firstChild;
            }
        }
        _this.element = el;
        el.rioniteComponent = _this;
        Object.defineProperty(el, '$c', { value: _this });
        if (props) {
            var properties = _this.props;
            for (var name_1 in props) {
                properties[camelize_1.default(name_1)] = props[name_1];
            }
        }
        _this.created();
        return _this;
    }
    Component.extend = function (elIs, description) {
        description.Extends = this;
        (description.Static || (description.Static = {})).elementIs = elIs;
        return registerComponent_1.default(createClass(description));
    };
    Object.defineProperty(Component.prototype, "parentComponent", {
        get: function () {
            if (this._parentComponent !== undefined) {
                return this._parentComponent;
            }
            for (var node = void 0; (node = (node || this.element).parentNode);) {
                if (node.$c) {
                    return (this._parentComponent = node.$c);
                }
            }
            return (this._parentComponent = null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "elementAttributes", {
        get: function () {
            var attrs = new ElementAttributes_1.default(this.element);
            Object.defineProperty(this, 'elementAttributes', {
                configurable: true,
                enumerable: true,
                writable: true,
                value: attrs
            });
            return attrs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "props", {
        get: function () {
            var props = Object.create(this.elementAttributes);
            props.content = null;
            props.context = null;
            Object.defineProperty(this, 'props', {
                configurable: true,
                enumerable: true,
                writable: true,
                value: props
            });
            return props;
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype._handleEvent = function (evt) {
        _super.prototype._handleEvent.call(this, evt);
        var silent = this._isComponentSilent;
        if (silent === undefined) {
            silent = this._isComponentSilent = this.element.hasAttribute('rt-silent');
        }
        if (!silent && evt.bubbles !== false && !evt.isPropagationStopped) {
            var parentComponent = this.parentComponent;
            if (parentComponent) {
                parentComponent._handleEvent(evt);
            }
            else {
                onEvent_1.default(evt);
            }
        }
    };
    Component.prototype._attachElement = function () {
        if (!this.initialized) {
            this.initialize();
            this.initialized = true;
        }
        var constr = this.constructor;
        var rawContent = constr._rawContent;
        var el = this.element;
        if (this.isReady) {
            if (rawContent) {
                for (var child = void 0; (child = el.firstChild);) {
                    el.removeChild(child);
                }
            }
        }
        else {
            setElementClasses_1.default(el, constr);
            initAttributes_1.default(this, constr);
            var template = constr.template;
            if (template != null) {
                if (!rawContent) {
                    rawContent = constr._rawContent = htmlToFragment_1.default(typeof template == 'string' ? template : template.render(constr));
                }
                var inputContent = this.props.content = document.createDocumentFragment();
                for (var child = void 0; (child = el.firstChild);) {
                    inputContent.appendChild(child);
                }
            }
        }
        if (rawContent) {
            var content = rawContent.cloneNode(true);
            var _a = bindContent_1.default(content, this), bindings = _a.bindings, childComponents = _a.childComponents;
            this._bindings = bindings;
            this.element.appendChild(content);
            if (!Features_1.nativeCustomElements && childComponents) {
                attachChildComponentElements_1.default(childComponents);
            }
            if (constr.events) {
                bindEvents_1.default(this, constr.events);
            }
        }
        if (!this.isReady) {
            if (!rawContent && constr.events) {
                bindEvents_1.default(this, constr.events);
            }
            this.ready();
            this.isReady = true;
        }
        this.elementAttached();
    };
    Component.prototype._detachElement = function () {
        this.beforeElementDetach();
        this.dispose();
        this.elementDetached();
    };
    Component.prototype.dispose = function () {
        this._destroyBindings();
        return DisposableMixin_1.default.prototype.dispose.call(this);
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
    Component.prototype.elementAttached = function () { };
    Component.prototype.beforeElementDetach = function () { };
    Component.prototype.elementDetached = function () { };
    Component.prototype.elementMoved = function () { };
    Component.prototype.elementAttributeChanged = function (name, oldValue, value) { };
    // Utils
    Component.prototype.$ = function (name, container) {
        var assetList = this._getAssetList(name, container);
        return assetList && assetList.length ? assetList[0].$c || assetList[0] : null;
    };
    Component.prototype.$$ = function (name, container) {
        var assetList = this._getAssetList(name, container);
        return assetList ? map.call(assetList, function (el) { return el.$c || el; }) : [];
    };
    Component.prototype._getAssetList = function (name, container) {
        var assets = this._assets || (this._assets = new Map());
        var containerEl = container ?
            (container instanceof Component ? container.element : container) :
            this.element;
        var key = container ? getUID_1.default(containerEl) + '/' + name : name;
        var assetList = assets.get(key);
        if (!assetList) {
            var constr = this.constructor;
            var className = constr._assetClassNames[name];
            if (className) {
                assetList = containerEl.getElementsByClassName(className);
                assets.set(key, assetList);
            }
            else {
                var markupBlockNames = constr._markupBlockNames;
                if (!markupBlockNames) {
                    throw new TypeError('Component must have a template');
                }
                for (var i = markupBlockNames.length; i;) {
                    className = markupBlockNames[--i] + '__' + name;
                    assetList = containerEl.getElementsByClassName(className);
                    if (assetList.length) {
                        constr._assetClassNames[name] = className;
                        assets.set(key, assetList);
                        break;
                    }
                }
                if (!assetList.length) {
                    return;
                }
            }
        }
        return assetList;
    };
    return Component;
}(EventEmitter));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Component;
Component.register = registerComponent_1.default;
var DisposableMixinProto = DisposableMixin_1.default.prototype;
var ComponentProto = Component.prototype;
Object.getOwnPropertyNames(DisposableMixinProto).forEach(function (name) {
    if (name != 'constructor') {
        Object.defineProperty(ComponentProto, name, Object.getOwnPropertyDescriptor(DisposableMixinProto, name));
    }
});
created = ComponentProto.created;
initialize = ComponentProto.initialize;
ready = ComponentProto.ready;
elementAttached = ComponentProto.elementAttached;
beforeElementDetach = ComponentProto.beforeElementDetach;
elementDetached = ComponentProto.elementDetached;
elementMoved = ComponentProto.elementMoved;
elementAttributeChanged = ComponentProto.elementAttributeChanged;
document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
    document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
    eventTypes_1.default.forEach(function (type) {
        document.addEventListener(type, onEvent_1.default);
    });
});


/***/ },
/* 2 */
/***/ function(module, exports) {

"use strict";
"use strict";
var div = document.createElement('div');
div.innerHTML = '<template>1</template>';
var template = div.firstChild;
exports.templateTag = !template.firstChild;
var CustomElementRegistry = window.CustomElementRegistry;
exports.nativeCustomElements = !!CustomElementRegistry &&
    Object.prototype.toString.call(CustomElementRegistry).indexOf('[native code]') > -1;


/***/ },
/* 3 */
/***/ function(module, exports) {

"use strict";
"use strict";
var reHyphen = /[-_]+([a-z]|$)/g;
var cache = Object.create(null);
function camelize(str) {
    return cache[str] || (cache[str] = str.replace(reHyphen, function (match, chr) {
        return chr.toUpperCase();
    }));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = camelize;


/***/ },
/* 4 */
/***/ function(module, exports) {

"use strict";
"use strict";
function attachChildComponentElements(childComponents) {
    for (var _i = 0, childComponents_1 = childComponents; _i < childComponents_1.length; _i++) {
        var childComponent = childComponents_1[_i];
        if (!childComponent.isElementAttached) {
            childComponent.isElementAttached = true;
            childComponent._attachElement();
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = attachChildComponentElements;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var cellx = __webpack_require__(0);
var ContentParser_1 = __webpack_require__(13);
var compileContent_1 = __webpack_require__(35);
var setAttribute_1 = __webpack_require__(31);
var Cell = cellx.Cell;
var ContentNodeType = ContentParser_1.default.ContentNodeType;
var reBinding = /{[^}]+}/;
function bindContent(content, ownerComponent, context) {
    if (!context) {
        context = ownerComponent;
    }
    var bindings;
    var childComponents;
    function bind_(content) {
        var _loop_1 = function (child) {
            switch (child.nodeType) {
                case 1: {
                    var attrs = child.attributes;
                    var _loop_2 = function (i) {
                        var attr = attrs.item(--i);
                        var value = attr.value;
                        if (reBinding.test(value)) {
                            var parsedValue = (new ContentParser_1.default(value)).parse();
                            if (parsedValue.length > 1 || parsedValue[0].type == ContentNodeType.BINDING) {
                                var name_1 = attr.name;
                                var cell = new Cell(compileContent_1.default(parsedValue, value), {
                                    owner: context,
                                    onChange: function (evt) {
                                        setAttribute_1.default(child, name_1, evt['value']);
                                    }
                                });
                                setAttribute_1.default(child, name_1, cell.get());
                                (bindings || (bindings = [])).push(cell);
                            }
                        }
                        out_i_1 = i;
                    };
                    var out_i_1;
                    for (var i = attrs.length; i;) {
                        _loop_2(i);
                        i = out_i_1;
                    }
                    var childComponent = child.$c;
                    if (childComponent) {
                        childComponent.ownerComponent = ownerComponent;
                        childComponent.props.context = context;
                        (childComponents || (childComponents = [])).push(childComponent);
                    }
                    if (child.firstChild && (!childComponent || childComponent.constructor.template == null)) {
                        bind_(child);
                    }
                    break;
                }
                case 3: {
                    var content_1 = child.textContent;
                    if (reBinding.test(content_1)) {
                        var parsedContent = (new ContentParser_1.default(content_1)).parse();
                        if (parsedContent.length > 1 || parsedContent[0].type == ContentNodeType.BINDING) {
                            var cell = new Cell(compileContent_1.default(parsedContent, content_1), {
                                owner: context,
                                onChange: function (evt) {
                                    child.textContent = evt['value'];
                                }
                            });
                            child.textContent = cell.get();
                            (bindings || (bindings = [])).push(cell);
                        }
                    }
                    break;
                }
            }
        };
        for (var child = content.firstChild; child; child = child.nextSibling) {
            _loop_1(child);
        }
    }
    bind_(content);
    return {
        bindings: bindings || null,
        childComponents: childComponents || null
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = bindContent;


/***/ },
/* 6 */
/***/ function(module, exports) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = '[$_a-zA-Z][$\\w]*';


/***/ },
/* 7 */
/***/ function(module, exports) {

"use strict";
"use strict";
var reEscapableChars = /[&<>"]/g;
var charToEntityMap = Object.create(null);
charToEntityMap['&'] = '&amp;';
charToEntityMap['<'] = '&lt;';
charToEntityMap['>'] = '&gt;';
charToEntityMap['"'] = '&quot;';
function escapeHTML(str) {
    return reEscapableChars.test(str) ? str.replace(reEscapableChars, function (chr) { return charToEntityMap[chr]; }) : str;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = escapeHTML;


/***/ },
/* 8 */
/***/ function(module, exports) {

"use strict";
"use strict";
var reEscapableChars = /[\\'\r\n]/g;
var charToSpecialMap = Object.create(null);
charToSpecialMap['\\'] = '\\\\';
charToSpecialMap['\''] = '\\\'';
charToSpecialMap['\r'] = '\\r';
charToSpecialMap['\n'] = '\\n';
function escapeString(str) {
    return reEscapableChars.test(str) ? str.replace(reEscapableChars, function (chr) { return charToSpecialMap[chr]; }) : str;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = escapeString;


/***/ },
/* 9 */
/***/ function(module, exports) {

"use strict";
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = hyphenize;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var getText_1 = __webpack_require__(22);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
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
        return arr.join(separator);
    },
    t: getText_1.default.t,
    pt: getText_1.default.pt,
    nt: function nt(count, key) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        args.unshift(count);
        return getText_1.default('', key, true, args);
    },
    npt: function npt(count, key, context) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        args.unshift(count);
        return getText_1.default(context, key, true, args);
    },
    key: function key(obj, key) {
        return obj && obj[key];
    },
    json: function json(value) {
        return JSON.stringify(value);
    }
};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var namePattern_1 = __webpack_require__(6);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = "(?:" + namePattern_1.default + "|\\[\\d+\\])(?:\\??(?:\\." + namePattern_1.default + "|\\[\\d+\\]))*";


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cellx = __webpack_require__(0);
var Component_1 = __webpack_require__(1);
var compileKeypath_1 = __webpack_require__(21);
var bindContent_1 = __webpack_require__(5);
var attachChildComponentElements_1 = __webpack_require__(4);
var keypathPattern_1 = __webpack_require__(11);
var Features_1 = __webpack_require__(2);
var Cell = cellx.Cell;
var nextTick = cellx.Utils.nextTick;
var slice = Array.prototype.slice;
var reKeypath = RegExp("^" + keypathPattern_1.default + "$");
var RtIfThen = (function (_super) {
    __extends(RtIfThen, _super);
    function RtIfThen() {
        var _this = _super.apply(this, arguments) || this;
        _this._elseMode = false;
        return _this;
    }
    RtIfThen.prototype._attachElement = function () {
        if (!this.initialized) {
            var props = this.props;
            props.content = document.importNode(this.element.content, true);
            var if_ = (props['if'] || '').trim();
            if (!reKeypath.test(if_)) {
                throw new SyntaxError("Invalid value of attribute \"if\" (" + if_ + ")");
            }
            var getIfValue_1 = compileKeypath_1.default(if_);
            this._if = new Cell(function () {
                return !!getIfValue_1.call(this);
            }, { owner: props.context });
            this.initialized = true;
        }
        this._if.on('change', this._onIfChange, this);
        this._render(false);
    };
    RtIfThen.prototype._detachElement = function () {
        this._destroyBindings();
        this._if.off('change', this._onIfChange, this);
        var nodes = this._nodes;
        if (nodes) {
            for (var i = nodes.length; i;) {
                var node = nodes[--i];
                var parentNode = node.parentNode;
                if (parentNode) {
                    parentNode.removeChild(node);
                }
            }
        }
    };
    RtIfThen.prototype._onIfChange = function () {
        if (this.element.parentNode) {
            this._render(true);
        }
    };
    RtIfThen.prototype._render = function (changed) {
        var _this = this;
        if (this._elseMode ? !this._if.get() : this._if.get()) {
            var content = this.props.content.cloneNode(true);
            var _a = bindContent_1.default(content, this.ownerComponent, this.props.context), bindings = _a.bindings, childComponents = _a.childComponents;
            this._nodes = slice.call(content.childNodes);
            this._bindings = bindings;
            this.element.parentNode.insertBefore(content, this.element.nextSibling);
            if (!Features_1.nativeCustomElements && childComponents) {
                attachChildComponentElements_1.default(childComponents);
            }
        }
        else {
            this._destroyBindings();
            var nodes = this._nodes;
            if (nodes) {
                for (var i = nodes.length; i;) {
                    var node = nodes[--i];
                    node.parentNode.removeChild(node);
                }
                this._nodes = null;
            }
        }
        if (changed) {
            nextTick(function () {
                _this.emit('change');
            });
        }
    };
    return RtIfThen;
}(Component_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RtIfThen;
RtIfThen.elementIs = 'rt-if-then';
RtIfThen.elementExtends = 'template';
RtIfThen.props = {
    if: { type: String, required: true, readonly: true }
};
Component_1.default.register(RtIfThen);


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var keypathToJSExpression_1 = __webpack_require__(23);
var namePattern_1 = __webpack_require__(6);
var keypathPattern_1 = __webpack_require__(11);
var reNameOrNothing = RegExp(namePattern_1.default + '|', 'g');
var reKeypathOrNothing = RegExp(keypathPattern_1.default + '|', 'g');
var reBooleanOrNothing = /false|true|/g;
var reNumberOrNothing = /(?:[+-]\s*)?(?:0b[01]+|0[0-7]+|0x[0-9a-fA-F]+|(?:(?:0|[1-9]\d*)(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?|Infinity|NaN)|/g;
var reVacuumOrNothing = /null|undefined|void 0|/g;
var NOT_VALUE_AND_NOT_KEYPATH = {};
var ContentNodeType = {
    TEXT: 0,
    BINDING: 1,
    BINDING_KEYPATH: 2,
    BINDING_FORMATTER: 3,
    BINDING_FORMATTER_ARGUMENTS: 4
};
var ContentParser = (function () {
    function ContentParser(content) {
        this.content = content;
    }
    ContentParser.prototype.parse = function () {
        var content = this.content;
        if (!content) {
            return [];
        }
        this.at = 0;
        var result = this.result = [];
        for (var index = void 0; (index = content.indexOf('{', this.at)) > -1;) {
            this.pushText(content.slice(this.at, index));
            this.at = index;
            this.chr = content.charAt(index);
            var binding = this.readBinding();
            if (binding) {
                result.push(binding);
            }
            else {
                this.pushText(this.chr);
                this.next('{');
            }
        }
        this.pushText(content.slice(this.at));
        return result;
    };
    ContentParser.prototype.pushText = function (value) {
        if (value) {
            var result = this.result;
            var resultLen = result.length;
            if (resultLen && result[resultLen - 1].type == ContentNodeType.TEXT) {
                result[resultLen - 1].value = result[resultLen - 1].raw += value;
            }
            else {
                result.push({
                    type: ContentNodeType.TEXT,
                    at: this.at,
                    raw: value,
                    value: value
                });
            }
        }
    };
    ContentParser.prototype.readBinding = function () {
        var bindingAt = this.at;
        this.next('{');
        this.skipWhitespaces();
        var keypath = this.readBindingKeypath();
        if (keypath) {
            var formatters = [];
            for (var formatter = void 0; this.skipWhitespaces() == '|' && (formatter = this.readFormatter());) {
                formatters.push(formatter);
            }
            if (this.chr == '}') {
                this.next();
                return {
                    type: ContentNodeType.BINDING,
                    at: bindingAt,
                    raw: this.content.slice(bindingAt, this.at),
                    keypath: keypath,
                    formatters: formatters
                };
            }
        }
        this.at = bindingAt;
        this.chr = this.content.charAt(bindingAt);
        return null;
    };
    ContentParser.prototype.readBindingKeypath = function () {
        var content = this.content;
        reKeypathOrNothing.lastIndex = this.at;
        var keypath = reKeypathOrNothing.exec(content)[0];
        if (keypath) {
            var keypathAt = this.at;
            this.chr = content.charAt((this.at += keypath.length));
            return {
                type: ContentNodeType.BINDING_KEYPATH,
                at: keypathAt,
                raw: content.slice(keypathAt, this.at),
                value: keypath
            };
        }
        return null;
    };
    ContentParser.prototype.readFormatter = function () {
        var formatterAt = this.at;
        this.next('|');
        this.skipWhitespaces();
        var content = this.content;
        reNameOrNothing.lastIndex = this.at;
        var name = reNameOrNothing.exec(content)[0];
        if (name) {
            var args = (this.chr = content.charAt((this.at += name.length))) == '(' ?
                this.readFormatterArguments() :
                null;
            return {
                type: ContentNodeType.BINDING_FORMATTER,
                at: formatterAt,
                raw: content.slice(formatterAt, this.at),
                name: name,
                arguments: args
            };
        }
        this.at = formatterAt;
        this.chr = content.charAt(formatterAt);
        return null;
    };
    ContentParser.prototype.readFormatterArguments = function () {
        var formatterArgumentsAt = this.at;
        var args = [];
        this.next('(');
        if (this.skipWhitespaces() != ')') {
            for (;;) {
                var arg = this.readValueOrValueKeypath();
                if (arg !== NOT_VALUE_AND_NOT_KEYPATH) {
                    if (this.skipWhitespaces() == ',' || this.chr == ')') {
                        args.push(arg);
                        if (this.chr == ',') {
                            this.next();
                            this.skipWhitespaces();
                            continue;
                        }
                        break;
                    }
                }
                this.at = formatterArgumentsAt;
                this.chr = this.content.charAt(formatterArgumentsAt);
                return null;
            }
        }
        this.next();
        return {
            type: ContentNodeType.BINDING_FORMATTER_ARGUMENTS,
            at: formatterArgumentsAt,
            raw: this.content.slice(formatterArgumentsAt, this.at),
            value: args
        };
    };
    ContentParser.prototype.readValueOrValueKeypath = function () {
        var value = this.readValue();
        return value === NOT_VALUE_AND_NOT_KEYPATH ? this.readValueKeypath() : value;
    };
    ContentParser.prototype.readValue = function () {
        switch (this.chr) {
            case '{': {
                return this.readObject();
            }
            case '[': {
                return this.readArray();
            }
            case "'":
            case '"': {
                return this.readString();
            }
        }
        var readers = ['readBoolean', 'readNumber', 'readVacuum'];
        for (var _i = 0, readers_1 = readers; _i < readers_1.length; _i++) {
            var reader = readers_1[_i];
            var value = this[reader]();
            if (value !== NOT_VALUE_AND_NOT_KEYPATH) {
                return value;
            }
        }
        return NOT_VALUE_AND_NOT_KEYPATH;
    };
    ContentParser.prototype.readObject = function () {
        var objectAt = this.at;
        this.next('{');
        var obj = '{';
        while (this.skipWhitespaces() != '}') {
            var key = this.chr == "'" || this.chr == '"' ? this.readString() : this.readObjectKey();
            if (key !== NOT_VALUE_AND_NOT_KEYPATH && key !== null && this.skipWhitespaces() == ':') {
                this.next();
                this.skipWhitespaces();
                var v = this.readValueOrValueKeypath();
                if (v !== NOT_VALUE_AND_NOT_KEYPATH) {
                    if (this.skipWhitespaces() == ',') {
                        obj += key + ':' + v + ',';
                        this.next();
                        continue;
                    }
                    else if (this.chr == '}') {
                        obj += key + ':' + v + '}';
                        break;
                    }
                }
            }
            this.at = objectAt;
            this.chr = this.content.charAt(objectAt);
            return NOT_VALUE_AND_NOT_KEYPATH;
        }
        this.next();
        return obj;
    };
    ContentParser.prototype.readObjectKey = function () {
        reNameOrNothing.lastIndex = this.at;
        var key = reNameOrNothing.exec(this.content)[0];
        if (key) {
            this.chr = this.content.charAt((this.at += key.length));
            return key;
        }
        return null;
    };
    ContentParser.prototype.readArray = function () {
        var arrayAt = this.at;
        this.next('[');
        var arr = '[';
        while (this.skipWhitespaces() != ']') {
            if (this.chr == ',') {
                arr += ',';
                this.next();
            }
            else {
                var v = this.readValueOrValueKeypath();
                if (v === NOT_VALUE_AND_NOT_KEYPATH) {
                    this.at = arrayAt;
                    this.chr = this.content.charAt(arrayAt);
                    return NOT_VALUE_AND_NOT_KEYPATH;
                }
                else {
                    arr += v;
                }
            }
        }
        this.next();
        return arr + ']';
    };
    ContentParser.prototype.readBoolean = function () {
        reBooleanOrNothing.lastIndex = this.at;
        var bool = reBooleanOrNothing.exec(this.content)[0];
        if (bool) {
            this.chr = this.content.charAt((this.at += bool.length));
            return bool;
        }
        return NOT_VALUE_AND_NOT_KEYPATH;
    };
    ContentParser.prototype.readNumber = function () {
        reNumberOrNothing.lastIndex = this.at;
        var num = reNumberOrNothing.exec(this.content)[0];
        if (num) {
            this.chr = this.content.charAt((this.at += num.length));
            return num;
        }
        return NOT_VALUE_AND_NOT_KEYPATH;
    };
    ContentParser.prototype.readString = function () {
        if (this.chr != "'" && this.chr != '"') {
            throw {
                name: 'SyntaxError',
                message: "Expected \"'\" or '\"' instead of \"" + this.chr + "\"",
                at: this.at,
                content: this.content
            };
        }
        var stringAt = this.at;
        var quote = this.chr;
        var str = '';
        while (this.next()) {
            if (this.chr == quote) {
                this.next();
                return quote + str + quote;
            }
            if (this.chr == '\\') {
                str += this.chr + this.next();
            }
            else {
                if (this.chr == '\r' || this.chr == '\n') {
                    break;
                }
                str += this.chr;
            }
        }
        this.at = stringAt;
        this.chr = this.content.charAt(stringAt);
        return NOT_VALUE_AND_NOT_KEYPATH;
    };
    ContentParser.prototype.readVacuum = function () {
        reVacuumOrNothing.lastIndex = this.at;
        var vacuum = reVacuumOrNothing.exec(this.content)[0];
        if (vacuum) {
            this.chr = this.content.charAt((this.at += vacuum.length));
            return vacuum;
        }
        return NOT_VALUE_AND_NOT_KEYPATH;
    };
    ContentParser.prototype.readValueKeypath = function () {
        reKeypathOrNothing.lastIndex = this.at;
        var keypath = reKeypathOrNothing.exec(this.content)[0];
        if (keypath) {
            this.chr = this.content.charAt((this.at += keypath.length));
            return keypathToJSExpression_1.default(keypath);
        }
        return NOT_VALUE_AND_NOT_KEYPATH;
    };
    ContentParser.prototype.next = function (c) {
        if (c && c != this.chr) {
            throw {
                name: 'SyntaxError',
                message: "Expected \"" + c + "\" instead of \"" + this.chr + "\"",
                at: this.at,
                content: this.content
            };
        }
        return (this.chr = this.content.charAt(++this.at));
    };
    ContentParser.prototype.skipWhitespaces = function () {
        var chr = this.chr;
        while (chr && chr <= ' ') {
            chr = this.next();
        }
        return chr;
    };
    return ContentParser;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ContentParser;
ContentParser.ContentNodeType = ContentNodeType;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var cellx = __webpack_require__(0);
var EventEmitter = cellx.EventEmitter;
var nextUID = cellx.Utils.nextUID;
var DisposableMixin = (function () {
    function DisposableMixin() {
        this._disposables = {};
    }
    DisposableMixin.prototype.listenTo = function (target, typeOrListeners, listenerOrContext, context) {
        var _this = this;
        var listenings;
        if (typeof typeOrListeners == 'object') {
            listenings = [];
            if (Array.isArray(typeOrListeners)) {
                if (arguments.length < 4) {
                    context = this;
                }
                for (var _i = 0, typeOrListeners_1 = typeOrListeners; _i < typeOrListeners_1.length; _i++) {
                    var type = typeOrListeners_1[_i];
                    listenings.push(this.listenTo(target, type, listenerOrContext, context));
                }
            }
            else {
                if (arguments.length < 3) {
                    listenerOrContext = this;
                }
                for (var type in typeOrListeners) {
                    listenings.push(this.listenTo(target, type, typeOrListeners[type], listenerOrContext));
                }
            }
        }
        else {
            if (arguments.length < 4) {
                context = this;
            }
            if (Array.isArray(target) || target instanceof NodeList || target instanceof HTMLCollection) {
                listenings = [];
                for (var i = 0, l = target.length; i < l; i++) {
                    listenings.push(this.listenTo(target[i], typeOrListeners, listenerOrContext, context));
                }
            }
            else if (Array.isArray(listenerOrContext)) {
                listenings = [];
                for (var _a = 0, listenerOrContext_1 = listenerOrContext; _a < listenerOrContext_1.length; _a++) {
                    var listener = listenerOrContext_1[_a];
                    listenings.push(this.listenTo(target, typeOrListeners, listener, context));
                }
            }
            else {
                return this._listenTo(target, typeOrListeners, listenerOrContext, context);
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
    DisposableMixin.prototype._listenTo = function (target, type, listener, context) {
        var _this = this;
        if (target instanceof EventEmitter) {
            target.on(type, listener, context);
        }
        else if (target.addEventListener) {
            if (target !== context) {
                listener = listener.bind(context);
            }
            target.addEventListener(type, listener);
        }
        else {
            throw new TypeError('Unable to add a listener');
        }
        var id = nextUID();
        var stopListening = function () {
            if (_this._disposables[id]) {
                if (target instanceof EventEmitter) {
                    target.off(type, listener, context);
                }
                else {
                    target.removeEventListener(type, listener);
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
    DisposableMixin.prototype.setTimeout = function (cb, delay) {
        var _this = this;
        var id = nextUID();
        var timeoutId = setTimeout(function () {
            delete _this._disposables[id];
            cb.call(_this);
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
    DisposableMixin.prototype.setInterval = function (cb, delay) {
        var _this = this;
        var id = nextUID();
        var intervalId = setInterval(function () {
            cb.call(_this);
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
    DisposableMixin.prototype.registerCallback = function (cb) {
        var _this = this;
        var id = nextUID();
        var disposable = this;
        var cancelCallback = function () {
            delete _this._disposables[id];
        };
        var wrapper = function wrapper() {
            if (disposable._disposables[id]) {
                delete disposable._disposables[id];
                return cb.apply(disposable, arguments);
            }
        };
        wrapper.cancel = cancelCallback;
        wrapper.dispose = cancelCallback;
        this._disposables[id] = wrapper;
        return wrapper;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DisposableMixin;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cellx = __webpack_require__(0);
var attributeTypeHandlerMap_1 = __webpack_require__(32);
var camelize_1 = __webpack_require__(3);
var hyphenize_1 = __webpack_require__(9);
var EventEmitter = cellx.EventEmitter;
var Cell = cellx.Cell;
var Map = cellx.JS.Map;
var typeMap = new Map([
    [Boolean, 'boolean'],
    ['boolean', 'boolean'],
    [Number, 'number'],
    ['number', 'number'],
    [String, 'string'],
    ['string', 'string']
]);
var ElementAttributes = (function (_super) {
    __extends(ElementAttributes, _super);
    function ElementAttributes(el) {
        var _this = _super.call(this) || this;
        var component = el.$c;
        var attributesConfig = component.constructor.elementAttributes;
        if (attributesConfig) {
            var _loop_1 = function (name_1) {
                var attrConfig = attributesConfig[name_1];
                var type = typeof attrConfig;
                var defaultValue;
                var required = void 0;
                var readonly = void 0;
                if (type == 'function') {
                    type = attrConfig;
                    required = readonly = false;
                }
                else if (type == 'object' && (attrConfig.type !== undefined || attrConfig.default !== undefined)) {
                    type = attrConfig.type;
                    defaultValue = attrConfig.default;
                    if (type === undefined) {
                        type = typeof defaultValue;
                    }
                    else if (defaultValue !== undefined && typeMap.get(type) !== typeof defaultValue) {
                        throw new TypeError('Specified type does not match type of defaultValue');
                    }
                    required = attrConfig.required;
                    readonly = attrConfig.readonly;
                }
                else {
                    defaultValue = attrConfig;
                    required = readonly = false;
                }
                var handlers = attributeTypeHandlerMap_1.default.get(type);
                if (!handlers) {
                    throw new TypeError('Unsupported attribute type');
                }
                var camelizedName = camelize_1.default(name_1);
                var hyphenizedName = hyphenize_1.default(name_1);
                if (required && !el.hasAttribute(hyphenizedName)) {
                    throw new TypeError("Property \"" + name_1 + "\" is required");
                }
                var descriptor = void 0;
                if (readonly) {
                    var value_1 = handlers[0](el.getAttribute(hyphenizedName), defaultValue);
                    descriptor = {
                        configurable: true,
                        enumerable: true,
                        get: function () {
                            return value_1;
                        },
                        set: function (v) {
                            if (v !== value_1) {
                                throw new TypeError("Property \"" + name_1 + "\" is readonly");
                            }
                        }
                    };
                }
                else {
                    var oldValue_1;
                    var value_2;
                    var isReady_1;
                    var rawValue_1 = this_1['_' + camelizedName] = this_1['_' + hyphenizedName] = new Cell(el.getAttribute(hyphenizedName), {
                        merge: function (v, ov) {
                            if (v !== ov) {
                                oldValue_1 = value_2;
                                value_2 = handlers[0](v, defaultValue);
                            }
                            isReady_1 = component.isReady;
                            return v;
                        },
                        onChange: function (evt) {
                            evt['oldValue'] = oldValue_1;
                            evt['value'] = value_2;
                            if (isReady_1) {
                                component.elementAttributeChanged(hyphenizedName, oldValue_1, value_2);
                            }
                        }
                    });
                    descriptor = {
                        configurable: true,
                        enumerable: true,
                        get: function () {
                            rawValue_1.get();
                            return value_2;
                        },
                        set: function (v) {
                            v = handlers[1](v, defaultValue);
                            if (v === null) {
                                el.removeAttribute(hyphenizedName);
                            }
                            else {
                                el.setAttribute(hyphenizedName, v);
                            }
                            rawValue_1.set(v);
                        }
                    };
                }
                Object.defineProperty(this_1, camelizedName, descriptor);
                if (hyphenizedName != camelizedName) {
                    Object.defineProperty(this_1, hyphenizedName, descriptor);
                }
            };
            var this_1 = this;
            for (var name_1 in attributesConfig) {
                _loop_1(name_1);
            }
        }
        return _this;
    }
    return ElementAttributes;
}(EventEmitter));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ElementAttributes;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var cellx = __webpack_require__(0);
var ErrorLogger = cellx.ErrorLogger;
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
            ErrorLogger.log(err);
        }
    }
}
function defer(cb, context) {
    if (queue) {
        queue.push({ callback: cb, context: context });
    }
    else {
        queue = [{ callback: cb, context: context }];
        setTimeout(run, 1);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = defer;


/***/ },
/* 17 */
/***/ function(module, exports) {

"use strict";
"use strict";
var range = document.createRange();
var htmlToFragment;
if (range.createContextualFragment) {
    var selected_1 = false;
    htmlToFragment = function (html) {
        if (!selected_1) {
            range.selectNode(document.body);
            selected_1 = true;
        }
        return range.createContextualFragment(html);
    };
}
else {
    htmlToFragment = function (html) {
        var el = document.createElement('div');
        var df = document.createDocumentFragment();
        el.innerHTML = html;
        for (var child = void 0; (child = el.firstChild);) {
            df.appendChild(child);
        }
        return df;
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = htmlToFragment;


/***/ },
/* 18 */
/***/ function(module, exports) {

"use strict";
"use strict";
var toString = Object.prototype.toString;
function isRegExp(value) {
    return toString.call(value) == '[object RegExp]';
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = isRegExp;


/***/ },
/* 19 */
/***/ function(module, exports) {

"use strict";
"use strict";
var reEscapableEntities = /&(?:amp|lt|gt|quot);/g;
var entityToCharMap = Object.create(null);
entityToCharMap['&amp;'] = '&';
entityToCharMap['&lt;'] = '<';
entityToCharMap['&gt;'] = '>';
entityToCharMap['&quot;'] = '"';
function unescapeHTML(str) {
    return reEscapableEntities.test(str) ? str.replace(reEscapableEntities, function (entity) { return entityToCharMap[entity]; }) : str;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = unescapeHTML;


/***/ },
/* 20 */
/***/ function(module, exports) {

"use strict";
"use strict";
var cache = Object.create(null);
function formattersReducer(jsExpr, formatter) {
    var args = formatter.arguments;
    return "(this['" + formatter.name + "'] || formatters['" + formatter.name + "']).call(this, " + jsExpr + (args && args.value.length ? ', ' + args.value.join(', ') : '') + ")";
}
function bindingToJSExpression(binding) {
    var bindingRaw = binding.raw;
    if (cache[bindingRaw]) {
        return cache[bindingRaw];
    }
    var keypath = binding.keypath.value.split('?');
    var keypathLen = keypath.length;
    var formatters = binding.formatters;
    var usesFormatters = !!formatters.length;
    if (keypathLen == 1) {
        return (cache[bindingRaw] = {
            value: usesFormatters ? formatters.reduce(formattersReducer, 'this.' + keypath[0]) : 'this.' + keypath[0],
            usesFormatters: usesFormatters
        });
    }
    var index = keypathLen - 2;
    var jsExpr = Array(index);
    while (index) {
        jsExpr[--index] = " && (temp = temp" + keypath[index + 1] + ")";
    }
    return (cache[bindingRaw] = {
        value: "(temp = this." + keypath[0] + ")" + jsExpr.join('') + " && " + (usesFormatters ?
            formatters.reduce(formattersReducer, 'temp' + keypath[keypathLen - 1]) :
            'temp' + keypath[keypathLen - 1]),
        usesFormatters: usesFormatters
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = bindingToJSExpression;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var keypathToJSExpression_1 = __webpack_require__(23);
var cache = Object.create(null);
function compileKeypath(keypath) {
    return cache[keypath] || (cache[keypath] = Function("var temp; return " + keypathToJSExpression_1.default(keypath) + ";"));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = compileKeypath;


/***/ },
/* 22 */
/***/ function(module, exports) {

"use strict";
"use strict";
var hasOwn = Object.prototype.hasOwnProperty;
var reInsert = /\{([1-9]\d*|n)(?::((?:[^|]*\|)+?[^}]*))?\}/;
var texts;
var getPluralIndex;
var getText = function getText(context, key, plural, args) {
    var rawText;
    if (hasOwn.call(texts, context) && hasOwn.call(texts[context], key)) {
        rawText = (plural ? texts[context][key][getPluralIndex(+args[0])] : texts[context][key]);
    }
    else {
        rawText = key;
    }
    var data = Object.create(null);
    for (var i = args.length; i;) {
        data[i] = args[--i];
    }
    if (plural) {
        data.n = args[0];
    }
    var splittedRawText = rawText.split(reInsert);
    var text = [];
    for (var i = 0, l = splittedRawText.length; i < l;) {
        if (i % 3) {
            text.push(splittedRawText[i + 1] ?
                splittedRawText[i + 1].split('|')[getPluralIndex(data[splittedRawText[i]])] :
                data[splittedRawText[i]]);
            i += 2;
        }
        else {
            text.push(splittedRawText[i]);
            i++;
        }
    }
    return text.join('');
};
function configure(config) {
    texts = config.texts;
    getPluralIndex = Function('n', "return " + config.localeSettings.plural + ";");
    getText.localeSettings = config.localeSettings;
}
function t(key) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return getText('', key, false, args);
}
function pt(key, context) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return getText(context, key, false, args);
}
function nt(key) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return getText('', key, true, args);
}
function npt(key, context) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return getText(context, key, true, args);
}
getText.configure = configure;
getText.t = t;
getText.pt = pt;
getText.nt = nt;
getText.npt = npt;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getText;
configure({
    localeSettings: {
        code: 'ru',
        plural: '(n%100) >= 5 && (n%100) <= 20 ? 2 : (n%10) == 1 ? 0 : (n%10) >= 2 && (n%10) <= 4 ? 1 : 2'
    },
    texts: {}
});


/***/ },
/* 23 */
/***/ function(module, exports) {

"use strict";
"use strict";
var cache = Object.create(null);
function keypathToJSExpression(keypath) {
    if (cache[keypath]) {
        return cache[keypath];
    }
    var splittedKeypath = keypath.split('?');
    var splittedKeypathLen = splittedKeypath.length;
    if (splittedKeypathLen == 1) {
        return (cache[keypath] = 'this.' + keypath);
    }
    var index = splittedKeypathLen - 2;
    var jsExpr = Array(index);
    while (index) {
        jsExpr[--index] = ' && (temp = temp' + splittedKeypath[index + 1] + ')';
    }
    return (cache[keypath] = "(temp = this." + splittedKeypath[0] + ")" + jsExpr.join('') + " && temp" + splittedKeypath[splittedKeypathLen - 1]);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = keypathToJSExpression;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var DisposableMixin_1 = __webpack_require__(14);
var formatters_1 = __webpack_require__(10);
var getText_1 = __webpack_require__(22);
var Component_1 = __webpack_require__(1);
var rt_content_1 = __webpack_require__(26);
var rt_if_then_1 = __webpack_require__(12);
var rt_if_else_1 = __webpack_require__(27);
var rt_repeat_1 = __webpack_require__(28);
var ElementAttributes_1 = __webpack_require__(15);
var ComponentTemplate_1 = __webpack_require__(25);
var camelize_1 = __webpack_require__(3);
var hyphenize_1 = __webpack_require__(9);
var escapeString_1 = __webpack_require__(8);
var escapeHTML_1 = __webpack_require__(7);
var unescapeHTML_1 = __webpack_require__(19);
var isRegExp_1 = __webpack_require__(18);
var defer_1 = __webpack_require__(16);
var htmlToFragment_1 = __webpack_require__(17);
var Rionite = {
    DisposableMixin: DisposableMixin_1.default,
    formatters: formatters_1.default,
    getText: getText_1.default,
    Component: Component_1.default,
    Components: {
        RtContent: rt_content_1.default,
        RtIfThen: rt_if_then_1.default,
        RtIfElse: rt_if_else_1.default,
        RtRepeat: rt_repeat_1.default
    },
    ElementAttributes: ElementAttributes_1.default,
    ComponentTemplate: ComponentTemplate_1.default,
    Utils: {
        camelize: camelize_1.default,
        hyphenize: hyphenize_1.default,
        escapeString: escapeString_1.default,
        escapeHTML: escapeHTML_1.default,
        unescapeHTML: unescapeHTML_1.default,
        isRegExp: isRegExp_1.default,
        defer: defer_1.default,
        htmlToFragment: htmlToFragment_1.default
    }
};
Rionite['Rionite'] = Rionite; // for destructuring
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = Rionite.default = Rionite;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var namePattern_1 = __webpack_require__(6);
var escapeString_1 = __webpack_require__(8);
var escapeHTML_1 = __webpack_require__(7);
var keypathPattern = '(?:' + namePattern_1.default + '|\\[\\d+\\])(?:\\.' + namePattern_1.default + '|\\[\\d+\\])*';
var re = RegExp('\\{\\{' +
    '(?:' +
    '\\s*(?:' +
    'block\\s+(' + namePattern_1.default + ')|(\\/)block|(s)uper\\(\\)|(' + keypathPattern + ')' +
    ')\\s*|\\{\\s*(' + keypathPattern + ')\\s*\\}' +
    ')' +
    '\\}\\}');
var ComponentTemplate = (function () {
    function ComponentTemplate(tmpl, parent) {
        this.parent = parent || null;
        var currentBlock = { name: null, source: [] };
        var blocks = [currentBlock];
        var blockMap = {};
        var splittedTemplate = tmpl.split(re);
        for (var i = 0, l = splittedTemplate.length; i < l;) {
            if (i % 6) {
                var blockName = splittedTemplate[i];
                if (blockName) {
                    currentBlock.source.push("this." + blockName + ".call(this, data)");
                    currentBlock = { name: blockName, source: [] };
                    blocks.push((blockMap[blockName] = currentBlock));
                }
                else if (splittedTemplate[i + 1]) {
                    if (blocks.length > 1) {
                        blocks.pop();
                        currentBlock = blocks[blocks.length - 1];
                    }
                }
                else if (splittedTemplate[i + 2]) {
                    if (parent && blocks.length > 1 && parent._blockMap[currentBlock.name]) {
                        currentBlock.source.push('$super.call(this, data)');
                    }
                }
                else {
                    var keypath = splittedTemplate[i + 3];
                    currentBlock.source.push(keypath ? "escape(data." + keypath + ")" : 'data.' + splittedTemplate[i + 4]);
                }
                i += 5;
            }
            else {
                var text = splittedTemplate[i];
                if (text) {
                    currentBlock.source.push("'" + escapeString_1.default(text) + "'");
                }
                i++;
            }
        }
        this._renderer = parent ? parent._renderer : Function('data', 'escape', "return [" + blocks[0].source.join(', ') + "].join('');");
        Object.keys(blockMap).forEach(function (name) {
            var parentBlock = parent && parent._blockMap[name];
            var inner = Function('$super', 'data', 'escape', "return [" + blockMap[name].source.join(', ') + "].join('');");
            this[name] = function (data) {
                return inner.call(this, parentBlock, data, escapeHTML_1.default);
            };
        }, (this._blockMap = Object.create(parent ? parent._blockMap : null)));
    }
    ComponentTemplate.prototype.extend = function (tmpl) {
        return new ComponentTemplate(tmpl, this);
    };
    ComponentTemplate.prototype.render = function (data) {
        return this._renderer.call(this._blockMap, data || {}, escapeHTML_1.default);
    };
    return ComponentTemplate;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ComponentTemplate;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cellx = __webpack_require__(0);
var Component_1 = __webpack_require__(1);
var bindContent_1 = __webpack_require__(5);
var attachChildComponentElements_1 = __webpack_require__(4);
var Features_1 = __webpack_require__(2);
var KEY_TEMPLATES_FIXED = cellx.JS.Symbol('Rionite.RtContent#templatesFixed');
var RtContent = (function (_super) {
    __extends(RtContent, _super);
    function RtContent() {
        return _super.apply(this, arguments) || this;
    }
    RtContent.prototype._attachElement = function () {
        var ownerComponent = this.ownerComponent;
        var el = this.element;
        var props = this.props;
        if (this.isReady) {
            for (var child = void 0; (child = el.firstChild);) {
                el.removeChild(child);
            }
        }
        else {
            var inputContent = props.content = document.createDocumentFragment();
            for (var child = void 0; (child = el.firstChild);) {
                inputContent.appendChild(child);
            }
            var ownerComponentInputContent = ownerComponent.props.content;
            var selector = this.elementAttributes['select'];
            if (selector) {
                if (!Features_1.templateTag && !ownerComponentInputContent[KEY_TEMPLATES_FIXED]) {
                    var templates = ownerComponentInputContent.querySelectorAll('template');
                    for (var i = templates.length; i;) {
                        templates[--i].content;
                    }
                    ownerComponentInputContent[KEY_TEMPLATES_FIXED] = true;
                }
                var selectedEls = ownerComponentInputContent.querySelectorAll(selector);
                var selectedElCount = selectedEls.length;
                if (selectedElCount) {
                    var rawContent = this._rawContent = document.createDocumentFragment();
                    for (var i = 0; i < selectedElCount; i++) {
                        rawContent.appendChild(selectedEls[i].cloneNode(true));
                    }
                }
                else {
                    this._rawContent = inputContent;
                }
            }
            else {
                this._rawContent = ownerComponentInputContent.firstChild ? ownerComponentInputContent : inputContent;
            }
            this.isReady = true;
        }
        var content = this._rawContent.cloneNode(true);
        var getContext = props['getContext'];
        var _a = this._rawContent == props.content ?
            bindContent_1.default(content, ownerComponent, getContext ? ownerComponent[getContext](this, props.context) : props.context) :
            bindContent_1.default(content, ownerComponent.ownerComponent, getContext ?
                ownerComponent[getContext](this, ownerComponent.props.context) :
                ownerComponent.props.context), bindings = _a.bindings, childComponents = _a.childComponents;
        this._bindings = bindings;
        el.appendChild(content);
        if (!Features_1.nativeCustomElements && childComponents) {
            attachChildComponentElements_1.default(childComponents);
        }
    };
    RtContent.prototype._detachElement = function () {
        this._destroyBindings();
    };
    return RtContent;
}(Component_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RtContent;
RtContent.elementIs = 'rt-content';
RtContent.props = {
    select: { type: String, readonly: true },
    getContext: { type: String, readonly: true }
};
RtContent.template = '';
Component_1.default.register(RtContent);


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var rt_if_then_1 = __webpack_require__(12);
var RtIfElse = (function (_super) {
    __extends(RtIfElse, _super);
    function RtIfElse() {
        var _this = _super.apply(this, arguments) || this;
        _this._elseMode = true;
        return _this;
    }
    return RtIfElse;
}(rt_if_then_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RtIfElse;
RtIfElse.elementIs = 'rt-if-else';
RtIfElse.elementExtends = 'template';
rt_if_then_1.default.register(RtIfElse);


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cellx = __webpack_require__(0);
var Component_1 = __webpack_require__(1);
var compileKeypath_1 = __webpack_require__(21);
var bindContent_1 = __webpack_require__(5);
var attachChildComponentElements_1 = __webpack_require__(4);
var namePattern_1 = __webpack_require__(6);
var keypathPattern_1 = __webpack_require__(11);
var Features_1 = __webpack_require__(2);
var Cell = cellx.Cell;
var Map = cellx.JS.Map;
var nextTick = cellx.Utils.nextTick;
var slice = Array.prototype.slice;
var reForAttributeValue = RegExp("^\\s*(" + namePattern_1.default + ")\\s+of\\s+(" + keypathPattern_1.default + ")\\s*$");
var RtRepeat = (function (_super) {
    __extends(RtRepeat, _super);
    function RtRepeat() {
        return _super.apply(this, arguments) || this;
    }
    RtRepeat.prototype._attachElement = function () {
        if (!this.initialized) {
            var props = this.props;
            var forAttrValue = props['for'].match(reForAttributeValue);
            if (!forAttrValue) {
                throw new SyntaxError("Invalid value of attribute \"for\" (" + props['for'] + ")");
            }
            this._itemName = forAttrValue[1];
            this._list = new Cell(compileKeypath_1.default(forAttrValue[2]), { owner: props.context });
            this._itemMap = new Map();
            this._trackBy = props['trackBy'];
            var rawItemContent = this._rawItemContent =
                document.importNode(this.element.content, true);
            if (props['strip']) {
                var firstChild = rawItemContent.firstChild;
                var lastChild = rawItemContent.lastChild;
                if (firstChild == lastChild) {
                    if (firstChild.nodeType == 3) {
                        firstChild.textContent = firstChild.textContent.trim();
                    }
                }
                else {
                    if (firstChild.nodeType == 3) {
                        if (!(firstChild.textContent = firstChild.textContent.replace(/^\s+/, ''))) {
                            rawItemContent.removeChild(firstChild);
                        }
                    }
                    if (lastChild.nodeType == 3) {
                        if (!(lastChild.textContent = lastChild.textContent.replace(/\s+$/, ''))) {
                            rawItemContent.removeChild(lastChild);
                        }
                    }
                }
            }
            this._context = props.context;
            this.initialized = true;
        }
        this._list.on('change', this._onListChange, this);
        this._render(false);
    };
    RtRepeat.prototype._detachElement = function () {
        this._clearWithItemMap(this._itemMap);
        this._list.off('change', this._onListChange, this);
    };
    RtRepeat.prototype._onListChange = function () {
        if (this.element.parentNode) {
            this._render(true);
        }
    };
    RtRepeat.prototype._render = function (c) {
        var _this = this;
        var oldItemMap = this._oldItemMap = this._itemMap;
        this._itemMap = new Map();
        var list = this._list.get();
        var changed = false;
        if (list) {
            this._lastNode = this.element;
            changed = list.reduce(function (changed, item, index) { return _this._renderItem(item, index) || changed; }, changed);
        }
        if (oldItemMap.size) {
            this._clearWithItemMap(oldItemMap);
        }
        else if (!changed) {
            return;
        }
        if (c) {
            nextTick(function () {
                _this.emit('change');
            });
        }
    };
    RtRepeat.prototype._renderItem = function (item, index) {
        var trackBy = this._trackBy;
        var trackingValue = trackBy ? (trackBy == '$index' ? index : item[trackBy]) : item;
        var prevItems = this._oldItemMap.get(trackingValue);
        var currentItems = this._itemMap.get(trackingValue);
        if (prevItems) {
            var prevItem = void 0;
            if (prevItems.length == 1) {
                prevItem = prevItems[0];
                this._oldItemMap.delete(trackingValue);
            }
            else {
                prevItem = prevItems.shift();
            }
            if (currentItems) {
                currentItems.push(prevItem);
            }
            else {
                this._itemMap.set(trackingValue, [prevItem]);
            }
            prevItem.item.set(item);
            var nodes = prevItem.nodes;
            if (index == prevItem.index.get()) {
                this._lastNode = nodes[nodes.length - 1];
                return false;
            }
            prevItem.index.set(index);
            if (nodes.length == 1) {
                var node = nodes[0];
                this._lastNode.parentNode.insertBefore(node, this._lastNode.nextSibling);
                this._lastNode = node;
            }
            else {
                var df = document.createDocumentFragment();
                for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                    var node = nodes_1[_i];
                    df.appendChild(node);
                }
                var newLastNode_1 = df.lastChild;
                this._lastNode.parentNode.insertBefore(df, this._lastNode.nextSibling);
                this._lastNode = newLastNode_1;
            }
            return true;
        }
        var itemCell = new Cell(item);
        var indexCell = new Cell(index);
        var content = this._rawItemContent.cloneNode(true);
        var context = Object.create(this._context, (_a = {},
            _a[this._itemName] = {
                get: function () {
                    return itemCell.get();
                }
            },
            _a.$index = {
                get: function () {
                    return indexCell.get();
                }
            },
            _a));
        var _b = bindContent_1.default(content, this.ownerComponent, context), bindings = _b.bindings, childComponents = _b.childComponents;
        var newItem = {
            item: itemCell,
            index: indexCell,
            nodes: slice.call(content.childNodes),
            bindings: bindings
        };
        if (currentItems) {
            currentItems.push(newItem);
        }
        else {
            this._itemMap.set(trackingValue, [newItem]);
        }
        var newLastNode = content.lastChild;
        this._lastNode.parentNode.insertBefore(content, this._lastNode.nextSibling);
        this._lastNode = newLastNode;
        if (!Features_1.nativeCustomElements && childComponents) {
            attachChildComponentElements_1.default(childComponents);
        }
        return true;
        var _a;
    };
    RtRepeat.prototype._clearWithItemMap = function (itemMap) {
        itemMap.forEach(this._clearWithItems, this);
        itemMap.clear();
    };
    RtRepeat.prototype._clearWithItems = function (items) {
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
    return RtRepeat;
}(Component_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RtRepeat;
RtRepeat.elementIs = 'rt-repeat';
RtRepeat.elementExtends = 'template';
RtRepeat.props = {
    for: { type: String, required: true, readonly: true },
    trackBy: { type: String, readonly: true },
    strip: { default: false, readonly: true }
};
Component_1.default.register(RtRepeat);


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var cellx = __webpack_require__(0);
var defer_1 = __webpack_require__(16);
var Symbol = cellx.JS.Symbol;
var attached = Symbol('Rionite.ElementProtoMixin.attached');
var ElementProtoMixin = (_a = {
        rioniteComponent: null,
        get $c() {
            return new this._rioniteComponentConstructor(this);
        }
    },
    _a[attached] = false,
    _a.connectedCallback = function () {
        this[attached] = true;
        var component = this.rioniteComponent;
        if (component) {
            if (component.isElementAttached) {
                if (component._parentComponent === null) {
                    component._parentComponent = undefined;
                    component.elementMoved();
                }
            }
            else {
                component._parentComponent = undefined;
                component.isElementAttached = true;
                component._attachElement();
            }
        }
        else {
            defer_1.default(function () {
                if (this[attached]) {
                    var component_1 = this.$c;
                    component_1._parentComponent = undefined;
                    if (!component_1.parentComponent) {
                        component_1.isElementAttached = true;
                        component_1._attachElement();
                    }
                }
            }, this);
        }
    },
    _a.disconnectedCallback = function () {
        this[attached] = false;
        var component = this.rioniteComponent;
        if (component && component.isElementAttached) {
            component._parentComponent = null;
            defer_1.default(function () {
                if (component._parentComponent === null && component.isElementAttached) {
                    component.isElementAttached = false;
                    component._detachElement();
                }
            });
        }
    },
    _a.attributeChangedCallback = function (name, oldValue, value) {
        var component = this.rioniteComponent;
        if (component && component.isReady) {
            component.elementAttributes['_' + name].set(value);
        }
    },
    _a);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ElementProtoMixin;
var _a;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var cellx = __webpack_require__(0);
var nextUID = cellx.Utils.nextUID;
var hasOwn = Object.prototype.hasOwnProperty;
var KEY_UID = cellx.JS.Symbol('uid');
var getUID;
if (typeof KEY_UID == 'symbol') {
    getUID = function getUID(obj) {
        return hasOwn.call(obj, KEY_UID) ? obj[KEY_UID] : (obj[KEY_UID] = nextUID());
    };
}
else {
    getUID = function getUID(obj) {
        return hasOwn.call(obj, KEY_UID) ? obj[KEY_UID] : Object.defineProperty(obj, KEY_UID, {});
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getUID;


/***/ },
/* 31 */
/***/ function(module, exports) {

"use strict";
"use strict";
function setAttribute(el, name, value) {
    if (value === false || value == null) {
        el.removeAttribute(name);
    }
    else {
        el.setAttribute(name, value === true ? '' : value);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setAttribute;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var cellx = __webpack_require__(0);
var isRegExp_1 = __webpack_require__(18);
var escapeHTML_1 = __webpack_require__(7);
var unescapeHTML_1 = __webpack_require__(19);
var Map = cellx.JS.Map;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new Map([
    [Boolean, [function (value) {
                return value !== null ? value != 'no' : false;
            }, function (value) {
                return value ? '' : null;
            }]],
    ['boolean', [function (value, defaultValue) {
                return value !== null ? value != 'no' : defaultValue;
            }, function (value, defaultValue) {
                return value ? '' : (defaultValue ? 'no' : null);
            }]],
    [Number, [function (value) {
                return value !== null ? +value : undefined;
            }, function (value) {
                return value !== undefined ? String(+value) : null;
            }]],
    ['number', [function (value, defaultValue) {
                return value !== null ? +value : defaultValue;
            }, function (value) {
                return value !== undefined ? String(+value) : null;
            }]],
    [String, [function (value) {
                return value !== null ? value : undefined;
            }, function (value) {
                return value !== undefined ? String(value) : null;
            }]],
    ['string', [function (value, defaultValue) {
                return value !== null ? value : defaultValue;
            }, function (value) {
                return value !== undefined ? String(value) : null;
            }]],
    [Object, [function (value) {
                return value !== null ? Object(Function("return " + unescapeHTML_1.default(value) + ";")()) : undefined;
            }, function (value) {
                return value != null ? escapeHTML_1.default(isRegExp_1.default(value) ? value.toString() : JSON.stringify(value)) : null;
            }]],
    ['object', [function (value, defaultValue) {
                return value !== null ? Object(Function("return " + unescapeHTML_1.default(value) + ";")()) : defaultValue;
            }, function (value) {
                return value != null ? escapeHTML_1.default(isRegExp_1.default(value) ? value.toString() : JSON.stringify(value)) : null;
            }]]
]);


/***/ },
/* 33 */
/***/ function(module, exports) {

"use strict";
"use strict";
function bindEvents(component, events) {
    for (var assetName in events) {
        var asset = void 0;
        if (assetName == ':component') {
            asset = component;
        }
        else if (assetName == ':element') {
            asset = component.element;
        }
        else {
            asset = component.$(assetName);
            if (!asset) {
                continue;
            }
        }
        var assetEvents = events[assetName];
        for (var evtName in assetEvents) {
            component.listenTo(asset, evtName, assetEvents[evtName]);
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = bindEvents;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var bindingToJSExpression_1 = __webpack_require__(20);
var formatters_1 = __webpack_require__(10);
var cache = Object.create(null);
function compileBinding(binding) {
    var bindingRaw = binding.raw;
    if (cache[bindingRaw]) {
        return cache[bindingRaw];
    }
    var bindingJSExpr = bindingToJSExpression_1.default(binding);
    var jsExpr = "var temp; return " + bindingJSExpr.value + ";";
    if (bindingJSExpr.usesFormatters) {
        var inner_1 = Function('formatters', jsExpr);
        return (cache[bindingRaw] = function () {
            return inner_1.call(this, formatters_1.default);
        });
    }
    return (cache[bindingRaw] = Function(jsExpr));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = compileBinding;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var ContentParser_1 = __webpack_require__(13);
var bindingToJSExpression_1 = __webpack_require__(20);
var compileBinding_1 = __webpack_require__(34);
var formatters_1 = __webpack_require__(10);
var escapeString_1 = __webpack_require__(8);
var ContentNodeType = ContentParser_1.default.ContentNodeType;
var cache = Object.create(null);
function compileContent(parsedContent, content) {
    if (cache[content]) {
        return cache[content];
    }
    if (parsedContent.length == 1 && parsedContent[0].type == ContentNodeType.BINDING) {
        return (cache[content] = compileBinding_1.default(parsedContent[0]));
    }
    var usesFormatters = false;
    var jsExprParts = [];
    for (var _i = 0, parsedContent_1 = parsedContent; _i < parsedContent_1.length; _i++) {
        var node = parsedContent_1[_i];
        if (node.type == ContentNodeType.TEXT) {
            jsExprParts.push("'" + escapeString_1.default(node.value) + "'");
        }
        else {
            var bindingJSExpr = bindingToJSExpression_1.default(node);
            if (!usesFormatters && bindingJSExpr.usesFormatters) {
                usesFormatters = true;
            }
            jsExprParts.push(bindingJSExpr.value);
        }
    }
    var jsExpr = "var temp; return [" + jsExprParts.join(', ') + "].join('');";
    if (usesFormatters) {
        var inner_1 = Function('formatters', jsExpr);
        return (cache[content] = function () {
            return inner_1.call(this, formatters_1.default);
        });
    }
    return (cache[content] = Function(jsExpr));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = compileContent;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var cellx = __webpack_require__(0);
var mixin = cellx.Utils.mixin;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mixin(Object.create(null), {
    a: window.HTMLAnchorElement,
    blockquote: window.HTMLQuoteElement,
    br: window.HTMLBRElement,
    caption: window.HTMLTableCaptionElement,
    col: window.HTMLTableColElement,
    colgroup: window.HTMLTableColElement,
    datalist: window.HTMLDataListElement,
    del: window.HTMLModElement,
    dir: window.HTMLDirectoryElement,
    dl: window.HTMLDListElement,
    document: window.HTMLDocument,
    element: Element,
    fieldset: window.HTMLFieldSetElement,
    frameset: window.HTMLFrameSetElement,
    h1: window.HTMLHeadingElement,
    h2: window.HTMLHeadingElement,
    h3: window.HTMLHeadingElement,
    h4: window.HTMLHeadingElement,
    h5: window.HTMLHeadingElement,
    h6: window.HTMLHeadingElement,
    hr: window.HTMLHRElement,
    iframe: window.HTMLIFrameElement,
    img: window.HTMLImageElement,
    ins: window.HTMLModElement,
    li: window.HTMLLIElement,
    menuitem: window.HTMLMenuItemElement,
    ol: window.HTMLOListElement,
    optgroup: window.HTMLOptGroupElement,
    p: window.HTMLParagraphElement,
    q: window.HTMLQuoteElement,
    tbody: window.HTMLTableSectionElement,
    td: window.HTMLTableCellElement,
    template: window.HTMLTemplateElement || HTMLElement,
    textarea: window.HTMLTextAreaElement,
    tfoot: window.HTMLTableSectionElement,
    th: window.HTMLTableCellElement,
    thead: window.HTMLTableSectionElement,
    tr: window.HTMLTableRowElement,
    ul: window.HTMLUListElement,
    vhgroupv: window.HTMLUnknownElement,
    vkeygen: window.HTMLUnknownElement
});


/***/ },
/* 37 */
/***/ function(module, exports) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    'click', 'dblclick', 'mousedown', 'mouseup',
    'input', 'change', 'submit',
    'focusin', 'focusout'
];


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var camelize_1 = __webpack_require__(3);
function initAttributes(component, constr) {
    var attributesConfig = constr.elementAttributes;
    if (attributesConfig) {
        var attrs = component.elementAttributes;
        for (var name_1 in attributesConfig) {
            if (typeof attributesConfig[name_1] != 'function') {
                var camelizedName = camelize_1.default(name_1);
                attrs[camelizedName] = attrs[camelizedName];
            }
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = initAttributes;


/***/ },
/* 39 */
/***/ function(module, exports) {

"use strict";
"use strict";
function onEvent(evt) {
    var node;
    var attrName;
    var targetEls;
    if (evt instanceof Event) {
        node = evt.target;
        attrName = 'rt-' + evt.type;
    }
    else {
        node = evt.target.element;
        attrName = 'rt-component-' + evt.type;
    }
    for (;;) {
        if (node.nodeType == 1 && node.hasAttribute(attrName)) {
            (targetEls || (targetEls = [])).push(node);
        }
        node = node.parentNode;
        if (!node) {
            break;
        }
        var component = node.$c;
        if (component && targetEls) {
            for (var i = 0, l = targetEls.length; i < l; i++) {
                var targetEl = targetEls[i];
                var handler = component[targetEl.getAttribute(attrName)];
                if (typeof handler == 'function') {
                    if (handler.call(component, evt, targetEl.$c || targetEl) === false) {
                        evt.isPropagationStopped = true;
                        return;
                    }
                    if (evt.isPropagationStopped) {
                        return;
                    }
                }
            }
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = onEvent;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var cellx = __webpack_require__(0);
var elementConstructorMap_1 = __webpack_require__(36);
var ElementProtoMixin_1 = __webpack_require__(29);
var hyphenize_1 = __webpack_require__(9);
var mixin = cellx.Utils.mixin;
var push = Array.prototype.push;
function registerComponent(componentConstr) {
    var elIs = componentConstr.elementIs;
    if (!elIs) {
        throw new TypeError('Static property "elementIs" is required');
    }
    var parentComponentConstr = Object.getPrototypeOf(componentConstr.prototype).constructor;
    if (componentConstr.props !== parentComponentConstr.props) {
        var props = componentConstr.props;
        if (props && (props['content'] || props['context'])) {
            throw new TypeError("No need to declare property \"" + (props['content'] ? 'content' : 'context') + "\"");
        }
        componentConstr.elementAttributes = props;
    }
    if (componentConstr.template !== parentComponentConstr.template && componentConstr.template) {
        componentConstr._markupBlockNames = [elIs];
        if (parentComponentConstr._markupBlockNames) {
            push.apply(componentConstr._markupBlockNames, parentComponentConstr._markupBlockNames);
        }
    }
    componentConstr._assetClassNames = Object.create(parentComponentConstr._assetClassNames || null);
    var elExtends = componentConstr.elementExtends;
    var parentElConstr = elExtends ?
        elementConstructorMap_1.default[elExtends] ||
            window["HTML" + (elExtends.charAt(0).toUpperCase() + elExtends.slice(1)) + "Element"] :
        HTMLElement;
    var elConstr = function (self) {
        return parentElConstr.call(this, self);
    };
    var elProto = elConstr.prototype = Object.create(parentElConstr.prototype);
    Object.defineProperty(elConstr, 'observedAttributes', {
        configurable: true,
        enumerable: true,
        get: function () {
            var elementAttributes = componentConstr.elementAttributes;
            if (!elementAttributes) {
                return [];
            }
            var observedAttributes = [];
            for (var name_1 in elementAttributes) {
                observedAttributes.push(hyphenize_1.default(name_1));
            }
            return observedAttributes;
        }
    });
    mixin(elProto, ElementProtoMixin_1.default);
    Object.defineProperty(elProto, 'constructor', {
        configurable: true,
        writable: true,
        value: elConstr
    });
    elProto._rioniteComponentConstructor = componentConstr;
    elementConstructorMap_1.default[elIs] = window.customElements.define(elIs, elConstr, elExtends ? { extends: elExtends } : null);
    return (componentConstr._registeredComponent = componentConstr);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = registerComponent;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Component_1 = __webpack_require__(1);
function setElementClasses(el, constr) {
    var c = constr;
    do {
        el.classList.add(c.elementIs);
        c = Object.getPrototypeOf(c.prototype).constructor;
    } while (c != Component_1.default);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setElementClasses;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(24);


/***/ }
/******/ ]);
});