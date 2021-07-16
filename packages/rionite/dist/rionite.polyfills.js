/*!
ISC License

Copyright (c) 2014-2018, Andrea Giammarchi, @WebReflection

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.

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

    // pseudo-random number used as expando/unique name on feature detection
    UID = window.Math.random() * 10e4 >> 0,

    // IE < 11 only + old WebKit for attributes + feature detection
    EXPANDO_UID = '__' + REGISTER_ELEMENT + UID,

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
    validName = /^[A-Z][._A-Z0-9]*-[-._A-Z0-9]*$/,
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

    HTMLAnchorElement = window.HTMLAnchorElement,

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
    cloneNode = HTMLElementPrototype.cloneNode,
    closest = HTMLElementPrototype.closest || function (name) {
      var self = this;
      while (self && self.nodeName !== name)
        self = self.parentNode;
      return self;
    },
    dispatchEvent = HTMLElementPrototype.dispatchEvent,
    getAttribute = HTMLElementPrototype.getAttribute,
    hasAttribute = HTMLElementPrototype.hasAttribute,
    removeAttribute = HTMLElementPrototype.removeAttribute,
    setAttribute = HTMLElementPrototype.setAttribute,

    // replaced later on
    createElement = document.createElement,
    importNode = document.importNode,
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
    patch,

    // used for tests
    tmp
  ;

  // IE11 disconnectedCallback issue #
  // to be tested before any createElement patch
  if (MutationObserver) {
    // original fix:
    // https://github.com/javan/mutation-observer-inner-html-shim
    tmp = document.createElement('div');
    tmp.innerHTML = '<div><div></div></div>';
    new MutationObserver(function (mutations, observer) {
      if (
        mutations[0] &&
        mutations[0].type == 'childList' &&
        !mutations[0].removedNodes[0].childNodes.length
      ) {
        tmp = gOPD(HTMLElementPrototype, 'innerHTML');
        var set = tmp && tmp.set;
        if (set)
          defineProperty(HTMLElementPrototype, 'innerHTML', {
            set: function (value) {
              while (this.lastChild)
                this.removeChild(this.lastChild);
              set.call(this, value);
            }
          });
      }
      observer.disconnect();
      tmp = null;
    }).observe(tmp, {childList: true, subtree: true});
    tmp.innerHTML = "";
  }

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

        document.importNode = function (node, deep) {
          switch (node.nodeType) {
            case 1:
              return setupAll(document, importNode, [node, !!deep]);
            case 11:
              for (var
                fragment = document.createDocumentFragment(),
                childNodes = node.childNodes,
                length = childNodes.length,
                i = 0; i < length; i++
              )
                fragment.appendChild(document.importNode(childNodes[i], !!deep));
              return fragment;
            default:
              return cloneNode.call(node, !!deep);
          }
        };

        [HTMLElementPrototype, DocumentFragment.prototype].forEach(function (proto) {
          proto.cloneNode = function (deep) {
            return setupAll(this, cloneNode, [!!deep]);
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

  function setupAll(context, callback, args) {
    var
      node = callback.apply(context, args),
      i
    ;
    if (node.nodeType === Node.ELEMENT_NODE) {
      i = getTypeIndex(node);
      if (-1 < i) patch(node, protos[i]);
    }
    if (args[args.length - 1] && query.length)
      loopAndSetup(node.querySelectorAll(query));
    return node;
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
    if ((-1 < i) && !closest.call(node, 'TEMPLATE')) {
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
        if (-1 < indexOf.call(attributes, name)) {
          if (CProto[ATTRIBUTE_CHANGED_CALLBACK])
            CProto[ATTRIBUTE_CHANGED_CALLBACK].apply(this, arguments);
        }
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
        var re = new RegExp('^<a\\s+is=(\'|")' + name + '\\1></a>$');
        options[EXTENDS] = 'a';
        DRE.prototype = create(HTMLAnchorElement.prototype);
        DRE.prototype.constructor = DRE;
        window.customElements.define(name, DRE, options);
        if (
          !re.test(document.createElement('a', {is: name}).outerHTML) ||
          !re.test((new DRE()).outerHTML)
        ) {
          throw options;
        }
      }(
        function DRE() {
          return Reflect.construct(HTMLAnchorElement, [], DRE);
        },
        {},
        'document-register-element-a' + UID
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
      if (createElement.call(document, 'a', 'a').outerHTML.indexOf('is') < 0)
        throw {};
    } catch(FireFox) {
      secondArgument = function (is) {
        return {is: is.toLowerCase()};
      };
    }
  }

}(window));

/*!
ISC License

Copyright (c) 2014-2018, Andrea Giammarchi, @WebReflection

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.

*/
// see https://github.com/WebReflection/document-register-element/issues/21#issuecomment-102020311
window.innerHTML = (function (document) {

  var
    EXTENDS = 'extends',
    register = document.registerElement,
    div = document.createElement('div'),
    dre = 'document-register-element',
    innerHTML = register.innerHTML,
    initialize,
    registered
  ;

  // avoid duplicated wrappers
  if (innerHTML) return innerHTML;

  try {

    // feature detect the problem
    register.call(
      document,
      dre,
      {prototype: Object.create(
        HTMLElement.prototype,
        {createdCallback: {value: Object}}
      )}
    );

    div.innerHTML = '<' + dre + '></' + dre + '>';

    // if natively supported, nothing to do
    if ('createdCallback' in div.querySelector(dre)) {
      // return just an innerHTML wrap
      return (register.innerHTML = function (el, html) {
        el.innerHTML = html;
        return el;
      });
    }

  } catch(meh) {}

  // in other cases
  registered = [];
  initialize = function (el) {
    if (
      'createdCallback' in el         ||
      'attachedCallback' in el        ||
      'detachedCallback' in el        ||
      'attributeChangedCallback' in el
    ) return;
    document.createElement.innerHTMLHelper = true;
    for (var
      parentNode = el.parentNode,
      type = el.getAttribute('is'),
      name = el.nodeName,
      node = document.createElement.apply(
        document,
        type ? [name, type] : [name]
      ),
      attributes = el.attributes,
      i = 0,
      length = attributes.length,
      attr, fc;
      i < length; i++
    ) {
      attr = attributes[i];
      node.setAttribute(attr.name, attr.value);
    }
    while ((fc = el.firstChild)) node.appendChild(fc);
    document.createElement.innerHTMLHelper = false;
    if (parentNode) parentNode.replaceChild(node, el);
    if (node.createdCallback) {
      node.created = true;
      node.createdCallback();
      node.created = false;
    }
  };
  // augment the document.registerElement method
  return ((document.registerElement = function registerElement(type, options) {
    var name = (options[EXTENDS] ?
      (options[EXTENDS] + '[is="' + type + '"]') : type
    ).toLowerCase();
    if (registered.indexOf(name) < 0) registered.push(name);
    return register.apply(document, arguments);
  }).innerHTML = function (el, html) {
    el.innerHTML = html;
    for (var
      nodes = registered.length ? el.querySelectorAll(registered.join(',')) : [],
      i = nodes.length; i--; initialize(nodes[i])
    ) {}
    return el;
  });
}(document));

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("cellx"), require("@riim/next-uid"), require("cellx-collections"));
	else if(typeof define === 'function' && define.amd)
		define(["cellx", "@riim/next-uid", "cellx-collections"], factory);
	else if(typeof exports === 'object')
		exports["rionite"] = factory(require("cellx"), require("@riim/next-uid"), require("cellx-collections"));
	else
		root["rionite"] = factory(root["cellx"], root["@riim/next-uid"], root["cellx-collections"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE__4__, __WEBPACK_EXTERNAL_MODULE__9__, __WEBPACK_EXTERNAL_MODULE__17__) {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var reHeadTail = /-?([A-Z])([^A-Z])/g;
var reLongHead = /-?([A-Z]+)/g;
var reDash = /^-/;
var cache = Object.create(null);
function kebabCase(str, useCache) {
    str = String(str);
    var value;
    return ((useCache && cache[str]) ||
        ((value = str
            .replace(reHeadTail, function (match, head, tail) { return '-' + head.toLowerCase() + tail; })
            .replace(reLongHead, function (match, head) { return '-' + head.toLowerCase(); })
            .replace(reDash, '')),
            useCache ? (cache[str] = value) : value));
}
exports.kebabCase = kebabCase;


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.snakeCaseAttributeName = void 0;
const reCamelCase = /^_?[a-z][0-9a-z]*$/i;
const reLetters = /[A-Z][^A-Z]/g;
const reLetters2 = /[A-Z]{2,}/g;
const cache = new Map();
function snakeCaseAttributeName(str, useCache) {
    let value;
    return ((useCache && cache.get(str)) ||
        ((value = reCamelCase.test(str)
            ? str
                .replace(reLetters, (word) => '_' + word)
                .replace(reLetters2, (word) => '_' + word)
                .toLowerCase()
            : str),
            useCache && cache.set(str, value),
            value));
}
exports.snakeCaseAttributeName = snakeCaseAttributeName;


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TemplateParser = exports.NodeType = void 0;
var NodeType;
(function (NodeType) {
    NodeType[NodeType["ELEMENT"] = 1] = "ELEMENT";
    NodeType[NodeType["ELEMENT_ATTRIBUTE"] = 2] = "ELEMENT_ATTRIBUTE";
    NodeType[NodeType["TEXT"] = 3] = "TEXT";
    NodeType[NodeType["SUPER_CALL"] = 4] = "SUPER_CALL";
    NodeType[NodeType["DEBUGGER_CALL"] = 5] = "DEBUGGER_CALL";
})(NodeType = exports.NodeType || (exports.NodeType = {}));
const escapee = new Map([
    ['/', '/'],
    ['\\', '\\'],
    ['b', '\b'],
    ['f', '\f'],
    ['n', '\n'],
    ['r', '\r'],
    ['t', '\t']
]);
const reWhitespace = /\s/;
const reLineBreak = /\n|\r\n?/g;
const reTagName = /[a-zA-Z][\-\w]*/gy;
const reElementName = /[a-zA-Z][\-\w]*/gy;
const reAttributeName = /[^\s'">/=,)]+/gy;
const reSuperCall = /super(?:\.([a-zA-Z][\-\w]*))?!/gy;
const reTrimStartLine = /^[\x20\t]+/gm;
const reTrimEndLine = /[\x20\t]+$/gm;
function normalizeMultilineText(text) {
    return text.replace(reTrimStartLine, '').replace(reTrimEndLine, '');
}
class TemplateParser {
    constructor(template) {
        this.template = template;
    }
    parse() {
        this._pos = 0;
        this._chr = this.template.charAt(0);
        this._skipWhitespacesAndComments();
        return this._readContent(false);
    }
    _readContent(brackets) {
        if (brackets) {
            this._next( /* '{' */);
            this._skipWhitespacesAndComments();
        }
        let content = [];
        for (;;) {
            switch (this._chr) {
                case "'":
                case '"':
                case '`': {
                    content.push([NodeType.TEXT, this._readString()]);
                    break;
                }
                case '': {
                    if (brackets) {
                        this._throwError('Unexpected end of template. Expected "}" to close block.');
                    }
                    return content;
                }
                default: {
                    let chr = this._chr;
                    if (chr == 'd' && this.template.substr(this._pos, 9) == 'debugger!') {
                        this._chr = this.template.charAt((this._pos += 9));
                        content.push([NodeType.DEBUGGER_CALL]);
                        break;
                    }
                    if (brackets) {
                        if (chr == '}') {
                            this._next();
                            return content;
                        }
                        let superCall = this._readSuperCall();
                        if (superCall) {
                            content.push(superCall);
                            break;
                        }
                    }
                    this._readElement(content);
                    break;
                }
            }
            this._skipWhitespacesAndComments();
        }
    }
    _readElement(targetContent) {
        let pos = this._pos;
        let isTransformer = this._chr == '@';
        if (isTransformer) {
            this._next();
        }
        let tagName = this._readName(reTagName);
        this._skipWhitespacesAndComments();
        let elNames;
        let override;
        if (this._chr == ':') {
            this._next();
            let pos = this._pos;
            this._skipWhitespacesAndComments();
            if (this._chr == ':') {
                elNames = [undefined];
                this._next();
                this._skipWhitespacesAndComments();
            }
            for (let name; (name = this._readName(reElementName));) {
                if (!elNames) {
                    elNames = [];
                    if (this._chr == '!') {
                        override = 1;
                        this._next();
                    }
                }
                elNames.push(name);
                if (this._skipWhitespacesAndComments() != ':') {
                    break;
                }
                this._next();
                this._skipWhitespacesAndComments();
            }
            if (!elNames || (!elNames[0] && elNames.length == 1)) {
                this._throwError('Expected element name', pos);
            }
        }
        if (!tagName && !(elNames && elNames[0])) {
            this._throwError('Expected element', pos);
        }
        let attrs;
        if (this._chr == '(') {
            attrs = this._readAttributes();
            this._skipWhitespacesAndComments();
        }
        let content;
        if (this._chr == '{') {
            content = this._readContent(true);
        }
        targetContent.push([
            NodeType.ELEMENT,
            elNames,
            override,
            isTransformer ? 1 : undefined,
            tagName || undefined,
            attrs,
            content
        ]);
    }
    _readAttributes() {
        this._next( /* '(' */);
        if (this._skipWhitespacesAndComments() == ')') {
            this._next();
            return [undefined, undefined];
        }
        let superCall;
        let list;
        loop: for (let f = true;; f = false) {
            if (f && this._chr == 's' && (superCall = this._readSuperCall())) {
                this._skipWhitespacesAndComments();
            }
            else {
                let isTransformer = this._chr == '@';
                if (isTransformer) {
                    this._next();
                }
                let name = this._readName(reAttributeName);
                if (!name) {
                    name = '`' + this._readString();
                    if (!name) {
                        throw this._throwError('Expected attribute name');
                    }
                }
                if (this._skipWhitespacesAndComments() == '=') {
                    this._next();
                    let chr = this._skipWhitespaces();
                    if (chr == "'" || chr == '"' || chr == '`') {
                        (list || (list = [])).push([
                            isTransformer ? 1 : undefined,
                            name,
                            this._readString()
                        ]);
                        this._skipWhitespacesAndComments();
                    }
                    else {
                        let value = '';
                        for (;;) {
                            if (!chr) {
                                this._throwError('Unexpected end of template. Expected "," or ")" to finalize attribute value.');
                            }
                            if (chr == ',' || chr == ')' || chr == '\n' || chr == '\r') {
                                (list || (list = [])).push([
                                    isTransformer ? 1 : undefined,
                                    name,
                                    value.trim()
                                ]);
                                if (chr == '\n' || chr == '\r') {
                                    this._skipWhitespacesAndComments();
                                }
                                break;
                            }
                            value += chr;
                            chr = this._next();
                        }
                    }
                }
                else {
                    (list || (list = [])).push([isTransformer ? 1 : undefined, name, '']);
                }
            }
            switch (this._chr) {
                case ')': {
                    this._next();
                    break loop;
                }
                case ',': {
                    this._next();
                    this._skipWhitespacesAndComments();
                    break;
                }
                default: {
                    this._throwError('Unexpected end of template. Expected "," or ")" to finalize attribute value.');
                }
            }
        }
        return [superCall ? superCall[1] || 1 : undefined, list];
    }
    _readSuperCall() {
        reSuperCall.lastIndex = this._pos;
        let match = reSuperCall.exec(this.template);
        if (match) {
            this._chr = this.template.charAt((this._pos = reSuperCall.lastIndex));
            return [NodeType.SUPER_CALL, match[1]];
        }
        return null;
    }
    _readName(reName) {
        reName.lastIndex = this._pos;
        let match = reName.exec(this.template);
        if (match) {
            this._chr = this.template.charAt((this._pos = reName.lastIndex));
            return match[0];
        }
        return null;
    }
    _readString() {
        let quoteChar = this._chr;
        // if (quoteChar != "'" && quoteChar != '"' && quoteChar != '`') {
        // 	this._throwError('Expected string');
        // }
        let str = '';
        for (let chr = this._next(); chr;) {
            if (chr == quoteChar) {
                this._next();
                return quoteChar == '`' ? normalizeMultilineText(str) : str;
            }
            if (chr == '\\') {
                chr = this._next();
                if (chr == 'x' || chr == 'u') {
                    let pos = this._pos + 1;
                    let code = parseInt(this.template.slice(pos, pos + (chr == 'x' ? 2 : 4)), 16);
                    if (!isFinite(code)) {
                        this._throwError(`Invalid ${chr == 'x' ? 'hexadecimal' : 'unicode'} escape sequence`, pos);
                    }
                    str += String.fromCharCode(code);
                    chr = this._chr = this.template.charAt((this._pos = pos + (chr == 'x' ? 2 : 4)));
                }
                else if (escapee.has(chr)) {
                    str += escapee.get(chr);
                    chr = this._next();
                }
                else {
                    this._throwError('Invalid escape sequence', this._pos - 1);
                }
            }
            else {
                str += chr;
                chr = this._next();
            }
        }
        throw 1;
    }
    _skipWhitespaces() {
        let chr = this._chr;
        while (chr && reWhitespace.test(chr)) {
            chr = this._next();
        }
        return chr;
    }
    _skipWhitespacesAndComments() {
        let chr = this._chr;
        loop1: for (;;) {
            if (chr == '/') {
                switch (this.template.charAt(this._pos + 1)) {
                    case '/': {
                        this._next();
                        while ((chr = this._next()) && chr != '\n' && chr != '\r') { }
                        break;
                    }
                    case '*': {
                        let pos = this._pos;
                        this._next();
                        loop2: for (;;) {
                            switch (this._next()) {
                                case '*': {
                                    if (this._next() == '/') {
                                        chr = this._next();
                                        break loop2;
                                    }
                                    break;
                                }
                                case '': {
                                    this._throwError('Expected "*/" to close multiline comment', pos);
                                }
                            }
                        }
                        break;
                    }
                    default: {
                        break loop1;
                    }
                }
            }
            else if (chr && reWhitespace.test(chr)) {
                chr = this._next();
            }
            else {
                break;
            }
        }
        return chr;
    }
    _next( /* current?: string */) {
        // if (current && current != this._chr) {
        // 	this._throwError(`Expected "${current}" instead of "${this._chr}"`);
        // }
        return (this._chr = this.template.charAt(++this._pos));
    }
    _throwError(msg, pos = this._pos) {
        let n = pos < 40 ? 40 - pos : 0;
        throw SyntaxError(msg +
            '\n' +
            this.template
                .slice(pos < 40 ? 0 : pos - 40, pos + 20)
                .replace(/\t/g, ' ')
                .replace(reLineBreak, (match) => {
                if (match.length == 2) {
                    n++;
                }
                return '↵';
            }) +
            '\n' +
            '----------------------------------------'.slice(n) +
            '↑');
    }
}
exports.TemplateParser = TemplateParser;


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__4__;

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
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
exports.escapeString = escapeString;


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var escapeHTML_1 = __webpack_require__(7);
exports.escapeHTML = escapeHTML_1.escapeHTML;
var unescapeHTML_1 = __webpack_require__(8);
exports.unescapeHTML = unescapeHTML_1.unescapeHTML;


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var reEscapableChars = /[&<>"]/g;
var charToEscapedMap = Object.create(null);
charToEscapedMap['&'] = '&amp;';
charToEscapedMap['<'] = '&lt;';
charToEscapedMap['>'] = '&gt;';
charToEscapedMap['"'] = '&quot;';
function escapeHTML(str) {
    return (str
        ? reEscapableChars.test(str)
            ? str.replace(reEscapableChars, function (chr) { return charToEscapedMap[chr]; })
            : str
        : null);
}
exports.escapeHTML = escapeHTML;


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var reEscapableEntities = /&(?:amp|lt|gt|quot);/g;
var escapedToCharMap = Object.create(null);
escapedToCharMap['&amp;'] = '&';
escapedToCharMap['&lt;'] = '<';
escapedToCharMap['&gt;'] = '>';
escapedToCharMap['&quot;'] = '"';
function unescapeHTML(str) {
    return (str
        ? reEscapableEntities.test(str)
            ? str.replace(reEscapableEntities, function (entity) { return escapedToCharMap[entity]; })
            : str
        : null);
}
exports.unescapeHTML = unescapeHTML;


/***/ }),
/* 9 */
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__9__;

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var camelize_1 = __webpack_require__(11);
var cache = Object.create(null);
function pascalize(str, useCache) {
    str = String(str);
    var value;
    return ((useCache && cache[str]) ||
        ((value = camelize_1.camelize(str)),
            (value = value.charAt(0).toUpperCase() + value.slice(1)),
            useCache ? (cache[str] = value) : value));
}
exports.pascalize = pascalize;


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var reHyphen = /[-_]+([a-z])/g;
var cache = Object.create(null);
function camelize(str, useCache) {
    str = String(str);
    var value;
    return ((useCache && cache[str]) ||
        ((value = str.replace(reHyphen, function (match, chr) { return chr.toUpperCase(); })),
            useCache ? (cache[str] = value) : value));
}
exports.camelize = camelize;


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const utils_1 = __webpack_require__(13);
var config_1 = __webpack_require__(14);
exports.configure = config_1.configure;
let queue;
function run() {
    let track = queue;
    queue = null;
    for (let callback of track) {
        try {
            callback();
        }
        catch (err) {
            utils_1.logError(err);
        }
    }
}
function defer(callback) {
    if (queue) {
        queue.push(callback);
    }
    else {
        queue = [callback];
        setTimeout(run, 1);
    }
}
exports.defer = defer;


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(14);
function logError(...args) {
    config_1.config.logError(...args);
}
exports.logError = logError;


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.config = {
    logError: (...args) => {
        console.error(...args);
    }
};
function configure(options) {
    Object.assign(exports.config, options);
    return exports.config;
}
exports.configure = configure;


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function moveContent(target, source) {
    for (var child = void 0; (child = source.firstChild);) {
        target.appendChild(child);
    }
    return target;
}
exports.moveContent = moveContent;


/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports) {

(function (global, factory) {
	 true ? factory(exports) :
	0;
}(this, (function (exports) { 'use strict';

	const nextTick = (() => {
	    const global = Function('return this;')();
	    if (global.process &&
	        global.process.toString() == '[object process]' &&
	        global.process.nextTick) {
	        return global.process.nextTick;
	    }
	    if (global.setImmediate && global.setImmediate.toString().indexOf('[native code]') != -1) {
	        const setImmediate = global.setImmediate;
	        return (cb) => {
	            setImmediate(cb);
	        };
	    }
	    const promise = Promise.resolve();
	    return (cb) => {
	        promise.then(cb);
	    };
	})();

	exports.nextTick = nextTick;

	Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),
/* 17 */
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__17__;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Attr": () => (/* reexport */ Attr),
  "BaseComponent": () => (/* reexport */ BaseComponent),
  "Callback": () => (/* reexport */ Callback),
  "Component": () => (/* reexport */ Component),
  "ComponentParams": () => (/* reexport */ ComponentParams),
  "InterruptError": () => (/* reexport */ InterruptError),
  "Interruptible": () => (/* reexport */ Interruptible),
  "KEY_CONTENT_TEMPLATE": () => (/* reexport */ KEY_CONTENT_TEMPLATE),
  "KEY_ELEMENT_CONNECTED": () => (/* reexport */ KEY_ELEMENT_CONNECTED),
  "KEY_PARAMS_CONFIG": () => (/* reexport */ KEY_PARAMS_CONFIG),
  "KEY_PARAM_VALUES": () => (/* reexport */ KEY_PARAM_VALUES),
  "Listen": () => (/* reexport */ Listen),
  "Param": () => (/* reexport */ Param),
  "Ref": () => (/* reexport */ Ref),
  "RnCondition": () => (/* reexport */ RnCondition),
  "RnHtml": () => (/* reexport */ RnHtml),
  "RnRepeat": () => (/* reexport */ RnRepeat),
  "RnSlot": () => (/* reexport */ RnSlot),
  "Template": () => (/* reexport */ Template),
  "TemplateNodeType": () => (/* reexport */ NodeType),
  "configure": () => (/* reexport */ configure),
  "formatters": () => (/* reexport */ formatters),
  "onConnected": () => (/* reexport */ onConnected),
  "onDisconnected": () => (/* reexport */ onDisconnected),
  "onElementMoved": () => (/* reexport */ onElementMoved),
  "onReady": () => (/* reexport */ onReady),
  "registerComponent": () => (/* reexport */ registerComponent)
});

// EXTERNAL MODULE: ./node_modules/@riim/kebab-case/dist/index.js
var dist = __webpack_require__(1);
// EXTERNAL MODULE: ../rionite-snake-case-attribute-name/dist/index.js
var rionite_snake_case_attribute_name_dist = __webpack_require__(2);
// EXTERNAL MODULE: ../rionite-template-parser-2/dist/index.js
var rionite_template_parser_2_dist = __webpack_require__(3);
// EXTERNAL MODULE: external "cellx"
var external_cellx_ = __webpack_require__(4);
// EXTERNAL MODULE: ./node_modules/escape-string/dist/index.js
var escape_string_dist = __webpack_require__(5);
;// CONCATENATED MODULE: ./src/bindingToJSExpression.ts
function formattersReducer(jsExpr, formatter) {
    return `(this.${formatter.name} || formatters.${formatter.name}).call(this[KEY_COMPONENT_SELF], ${jsExpr}${formatter.arguments ? ', ' + formatter.arguments.join(', ') : ''})`;
}
function bindingToJSExpression(binding) {
    let formatters = binding.formatters;
    if (binding.keypath) {
        let keys = binding.keypath.split('.');
        let keyCount = keys.length;
        if (keyCount == 1) {
            return formatters
                ? formatters.reduce(formattersReducer, `this['${keys[0]}']`)
                : `this['${keys[0]}']`;
        }
        let index = keyCount - 2;
        let fragments = Array(index);
        while (index) {
            fragments[--index] = ` && (tmp = tmp['${keys[index + 1]}'])`;
        }
        let jsExpr = `(tmp = this['${keys[0]}'])${fragments.join('')} && tmp['${keys[keyCount - 1]}']`;
        return formatters ? formatters.reduce(formattersReducer, jsExpr) : jsExpr;
    }
    return formatters ? formatters.reduce(formattersReducer, binding.value) : binding.value;
}

// EXTERNAL MODULE: ./node_modules/@riim/escape-html/dist/index.js
var escape_html_dist = __webpack_require__(6);
;// CONCATENATED MODULE: ./src/componentParamValueConverters.ts

const KEY_COMPONENT_PARAM_VALUES = Symbol('componentParamValues');
const componentParamValueСonverters = new Map([
    [
        Boolean,
        {
            toData: (rawValue, defaultValue) => {
                return rawValue !== null ? rawValue != 'no' : !!defaultValue;
            },
            toString: (value, defaultValue) => {
                return value ? '' : defaultValue ? 'no' : null;
            }
        }
    ],
    [
        Number,
        {
            toData: (rawValue, defaultValue) => {
                return rawValue !== null
                    ? +rawValue
                    : defaultValue !== undefined
                        ? defaultValue
                        : null;
            },
            toString: (value) => {
                return value != null ? +value + '' : null;
            }
        }
    ],
    [
        String,
        {
            toData: (rawValue, defaultValue) => {
                return rawValue !== null
                    ? rawValue
                    : defaultValue !== undefined
                        ? defaultValue
                        : null;
            },
            toString: (value) => {
                return value != null ? value + '' : null;
            }
        }
    ],
    [
        Object,
        {
            toData: (rawValue, defaultValue, el) => {
                if (rawValue) {
                    let value = el[KEY_COMPONENT_PARAM_VALUES] &&
                        el[KEY_COMPONENT_PARAM_VALUES].get(rawValue);
                    if (!value) {
                        throw TypeError('Value is not an object');
                    }
                    return value;
                }
                if (defaultValue == null) {
                    return null;
                }
                if (typeof defaultValue == 'object' && defaultValue.clone) {
                    return defaultValue.clone.length != 0
                        ? defaultValue.clone(true)
                        : defaultValue.clone();
                }
                return defaultValue;
            },
            toString: null
        }
    ],
    [
        eval,
        {
            toData: (rawValue, defaultValue) => {
                if (rawValue !== null) {
                    // eslint-disable-next-line @typescript-eslint/no-implied-eval
                    return Function(`return ${(0,escape_html_dist.unescapeHTML)(rawValue)};`)();
                }
                if (defaultValue == null) {
                    return null;
                }
                if (defaultValue && typeof defaultValue == 'object' && defaultValue.clone) {
                    return defaultValue.clone.length != 0
                        ? defaultValue.clone(true)
                        : defaultValue.clone();
                }
                return defaultValue;
            },
            toString: null
        }
    ]
]);

;// CONCATENATED MODULE: ./src/Constants.ts
const KEY_COMPONENT_SELF = Symbol('componentSelf');
const KEY_PARAMS_CONFIG = Symbol('paramsConfig');
const KEY_PARAM_VALUES = Symbol('paramValues');
const KEY_CHILD_COMPONENTS = Symbol('childComponents');

// EXTERNAL MODULE: external "@riim/next-uid"
var next_uid_ = __webpack_require__(9);
;// CONCATENATED MODULE: ./src/config.ts
const config = {
    logError: (...args) => {
        console.error(...args);
    },
    getText: ((_msgctxt, msgid) => msgid)
};
function configure(options) {
    Object.assign(config, options);
    return config;
}

;// CONCATENATED MODULE: ./src/lib/formatters.ts


const formatters = {
    default(value, defaultValue) {
        return value === undefined ? defaultValue : value;
    },
    defaultFor(defaultValue, value) {
        return value === undefined ? defaultValue : value;
    },
    placeholder(value, placeholderValue) {
        return value === null ? placeholderValue : value;
    },
    and(value1, ...values) {
        return values.reduce((result, valueN) => result && valueN, value1);
    },
    andNot(value1, ...values) {
        return values.reduce((result, valueN) => result && !valueN, value1);
    },
    or(value1, ...values) {
        return values.reduce((result, valueN) => result || valueN, value1);
    },
    orNot(value1, ...values) {
        return values.reduce((result, valueN) => result || !valueN, value1);
    },
    cond(condition, value1, value2) {
        return condition ? value1 : value2;
    },
    not(value) {
        return !value;
    },
    bool(value) {
        return !!value;
    },
    eq(value1, value2) {
        return value1 == value2;
    },
    seq(value1, value2) {
        return value1 === value2;
    },
    lt(value1, value2) {
        return value1 < value2;
    },
    lte(value1, value2) {
        return value1 <= value2;
    },
    gt(value1, value2) {
        return value1 > value2;
    },
    gte(value1, value2) {
        return value1 >= value2;
    },
    startsWith(str, searchString, pos) {
        return (str !== null && str !== void 0 ? str : '').startsWith(searchString, pos);
    },
    endsWith(str, searchString, pos) {
        return (str !== null && str !== void 0 ? str : '').endsWith(searchString, pos);
    },
    padStart(str, maxLength, fillString) {
        return str && str.padStart(maxLength, fillString);
    },
    padEnd(str, maxLength, fillString) {
        return str && str.padEnd(maxLength, fillString);
    },
    replace(str, searchValue, replaceValue) {
        return str && str.replace(searchValue, replaceValue);
    },
    trim(str) {
        return str && str.trim();
    },
    uid(target) {
        return target && (0,next_uid_.getUID)(target);
    },
    has(target, key) {
        return !!target && target.has(key);
    },
    hasOwn(target, propName) {
        return !!target && Object.prototype.hasOwnProperty.call(target, propName);
    },
    get(target, key) {
        return target && target.get(key);
    },
    key(target, key) {
        return target && target[key];
    },
    prop(target, name) {
        return target && target.map((item) => item[name]);
    },
    contains(target, ...values) {
        return (!!target &&
            values.every(Array.isArray(target)
                ? (value) => target.includes(value)
                : (value) => target.contains(value)));
    },
    join(target, separator = ', ') {
        return target && target.join(separator);
    },
    dump(value) {
        return value == null ? value : JSON.stringify(value);
    },
    t(msgid, ...args) {
        return msgid && config.getText('', msgid, args);
    },
    pt(msgid, msgctxt, ...args) {
        return msgid && config.getText(msgctxt, msgid, args);
    },
    log(msg, ...optionalParams) {
        console.log(msg, ...optionalParams);
        return msg;
    }
};

;// CONCATENATED MODULE: ./src/lib/namePattern.ts
const namePattern = '[$_a-zA-Z][$\\w]*';

;// CONCATENATED MODULE: ./src/lib/keypathPattern.ts

const keypathPattern = `(?:${namePattern}|\\d+)(?:\\.(?:${namePattern}|\\d+))*`;

;// CONCATENATED MODULE: ./src/lib/keypathToJSExpression.ts
const cache = new Map();
function keypathToJSExpression(keypath, cacheKey = keypath) {
    if (!cache.has(cacheKey)) {
        let keys = typeof keypath == 'string' ? keypath.split('.') : keypath;
        let keyCount = keys.length;
        if (keyCount == 1) {
            cache.set(cacheKey, `this['${keypath}']`);
        }
        else {
            let index = keyCount - 2;
            let fragments = Array(index);
            while (index != 0) {
                fragments[--index] = ` && (tmp = tmp['${keys[index + 1]}'])`;
            }
            cache.set(cacheKey, `(tmp = this['${keys[0]}'])${fragments.join('')} && tmp['${keys[keyCount - 1]}']`);
        }
    }
    return cache.get(cacheKey);
}

;// CONCATENATED MODULE: ./src/TemplateNodeValueParser.ts



var TemplateNodeValueNodeType;
(function (TemplateNodeValueNodeType) {
    TemplateNodeValueNodeType[TemplateNodeValueNodeType["TEXT"] = 1] = "TEXT";
    TemplateNodeValueNodeType[TemplateNodeValueNodeType["BINDING"] = 2] = "BINDING";
    TemplateNodeValueNodeType[TemplateNodeValueNodeType["BINDING_KEYPATH"] = 3] = "BINDING_KEYPATH";
    TemplateNodeValueNodeType[TemplateNodeValueNodeType["BINDING_FORMATTER"] = 4] = "BINDING_FORMATTER";
})(TemplateNodeValueNodeType || (TemplateNodeValueNodeType = {}));
const reWhitespace = /\s/;
const reName = RegExp(namePattern, 'gy');
const reKeypath = RegExp(keypathPattern, 'gy');
const reBoolean = /false|true/gy;
const reNumber = /(?:[+-]\s*)?(?:0b[01]+|0[0-7]+|0x[0-9a-fA-F]+|(?:(?:0|[1-9]\d*)(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?|Infinity|NaN)/gy;
const reRegExpModifiers = /[gimyu]+/gy;
const reVacuum = /null|undefined|void 0/gy;
class TemplateNodeValueParser {
    constructor(templateNodeValue) {
        this.templateNodeValue = templateNodeValue;
    }
    parse(index) {
        let templateNodeValue = this.templateNodeValue;
        this._pos = 0;
        let result = (this.result = []);
        do {
            this._pushText(templateNodeValue.slice(this._pos, index));
            this._pos = index;
            this._chr = templateNodeValue.charAt(index);
            let binding = this._readBinding();
            if (binding) {
                result.push(binding);
            }
            else {
                this._pushText(this._chr);
                this._next();
            }
            index = templateNodeValue.indexOf('{', this._pos);
        } while (index != -1);
        this._pushText(templateNodeValue.slice(this._pos));
        return result;
    }
    _pushText(value) {
        if (value) {
            let result = this.result;
            let resultLen = result.length;
            if (resultLen != 0 &&
                result[resultLen - 1].nodeType == TemplateNodeValueNodeType.TEXT) {
                result[resultLen - 1].value += value;
            }
            else {
                result.push({
                    nodeType: TemplateNodeValueNodeType.TEXT,
                    value
                });
            }
        }
    }
    _readBinding() {
        let pos = this._pos;
        this._next( /* '{' */);
        this._skipWhitespaces();
        let prefix = this._readPrefix();
        this._skipWhitespaces();
        let keypath = this._readKeypath();
        let value;
        if (!prefix && !keypath) {
            value = this._readValue();
        }
        if (keypath || value) {
            let formatters;
            for (let formatter; this._skipWhitespaces() == '|' && (formatter = this._readFormatter());) {
                (formatters !== null && formatters !== void 0 ? formatters : (formatters = [])).push(formatter);
            }
            if (this._chr == '}') {
                this._next();
                return {
                    nodeType: TemplateNodeValueNodeType.BINDING,
                    prefix,
                    keypath,
                    value: value !== null && value !== void 0 ? value : null,
                    formatters: formatters !== null && formatters !== void 0 ? formatters : null,
                    raw: this.templateNodeValue.slice(pos, this._pos)
                };
            }
        }
        this._pos = pos;
        this._chr = this.templateNodeValue.charAt(pos);
        return null;
    }
    _readPrefix() {
        let chr = this._chr;
        if (chr == '=') {
            this._next();
            return '=';
        }
        if (chr == '<') {
            let pos = this._pos;
            if (this.templateNodeValue.charAt(pos + 1) == '-') {
                if (this.templateNodeValue.charAt(pos + 2) == '>') {
                    this._chr = this.templateNodeValue.charAt((this._pos = pos + 3));
                    return '<->';
                }
                this._chr = this.templateNodeValue.charAt((this._pos = pos + 2));
                return '<-';
            }
        }
        else if (chr == '-' && this.templateNodeValue.charAt(this._pos + 1) == '>') {
            this._chr = this.templateNodeValue.charAt((this._pos += 2));
            return '->';
        }
        return null;
    }
    _readFormatter() {
        let pos = this._pos;
        this._next( /* '|' */);
        this._skipWhitespaces();
        let name = this._readName();
        if (name) {
            return {
                nodeType: TemplateNodeValueNodeType.BINDING_FORMATTER,
                name,
                arguments: this._chr == '(' ? this._readFormatterArguments() : null
            };
        }
        this._pos = pos;
        this._chr = this.templateNodeValue.charAt(pos);
        return null;
    }
    _readFormatterArguments() {
        var _a;
        let pos = this._pos;
        this._next( /* '(' */);
        let args;
        if (this._skipWhitespaces() != ')') {
            for (;;) {
                let arg = (_a = this._readValue()) !== null && _a !== void 0 ? _a : this._readKeypath(true);
                if (!(arg && (this._skipWhitespaces() == ',' || this._chr == ')'))) {
                    this._pos = pos;
                    this._chr = this.templateNodeValue.charAt(pos);
                    return null;
                }
                (args !== null && args !== void 0 ? args : (args = [])).push(arg);
                if (this._chr == ')') {
                    break;
                }
                this._next();
                this._skipWhitespaces();
            }
        }
        this._next();
        return args !== null && args !== void 0 ? args : null;
    }
    _readValue() {
        switch (this._chr) {
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
            case '/': {
                return this._readRegExp();
            }
        }
        let readers = ['_readBoolean', '_readNumber', '_readVacuum'];
        for (let reader of readers) {
            let value = this[reader]();
            if (value) {
                return value;
            }
        }
        return null;
    }
    _readObject() {
        var _a;
        let pos = this._pos;
        this._next( /* '{' */);
        let obj = '{';
        while (this._skipWhitespaces() != '}') {
            let key = this._chr == "'" || this._chr == '"' ? this._readString() : this._readObjectKey();
            if (key && this._skipWhitespaces() == ':') {
                this._next();
                this._skipWhitespaces();
                let valueOrKeypath = (_a = this._readValue()) !== null && _a !== void 0 ? _a : this._readKeypath(true);
                if (valueOrKeypath) {
                    if (this._skipWhitespaces() == ',') {
                        obj += key + ':' + valueOrKeypath + ',';
                        this._next();
                        continue;
                    }
                    else if (this._chr == '}') {
                        obj += key + ':' + valueOrKeypath + '}';
                        break;
                    }
                }
            }
            this._pos = pos;
            this._chr = this.templateNodeValue.charAt(pos);
            return null;
        }
        this._next();
        return obj;
    }
    _readObjectKey() {
        return this._readName();
    }
    _readArray() {
        var _a;
        let pos = this._pos;
        this._next( /* '[' */);
        let arr = '[';
        while (this._skipWhitespaces() != ']') {
            if (this._chr == ',') {
                arr += ',';
                this._next();
            }
            else {
                let valueOrKeypath = (_a = this._readValue()) !== null && _a !== void 0 ? _a : this._readKeypath(true);
                if (valueOrKeypath) {
                    arr += valueOrKeypath;
                }
                else {
                    this._pos = pos;
                    this._chr = this.templateNodeValue.charAt(pos);
                    return null;
                }
            }
        }
        this._next();
        return arr + ']';
    }
    _readBoolean() {
        reBoolean.lastIndex = this._pos;
        let match = reBoolean.exec(this.templateNodeValue);
        if (match) {
            this._chr = this.templateNodeValue.charAt((this._pos = reBoolean.lastIndex));
            return match[0];
        }
        return null;
    }
    _readNumber() {
        reNumber.lastIndex = this._pos;
        let match = reNumber.exec(this.templateNodeValue);
        if (match) {
            this._chr = this.templateNodeValue.charAt((this._pos = reNumber.lastIndex));
            return match[0];
        }
        return null;
    }
    _readString() {
        let pos = this._pos;
        let quoteChar = this._chr;
        let str = '';
        for (let next /* = this._next(quoteChar == '"' ? null : "'") */; (next = this._next());) {
            if (next == quoteChar) {
                this._next();
                return quoteChar + str + quoteChar;
            }
            if (next == '\\') {
                str += next + this._next();
            }
            else {
                if (next == '\n' || next == '\r') {
                    break;
                }
                str += next;
            }
        }
        this._pos = pos;
        this._chr = this.templateNodeValue.charAt(pos);
        return null;
    }
    _readRegExp() {
        let pos = this._pos;
        let next = this._next( /* '/' */);
        let regex = '';
        while (next) {
            if (next == '/') {
                if (!regex) {
                    break;
                }
                this._next();
                reRegExpModifiers.lastIndex = this._pos;
                let match = reRegExpModifiers.exec(this.templateNodeValue);
                if (match) {
                    this._chr = this.templateNodeValue.charAt((this._pos = reRegExpModifiers.lastIndex));
                    return '/' + regex + '/' + match[0];
                }
                return '/' + regex + '/';
            }
            if (next == '\\') {
                regex += next + this._next();
            }
            else {
                if (next == '\n' || next == '\r') {
                    break;
                }
                regex += next;
            }
            next = this._next();
        }
        this._pos = pos;
        this._chr = this.templateNodeValue.charAt(pos);
        return null;
    }
    _readVacuum() {
        reVacuum.lastIndex = this._pos;
        let match = reVacuum.exec(this.templateNodeValue);
        if (match) {
            this._chr = this.templateNodeValue.charAt((this._pos = reVacuum.lastIndex));
            return match[0];
        }
        return null;
    }
    _readKeypath(toJSExpression) {
        reKeypath.lastIndex = this._pos;
        let match = reKeypath.exec(this.templateNodeValue);
        if (match) {
            this._chr = this.templateNodeValue.charAt((this._pos = reKeypath.lastIndex));
            return toJSExpression ? keypathToJSExpression(match[0]) : match[0];
        }
        return null;
    }
    _readName() {
        reName.lastIndex = this._pos;
        let match = reName.exec(this.templateNodeValue);
        if (match) {
            this._chr = this.templateNodeValue.charAt((this._pos = reName.lastIndex));
            return match[0];
        }
        return null;
    }
    _skipWhitespaces() {
        let chr = this._chr;
        while (chr && reWhitespace.test(chr)) {
            chr = this._next();
        }
        return chr;
    }
    _next( /* current?: string | null */) {
        // if (current != null && current != this._chr) {
        // 	throw {
        // 		name: 'SyntaxError',
        // 		message: `Expected "${current}" instead of "${this._chr}"`,
        // 		pos: this._pos,
        // 		templateNodeValue: this.templateNodeValue
        // 	};
        // }
        return (this._chr = this.templateNodeValue.charAt(++this._pos));
    }
}

;// CONCATENATED MODULE: ./src/compileTemplateNodeValue.ts






const compileTemplateNodeValue_cache = new Map();
function compileTemplateNodeValue(templateNodeValueAST, templateNodeValueString, useComponentParamValues) {
    let cacheKey = templateNodeValueString + (useComponentParamValues ? ',' : '.');
    if (!compileTemplateNodeValue_cache.has(cacheKey)) {
        let inner;
        if (templateNodeValueAST.length == 1) {
            // eslint-disable-next-line @typescript-eslint/no-implied-eval
            inner = Function('formatters, KEY_COMPONENT_SELF', `var tmp; return ${bindingToJSExpression(templateNodeValueAST[0])};`);
        }
        else {
            let fragments = [];
            for (let node of templateNodeValueAST) {
                fragments.push(node.nodeType == TemplateNodeValueNodeType.TEXT
                    ? `'${(0,escape_string_dist.escapeString)(node.value)}'`
                    : bindingToJSExpression(node));
            }
            // eslint-disable-next-line @typescript-eslint/no-implied-eval
            inner = Function('formatters, KEY_COMPONENT_SELF', `var tmp; return [${fragments.join(', ')}].join('');`);
        }
        compileTemplateNodeValue_cache.set(cacheKey, useComponentParamValues
            ? function (cell) {
                let value = inner.call(this, formatters, KEY_COMPONENT_SELF);
                if (value && (typeof value == 'object' || typeof value == 'function')) {
                    let meta = cell.meta;
                    (meta.element[KEY_COMPONENT_PARAM_VALUES] ||
                        (meta.element[KEY_COMPONENT_PARAM_VALUES] = new Map())).set(meta.attributeName, value);
                    return meta.attributeName;
                }
                return value;
            }
            : function () {
                let value = inner.call(this, formatters);
                return value == null ? '' : value + '';
            });
    }
    return compileTemplateNodeValue_cache.get(cacheKey);
}

;// CONCATENATED MODULE: ./src/lib/compileKeypath.ts

const compileKeypath_cache = new Map();
function compileKeypath(keypath, cacheKey = keypath) {
    var _a;
    return ((_a = compileKeypath_cache.get(cacheKey)) !== null && _a !== void 0 ? _a : compileKeypath_cache
        .set(cacheKey, 
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    Function(`var tmp; return ${keypathToJSExpression(keypath, cacheKey)};`))
        .get(cacheKey));
}

;// CONCATENATED MODULE: ./src/lib/SVG_NAMESPACE_URI.ts
const SVG_NAMESPACE_URI = 'http://www.w3.org/2000/svg';

;// CONCATENATED MODULE: ./src/lib/setAttribute.ts

function setAttribute(el, name, value) {
    if (el.namespaceURI == SVG_NAMESPACE_URI) {
        if (name == 'xlink:href' || name == 'href' || name == 'xmlns') {
            let ns = name == 'xmlns' ? 'http://www.w3.org/2000/xmlns/' : 'http://www.w3.org/1999/xlink';
            if (value == null || value === false) {
                el.removeAttributeNS(ns, name);
            }
            else {
                el.setAttributeNS(ns, name, value === true ? '' : value);
            }
            return el;
        }
    }
    else if (name == 'class') {
        el.className = value;
        return el;
    }
    if (value == null || value === false) {
        el.removeAttribute(name);
    }
    else {
        el.setAttribute(name, value === true ? '' : value);
    }
    return el;
}

;// CONCATENATED MODULE: ./src/parseTemplateNodeValue.ts


function parseTemplateNodeValue(templateNodeValue) {
    if (!templateNodeValueASTCache.has(templateNodeValue)) {
        let bracketIndex = templateNodeValue.indexOf('{');
        if (bracketIndex == -1) {
            templateNodeValueASTCache.set(templateNodeValue, null);
        }
        else {
            let templateNodeValueAST = new TemplateNodeValueParser(templateNodeValue).parse(bracketIndex);
            if (templateNodeValueAST.length == 1 &&
                templateNodeValueAST[0].nodeType == TemplateNodeValueNodeType.TEXT) {
                templateNodeValueAST = null;
            }
            templateNodeValueASTCache.set(templateNodeValue, templateNodeValueAST);
        }
    }
    return templateNodeValueASTCache.get(templateNodeValue);
}

;// CONCATENATED MODULE: ./src/bindContent.ts






const KEY_CONTEXT = Symbol('context');
const templateNodeValueASTCache = new Map();
function onAttributeBindingCellChange(evt) {
    setAttribute(evt.target.meta.element, evt.target.meta.attributeName, evt.data['value']);
}
function onTextNodeBindingCellChange(evt) {
    evt.target.meta.textNode.nodeValue = evt.data['value'];
}
function bindContent(node, ownerComponent, context, result, parentComponent) {
    var _a, _b, _c, _d;
    for (let child = node.firstChild; child; child = child.nextSibling) {
        switch (child.nodeType) {
            case Node.ELEMENT_NODE: {
                let childComponent = child.rioniteComponent;
                let $paramsConfig;
                let $specifiedParams;
                if (childComponent) {
                    $paramsConfig = childComponent.constructor[KEY_PARAMS_CONFIG];
                    $specifiedParams = new Set();
                }
                let attrs = child.attributes;
                for (let i = attrs.length; i != 0;) {
                    let attr = attrs[--i];
                    let attrName = attr.name;
                    let targetAttrName;
                    if (attrName.charAt(0) == '_') {
                        targetAttrName = attrName.slice(1);
                    }
                    else {
                        targetAttrName = attrName;
                        if (!attrName.lastIndexOf('oncomponent-', 0) ||
                            !attrName.lastIndexOf('on-', 0)) {
                            child[KEY_CONTEXT] = context;
                        }
                    }
                    let $paramConfig = $paramsConfig && $paramsConfig.get(targetAttrName);
                    let attrValue = attr.value;
                    if ($paramConfig) {
                        $specifiedParams.add($paramConfig.name);
                    }
                    if (!attrValue) {
                        continue;
                    }
                    let attrValueAST = parseTemplateNodeValue(attrValue);
                    if (!attrValueAST) {
                        continue;
                    }
                    let bindingPrefix = attrValueAST.length == 1
                        ? attrValueAST[0].prefix
                        : null;
                    if (bindingPrefix === '=') {
                        setAttribute(child, targetAttrName, compileTemplateNodeValue(attrValueAST, attrValue, true).call(context, {
                            meta: {
                                element: child,
                                attributeName: targetAttrName
                            }
                        }));
                    }
                    else {
                        if (bindingPrefix !== '->') {
                            let cell = new external_cellx_.Cell(compileTemplateNodeValue(attrValueAST, attrValue, attrValueAST.length == 1), {
                                context,
                                meta: {
                                    element: child,
                                    attributeName: targetAttrName
                                },
                                onChange: onAttributeBindingCellChange
                            });
                            setAttribute(child, targetAttrName, cell.get());
                            ((_a = result[1]) !== null && _a !== void 0 ? _a : (result[1] = [])).push(cell);
                        }
                        if ($paramConfig && (bindingPrefix === '->' || bindingPrefix === '<->')) {
                            if (bindingPrefix == '->' && attrName.charAt(0) != '_') {
                                child.removeAttribute(attrName);
                            }
                            let keypath = attrValueAST[0].keypath.split('.');
                            ((_b = result[2]) !== null && _b !== void 0 ? _b : (result[2] = [])).push(childComponent, $paramConfig.property, keypath.length == 1
                                ? ((propName) => function (evt) {
                                    this.ownerComponent[propName] = evt.data['value'];
                                })(keypath[0])
                                : ((propName, keypath) => {
                                    let getPropertyHolder = compileKeypath(keypath, keypath.join('.'));
                                    return function (evt) {
                                        let propHolder = getPropertyHolder.call(this.ownerComponent);
                                        if (propHolder) {
                                            propHolder[propName] = evt.data['value'];
                                        }
                                    };
                                })(keypath[keypath.length - 1], keypath.slice(0, -1)));
                        }
                    }
                }
                if (childComponent) {
                    childComponent._ownerComponent = ownerComponent;
                    childComponent.$context = context;
                    childComponent.$specifiedParams = $specifiedParams;
                    if (parentComponent) {
                        (parentComponent[KEY_CHILD_COMPONENTS] ||
                            (parentComponent[KEY_CHILD_COMPONENTS] = [])).push(childComponent);
                    }
                    else {
                        ((_c = result[0]) !== null && _c !== void 0 ? _c : (result[0] = [])).push(childComponent);
                    }
                }
                if (child.firstChild &&
                    (!childComponent || !childComponent.constructor.bindsInputContent)) {
                    bindContent(child, ownerComponent, context, result, childComponent);
                }
                break;
            }
            case Node.TEXT_NODE: {
                let childValue = child.nodeValue;
                let childValueAST = parseTemplateNodeValue(childValue);
                if (!childValueAST) {
                    break;
                }
                if (childValueAST.length == 1 &&
                    childValueAST[0].prefix === '=') {
                    child.nodeValue = compileTemplateNodeValue(childValueAST, childValue, false).call(context);
                }
                else {
                    let cell = new external_cellx_.Cell(compileTemplateNodeValue(childValueAST, childValue, false), {
                        context,
                        meta: { textNode: child },
                        onChange: onTextNodeBindingCellChange
                    });
                    child.nodeValue = cell.get();
                    ((_d = result[1]) !== null && _d !== void 0 ? _d : (result[1] = [])).push(cell);
                }
                break;
            }
        }
    }
    return result;
}

;// CONCATENATED MODULE: ./src/componentConstructors.ts
const componentConstructors = new Map();

;// CONCATENATED MODULE: ./src/lib/InterruptError.ts
function InterruptError() {
    if (!(this instanceof InterruptError)) {
        return new InterruptError();
    }
}
InterruptError.prototype = {
    __proto__: Error.prototype,
    constructor: InterruptError
};

;// CONCATENATED MODULE: ./src/handleDOMEvent.ts



const KEY_DOM_EVENTS = Symbol('domEvents');
function handleDOMEvent(evt) {
    let el = evt.target;
    if (el == document.body) {
        return;
    }
    let evtType = evt.type;
    let attrName = 'on-' + evtType;
    let parentEl = el.parentElement;
    let receivers;
    while (parentEl) {
        if (parentEl == document.body) {
            return;
        }
        if ((el[KEY_DOM_EVENTS] && el[KEY_DOM_EVENTS].has(evtType)) || el.hasAttribute(attrName)) {
            (receivers !== null && receivers !== void 0 ? receivers : (receivers = [])).push(el);
        }
        let component = parentEl.$component;
        if (component && receivers && receivers.length != 0) {
            let i = 0;
            do {
                let receiver = receivers[i];
                let handler;
                if (receiver[KEY_DOM_EVENTS]) {
                    let elName = receiver[KEY_DOM_EVENTS].get(evtType);
                    if (elName) {
                        let events = component.constructor.domEvents;
                        if (events && events[elName]) {
                            handler = events[elName][evtType];
                            if (handler) {
                                let result = handler.call(component, evt, receiver[KEY_CONTEXT], receiver);
                                if (result === false) {
                                    return;
                                }
                                if (result instanceof Promise) {
                                    result.catch((err) => {
                                        if (!(err instanceof InterruptError)) {
                                            config.logError(err);
                                        }
                                    });
                                }
                                receivers.splice(i, 1);
                            }
                        }
                    }
                }
                handler = component[receiver.getAttribute(attrName)];
                if (handler) {
                    let result = handler.call(component, evt, receiver[KEY_CONTEXT], receiver);
                    if (result === false) {
                        return;
                    }
                    if (result instanceof Promise) {
                        result.catch((err) => {
                            if (!(err instanceof InterruptError)) {
                                config.logError(err);
                            }
                        });
                    }
                    if (i != receivers.length && receivers[i] == receiver) {
                        receivers.splice(i, 1);
                    }
                }
                if (i != receivers.length && receivers[i] == receiver) {
                    i++;
                }
            } while (i < receivers.length);
        }
        el = parentEl;
        parentEl = el.parentElement;
    }
}

;// CONCATENATED MODULE: ./src/handleEvent.ts



const KEY_EVENTS = Symbol('events');
const componentStack = [];
function handleEvent(evt) {
    let target = evt.target;
    let ownerComponent = target.ownerComponent;
    if (target == ownerComponent) {
        return;
    }
    let targetEl = target.element;
    let el = targetEl;
    if (!el.parentElement) {
        return;
    }
    componentStack.length = 0;
    let evtType = evt.type;
    let attrName = typeof evtType == 'string' ? 'oncomponent-' + evtType : null;
    let receivers = null;
    for (;;) {
        if ((el[KEY_EVENTS] && el[KEY_EVENTS].has(evtType)) ||
            (attrName && el.hasAttribute(attrName))) {
            (receivers !== null && receivers !== void 0 ? receivers : (receivers = [])).push(el);
        }
        if (el.parentElement == ownerComponent.element) {
            if (receivers) {
                for (let receiver of receivers) {
                    if (receiver[KEY_EVENTS]) {
                        let elName = receiver[KEY_EVENTS].get(evtType);
                        if (elName) {
                            let events = ownerComponent.constructor.events;
                            let handler = events[elName][evtType];
                            if (handler) {
                                let result = handler.call(ownerComponent, evt, receiver[KEY_CONTEXT], receiver);
                                if (result === false) {
                                    return;
                                }
                                if (result instanceof Promise) {
                                    result.catch((err) => {
                                        if (!(err instanceof InterruptError)) {
                                            config.logError(err);
                                        }
                                    });
                                }
                            }
                        }
                    }
                    if (attrName) {
                        let handler = ownerComponent[receiver.getAttribute(attrName)];
                        if (handler) {
                            let result = handler.call(ownerComponent, evt, receiver[KEY_CONTEXT], receiver);
                            if (result === false) {
                                return;
                            }
                            if (result instanceof Promise) {
                                result.catch((err) => {
                                    if (!(err instanceof InterruptError)) {
                                        config.logError(err);
                                    }
                                });
                            }
                        }
                    }
                }
                receivers.length = 0;
            }
            if (componentStack.length == 0) {
                break;
            }
            el = el.parentElement;
            if (!el.parentElement) {
                break;
            }
            [ownerComponent, receivers] = componentStack.pop();
        }
        else {
            el = el.parentElement;
            if (!el.parentElement) {
                break;
            }
            let component = el.$component;
            if (component && component.ownerComponent != ownerComponent) {
                componentStack.push([ownerComponent, receivers]);
                ownerComponent = component.ownerComponent;
                receivers = null;
            }
        }
    }
}

;// CONCATENATED MODULE: ./src/Template2.ts















var NodeType;
(function (NodeType) {
    NodeType[NodeType["BLOCK"] = 1] = "BLOCK";
    NodeType[NodeType["ELEMENT"] = 2] = "ELEMENT";
    NodeType[NodeType["TEXT"] = 3] = "TEXT";
    NodeType[NodeType["ELEMENT_CALL"] = 4] = "ELEMENT_CALL";
    NodeType[NodeType["SUPER_CALL"] = 5] = "SUPER_CALL";
    NodeType[NodeType["DEBUGGER_CALL"] = 6] = "DEBUGGER_CALL";
})(NodeType || (NodeType = {}));
const KEY_CONTENT_TEMPLATE = Symbol('contentTemplate');
const ELEMENT_NAME_DELIMITER = '__';
class Template {
    constructor(template, options) {
        var _a;
        this.initialized = false;
        let embedded = (this._embedded = !!(options === null || options === void 0 ? void 0 : options._embedded));
        let parent = (this.parent = (_a = options === null || options === void 0 ? void 0 : options.parent) !== null && _a !== void 0 ? _a : null);
        if (typeof template == 'string') {
            template = new rionite_template_parser_2_dist.TemplateParser(template).parse();
        }
        if (Array.isArray(template)) {
            this.template = template;
            this.block = null;
        }
        else {
            this.template = null;
            this.block = template;
            if (this._embedded) {
                this._elements = template.elements;
            }
        }
        if (embedded) {
            this._elementNamesTemplate = parent._elementNamesTemplate;
        }
        else {
            let blockName = options && options.blockName;
            if (Array.isArray(blockName)) {
                this.setBlockName(blockName);
            }
            else if (parent) {
                this._elementNamesTemplate = blockName
                    ? [blockName + ELEMENT_NAME_DELIMITER].concat(parent._elementNamesTemplate)
                    : parent._elementNamesTemplate.slice();
            }
            else if (blockName) {
                this._elementNamesTemplate = [blockName + ELEMENT_NAME_DELIMITER, ''];
            }
            else {
                this._elementNamesTemplate = ['', ''];
            }
        }
    }
    initialize(component) {
        if (this.initialized) {
            return;
        }
        this.initialized = true;
        if (this.parent) {
            this.parent.parse(component);
        }
        let parent = this.parent;
        if (!this._embedded) {
            this._elements = parent
                ? { __proto__: parent._elements }
                : {
                    __proto__: null,
                    '@root': {
                        nodeType: NodeType.ELEMENT,
                        names: ['root'],
                        isTransformer: true,
                        namespaceSVG: false,
                        tagName: 'section',
                        is: null,
                        attributes: null,
                        $specifiedParams: null,
                        events: null,
                        domEvents: null,
                        content: [],
                        contentTemplateIndex: null
                    }
                };
        }
        this._embeddedTemplates = this._embedded
            ? parent._embeddedTemplates
            : parent &&
                parent._embeddedTemplates &&
                parent._embeddedTemplates.map((template) => new Template({
                    nodeType: NodeType.BLOCK,
                    content: template.block.content,
                    elements: this._elements
                }, {
                    _embedded: true,
                    parent: this
                }));
    }
    parse(component) {
        this.initialize(component);
        if (this.block) {
            return this.block;
        }
        let block = (this.block = {
            nodeType: NodeType.BLOCK,
            content: null,
            elements: this._elements
        });
        this._readContent(this.parent ? null : block.elements['@root'].content, this.template, false, null, component === null || component === void 0 ? void 0 : component.constructor);
        return block;
    }
    _setElement(name, override, el) {
        if (this._elements[name]) {
            if (!override) {
                config.logError(`Implicit overriding of element "${name}"`);
            }
        }
        else {
            if (override) {
                config.logError(`Overriding of non-existent element "${name}"`);
            }
        }
        this._elements[name] = el;
    }
    _readContent(targetContent, content, namespaceSVG, superElName, componentCtor) {
        for (let node of content) {
            switch (node[0]) {
                case rionite_template_parser_2_dist.NodeType.ELEMENT: {
                    targetContent = this._readElement(targetContent, node, namespaceSVG, superElName, componentCtor);
                    break;
                }
                case rionite_template_parser_2_dist.NodeType.TEXT: {
                    (targetContent !== null && targetContent !== void 0 ? targetContent : (targetContent = [])).push({
                        nodeType: NodeType.TEXT,
                        value: node[1]
                    });
                    break;
                }
                case rionite_template_parser_2_dist.NodeType.SUPER_CALL: {
                    (targetContent !== null && targetContent !== void 0 ? targetContent : (targetContent = [])).push(this._readSuperCall(node, superElName));
                    break;
                }
                case rionite_template_parser_2_dist.NodeType.DEBUGGER_CALL: {
                    (targetContent !== null && targetContent !== void 0 ? targetContent : (targetContent = [])).push({
                        nodeType: NodeType.DEBUGGER_CALL
                    });
                    break;
                }
            }
        }
        return targetContent;
    }
    _readElement(targetContent, elNode, namespaceSVG, superElName, componentCtor) {
        var _a, _b, _c, _d, _e, _f;
        let elNames = elNode[1];
        let override = elNode[2] == 1;
        let isTransformer = !!elNode[3];
        let tagName = (_a = elNode[4]) !== null && _a !== void 0 ? _a : null;
        if (elNames && !elNames[0]) {
            elNames[0] = null;
        }
        let elName = elNames
            ? isTransformer
                ? elNames[0] && '@' + elNames[0]
                : elNames[0]
            : null;
        if (tagName) {
            if (!namespaceSVG) {
                if (tagName.toLowerCase() == 'svg') {
                    namespaceSVG = true;
                    tagName = 'svg';
                }
                else {
                    if (elName) {
                        let superEl;
                        if (this.parent && (superEl = this.parent._elements[elName])) {
                            namespaceSVG = superEl.namespaceSVG;
                        }
                    }
                }
            }
            if (!isTransformer && !namespaceSVG) {
                tagName = (0,dist.kebabCase)(tagName, true);
            }
        }
        else {
            if (!elName) {
                this._throwError('Expected element', elNode);
            }
            let superEl;
            if (!this.parent || !(superEl = this.parent._elements[elName])) {
                throw this._throwError('Element.tagName is required', elNode);
            }
            if (!namespaceSVG) {
                namespaceSVG = superEl.namespaceSVG;
            }
            tagName = superEl.tagName;
        }
        let elComponentCtor = isTransformer || namespaceSVG ? null : componentConstructors.get(tagName);
        let attrs;
        let $specifiedParams;
        if (elComponentCtor) {
            $specifiedParams = new Set();
        }
        if (elNode[5]) {
            attrs = this._readAttributes(elNode[5], namespaceSVG, elName !== null && elName !== void 0 ? elName : superElName, elComponentCtor && elComponentCtor[KEY_PARAMS_CONFIG], $specifiedParams);
        }
        let events;
        let domEvents;
        if (elNames && componentCtor) {
            let componentEvents = componentCtor.events;
            let componentDOMEvents = componentCtor.domEvents;
            if (componentEvents || componentDOMEvents) {
                for (let name of elNames) {
                    if (!name) {
                        continue;
                    }
                    let elEvents = componentEvents && componentEvents[name];
                    for (let type in elEvents) {
                        if (elEvents[type] !== Object.prototype[type]) {
                            (events !== null && events !== void 0 ? events : (events = new Map())).set(type, name);
                        }
                    }
                    while (elEvents) {
                        for (let type of Object.getOwnPropertySymbols(elEvents)) {
                            if (!events || !events.has(type)) {
                                (events !== null && events !== void 0 ? events : (events = new Map())).set(type, name);
                            }
                        }
                        elEvents = elEvents.__proto__;
                        if (elEvents == Object.prototype) {
                            break;
                        }
                    }
                    let elDOMEvents = componentDOMEvents && componentDOMEvents[name];
                    for (let type in elDOMEvents) {
                        if (elDOMEvents[type] !== Object.prototype[type]) {
                            (domEvents !== null && domEvents !== void 0 ? domEvents : (domEvents = new Map())).set(type, name);
                        }
                    }
                }
            }
        }
        let content;
        if (elNode[6]) {
            content = this._readContent(null, elNode[6], namespaceSVG, elName !== null && elName !== void 0 ? elName : superElName, componentCtor);
        }
        let el = {
            nodeType: NodeType.ELEMENT,
            names: elNames !== null && elNames !== void 0 ? elNames : null,
            isTransformer,
            namespaceSVG,
            tagName,
            is: (_b = attrs === null || attrs === void 0 ? void 0 : attrs.attributeIsValue) !== null && _b !== void 0 ? _b : null,
            attributes: attrs !== null && attrs !== void 0 ? attrs : null,
            $specifiedParams: $specifiedParams !== null && $specifiedParams !== void 0 ? $specifiedParams : null,
            events: events !== null && events !== void 0 ? events : null,
            domEvents: domEvents !== null && domEvents !== void 0 ? domEvents : null,
            content: content !== null && content !== void 0 ? content : null,
            contentTemplateIndex: null
        };
        if (isTransformer) {
            let transformer = Template.elementTransformers[tagName];
            if (!transformer) {
                this._throwError(`Transformer "${tagName}" is not defined`, elNode);
            }
            content = transformer(el);
            if (content && content.length != 0) {
                el.content = content;
                for (let i = 0, l = content.length; i < l; i++) {
                    let node = content[i];
                    if (node.nodeType == NodeType.ELEMENT) {
                        if (!namespaceSVG &&
                            node.content &&
                            (node.tagName == 'template' ||
                                node.tagName == 'rn-slot')) {
                            let contentEl = {
                                nodeType: NodeType.ELEMENT,
                                names: node.names,
                                isTransformer: false,
                                namespaceSVG: node.namespaceSVG,
                                tagName: node.tagName,
                                is: node.is,
                                attributes: node.attributes,
                                $specifiedParams: node.$specifiedParams,
                                events: node.events,
                                domEvents: node.domEvents,
                                content: node.content,
                                contentTemplateIndex: ((_c = this._embeddedTemplates) !== null && _c !== void 0 ? _c : (this._embeddedTemplates = [])).push(new Template({
                                    nodeType: NodeType.BLOCK,
                                    content: node.content,
                                    elements: this._elements
                                }, {
                                    _embedded: true,
                                    parent: this
                                })) - 1
                            };
                            let elName = contentEl.names && contentEl.names[0];
                            if (elName) {
                                this._setElement(elName, override, contentEl);
                                content[i] = {
                                    nodeType: NodeType.ELEMENT_CALL,
                                    name: elName
                                };
                            }
                            else {
                                content[i] = contentEl;
                            }
                        }
                        else {
                            let elName = node.names && node.names[0];
                            if (elName) {
                                this._setElement(elName, override, node);
                                content[i] = {
                                    nodeType: NodeType.ELEMENT_CALL,
                                    name: elName
                                };
                            }
                        }
                    }
                }
            }
            else {
                el.content = null;
            }
        }
        else {
            let attrList = attrs && attrs.list;
            if (attrList) {
                for (let attr of attrList) {
                    if (attr.isTransformer) {
                        let transformer = Template.attributeTransformers[attr.name];
                        if (!transformer) {
                            this._throwError(`Transformer "${attr.name}" is not defined`, elNode);
                        }
                        el = transformer(el, attr);
                        for (let i = 0, l = ((_d = el.content) !== null && _d !== void 0 ? _d : []).length; i < l; i++) {
                            let node = el.content[i];
                            if (node.nodeType == NodeType.ELEMENT) {
                                if (!namespaceSVG &&
                                    node.content &&
                                    (node.tagName == 'template' ||
                                        node.tagName == 'rn-slot')) {
                                    let contentEl = {
                                        nodeType: NodeType.ELEMENT,
                                        names: node.names,
                                        isTransformer: false,
                                        namespaceSVG: node.namespaceSVG,
                                        tagName: node.tagName,
                                        is: node.is,
                                        attributes: node.attributes,
                                        $specifiedParams: node.$specifiedParams,
                                        events: node.events,
                                        domEvents: node.domEvents,
                                        content: node.content,
                                        contentTemplateIndex: ((_e = this._embeddedTemplates) !== null && _e !== void 0 ? _e : (this._embeddedTemplates = [])).push(new Template({
                                            nodeType: NodeType.BLOCK,
                                            content: node.content,
                                            elements: this._elements
                                        }, {
                                            _embedded: true,
                                            parent: this
                                        })) - 1
                                    };
                                    let elName = contentEl.names && contentEl.names[0];
                                    if (elName) {
                                        this._setElement(elName, override, contentEl);
                                        el.content[i] = {
                                            nodeType: NodeType.ELEMENT_CALL,
                                            name: elName
                                        };
                                    }
                                    else {
                                        el.content[i] = contentEl;
                                    }
                                }
                                else {
                                    let elName = node.names && node.names[0];
                                    if (elName) {
                                        this._setElement(elName, override, node);
                                        el.content[i] = {
                                            nodeType: NodeType.ELEMENT_CALL,
                                            name: elName
                                        };
                                    }
                                }
                            }
                        }
                    }
                }
                elName = el.names && el.names[0];
            }
            if (el.content && (el.tagName == 'template' || el.tagName == 'rn-slot')) {
                el.contentTemplateIndex =
                    ((_f = this._embeddedTemplates) !== null && _f !== void 0 ? _f : (this._embeddedTemplates = [])).push(new Template({
                        nodeType: NodeType.BLOCK,
                        content: el.content,
                        elements: this._elements
                    }, {
                        _embedded: true,
                        parent: this
                    })) - 1;
            }
        }
        if (elName) {
            this._setElement(elName, override, el);
            (targetContent !== null && targetContent !== void 0 ? targetContent : (targetContent = [])).push({
                nodeType: NodeType.ELEMENT_CALL,
                name: elName
            });
        }
        else {
            (targetContent !== null && targetContent !== void 0 ? targetContent : (targetContent = [])).push(el);
        }
        return targetContent;
    }
    _readAttributes(elAttrs, namespaceSVG, superElName, $paramsConfig, $specifiedParams) {
        let superCall = elAttrs[0] &&
            this._readSuperCall([rionite_template_parser_2_dist.NodeType.SUPER_CALL, elAttrs[0] === 1 ? '' : elAttrs[0]], superElName);
        let attrIsValue;
        let list;
        if (superCall) {
            let superElAttrs = superCall.element.attributes;
            if (superElAttrs) {
                let superElAttrList = superElAttrs.list;
                attrIsValue = superElAttrs.attributeIsValue;
                list = superElAttrList === null || superElAttrList === void 0 ? void 0 : superElAttrList.slice(0);
                if ($paramsConfig && superElAttrList) {
                    for (let attr of superElAttrList) {
                        if (!attr.isTransformer && $paramsConfig.has(attr.name)) {
                            $specifiedParams.add($paramsConfig.get(attr.name).name);
                        }
                    }
                }
            }
        }
        if (elAttrs[1]) {
            for (let elAttr of elAttrs[1]) {
                let isTransformer = !!elAttr[0];
                let backquote = elAttr[1].charAt(0) == '`';
                let rawName = backquote ? elAttr[1].slice(1) : elAttr[1];
                let name = !isTransformer && !namespaceSVG && !backquote
                    ? (0,rionite_snake_case_attribute_name_dist.snakeCaseAttributeName)(rawName, true)
                    : rawName;
                let value = elAttr[2];
                if (name == 'is' && !isTransformer) {
                    attrIsValue = value;
                }
                else {
                    let index;
                    if (list &&
                        (index = list.findIndex((attr) => attr.name == name && attr.isTransformer == isTransformer)) != -1) {
                        let rawNames = list[index].rawNames;
                        list[index] = {
                            isTransformer,
                            rawNames: rawName != name && (!rawNames || !rawNames.includes(rawName))
                                ? rawNames
                                    ? rawNames.concat(rawName)
                                    : [rawName]
                                : rawNames,
                            name,
                            value
                        };
                    }
                    else {
                        (list !== null && list !== void 0 ? list : (list = [])).push({
                            isTransformer,
                            rawNames: rawName == name ? null : [rawName],
                            name,
                            value
                        });
                    }
                }
                if ($paramsConfig && $paramsConfig.has(name)) {
                    $specifiedParams.add($paramsConfig.get(name).name);
                }
            }
        }
        return attrIsValue == null && !list
            ? null
            : {
                attributeIsValue: attrIsValue !== null && attrIsValue !== void 0 ? attrIsValue : null,
                list: list !== null && list !== void 0 ? list : null
            };
    }
    _readSuperCall(superCallNode, defaultElName) {
        var _a, _b;
        if (!this.parent) {
            this._throwError('SuperCall is impossible if there is no parent', superCallNode);
        }
        let elName = (_b = (_a = superCallNode[1]) !== null && _a !== void 0 ? _a : defaultElName) !== null && _b !== void 0 ? _b : this._throwError('SuperCall.elementName is required', superCallNode);
        let el = (elName.charAt(0) == '@' && this.parent._elements[elName.slice(1)]) ||
            this.parent._elements[elName];
        if (!el) {
            this._throwError(`Element "${elName}" is not defined`, superCallNode);
        }
        return {
            nodeType: NodeType.SUPER_CALL,
            elementName: elName,
            element: el
        };
    }
    _throwError(msg, node) {
        throw {
            type: TypeError,
            message: msg,
            node
        };
    }
    extend(template, options) {
        return new Template(template, {
            __proto__: options,
            parent: this
        });
    }
    setBlockName(blockName) {
        if (Array.isArray(blockName)) {
            (this._elementNamesTemplate = blockName.map((blockName) => blockName + ELEMENT_NAME_DELIMITER)).push('');
        }
        else {
            this._elementNamesTemplate[0] = blockName + ELEMENT_NAME_DELIMITER;
        }
        return this;
    }
    render(component, ownerComponent, context, result, parentComponent) {
        var _a;
        let block = this.parse(component);
        return renderContent(document.createDocumentFragment(), (_a = block.content) !== null && _a !== void 0 ? _a : block.elements['@root'].content, this, ownerComponent, context, result, parentComponent);
    }
}
Template.elementTransformers = {
    section: (el) => el.content
};
Template.attributeTransformers = {};
function renderContent(targetNode, content, template, ownerComponent, context, result, parentComponent) {
    var _a, _b, _c, _d, _e;
    if (content) {
        for (let node of content) {
            switch (node.nodeType) {
                case NodeType.ELEMENT_CALL: {
                    node = template._elements[node.name];
                    break;
                }
                case NodeType.SUPER_CALL: {
                    renderContent(targetNode, node.element.content, template, ownerComponent, context, result, parentComponent);
                    continue;
                }
            }
            switch (node.nodeType) {
                case NodeType.ELEMENT: {
                    if (node.isTransformer) {
                        renderContent(targetNode, node.content, template, ownerComponent, context, result, parentComponent);
                    }
                    else {
                        let tagName = node.tagName;
                        let el;
                        if (node.namespaceSVG) {
                            el = document.createElementNS(SVG_NAMESPACE_URI, tagName);
                        }
                        else if (node.is) {
                            el = window.innerHTML(document.createElement('div'), `<${tagName} is="${node.is}">`).firstChild;
                        }
                        else {
                            el = document.createElement(tagName);
                        }
                        let nodeComponent = result && el.rioniteComponent;
                        let className;
                        if (nodeComponent) {
                            className = nodeComponent.constructor._blockNamesString;
                        }
                        if (node.names) {
                            className =
                                (className !== null && className !== void 0 ? className : '') +
                                    renderElementClasses(template._elementNamesTemplate, node.names);
                        }
                        let attrList = node.attributes && node.attributes.list;
                        if (attrList) {
                            let $paramsConfig;
                            if (nodeComponent) {
                                $paramsConfig = nodeComponent.constructor[KEY_PARAMS_CONFIG];
                            }
                            for (let attr of attrList) {
                                if (attr.isTransformer) {
                                    continue;
                                }
                                let attrName = attr.name;
                                let attrValue = attr.value;
                                if (attrName == 'class') {
                                    attrValue = (className !== null && className !== void 0 ? className : '') + attrValue;
                                    className = null;
                                }
                                if (result) {
                                    if (!attrName.lastIndexOf('oncomponent-', 0) ||
                                        !attrName.lastIndexOf('on-', 0)) {
                                        el[KEY_CONTEXT] = context;
                                    }
                                    if (attrValue) {
                                        let attrValueAST = parseTemplateNodeValue(attrValue);
                                        if (attrValueAST) {
                                            let bindingPrefix = attrValueAST.length == 1
                                                ? attrValueAST[0]
                                                    .prefix
                                                : null;
                                            if (bindingPrefix === '=' ||
                                                (bindingPrefix === null &&
                                                    ((_a = ($paramsConfig && $paramsConfig.get(attrName))) === null || _a === void 0 ? void 0 : _a.readonly))) {
                                                attrValue = compileTemplateNodeValue(attrValueAST, attrValue, true).call(context, {
                                                    meta: {
                                                        element: el,
                                                        attributeName: attrName
                                                    }
                                                });
                                            }
                                            else {
                                                if (bindingPrefix !== '->') {
                                                    let cell = new external_cellx_.Cell(compileTemplateNodeValue(attrValueAST, attrValue, attrValueAST.length == 1), {
                                                        context,
                                                        meta: {
                                                            element: el,
                                                            attributeName: attrName
                                                        },
                                                        onChange: onAttributeBindingCellChange
                                                    });
                                                    attrValue = cell.get();
                                                    ((_b = result[1]) !== null && _b !== void 0 ? _b : (result[1] = [])).push(cell);
                                                }
                                                let $paramConfig = $paramsConfig && $paramsConfig.get(attrName);
                                                if ($paramConfig &&
                                                    (bindingPrefix === '->' ||
                                                        bindingPrefix === '<->')) {
                                                    if (bindingPrefix == '->' &&
                                                        attrName.charAt(0) != '_') {
                                                        attrValue = null;
                                                    }
                                                    let keypath = attrValueAST[0].keypath.split('.');
                                                    ((_c = result[2]) !== null && _c !== void 0 ? _c : (result[2] = [])).push(nodeComponent, $paramConfig.property, keypath.length == 1
                                                        ? ((propName) => function (evt) {
                                                            this.ownerComponent[propName] = evt.data['value'];
                                                        })(keypath[0])
                                                        : ((propName, keypath) => {
                                                            let getPropertyHolder = compileKeypath(keypath, keypath.join('.'));
                                                            return function (evt) {
                                                                let propHolder = getPropertyHolder.call(this.ownerComponent);
                                                                if (propHolder) {
                                                                    propHolder[propName] =
                                                                        evt.data['value'];
                                                                }
                                                            };
                                                        })(keypath[keypath.length - 1], keypath.slice(0, -1)));
                                                }
                                            }
                                        }
                                    }
                                }
                                if (attrValue !== false && attrValue != null) {
                                    setAttribute(el, attrName, attrValue);
                                }
                            }
                        }
                        if (className) {
                            if (node.namespaceSVG) {
                                el.setAttribute('class', className);
                            }
                            else {
                                el.className = className;
                            }
                        }
                        if (node.events) {
                            el[KEY_EVENTS] = node.events;
                            el[KEY_CONTEXT] = context;
                        }
                        if (node.domEvents) {
                            el[KEY_DOM_EVENTS] = node.domEvents;
                            el[KEY_CONTEXT] = context;
                        }
                        if (nodeComponent) {
                            nodeComponent._ownerComponent = ownerComponent;
                            nodeComponent.$context = context;
                            nodeComponent.$specifiedParams = node.$specifiedParams;
                            if (parentComponent) {
                                (parentComponent[KEY_CHILD_COMPONENTS] ||
                                    (parentComponent[KEY_CHILD_COMPONENTS] = [])).push(nodeComponent);
                            }
                            else {
                                ((_d = result[0]) !== null && _d !== void 0 ? _d : (result[0] = [])).push(nodeComponent);
                            }
                        }
                        if (node.contentTemplateIndex !== null) {
                            el[KEY_CONTENT_TEMPLATE] =
                                template._embeddedTemplates[node.contentTemplateIndex];
                        }
                        else if (result &&
                            (!nodeComponent || !nodeComponent.constructor.bindsInputContent)) {
                            renderContent(el, node.content, template, ownerComponent, context, result, nodeComponent);
                        }
                        else {
                            renderContent(el, node.content, template);
                        }
                        targetNode.appendChild(el);
                    }
                    break;
                }
                case NodeType.TEXT: {
                    let nodeValue = node.value;
                    if (result) {
                        let nodeValueAST = parseTemplateNodeValue(nodeValue);
                        if (nodeValueAST) {
                            if (nodeValueAST.length == 1 &&
                                nodeValueAST[0].prefix === '=') {
                                targetNode.appendChild(document.createTextNode(compileTemplateNodeValue(nodeValueAST, nodeValue, false).call(context)));
                            }
                            else {
                                let meta = { textNode: null };
                                let cell = new external_cellx_.Cell(compileTemplateNodeValue(nodeValueAST, nodeValue, false), {
                                    context,
                                    meta,
                                    onChange: onTextNodeBindingCellChange
                                });
                                meta.textNode = targetNode.appendChild(document.createTextNode(cell.get()));
                                ((_e = result[1]) !== null && _e !== void 0 ? _e : (result[1] = [])).push(cell);
                            }
                            break;
                        }
                    }
                    targetNode.appendChild(document.createTextNode(nodeValue));
                    break;
                }
            }
        }
    }
    return targetNode;
}
function renderElementClasses(elementNamesTemplate, elNames) {
    let elClasses = '';
    for (let i = elNames[0] ? 0 : 1, l = elNames.length; i < l; i++) {
        elClasses += elementNamesTemplate.join(elNames[i] + ' ');
    }
    return elClasses;
}

;// CONCATENATED MODULE: ./src/lib/templateTransformers.ts

for (let [name, is] of [
    ['cond', 'rn-condition'],
    ['repeat', 'rn-repeat']
]) {
    Template.elementTransformers[name] = (el) => [
        {
            nodeType: NodeType.ELEMENT,
            names: el.names,
            isTransformer: false,
            namespaceSVG: false,
            tagName: 'template',
            is,
            attributes: el.attributes,
            $specifiedParams: null,
            events: null,
            domEvents: null,
            content: el.content,
            contentTemplateIndex: null
        }
    ];
}
for (let name of ['if', 'unless']) {
    Template.elementTransformers[name] = (el) => {
        var _a, _b;
        return [
            {
                nodeType: NodeType.ELEMENT,
                names: el.names,
                isTransformer: false,
                namespaceSVG: false,
                tagName: 'template',
                is: 'rn-condition',
                attributes: {
                    attributeIsValue: 'rn-condition',
                    list: [
                        {
                            isTransformer: false,
                            rawNames: null,
                            name,
                            value: (_b = (_a = el.attributes.list[0].rawNames) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : el.attributes.list[0].name
                        }
                    ]
                },
                $specifiedParams: null,
                events: null,
                domEvents: null,
                content: el.content,
                contentTemplateIndex: null
            }
        ];
    };
}
for (let [name, is] of [
    ['if', 'rn-condition'],
    ['unless', 'rn-condition'],
    ['for', 'rn-repeat']
]) {
    Template.attributeTransformers[name] = (el, attr) => ({
        nodeType: NodeType.ELEMENT,
        names: null,
        isTransformer: false,
        namespaceSVG: false,
        tagName: 'template',
        is,
        attributes: {
            attributeIsValue: is,
            list: [
                {
                    isTransformer: false,
                    rawNames: null,
                    name,
                    value: attr.value
                }
            ]
        },
        $specifiedParams: null,
        events: null,
        domEvents: null,
        content: [el],
        contentTemplateIndex: null
    });
}

// EXTERNAL MODULE: ./node_modules/@riim/pascalize/dist/index.js
var pascalize_dist = __webpack_require__(10);
;// CONCATENATED MODULE: ./src/ComponentParams.ts



const KEY_COMPONENT_PARAMS_INITED = Symbol('componentParamsInited');
const ComponentParams = {
    init(component) {
        if (component[KEY_COMPONENT_PARAMS_INITED]) {
            return;
        }
        let $specifiedParams;
        if (component.$specifiedParams) {
            $specifiedParams = null;
        }
        else {
            $specifiedParams = component.$specifiedParams = new Set();
        }
        let paramsConfig = component.constructor.params;
        if (paramsConfig) {
            let $paramsConfig = component.constructor[KEY_PARAMS_CONFIG];
            for (let name in paramsConfig) {
                if (paramsConfig[name] !== null && paramsConfig[name] !== Object.prototype[name]) {
                    let $paramConfig = $paramsConfig.get(name);
                    let valueСonverters = $paramConfig.valueСonverters;
                    let defaultValue = $paramConfig.default;
                    let el = component.element;
                    let snakeCaseName = (0,rionite_snake_case_attribute_name_dist.snakeCaseAttributeName)(name, true);
                    let rawValue = el.getAttribute(snakeCaseName);
                    if (rawValue === null) {
                        if ($paramConfig.required) {
                            throw TypeError(`Parameter "${name}" is required`);
                        }
                        if (defaultValue != null &&
                            defaultValue !== false &&
                            valueСonverters.toString) {
                            el.setAttribute(snakeCaseName, valueСonverters.toString(defaultValue));
                        }
                    }
                    else {
                        if ($specifiedParams) {
                            $specifiedParams.add(name);
                        }
                    }
                    let valueCell = (this[external_cellx_.KEY_VALUE_CELLS] || (this[external_cellx_.KEY_VALUE_CELLS] = new Map())).get($paramConfig.property);
                    let value = valueСonverters.toData(rawValue, defaultValue, el);
                    if (valueCell) {
                        valueCell.set(value);
                    }
                    else {
                        component[KEY_PARAM_VALUES].set(name, value);
                    }
                }
            }
        }
        component[KEY_COMPONENT_PARAMS_INITED] = true;
    }
};

;// CONCATENATED MODULE: ./src/elementConstructors.ts
const elementConstructors = new Map([
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
    ['template', window.HTMLTemplateElement],
    ['textarea', window.HTMLTextAreaElement],
    ['tfoot', window.HTMLTableSectionElement],
    ['th', window.HTMLTableCellElement],
    ['thead', window.HTMLTableSectionElement],
    ['tr', window.HTMLTableRowElement],
    ['ul', window.HTMLUListElement],
    ['vhgroupv', window.HTMLUnknownElement],
    ['vkeygen', window.HTMLUnknownElement]
]);

// EXTERNAL MODULE: ./node_modules/@riim/defer/dist/index.js
var defer_dist = __webpack_require__(12);
// EXTERNAL MODULE: ./node_modules/@riim/move-content/dist/index.js
var move_content_dist = __webpack_require__(15);
;// CONCATENATED MODULE: ./src/componentBinding.ts

const KEY_FROZEN_STATE = Symbol('frozenState');
function freezeBinding(binding) {
    let changeEvent = binding._events.get(external_cellx_.Cell.EVENT_CHANGE);
    binding._events.delete(external_cellx_.Cell.EVENT_CHANGE);
    binding[KEY_FROZEN_STATE] = {
        changeEventListener: changeEvent.listener,
        changeEventContext: changeEvent.context,
        value: binding._value
    };
}
function unfreezeBinding(binding) {
    let frozenState = binding[KEY_FROZEN_STATE];
    binding[KEY_FROZEN_STATE] = null;
    binding.onChange(frozenState.changeEventListener, frozenState.changeEventContext);
    if (frozenState.value !== binding._value) {
        binding.emit(external_cellx_.Cell.EVENT_CHANGE, {
            prevValue: frozenState.value,
            value: binding._value
        });
    }
}
function freezeBindings(bindings) {
    external_cellx_.Cell.release();
    for (let binding of bindings) {
        freezeBinding(binding);
    }
}
function unfreezeBindings(bindings) {
    for (let binding of bindings) {
        unfreezeBinding(binding);
    }
    external_cellx_.Cell.release();
}

;// CONCATENATED MODULE: ./src/connectChildComponentElements.ts


function connectChildComponentElements(childComponents) {
    for (let component of childComponents) {
        component._parentComponent = undefined;
        ComponentParams.init(component);
        callLifecycle([
            ...component.constructor._lifecycleHooks.elementConnected,
            ...component._lifecycleHooks.elementConnected,
            component.elementConnected
        ], component);
        component._connect();
    }
}

;// CONCATENATED MODULE: ./src/lib/findChildComponents.ts
function findChildComponents(node, childComponents) {
    for (let child = node.firstChild; child; child = child.nextSibling) {
        if (child.nodeType == Node.ELEMENT_NODE) {
            let childComponent = child.$component;
            if (childComponent) {
                (childComponents !== null && childComponents !== void 0 ? childComponents : (childComponents = [])).push(childComponent);
            }
            if (child.firstChild && !(childComponent === null || childComponent === void 0 ? void 0 : childComponent.constructor.bindsInputContent)) {
                childComponents = findChildComponents(child, childComponents);
            }
        }
    }
    return childComponents !== null && childComponents !== void 0 ? childComponents : null;
}

;// CONCATENATED MODULE: ./src/BaseComponent.ts
















function callLifecycle(lifecycle, context) {
    let promises;
    for (let lifecycleFn of lifecycle) {
        let result;
        try {
            result =
                lifecycleFn.length == 0
                    ? lifecycleFn.call(context)
                    : lifecycleFn.call(context, context);
        }
        catch (err) {
            config.logError(err);
            return null;
        }
        if (result instanceof Promise) {
            (promises !== null && promises !== void 0 ? promises : (promises = [])).push(result.catch((err) => {
                if (!(err instanceof InterruptError)) {
                    config.logError(err);
                }
            }));
        }
    }
    return promises !== null && promises !== void 0 ? promises : null;
}
let currentComponent;
function onElementConnected(lifecycleHook) {
    currentComponent._lifecycleHooks.elementConnected.push(lifecycleHook);
}
function onElementDisconnected(lifecycleHook) {
    currentComponent._lifecycleHooks.elementDisconnected.push(lifecycleHook);
}
function onReady(lifecycleHook) {
    currentComponent._lifecycleHooks.ready.push(lifecycleHook);
}
function onConnected(lifecycleHook) {
    currentComponent._lifecycleHooks.connected.push(lifecycleHook);
}
function onDisconnected(lifecycleHook) {
    currentComponent._lifecycleHooks.disconnected.push(lifecycleHook);
}
function onElementMoved(lifecycleHook) {
    currentComponent._lifecycleHooks.elementMoved.push(lifecycleHook);
}
class BaseComponent extends external_cellx_.EventEmitter {
    constructor(el) {
        super();
        this._disposables = new Set();
        this._parentComponent = null;
        this.$inputContent = null;
        this.initializationPromise = null;
        this.readyPromise = null;
        this._initialized = false;
        this._isReady = false;
        this._isConnected = false;
        this._lifecycleHooks = {
            elementConnected: [],
            elementDisconnected: [],
            ready: [],
            connected: [],
            disconnected: [],
            elementMoved: []
        };
        currentComponent = this;
        this[KEY_COMPONENT_SELF] = this;
        let ctor = this.constructor;
        if (!elementConstructors.has(ctor.elementIs)) {
            throw TypeError('Component must be registered');
        }
        if (!el) {
            el = document.createElement((0,dist.kebabCase)(ctor.elementIs, true));
        }
        this.element = el;
        el.$component = this;
        this[KEY_PARAM_VALUES] = new Map();
    }
    static get bindsInputContent() {
        return this.template !== null;
    }
    get ownerComponent() {
        if (this._ownerComponent) {
            return this._ownerComponent;
        }
        let component = this.parentComponent;
        if (!component) {
            return (this._ownerComponent = this);
        }
        for (let parentComponent; (parentComponent = component.parentComponent);) {
            component = parentComponent;
        }
        return (this._ownerComponent = component);
    }
    set ownerComponent(ownerComponent) {
        this._ownerComponent = ownerComponent;
    }
    get parentComponent() {
        if (this._parentComponent !== undefined) {
            return this._parentComponent;
        }
        for (let node; (node = (node || this.element).parentNode);) {
            if (node.$component !== undefined) {
                return (this._parentComponent = node.$component || node.rioniteComponent);
            }
        }
        return (this._parentComponent = null);
    }
    get initialized() {
        return this._initialized;
    }
    get isReady() {
        return this._isReady;
    }
    get isConnected() {
        return this._isConnected;
    }
    onChange(listener, context) {
        return this.on(this.constructor.EVENT_CHANGE, listener, context);
    }
    offChange(listener, context) {
        return this.off(this.constructor.EVENT_CHANGE, listener, context);
    }
    handleEvent(evt) {
        super.handleEvent(evt);
        if (evt.bubbles !== false && !evt.propagationStopped) {
            let parentComponent = this.parentComponent;
            if (parentComponent) {
                parentComponent.handleEvent(evt);
                return;
            }
        }
        handleEvent(evt);
    }
    listenTo(target, evtType, listener, context, useCapture) {
        if (typeof target == 'string') {
            target = this.$(target);
        }
        let listenings;
        if (typeof evtType == 'object') {
            listenings = [];
            if (Array.isArray(evtType)) {
                for (let i = 0, l = evtType.length; i < l; i++) {
                    listenings.push(this.listenTo(target, evtType[i], listener, context, useCapture));
                }
            }
            else {
                for (let evtType_ in evtType) {
                    if (Object.prototype.hasOwnProperty.call(evtType, evtType_)) {
                        listenings.push(this.listenTo(target, evtType_, evtType[evtType_], listener, context));
                    }
                }
                for (let evtType_ of Object.getOwnPropertySymbols(evtType)) {
                    listenings.push(this.listenTo(target, evtType_, evtType[evtType_], listener, context));
                }
            }
        }
        else {
            if (Array.isArray(target) ||
                target instanceof NodeList ||
                target instanceof HTMLCollection) {
                listenings = [];
                for (let i = 0, l = target.length; i < l; i++) {
                    listenings.push(this.listenTo(target[i], evtType, listener, context, useCapture));
                }
            }
            else {
                if (Array.isArray(listener)) {
                    listenings = [];
                    for (let i = 0, l = listener.length; i < l; i++) {
                        listenings.push(this.listenTo(target, evtType, listener[i], context, useCapture));
                    }
                }
                else {
                    return this._listenTo(target, evtType, listener, context !== undefined ? context : this, useCapture !== null && useCapture !== void 0 ? useCapture : false);
                }
            }
        }
        let listening;
        let stop = () => {
            for (let i = listenings.length; i != 0;) {
                listenings[--i].stop();
            }
            this._disposables.delete(listening);
        };
        listening = {
            stop,
            dispose: stop
        };
        this._disposables.add(listening);
        return listening;
    }
    _listenTo(target, evtType, listener, context, useCapture) {
        if (!target) {
            throw TypeError('"target" is required');
        }
        if (target instanceof external_cellx_.EventEmitter) {
            target.on(evtType, listener, context);
        }
        else {
            if (target !== context) {
                listener = listener.bind(context);
            }
            target.addEventListener(evtType, listener, useCapture);
        }
        let listening;
        let stop = () => {
            if (this._disposables.has(listening)) {
                if (target instanceof external_cellx_.EventEmitter) {
                    target.off(evtType, listener, context);
                }
                else {
                    target.removeEventListener(evtType, listener, useCapture);
                }
                this._disposables.delete(listening);
            }
        };
        listening = {
            stop,
            dispose: stop
        };
        this._disposables.add(listening);
        return listening;
    }
    setTimeout(cb, delay) {
        let timeout;
        let timeoutId = setTimeout(() => {
            this._disposables.delete(timeout);
            cb.call(this);
        }, delay);
        let clear = () => {
            if (this._disposables.has(timeout)) {
                clearTimeout(timeoutId);
                this._disposables.delete(timeout);
            }
        };
        timeout = {
            clear,
            dispose: clear
        };
        this._disposables.add(timeout);
        return timeout;
    }
    setInterval(cb, delay) {
        let interval;
        let clear;
        let intervalId = setInterval(() => {
            if (cb.call(this, clear) === false) {
                clear();
            }
        }, delay);
        clear = () => {
            if (this._disposables.has(interval)) {
                clearInterval(intervalId);
                this._disposables.delete(interval);
            }
        };
        interval = {
            clear,
            dispose: clear
        };
        this._disposables.add(interval);
        return interval;
    }
    registerCallback(cb) {
        let registeredCallback;
        let cancel = () => {
            this._disposables.delete(registeredCallback);
        };
        registeredCallback = ((...args) => {
            if (this._disposables.has(registeredCallback)) {
                this._disposables.delete(registeredCallback);
                return cb.apply(this, args);
            }
        });
        registeredCallback.cancel = cancel;
        registeredCallback.dispose = cancel;
        this._disposables.add(registeredCallback);
        return registeredCallback;
    }
    $interruptIfNotConnected(value) {
        if (!this._isConnected) {
            throw InterruptError();
        }
        return value;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    _beforeInitializationWait() { }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    _afterInitializationWait() { }
    connect(ownerComponent) {
        if (ownerComponent) {
            this._ownerComponent = ownerComponent;
        }
        if (this._isConnected) {
            return this.initializationPromise;
        }
        this._parentComponent = undefined;
        ComponentParams.init(this);
        callLifecycle([
            ...this.constructor._lifecycleHooks.elementConnected,
            ...this._lifecycleHooks.elementConnected,
            this.elementConnected
        ], this);
        return this._connect();
    }
    _connect() {
        var _a;
        this._isConnected = true;
        if (this._initialized) {
            if (!this._isReady) {
                this._afterInitializationWait();
            }
        }
        else {
            currentComponent = this;
            let initializationPromise;
            try {
                initializationPromise = this.initialize();
            }
            catch (err) {
                config.logError(err);
                return null;
            }
            if (initializationPromise) {
                this._beforeInitializationWait();
                return (this.initializationPromise = initializationPromise.then(() => {
                    this._initialized = true;
                    if (this._isConnected) {
                        this._connect();
                    }
                }, (err) => {
                    if (!(err instanceof InterruptError)) {
                        config.logError(err);
                    }
                }));
            }
            this._initialized = true;
        }
        let ctor = this.constructor;
        let readyPromises;
        if (this._isReady) {
            this._unfreezeBindings();
            let childComponents = findChildComponents(this.element);
            if (childComponents) {
                connectChildComponentElements(childComponents);
            }
        }
        else {
            let el = this.element;
            if (el.className.lastIndexOf(ctor._blockNamesString, 0)) {
                el.className = ctor._blockNamesString + el.className;
            }
            if (ctor.template === null) {
                if (this.ownerComponent == this) {
                    let contentBindingResult = [null, null, null];
                    bindContent(el, this, this, contentBindingResult);
                    let childComponents = contentBindingResult[0];
                    let backBindings = contentBindingResult[2];
                    this._bindings = contentBindingResult[1];
                    if (childComponents) {
                        connectChildComponentElements(childComponents);
                    }
                    if (backBindings) {
                        for (let i = backBindings.length; i != 0; i -= 3) {
                            backBindings[i - 3].on('change:' + backBindings[i - 2], backBindings[i - 1]);
                        }
                    }
                }
                else {
                    this._bindings = null;
                    if (this[KEY_CHILD_COMPONENTS]) {
                        connectChildComponentElements(this[KEY_CHILD_COMPONENTS]);
                    }
                }
            }
            else {
                if (el.firstChild) {
                    suppressConnectionStatusCallbacks();
                    (0,move_content_dist.moveContent)((_a = this.$inputContent) !== null && _a !== void 0 ? _a : (this.$inputContent = document.createDocumentFragment()), el);
                    resumeConnectionStatusCallbacks();
                }
                let contentBindingResult = [null, null, null];
                let content = ctor.template.render(this, this, this, contentBindingResult);
                let childComponents = contentBindingResult[0];
                let backBindings = contentBindingResult[2];
                this._bindings = contentBindingResult[1];
                if (childComponents) {
                    for (let i = childComponents.length; i != 0;) {
                        let childComponent = childComponents[--i];
                        if (childComponent.element.firstChild &&
                            childComponent.constructor.bindsInputContent) {
                            childComponent.$inputContent = (0,move_content_dist.moveContent)(document.createDocumentFragment(), childComponent.element);
                        }
                    }
                }
                suppressConnectionStatusCallbacks();
                this.element.appendChild(content);
                resumeConnectionStatusCallbacks();
                if (childComponents) {
                    connectChildComponentElements(childComponents);
                }
                if (backBindings) {
                    for (let i = backBindings.length; i != 0; i -= 3) {
                        backBindings[i - 3].on('change:' + backBindings[i - 2], backBindings[i - 1]);
                    }
                }
            }
            readyPromises = callLifecycle([
                ...this.constructor._lifecycleHooks.ready,
                ...this._lifecycleHooks.ready,
                this.ready
            ], this);
            if (readyPromises) {
                this.readyPromise = Promise.all(readyPromises).finally(() => {
                    this.readyPromise = null;
                });
            }
            this._isReady = true;
        }
        // readyPromises, this.readyPromise - 2
        // !readyPromises, this.readyPromise - 0
        // !readyPromises, !this.readyPromise - 1
        if (readyPromises || !this.readyPromise) {
            if (readyPromises) {
                this.readyPromise.finally(() => {
                    if (this._isConnected) {
                        callLifecycle([
                            ...this.constructor._lifecycleHooks.connected,
                            ...this._lifecycleHooks.connected,
                            this.connected
                        ], this);
                    }
                });
            }
            else {
                callLifecycle([
                    ...this.constructor._lifecycleHooks.connected,
                    ...this._lifecycleHooks.connected,
                    this.connected
                ], this);
            }
        }
        return this.initializationPromise;
    }
    _disconnect() {
        this._isConnected = false;
        callLifecycle([
            ...this.constructor._lifecycleHooks.disconnected,
            ...this._lifecycleHooks.disconnected,
            this.disconnected
        ], this);
        this.dispose();
    }
    dispose() {
        this._freezeBindings();
        for (let disposable of this._disposables) {
            disposable.dispose();
        }
        return this;
    }
    _freezeBindings() {
        if (this._bindings) {
            freezeBindings(this._bindings);
        }
    }
    _unfreezeBindings() {
        if (this._bindings) {
            unfreezeBindings(this._bindings);
        }
    }
    _destroyBindings() {
        let bindings = this._bindings;
        if (bindings) {
            for (let i = bindings.length; i != 0;) {
                bindings[--i].off();
            }
            this._bindings = null;
        }
    }
    // Callbacks
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    elementConnected() { }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    elementDisconnected() { }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    initialize() { }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ready() { }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    connected() { }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    disconnected() { }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    elementMoved() { }
    // Utils
    $(name, container) {
        var _a;
        let elList = this._getElementList(name, container);
        return (elList && elList.length != 0
            ? (_a = elList[0].$component) !== null && _a !== void 0 ? _a : elList[0]
            : null);
    }
    $$(name, container) {
        let elList = this._getElementList(name, container);
        return elList
            ? Array.prototype.map.call(elList, (el) => { var _a; return (_a = el.$component) !== null && _a !== void 0 ? _a : el; })
            : [];
    }
    _getElementList(name, container) {
        if (container) {
            if (typeof container == 'string') {
                container = this.$(container);
            }
            if (container instanceof BaseComponent) {
                container = container.element;
            }
        }
        else {
            container = this.element;
        }
        let elementBlockNames = this.constructor._elementBlockNames;
        return container.getElementsByClassName(elementBlockNames[elementBlockNames.length - 1] + '__' + name);
    }
}
BaseComponent.EVENT_CHANGE = 'change';
BaseComponent.elementExtends = null;
BaseComponent.params = null;
BaseComponent.i18n = null;
BaseComponent.template = null;
BaseComponent._lifecycleHooks = {
    elementConnected: [],
    elementDisconnected: [],
    ready: [],
    connected: [],
    disconnected: [],
    elementMoved: []
};
BaseComponent.events = null;
BaseComponent.domEvents = null;
const handledEventTypes = [
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
document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
    document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
    for (let type of handledEventTypes) {
        document.body.addEventListener(type, handleDOMEvent);
    }
});

;// CONCATENATED MODULE: ./src/lib/observedAttributesFeature.ts
let observedAttributesFeature_ = false;
window.customElements.define('test-observed-attributes-feature', class extends HTMLElement {
    static get observedAttributes() {
        return ['test'];
    }
    attributeChangedCallback() {
        observedAttributesFeature_ = true;
    }
});
document.createElement('test-observed-attributes-feature').setAttribute('test', '');
const observedAttributesFeature = observedAttributesFeature_;

;// CONCATENATED MODULE: ./src/ElementProtoMixin.ts






const KEY_RIONITE_COMPONENT_CONSTRUCTOR = Symbol('rioniteComponentConstructor');
const KEY_ELEMENT_CONNECTED = Symbol('elementConnected');
let connectionStatusCallbacksSuppressed = false;
function suppressConnectionStatusCallbacks() {
    connectionStatusCallbacksSuppressed = true;
}
function resumeConnectionStatusCallbacks() {
    connectionStatusCallbacksSuppressed = false;
}
const ElementProtoMixin = {
    $component: null,
    get rioniteComponent() {
        var _a;
        return ((_a = this.$component) !== null && _a !== void 0 ? _a : new this.constructor[KEY_RIONITE_COMPONENT_CONSTRUCTOR](this));
    },
    [KEY_ELEMENT_CONNECTED]: false,
    connectedCallback() {
        this[KEY_ELEMENT_CONNECTED] = true;
        if (connectionStatusCallbacksSuppressed) {
            return;
        }
        let component = this.$component;
        if (component) {
            if (component._isConnected) {
                if (component._parentComponent === null) {
                    component._parentComponent = undefined;
                    callLifecycle([
                        ...component.constructor._lifecycleHooks.elementConnected,
                        ...component._lifecycleHooks.elementConnected,
                        component.elementConnected,
                        ...component.constructor._lifecycleHooks.elementMoved,
                        ...component._lifecycleHooks.elementMoved,
                        component.elementMoved
                    ], component);
                }
                else {
                    callLifecycle([
                        ...component.constructor._lifecycleHooks.elementConnected,
                        ...component._lifecycleHooks.elementConnected,
                        component.elementConnected
                    ], component);
                }
            }
            else {
                component._parentComponent = undefined;
                ComponentParams.init(component);
                callLifecycle([
                    ...component.constructor._lifecycleHooks.elementConnected,
                    ...component._lifecycleHooks.elementConnected,
                    component.elementConnected
                ], component);
                component._connect();
            }
            return;
        }
        component = this.rioniteComponent;
        component._parentComponent = undefined;
        if (component.parentComponent && component._parentComponent._isReady) {
            ComponentParams.init(component);
            callLifecycle([
                ...component.constructor._lifecycleHooks.elementConnected,
                ...component._lifecycleHooks.elementConnected,
                component.elementConnected
            ], component);
            component._connect();
            return;
        }
        (0,defer_dist.defer)(() => {
            if (!this[KEY_ELEMENT_CONNECTED]) {
                return;
            }
            let component = this.rioniteComponent;
            component._parentComponent = undefined;
            if (!component._isConnected && !component.parentComponent) {
                ComponentParams.init(component);
                callLifecycle([
                    ...component.constructor._lifecycleHooks.elementConnected,
                    ...component._lifecycleHooks.elementConnected,
                    component.elementConnected
                ], component);
                component._connect();
            }
        });
    },
    disconnectedCallback() {
        this[KEY_ELEMENT_CONNECTED] = false;
        if (connectionStatusCallbacksSuppressed) {
            return;
        }
        let component = this.$component;
        if (component && component._isConnected) {
            component._parentComponent = null;
            callLifecycle([
                ...component.constructor._lifecycleHooks.elementDisconnected,
                ...component._lifecycleHooks.elementDisconnected,
                component.elementDisconnected
            ], component);
            (0,defer_dist.defer)(() => {
                if (component._parentComponent === null && component._isConnected) {
                    component._disconnect();
                }
            });
        }
    },
    attributeChangedCallback(name, _prevRawValue, rawValue) {
        var _a;
        let component = this.$component;
        if (component && component._isReady) {
            let $paramConfig = component.constructor[KEY_PARAMS_CONFIG].get(name);
            if ($paramConfig.readonly) {
                if (observedAttributesFeature) {
                    throw TypeError(`Cannot write to readonly parameter "${$paramConfig.name}"`);
                }
            }
            else {
                let valueCell = ((_a = component[external_cellx_.KEY_VALUE_CELLS]) !== null && _a !== void 0 ? _a : (component[external_cellx_.KEY_VALUE_CELLS] = new Map())).get($paramConfig.property);
                let value = $paramConfig.valueСonverters.toData(rawValue, $paramConfig.default, this);
                if (valueCell) {
                    valueCell.set(value);
                }
                else {
                    component[KEY_PARAM_VALUES].set($paramConfig.name, value);
                }
            }
        }
    }
};

;// CONCATENATED MODULE: ./src/registerComponent.ts











const componentParamTypeMap = new Map([
    ['boolean', Boolean],
    ['number', Number],
    ['string', String]
]);
const componentParamTypeMap2 = new Map([
    [Boolean, 'boolean'],
    [Number, 'number'],
    [String, 'string']
]);
function inheritProperty(target, source, name, depth) {
    let obj = target[name];
    let parentObj = source[name];
    if (obj && parentObj && obj != parentObj) {
        let inheritedObj = (target[name] = { __proto__: parentObj });
        for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                inheritedObj[key] = obj[key];
                if (depth) {
                    inheritProperty(inheritedObj, parentObj, key, depth - 1);
                }
            }
        }
    }
}
function registerComponent(componentCtor) {
    var _a, _b, _c, _d, _e, _f;
    var _g, _h;
    let elIs = Object.prototype.hasOwnProperty.call(componentCtor, 'elementIs')
        ? componentCtor.elementIs
        : (componentCtor.elementIs = componentCtor.name);
    if (!elIs) {
        throw TypeError('Static property "elementIs" is required');
    }
    let kebabCaseElIs = (0,dist.kebabCase)(elIs, true);
    if (componentConstructors.has(kebabCaseElIs)) {
        throw TypeError(`Component "${kebabCaseElIs}" already registered`);
    }
    let componentProto = componentCtor.prototype;
    let parentComponentCtor = Object.getPrototypeOf(componentProto).constructor;
    inheritProperty(componentCtor, parentComponentCtor, 'params', 0);
    componentCtor[KEY_PARAMS_CONFIG] = null;
    let paramsConfig = componentCtor.params;
    for (let name in paramsConfig) {
        let paramConfig = paramsConfig[name];
        if (paramConfig === null || paramConfig === Object.prototype[name]) {
            continue;
        }
        let snakeCaseName = (0,rionite_snake_case_attribute_name_dist.snakeCaseAttributeName)(name, true);
        let propName;
        let type;
        let valueСonverters;
        let defaultValue;
        let required;
        let readonly;
        if (typeof paramConfig == 'object') {
            propName = (_a = paramConfig.property) !== null && _a !== void 0 ? _a : name;
            type = paramConfig.type;
            defaultValue = paramConfig.default;
            required = (_b = paramConfig.required) !== null && _b !== void 0 ? _b : false;
            readonly = (_c = paramConfig.readonly) !== null && _c !== void 0 ? _c : false;
        }
        else {
            propName = name;
            type = paramConfig;
            required = readonly = false;
        }
        if (!type) {
            type =
                defaultValue === undefined
                    ? Object
                    : (_d = componentParamTypeMap.get(typeof defaultValue)) !== null && _d !== void 0 ? _d : Object;
        }
        valueСonverters = componentParamValueСonverters.get(type);
        if (!valueСonverters) {
            throw TypeError('Unsupported parameter type');
        }
        if (defaultValue !== undefined &&
            type != Object &&
            type != eval &&
            componentParamTypeMap2.get(type) != typeof defaultValue) {
            throw TypeError('Specified type does not match type of defaultValue');
        }
        let $paramConfig = {
            name,
            property: propName,
            type,
            valueСonverters,
            default: defaultValue,
            required,
            readonly,
            paramConfig
        };
        ((_e = componentCtor[KEY_PARAMS_CONFIG]) !== null && _e !== void 0 ? _e : (componentCtor[KEY_PARAMS_CONFIG] = new Map()))
            .set(name, $paramConfig)
            .set(snakeCaseName, $paramConfig);
        let descriptor = {
            configurable: true,
            enumerable: true,
            get() {
                var _a;
                ComponentParams.init(this);
                let self = this[KEY_COMPONENT_SELF];
                let valueCell = ((_a = self[external_cellx_.KEY_VALUE_CELLS]) !== null && _a !== void 0 ? _a : (self[external_cellx_.KEY_VALUE_CELLS] = new Map())).get(propName);
                if (valueCell) {
                    return valueCell.get();
                }
                let value = self[KEY_PARAM_VALUES].get(name);
                if (external_cellx_.Cell.currentlyPulling || external_cellx_.EventEmitter.currentlySubscribing) {
                    self[KEY_PARAM_VALUES].delete(name);
                    valueCell = new external_cellx_.Cell(null, {
                        context: self,
                        value
                    });
                    self[external_cellx_.KEY_VALUE_CELLS].set(propName, valueCell);
                    if (external_cellx_.Cell.currentlyPulling) {
                        return valueCell.get();
                    }
                }
                return value;
            },
            set(value) {
                var _a;
                let self = this[KEY_COMPONENT_SELF];
                let valueCell = ((_a = self[external_cellx_.KEY_VALUE_CELLS]) !== null && _a !== void 0 ? _a : (self[external_cellx_.KEY_VALUE_CELLS] = new Map())).get(propName);
                if (self[KEY_COMPONENT_PARAMS_INITED]) {
                    if (readonly) {
                        if (value !==
                            (valueCell ? valueCell.get() : self[KEY_PARAM_VALUES].get(name))) {
                            throw TypeError(`Parameter "${name}" is readonly`);
                        }
                        return;
                    }
                    if ($paramConfig.valueСonverters.toString) {
                        let rawValue = $paramConfig.valueСonverters.toString(value, $paramConfig.default);
                        if (rawValue === null) {
                            self.element.removeAttribute(snakeCaseName);
                        }
                        else {
                            self.element.setAttribute(snakeCaseName, rawValue);
                        }
                    }
                }
                if (valueCell) {
                    valueCell.set(value);
                }
                else {
                    self[KEY_PARAM_VALUES].set(name, value);
                }
            }
        };
        Object.defineProperty(componentProto, propName, descriptor);
    }
    inheritProperty(componentCtor, parentComponentCtor, 'i18n', 0);
    componentCtor._blockNamesString = elIs + ' ' + (parentComponentCtor._blockNamesString || '');
    componentCtor._elementBlockNames = [elIs];
    if (parentComponentCtor._elementBlockNames) {
        componentCtor._elementBlockNames.push(...parentComponentCtor._elementBlockNames);
    }
    let template = componentCtor.template;
    if (template !== null) {
        if (template === parentComponentCtor.template) {
            componentCtor.template = template.extend('', {
                blockName: elIs
            });
        }
        else if (template instanceof Template) {
            template.setBlockName(componentCtor._elementBlockNames);
        }
        else {
            componentCtor.template = parentComponentCtor.template
                ? parentComponentCtor.template.extend(template, {
                    blockName: elIs
                })
                : new Template(template, { blockName: componentCtor._elementBlockNames });
        }
    }
    inheritProperty(componentCtor, parentComponentCtor, 'events', 1);
    inheritProperty(componentCtor, parentComponentCtor, 'domEvents', 1);
    let elExtends = componentCtor.elementExtends;
    let parentElCtor;
    if (elExtends) {
        parentElCtor =
            (_f = elementConstructors.get(elExtends)) !== null && _f !== void 0 ? _f : window[`HTML${(0,pascalize_dist.pascalize)(elExtends)}Element`];
        if (!parentElCtor) {
            throw TypeError(`Component "${elExtends}" is not registered`);
        }
    }
    else {
        parentElCtor = HTMLElement;
    }
    let elCtor = (_h = class extends parentElCtor {
            static get observedAttributes() {
                let paramsConfig = componentCtor.params;
                let attrs = [];
                for (let name in paramsConfig) {
                    if (paramsConfig[name] !== null && paramsConfig[name] !== Object.prototype[name]) {
                        attrs.push((0,rionite_snake_case_attribute_name_dist.snakeCaseAttributeName)(name, true));
                    }
                }
                return attrs;
            }
        },
        _g = KEY_RIONITE_COMPONENT_CONSTRUCTOR,
        _h[_g] = componentCtor,
        _h);
    let elProto = elCtor.prototype;
    elProto.constructor = elCtor;
    let names = Object.getOwnPropertyNames(ElementProtoMixin);
    for (let name of names) {
        Object.defineProperty(elProto, name, Object.getOwnPropertyDescriptor(ElementProtoMixin, name));
    }
    names = Object.getOwnPropertySymbols(ElementProtoMixin);
    for (let name of names) {
        Object.defineProperty(elProto, name, Object.getOwnPropertyDescriptor(ElementProtoMixin, name));
    }
    componentConstructors.set(elIs, componentCtor).set(kebabCaseElIs, componentCtor);
    elementConstructors.set(elIs, elCtor);
    window.customElements.define(kebabCaseElIs, elCtor, elExtends ? { extends: elExtends } : undefined);
    return componentCtor;
}

;// CONCATENATED MODULE: ./src/decorators/Component.ts

function Component(config) {
    return (componentCtor) => {
        if (config) {
            if (config.elementIs !== undefined) {
                componentCtor.elementIs = config.elementIs;
            }
            if (config.elementExtends !== undefined) {
                componentCtor.elementExtends = config.elementExtends;
            }
            if (config.params !== undefined) {
                componentCtor.params = config.params;
            }
            if (config.i18n !== undefined) {
                componentCtor.i18n = config.i18n;
            }
            if (config.template !== undefined) {
                componentCtor.template = config.template;
            }
            if (config.events !== undefined) {
                componentCtor.events = config.events;
            }
            if (config.domEvents !== undefined) {
                componentCtor.domEvents = config.domEvents;
            }
        }
        registerComponent(componentCtor);
    };
}

;// CONCATENATED MODULE: ./src/decorators/Param.ts
function Param(target, propName, propDesc, name, config) {
    if (typeof propName != 'string') {
        if (target && typeof target != 'string') {
            config = target;
        }
        else {
            name = target;
            config = propName;
        }
        return (target, propName, propDesc) => Param(target, propName, propDesc, name, config);
    }
    if (!config) {
        config = {};
    }
    else if (typeof config == 'function') {
        config = { type: config };
    }
    config.property = propName;
    let ctor = target.constructor;
    ((Object.prototype.hasOwnProperty.call(ctor, 'params') && ctor.params) || (ctor.params = {}))[name !== null && name !== void 0 ? name : propName] = config;
}

;// CONCATENATED MODULE: ./src/decorators/Attr.ts



function Attr(target, propName) {
    let lifecycleHooks = Object.prototype.hasOwnProperty.call(target.constructor, '_lifecycleHooks')
        ? target.constructor._lifecycleHooks
        : (target.constructor._lifecycleHooks = {
            __proto__: target.constructor._lifecycleHooks
        });
    (Object.prototype.hasOwnProperty.call(lifecycleHooks, 'connected')
        ? lifecycleHooks.connected
        : (lifecycleHooks.connected = lifecycleHooks.connected.slice())).push((component) => {
        let attrName = (0,rionite_snake_case_attribute_name_dist.snakeCaseAttributeName)(propName, true);
        setAttribute(component.element, attrName, component[propName]);
        component.listenTo(component, external_cellx_.Cell.EVENT_CHANGE + ':' + propName, function () {
            setAttribute(this.element, attrName, this[propName]);
        });
    });
}

;// CONCATENATED MODULE: ./src/decorators/Ref.ts
function Ref(target, propName, _propDesc, name) {
    if (!propName) {
        return (target, propName, propDesc) => Ref(target, propName, propDesc, name);
    }
    if (!name) {
        name = propName;
    }
    let lifecycleHooks = Object.prototype.hasOwnProperty.call(target.constructor, '_lifecycleHooks')
        ? target.constructor._lifecycleHooks
        : (target.constructor._lifecycleHooks = {
            __proto__: target.constructor._lifecycleHooks
        });
    (Object.prototype.hasOwnProperty.call(lifecycleHooks, 'ready')
        ? lifecycleHooks.ready
        : (lifecycleHooks.ready = lifecycleHooks.ready.slice())).push((component) => {
        component[propName] = component.$(name);
    });
}

;// CONCATENATED MODULE: ./src/decorators/Listen.ts
function Listen(evtType, target, useCapture) {
    return (target_, methodName) => {
        let options = target &&
            typeof target == 'object' &&
            !Array.isArray(target) &&
            Object.getPrototypeOf(target) === Object.prototype
            ? target
            : null;
        let listeningTarget = options ? options.target : target;
        if (options) {
            useCapture = options.useCapture;
        }
        let lifecycleHooks = Object.prototype.hasOwnProperty.call(target_.constructor, '_lifecycleHooks')
            ? target_.constructor._lifecycleHooks
            : (target_.constructor._lifecycleHooks = {
                __proto__: target_.constructor._lifecycleHooks
            });
        (Object.prototype.hasOwnProperty.call(lifecycleHooks, 'connected')
            ? lifecycleHooks.connected
            : (lifecycleHooks.connected = lifecycleHooks.connected.slice())).push((component) => {
            let target = listeningTarget;
            if (target) {
                if (typeof target == 'function') {
                    target = target.call(component, component);
                }
                if (typeof target == 'string' && target.charAt(0) == '@') {
                    // eslint-disable-next-line @typescript-eslint/no-implied-eval
                    target = Function(`return this.${target.slice(1)};`).call(component);
                }
            }
            else {
                target = component;
            }
            component.listenTo(target, typeof evtType == 'function'
                ? evtType.call(component, component.constructor)
                : evtType, component[methodName], component, useCapture);
        });
    };
}

;// CONCATENATED MODULE: ./src/decorators/Callback.ts
function Callback(target, methodName, methodDesc) {
    if (!methodDesc) {
        methodDesc = Object.getOwnPropertyDescriptor(target, methodName);
    }
    let method = methodDesc.value;
    methodDesc.value = function (...args) {
        return this._isConnected ? method.call(this, ...args) : Promise.resolve();
    };
    return methodDesc;
}

;// CONCATENATED MODULE: ./src/decorators/Interruptible.ts

function Interruptible(target, methodName, methodDesc) {
    if (!methodDesc) {
        methodDesc = Object.getOwnPropertyDescriptor(target, methodName);
    }
    let method = methodDesc.value;
    methodDesc.value = function (...args) {
        let result = method.call(this, ...args);
        result.catch((err) => {
            if (!(err instanceof InterruptError)) {
                throw err;
            }
        });
        return result;
    };
    return methodDesc;
}

// EXTERNAL MODULE: ./node_modules/@riim/next-tick/dist/nextTick.umd.js
var nextTick_umd = __webpack_require__(16);
;// CONCATENATED MODULE: ./src/compileBinding.ts



const compileBinding_cache = new Map();
function compileBinding(binding, cacheKey) {
    if (!compileBinding_cache.has(cacheKey)) {
        let inner = 
        // eslint-disable-next-line @typescript-eslint/no-implied-eval
        Function('formatters, KEY_COMPONENT_SELF', `var tmp; return ${bindingToJSExpression(binding[0])};`);
        compileBinding_cache.set(cacheKey, function () {
            return inner.call(this, formatters, KEY_COMPONENT_SELF);
        });
    }
    return compileBinding_cache.get(cacheKey);
}

;// CONCATENATED MODULE: ./src/lib/removeNodes.ts
function removeNodes(nodes) {
    let nodeCount = nodes.length;
    if (nodeCount == 1) {
        let node = nodes[0];
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    else {
        for (let i = 0; i < nodeCount; i++) {
            let node = nodes[i];
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
        }
    }
}

// EXTERNAL MODULE: external "cellx-collections"
var external_cellx_collections_ = __webpack_require__(17);
;// CONCATENATED MODULE: ./src/components/RnRepeat.ts
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RnRepeat_1;
















const reForAttrValue = RegExp(`^\\s*(${namePattern})\\s+in\\s+(${keypathPattern}(?:\\s*(.*\\S))?)\\s*$`);
function getItem(list, index) {
    return Array.isArray(list) ? list[index] : list.get(index);
}
function insertBefore(nodes, beforeNode, parentNode) {
    let nodeCount = nodes.length;
    if (nodeCount == 1) {
        parentNode.insertBefore(nodes[0], beforeNode);
        return nodes[0];
    }
    for (let i = 0; i < nodeCount; i++) {
        parentNode.insertBefore(nodes[i], beforeNode);
    }
    return nodes[nodeCount - 1];
}
function offBindings(bindings) {
    if (bindings) {
        for (let i = bindings.length; i != 0;) {
            bindings[--i].off();
        }
    }
}
function deactivateChildComponents(childComponents) {
    if (childComponents) {
        for (let i = childComponents.length; i != 0;) {
            let childComponent = childComponents[--i];
            if (childComponent instanceof RnCondition || childComponent instanceof RnRepeat) {
                childComponent._deactivate();
            }
        }
    }
}
let RnRepeat = RnRepeat_1 = class RnRepeat extends BaseComponent {
    constructor() {
        super(...arguments);
        this._active = false;
    }
    static get bindsInputContent() {
        return true;
    }
    elementConnected() {
        if (this._active) {
            return;
        }
        this._active = true;
        if (!this._initialized) {
            this._prevList = [];
            if (this.$specifiedParams.has('in')) {
                this._itemName = this.paramFor;
                this._list = this.paramIn;
            }
            else if (this.paramInKeypath) {
                this._itemName = this.paramFor;
                this._list = new external_cellx_.Cell(compileKeypath(this.paramInKeypath), {
                    context: this.$context
                });
            }
            else {
                let for_ = this.paramFor.match(reForAttrValue);
                if (!for_) {
                    throw SyntaxError(`Invalid value in parameter "for" (${this.paramFor})`);
                }
                let getList;
                if (for_[3]) {
                    let inListAST = parseTemplateNodeValue(`{${for_[2]}}`);
                    if (!inListAST || inListAST.length != 1) {
                        throw SyntaxError(`Invalid value in parameter "for" (${this.paramFor})`);
                    }
                    getList = compileBinding(inListAST, for_[2]);
                }
                else {
                    getList = compileKeypath(for_[2]);
                }
                this._itemName = for_[1];
                this._list = new external_cellx_.Cell(getList, { context: this.$context });
            }
            this._$itemsMap = new Map();
            this._initialized = true;
        }
        if (this.element[KEY_CONTENT_TEMPLATE]) {
            let list = this._list;
            if (list && (list instanceof external_cellx_.Cell || list instanceof external_cellx_collections_.ObservableList)) {
                list.onChange(this._onListChange, this);
            }
            this._render(false);
        }
    }
    elementDisconnected() {
        (0,nextTick_umd.nextTick)(() => {
            if (!this.element[KEY_ELEMENT_CONNECTED]) {
                this._deactivate();
            }
        });
    }
    _onListChange() {
        if (this.element.parentNode) {
            this._render(true);
        }
    }
    _connect() {
        this._isConnected = true;
        return null;
    }
    _disconnect() {
        this._isConnected = false;
    }
    _render(fromChangeEvent) {
        var _a, _b;
        let prevList = this._prevList;
        let prevListLength = prevList.length;
        let list = this._list instanceof external_cellx_.Cell ? this._list.get() : this._list;
        let $itemsMap = this._$itemsMap;
        let trackBy = this.trackBy;
        let startIndex = 0;
        let changed = false;
        if (list) {
            let new$ItemsMap = new Map();
            let removedValues = new Map();
            let el = this.element;
            let lastNode = el;
            for (let i = 0, l = list.length; i < l;) {
                let item = getItem(list, i);
                let value = trackBy ? item[trackBy] : item;
                let $items = $itemsMap.get(value);
                if ($items) {
                    if (removedValues.has(value)) {
                        let $item = $items.shift();
                        if (new$ItemsMap.has(value)) {
                            new$ItemsMap.get(value).push($item);
                        }
                        else {
                            new$ItemsMap.set(value, [$item]);
                        }
                        if ($items.length == 0) {
                            $itemsMap.delete(value);
                        }
                        let removedCount = removedValues.get(value);
                        if (removedCount == 1) {
                            removedValues.delete(value);
                        }
                        else {
                            removedValues.set(value, removedCount - 1);
                        }
                        $item.item.set(item);
                        $item.index.set(i);
                        lastNode = insertBefore($item.nodes, lastNode == el && this.beforeTemplate ? el : lastNode.nextSibling, el.parentNode);
                        i++;
                    }
                    else {
                        let foundIndex;
                        for (let j = startIndex;; j++) {
                            if (foundIndex === undefined) {
                                if (value === (trackBy ? prevList[j][trackBy] : prevList[j])) {
                                    let $item = $items.shift();
                                    if (new$ItemsMap.has(value)) {
                                        new$ItemsMap.get(value).push($item);
                                    }
                                    else {
                                        new$ItemsMap.set(value, [$item]);
                                    }
                                    if ($items.length == 0) {
                                        $itemsMap.delete(value);
                                    }
                                    if (j == startIndex) {
                                        lastNode = $item.nodes[$item.nodes.length - 1];
                                        startIndex++;
                                        i++;
                                        break;
                                    }
                                    foundIndex = j;
                                }
                            }
                            else {
                                let foundCount = j - foundIndex;
                                let ii = i + foundCount;
                                if (ii < l) {
                                    let iiValue;
                                    if (j < prevListLength &&
                                        (trackBy
                                            ? (iiValue = getItem(list, ii)[trackBy]) ===
                                                prevList[j][trackBy]
                                            : (iiValue = getItem(list, ii)) === prevList[j])) {
                                        let ii$Items = $itemsMap.get(iiValue);
                                        if (new$ItemsMap.has(iiValue)) {
                                            new$ItemsMap.get(iiValue).push(ii$Items.shift());
                                        }
                                        else {
                                            new$ItemsMap.set(iiValue, [ii$Items.shift()]);
                                        }
                                        if (ii$Items.length == 0) {
                                            $itemsMap.delete(iiValue);
                                        }
                                        continue;
                                    }
                                    if (foundCount < foundIndex - startIndex) {
                                        for (let k = foundIndex; k < j; k++) {
                                            let kValue = trackBy
                                                ? prevList[k][trackBy]
                                                : prevList[k];
                                            let k$Item = new$ItemsMap.get(kValue);
                                            k$Item[0].item.set(item);
                                            k$Item[0].index.set(i);
                                            lastNode = insertBefore(k$Item[0].nodes, lastNode == el && this.beforeTemplate
                                                ? el
                                                : lastNode.nextSibling, el.parentNode);
                                        }
                                        prevList.splice(foundIndex, foundCount);
                                        prevListLength -= foundCount;
                                        i = ii;
                                        changed = true;
                                        break;
                                    }
                                }
                                for (let k = startIndex; k < foundIndex; k++) {
                                    let kValue = trackBy ? prevList[k][trackBy] : prevList[k];
                                    let index = (_a = removedValues.get(kValue)) !== null && _a !== void 0 ? _a : 0;
                                    removeNodes($itemsMap.get(kValue)[index].nodes);
                                    removedValues.set(kValue, index + 1);
                                }
                                let lastFoundValue = trackBy
                                    ? prevList[j - 1][trackBy]
                                    : prevList[j - 1];
                                let nodes = new$ItemsMap.get(lastFoundValue)[(_b = removedValues.get(lastFoundValue)) !== null && _b !== void 0 ? _b : 0].nodes;
                                lastNode = nodes[nodes.length - 1];
                                startIndex = j;
                                i = ii;
                                changed = true;
                                break;
                            }
                        }
                    }
                }
                else {
                    let itemCell = new external_cellx_.Cell(null, { value: item });
                    let indexCell = new external_cellx_.Cell(i);
                    let contentBindingResult = [null, null, null];
                    let content = this.element[KEY_CONTENT_TEMPLATE].render(null, this.ownerComponent, Object.create(this.$context, {
                        [this._itemName]: {
                            configurable: true,
                            enumerable: true,
                            get: ((itemCell) => () => itemCell.get())(itemCell)
                        },
                        $index: {
                            configurable: true,
                            enumerable: true,
                            get: ((indexCell) => () => indexCell.get())(indexCell)
                        }
                    }), contentBindingResult);
                    let childComponents = contentBindingResult[0];
                    let backBindings = contentBindingResult[2];
                    let new$Item = {
                        item: itemCell,
                        index: indexCell,
                        nodes: Array.prototype.slice.call(content.childNodes),
                        bindings: contentBindingResult[1],
                        childComponents
                    };
                    if (new$ItemsMap.has(value)) {
                        new$ItemsMap.get(value).push(new$Item);
                    }
                    else {
                        new$ItemsMap.set(value, [new$Item]);
                    }
                    if (childComponents) {
                        for (let i = childComponents.length; i != 0;) {
                            let childComponent = childComponents[--i];
                            if (childComponent.element.firstChild &&
                                childComponent.constructor.bindsInputContent) {
                                childComponent.$inputContent = (0,move_content_dist.moveContent)(document.createDocumentFragment(), childComponent.element);
                            }
                        }
                    }
                    let newLastNode = content.lastChild;
                    suppressConnectionStatusCallbacks();
                    lastNode.parentNode.insertBefore(content, lastNode == el && this.beforeTemplate ? el : lastNode.nextSibling);
                    resumeConnectionStatusCallbacks();
                    lastNode = newLastNode;
                    if (childComponents) {
                        connectChildComponentElements(childComponents);
                    }
                    if (backBindings) {
                        for (let i = backBindings.length; i != 0; i -= 3) {
                            backBindings[i - 3].on('change:' + backBindings[i - 2], backBindings[i - 1]);
                        }
                    }
                    changed = true;
                    i++;
                }
            }
            if (removedValues.size != 0) {
                (($itemsMap) => {
                    for (let value of removedValues.values()) {
                        for (let $item of $itemsMap.get(value)) {
                            offBindings($item.bindings);
                            deactivateChildComponents($item.childComponents);
                        }
                    }
                })($itemsMap);
            }
            this._$itemsMap = new$ItemsMap;
        }
        else {
            this._$itemsMap = new Map();
        }
        if (startIndex < prevListLength) {
            for (let i = startIndex; i < prevListLength; i++) {
                let value = trackBy ? prevList[i][trackBy] : prevList[i];
                for (let $item of $itemsMap.get(value)) {
                    removeNodes($item.nodes);
                    offBindings($item.bindings);
                    deactivateChildComponents($item.childComponents);
                }
            }
        }
        else if (!changed) {
            return;
        }
        this._prevList = list ? (Array.isArray(list) ? list.slice() : list.toArray()) : [];
        if (fromChangeEvent) {
            external_cellx_.Cell.release();
            this.emit(RnRepeat_1.EVENT_CHANGE);
        }
    }
    _deactivate() {
        if (!this._active) {
            return;
        }
        this._active = false;
        let list = this._list;
        if (list && (list instanceof external_cellx_.Cell || list instanceof external_cellx_collections_.ObservableList)) {
            list.offChange(this._onListChange, this);
        }
        let prevList = this._prevList;
        let $itemsMap = this._$itemsMap;
        let trackBy = this.trackBy;
        for (let i = 0, l = prevList.length; i < l; i++) {
            let value = trackBy ? prevList[i][trackBy] : prevList[i];
            for (let $item of $itemsMap.get(value)) {
                removeNodes($item.nodes);
                offBindings($item.bindings);
                deactivateChildComponents($item.childComponents);
            }
        }
        $itemsMap.clear();
    }
};
RnRepeat.EVENT_CHANGE = Symbol('change');
RnRepeat = RnRepeat_1 = __decorate([
    Component({
        elementIs: 'RnRepeat',
        elementExtends: 'template',
        params: {
            for: { property: 'paramFor', type: String, required: true, readonly: true },
            in: { property: 'paramIn', readonly: true },
            inKeypath: { property: 'paramInKeypath', type: String, readonly: true },
            trackBy: { type: String, readonly: true },
            beforeTemplate: { type: Boolean, readonly: true }
        }
    })
], RnRepeat);


;// CONCATENATED MODULE: ./src/components/RnCondition.ts
var RnCondition_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RnCondition_1;














const RnCondition_reKeypath = RegExp(`^${keypathPattern}$`);
let RnCondition = RnCondition_1 = class RnCondition extends BaseComponent {
    constructor() {
        super(...arguments);
        this._nodes = null;
        this._childComponents = null;
        this._active = false;
    }
    static get bindsInputContent() {
        return true;
    }
    elementConnected() {
        if (this._active) {
            return;
        }
        this._active = true;
        if (!this._initialized) {
            let condition = this.paramIf;
            if (condition) {
                condition = condition.trim();
                this._unless = false;
            }
            else {
                condition = this.paramUnless;
                if (condition) {
                    condition = condition.trim();
                    this._unless = true;
                }
                else {
                    throw TypeError('Parameter "if" is required');
                }
            }
            let getConditionResult;
            if (RnCondition_reKeypath.test(condition)) {
                getConditionResult = compileKeypath(condition);
            }
            else {
                let conditionAST = parseTemplateNodeValue(`{${condition}}`);
                if (!conditionAST || conditionAST.length != 1) {
                    throw SyntaxError(`Invalid value in parameter "${(this.paramIf || '').trim() ? 'if' : 'unless'}" (${condition})`);
                }
                getConditionResult = compileBinding(conditionAST, condition);
            }
            this._conditionCell = new external_cellx_.Cell(() => !!getConditionResult.call(this.$context));
            this._initialized = true;
        }
        if (this.element[KEY_CONTENT_TEMPLATE]) {
            this._conditionCell.onChange(this._onConditionChange, this);
            this._render(false);
        }
    }
    elementDisconnected() {
        (0,nextTick_umd.nextTick)(() => {
            if (!this.element[KEY_ELEMENT_CONNECTED]) {
                this._deactivate();
            }
        });
    }
    _onConditionChange() {
        if (this.element.parentNode) {
            this._render(true);
        }
    }
    _connect() {
        this._isConnected = true;
        return null;
    }
    _disconnect() {
        this._isConnected = false;
    }
    _render(changed) {
        let conditionResult = this._conditionCell.get();
        if (this._unless
            ? !conditionResult && (conditionResult !== undefined || this.trueWhenPending)
            : conditionResult) {
            let contentBindingResult = [null, null, null];
            let content = this.element[KEY_CONTENT_TEMPLATE].render(null, this.ownerComponent, this.$context, contentBindingResult);
            let childComponents = contentBindingResult[0];
            let backBindings = contentBindingResult[2];
            this._nodes = Array.prototype.slice.call(content.childNodes);
            this._childComponents = childComponents;
            this._bindings = contentBindingResult[1];
            if (childComponents) {
                for (let i = childComponents.length; i != 0;) {
                    let childComponent = childComponents[--i];
                    if (childComponent.element.firstChild &&
                        childComponent.constructor.bindsInputContent) {
                        childComponent.$inputContent = (0,move_content_dist.moveContent)(document.createDocumentFragment(), childComponent.element);
                    }
                }
            }
            suppressConnectionStatusCallbacks();
            this.element.parentNode.insertBefore(content, this.element);
            resumeConnectionStatusCallbacks();
            if (childComponents) {
                connectChildComponentElements(childComponents);
            }
            if (backBindings) {
                for (let i = backBindings.length; i != 0; i -= 3) {
                    backBindings[i - 3].on('change:' + backBindings[i - 2], backBindings[i - 1]);
                }
            }
        }
        else {
            let nodes = this._nodes;
            if (nodes) {
                removeNodes(nodes);
                this._destroyBindings();
                this._nodes = null;
                this._deactivateChildComponents();
            }
        }
        if (changed) {
            external_cellx_.Cell.release();
            this.emit(RnCondition_1.EVENT_CHANGE);
        }
    }
    _deactivate() {
        if (!this._active) {
            return;
        }
        this._active = false;
        this._conditionCell.offChange(this._onConditionChange, this);
        let nodes = this._nodes;
        if (nodes) {
            removeNodes(nodes);
            this._destroyBindings();
            this._nodes = null;
            this._deactivateChildComponents();
        }
    }
    _deactivateChildComponents() {
        let childComponents = this._childComponents;
        if (childComponents) {
            for (let i = childComponents.length; i != 0;) {
                let childComponent = childComponents[--i];
                if (childComponent instanceof RnCondition_1 || childComponent instanceof RnRepeat) {
                    childComponent._deactivate();
                }
            }
        }
        this._childComponents = null;
    }
};
RnCondition.EVENT_CHANGE = Symbol('change');
RnCondition = RnCondition_1 = RnCondition_decorate([
    Component({
        elementIs: 'RnCondition',
        elementExtends: 'template',
        params: {
            if: { property: 'paramIf', type: String, readonly: true },
            unless: { property: 'paramUnless', type: String, readonly: true },
            trueWhenPending: { type: Boolean, readonly: true }
        }
    })
], RnCondition);


;// CONCATENATED MODULE: ./src/lib/cloneNode.ts



const isEdge = !!document.documentMode || navigator.userAgent.indexOf('Edge/') != -1;
function cloneNode(node) {
    let copy;
    switch (node.nodeType) {
        case Node.DOCUMENT_FRAGMENT_NODE: {
            copy = document.createDocumentFragment();
            for (let child = node.firstChild; child; child = child.nextSibling) {
                copy.appendChild(cloneNode(child));
            }
            break;
        }
        case Node.ELEMENT_NODE: {
            let tagName = node.tagName.toLowerCase();
            let is = node.getAttribute('is');
            if (is) {
                copy = window.innerHTML(document.createElement('div'), `<${tagName} is="${is}">`).firstChild;
            }
            else if (isEdge) {
                copy = window.innerHTML(document.createElement('div'), `<${tagName}>`)
                    .firstChild;
            }
            else {
                copy = document.createElementNS(node.namespaceURI, tagName);
            }
            if ((tagName == 'template' || tagName == 'rn-slot') && node[KEY_CONTENT_TEMPLATE]) {
                copy[KEY_CONTENT_TEMPLATE] = node[KEY_CONTENT_TEMPLATE];
            }
            if (node[KEY_EVENTS]) {
                copy[KEY_EVENTS] = node[KEY_EVENTS];
            }
            if (node[KEY_DOM_EVENTS]) {
                copy[KEY_DOM_EVENTS] = node[KEY_DOM_EVENTS];
            }
            let attrs = node.attributes;
            for (let i = 0, l = attrs.length; i < l; i++) {
                let attr = attrs.item(i);
                if (!is || attr.name != 'is') {
                    copy.setAttributeNS(attr.namespaceURI, attr.name, attr.value);
                }
            }
            for (let child = node.firstChild; child; child = child.nextSibling) {
                copy.appendChild(cloneNode(child));
            }
            break;
        }
        case Node.TEXT_NODE: {
            copy = document.createTextNode(node.nodeValue);
            break;
        }
    }
    return copy;
}

;// CONCATENATED MODULE: ./src/components/RnSlot.ts
var RnSlot_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









const KEY_SLOTS_CONTENT = Symbol('slotsContent');
let RnSlot = class RnSlot extends BaseComponent {
    static get bindsInputContent() {
        return true;
    }
    _connect() {
        var _a;
        this._isConnected = true;
        if (this._isReady) {
            this._unfreezeBindings();
            if (this._childComponents) {
                connectChildComponentElements(this._childComponents);
            }
            return null;
        }
        let ownerComponent = this.ownerComponent;
        let contentOwnerComponent = ownerComponent.ownerComponent;
        let ownerComponentInputContent = ownerComponent.$inputContent;
        let el = this.element;
        let cloneContent = this.cloneContent;
        let content;
        let childComponents;
        let bindings;
        let backBindings;
        if (ownerComponentInputContent || !cloneContent) {
            let name = this.name;
            let for_;
            let forTag;
            if (!name) {
                for_ = this.paramFor;
                if (!for_) {
                    forTag = this.forTag;
                    if (forTag) {
                        forTag = forTag.toUpperCase();
                    }
                }
            }
            let key = (0,next_uid_.getUID)(ownerComponent) +
                '/' +
                (name ? 'slot:' + name : for_ ? 'element:' + for_ : forTag ? 'tag:' + forTag : '*');
            if (name || for_ || forTag) {
                let slotsContent;
                if (!cloneContent &&
                    (slotsContent = contentOwnerComponent[KEY_SLOTS_CONTENT]) &&
                    slotsContent.has(key)) {
                    let container = slotsContent.get(key);
                    if (container.firstChild) {
                        content = (0,move_content_dist.moveContent)(document.createDocumentFragment(), container);
                        slotsContent.set(key, el);
                        childComponents = container.$component._childComponents;
                        bindings = container.$component._bindings;
                    }
                }
                else {
                    if (ownerComponentInputContent) {
                        if (for_ && for_.indexOf('__') == -1) {
                            let elementBlockNames = ownerComponent.constructor._elementBlockNames;
                            for_ = elementBlockNames[elementBlockNames.length - 1] + '__' + for_;
                        }
                        let selectedElements = ownerComponentInputContent.querySelectorAll(name ? `[slot=${name}]` : for_ ? '.' + for_ : forTag);
                        let selectedElementCount = selectedElements.length;
                        if (selectedElementCount != 0) {
                            content = document.createDocumentFragment();
                            for (let i = 0; i < selectedElementCount; i++) {
                                content.appendChild(cloneContent
                                    ? cloneNode(selectedElements[i])
                                    : selectedElements[i]);
                            }
                        }
                        if (!cloneContent) {
                            ((_a = slotsContent !== null && slotsContent !== void 0 ? slotsContent : contentOwnerComponent[KEY_SLOTS_CONTENT]) !== null && _a !== void 0 ? _a : (contentOwnerComponent[KEY_SLOTS_CONTENT] = new Map())).set(key, el);
                        }
                    }
                }
            }
            else {
                if (cloneContent) {
                    content = cloneNode(ownerComponentInputContent);
                }
                else {
                    let slotsContent = contentOwnerComponent[KEY_SLOTS_CONTENT];
                    if (slotsContent && slotsContent.has(key)) {
                        let container = slotsContent.get(key);
                        content = (0,move_content_dist.moveContent)(document.createDocumentFragment(), container);
                        slotsContent.set(key, el);
                        childComponents = container.$component._childComponents;
                        bindings = container.$component._bindings;
                    }
                    else {
                        if (ownerComponentInputContent) {
                            content = ownerComponentInputContent;
                            (slotsContent !== null && slotsContent !== void 0 ? slotsContent : (contentOwnerComponent[KEY_SLOTS_CONTENT] = new Map())).set(key, el);
                        }
                    }
                }
            }
        }
        if (bindings === undefined) {
            if (content || this.element[KEY_CONTENT_TEMPLATE]) {
                let contentBindingResult = [null, null, null];
                if (content) {
                    bindContent(content, contentOwnerComponent, this.getContext
                        ? this.getContext.call(ownerComponent, ownerComponent.$context, this)
                        : ownerComponent.$context, contentBindingResult);
                }
                else {
                    content = this.element[KEY_CONTENT_TEMPLATE].render(null, ownerComponent, this.getContext
                        ? this.getContext.call(ownerComponent, this.$context, this)
                        : this.$context, contentBindingResult);
                }
                childComponents = this._childComponents = contentBindingResult[0];
                this._bindings = contentBindingResult[1];
                backBindings = contentBindingResult[2];
                if (childComponents) {
                    for (let i = childComponents.length; i != 0;) {
                        let childComponent = childComponents[--i];
                        if (childComponent.element.firstChild &&
                            childComponent.constructor.bindsInputContent) {
                            childComponent.$inputContent = (0,move_content_dist.moveContent)(document.createDocumentFragment(), childComponent.element);
                        }
                    }
                }
            }
            else {
                this._childComponents = null;
                this._bindings = null;
            }
        }
        else {
            this._childComponents = childComponents;
            this._bindings = bindings;
            this._unfreezeBindings();
        }
        if (content) {
            suppressConnectionStatusCallbacks();
            el.appendChild(content);
            resumeConnectionStatusCallbacks();
        }
        if (childComponents) {
            connectChildComponentElements(childComponents);
        }
        if (backBindings) {
            for (let i = backBindings.length; i != 0; i -= 3) {
                backBindings[i - 3].on('change:' + backBindings[i - 2], backBindings[i - 1]);
            }
        }
        this._isReady = true;
        return null;
    }
    _disconnect() {
        this._isConnected = false;
        this._freezeBindings();
    }
};
RnSlot = RnSlot_decorate([
    Component({
        elementIs: 'RnSlot',
        params: {
            name: { type: String, readonly: true },
            for: { property: 'paramFor', type: String, readonly: true },
            forTag: { type: String, readonly: true },
            cloneContent: { type: Boolean, readonly: true },
            getContext: { readonly: true }
        }
    })
], RnSlot);


;// CONCATENATED MODULE: ./src/components/RnHtml.ts
var RnHtml_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let RnHtml = class RnHtml extends BaseComponent {
    ready() {
        this._setHtml();
    }
    connected() {
        this.listenTo(this, 'change:html', this._onHtmlChange);
    }
    _onHtmlChange() {
        this._setHtml();
    }
    _setHtml() {
        this.element.innerHTML = this.html || '';
    }
};
RnHtml = RnHtml_decorate([
    Component({
        elementIs: 'RnHtml',
        params: {
            html: { type: String }
        }
    })
], RnHtml);


;// CONCATENATED MODULE: ./src/index.ts






















})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});