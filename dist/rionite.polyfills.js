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
    V0 = REGISTER_ELEMENT in document,
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
            if (node.nodeType !== 11) {
              i = getTypeIndex(node);
              if (-1 < i) patch(node, protos[i]);
            }
            if (deep && query.length) loopAndSetup(node.querySelectorAll(query));
            return node;
          };
        });
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
    if (!V0) {
      justSetup = true;
      document[REGISTER_ELEMENT]('');
    }
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
      return {is: is.toLowerCase()};
    };
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 48);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
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
var cellx_1 = __webpack_require__(0);
var html_to_fragment_1 = __webpack_require__(25);
var DisposableMixin_1 = __webpack_require__(19);
var elementConstructorMap_1 = __webpack_require__(29);
var registerComponent_1 = __webpack_require__(50);
var ElementProtoMixin_1 = __webpack_require__(6);
var ComponentInput_1 = __webpack_require__(17);
var bindContent_1 = __webpack_require__(4);
var componentBinding_1 = __webpack_require__(44);
var attachChildComponentElements_1 = __webpack_require__(3);
var bindEvents_1 = __webpack_require__(41);
var eventTypes_1 = __webpack_require__(47);
var onEvent_1 = __webpack_require__(49);
var camelize_1 = __webpack_require__(20);
var getUID_1 = __webpack_require__(8);
var moveContent_1 = __webpack_require__(14);
var Features_1 = __webpack_require__(7);
var Map = cellx_1.JS.Map;
var createClass = cellx_1.Utils.createClass;
var map = Array.prototype.map;
var reInputChangeEventName = /input\-([\-0-9a-z]*)\-change/;
function findChildComponentElements(node, ownerComponent, context, _childComponents) {
    for (var child = node.firstChild; child; child = child.nextSibling) {
        if (child.nodeType == Node.ELEMENT_NODE) {
            var childComponent = child.$component;
            if (childComponent) {
                childComponent.ownerComponent = ownerComponent;
                childComponent.input.$context = context;
                (_childComponents || (_childComponents = [])).push(childComponent);
            }
            if (child.firstChild &&
                (!childComponent || childComponent.constructor.template == null)) {
                _childComponents = findChildComponentElements(child, ownerComponent, context, _childComponents);
            }
        }
    }
    return _childComponents || null;
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
        DisposableMixin_1.default.call(_this);
        var constr = _this.constructor;
        if (!elementConstructorMap_1.default[constr.elementIs]) {
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
            var input = ComponentInput_1.default.init(this);
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
            this.input[camelize_1.default(RegExp.$1)];
            cellx_1.EventEmitter.currentlySubscribing = false;
        }
        _super.prototype._on.call(this, type, listener, context);
    };
    Component.prototype._handleEvent = function (evt) {
        _super.prototype._handleEvent.call(this, evt);
        var silent = this._silent;
        if (silent === undefined) {
            silent = this._silent = this.element.hasAttribute('rt-silent');
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
    Component.prototype._listenTo = function (target, type, listener, context, useCapture) {
        if (target instanceof Component) {
            var index = void 0;
            if (type.charAt(0) == '<' && (index = type.indexOf('>', 1)) > 1) {
                var targetName = type.slice(1, index);
                if (targetName != '*') {
                    var targetElConstr = elementConstructorMap_1.default[targetName];
                    if (!targetElConstr) {
                        throw new TypeError("Component \"" + targetName + "\" is not defined");
                    }
                    var targetConstr_1 = targetElConstr._rioniteComponentConstructor;
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
        return DisposableMixin_1.default.prototype._listenTo.call(this, target, type, listener, context, useCapture);
    };
    Component.prototype._attach = function () {
        this._attached = true;
        if (!this.initialized) {
            this.initialize();
            this.initialized = true;
        }
        var constr = this.constructor;
        if (this.isReady) {
            this._unfreezeBindings();
            if (constr.events) {
                bindEvents_1.default(this, constr.events);
            }
        }
        else {
            var el = this.element;
            el.className = constr._blockNamesString + el.className;
            if (constr.template == null) {
                this.input;
                this._bindings = null;
                var childComponents = findChildComponentElements(el, this.ownerComponent, this.input.$context);
                if (childComponents) {
                    attachChildComponentElements_1.default(childComponents);
                }
                if (constr.events) {
                    bindEvents_1.default(this, constr.events);
                }
            }
            else {
                ElementProtoMixin_1.suppressConnectionStatusCallbacks();
                this.input.$content = moveContent_1.default(document.createDocumentFragment(), el);
                ElementProtoMixin_1.resumeConnectionStatusCallbacks();
                var rawContent = constr._rawContent;
                if (!rawContent) {
                    rawContent = constr._rawContent = html_to_fragment_1.default(constr.template.render());
                }
                var content = rawContent.cloneNode(true);
                if (!Features_1.templateTag) {
                    var templates = content.querySelectorAll('template');
                    for (var i = 0, l = templates.length; i < l;) {
                        i += templates[i].content.querySelectorAll('template').length + 1;
                    }
                }
                var _a = bindContent_1.default(content, this), bindings = _a[0], childComponents = _a[1];
                this._bindings = bindings;
                this.element.appendChild(content);
                if (childComponents && !childComponents[0]._attached) {
                    attachChildComponentElements_1.default(childComponents);
                }
                if (constr.events) {
                    bindEvents_1.default(this, constr.events);
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
        return DisposableMixin_1.default.prototype.dispose.call(this);
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
        return elList && elList.length ? elList[0].$component || elList[0] : null;
    };
    Component.prototype.$$ = function (name, container) {
        var elList = this._getElementList(name, container);
        return elList ? map.call(elList, function (el) { return el.$component || el; }) : [];
    };
    Component.prototype._getElementList = function (name, container) {
        var elListMap = this._elementListMap || (this._elementListMap = new Map());
        var containerEl = container ?
            (container instanceof Component ? container.element : container) :
            this.element;
        var key = container ? getUID_1.default(containerEl) + '/' + name : name;
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
                for (var i = contentBlockNames.length; i;) {
                    className = contentBlockNames[--i] + '__' + name;
                    elList = containerEl.getElementsByClassName(className);
                    if (elList.length) {
                        constr._elementClassNameMap[name] = className;
                        elListMap.set(key, elList);
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
    return Component;
}(cellx_1.EventEmitter));
Component.register = registerComponent_1.default;
Component.elementExtends = null;
Component.input = null;
Component.i18n = null;
Component.template = null;
Component.events = null;
exports.default = Component;
var DisposableMixinProto = DisposableMixin_1.default.prototype;
var ComponentProto = Component.prototype;
Object.getOwnPropertyNames(DisposableMixinProto).forEach(function (name) {
    if (!(name in ComponentProto)) {
        Object.defineProperty(ComponentProto, name, Object.getOwnPropertyDescriptor(DisposableMixinProto, name));
    }
});
created = ComponentProto.created;
initialize = ComponentProto.initialize;
ready = ComponentProto.ready;
elementConnected = ComponentProto.elementConnected;
elementDisconnected = ComponentProto.elementDisconnected;
elementAttached = ComponentProto.elementAttached;
elementDetached = ComponentProto.elementDetached;
elementMoved = ComponentProto.elementMoved;
document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
    document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
    eventTypes_1.default.forEach(function (type) {
        document.addEventListener(type, onEvent_1.default);
    });
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(1);
var d = {
    Component: function Component_(config) {
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
            if (config.events !== undefined) {
                componentConstr.events = config.events;
            }
            Component_1.default.register(componentConstr);
        };
    }
};
exports.default = d;


/***/ }),
/* 3 */
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
exports.default = attachChildComponentElements;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(0);
var ContentParser_1 = __webpack_require__(26);
var compileContent_1 = __webpack_require__(43);
var setAttribute_1 = __webpack_require__(40);
var ContentNodeType = ContentParser_1.default.ContentNodeType;
function bindContent(content, ownerComponent, context) {
    if (!context) {
        context = ownerComponent;
    }
    var bindings;
    var childComponents;
    function bind(node) {
        var _loop_1 = function (child) {
            switch (child.nodeType) {
                case Node.ELEMENT_NODE: {
                    var attrs = child.attributes;
                    var _loop_2 = function (i) {
                        var attr = attrs.item(--i);
                        var value = attr.value;
                        if (value.indexOf('{') != -1) {
                            var content_1 = (new ContentParser_1.default(value)).parse();
                            if (content_1.length > 1 || content_1[0].nodeType == ContentNodeType.BINDING) {
                                var name_1 = attr.name;
                                if (name_1.charAt(0) == '_') {
                                    name_1 = name_1.slice(1);
                                }
                                var cell = new cellx_1.Cell(compileContent_1.default(content_1, value, ownerComponent), {
                                    owner: context,
                                    onChange: function (evt) {
                                        setAttribute_1.default(child, name_1, evt.value);
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
                    var childComponent = child.$component;
                    if (childComponent) {
                        childComponent.ownerComponent = ownerComponent;
                        childComponent.input.$context = context;
                        (childComponents || (childComponents = [])).push(childComponent);
                    }
                    if (child.firstChild &&
                        (!childComponent || childComponent.constructor.template == null)) {
                        bind(child);
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
                        var content_2 = (new ContentParser_1.default(value)).parse();
                        if (content_2.length > 1 || content_2[0].nodeType == ContentNodeType.BINDING) {
                            var cell = new cellx_1.Cell(compileContent_1.default(content_2, value), {
                                owner: context,
                                onChange: function (evt) {
                                    child.nodeValue = evt.value;
                                }
                            });
                            child.nodeValue = cell.get();
                            (bindings || (bindings = [])).push(cell);
                        }
                    }
                    break;
                }
            }
        };
        for (var child = node.firstChild; child; child = child.nextSibling) {
            _loop_1(child);
        }
    }
    bind(content);
    return {
        0: bindings || null,
        1: childComponents || null
    };
}
exports.default = bindContent;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(0);
var KEY_ELEMENT_CONNECTED = cellx_1.JS.Symbol('Rionite.KEY_ELEMENT_CONNECTED');
exports.default = KEY_ELEMENT_CONNECTED;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var KEY_ELEMENT_CONNECTED_1 = __webpack_require__(5);
var defer_1 = __webpack_require__(21);
var Features_1 = __webpack_require__(7);
var isConnectionStatusCallbacksSuppressed = false;
function suppressConnectionStatusCallbacks() {
    isConnectionStatusCallbacksSuppressed = true;
}
exports.suppressConnectionStatusCallbacks = suppressConnectionStatusCallbacks;
function resumeConnectionStatusCallbacks() {
    isConnectionStatusCallbacksSuppressed = false;
}
exports.resumeConnectionStatusCallbacks = resumeConnectionStatusCallbacks;
var ElementProtoMixin = (_a = {
        rioniteComponent: null,
        get $component() {
            return this.rioniteComponent || new this.constructor._rioniteComponentConstructor(this);
        }
    },
    _a[KEY_ELEMENT_CONNECTED_1.default] = false,
    _a.connectedCallback = function () {
        this[KEY_ELEMENT_CONNECTED_1.default] = true;
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
            defer_1.default(function () {
                if (this[KEY_ELEMENT_CONNECTED_1.default]) {
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
        this[KEY_ELEMENT_CONNECTED_1.default] = false;
        if (isConnectionStatusCallbacksSuppressed) {
            return;
        }
        var component = this.rioniteComponent;
        if (component && component._attached) {
            component._parentComponent = null;
            component.elementDisconnected();
            defer_1.default(function () {
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
exports.default = ElementProtoMixin;
var _a;


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
var cellx_1 = __webpack_require__(0);
var nextUID = cellx_1.Utils.nextUID;
var hasOwn = Object.prototype.hasOwnProperty;
var KEY_UID = cellx_1.JS.Symbol('uid');
var getUID;
if (typeof KEY_UID == 'symbol') {
    getUID = function getUID(obj) {
        return hasOwn.call(obj, KEY_UID) ? obj[KEY_UID] : (obj[KEY_UID] = nextUID());
    };
}
else {
    getUID = function getUID(obj) {
        if (!hasOwn.call(obj, KEY_UID)) {
            Object.defineProperty(obj, KEY_UID, { value: nextUID() });
        }
        return obj[KEY_UID];
    };
}
exports.default = getUID;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var escapeHTML_1 = __webpack_require__(37);
exports.escapeHTML = escapeHTML_1.default;
var unescapeHTML_1 = __webpack_require__(38);
exports.unescapeHTML = unescapeHTML_1.default;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = escapeHTML_1.default;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(0);
var KEY_COMPONENT_INPUT_VALUES = cellx_1.JS.Symbol('Rionite.KEY_COMPONENT_INPUT_VALUES');
exports.default = KEY_COMPONENT_INPUT_VALUES;


/***/ }),
/* 11 */
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
exports.default = hyphenize;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var reEscapableChars = /[\\'"\r\n]/g;
var charToEscapedMap = Object.create(null);
charToEscapedMap['\\'] = '\\\\';
charToEscapedMap['\''] = '\\\'';
charToEscapedMap['"'] = '\\"';
charToEscapedMap['\r'] = '\\r';
charToEscapedMap['\n'] = '\\n';
function escapeString(str) {
    return reEscapableChars.test(str) ? str.replace(reEscapableChars, function (chr) { return charToEscapedMap[chr]; }) : str;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = escapeString;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nelm_parser_1 = __webpack_require__(31);
exports.NodeType = nelm_parser_1.NodeType;
exports.Parser = nelm_parser_1.default;
var Template_1 = __webpack_require__(52);
exports.Template = Template_1.default;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function moveContent(target, source) {
    for (var child = void 0; (child = source.firstChild);) {
        target.appendChild(child);
    }
    return target;
}
exports.default = moveContent;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var namePattern_1 = __webpack_require__(16);
exports.default = "(?:" + namePattern_1.default + "|\\d+)(?:\\.(?:" + namePattern_1.default + "|\\d+))*";


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = '[$_a-zA-Z][$\\w]*';


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(0);
var componentInputTypeMap_1 = __webpack_require__(45);
var componentInputTypeSerializerMap_1 = __webpack_require__(46);
var hyphenize_1 = __webpack_require__(11);
function initInputProperty(input, name, el) {
    var component = el.$component;
    var inputPropertyConfig = component.constructor.input[name];
    if (inputPropertyConfig == null) {
        return;
    }
    var type = typeof inputPropertyConfig;
    var defaultValue;
    var required;
    var readonly;
    if (type == 'function') {
        type = inputPropertyConfig;
        required = readonly = false;
    }
    else if (type == 'object' && (inputPropertyConfig.type !== undefined || inputPropertyConfig.default !== undefined)) {
        type = inputPropertyConfig.type;
        defaultValue = inputPropertyConfig.default;
        if (type === undefined) {
            type = typeof defaultValue;
        }
        else if (defaultValue !== undefined && componentInputTypeMap_1.default.has(type) &&
            componentInputTypeMap_1.default.get(type) != typeof defaultValue) {
            throw new TypeError('Specified type does not match defaultValue type');
        }
        required = inputPropertyConfig.required;
        readonly = inputPropertyConfig.readonly;
    }
    else {
        defaultValue = inputPropertyConfig;
        required = readonly = false;
    }
    var typeSerializer = componentInputTypeSerializerMap_1.default.get(type);
    if (!typeSerializer) {
        throw new TypeError('Unsupported component input type');
    }
    var hyphenizedName = hyphenize_1.default(name);
    var rawValue = el.getAttribute(hyphenizedName);
    if (required && rawValue === null) {
        throw new TypeError("Input property \"" + name + "\" is required");
    }
    if (rawValue === null && defaultValue != null && defaultValue !== false) {
        el.setAttribute(hyphenizedName, typeSerializer.write(defaultValue));
    }
    var value = typeSerializer.read(rawValue, defaultValue, component);
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
            var val = typeSerializer.read(rawValue, defaultValue, component);
            if (valueCell_1) {
                valueCell_1.set(val);
            }
            else {
                value = val;
            }
        };
        input['_' + name] = setRawValue;
        if (name != hyphenizedName) {
            input['_' + hyphenizedName] = setRawValue;
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
                            component.emit({
                                type: "input-" + hyphenizedName + "-change",
                                oldValue: evt.oldValue,
                                value: evt.value
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
    Object.defineProperty(input, name, descriptor);
}
var ComponentInput = {
    init: function (component) {
        var inputConfig = component.constructor.input;
        var el = component.element;
        var input = { $content: null, $context: null };
        if (inputConfig) {
            for (var name_1 in inputConfig) {
                initInputProperty(input, name_1, el);
            }
        }
        return input;
    }
};
exports.default = ComponentInput;


/***/ }),
/* 18 */
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
var cellx_1 = __webpack_require__(0);
var Component_1 = __webpack_require__(1);
var KEY_ELEMENT_CONNECTED_1 = __webpack_require__(5);
var compileKeypath_1 = __webpack_require__(28);
var bindContent_1 = __webpack_require__(4);
var attachChildComponentElements_1 = __webpack_require__(3);
var keypathPattern_1 = __webpack_require__(15);
var Features_1 = __webpack_require__(7);
var d_1 = __webpack_require__(2);
var nextTick = cellx_1.Utils.nextTick;
var slice = Array.prototype.slice;
var reKeypath = RegExp("^" + keypathPattern_1.default + "$");
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
            var getIfValue_1 = compileKeypath_1.default(if_);
            this._if = new cellx_1.Cell(function () {
                return !!getIfValue_1.call(this);
            }, { owner: this.input.$context });
            this.initialized = true;
        }
        this._if.on('change', this._onIfChange, this);
        this._render(false);
    };
    RtIfThen.prototype.elementDisconnected = function () {
        var _this = this;
        nextTick(function () {
            if (!_this.element[KEY_ELEMENT_CONNECTED_1.default]) {
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
            var _a = bindContent_1.default(content, this.ownerComponent, this.input.$context), bindings = _a[0], childComponents = _a[1];
            this._nodes = slice.call(content.childNodes);
            this._bindings = bindings;
            this.element.parentNode.insertBefore(content, this.element.nextSibling);
            if (childComponents && !childComponents[0]._attached) {
                attachChildComponentElements_1.default(childComponents);
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
    return RtIfThen;
}(Component_1.default));
RtIfThen = __decorate([
    d_1.default.Component({
        elementIs: 'rt-if-then',
        elementExtends: 'template',
        input: {
            if: { type: String, required: true, readonly: true }
        }
    })
], RtIfThen);
exports.default = RtIfThen;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(0);
var nextUID = cellx_1.Utils.nextUID;
var DisposableMixin = (function () {
    function DisposableMixin() {
        this._disposables = {};
    }
    DisposableMixin.prototype.listenTo = function (target, typeOrListeners, listenerOrContext, contextOrUseCapture, useCapture) {
        var _this = this;
        var listenings;
        if (typeof typeOrListeners == 'object') {
            listenings = [];
            if (Array.isArray(typeOrListeners)) {
                if (arguments.length < 4) {
                    contextOrUseCapture = this;
                }
                for (var i = 0, l = typeOrListeners.length; i < l; i++) {
                    listenings.push(this.listenTo(target, typeOrListeners[i], listenerOrContext, contextOrUseCapture, useCapture || false));
                }
            }
            else {
                if (arguments.length < 3) {
                    listenerOrContext = this;
                }
                for (var type in typeOrListeners) {
                    listenings.push(this.listenTo(target, type, typeOrListeners[type], listenerOrContext, contextOrUseCapture || false));
                }
            }
        }
        else {
            if (arguments.length < 4) {
                contextOrUseCapture = this;
            }
            if (Array.isArray(target) || target instanceof NodeList || target instanceof HTMLCollection) {
                listenings = [];
                for (var i = 0, l = target.length; i < l; i++) {
                    listenings.push(this.listenTo(target[i], typeOrListeners, listenerOrContext, contextOrUseCapture, useCapture || false));
                }
            }
            else if (Array.isArray(listenerOrContext)) {
                listenings = [];
                for (var i = 0, l = listenerOrContext.length; i < l; i++) {
                    listenings.push(this.listenTo(target, typeOrListeners, listenerOrContext[i], contextOrUseCapture, useCapture || false));
                }
            }
            else {
                return this._listenTo(target, typeOrListeners, listenerOrContext, contextOrUseCapture, useCapture || false);
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
        var callback = function callback() {
            if (disposable._disposables[id]) {
                delete disposable._disposables[id];
                return cb.apply(disposable, arguments);
            }
        };
        callback.cancel = cancelCallback;
        callback.dispose = cancelCallback;
        this._disposables[id] = callback;
        return callback;
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
exports.default = DisposableMixin;


/***/ }),
/* 20 */
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
exports.default = camelize;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(0);
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
            cellx_1.ErrorLogger.log(err);
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
exports.default = defer;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var toString = Object.prototype.toString;
function isRegExp(value) {
    return toString.call(value) == '[object RegExp]';
}
exports.default = isRegExp;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var getText_1 = __webpack_require__(24);
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
        return arr && arr.join(separator);
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
    // Safary: "Cannot declare a parameter named 'key' as it shadows the name of a strict mode function."
    key: function key_(obj, key) {
        return obj && obj[key];
    },
    json: function json(value) {
        return JSON.stringify(value);
    }
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = getText;
configure({
    localeSettings: {
        code: 'ru',
        plural: '(n%100) >= 5 && (n%100) <= 20 ? 2 : (n%10) == 1 ? 0 : (n%10) >= 2 && (n%10) <= 4 ? 1 : 2'
    },
    texts: {}
});


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var keypathToJSExpression_1 = __webpack_require__(30);
var namePattern_1 = __webpack_require__(16);
var keypathPattern_1 = __webpack_require__(15);
var ContentNodeType;
(function (ContentNodeType) {
    ContentNodeType[ContentNodeType["TEXT"] = 1] = "TEXT";
    ContentNodeType[ContentNodeType["BINDING"] = 2] = "BINDING";
    ContentNodeType[ContentNodeType["BINDING_KEYPATH"] = 3] = "BINDING_KEYPATH";
    ContentNodeType[ContentNodeType["BINDING_FORMATTER"] = 4] = "BINDING_FORMATTER";
    ContentNodeType[ContentNodeType["BINDING_FORMATTER_ARGUMENTS"] = 5] = "BINDING_FORMATTER_ARGUMENTS";
})(ContentNodeType = exports.ContentNodeType || (exports.ContentNodeType = {}));
;
var reNameOrNothing = RegExp(namePattern_1.default + '|', 'g');
var reKeypathOrNothing = RegExp(keypathPattern_1.default + '|', 'g');
var reBooleanOrNothing = /false|true|/g;
var reNumberOrNothing = /(?:[+-]\s*)?(?:0b[01]+|0[0-7]+|0x[0-9a-fA-F]+|(?:(?:0|[1-9]\d*)(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?|Infinity|NaN)|/g;
var reVacuumOrNothing = /null|undefined|void 0|/g;
var NOT_VALUE_AND_NOT_KEYPATH = {};
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
        for (var index = void 0; (index = content.indexOf('{', this.at)) != -1;) {
            this._pushText(content.slice(this.at, index));
            this.at = index;
            this.chr = content.charAt(index);
            var binding = this._readBinding();
            if (binding) {
                result.push(binding);
            }
            else {
                this._pushText(this.chr);
                this._next('{');
            }
        }
        this._pushText(content.slice(this.at));
        return result;
    };
    ContentParser.prototype._pushText = function (value) {
        if (value) {
            var result = this.result;
            var resultLen = result.length;
            if (resultLen && result[resultLen - 1].nodeType == ContentNodeType.TEXT) {
                result[resultLen - 1].value = value;
            }
            else {
                result.push({
                    nodeType: ContentNodeType.TEXT,
                    value: value
                });
            }
        }
    };
    ContentParser.prototype._readBinding = function () {
        var at = this.at;
        this._next('{');
        this._skipWhitespaces();
        var keypath = this._readBindingKeypath();
        if (keypath) {
            var formatters = void 0;
            for (var formatter = void 0; this._skipWhitespaces() == '|' && (formatter = this._readFormatter());) {
                (formatters || (formatters = [])).push(formatter);
            }
            if (this.chr == '}') {
                this._next();
                return {
                    nodeType: ContentNodeType.BINDING,
                    keypath: keypath,
                    formatters: formatters || null,
                    raw: this.content.slice(at, this.at)
                };
            }
        }
        this.at = at;
        this.chr = this.content.charAt(at);
        return null;
    };
    ContentParser.prototype._readBindingKeypath = function () {
        var content = this.content;
        reKeypathOrNothing.lastIndex = this.at;
        var keypath = reKeypathOrNothing.exec(content)[0];
        if (keypath) {
            this.chr = content.charAt((this.at += keypath.length));
            return keypath;
        }
        return null;
    };
    ContentParser.prototype._readFormatter = function () {
        var at = this.at;
        this._next('|');
        this._skipWhitespaces();
        var name = this._readName();
        if (name) {
            var args = this.chr == '(' ? this._readFormatterArguments() : null;
            return {
                nodeType: ContentNodeType.BINDING_FORMATTER,
                name: name,
                arguments: args
            };
        }
        this.at = at;
        this.chr = this.content.charAt(at);
        return null;
    };
    ContentParser.prototype._readFormatterArguments = function () {
        var at = this.at;
        this._next('(');
        var args = [];
        if (this._skipWhitespaces() != ')') {
            for (;;) {
                var arg = this._readValueOrKeypath();
                if (arg !== NOT_VALUE_AND_NOT_KEYPATH) {
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
                this.chr = this.content.charAt(at);
                return null;
            }
        }
        this._next();
        return {
            nodeType: ContentNodeType.BINDING_FORMATTER_ARGUMENTS,
            value: args
        };
    };
    ContentParser.prototype._readValueOrKeypath = function () {
        var value = this._readValue();
        return value === NOT_VALUE_AND_NOT_KEYPATH ? this._readKeypath() : value;
    };
    ContentParser.prototype._readValue = function () {
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
            if (value !== NOT_VALUE_AND_NOT_KEYPATH) {
                return value;
            }
        }
        return NOT_VALUE_AND_NOT_KEYPATH;
    };
    ContentParser.prototype._readObject = function () {
        var at = this.at;
        this._next('{');
        var obj = '{';
        while (this._skipWhitespaces() != '}') {
            var key = this.chr == "'" || this.chr == '"' ? this._readString() : this._readObjectKey();
            if (key !== NOT_VALUE_AND_NOT_KEYPATH && key !== null && this._skipWhitespaces() == ':') {
                this._next();
                this._skipWhitespaces();
                var valueOrKeypath = this._readValueOrKeypath();
                if (valueOrKeypath !== NOT_VALUE_AND_NOT_KEYPATH) {
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
            this.chr = this.content.charAt(at);
            return NOT_VALUE_AND_NOT_KEYPATH;
        }
        this._next();
        return obj;
    };
    ContentParser.prototype._readObjectKey = function () {
        return this._readName();
    };
    ContentParser.prototype._readArray = function () {
        var at = this.at;
        this._next('[');
        var arr = '[';
        while (this._skipWhitespaces() != ']') {
            if (this.chr == ',') {
                arr += ',';
                this._next();
            }
            else {
                var valueOrKeypath = this._readValueOrKeypath();
                if (valueOrKeypath === NOT_VALUE_AND_NOT_KEYPATH) {
                    this.at = at;
                    this.chr = this.content.charAt(at);
                    return NOT_VALUE_AND_NOT_KEYPATH;
                }
                else {
                    arr += valueOrKeypath;
                }
            }
        }
        this._next();
        return arr + ']';
    };
    ContentParser.prototype._readBoolean = function () {
        reBooleanOrNothing.lastIndex = this.at;
        var bool = reBooleanOrNothing.exec(this.content)[0];
        if (bool) {
            this.chr = this.content.charAt((this.at += bool.length));
            return bool;
        }
        return NOT_VALUE_AND_NOT_KEYPATH;
    };
    ContentParser.prototype._readNumber = function () {
        reNumberOrNothing.lastIndex = this.at;
        var num = reNumberOrNothing.exec(this.content)[0];
        if (num) {
            this.chr = this.content.charAt((this.at += num.length));
            return num;
        }
        return NOT_VALUE_AND_NOT_KEYPATH;
    };
    ContentParser.prototype._readString = function () {
        var quoteChar = this.chr;
        if (quoteChar != "'" && quoteChar != '"') {
            throw {
                name: 'SyntaxError',
                message: "Expected \"'\" instead of \"" + this.chr + "\"",
                at: this.at,
                content: this.content
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
        this.chr = this.content.charAt(at);
        return NOT_VALUE_AND_NOT_KEYPATH;
    };
    ContentParser.prototype._readVacuum = function () {
        reVacuumOrNothing.lastIndex = this.at;
        var vacuum = reVacuumOrNothing.exec(this.content)[0];
        if (vacuum) {
            this.chr = this.content.charAt((this.at += vacuum.length));
            return vacuum;
        }
        return NOT_VALUE_AND_NOT_KEYPATH;
    };
    ContentParser.prototype._readKeypath = function () {
        reKeypathOrNothing.lastIndex = this.at;
        var keypath = reKeypathOrNothing.exec(this.content)[0];
        if (keypath) {
            this.chr = this.content.charAt((this.at += keypath.length));
            return keypathToJSExpression_1.default(keypath);
        }
        return NOT_VALUE_AND_NOT_KEYPATH;
    };
    ContentParser.prototype._readName = function () {
        reNameOrNothing.lastIndex = this.at;
        var name = reNameOrNothing.exec(this.content)[0];
        if (name) {
            this.chr = this.content.charAt((this.at += name.length));
            return name;
        }
        return null;
    };
    ContentParser.prototype._skipWhitespaces = function () {
        var chr = this.chr;
        while (chr && chr <= ' ') {
            chr = this._next();
        }
        return chr;
    };
    ContentParser.prototype._next = function (current) {
        if (current && current != this.chr) {
            throw {
                name: 'SyntaxError',
                message: "Expected \"" + current + "\" instead of \"" + this.chr + "\"",
                at: this.at,
                content: this.content
            };
        }
        return (this.chr = this.content.charAt(++this.at));
    };
    return ContentParser;
}());
ContentParser.ContentNodeType = ContentNodeType;
exports.default = ContentParser;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function clearNode(node) {
    for (var child = void 0; (child = node.firstChild);) {
        node.removeChild(child);
    }
    return node;
}
exports.default = clearNode;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var keypathToJSExpression_1 = __webpack_require__(30);
var cache = Object.create(null);
function compileKeypath(keypath) {
    return cache[keypath] || (cache[keypath] = Function("var temp; return " + keypathToJSExpression_1.default(keypath) + ";"));
}
exports.default = compileKeypath;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(0);
var mixin = cellx_1.Utils.mixin;
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


/***/ }),
/* 30 */
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
exports.default = keypathToJSExpression;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Parser_1 = __webpack_require__(51);
exports.NodeType = Parser_1.NodeType;
exports.Parser = Parser_1.default;


/***/ }),
/* 32 */
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
var cellx_1 = __webpack_require__(0);
var Component_1 = __webpack_require__(1);
var ElementProtoMixin_1 = __webpack_require__(6);
var bindContent_1 = __webpack_require__(4);
var attachChildComponentElements_1 = __webpack_require__(3);
var getUID_1 = __webpack_require__(8);
var moveContent_1 = __webpack_require__(14);
var clearNode_1 = __webpack_require__(27);
var d_1 = __webpack_require__(2);
var Map = cellx_1.JS.Map;
var KEY_CONTENT_MAP = cellx_1.JS.Symbol('contentMap');
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
                var key = getUID_1.default(ownerComponent) + '/' + (selector || '');
                if (selector) {
                    var contentMap = void 0;
                    if (!clone &&
                        contentOwnerComponent &&
                        (contentMap = contentOwnerComponent[KEY_CONTENT_MAP]) &&
                        contentMap.has(key)) {
                        var c = contentMap.get(key);
                        if (c.firstChild) {
                            content = moveContent_1.default(document.createDocumentFragment(), c);
                            contentMap.set(key, el);
                            bindings = c.$component._bindings;
                            childComponents = c.$component._childComponents;
                        }
                    }
                    else if (ownerComponentContent.firstChild) {
                        var selectedEls = ownerComponentContent.querySelectorAll(selector);
                        var selectedElCount = selectedEls.length;
                        if (selectedElCount) {
                            content = document.createDocumentFragment();
                            for (var i = 0; i < selectedElCount; i++) {
                                content.appendChild(clone ? selectedEls[i].cloneNode(true) : selectedEls[i]);
                            }
                        }
                        if (!clone && contentOwnerComponent) {
                            (contentMap ||
                                contentOwnerComponent[KEY_CONTENT_MAP] ||
                                (contentOwnerComponent[KEY_CONTENT_MAP] = new Map())).set(key, el);
                        }
                    }
                }
                else if (!clone && contentOwnerComponent) {
                    var contentMap = contentOwnerComponent[KEY_CONTENT_MAP];
                    if (contentMap && contentMap.has(key)) {
                        var c = contentMap.get(key);
                        content = moveContent_1.default(document.createDocumentFragment(), c);
                        contentMap.set(key, el);
                        bindings = c.$component._bindings;
                        childComponents = c.$component._childComponents;
                    }
                    else if (ownerComponentContent.firstChild) {
                        content = ownerComponentContent;
                        (contentMap || (contentOwnerComponent[KEY_CONTENT_MAP] = new Map())).set(key, el);
                    }
                }
                else if (ownerComponentContent.firstChild) {
                    content = clone ? ownerComponentContent.cloneNode(true) : ownerComponentContent;
                }
            }
            if (bindings === undefined) {
                if (content || el.firstChild) {
                    var getContext = input.getContext;
                    _a = content ?
                        bindContent_1.default(content, contentOwnerComponent, getContext ?
                            ownerComponent[getContext](ownerComponent.input.$context, this) :
                            ownerComponent.input.$context) :
                        bindContent_1.default(el, ownerComponent, input.$context), this._bindings = _a[0], childComponents = _a[1];
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
                if (el.firstChild) {
                    ElementProtoMixin_1.suppressConnectionStatusCallbacks();
                    clearNode_1.default(el);
                    ElementProtoMixin_1.resumeConnectionStatusCallbacks();
                }
                el.appendChild(content);
            }
            if (childComponents && !childComponents[0]._attached) {
                attachChildComponentElements_1.default(childComponents);
            }
            this.isReady = true;
        }
        var _a;
    };
    RtContent.prototype._detach = function () {
        this._attached = false;
        this._freezeBindings();
    };
    return RtContent;
}(Component_1.default));
RtContent = __decorate([
    d_1.default.Component({
        elementIs: 'rt-content',
        input: {
            select: { type: String, readonly: true },
            clone: { default: false, readonly: true },
            getContext: { type: String, readonly: true }
        },
        template: ''
    })
], RtContent);
exports.default = RtContent;


/***/ }),
/* 33 */
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
var d_1 = __webpack_require__(2);
var rt_if_then_1 = __webpack_require__(18);
var RtIfElse = (function (_super) {
    __extends(RtIfElse, _super);
    function RtIfElse() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._elseMode = true;
        return _this;
    }
    return RtIfElse;
}(rt_if_then_1.default));
RtIfElse = __decorate([
    d_1.default.Component({
        elementIs: 'rt-if-else',
        elementExtends: 'template'
    })
], RtIfElse);
exports.default = RtIfElse;


/***/ }),
/* 34 */
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
var cellx_1 = __webpack_require__(0);
var Component_1 = __webpack_require__(1);
var KEY_ELEMENT_CONNECTED_1 = __webpack_require__(5);
var compileKeypath_1 = __webpack_require__(28);
var bindContent_1 = __webpack_require__(4);
var attachChildComponentElements_1 = __webpack_require__(3);
var namePattern_1 = __webpack_require__(16);
var keypathPattern_1 = __webpack_require__(15);
var Features_1 = __webpack_require__(7);
var d_1 = __webpack_require__(2);
var Map = cellx_1.JS.Map;
var nextTick = cellx_1.Utils.nextTick;
var slice = Array.prototype.slice;
;
var reForAttrValue = RegExp("^\\s*(" + namePattern_1.default + ")\\s+of\\s+(" + keypathPattern_1.default + ")\\s*$");
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
            this._list = new cellx_1.Cell(compileKeypath_1.default(forAttrValue[2]), { owner: input.$context });
            this._itemMap = new Map();
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
            this.initialized = true;
        }
        this._list.on('change', this._onListChange, this);
        this._render(false);
    };
    RtRepeat.prototype.elementDisconnected = function () {
        var _this = this;
        nextTick(function () {
            if (!_this.element[KEY_ELEMENT_CONNECTED_1.default]) {
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
        this._itemMap = new Map();
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
        var _a = bindContent_1.default(content, this.ownerComponent, Object.create(this.input.$context, (_b = {},
            _b[this._itemName + 'Cell'] = itemCell,
            _b[this._itemName] = {
                get: function () {
                    return itemCell.get();
                }
            },
            _b.$indexCell = indexCell,
            _b.$index = {
                get: function () {
                    return indexCell.get();
                }
            },
            _b))), bindings = _a[0], childComponents = _a[1];
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
        this._lastNode.parentNode.insertBefore(content, this._lastNode.nextSibling);
        this._lastNode = newLastNode;
        if (childComponents && !childComponents[0]._attached) {
            attachChildComponentElements_1.default(childComponents);
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
    return RtRepeat;
}(Component_1.default));
RtRepeat = __decorate([
    d_1.default.Component({
        elementIs: 'rt-repeat',
        elementExtends: 'template',
        input: {
            for: { type: String, required: true, readonly: true },
            trackBy: { type: String, readonly: true },
            strip: { default: false, readonly: true }
        }
    })
], RtRepeat);
exports.default = RtRepeat;


/***/ }),
/* 35 */
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
var cellx_1 = __webpack_require__(0);
var Component_1 = __webpack_require__(1);
var ElementProtoMixin_1 = __webpack_require__(6);
var bindContent_1 = __webpack_require__(4);
var attachChildComponentElements_1 = __webpack_require__(3);
var getUID_1 = __webpack_require__(8);
var moveContent_1 = __webpack_require__(14);
var clearNode_1 = __webpack_require__(27);
var d_1 = __webpack_require__(2);
var Map = cellx_1.JS.Map;
var KEY_SLOT_CONTENT_MAP = cellx_1.JS.Symbol('slotContentMap');
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
                var key = getUID_1.default(ownerComponent) + '/' + (name_1 || '');
                if (name_1) {
                    var contentMap = void 0;
                    if (!cloneContent &&
                        contentOwnerComponent &&
                        (contentMap = contentOwnerComponent[KEY_SLOT_CONTENT_MAP]) &&
                        contentMap.has(key)) {
                        var c = contentMap.get(key);
                        if (c.firstChild) {
                            content = moveContent_1.default(document.createDocumentFragment(), c);
                            contentMap.set(key, el);
                            bindings = c.$component._bindings;
                            childComponents = c.$component._childComponents;
                        }
                    }
                    else if (ownerComponentContent.firstChild) {
                        var selectedEls = ownerComponentContent.querySelectorAll("[rt-slot=" + name_1 + "]");
                        var selectedElCount = selectedEls.length;
                        if (selectedElCount) {
                            content = document.createDocumentFragment();
                            for (var i = 0; i < selectedElCount; i++) {
                                content.appendChild(cloneContent ? selectedEls[i].cloneNode(true) : selectedEls[i]);
                            }
                        }
                        if (!cloneContent && contentOwnerComponent) {
                            (contentMap ||
                                contentOwnerComponent[KEY_SLOT_CONTENT_MAP] ||
                                (contentOwnerComponent[KEY_SLOT_CONTENT_MAP] = new Map())).set(key, el);
                        }
                    }
                }
                else if (!cloneContent && contentOwnerComponent) {
                    var contentMap = contentOwnerComponent[KEY_SLOT_CONTENT_MAP];
                    if (contentMap && contentMap.has(key)) {
                        var c = contentMap.get(key);
                        content = moveContent_1.default(document.createDocumentFragment(), c);
                        contentMap.set(key, el);
                        bindings = c.$component._bindings;
                        childComponents = c.$component._childComponents;
                    }
                    else if (ownerComponentContent.firstChild) {
                        content = ownerComponentContent;
                        (contentMap || (contentOwnerComponent[KEY_SLOT_CONTENT_MAP] = new Map())).set(key, el);
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
                    var getContext = input.getContext;
                    _a = content ?
                        bindContent_1.default(content, contentOwnerComponent, getContext ?
                            ownerComponent[getContext](ownerComponent.input.$context, this) :
                            ownerComponent.input.$context) :
                        bindContent_1.default(el, ownerComponent, input.$context), this._bindings = _a[0], childComponents = _a[1];
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
                if (el.firstChild) {
                    ElementProtoMixin_1.suppressConnectionStatusCallbacks();
                    clearNode_1.default(el);
                    ElementProtoMixin_1.resumeConnectionStatusCallbacks();
                }
                el.appendChild(content);
            }
            if (childComponents && !childComponents[0]._attached) {
                attachChildComponentElements_1.default(childComponents);
            }
            this.isReady = true;
        }
        var _a;
    };
    RtSlot.prototype._detach = function () {
        this._attached = false;
        this._freezeBindings();
    };
    return RtSlot;
}(Component_1.default));
RtSlot = __decorate([
    d_1.default.Component({
        elementIs: 'rt-slot',
        input: {
            name: { type: String, readonly: true },
            cloneContent: { default: false, readonly: true },
            getContext: { type: String, readonly: true }
        },
        template: ''
    })
], RtSlot);
exports.default = RtSlot;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nelm_1 = __webpack_require__(13);
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
            names: el.names,
            attributes: attrs,
            content: el.content
        }];
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var reEscapableChars = /[&<>"]/g;
var charToEscapedMap = Object.create(null);
charToEscapedMap['&'] = '&amp;';
charToEscapedMap['<'] = '&lt;';
charToEscapedMap['>'] = '&gt;';
charToEscapedMap['"'] = '&quot;';
function escapeHTML(str) {
    return reEscapableChars.test(str) ? str.replace(reEscapableChars, function (chr) { return charToEscapedMap[chr]; }) : str;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = escapeHTML;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var reEscapableEntities = /&(?:amp|lt|gt|quot);/g;
var escapedToCharMap = Object.create(null);
escapedToCharMap['&amp;'] = '&';
escapedToCharMap['&lt;'] = '<';
escapedToCharMap['&gt;'] = '>';
escapedToCharMap['&quot;'] = '"';
function unescapeHTML(str) {
    return reEscapableEntities.test(str) ? str.replace(reEscapableEntities, function (entity) { return escapedToCharMap[entity]; }) : str;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = unescapeHTML;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.list = [
    'area',
    'base',
    'basefont',
    'br',
    'col',
    'command',
    'embed',
    'frame',
    'hr',
    'img',
    'input',
    'isindex',
    'keygen',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
    // svg tags
    'circle',
    'ellipse',
    'line',
    'path',
    'polygone',
    'polyline',
    'rect',
    'stop',
    'use'
];
exports.map = exports.list.reduce(function (map, name) {
    map[name] = true;
    return map;
}, Object.create(null));


/***/ }),
/* 40 */
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
exports.default = setAttribute;


/***/ }),
/* 41 */
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
exports.default = bindEvents;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cache = Object.create(null);
function formattersReducer(jsExpr, formatter) {
    var args = formatter.arguments;
    return "(this." + formatter.name + " || formatters." + formatter.name + ").call(this, " + jsExpr + (args && args.value.length ? ', ' + args.value.join(', ') : '') + ")";
}
function bindingToJSExpression(binding) {
    var bindingRaw = binding.raw;
    if (cache[bindingRaw]) {
        return cache[bindingRaw];
    }
    var keys = binding.keypath.split('.');
    var keyCount = keys.length;
    var formatters = binding.formatters;
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
exports.default = bindingToJSExpression;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var escape_string_1 = __webpack_require__(12);
var ContentParser_1 = __webpack_require__(26);
var bindingToJSExpression_1 = __webpack_require__(42);
var formatters_1 = __webpack_require__(23);
var KEY_COMPONENT_INPUT_VALUES_1 = __webpack_require__(10);
var getUID_1 = __webpack_require__(8);
var ContentNodeType = ContentParser_1.default.ContentNodeType;
var keyCounter = 0;
var cache = Object.create(null);
function compileContent(content, contentString, ownerComponent) {
    var key = (ownerComponent ? getUID_1.default(ownerComponent) + '/' : '/') + contentString;
    if (cache[key]) {
        return cache[key];
    }
    var inner;
    if (content.length == 1 && content[0].nodeType == ContentNodeType.BINDING) {
        inner = Function('formatters', "var temp; return " + bindingToJSExpression_1.default(content[0]) + ";");
    }
    else {
        var jsExpr = [];
        for (var _i = 0, content_1 = content; _i < content_1.length; _i++) {
            var node = content_1[_i];
            jsExpr.push(node.nodeType == ContentNodeType.TEXT ?
                "'" + escape_string_1.default(node.value) + "'" :
                bindingToJSExpression_1.default(node));
        }
        inner = Function('formatters', "var temp; return [" + jsExpr.join(', ') + "].join('');");
    }
    return (cache[key] = ownerComponent ? function () {
        var value = inner.call(this, formatters_1.default);
        if (value && typeof value == 'object') {
            var key_1 = String(++keyCounter);
            (ownerComponent[KEY_COMPONENT_INPUT_VALUES_1.default] ||
                (ownerComponent[KEY_COMPONENT_INPUT_VALUES_1.default] = new Map())).set(key_1, value);
            return key_1;
        }
        return value;
    } : function () {
        return inner.call(this, formatters_1.default);
    });
}
exports.default = compileContent;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(0);
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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(0);
exports.default = new cellx_1.JS.Map([
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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(0);
var escape_html_1 = __webpack_require__(9);
var KEY_COMPONENT_INPUT_VALUES_1 = __webpack_require__(10);
var isRegExp_1 = __webpack_require__(22);
var componentInputTypeSerializerMap = new cellx_1.JS.Map([
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
            read: function (value, defaultValue, component) {
                if (value === null) {
                    return defaultValue || null;
                }
                var componentInputValues = component.ownerComponent &&
                    component.ownerComponent[KEY_COMPONENT_INPUT_VALUES_1.default];
                if (!componentInputValues || !componentInputValues.has(value)) {
                    throw new TypeError('Value is not an object');
                }
                var val = componentInputValues.get(value);
                componentInputValues.delete(value);
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
                return value != null ? escape_html_1.escapeHTML(isRegExp_1.default(value) ? value.toString() : JSON.stringify(value)) : null;
            }
        }]
]);
componentInputTypeSerializerMap.set('boolean', componentInputTypeSerializerMap.get(Boolean));
componentInputTypeSerializerMap.set('number', componentInputTypeSerializerMap.get(Number));
componentInputTypeSerializerMap.set('string', componentInputTypeSerializerMap.get(String));
componentInputTypeSerializerMap.set('object', componentInputTypeSerializerMap.get(Object));
exports.default = componentInputTypeSerializerMap;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nelm_1 = __webpack_require__(13);
exports.NelmNodeType = nelm_1.NodeType;
exports.NelmParser = nelm_1.Parser;
exports.Template = nelm_1.Template;
var escape_string_1 = __webpack_require__(12);
var escape_html_1 = __webpack_require__(9);
var html_to_fragment_1 = __webpack_require__(25);
var DisposableMixin_1 = __webpack_require__(19);
exports.DisposableMixin = DisposableMixin_1.default;
var formatters_1 = __webpack_require__(23);
exports.formatters = formatters_1.default;
var getText_1 = __webpack_require__(24);
exports.getText = getText_1.default;
var Component_1 = __webpack_require__(1);
exports.Component = Component_1.default;
var KEY_ELEMENT_CONNECTED_1 = __webpack_require__(5);
exports.KEY_ELEMENT_CONNECTED = KEY_ELEMENT_CONNECTED_1.default;
var KEY_COMPONENT_INPUT_VALUES_1 = __webpack_require__(10);
exports.KEY_COMPONENT_INPUT_VALUES = KEY_COMPONENT_INPUT_VALUES_1.default;
var ComponentInput_1 = __webpack_require__(17);
exports.ComponentInput = ComponentInput_1.default;
var rt_content_1 = __webpack_require__(32);
var rt_slot_1 = __webpack_require__(35);
var rt_if_then_1 = __webpack_require__(18);
var rt_if_else_1 = __webpack_require__(33);
var rt_repeat_1 = __webpack_require__(34);
var d_1 = __webpack_require__(2);
exports.d = d_1.default;
var camelize_1 = __webpack_require__(20);
var hyphenize_1 = __webpack_require__(11);
var isRegExp_1 = __webpack_require__(22);
var defer_1 = __webpack_require__(21);
__webpack_require__(36);
var Components = {
    RtContent: rt_content_1.default,
    RtSlot: rt_slot_1.default,
    RtIfThen: rt_if_then_1.default,
    RtIfElse: rt_if_else_1.default,
    RtRepeat: rt_repeat_1.default
};
exports.Components = Components;
var Utils = {
    camelize: camelize_1.default,
    hyphenize: hyphenize_1.default,
    escapeString: escape_string_1.default,
    escapeHTML: escape_html_1.escapeHTML,
    unescapeHTML: escape_html_1.unescapeHTML,
    isRegExp: isRegExp_1.default,
    defer: defer_1.default,
    htmlToFragment: html_to_fragment_1.default
};
exports.Utils = Utils;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function onEvent(evt) {
    var isNativeEvent = evt instanceof Event;
    var node = isNativeEvent ? evt.target : evt.target.element;
    var attrName = (isNativeEvent ? 'rt-' : 'rt-component-') + evt.type;
    var targetEls;
    for (;;) {
        if (node.hasAttribute(attrName)) {
            (targetEls || (targetEls = [])).push(node);
        }
        node = node.parentNode;
        if (!node || node == document) {
            break;
        }
        var component = node.$component;
        if (component && targetEls && targetEls.length) {
            var i = 0;
            do {
                var targetEl = targetEls[i];
                var handler = component[targetEl.getAttribute(attrName)];
                if (typeof handler == 'function') {
                    if (handler.call(component, evt, targetEl) === false) {
                        if (!isNativeEvent) {
                            evt.isPropagationStopped = true;
                        }
                        return;
                    }
                    if (!isNativeEvent && evt.isPropagationStopped) {
                        return;
                    }
                    targetEls.splice(i, 1);
                    continue;
                }
                i++;
            } while (i < targetEls.length);
        }
    }
}
exports.default = onEvent;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(0);
var nelm_1 = __webpack_require__(13);
var elementConstructorMap_1 = __webpack_require__(29);
var ElementProtoMixin_1 = __webpack_require__(6);
var hyphenize_1 = __webpack_require__(11);
var mixin = cellx_1.Utils.mixin;
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
    if (elementConstructorMap_1.default[elIs]) {
        throw new TypeError("Component \"" + elIs + "\" already registered");
    }
    var parentComponentConstr = Object.getPrototypeOf(componentConstr.prototype).constructor;
    inheritProperty(componentConstr, parentComponentConstr, 'input', 0);
    inheritProperty(componentConstr, parentComponentConstr, 'i18n', 0);
    componentConstr._blockNamesString = elIs + ' ' + (parentComponentConstr._blockNamesString || '');
    var template = componentConstr.template;
    if (template !== null && template !== parentComponentConstr.template) {
        if (template instanceof nelm_1.Template) {
            template.setBlockName(elIs);
        }
        else {
            componentConstr.template = parentComponentConstr.template ?
                parentComponentConstr.template.extend(template, { blockName: elIs }) :
                new nelm_1.Template(template, { blockName: elIs });
        }
    }
    componentConstr._contentBlockNames = [elIs];
    if (parentComponentConstr._contentBlockNames) {
        push.apply(componentConstr._contentBlockNames, parentComponentConstr._contentBlockNames);
    }
    componentConstr._rawContent = undefined;
    componentConstr._elementClassNameMap = Object.create(parentComponentConstr._elementClassNameMap || null);
    inheritProperty(componentConstr, parentComponentConstr, 'events', 1);
    var elExtends = componentConstr.elementExtends;
    var parentElConstr = elExtends ?
        elementConstructorMap_1.default[elExtends] ||
            window["HTML" + (elExtends.charAt(0).toUpperCase() + elExtends.slice(1)) + "Element"] :
        HTMLElement;
    var elConstr = function (self) {
        return parentElConstr.call(this, self);
    };
    elConstr['_rioniteComponentConstructor'] = componentConstr;
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
                observedAttrs.push(hyphenize_1.default(name_1));
            }
            return observedAttrs;
        }
    });
    var elProto = elConstr.prototype = Object.create(parentElConstr.prototype);
    elProto.constructor = elConstr;
    mixin(elProto, ElementProtoMixin_1.default);
    window.customElements.define(elIs, elConstr, elExtends ? { extends: elExtends } : null);
    elementConstructorMap_1.default[elIs] = elConstr;
    return componentConstr;
}
exports.default = registerComponent;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NodeType;
(function (NodeType) {
    NodeType[NodeType["BLOCK"] = 1] = "BLOCK";
    NodeType[NodeType["ELEMENT"] = 2] = "ELEMENT";
    NodeType[NodeType["TEXT"] = 3] = "TEXT";
    NodeType[NodeType["COMMENT"] = 4] = "COMMENT";
    NodeType[NodeType["SUPER_CALL"] = 5] = "SUPER_CALL";
})(NodeType = exports.NodeType || (exports.NodeType = {}));
var escapee = {
    __proto__: null,
    '/': '/',
    '\\': '\\',
    b: '\b',
    f: '\f',
    n: '\n',
    r: '\r',
    t: '\t'
};
var reBlockNameOrNothing = /[a-zA-Z][\-\w]*|/g;
var reTagNameOrNothing = /[a-zA-Z][\-\w]*(?::[a-zA-Z][\-\w]*)?|/g;
var reElementNameOrNothing = /[a-zA-Z][\-\w]*|/g;
var reAttributeNameOrNothing = /[_a-zA-Z][\-\w]*(?::[_a-zA-Z][\-\w]*)?|/g;
var reSuperCallOrNothing = /super(?:\.([a-zA-Z][\-\w]*))?!|/g;
function normalizeMultilineText(text) {
    return text.trim().replace(/\s*(?:\r\n?|\n)/g, '\n').replace(/\n\s+/g, '\n');
}
var Parser = (function () {
    function Parser(nelm) {
        this.nelm = nelm;
    }
    Parser.prototype.parse = function () {
        this.at = 0;
        this.chr = this.nelm.charAt(0);
        var content;
        var nextChr;
        while (this._skipWhitespaces() == '/' && ((nextChr = this.nelm.charAt(this.at + 1)) == '/' || nextChr == '*')) {
            (content || (content = [])).push(this._readComment());
        }
        var blockName = this.chr == '#' ? this._readBlockName() : null;
        return {
            nodeType: NodeType.BLOCK,
            name: blockName,
            content: content ? content.concat(this._readContent(false)) : this._readContent(false)
        };
    };
    Parser.prototype._readBlockName = function () {
        this._next('#');
        var blockName = this._readName(reBlockNameOrNothing);
        if (!blockName) {
            throw {
                name: 'SyntaxError',
                message: 'Invalid block declaration',
                at: this.at,
                nelm: this.nelm
            };
        }
        return blockName;
    };
    Parser.prototype._readContent = function (brackets) {
        if (brackets) {
            this._next('{');
        }
        var content = [];
        for (;;) {
            switch (this._skipWhitespaces()) {
                case "'":
                case '"':
                case '`': {
                    content.push(this._readTextNode());
                    break;
                }
                case '': {
                    if (brackets) {
                        throw {
                            name: 'SyntaxError',
                            message: 'Missing "}" in compound statement',
                            at: this.at,
                            nelm: this.nelm
                        };
                    }
                    return content;
                }
                default: {
                    if (this.chr == '/') {
                        var nextChr = this.nelm.charAt(this.at + 1);
                        if (nextChr == '/' || nextChr == '*') {
                            content.push(this._readComment());
                            break;
                        }
                    }
                    if (brackets) {
                        if (this.chr == '}') {
                            this._next();
                            return content;
                        }
                        reSuperCallOrNothing.lastIndex = this.at;
                        var superCallMatch = reSuperCallOrNothing.exec(this.nelm);
                        if (superCallMatch[0]) {
                            this.chr = this.nelm.charAt((this.at = reSuperCallOrNothing.lastIndex));
                            content.push({
                                nodeType: NodeType.SUPER_CALL,
                                elementName: superCallMatch[1] || null
                            });
                            break;
                        }
                    }
                    content.push(this._readElement());
                    break;
                }
            }
        }
    };
    Parser.prototype._readElement = function () {
        var at = this.at;
        var isHelper = this.chr == '@';
        if (isHelper) {
            this._next();
        }
        var tagName = this._readName(reTagNameOrNothing);
        var elNames = (tagName ? this._skipWhitespaces() : this.chr) == '/' ?
            (this._next(), this._skipWhitespaces(), this._readElementNames()) :
            null;
        if (!tagName && !elNames) {
            throw {
                name: 'SyntaxError',
                message: 'Expected element',
                at: at,
                nelm: this.nelm
            };
        }
        var attrs = this.chr == '(' ? this._readAttributes() : null;
        if (attrs) {
            this._skipWhitespaces();
        }
        var content = this.chr == '{' ? this._readContent(true) : null;
        return {
            nodeType: NodeType.ELEMENT,
            tagName: tagName,
            isHelper: isHelper,
            names: elNames,
            attributes: attrs,
            content: content
        };
    };
    Parser.prototype._readAttributes = function () {
        this._next('(');
        if (this._skipWhitespacesAndComments() == ')') {
            this._next();
            return {
                superCall: null,
                list: []
            };
        }
        var superCall;
        var list = [];
        for (;;) {
            if (!superCall && this.chr == 's' && (superCall = this._readSuperCall())) {
                this._skipWhitespacesAndComments();
            }
            else {
                var name_1 = this._readName(reAttributeNameOrNothing);
                if (!name_1) {
                    throw {
                        name: 'SyntaxError',
                        message: 'Invalid attribute name',
                        at: this.at,
                        nelm: this.nelm
                    };
                }
                if (this._skipWhitespacesAndComments() == '=') {
                    this._next();
                    var chr = this._skipWhitespaces();
                    if (chr == "'" || chr == '"' || chr == '`') {
                        var str = this._readString();
                        list.push({
                            name: name_1,
                            value: str.multiline ? normalizeMultilineText(str.value) : str.value
                        });
                    }
                    else {
                        var value = '';
                        for (;;) {
                            if (!chr) {
                                throw {
                                    name: 'SyntaxError',
                                    message: 'Invalid attribute',
                                    at: this.at,
                                    nelm: this.nelm
                                };
                            }
                            if (chr == '\r' || chr == '\n' || chr == ',' || chr == ')') {
                                list.push({ name: name_1, value: value.trim() });
                                break;
                            }
                            value += chr;
                            chr = this._next();
                        }
                    }
                    this._skipWhitespacesAndComments();
                }
                else {
                    list.push({ name: name_1, value: '' });
                }
            }
            if (this.chr == ')') {
                this._next();
                break;
            }
            else if (this.chr == ',') {
                this._next();
                this._skipWhitespacesAndComments();
            }
            else {
                throw {
                    name: 'SyntaxError',
                    message: 'Invalid attributes',
                    at: this.at,
                    nelm: this.nelm
                };
            }
        }
        return {
            superCall: superCall || null,
            list: list
        };
    };
    Parser.prototype._skipWhitespacesAndComments = function () {
        var chr = this.chr;
        var nextChr;
        for (;;) {
            if (chr && chr <= ' ') {
                chr = this._next();
            }
            else if (chr == '/' && ((nextChr = this.nelm.charAt(this.at + 1)) == '/' || nextChr == '*')) {
                this._readComment();
                chr = this.chr;
            }
            else {
                break;
            }
        }
        return chr;
    };
    Parser.prototype._readSuperCall = function () {
        reSuperCallOrNothing.lastIndex = this.at;
        var superCallMatch = reSuperCallOrNothing.exec(this.nelm);
        if (superCallMatch[0]) {
            this.chr = this.nelm.charAt((this.at = reSuperCallOrNothing.lastIndex));
            return {
                nodeType: NodeType.SUPER_CALL,
                elementName: superCallMatch[1] || null
            };
        }
        return null;
    };
    Parser.prototype._readTextNode = function () {
        var str = this._readString();
        return {
            nodeType: NodeType.TEXT,
            value: str.multiline ? normalizeMultilineText(str.value) : str.value
        };
    };
    Parser.prototype._readString = function () {
        var quoteChar = this.chr;
        if (quoteChar != "'" && quoteChar != '"' && quoteChar != '`') {
            throw {
                name: 'SyntaxError',
                message: "Expected \"'\" instead of \"" + this.chr + "\"",
                at: this.at,
                nelm: this.nelm
            };
        }
        var str = '';
        for (var chr = this._next(); chr;) {
            if (chr == quoteChar) {
                this._next();
                return {
                    value: str,
                    multiline: quoteChar == '`'
                };
            }
            if (chr == '\\') {
                chr = this._next();
                if (chr == 'x' || chr == 'u') {
                    var at = this.at;
                    var hexadecimal = chr == 'x';
                    var code = parseInt(this.nelm.slice(at + 1, at + (hexadecimal ? 3 : 5)), 16);
                    if (!isFinite(code)) {
                        throw {
                            name: 'SyntaxError',
                            message: "Malformed " + (hexadecimal ? 'hexadecimal' : 'unicode') + " escape sequence",
                            at: at - 1,
                            nelm: this.nelm
                        };
                    }
                    str += String.fromCharCode(code);
                    chr = this.chr = this.nelm.charAt((this.at = at + (hexadecimal ? 3 : 5)));
                }
                else if (chr in escapee) {
                    str += escapee[chr];
                    chr = this._next();
                }
                else {
                    break;
                }
            }
            else {
                if (quoteChar != '`' && (chr == '\r' || chr == '\n')) {
                    break;
                }
                str += chr;
                chr = this._next();
            }
        }
        throw {
            name: 'SyntaxError',
            message: 'Invalid string',
            at: this.at,
            nelm: this.nelm
        };
    };
    Parser.prototype._readComment = function () {
        var value = '';
        var multiline;
        switch (this._next('/')) {
            case '/': {
                for (var chr = void 0; (chr = this._next()) && chr != '\r' && chr != '\n';) {
                    value += chr;
                }
                multiline = false;
                break;
            }
            case '*': {
                var stop_1 = false;
                do {
                    switch (this._next()) {
                        case '*': {
                            if (this._next() == '/') {
                                this._next();
                                stop_1 = true;
                            }
                            else {
                                value += '*' + this.chr;
                            }
                            break;
                        }
                        case '': {
                            throw {
                                name: 'SyntaxError',
                                message: 'Missing "*/" in compound statement',
                                at: this.at,
                                nelm: this.nelm
                            };
                        }
                        default: {
                            value += this.chr;
                        }
                    }
                } while (!stop_1);
                multiline = true;
                break;
            }
            default: {
                throw {
                    name: 'SyntaxError',
                    message: "Expected \"/\" instead of \"" + this.chr + "\"",
                    at: this.at,
                    nelm: this.nelm
                };
            }
        }
        return {
            nodeType: NodeType.COMMENT,
            value: value,
            multiline: multiline
        };
    };
    Parser.prototype._readElementNames = function () {
        var names = this.chr == ',' ? (this._next(), this._skipWhitespaces(), [null]) : null;
        for (var name_2; (name_2 = this._readName(reElementNameOrNothing));) {
            (names || (names = [])).push(name_2);
            if (this._skipWhitespaces() != ',') {
                break;
            }
            this._next();
            this._skipWhitespaces();
        }
        return names;
    };
    Parser.prototype._readName = function (reNameOrNothing) {
        reNameOrNothing.lastIndex = this.at;
        var name = reNameOrNothing.exec(this.nelm)[0];
        if (name) {
            this.chr = this.nelm.charAt((this.at = reNameOrNothing.lastIndex));
            return name;
        }
        return null;
    };
    Parser.prototype._skipWhitespaces = function () {
        var chr = this.chr;
        while (chr && chr <= ' ') {
            chr = this._next();
        }
        return chr;
    };
    Parser.prototype._next = function (current) {
        if (current && current != this.chr) {
            throw {
                name: 'SyntaxError',
                message: "Expected \"" + current + "\" instead of \"" + this.chr + "\"",
                at: this.at,
                nelm: this.nelm
            };
        }
        return (this.chr = this.nelm.charAt(++this.at));
    };
    return Parser;
}());
exports.default = Parser;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nelm_parser_1 = __webpack_require__(31);
var escape_string_1 = __webpack_require__(12);
var escape_html_1 = __webpack_require__(9);
var self_closing_tags_1 = __webpack_require__(39);
var join = Array.prototype.join;
var elNameDelimiter = '__';
var Template = (function () {
    function Template(nelm, opts) {
        this.parent = opts && opts.parent || null;
        this.nelm = typeof nelm == 'string' ? new nelm_parser_1.Parser(nelm).parse() : nelm;
        var blockName = opts && opts.blockName || this.nelm.name;
        this._elementClassesTemplate = this.parent ?
            [blockName ? blockName + elNameDelimiter : ''].concat(this.parent._elementClassesTemplate) :
            [blockName ? blockName + elNameDelimiter : '', ''];
    }
    Template.prototype.extend = function (nelm, opts) {
        return new Template(nelm, { __proto__: opts || null, parent: this });
    };
    Template.prototype.setBlockName = function (blockName) {
        this._elementClassesTemplate[0] = blockName ? blockName + elNameDelimiter : '';
        return this;
    };
    Template.prototype.render = function () {
        return (this._renderer || this._compileRenderers()).call(this._elementRendererMap);
    };
    Template.prototype._compileRenderers = function () {
        var parent = this.parent;
        this._elements = [(this._currentElement = { name: null, superCall: false, source: null, innerSource: [] })];
        var elMap = this._elementMap = {};
        if (parent) {
            this._renderer = parent._renderer || parent._compileRenderers();
        }
        for (var _i = 0, _a = this.nelm.content; _i < _a.length; _i++) {
            var node = _a[_i];
            this._compileNode(node);
        }
        if (!parent) {
            this._renderer = Function("return " + this._currentElement.innerSource.join(' + ') + ";");
        }
        Object.keys(elMap).forEach(function (name) {
            var el = elMap[name];
            this[name] = Function("return " + el.source.join(' + ') + ";");
            if (el.superCall) {
                var inner_1 = Function('$super', "return " + (el.innerSource.join(' + ') || "''") + ";");
                var parentElementRendererMap_1 = parent && parent._elementRendererMap;
                this[name + '@content'] = function () { return inner_1.call(this, parentElementRendererMap_1); };
            }
            else {
                this[name + '@content'] = Function("return " + (el.innerSource.join(' + ') || "''") + ";");
            }
        }, (this._elementRendererMap = { __proto__: parent && parent._elementRendererMap }));
        return this._renderer;
    };
    Template.prototype._compileNode = function (node, parentElName) {
        switch (node.nodeType) {
            case nelm_parser_1.NodeType.ELEMENT: {
                var parent_1 = this.parent;
                var els = this._elements;
                var el = node;
                var tagName = el.tagName;
                var isHelper = el.isHelper;
                var elNames = el.names;
                var elName = elNames && elNames[0];
                var elAttrs = el.attributes;
                var content = el.content;
                if (elNames) {
                    if (elName) {
                        if (tagName) {
                            (this._tagNameMap || (this._tagNameMap = { __proto__: parent_1 && parent_1._tagNameMap || null }))[elName] = tagName;
                        }
                        else {
                            // Не надо добавлять в конец ` || 'div'`, тк. ниже tagName используется как имя хелпера.
                            tagName = parent_1 && parent_1._tagNameMap && parent_1._tagNameMap[elName];
                        }
                        var renderedAttrs = void 0;
                        if (elAttrs && (elAttrs.list.length || elAttrs.superCall)) {
                            var attrListMap = this._attributeListMap || (this._attributeListMap = { __proto__: parent_1 && parent_1._attributeListMap || null });
                            var attrCountMap = this._attributeCountMap || (this._attributeCountMap = {
                                __proto__: parent_1 && parent_1._attributeCountMap || null
                            });
                            var elAttrsSuperCall = elAttrs.superCall;
                            var attrList = void 0;
                            var attrCount = void 0;
                            if (elAttrsSuperCall) {
                                if (!parent_1) {
                                    throw new TypeError('Parent template is required when using super');
                                }
                                attrList = attrListMap[elName] = {
                                    __proto__: parent_1._attributeListMap[elAttrsSuperCall.elementName || elName] || null
                                };
                                attrCount = attrCountMap[elName] =
                                    parent_1._attributeCountMap[elAttrsSuperCall.elementName || elName] || 0;
                            }
                            else {
                                attrList = attrListMap[elName] = { __proto__: null };
                                attrCount = attrCountMap[elName] = 0;
                            }
                            for (var _i = 0, _a = elAttrs.list; _i < _a.length; _i++) {
                                var attr = _a[_i];
                                var name_1 = attr.name;
                                var value = attr.value;
                                var index = attrList[name_1];
                                if (index === undefined) {
                                    attrList[attrCount] = " " + name_1 + "=\"" + (value && escape_html_1.default(escape_string_1.default(value))) + "\"";
                                    attrList[name_1] = attrCount;
                                    attrCountMap[elName] = ++attrCount;
                                }
                                else {
                                    attrList[index] = " " + name_1 + "=\"" + (value && escape_html_1.default(escape_string_1.default(value))) + "\"";
                                }
                            }
                            if (!isHelper) {
                                attrList = {
                                    __proto__: attrList,
                                    length: attrCount
                                };
                                if (attrList['class'] !== undefined) {
                                    attrList[attrList['class']] = ' class="' + this._renderElementClasses(elNames) +
                                        attrList[attrList['class']].slice(' class="'.length);
                                    renderedAttrs = join.call(attrList, '');
                                }
                                else {
                                    renderedAttrs = " class=\"" + this._renderElementClasses(elNames).slice(0, -1) + "\"" +
                                        join.call(attrList, '');
                                }
                            }
                        }
                        else if (!isHelper) {
                            renderedAttrs = " class=\"" + this._renderElementClasses(elNames).slice(0, -1) + "\"";
                        }
                        var currentEl = {
                            name: elName,
                            superCall: false,
                            source: isHelper ? ["this['" + elName + "@content']()"] : [
                                "'<" + (tagName || 'div') + renderedAttrs + ">'",
                                content && content.length ?
                                    "this['" + elName + "@content']() + '</" + (tagName || 'div') + ">'" :
                                    (!content && tagName && tagName in self_closing_tags_1.map ?
                                        "''" :
                                        "'</" + (tagName || 'div') + ">'")
                            ],
                            innerSource: []
                        };
                        els.push((this._currentElement = currentEl));
                        this._elementMap[elName] = currentEl;
                    }
                    else if (!isHelper) {
                        if (elAttrs && elAttrs.list.length) {
                            var renderedClasses = void 0;
                            var attrs = '';
                            for (var _b = 0, _c = elAttrs.list; _b < _c.length; _b++) {
                                var attr = _c[_b];
                                var value = attr.value;
                                if (attr.name == 'class') {
                                    renderedClasses = this._renderElementClasses(elNames);
                                    attrs += " class=\"" + (value ?
                                        renderedClasses + escape_html_1.default(escape_string_1.default(value)) :
                                        renderedClasses.slice(0, -1)) + "\"";
                                }
                                else {
                                    attrs += " " + attr.name + "=\"" + (value && escape_html_1.default(escape_string_1.default(value))) + "\"";
                                }
                            }
                            this._currentElement.innerSource.push("'<" + (tagName || 'div') + (renderedClasses ?
                                attrs :
                                " class=\"" + this._renderElementClasses(elNames).slice(0, -1) + "\"" + attrs) + ">'");
                        }
                        else {
                            this._currentElement.innerSource.push("'<" + (tagName || 'div') + " class=\"" + this._renderElementClasses(elNames).slice(0, -1) + "\">'");
                        }
                    }
                }
                else if (!isHelper) {
                    this._currentElement.innerSource.push("'<" + (tagName || 'div') + (elAttrs ?
                        elAttrs.list.map(function (attr) { return " " + attr.name + "=\"" + (attr.value && escape_html_1.default(escape_string_1.default(attr.value))) + "\""; }).join('') :
                        '') + ">'");
                }
                if (isHelper) {
                    if (!tagName) {
                        throw new TypeError('tagName is required');
                    }
                    var helper = Template.helpers[tagName];
                    if (!helper) {
                        throw new TypeError("Helper \"" + tagName + "\" is not defined");
                    }
                    var content_1 = helper(el);
                    if (content_1) {
                        for (var _d = 0, content_2 = content_1; _d < content_2.length; _d++) {
                            var contentNode = content_2[_d];
                            this._compileNode(contentNode, elName || parentElName);
                        }
                    }
                }
                else if (content) {
                    for (var _e = 0, content_3 = content; _e < content_3.length; _e++) {
                        var contentNode = content_3[_e];
                        this._compileNode(contentNode, elName || parentElName);
                    }
                }
                if (elName) {
                    els.pop();
                    this._currentElement = els[els.length - 1];
                    this._currentElement.innerSource.push("this['" + elName + "']()");
                }
                else if (!isHelper && (content || !tagName || !(tagName in self_closing_tags_1.map))) {
                    this._currentElement.innerSource.push("'</" + (tagName || 'div') + ">'");
                }
                break;
            }
            case nelm_parser_1.NodeType.TEXT: {
                this._currentElement.innerSource.push("'" + escape_string_1.default(node.value) + "'");
                break;
            }
            case nelm_parser_1.NodeType.SUPER_CALL: {
                this._currentElement.innerSource
                    .push("$super['" + (node.elementName || parentElName) + "@content'].call(this)");
                this._currentElement.superCall = true;
                break;
            }
        }
    };
    Template.prototype._renderElementClasses = function (elNames) {
        var elClasses = elNames[0] ? this._elementClassesTemplate.join(elNames[0] + ' ') : '';
        var elNameCount = elNames.length;
        if (elNameCount > 1) {
            var i = 1;
            do {
                elClasses += this._elementClassesTemplate.join(elNames[i] + ' ');
            } while (++i < elNameCount);
        }
        return elClasses;
    };
    return Template;
}());
Template.helpers = {
    section: function (el) { return el.content; }
};
exports.default = Template;


/***/ })
/******/ ]);
});