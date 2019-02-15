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
				var df = (this.__$$content__ = d.createDocumentFragment());

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
		module.exports = factory(require("@riim/kebab-case"), require("@riim/rionite-snake-case-attribute-name"), require("@riim/map-set-polyfill"), require("@riim/symbol-polyfill"), require("@riim/gettext"), require("cellx"), require("@riim/escape-html"), require("@riim/is-regexp"), require("@riim/defer"), require("@riim/lower-case-first-word"), require("@riim/get-uid"), require("@riim/logger"), require("@riim/move-content"), require("@riim/next-uid"), require("@riim/set-attribute"), require("escape-string"), require("@riim/next-tick"));
	else if(typeof define === 'function' && define.amd)
		define(["@riim/kebab-case", "@riim/rionite-snake-case-attribute-name", "@riim/map-set-polyfill", "@riim/symbol-polyfill", "@riim/gettext", "cellx", "@riim/escape-html", "@riim/is-regexp", "@riim/defer", "@riim/lower-case-first-word", "@riim/get-uid", "@riim/logger", "@riim/move-content", "@riim/next-uid", "@riim/set-attribute", "escape-string", "@riim/next-tick"], factory);
	else if(typeof exports === 'object')
		exports["rionite"] = factory(require("@riim/kebab-case"), require("@riim/rionite-snake-case-attribute-name"), require("@riim/map-set-polyfill"), require("@riim/symbol-polyfill"), require("@riim/gettext"), require("cellx"), require("@riim/escape-html"), require("@riim/is-regexp"), require("@riim/defer"), require("@riim/lower-case-first-word"), require("@riim/get-uid"), require("@riim/logger"), require("@riim/move-content"), require("@riim/next-uid"), require("@riim/set-attribute"), require("escape-string"), require("@riim/next-tick"));
	else
		root["rionite"] = factory(root["@riim/kebab-case"], root["@riim/rionite-snake-case-attribute-name"], root["@riim/map-set-polyfill"], root["@riim/symbol-polyfill"], root["@riim/gettext"], root["cellx"], root["@riim/escape-html"], root["@riim/is-regexp"], root["@riim/defer"], root["@riim/lower-case-first-word"], root["@riim/get-uid"], root["@riim/logger"], root["@riim/move-content"], root["@riim/next-uid"], root["@riim/set-attribute"], root["escape-string"], root["@riim/next-tick"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__4__, __WEBPACK_EXTERNAL_MODULE__5__, __WEBPACK_EXTERNAL_MODULE__7__, __WEBPACK_EXTERNAL_MODULE__8__, __WEBPACK_EXTERNAL_MODULE__11__, __WEBPACK_EXTERNAL_MODULE__16__, __WEBPACK_EXTERNAL_MODULE__20__, __WEBPACK_EXTERNAL_MODULE__21__, __WEBPACK_EXTERNAL_MODULE__25__, __WEBPACK_EXTERNAL_MODULE__27__, __WEBPACK_EXTERNAL_MODULE__29__, __WEBPACK_EXTERNAL_MODULE__30__, __WEBPACK_EXTERNAL_MODULE__31__, __WEBPACK_EXTERNAL_MODULE__32__, __WEBPACK_EXTERNAL_MODULE__35__, __WEBPACK_EXTERNAL_MODULE__37__, __WEBPACK_EXTERNAL_MODULE__50__) {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(1);
__webpack_require__(2);
var DI_1 = __webpack_require__(6);
exports.Container = DI_1.Container;
exports.Inject = DI_1.Inject;
var formatters_1 = __webpack_require__(10);
exports.formatters = formatters_1.formatters;
var Component_1 = __webpack_require__(12);
exports.Component = Component_1.Component;
var Param_1 = __webpack_require__(26);
exports.Param = Param_1.Param;
var Constants_1 = __webpack_require__(22);
exports.KEY_PARAMS_CONFIG = Constants_1.KEY_PARAMS_CONFIG;
exports.KEY_PARAMS = Constants_1.KEY_PARAMS;
var BaseComponent_1 = __webpack_require__(28);
exports.BaseComponent = BaseComponent_1.BaseComponent;
var ElementProtoMixin_1 = __webpack_require__(24);
exports.KEY_ELEMENT_CONNECTED = ElementProtoMixin_1.KEY_ELEMENT_CONNECTED;
var ComponentParams_1 = __webpack_require__(18);
exports.ComponentParams = ComponentParams_1.ComponentParams;
var Template_1 = __webpack_require__(3);
exports.TemplateNodeType = Template_1.NodeType;
exports.Template = Template_1.Template;
var registerComponent_1 = __webpack_require__(13);
exports.registerComponent = registerComponent_1.registerComponent;
var RnIfThen_1 = __webpack_require__(49);
exports.RnIfThen = RnIfThen_1.RnIfThen;
var RnIfElse_1 = __webpack_require__(54);
exports.RnIfElse = RnIfElse_1.RnIfElse;
var RnRepeat_1 = __webpack_require__(53);
exports.RnRepeat = RnRepeat_1.RnRepeat;
var RnSlot_1 = __webpack_require__(55);
exports.RnSlot = RnSlot_1.RnSlot;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

if (!('firstElementChild' in DocumentFragment.prototype)) {
    Object.defineProperty(DocumentFragment.prototype, 'firstElementChild', {
        configurable: true,
        enumerable: false,
        get() {
            for (let child = this.firstChild; child; child = child.nextSibling) {
                if (child.nodeType == Node.ELEMENT_NODE) {
                    return child;
                }
            }
            return null;
        }
    });
}
if (!('nextElementSibling' in DocumentFragment.prototype)) {
    Object.defineProperty(DocumentFragment.prototype, 'nextElementSibling', {
        configurable: true,
        enumerable: false,
        get() {
            for (let child = this.nextSibling; child; child = child.nextSibling) {
                if (child.nodeType == Node.ELEMENT_NODE) {
                    return child;
                }
            }
            return null;
        }
    });
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Template_1 = __webpack_require__(3);
['if-then', 'if-else', 'repeat'].forEach(name => {
    Template_1.Template.helpers[name] = el => {
        let attrs = el.attributes;
        // проверка на attrs для `@/name // ...`
        if (name != 'repeat' && attrs) {
            let list = attrs.list;
            if (list) {
                let index = list['length='] - 1;
                let foundIndex;
                for (; index >= 0; index--) {
                    if (list[index].value == '') {
                        foundIndex = index;
                    }
                    else if (list[index].name == 'if') {
                        break;
                    }
                }
                if (index == -1 && foundIndex !== undefined) {
                    let attr = list[foundIndex];
                    delete list[attr.name];
                    list['if'] = foundIndex;
                    list[foundIndex] = {
                        name: 'if',
                        value: attr.name
                    };
                }
            }
        }
        return [
            {
                nodeType: Template_1.NodeType.ELEMENT,
                isHelper: false,
                tagName: 'template',
                is: 'rn-' + name,
                names: el.names,
                attributes: attrs,
                content: el.content,
                contentTemplateIndex: null
            }
        ];
    };
});
Template_1.Template.helpers.slot = el => {
    return [
        {
            nodeType: Template_1.NodeType.ELEMENT,
            isHelper: false,
            tagName: 'rn-slot',
            is: null,
            names: el.names,
            attributes: el.attributes,
            content: el.content,
            contentTemplateIndex: null
        }
    ];
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const kebab_case_1 = __webpack_require__(4);
const rionite_snake_case_attribute_name_1 = __webpack_require__(5);
var NodeType;
(function (NodeType) {
    NodeType[NodeType["BLOCK"] = 1] = "BLOCK";
    NodeType[NodeType["ELEMENT_CALL"] = 2] = "ELEMENT_CALL";
    NodeType[NodeType["SUPER_CALL"] = 3] = "SUPER_CALL";
    NodeType[NodeType["DEBUGGER_CALL"] = 4] = "DEBUGGER_CALL";
    NodeType[NodeType["ELEMENT"] = 5] = "ELEMENT";
    NodeType[NodeType["TEXT"] = 6] = "TEXT";
})(NodeType = exports.NodeType || (exports.NodeType = {}));
const escapee = {
    __proto__: null,
    '/': '/',
    '\\': '\\',
    b: '\b',
    f: '\f',
    n: '\n',
    r: '\r',
    t: '\t'
};
const reWhitespace = /\s/;
const reTagNameOrNothing = /[a-zA-Z][\-\w]*(?::[a-zA-Z][\-\w]*)?|/g;
const reElementNameOrNothing = /[a-zA-Z][\-\w]*|/g;
const reAttributeNameOrNothing = /[^\s'">/=,)]+|/g;
const reSuperCallOrNothing = /super(?:\.([a-zA-Z][\-\w]*))?!|/g;
function normalizeMultilineText(text) {
    return text
        .trim()
        .replace(/[ \t]*(?:\n|\r\n?)/g, '\n')
        .replace(/\n[ \t]+/g, '\n');
}
exports.ELEMENT_NAME_DELIMITER = '__';
class Template {
    constructor(template, options) {
        this.initialized = false;
        let isEmbedded = (this._isEmbedded = !!(options && options._isEmbedded));
        let parent = (this.parent = (options && options.parent) || null);
        if (typeof template == 'string') {
            this.template = template;
            this.block = null;
        }
        else {
            this.block = template;
            this._elements = template.elements;
        }
        if (isEmbedded) {
            this._elementNamesTemplate = parent._elementNamesTemplate;
        }
        else {
            let blockName = options && options.blockName;
            if (Array.isArray(blockName)) {
                this.setBlockName(blockName);
            }
            else if (parent) {
                this._elementNamesTemplate = blockName
                    ? [blockName + exports.ELEMENT_NAME_DELIMITER].concat(parent._elementNamesTemplate)
                    : parent._elementNamesTemplate.slice();
            }
            else if (blockName) {
                this._elementNamesTemplate = [blockName + exports.ELEMENT_NAME_DELIMITER, ''];
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
        if (!this._isEmbedded) {
            this._elements = parent
                ? { __proto__: parent._elements }
                : {
                    __proto__: null,
                    '@root': {
                        nodeType: NodeType.ELEMENT,
                        isHelper: true,
                        tagName: 'section',
                        is: null,
                        names: ['root'],
                        attributes: null,
                        content: [],
                        contentTemplateIndex: null
                    }
                };
        }
        this._embeddedTemplates = this._isEmbedded
            ? parent._embeddedTemplates
            : parent &&
                parent._embeddedTemplates &&
                parent._embeddedTemplates.map(template => new Template({
                    nodeType: NodeType.BLOCK,
                    content: template.block.content,
                    elements: this._elements
                }, {
                    _isEmbedded: true,
                    parent: this
                }));
    }
    parse(component) {
        this.initialize(component);
        if (this.block) {
            return this.block;
        }
        this._pos = 0;
        this._chr = this.template.charAt(0);
        this._skipWhitespacesAndComments();
        let block = (this.block = {
            nodeType: NodeType.BLOCK,
            content: null,
            elements: this._elements
        });
        this._readContent(this.parent ? null : block.elements['@root'].content, null, false, component && component.constructor);
        return block;
    }
    _readContent(content, superElName, brackets, componentConstr) {
        if (brackets) {
            this._next('{');
            this._skipWhitespacesAndComments();
        }
        for (;;) {
            switch (this._chr) {
                case "'":
                case '"':
                case '`': {
                    (content || (content = [])).push({
                        nodeType: NodeType.TEXT,
                        value: this._readString()
                    });
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
                        (content || (content = [])).push({ nodeType: NodeType.DEBUGGER_CALL });
                        break;
                    }
                    if (brackets) {
                        if (chr == '}') {
                            this._next();
                            return content;
                        }
                        let superCall = this._readSuperCall(superElName);
                        if (superCall) {
                            (content || (content = [])).push(superCall);
                            break;
                        }
                    }
                    content = this._readElement(content, superElName, componentConstr);
                    break;
                }
            }
            this._skipWhitespacesAndComments();
        }
    }
    _readElement(targetContent, superElName, componentConstr) {
        let pos = this._pos;
        let isHelper = this._chr == '@';
        if (isHelper) {
            this._next();
        }
        let tagName = this._readName(reTagNameOrNothing);
        let elNames;
        let elName;
        if (this._chr == '/') {
            this._next();
            let pos = this._pos;
            this._skipWhitespaces();
            if (this._chr == ',') {
                this._next();
                this._skipWhitespaces();
                elNames = [null];
            }
            for (let name; (name = this._readName(reElementNameOrNothing));) {
                (elNames || (elNames = [])).push(name);
                if (this._skipWhitespaces() != ',') {
                    break;
                }
                this._next();
                this._skipWhitespaces();
            }
            if (!elNames || (!elNames[0] && elNames.length == 1)) {
                this._throwError('Expected element name', pos);
            }
            elName = isHelper ? elNames[0] && '@' + elNames[0] : elNames[0];
        }
        else {
            this._skipWhitespacesAndComments();
        }
        if (tagName) {
            tagName = kebab_case_1.kebabCase(tagName, true);
        }
        else {
            if (!elName) {
                this._throwError('Expected element', pos);
            }
            if (!this.parent ||
                !(tagName = (this.parent._elements[elName] || { __proto__: null }).tagName)) {
                this._throwError('Element.tagName is required', isHelper ? pos + 1 : pos);
                throw 1;
            }
        }
        let attrs;
        if (this._chr == '(') {
            attrs = this._readAttributes(elName || superElName, isHelper);
            this._skipWhitespaces();
        }
        if (elNames && componentConstr) {
            let events = componentConstr.events;
            let domEvents = componentConstr.domEvents;
            if (events || domEvents) {
                for (let name of elNames) {
                    if (!name) {
                        continue;
                    }
                    if (events && events[name]) {
                        let attrList = (attrs ||
                            (attrs = {
                                isAttributeValue: null,
                                list: { __proto__: null, 'length=': 0 }
                            })).list;
                        for (let type in events[name]) {
                            let attrName = 'oncomponent-' +
                                (type.charAt(0) == '<'
                                    ? type.slice(type.indexOf('>', 2) + 1)
                                    : type);
                            attrList[attrList[attrName] === undefined
                                ? (attrList[attrName] = attrList['length=']++)
                                : attrList[attrName]] = {
                                name: attrName,
                                value: ':' + name
                            };
                        }
                    }
                    if (domEvents && domEvents[name]) {
                        let attrList = (attrs ||
                            (attrs = {
                                isAttributeValue: null,
                                list: { __proto__: null, 'length=': 0 }
                            })).list;
                        for (let type in domEvents[name]) {
                            let attrName = 'on-' + type;
                            attrList[attrList[attrName] === undefined
                                ? (attrList[attrName] = attrList['length=']++)
                                : attrList[attrName]] = {
                                name: attrName,
                                value: ':' + name
                            };
                        }
                    }
                }
            }
        }
        let content;
        if (this._chr == '{') {
            content = this._readContent(null, elName || superElName, true, componentConstr);
        }
        let el;
        if (isHelper) {
            let helper = Template.helpers[tagName];
            if (!helper) {
                this._throwError(`Helper "${tagName}" is not defined`, pos);
            }
            el = {
                nodeType: NodeType.ELEMENT,
                isHelper: true,
                tagName,
                is: (attrs && attrs.isAttributeValue) || null,
                names: elNames || null,
                attributes: attrs || null,
                content: content || null,
                contentTemplateIndex: null
            };
            content = helper(el);
            if (content && content.length) {
                el.content = content;
                for (let i = 0, l = content.length; i < l; i++) {
                    let node = content[i];
                    if (node.nodeType == NodeType.ELEMENT) {
                        if (node.content &&
                            (node.tagName == 'template' ||
                                node.tagName == 'rn-slot')) {
                            let el = {
                                nodeType: NodeType.ELEMENT,
                                isHelper: false,
                                tagName: node.tagName,
                                is: node.is,
                                names: node.names,
                                attributes: node.attributes,
                                content: node.content,
                                contentTemplateIndex: (this._embeddedTemplates || (this._embeddedTemplates = [])).push(new Template({
                                    nodeType: NodeType.BLOCK,
                                    content: node.content,
                                    elements: this._elements
                                }, {
                                    _isEmbedded: true,
                                    parent: this
                                })) - 1
                            };
                            let elName = el.names && el.names[0];
                            if (elName) {
                                this._elements[elName] = el;
                                content[i] = {
                                    nodeType: NodeType.ELEMENT_CALL,
                                    name: elName
                                };
                            }
                            else {
                                content[i] = el;
                            }
                        }
                        else {
                            let elName = node.names && node.names[0];
                            if (elName) {
                                this._elements[elName] = node;
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
            el = {
                nodeType: NodeType.ELEMENT,
                isHelper: false,
                tagName,
                is: (attrs && attrs.isAttributeValue) || null,
                names: elNames || null,
                attributes: attrs || null,
                content: content || null,
                contentTemplateIndex: content && (tagName == 'template' || tagName == 'rn-slot')
                    ? (this._embeddedTemplates || (this._embeddedTemplates = [])).push(new Template({
                        nodeType: NodeType.BLOCK,
                        content,
                        elements: this._elements
                    }, {
                        _isEmbedded: true,
                        parent: this
                    })) - 1
                    : null
            };
        }
        if (elName) {
            this._elements[elName] = el;
            (targetContent || (targetContent = [])).push({
                nodeType: NodeType.ELEMENT_CALL,
                name: elName
            });
        }
        else {
            (targetContent || (targetContent = [])).push(el);
        }
        return targetContent;
    }
    _readAttributes(superElName, isElementHelper) {
        this._next('(');
        if (this._skipWhitespacesAndComments() == ')') {
            this._next();
            return null;
        }
        let superCall;
        let isAttrValue;
        let list;
        loop: for (let f = true;;) {
            if (f && this._chr == 's' && (superCall = this._readSuperCall(superElName))) {
                let superElAttrs = superCall.element.attributes;
                if (superElAttrs) {
                    isAttrValue = superElAttrs.isAttributeValue;
                    list = { __proto__: superElAttrs.list };
                }
                this._skipWhitespacesAndComments();
            }
            else {
                let name = this._readName(reAttributeNameOrNothing);
                if (!name) {
                    this._throwError('Expected attribute name');
                    throw 1;
                }
                if (this._skipWhitespacesAndComments() == '=') {
                    this._next();
                    let chr = this._skipWhitespaces();
                    if (chr == "'" || chr == '"' || chr == '`') {
                        if (name == 'is') {
                            isAttrValue = this._readString();
                        }
                        else {
                            (list || (list = { __proto__: null, 'length=': 0 }))[list[name] === undefined
                                ? (list[name] = list['length=']++)
                                : list[name]] = {
                                name,
                                value: this._readString()
                            };
                        }
                        this._skipWhitespacesAndComments();
                    }
                    else {
                        let value = '';
                        for (;;) {
                            if (!chr) {
                                this._throwError('Unexpected end of template. Expected "," or ")" to finalize attribute value.');
                            }
                            if (chr == ',' || chr == ')' || chr == '\n' || chr == '\r') {
                                if (name == 'is') {
                                    isAttrValue = value.trim();
                                }
                                else {
                                    (list || (list = { __proto__: null, 'length=': 0 }))[list[name] === undefined
                                        ? (list[name] = list['length=']++)
                                        : list[name]] = {
                                        name,
                                        value: value.trim()
                                    };
                                }
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
                else if (name == 'is') {
                    isAttrValue = '';
                }
                else {
                    (list || (list = { __proto__: null, 'length=': 0 }))[list[name] === undefined ? (list[name] = list['length=']++) : list[name]] = {
                        name,
                        value: ''
                    };
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
            if (f) {
                f = false;
            }
        }
        return isAttrValue == null && !list
            ? null
            : {
                isAttributeValue: isAttrValue || null,
                list: list || null
            };
    }
    _readSuperCall(defaultElName) {
        reSuperCallOrNothing.lastIndex = this._pos;
        let match = reSuperCallOrNothing.exec(this.template);
        if (match[0]) {
            if (!this.parent) {
                this._throwError('SuperCall is impossible if no parent is defined');
            }
            let elName = match[1] ||
                defaultElName ||
                this._throwError('SuperCall.elementName is required');
            let el = (elName.charAt(0) == '@' && this.parent._elements[elName.slice(1)]) ||
                this.parent._elements[elName];
            if (!el) {
                this._throwError(`Element "${elName}" is not defined`);
            }
            this._chr = this.template.charAt((this._pos = reSuperCallOrNothing.lastIndex));
            return {
                nodeType: NodeType.SUPER_CALL,
                elementName: elName,
                element: el
            };
        }
        return null;
    }
    _readName(reNameOrNothing) {
        reNameOrNothing.lastIndex = this._pos;
        let name = reNameOrNothing.exec(this.template)[0];
        if (name) {
            this._chr = this.template.charAt((this._pos = reNameOrNothing.lastIndex));
            return name;
        }
        return null;
    }
    _readString() {
        let quoteChar = this._chr;
        // if (process.env.DEBUG && quoteChar != "'" && quoteChar != '"' && quoteChar != '`') {
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
                    let hexadecimal = chr == 'x';
                    let code = parseInt(this.template.slice(pos, pos + (hexadecimal ? 2 : 4)), 16);
                    if (!isFinite(code)) {
                        this._throwError(`Invalid ${hexadecimal ? 'hexadecimal' : 'unicode'} escape sequence`, pos);
                    }
                    str += String.fromCharCode(code);
                    chr = this._chr = this.template.charAt((this._pos = pos + (hexadecimal ? 2 : 4)));
                }
                else if (chr in escapee) {
                    str += escapee[chr];
                    chr = this._next();
                }
                else {
                    this._throwError('Invalid escape sequence', this._pos - 1);
                }
            }
            else {
                if (quoteChar != '`' && (chr == '\n' || chr == '\r')) {
                    this._throwError('Unexpected line break in string literal');
                }
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
    _next(current) {
        if (current && current != this._chr) {
            this._throwError(`Expected "${current}" instead of "${this._chr}"`);
        }
        return (this._chr = this.template.charAt(++this._pos));
    }
    _throwError(msg, pos = this._pos) {
        let n = pos < 40 ? 40 - pos : 0;
        throw new SyntaxError(msg +
            '\n' +
            this.template
                .slice(pos < 40 ? 0 : pos - 40, pos + 20)
                .replace(/\t/g, ' ')
                .replace(/\n|\r\n?/g, match => {
                if (match.length == 2) {
                    n++;
                }
                return '↵';
            }) +
            '\n' +
            '----------------------------------------'.slice(n) +
            '↑');
    }
    extend(template, options) {
        return new Template(template, {
            __proto__: options,
            parent: this
        });
    }
    setBlockName(blockName) {
        if (Array.isArray(blockName)) {
            (this._elementNamesTemplate = blockName.map(blockName => blockName + exports.ELEMENT_NAME_DELIMITER)).push('');
        }
        else {
            this._elementNamesTemplate[0] = blockName + exports.ELEMENT_NAME_DELIMITER;
        }
        return this;
    }
    render(component) {
        let block = this.parse(component);
        return renderContent(document.createDocumentFragment(), this, block.content || block.elements['@root'].content);
    }
}
Template.helpers = {
    section: el => el.content
};
exports.Template = Template;
function renderContent(targetNode, template, content, isSVG) {
    if (content) {
        for (let node of content) {
            switch (node.nodeType) {
                case NodeType.ELEMENT_CALL: {
                    node = template._elements[node.name];
                    break;
                }
                case NodeType.SUPER_CALL: {
                    renderContent(targetNode, template, node.element.content, isSVG);
                    continue;
                }
            }
            switch (node.nodeType) {
                case NodeType.ELEMENT: {
                    if (node.isHelper) {
                        renderContent(targetNode, template, node.content, isSVG);
                    }
                    else {
                        if (node.tagName == 'svg') {
                            isSVG = true;
                        }
                        let el;
                        if (isSVG) {
                            el = document.createElementNS('http://www.w3.org/2000/svg', node.tagName);
                        }
                        else if (node.is) {
                            el = window.innerHTML(document.createElement('div'), `<${node.tagName} is="${node.is}">`).firstChild;
                        }
                        else {
                            el = document.createElement(node.tagName);
                        }
                        if (node.names) {
                            if (isSVG) {
                                el.setAttribute('class', renderElementClasses(template._elementNamesTemplate, node.names));
                            }
                            else {
                                el.className = renderElementClasses(template._elementNamesTemplate, node.names);
                            }
                        }
                        let attrList = node.attributes && node.attributes.list;
                        if (attrList) {
                            for (let i = 0, l = attrList['length=']; i < l; i++) {
                                let attr = attrList[i];
                                let attrName = attr.name;
                                if (isSVG) {
                                    if (attrName == 'xlink:href' ||
                                        attrName == 'href' ||
                                        attrName == 'xmlns') {
                                        el.setAttributeNS(attrName == 'xmlns'
                                            ? 'http://www.w3.org/2000/xmlns/'
                                            : 'http://www.w3.org/1999/xlink', attrName, attr.value);
                                    }
                                    else if (attrName == 'class') {
                                        el.setAttribute(attrName, (el.getAttribute('class') || '') + attr.value);
                                    }
                                    else {
                                        el.setAttribute(attrName, attr.value);
                                    }
                                }
                                else if (attrName == 'class') {
                                    el.className += attr.value;
                                }
                                else {
                                    el.setAttribute(rionite_snake_case_attribute_name_1.snakeCaseAttributeName(attrName, true), attr.value);
                                }
                            }
                        }
                        if (node.contentTemplateIndex !== null) {
                            el.contentTemplate = template._embeddedTemplates[node.contentTemplateIndex];
                        }
                        else {
                            renderContent(el, template, node.content, isSVG);
                        }
                        targetNode.appendChild(el);
                    }
                    break;
                }
                case NodeType.TEXT: {
                    targetNode.appendChild(document.createTextNode(node.value));
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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__4__;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__5__;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const map_set_polyfill_1 = __webpack_require__(7);
const symbol_polyfill_1 = __webpack_require__(8);
const Features_1 = __webpack_require__(9);
class Container {
    static registerService(key, service) {
        this._services.set(key, service);
        return this;
    }
    static get(key, args) {
        let service = this._services.get(key) || key;
        return (service.$instance ||
            (Features_1.reflectConstructFeature
                ? Reflect.construct(service, args || [])
                : service.apply(Object.create(service.prototype), args)));
    }
    static reset() {
        this._services.clear();
        return this;
    }
}
Container._services = new map_set_polyfill_1.Map();
exports.Container = Container;
function Inject(target, propertyName, propertyDesc) {
    let type = Reflect.getMetadata('design:type', target, propertyName);
    const KEY_INSTANCE = symbol_polyfill_1.Symbol(`Rionite/Inject[instance:${propertyName}]`);
    return {
        configurable: propertyDesc && propertyDesc.configurable !== undefined
            ? propertyDesc.configurable
            : true,
        enumerable: propertyDesc && propertyDesc.enumerable !== undefined ? propertyDesc.enumerable : true,
        get() {
            return this[KEY_INSTANCE] || (this[KEY_INSTANCE] = Container.get(type));
        }
    };
}
exports.Inject = Inject;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7__;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8__;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.reflectConstructFeature = typeof Reflect == 'object' &&
    Reflect.construct &&
    Reflect.construct.toString().indexOf('[native code]') != -1;
let nativeCustomElementsFeature_ = false;
const TestNativeCustomElementsFeature = exports.reflectConstructFeature
    ? function TestNativeCustomElementsFeature(self) {
        return Reflect.construct(HTMLElement, [self], TestNativeCustomElementsFeature);
    }
    : function TestNativeCustomElementsFeature(self) {
        return HTMLElement.call(this, self);
    };
Object.defineProperty(TestNativeCustomElementsFeature, 'observedAttributes', {
    get() {
        return ['test'];
    }
});
TestNativeCustomElementsFeature.prototype = Object.create(HTMLElement.prototype);
TestNativeCustomElementsFeature.prototype.constructor = TestNativeCustomElementsFeature;
TestNativeCustomElementsFeature.prototype.attributeChangedCallback = () => {
    nativeCustomElementsFeature_ = true;
};
window.customElements.define('test-native-custom-elements-feature', TestNativeCustomElementsFeature);
document.createElement('test-native-custom-elements-feature').setAttribute('test', '');
exports.nativeCustomElementsFeature = nativeCustomElementsFeature_;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const gettext_1 = __webpack_require__(11);
exports.formatters = {
    default(value, arg) {
        return value === undefined ? arg : value;
    },
    placeholder(value, arg) {
        return value === null ? arg : value;
    },
    or(value, arg) {
        return value || arg;
    },
    cond(condition, value1, value2) {
        return condition ? value1 : value2;
    },
    not(value) {
        return !value;
    },
    notnot(value) {
        return !!value;
    },
    eq(value, arg) {
        return value == arg;
    },
    identical(value, arg) {
        return value === arg;
    },
    lt(value, arg) {
        return value < arg;
    },
    lte(value, arg) {
        return value <= arg;
    },
    gt(value, arg) {
        return value > arg;
    },
    gte(value, arg) {
        return value >= arg;
    },
    has(obj, key) {
        return !!obj && (typeof obj.has == 'function' ? obj.has(key) : obj.hasOwnProperty(key));
    },
    get(obj, key) {
        return obj && (typeof obj.get == 'function' ? obj.get(key) : obj[key]);
    },
    key(obj, key) {
        return obj && obj[key];
    },
    join(arr, separator = ', ') {
        return arr && arr.join(separator);
    },
    dump(value) {
        return value == null ? value : JSON.stringify(value);
    },
    t(msgid, ...args) {
        return gettext_1.getText('', msgid, args);
    },
    pt(msgid, msgctxt, ...args) {
        return gettext_1.getText(msgctxt, msgid, args);
    }
};
exports.formatters.seq = exports.formatters.identical;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__11__;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const registerComponent_1 = __webpack_require__(13);
function Component(config) {
    return (componentConstr) => {
        if (config) {
            if (config.elementIs !== undefined) {
                componentConstr.elementIs = config.elementIs;
            }
            if (config.elementExtends !== undefined) {
                componentConstr.elementExtends = config.elementExtends;
            }
            if (config.params !== undefined) {
                componentConstr.params = config.params;
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
            if (config.domEvents !== undefined) {
                componentConstr.domEvents = config.domEvents;
            }
        }
        registerComponent_1.registerComponent(componentConstr);
    };
}
exports.Component = Component;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const kebab_case_1 = __webpack_require__(4);
const pascalize_1 = __webpack_require__(14);
const rionite_snake_case_attribute_name_1 = __webpack_require__(5);
const cellx_1 = __webpack_require__(16);
const componentConstructorMap_1 = __webpack_require__(17);
const ComponentParams_1 = __webpack_require__(18);
const Constants_1 = __webpack_require__(22);
const elementConstructorMap_1 = __webpack_require__(23);
const ElementProtoMixin_1 = __webpack_require__(24);
const Features_1 = __webpack_require__(9);
const Template_1 = __webpack_require__(3);
const push = Array.prototype.push;
function inheritProperty(target, source, name, depth) {
    let obj = target[name];
    let parentObj = source[name];
    if (obj && parentObj && obj != parentObj) {
        let o = (target[name] = { __proto__: parentObj });
        for (let key in obj) {
            o[key] = obj[key];
            if (depth) {
                inheritProperty(o, parentObj, key, depth - 1);
            }
        }
    }
}
function registerComponent(componentConstr) {
    let elIs = componentConstr.hasOwnProperty('elementIs')
        ? componentConstr.elementIs
        : (componentConstr.elementIs = componentConstr.name);
    if (!elIs) {
        throw new TypeError('Static property "elementIs" is required');
    }
    let kebabCaseElIs = kebab_case_1.kebabCase(elIs, true);
    if (componentConstructorMap_1.componentConstructorMap.has(kebabCaseElIs)) {
        throw new TypeError(`Component "${kebabCaseElIs}" already registered`);
    }
    let componentProto = componentConstr.prototype;
    let parentComponentConstr = Object.getPrototypeOf(componentProto)
        .constructor;
    inheritProperty(componentConstr, parentComponentConstr, 'params', 0);
    let paramsConfig = componentConstr.params;
    if (paramsConfig) {
        for (let name in paramsConfig) {
            let paramConfig = paramsConfig[name];
            if (paramConfig === null) {
                let parentParamConfig = parentComponentConstr.params && parentComponentConstr.params[name];
                if (parentParamConfig != null) {
                    Object.defineProperty(componentProto, (typeof parentParamConfig == 'object' &&
                        (parentParamConfig.type || parentParamConfig.default !== undefined) &&
                        parentParamConfig.property) ||
                        name, {
                        configurable: true,
                        enumerable: true,
                        writable: true,
                        value: null
                    });
                }
            }
            else {
                let snakeCaseName = rionite_snake_case_attribute_name_1.snakeCaseAttributeName(name, true);
                let isObject = typeof paramConfig == 'object' &&
                    (!!paramConfig.type || paramConfig.default !== undefined);
                let propertyName = (isObject && paramConfig.property) || name;
                let required;
                let readonly;
                if (isObject) {
                    required = paramConfig.required || false;
                    readonly = paramConfig.readonly || false;
                }
                else {
                    required = readonly = false;
                }
                let $paramConfig = ((componentConstr.hasOwnProperty(Constants_1.KEY_PARAMS_CONFIG)
                    ? componentConstr[Constants_1.KEY_PARAMS_CONFIG]
                    : (componentConstr[Constants_1.KEY_PARAMS_CONFIG] = Object.create(null)))[name] = componentConstr[Constants_1.KEY_PARAMS_CONFIG][snakeCaseName] = {
                    name,
                    property: propertyName,
                    type: undefined,
                    typeSerializer: undefined,
                    default: undefined,
                    required,
                    readonly,
                    paramConfig: paramsConfig[name]
                });
                let descriptor;
                if (readonly) {
                    descriptor = {
                        configurable: true,
                        enumerable: true,
                        get() {
                            return this[Constants_1.KEY_PARAMS].get(name);
                        },
                        set(value) {
                            if (this[ComponentParams_1.KEY_COMPONENT_PARAMS_INITED]) {
                                if (value !== this[Constants_1.KEY_PARAMS].get(name)) {
                                    throw new TypeError(`Parameter "${name}" is readonly`);
                                }
                            }
                            else {
                                this[Constants_1.KEY_PARAMS].set(name, value);
                            }
                        }
                    };
                }
                else {
                    Object.defineProperty(componentProto, propertyName + 'Cell', {
                        configurable: true,
                        enumerable: false,
                        writable: true,
                        value: undefined
                    });
                    descriptor = {
                        configurable: true,
                        enumerable: true,
                        get() {
                            let valueCell = this[propertyName + 'Cell'];
                            if (valueCell) {
                                return valueCell.get();
                            }
                            let currentlyPulling = cellx_1.Cell.currentlyPulling;
                            let value = this[Constants_1.KEY_PARAMS].get(name);
                            if (currentlyPulling || cellx_1.EventEmitter.currentlySubscribing) {
                                valueCell = new cellx_1.Cell(value, { context: this });
                                Object.defineProperty(this, propertyName + 'Cell', {
                                    configurable: true,
                                    enumerable: false,
                                    writable: true,
                                    value: valueCell
                                });
                                if (currentlyPulling) {
                                    return valueCell.get();
                                }
                            }
                            return value;
                        },
                        set(value) {
                            if (this[ComponentParams_1.KEY_COMPONENT_PARAMS_INITED]) {
                                let rawValue = $paramConfig.typeSerializer.write(value, $paramConfig.default);
                                if (rawValue === null) {
                                    this.element.removeAttribute(snakeCaseName);
                                }
                                else {
                                    this.element.setAttribute(snakeCaseName, rawValue);
                                }
                                let valueCell = this[propertyName + 'Cell'];
                                if (valueCell) {
                                    valueCell.set(value);
                                }
                                else {
                                    this[Constants_1.KEY_PARAMS].set(name, value);
                                }
                            }
                            else {
                                this[Constants_1.KEY_PARAMS].set(name, value);
                            }
                        }
                    };
                }
                Object.defineProperty(componentProto, propertyName, descriptor);
            }
        }
    }
    inheritProperty(componentConstr, parentComponentConstr, 'i18n', 0);
    componentConstr._blockNamesString =
        elIs + ' ' + (parentComponentConstr._blockNamesString || '');
    componentConstr._elementBlockNames = [elIs];
    if (parentComponentConstr._elementBlockNames) {
        push.apply(componentConstr._elementBlockNames, parentComponentConstr._elementBlockNames);
    }
    let template = componentConstr.template;
    if (template !== null) {
        if (template === parentComponentConstr.template) {
            componentConstr.template = template.extend('', {
                blockName: elIs
            });
        }
        else if (template instanceof Template_1.Template) {
            template.setBlockName(componentConstr._elementBlockNames);
        }
        else {
            componentConstr.template = parentComponentConstr.template
                ? parentComponentConstr.template.extend(template, {
                    blockName: elIs
                })
                : new Template_1.Template(template, { blockName: componentConstr._elementBlockNames });
        }
    }
    inheritProperty(componentConstr, parentComponentConstr, 'events', 1);
    inheritProperty(componentConstr, parentComponentConstr, 'domEvents', 1);
    let elExtends = componentConstr.elementExtends;
    let parentElConstr;
    if (elExtends) {
        parentElConstr =
            elementConstructorMap_1.elementConstructorMap.get(elExtends) || window[`HTML${pascalize_1.pascalize(elExtends)}Element`];
        if (!parentElConstr) {
            throw new TypeError(`Component "${elExtends}" is not registered`);
        }
    }
    else {
        parentElConstr = HTMLElement;
    }
    let elConstr = Features_1.reflectConstructFeature
        ? function _(self) {
            return Reflect.construct(parentElConstr, [self], _);
        }
        : function (self) {
            return parentElConstr.call(this, self);
        };
    elConstr._rioniteComponentConstructor = componentConstr;
    Object.defineProperty(elConstr, 'observedAttributes', {
        configurable: true,
        enumerable: true,
        get() {
            let paramsConfig = componentConstr.params;
            if (!paramsConfig) {
                return [];
            }
            let attrs = [];
            for (let name in paramsConfig) {
                attrs.push(rionite_snake_case_attribute_name_1.snakeCaseAttributeName(name, true));
            }
            return attrs;
        }
    });
    let elProto = (elConstr.prototype = Object.create(parentElConstr.prototype));
    elProto.constructor = elConstr;
    let names = Object.getOwnPropertyNames(ElementProtoMixin_1.ElementProtoMixin);
    for (let i = 0, l = names.length; i < l; i++) {
        Object.defineProperty(elProto, names[i], Object.getOwnPropertyDescriptor(ElementProtoMixin_1.ElementProtoMixin, names[i]));
    }
    names = Object.getOwnPropertySymbols(ElementProtoMixin_1.ElementProtoMixin);
    for (let i = 0, l = names.length; i < l; i++) {
        Object.defineProperty(elProto, names[i], Object.getOwnPropertyDescriptor(ElementProtoMixin_1.ElementProtoMixin, names[i]));
    }
    window.customElements.define(kebabCaseElIs, elConstr, elExtends ? { extends: elExtends } : undefined);
    componentConstructorMap_1.componentConstructorMap.set(elIs, componentConstr).set(kebabCaseElIs, componentConstr);
    elementConstructorMap_1.elementConstructorMap.set(elIs, elConstr);
    return componentConstr;
}
exports.registerComponent = registerComponent;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var camelize_1 = __webpack_require__(15);
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
/* 16 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__16__;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const map_set_polyfill_1 = __webpack_require__(7);
exports.componentConstructorMap = new map_set_polyfill_1.Map();


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const rionite_snake_case_attribute_name_1 = __webpack_require__(5);
const symbol_polyfill_1 = __webpack_require__(8);
const componentParamTypeSerializerMap_1 = __webpack_require__(19);
const Constants_1 = __webpack_require__(22);
exports.KEY_COMPONENT_PARAMS_INITED = symbol_polyfill_1.Symbol('Rionite/ComponentParams[componentParamsInited]');
function initParam(component, $paramConfig, name) {
    if ($paramConfig === null) {
        return;
    }
    let typeSerializer = $paramConfig.typeSerializer;
    let defaultValue;
    if (typeSerializer) {
        defaultValue = $paramConfig.default;
    }
    else {
        let paramConfig = $paramConfig.paramConfig;
        let type = typeof paramConfig;
        defaultValue = component[$paramConfig.property];
        let isObject = type == 'object' &&
            (!!paramConfig.type ||
                paramConfig.default !== undefined);
        if (defaultValue === undefined) {
            if (isObject) {
                defaultValue = paramConfig.default;
            }
            else if (type != 'function') {
                defaultValue = paramConfig;
            }
        }
        type = isObject ? paramConfig.type : paramConfig;
        if (defaultValue !== undefined && type !== eval) {
            type = typeof defaultValue;
        }
        typeSerializer = componentParamTypeSerializerMap_1.componentParamTypeSerializerMap.get(type);
        if (!typeSerializer) {
            throw new TypeError('Unsupported parameter type');
        }
        $paramConfig.type = type;
        $paramConfig.typeSerializer = typeSerializer;
        $paramConfig.default = defaultValue;
    }
    let el = component.element;
    let snakeCaseName = rionite_snake_case_attribute_name_1.snakeCaseAttributeName(name, true);
    let rawValue = el.getAttribute(snakeCaseName);
    if (rawValue === null) {
        if ($paramConfig.required) {
            throw new TypeError(`Parameter "${name}" is required`);
        }
        if (defaultValue != null && defaultValue !== false) {
            el.setAttribute(snakeCaseName, typeSerializer.write(defaultValue));
        }
    }
    component[Constants_1.KEY_PARAMS].set(name, typeSerializer.read(rawValue, defaultValue, el));
}
exports.ComponentParams = {
    init(component) {
        if (component[exports.KEY_COMPONENT_PARAMS_INITED]) {
            return;
        }
        let paramsConfig = component.constructor.params;
        if (paramsConfig) {
            let $paramsConfig = component.constructor[Constants_1.KEY_PARAMS_CONFIG];
            for (let name in paramsConfig) {
                initParam(component, $paramsConfig[name], name);
            }
        }
        component[exports.KEY_COMPONENT_PARAMS_INITED] = true;
    }
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const escape_html_1 = __webpack_require__(20);
const is_regexp_1 = __webpack_require__(21);
const map_set_polyfill_1 = __webpack_require__(7);
const symbol_polyfill_1 = __webpack_require__(8);
exports.KEY_COMPONENT_PARAM_VALUE_MAP = symbol_polyfill_1.Symbol('Rionite/componentParamTypeSerializerMap[componentParamValueMap]');
exports.componentParamTypeSerializerMap = new map_set_polyfill_1.Map([
    [
        Boolean,
        {
            read: (rawValue, defaultValue) => {
                return rawValue !== null ? rawValue != 'no' : !!defaultValue;
            },
            write: (value, defaultValue) => {
                return value ? '' : defaultValue ? 'no' : null;
            }
        }
    ],
    [
        Number,
        {
            read: (rawValue, defaultValue) => {
                return rawValue !== null
                    ? +rawValue
                    : defaultValue !== undefined
                        ? defaultValue
                        : null;
            },
            write: (value) => {
                return value != null ? +value + '' : null;
            }
        }
    ],
    [
        String,
        {
            read: (rawValue, defaultValue) => {
                return rawValue !== null
                    ? rawValue
                    : defaultValue !== undefined
                        ? defaultValue
                        : null;
            },
            write: (value) => {
                return value != null ? value + '' : null;
            }
        }
    ],
    [
        Object,
        {
            read: (rawValue, defaultValue, el) => {
                if (!rawValue) {
                    return defaultValue || null;
                }
                let value = (el[exports.KEY_COMPONENT_PARAM_VALUE_MAP] || Object.create(null))[rawValue];
                if (!value) {
                    throw new TypeError('Value is not an object');
                }
                return value;
            },
            write: (value) => {
                return value != null ? '' : null;
            }
        }
    ],
    [
        eval,
        {
            read: (rawValue, defaultValue) => {
                return rawValue !== null
                    ? Function(`return ${escape_html_1.unescapeHTML(rawValue)};`)()
                    : defaultValue !== undefined
                        ? defaultValue
                        : null;
            },
            write: (value) => {
                return value != null
                    ? escape_html_1.escapeHTML(is_regexp_1.isRegExp(value) ? value.toString() : JSON.stringify(value))
                    : null;
            }
        }
    ]
]);
exports.componentParamTypeSerializerMap.set('boolean', exports.componentParamTypeSerializerMap.get(Boolean));
exports.componentParamTypeSerializerMap.set('number', exports.componentParamTypeSerializerMap.get(Number));
exports.componentParamTypeSerializerMap.set('string', exports.componentParamTypeSerializerMap.get(String));
exports.componentParamTypeSerializerMap.set('object', exports.componentParamTypeSerializerMap.get(Object));


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__20__;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__21__;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const symbol_polyfill_1 = __webpack_require__(8);
exports.KEY_PARAMS_CONFIG = symbol_polyfill_1.Symbol('Rionite/BaseComponent[paramsConfig]');
exports.KEY_PARAMS = symbol_polyfill_1.Symbol('Rionite/BaseComponent[params]');
exports.KEY_CHILD_COMPONENTS = symbol_polyfill_1.Symbol('Rionite/BaseComponent[childComponents]');


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const map_set_polyfill_1 = __webpack_require__(7);
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


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const defer_1 = __webpack_require__(25);
const symbol_polyfill_1 = __webpack_require__(8);
const ComponentParams_1 = __webpack_require__(18);
const Constants_1 = __webpack_require__(22);
const DI_1 = __webpack_require__(6);
const Features_1 = __webpack_require__(9);
// export const KEY_IS_COMPONENT_ELEMENT = Symbol('Rionite/ElementProtoMixin[isComponentElement]');
exports.KEY_ELEMENT_CONNECTED = symbol_polyfill_1.Symbol('Rionite/ElementProtoMixin[elementConnected]');
let connectionStatusCallbacksSuppressed = false;
function suppressConnectionStatusCallbacks() {
    connectionStatusCallbacksSuppressed = true;
}
exports.suppressConnectionStatusCallbacks = suppressConnectionStatusCallbacks;
function resumeConnectionStatusCallbacks() {
    connectionStatusCallbacksSuppressed = false;
}
exports.resumeConnectionStatusCallbacks = resumeConnectionStatusCallbacks;
exports.ElementProtoMixin = {
    // [KEY_IS_COMPONENT_ELEMENT]: true,
    $component: null,
    get rioniteComponent() {
        return (this.$component || DI_1.Container.get(this.constructor._rioniteComponentConstructor, [this]));
    },
    [exports.KEY_ELEMENT_CONNECTED]: false,
    connectedCallback() {
        this[exports.KEY_ELEMENT_CONNECTED] = true;
        if (connectionStatusCallbacksSuppressed) {
            return;
        }
        let component = this.$component;
        if (component) {
            ComponentParams_1.ComponentParams.init(component);
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
            defer_1.defer(() => {
                if (this[exports.KEY_ELEMENT_CONNECTED]) {
                    let component = this.rioniteComponent;
                    component._parentComponent = undefined;
                    if (!component.parentComponent && !component._attached) {
                        ComponentParams_1.ComponentParams.init(component);
                        component.elementConnected();
                        component._attach();
                    }
                }
            });
        }
    },
    disconnectedCallback() {
        this[exports.KEY_ELEMENT_CONNECTED] = false;
        if (connectionStatusCallbacksSuppressed) {
            return;
        }
        let component = this.$component;
        if (component && component._attached) {
            component._parentComponent = null;
            component.elementDisconnected();
            defer_1.defer(() => {
                if (component._parentComponent === null && component._attached) {
                    component._detach();
                }
            });
        }
    },
    attributeChangedCallback(name, _prevRawValue, rawValue) {
        let component = this.$component;
        if (component && component.isReady) {
            let $paramConfig = component.constructor[Constants_1.KEY_PARAMS_CONFIG][name];
            if ($paramConfig.readonly) {
                if (Features_1.nativeCustomElementsFeature) {
                    throw new TypeError(`Cannot write to readonly parameter "${$paramConfig.name}"`);
                }
            }
            else {
                let valueCell = component[$paramConfig.property + 'Cell'];
                let value = $paramConfig.typeSerializer.read(rawValue, $paramConfig.default, this);
                if (valueCell) {
                    valueCell.set(value);
                }
                else {
                    component[Constants_1.KEY_PARAMS].set($paramConfig.name, value);
                }
            }
        }
    }
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__25__;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lower_case_first_word_1 = __webpack_require__(27);
const map_set_polyfill_1 = __webpack_require__(7);
const types = new map_set_polyfill_1.Set([Boolean, Number, String, Object]);
const prefix = 'param';
const prefixLength = prefix.length;
function Param(target, propertyName, _propertyDesc, name, config) {
    if (typeof propertyName != 'string') {
        if (target && typeof target != 'string') {
            config = target;
        }
        else {
            name = target;
            config = propertyName;
        }
        return (target, propertyName, propertyDesc) => Param(target, propertyName, propertyDesc, name, config);
    }
    if (!config) {
        config = {};
    }
    else if (typeof config == 'function') {
        config = { type: config };
    }
    config.property = propertyName;
    if (!config.type) {
        let type = Reflect.getMetadata('design:type', target, propertyName);
        config.type = types.has(type) ? type : Object;
    }
    let constr = target.constructor;
    ((constr.hasOwnProperty('params') && constr.params) || (constr.params = {}))[(name ||
        (propertyName.length <= prefixLength || propertyName.lastIndexOf(prefix, 0)
            ? propertyName
            : lower_case_first_word_1.lowerCaseFirstWord(propertyName.slice(5))))] = config;
}
exports.Param = Param;


/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__27__;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_uid_1 = __webpack_require__(29);
const kebab_case_1 = __webpack_require__(4);
const logger_1 = __webpack_require__(30);
const map_set_polyfill_1 = __webpack_require__(7);
const move_content_1 = __webpack_require__(31);
const next_uid_1 = __webpack_require__(32);
const cellx_1 = __webpack_require__(16);
const attachChildComponentElements_1 = __webpack_require__(33);
const bindContent_1 = __webpack_require__(34);
const componentBinding_1 = __webpack_require__(44);
const componentConstructorMap_1 = __webpack_require__(17);
const Constants_1 = __webpack_require__(22);
const DI_1 = __webpack_require__(6);
const elementConstructorMap_1 = __webpack_require__(23);
const ElementProtoMixin_1 = __webpack_require__(24);
const handledEvents_1 = __webpack_require__(45);
const handleDOMEvent_1 = __webpack_require__(46);
const handleEvent_1 = __webpack_require__(47);
const normalizeTextNodes_1 = __webpack_require__(48);
const map = Array.prototype.map;
class BaseComponent extends cellx_1.EventEmitter {
    constructor(el) {
        super();
        this._disposables = {};
        this._parentComponent = null;
        this.$inputContent = null;
        this._attached = false;
        this.initialized = false;
        this.isReady = false;
        let constr = this.constructor;
        if (!elementConstructorMap_1.elementConstructorMap.has(constr.elementIs)) {
            throw new TypeError('Component must be registered');
        }
        if (!el) {
            el = document.createElement(kebab_case_1.kebabCase(constr.elementIs, true));
        }
        this.element = el;
        el.$component = this;
        this[Constants_1.KEY_PARAMS] = new map_set_polyfill_1.Map();
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
    handleEvent(evt) {
        super.handleEvent(evt);
        if (evt.bubbles !== false && !evt.propagationStopped) {
            let parentComponent = this.parentComponent;
            if (parentComponent) {
                parentComponent.handleEvent(evt);
                return;
            }
        }
        handleEvent_1.handleEvent(evt);
    }
    listenTo(target, type, listener, context, useCapture) {
        if (typeof target == 'string') {
            target = this.$(target);
        }
        let listenings;
        if (typeof type == 'object') {
            listenings = [];
            if (Array.isArray(type)) {
                for (let i = 0, l = type.length; i < l; i++) {
                    listenings.push(this.listenTo(target, type[i], listener, context, useCapture));
                }
            }
            else {
                for (let name in type) {
                    listenings.push(this.listenTo(target, name, type[name], listener, context));
                }
            }
        }
        else {
            if (Array.isArray(target) ||
                target instanceof NodeList ||
                target instanceof HTMLCollection) {
                listenings = [];
                for (let i = 0, l = target.length; i < l; i++) {
                    listenings.push(this.listenTo(target[i], type, listener, context, useCapture));
                }
            }
            else if (Array.isArray(listener)) {
                listenings = [];
                for (let i = 0, l = listener.length; i < l; i++) {
                    listenings.push(this.listenTo(target, type, listener[i], context, useCapture));
                }
            }
            else {
                return this._listenTo(target, type, listener, context !== undefined ? context : this, useCapture || false);
            }
        }
        let id = next_uid_1.nextUID();
        let stopListening = () => {
            for (let i = listenings.length; i;) {
                listenings[--i].stop();
            }
            delete this._disposables[id];
        };
        let listening = (this._disposables[id] = {
            stop: stopListening,
            dispose: stopListening
        });
        return listening;
    }
    _listenTo(target, type, listener, context, useCapture) {
        if (target instanceof BaseComponent) {
            if (type.charAt(0) == '<') {
                let index = type.indexOf('>', 2);
                let targetType = type.slice(1, index);
                if (targetType != '*') {
                    let targetConstr = elementConstructorMap_1.elementConstructorMap.has(targetType) &&
                        componentConstructorMap_1.componentConstructorMap.get(targetType);
                    if (!targetConstr) {
                        throw new TypeError(`Component "${targetType}" is not defined`);
                    }
                    let inner = listener;
                    listener = function (evt) {
                        if (evt.target instanceof targetConstr) {
                            return inner.call(this, evt);
                        }
                    };
                }
                type = type.slice(index + 1);
            }
            else if (type.indexOf(':') == -1) {
                let inner = listener;
                listener = function (evt) {
                    if (evt.target == target) {
                        return inner.call(this, evt);
                    }
                };
            }
        }
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
        let id = next_uid_1.nextUID();
        let stopListening = () => {
            if (this._disposables[id]) {
                if (target instanceof cellx_1.EventEmitter) {
                    target.off(type, listener, context);
                }
                else {
                    target.removeEventListener(type, listener, useCapture);
                }
                delete this._disposables[id];
            }
        };
        let listening = (this._disposables[id] = {
            stop: stopListening,
            dispose: stopListening
        });
        return listening;
    }
    setTimeout(callback, delay) {
        let id = next_uid_1.nextUID();
        let timeoutId = setTimeout(() => {
            delete this._disposables[id];
            callback.call(this);
        }, delay);
        let clearTimeout_ = () => {
            if (this._disposables[id]) {
                clearTimeout(timeoutId);
                delete this._disposables[id];
            }
        };
        let timeout = (this._disposables[id] = {
            clear: clearTimeout_,
            dispose: clearTimeout_
        });
        return timeout;
    }
    setInterval(callback, delay) {
        let id = next_uid_1.nextUID();
        let intervalId = setInterval(() => {
            callback.call(this);
        }, delay);
        let clearInterval_ = () => {
            if (this._disposables[id]) {
                clearInterval(intervalId);
                delete this._disposables[id];
            }
        };
        let interval = (this._disposables[id] = {
            clear: clearInterval_,
            dispose: clearInterval_
        });
        return interval;
    }
    registerCallback(callback) {
        let id = next_uid_1.nextUID();
        let disposable = this;
        let cancelCallback = () => {
            delete this._disposables[id];
        };
        let registeredCallback = function registeredCallback() {
            if (disposable._disposables[id]) {
                delete disposable._disposables[id];
                return callback.apply(disposable, arguments);
            }
        };
        registeredCallback.cancel = cancelCallback;
        registeredCallback.dispose = cancelCallback;
        this._disposables[id] = registeredCallback;
        return registeredCallback;
    }
    _attach() {
        this._attached = true;
        if (!this.initialized) {
            let initializationResult = this.initialize();
            if (initializationResult) {
                initializationResult.then(() => {
                    this.initialized = true;
                    this._attach();
                });
                return;
            }
            this.initialized = true;
        }
        let constr = this.constructor;
        if (this.isReady) {
            this._unfreezeBindings();
        }
        else {
            let el = this.element;
            el.className = constr._blockNamesString + el.className;
            if (constr.template === null) {
                if (this.ownerComponent == this) {
                    let contentBindingResult = [null, null, null];
                    bindContent_1.bindContent(el, this, this, contentBindingResult);
                    let childComponents = contentBindingResult[0];
                    let backBindings = contentBindingResult[2];
                    this._bindings = contentBindingResult[1];
                    if (childComponents) {
                        attachChildComponentElements_1.attachChildComponentElements(childComponents);
                    }
                    if (backBindings) {
                        for (let i = backBindings.length; i; i -= 3) {
                            backBindings[i - 3].on('change:' + backBindings[i - 2], backBindings[i - 1]);
                        }
                    }
                }
                else {
                    this._bindings = null;
                    if (this[Constants_1.KEY_CHILD_COMPONENTS]) {
                        attachChildComponentElements_1.attachChildComponentElements(this[Constants_1.KEY_CHILD_COMPONENTS]);
                    }
                }
            }
            else {
                if (el.firstChild) {
                    ElementProtoMixin_1.suppressConnectionStatusCallbacks();
                    move_content_1.moveContent(this.$inputContent ||
                        (this.$inputContent = document.createDocumentFragment()), normalizeTextNodes_1.normalizeTextNodes(el));
                    ElementProtoMixin_1.resumeConnectionStatusCallbacks();
                }
                let content = constr.template.render(this);
                let contentBindingResult = [null, null, null];
                bindContent_1.bindContent(content, this, this, contentBindingResult);
                let childComponents = contentBindingResult[0];
                let backBindings = contentBindingResult[2];
                this._bindings = contentBindingResult[1];
                if (childComponents) {
                    for (let i = childComponents.length; i;) {
                        let childComponent = childComponents[--i];
                        if (childComponent.element.firstChild &&
                            childComponent.constructor.bindsInputContent) {
                            childComponent.$inputContent = move_content_1.moveContent(document.createDocumentFragment(), childComponent.element);
                        }
                    }
                }
                ElementProtoMixin_1.suppressConnectionStatusCallbacks();
                this.element.appendChild(content);
                ElementProtoMixin_1.resumeConnectionStatusCallbacks();
                if (childComponents) {
                    attachChildComponentElements_1.attachChildComponentElements(childComponents);
                }
                if (backBindings) {
                    for (let i = backBindings.length; i; i -= 3) {
                        backBindings[i - 3].on('change:' + backBindings[i - 2], backBindings[i - 1]);
                    }
                }
            }
            this.ready();
            this.isReady = true;
        }
        this.elementAttached();
    }
    _detach() {
        this._attached = false;
        this.elementDetached();
        this.dispose();
    }
    dispose() {
        this._freezeBindings();
        let disposables = this._disposables;
        for (let id in disposables) {
            disposables[id].dispose();
        }
        return this;
    }
    _freezeBindings() {
        if (this._bindings) {
            componentBinding_1.freezeBindings(this._bindings);
        }
    }
    _unfreezeBindings() {
        if (this._bindings) {
            componentBinding_1.unfreezeBindings(this._bindings);
        }
    }
    _destroyBindings() {
        let bindings = this._bindings;
        if (bindings) {
            for (let i = bindings.length; i;) {
                bindings[--i].off();
            }
            this._bindings = null;
        }
    }
    // Callbacks
    elementConnected() { }
    elementDisconnected() { }
    initialize() { }
    ready() { }
    elementAttached() { }
    elementDetached() { }
    elementMoved() { }
    // Utils
    $(name, container) {
        let elList = this._getElementList(name, container);
        return (elList && elList.length
            ? elList[0].$component || elList[0]
            : null);
    }
    $$(name, container) {
        let elList = this._getElementList(name, container);
        return elList
            ? map.call(elList, (el) => el.$component || el)
            : [];
    }
    _getElementList(name, container) {
        let elListMap = this._elementListMap ||
            (this._elementListMap = new map_set_polyfill_1.Map());
        let containerEl;
        if (container) {
            if (typeof container == 'string') {
                container = this.$(container);
            }
            containerEl = container instanceof BaseComponent ? container.element : container;
        }
        else {
            containerEl = this.element;
        }
        let key = container ? get_uid_1.getUID(containerEl) + '/' + name : name;
        let elList = elListMap.get(key);
        if (!elList) {
            let elementBlockNames = this.constructor._elementBlockNames;
            elList = containerEl.getElementsByClassName(elementBlockNames[elementBlockNames.length - 1] + '__' + name);
            elListMap.set(key, elList);
        }
        return elList;
    }
}
BaseComponent.elementExtends = null;
BaseComponent.params = null;
BaseComponent.i18n = null;
BaseComponent.template = null;
BaseComponent.events = null;
BaseComponent.domEvents = null;
__decorate([
    DI_1.Inject,
    __metadata("design:type", logger_1.Logger)
], BaseComponent.prototype, "logger", void 0);
exports.BaseComponent = BaseComponent;
document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
    document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
    handledEvents_1.handledEvents.forEach(type => {
        document.body.addEventListener(type, evt => {
            if (evt.target != document.body) {
                handleDOMEvent_1.handleDOMEvent(evt);
            }
        });
    });
});


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__29__;

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__30__;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__31__;

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__32__;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ComponentParams_1 = __webpack_require__(18);
// import { KEY_ELEMENT_CONNECTED } from './ElementProtoMixin';
function attachChildComponentElements(childComponents) {
    for (let childComponent of childComponents) {
        // if (childComponent.element[KEY_ELEMENT_CONNECTED]) {
        childComponent._parentComponent = undefined;
        ComponentParams_1.ComponentParams.init(childComponent);
        childComponent.elementConnected();
        childComponent._attach();
        // }
    }
}
exports.attachChildComponentElements = attachChildComponentElements;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const map_set_polyfill_1 = __webpack_require__(7);
const set_attribute_1 = __webpack_require__(35);
const cellx_1 = __webpack_require__(16);
const compileContentNodeValue_1 = __webpack_require__(36);
const Constants_1 = __webpack_require__(22);
const ContentNodeValueParser_1 = __webpack_require__(39);
const compileKeypath_1 = __webpack_require__(43);
exports.KEY_CONTEXT = Symbol('Rionite/bindContent[context]');
const contentNodeValueASTCache = {
    __proto__: null
};
function onAttributeBindingCellChange(evt) {
    set_attribute_1.setAttribute(evt.target.meta.element, evt.target.meta.attributeName, evt.data.value);
}
function onTextNodeBindingCellChange(evt) {
    evt.target.meta.textNode.nodeValue = evt.data.value;
}
function bindContent(node, ownerComponent, context, result, parentComponent) {
    for (let child = node.firstChild; child; child = child.nextSibling) {
        switch (child.nodeType) {
            case Node.ELEMENT_NODE: {
                let childComponent = child.rioniteComponent;
                let $paramsConfig;
                let $specifiedParams;
                if (childComponent) {
                    $paramsConfig = childComponent.constructor[Constants_1.KEY_PARAMS_CONFIG];
                    $specifiedParams = new map_set_polyfill_1.Set();
                }
                let attrs = child.attributes;
                for (let i = attrs.length; i;) {
                    let attr = attrs[--i];
                    let name = attr.name;
                    let targetName;
                    if (name.charAt(0) == '_') {
                        targetName = name.slice(1);
                    }
                    else {
                        targetName = name;
                        if (!name.lastIndexOf('oncomponent-', 0) || !name.lastIndexOf('on-', 0)) {
                            child[exports.KEY_CONTEXT] = context;
                        }
                    }
                    let $paramConfig = $paramsConfig && $paramsConfig[targetName];
                    if ($paramConfig) {
                        $specifiedParams.add($paramConfig.name);
                    }
                    let value = attr.value;
                    if (!value) {
                        continue;
                    }
                    let valueAST = contentNodeValueASTCache[value];
                    if (!valueAST) {
                        if (valueAST === null) {
                            continue;
                        }
                        let bracketIndex = value.indexOf('{');
                        if (bracketIndex == -1) {
                            contentNodeValueASTCache[value] = null;
                            continue;
                        }
                        valueAST = contentNodeValueASTCache[value] = new ContentNodeValueParser_1.ContentNodeValueParser(value).parse(bracketIndex);
                    }
                    let valueASTLength = valueAST.length;
                    if (valueASTLength > 1 ||
                        valueAST[0].nodeType == ContentNodeValueParser_1.ContentNodeValueNodeType.BINDING) {
                        let prefix = valueAST.length == 1
                            ? valueAST[0].prefix
                            : null;
                        if (prefix === '=') {
                            set_attribute_1.setAttribute(child, targetName, compileContentNodeValue_1.compileContentNodeValue(valueAST, value, true).call(context));
                        }
                        else {
                            if (prefix !== '->') {
                                let cell = new cellx_1.Cell(compileContentNodeValue_1.compileContentNodeValue(valueAST, value, valueAST.length == 1), {
                                    context,
                                    meta: {
                                        element: child,
                                        attributeName: targetName
                                    },
                                    onChange: onAttributeBindingCellChange
                                });
                                set_attribute_1.setAttribute(child, targetName, cell.get());
                                (result[1] || (result[1] = [])).push(cell);
                            }
                            let paramConfig;
                            if ($paramConfig) {
                                paramConfig = $paramConfig.paramConfig;
                            }
                            if (paramConfig !== undefined &&
                                (prefix === '->' || prefix === '<->')) {
                                if (prefix == '->' && name.charAt(0) != '_') {
                                    child.removeAttribute(name);
                                }
                                let keypath = valueAST[0].keypath;
                                let keys = keypath.split('.');
                                let handler;
                                if (keys.length == 1) {
                                    handler = (propertyName => {
                                        return function (evt) {
                                            this.ownerComponent[propertyName] = evt.data.value;
                                        };
                                    })(keys[0]);
                                }
                                else {
                                    handler = ((propertyName, keys) => {
                                        let getPropertyHolder = compileKeypath_1.compileKeypath(keys, keys.join('.'));
                                        return function (evt) {
                                            let propertyHolder = getPropertyHolder.call(this.ownerComponent);
                                            if (propertyHolder) {
                                                propertyHolder[propertyName] = evt.data.value;
                                            }
                                        };
                                    })(keys[keys.length - 1], keys.slice(0, -1));
                                }
                                (result[2] || (result[2] = [])).push(childComponent, (typeof paramConfig == 'object' &&
                                    (paramConfig.type || paramConfig.default !== undefined) &&
                                    paramConfig.property) ||
                                    $paramConfig.name, handler);
                            }
                        }
                    }
                }
                if (childComponent) {
                    childComponent._ownerComponent = ownerComponent;
                    childComponent.$context = context;
                    childComponent.$specifiedParams = $specifiedParams;
                    if (parentComponent) {
                        (parentComponent[Constants_1.KEY_CHILD_COMPONENTS] ||
                            (parentComponent[Constants_1.KEY_CHILD_COMPONENTS] = [])).push(childComponent);
                    }
                    else {
                        (result[0] || (result[0] = [])).push(childComponent);
                    }
                }
                if (child.firstChild &&
                    (!childComponent ||
                        !childComponent.constructor.bindsInputContent)) {
                    bindContent(child, ownerComponent, context, result, childComponent);
                }
                break;
            }
            case Node.TEXT_NODE: {
                let value = child.nodeValue;
                let valueAST = contentNodeValueASTCache[value];
                if (!valueAST) {
                    if (valueAST === null) {
                        continue;
                    }
                    let bracketIndex = value.indexOf('{');
                    if (bracketIndex == -1) {
                        contentNodeValueASTCache[value] = null;
                        continue;
                    }
                    valueAST = contentNodeValueASTCache[value] = new ContentNodeValueParser_1.ContentNodeValueParser(value).parse(bracketIndex);
                }
                if (valueAST.length > 1 ||
                    valueAST[0].nodeType == ContentNodeValueParser_1.ContentNodeValueNodeType.BINDING) {
                    if (valueAST.length == 1 &&
                        valueAST[0].prefix === '=') {
                        child.nodeValue = compileContentNodeValue_1.compileContentNodeValue(valueAST, value, false).call(context);
                    }
                    else {
                        let cell = new cellx_1.Cell(compileContentNodeValue_1.compileContentNodeValue(valueAST, value, false), {
                            context,
                            meta: { textNode: child },
                            onChange: onTextNodeBindingCellChange
                        });
                        child.nodeValue = cell.get();
                        (result[1] || (result[1] = [])).push(cell);
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
/* 35 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__35__;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const escape_string_1 = __webpack_require__(37);
const bindingToJSExpression_1 = __webpack_require__(38);
const componentParamTypeSerializerMap_1 = __webpack_require__(19);
const ContentNodeValueParser_1 = __webpack_require__(39);
const formatters_1 = __webpack_require__(10);
const cache = Object.create(null);
function compileContentNodeValue(contentNodeValueAST, contentNodeValueString, useComponentParamValueMap) {
    let cacheKey = contentNodeValueString + (useComponentParamValueMap ? ',' : '.');
    if (cache[cacheKey]) {
        return cache[cacheKey];
    }
    let inner;
    if (contentNodeValueAST.length == 1) {
        inner = Function('formatters', `var tmp; return ${bindingToJSExpression_1.bindingToJSExpression(contentNodeValueAST[0])};`);
    }
    else {
        let jsExpr = [];
        for (let node of contentNodeValueAST) {
            jsExpr.push(node.nodeType == ContentNodeValueParser_1.ContentNodeValueNodeType.TEXT
                ? `'${escape_string_1.escapeString(node.value)}'`
                : bindingToJSExpression_1.bindingToJSExpression(node));
        }
        inner = Function('formatters', `var tmp; return [${jsExpr.join(', ')}].join('');`);
    }
    return (cache[cacheKey] = useComponentParamValueMap
        ? function (cell) {
            let value = inner.call(this, formatters_1.formatters);
            if (value) {
                let valueType = typeof value;
                if (valueType == 'object' || valueType == 'function') {
                    let meta = cell.meta;
                    (meta.element[componentParamTypeSerializerMap_1.KEY_COMPONENT_PARAM_VALUE_MAP] ||
                        (meta.element[componentParamTypeSerializerMap_1.KEY_COMPONENT_PARAM_VALUE_MAP] = Object.create(null)))[meta.attributeName] = value;
                    return meta.attributeName;
                }
            }
            return value;
        }
        : function () {
            let value = inner.call(this, formatters_1.formatters);
            return value == null ? '' : value + '';
        });
}
exports.compileContentNodeValue = compileContentNodeValue;


/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__37__;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function formattersReducer(jsExpr, formatter) {
    let args = formatter.arguments;
    return `(this.${formatter.name} || formatters.${formatter.name}).call(this['$/'], ${jsExpr}${args && args.value.length ? ', ' + args.value.join(', ') : ''})`;
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
        let jsExprArr = Array(index);
        while (index) {
            jsExprArr[--index] = ` && (tmp = tmp['${keys[index + 1]}'])`;
        }
        let jsExpr = `(tmp = this['${keys[0]}'])${jsExprArr.join('')} && tmp['${keys[keyCount - 1]}']`;
        return formatters ? formatters.reduce(formattersReducer, jsExpr) : jsExpr;
    }
    return formatters ? formatters.reduce(formattersReducer, binding.value) : binding.value;
}
exports.bindingToJSExpression = bindingToJSExpression;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const keypathPattern_1 = __webpack_require__(40);
const keypathToJSExpression_1 = __webpack_require__(42);
const namePattern_1 = __webpack_require__(41);
var ContentNodeValueNodeType;
(function (ContentNodeValueNodeType) {
    ContentNodeValueNodeType[ContentNodeValueNodeType["TEXT"] = 1] = "TEXT";
    ContentNodeValueNodeType[ContentNodeValueNodeType["BINDING"] = 2] = "BINDING";
    ContentNodeValueNodeType[ContentNodeValueNodeType["BINDING_KEYPATH"] = 3] = "BINDING_KEYPATH";
    ContentNodeValueNodeType[ContentNodeValueNodeType["BINDING_FORMATTER"] = 4] = "BINDING_FORMATTER";
    ContentNodeValueNodeType[ContentNodeValueNodeType["BINDING_FORMATTER_ARGUMENTS"] = 5] = "BINDING_FORMATTER_ARGUMENTS";
})(ContentNodeValueNodeType = exports.ContentNodeValueNodeType || (exports.ContentNodeValueNodeType = {}));
const reWhitespace = /\s/;
const reNameOrNothing = RegExp(namePattern_1.namePattern + '|', 'g');
const reKeypathOrNothing = RegExp(keypathPattern_1.keypathPattern + '|', 'g');
const reBooleanOrNothing = /false|true|/g;
const reNumberOrNothing = /(?:[+-]\s*)?(?:0b[01]+|0[0-7]+|0x[0-9a-fA-F]+|(?:(?:0|[1-9]\d*)(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?|Infinity|NaN)|/g;
const reVacuumOrNothing = /null|undefined|void 0|/g;
class ContentNodeValueParser {
    constructor(contentNodeValue) {
        this.contentNodeValue = contentNodeValue;
    }
    parse(index) {
        let contentNodeValue = this.contentNodeValue;
        this.at = 0;
        let result = (this.result = []);
        do {
            this._pushText(contentNodeValue.slice(this.at, index));
            this.at = index;
            this.chr = contentNodeValue.charAt(index);
            let binding = this._readBinding();
            if (binding) {
                result.push(binding);
            }
            else {
                this._pushText(this.chr);
                this._next('{');
            }
            index = contentNodeValue.indexOf('{', this.at);
        } while (index != -1);
        this._pushText(contentNodeValue.slice(this.at));
        return result;
    }
    _pushText(value) {
        if (value) {
            let result = this.result;
            let resultLen = result.length;
            if (resultLen && result[resultLen - 1].nodeType == ContentNodeValueNodeType.TEXT) {
                result[resultLen - 1].value += value;
            }
            else {
                result.push({
                    nodeType: ContentNodeValueNodeType.TEXT,
                    value
                });
            }
        }
    }
    _readBinding() {
        let at = this.at;
        this._next('{');
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
                (formatters || (formatters = [])).push(formatter);
            }
            if (this.chr == '}') {
                this._next();
                return {
                    nodeType: ContentNodeValueNodeType.BINDING,
                    prefix,
                    keypath,
                    value: value || null,
                    formatters: formatters || null,
                    raw: this.contentNodeValue.slice(at, this.at)
                };
            }
        }
        this.at = at;
        this.chr = this.contentNodeValue.charAt(at);
        return null;
    }
    _readPrefix() {
        let chr = this.chr;
        if (chr == '=') {
            this._next();
            return '=';
        }
        if (chr == '<') {
            let at = this.at;
            if (this.contentNodeValue.charAt(at + 1) == '-') {
                if (this.contentNodeValue.charAt(at + 2) == '>') {
                    this.chr = this.contentNodeValue.charAt((this.at = at + 3));
                    return '<->';
                }
                this.chr = this.contentNodeValue.charAt((this.at = at + 2));
                return '<-';
            }
        }
        else if (chr == '-' && this.contentNodeValue.charAt(this.at + 1) == '>') {
            this.chr = this.contentNodeValue.charAt((this.at += 2));
            return '->';
        }
        return null;
    }
    _readFormatter() {
        let at = this.at;
        this._next('|');
        this._skipWhitespaces();
        let name = this._readName();
        if (name) {
            let args = this.chr == '(' ? this._readFormatterArguments() : null;
            return {
                nodeType: ContentNodeValueNodeType.BINDING_FORMATTER,
                name,
                arguments: args
            };
        }
        this.at = at;
        this.chr = this.contentNodeValue.charAt(at);
        return null;
    }
    _readFormatterArguments() {
        let at = this.at;
        this._next('(');
        let args = [];
        if (this._skipWhitespaces() != ')') {
            for (;;) {
                let arg = this._readValue() || this._readKeypath(true);
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
                this.chr = this.contentNodeValue.charAt(at);
                return null;
            }
        }
        this._next();
        return {
            nodeType: ContentNodeValueNodeType.BINDING_FORMATTER_ARGUMENTS,
            value: args
        };
    }
    _readValue() {
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
        let at = this.at;
        this._next('{');
        let obj = '{';
        while (this._skipWhitespaces() != '}') {
            let key = this.chr == "'" || this.chr == '"' ? this._readString() : this._readObjectKey();
            if (key && this._skipWhitespaces() == ':') {
                this._next();
                this._skipWhitespaces();
                let valueOrKeypath = this._readValue() || this._readKeypath(true);
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
            this.chr = this.contentNodeValue.charAt(at);
            return null;
        }
        this._next();
        return obj;
    }
    _readObjectKey() {
        return this._readName();
    }
    _readArray() {
        let at = this.at;
        this._next('[');
        let arr = '[';
        while (this._skipWhitespaces() != ']') {
            if (this.chr == ',') {
                arr += ',';
                this._next();
            }
            else {
                let valueOrKeypath = this._readValue() || this._readKeypath(true);
                if (valueOrKeypath) {
                    arr += valueOrKeypath;
                }
                else {
                    this.at = at;
                    this.chr = this.contentNodeValue.charAt(at);
                    return null;
                }
            }
        }
        this._next();
        return arr + ']';
    }
    _readBoolean() {
        reBooleanOrNothing.lastIndex = this.at;
        let bool = reBooleanOrNothing.exec(this.contentNodeValue)[0];
        if (bool) {
            this.chr = this.contentNodeValue.charAt((this.at = reBooleanOrNothing.lastIndex));
            return bool;
        }
        return null;
    }
    _readNumber() {
        reNumberOrNothing.lastIndex = this.at;
        let num = reNumberOrNothing.exec(this.contentNodeValue)[0];
        if (num) {
            this.chr = this.contentNodeValue.charAt((this.at = reNumberOrNothing.lastIndex));
            return num;
        }
        return null;
    }
    _readString() {
        let quoteChar = this.chr;
        if (quoteChar != "'" && quoteChar != '"') {
            throw {
                name: 'SyntaxError',
                message: `Expected "'" instead of "${this.chr}"`,
                at: this.at,
                contentNodeValue: this.contentNodeValue
            };
        }
        let at = this.at;
        let str = '';
        for (let next; (next = this._next());) {
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
        this.at = at;
        this.chr = this.contentNodeValue.charAt(at);
        return null;
    }
    _readVacuum() {
        reVacuumOrNothing.lastIndex = this.at;
        let vacuum = reVacuumOrNothing.exec(this.contentNodeValue)[0];
        if (vacuum) {
            this.chr = this.contentNodeValue.charAt((this.at = reVacuumOrNothing.lastIndex));
            return vacuum;
        }
        return null;
    }
    _readKeypath(toJSExpression) {
        reKeypathOrNothing.lastIndex = this.at;
        let keypath = reKeypathOrNothing.exec(this.contentNodeValue)[0];
        if (keypath) {
            this.chr = this.contentNodeValue.charAt((this.at = reKeypathOrNothing.lastIndex));
            return toJSExpression ? keypathToJSExpression_1.keypathToJSExpression(keypath) : keypath;
        }
        return null;
    }
    _readName() {
        reNameOrNothing.lastIndex = this.at;
        let name = reNameOrNothing.exec(this.contentNodeValue)[0];
        if (name) {
            this.chr = this.contentNodeValue.charAt((this.at = reNameOrNothing.lastIndex));
            return name;
        }
        return null;
    }
    _skipWhitespaces() {
        let chr = this.chr;
        while (chr && reWhitespace.test(chr)) {
            chr = this._next();
        }
        return chr;
    }
    _next(current) {
        if (current && current != this.chr) {
            throw {
                name: 'SyntaxError',
                message: `Expected "${current}" instead of "${this.chr}"`,
                at: this.at,
                contentNodeValue: this.contentNodeValue
            };
        }
        return (this.chr = this.contentNodeValue.charAt(++this.at));
    }
}
exports.ContentNodeValueParser = ContentNodeValueParser;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const namePattern_1 = __webpack_require__(41);
exports.keypathPattern = `(?:${namePattern_1.namePattern}|\\d+)(?:\\.(?:${namePattern_1.namePattern}|\\d+))*`;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.namePattern = '[$_a-zA-Z][$\\w]*';


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const cache = Object.create(null);
function keypathToJSExpression(keypath, cacheKey = keypath) {
    if (cache[cacheKey]) {
        return cache[cacheKey];
    }
    let keys = typeof keypath == 'string' ? keypath.split('.') : keypath;
    let keyCount = keys.length;
    if (keyCount == 1) {
        return (cache[cacheKey] = `this['${keypath}']`);
    }
    let index = keyCount - 2;
    let jsExpr = Array(index);
    while (index) {
        jsExpr[--index] = ` && (tmp = tmp['${keys[index + 1]}'])`;
    }
    return (cache[cacheKey] = `(tmp = this['${keys[0]}'])${jsExpr.join('')} && tmp['${keys[keyCount - 1]}']`);
}
exports.keypathToJSExpression = keypathToJSExpression;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const keypathToJSExpression_1 = __webpack_require__(42);
const cache = Object.create(null);
function compileKeypath(keypath, cacheKey = keypath) {
    return (cache[cacheKey] ||
        (cache[cacheKey] = Function(`var tmp; return ${keypathToJSExpression_1.keypathToJSExpression(keypath, cacheKey)};`)));
}
exports.compileKeypath = compileKeypath;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const cellx_1 = __webpack_require__(16);
function freezeBinding(binding) {
    let changeEvent = binding._events.get('change');
    binding._events.delete('change');
    binding._frozenState = {
        changeEventListener: changeEvent.listener,
        changeEventContext: changeEvent.context,
        value: binding._value
    };
}
function unfreezeBinding(binding) {
    let frozenState = binding._frozenState;
    binding._frozenState = null;
    binding.on('change', frozenState.changeEventListener, frozenState.changeEventContext);
    if (frozenState.value !== binding._value) {
        binding._changeEvent = {
            target: binding,
            type: 'change',
            data: {
                prevEvent: null,
                prevValue: frozenState.value,
                value: binding._value
            }
        };
        binding._canCancelChange = true;
        binding._addToRelease();
    }
}
function freezeBindings(bindings) {
    cellx_1.Cell.forceRelease();
    for (let binding of bindings) {
        freezeBinding(binding);
    }
}
exports.freezeBindings = freezeBindings;
function unfreezeBindings(bindings) {
    for (let binding of bindings) {
        unfreezeBinding(binding);
    }
    cellx_1.Cell.forceRelease();
}
exports.unfreezeBindings = unfreezeBindings;


/***/ }),
/* 45 */
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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const bindContent_1 = __webpack_require__(34);
function handleDOMEvent(evt) {
    let attrName = 'on-' + evt.type;
    let el = evt.target;
    let parentEl = el.parentElement;
    let receivers;
    while (parentEl) {
        if (el.hasAttribute(attrName)) {
            (receivers || (receivers = [])).push(el);
        }
        let component = parentEl.$component;
        if (component && receivers && receivers.length) {
            for (let i = 0;;) {
                let receiver = receivers[i];
                let handlerName = receiver.getAttribute(attrName);
                let handler;
                if (handlerName.charAt(0) == ':') {
                    let events = component.constructor.domEvents;
                    if (events) {
                        events = events[handlerName.slice(1)];
                        if (events) {
                            handler = events[evt.type];
                        }
                    }
                }
                else {
                    handler = component[handlerName];
                }
                if (handler) {
                    if (handler.call(component, evt, receiver[bindContent_1.KEY_CONTEXT], receiver) === false) {
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
        if (parentEl == document.body) {
            break;
        }
        el = parentEl;
        parentEl = el.parentElement;
    }
}
exports.handleDOMEvent = handleDOMEvent;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const bindContent_1 = __webpack_require__(34);
const stack = [];
function handleEvent(evt) {
    let target = evt.target;
    let ownerComponent = target.ownerComponent;
    if (target == ownerComponent) {
        return;
    }
    let targetEl = target.element;
    let el = targetEl;
    let parentEl = el.parentElement;
    if (!parentEl) {
        return;
    }
    stack.length = 0;
    let attrName = 'oncomponent-' + evt.type;
    let ownerComponentEl = ownerComponent.element;
    let receivers;
    for (let component;;) {
        if (el.hasAttribute(attrName)) {
            (receivers || (receivers = [])).push(el);
        }
        if (parentEl == ownerComponentEl) {
            if (receivers) {
                for (let i = 0, l = receivers.length; i < l; i++) {
                    let receiver = receivers[i];
                    let handlerName = receiver.getAttribute(attrName);
                    let handler;
                    if (handlerName.charAt(0) == ':') {
                        let events = ownerComponent.constructor.events;
                        if (receiver == targetEl) {
                            handler = events[handlerName.slice(1)][evt.type];
                        }
                        else {
                            let elementBlockNames = target.constructor
                                ._elementBlockNames;
                            for (let j = 0, m = elementBlockNames.length; j < m; j++) {
                                let typedHandler = events[handlerName.slice(1)][`<${elementBlockNames[j]}>` + evt.type];
                                if (typedHandler &&
                                    typedHandler.call(ownerComponent, evt, receiver[bindContent_1.KEY_CONTEXT], receiver) === false) {
                                    return;
                                }
                            }
                            handler = events[handlerName.slice(1)]['<*>' + evt.type];
                        }
                    }
                    else {
                        handler = ownerComponent[handlerName];
                    }
                    if (handler &&
                        handler.call(ownerComponent, evt, receiver[bindContent_1.KEY_CONTEXT], receiver) === false) {
                        return;
                    }
                }
            }
            if (!stack.length) {
                break;
            }
            el = parentEl;
            parentEl = el.parentElement;
            if (!parentEl) {
                break;
            }
            [ownerComponent, receivers] = stack.pop();
            ownerComponentEl = ownerComponent.element;
        }
        else {
            el = parentEl;
            parentEl = el.parentElement;
            if (!parentEl) {
                break;
            }
            component = el.$component;
            if (component && component.ownerComponent != ownerComponent) {
                stack.push([ownerComponent, receivers]);
                ownerComponent = component.ownerComponent;
                ownerComponentEl = ownerComponent.element;
                receivers = undefined;
            }
        }
    }
}
exports.handleEvent = handleEvent;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function normalizeTextNodes(node) {
    for (let child = node.firstChild; child;) {
        switch (child.nodeType) {
            case Node.ELEMENT_NODE: {
                normalizeTextNodes(child);
                child = child.nextSibling;
                break;
            }
            case Node.TEXT_NODE: {
                let nextChild = child.nextSibling;
                if (nextChild && nextChild.nodeType == Node.TEXT_NODE) {
                    do {
                        child.nodeValue += nextChild.nodeValue;
                        node.removeChild(nextChild);
                        nextChild = child.nextSibling;
                    } while (nextChild && nextChild.nodeType == Node.TEXT_NODE);
                }
                child = nextChild;
                break;
            }
        }
    }
    return node;
}
exports.normalizeTextNodes = normalizeTextNodes;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var RnIfThen_1;
const next_tick_1 = __webpack_require__(50);
const cellx_1 = __webpack_require__(16);
const move_content_1 = __webpack_require__(51);
const attachChildComponentElements_1 = __webpack_require__(33);
const BaseComponent_1 = __webpack_require__(28);
const bindContent_1 = __webpack_require__(34);
const Component_1 = __webpack_require__(12);
const ElementProtoMixin_1 = __webpack_require__(24);
const compileKeypath_1 = __webpack_require__(43);
const keypathPattern_1 = __webpack_require__(40);
const removeNodes_1 = __webpack_require__(52);
const RnRepeat_1 = __webpack_require__(53);
const slice = Array.prototype.slice;
const reKeypath = RegExp(`^${keypathPattern_1.keypathPattern}$`);
let RnIfThen = RnIfThen_1 = class RnIfThen extends BaseComponent_1.BaseComponent {
    constructor() {
        super(...arguments);
        this._elseMode = false;
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
        if (!this.initialized) {
            let if_ = this.paramIf.trim();
            if (!reKeypath.test(if_)) {
                throw new SyntaxError(`Invalid value of attribute "if" (${if_})`);
            }
            let getIfValue = compileKeypath_1.compileKeypath(if_);
            this._if = new cellx_1.Cell(function () {
                return !!getIfValue.call(this);
            }, { context: this.$context });
            this.initialized = true;
        }
        if (this.element.contentTemplate) {
            this._if.on('change', this._onIfChange, this);
            this._render(false);
        }
    }
    elementDisconnected() {
        next_tick_1.nextTick(() => {
            if (!this.element[ElementProtoMixin_1.KEY_ELEMENT_CONNECTED]) {
                this._deactivate();
            }
        });
    }
    _onIfChange() {
        if (this.element.parentNode) {
            this._render(true);
        }
    }
    _attach() {
        this._attached = true;
    }
    _detach() {
        this._attached = false;
    }
    _render(changed) {
        if (this._elseMode ? this._if.get() === false : this._if.get()) {
            let content = this.element.contentTemplate.render();
            let contentBindingResult = [null, null, null];
            bindContent_1.bindContent(content, this.ownerComponent, this.$context, contentBindingResult);
            let childComponents = contentBindingResult[0];
            let backBindings = contentBindingResult[2];
            this._nodes = slice.call(content.childNodes);
            this._childComponents = childComponents;
            this._bindings = contentBindingResult[1];
            if (childComponents) {
                for (let i = childComponents.length; i;) {
                    let childComponent = childComponents[--i];
                    if (childComponent.element.firstChild &&
                        childComponent.constructor.bindsInputContent) {
                        childComponent.$inputContent = move_content_1.moveContent(document.createDocumentFragment(), childComponent.element);
                    }
                }
            }
            ElementProtoMixin_1.suppressConnectionStatusCallbacks();
            this.element.parentNode.insertBefore(content, this.element);
            ElementProtoMixin_1.resumeConnectionStatusCallbacks();
            if (childComponents) {
                attachChildComponentElements_1.attachChildComponentElements(childComponents);
            }
            if (backBindings) {
                for (let i = backBindings.length; i; i -= 3) {
                    backBindings[i - 3].on('change:' + backBindings[i - 2], backBindings[i - 1]);
                }
            }
        }
        else {
            let nodes = this._nodes;
            if (nodes) {
                removeNodes_1.removeNodes(nodes);
                this._destroyBindings();
                this._nodes = null;
                this._deactivateChildComponents();
            }
        }
        if (changed) {
            cellx_1.Cell.forceRelease();
            this.emit('change');
        }
    }
    _deactivate() {
        if (!this._active) {
            return;
        }
        this._active = false;
        this._if.off('change', this._onIfChange, this);
        let nodes = this._nodes;
        if (nodes) {
            removeNodes_1.removeNodes(nodes);
            this._destroyBindings();
            this._nodes = null;
            this._deactivateChildComponents();
        }
    }
    _deactivateChildComponents() {
        let childComponents = this._childComponents;
        if (childComponents) {
            for (let i = childComponents.length; i;) {
                let childComponent = childComponents[--i];
                if (childComponent instanceof RnIfThen_1 || childComponent instanceof RnRepeat_1.RnRepeat) {
                    childComponent._deactivate();
                }
            }
        }
        this._childComponents = null;
    }
};
RnIfThen = RnIfThen_1 = __decorate([
    Component_1.Component({
        elementIs: 'RnIfThen',
        elementExtends: 'template',
        params: {
            if: { property: 'paramIf', type: String, required: true, readonly: true }
        }
    })
], RnIfThen);
exports.RnIfThen = RnIfThen;


/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__50__;

/***/ }),
/* 51 */
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
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.removeNodes = removeNodes;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const map_set_polyfill_1 = __webpack_require__(7);
const next_tick_1 = __webpack_require__(50);
const cellx_1 = __webpack_require__(16);
const move_content_1 = __webpack_require__(51);
const attachChildComponentElements_1 = __webpack_require__(33);
const BaseComponent_1 = __webpack_require__(28);
const bindContent_1 = __webpack_require__(34);
const Component_1 = __webpack_require__(12);
const ElementProtoMixin_1 = __webpack_require__(24);
const compileKeypath_1 = __webpack_require__(43);
const keypathPattern_1 = __webpack_require__(40);
const namePattern_1 = __webpack_require__(41);
const removeNodes_1 = __webpack_require__(52);
const RnIfThen_1 = __webpack_require__(49);
const slice = Array.prototype.slice;
const reForAttrValue = RegExp(`^\\s*(${namePattern_1.namePattern})\\s+(?:in|of)\\s+(${keypathPattern_1.keypathPattern})\\s*$`);
function getItem(list, index) {
    return Array.isArray(list) ? list[index] : list.get(index);
}
function insertBefore(nodes, beforeNode) {
    let nodeCount = nodes.length;
    if (nodeCount == 1) {
        beforeNode.parentNode.insertBefore(nodes[0], beforeNode);
        return nodes[0];
    }
    let parent = beforeNode.parentNode;
    for (let i = 0; i < nodeCount; i++) {
        parent.insertBefore(nodes[i], beforeNode);
    }
    return nodes[nodeCount - 1];
}
function offBindings(bindings) {
    if (bindings) {
        for (let i = bindings.length; i;) {
            bindings[--i].off();
        }
    }
}
function deactivateChildComponents(childComponents) {
    if (childComponents) {
        for (let i = childComponents.length; i;) {
            let childComponent = childComponents[--i];
            if (childComponent instanceof RnIfThen_1.RnIfThen || childComponent instanceof RnRepeat) {
                childComponent._deactivate();
            }
        }
    }
}
let RnRepeat = class RnRepeat extends BaseComponent_1.BaseComponent {
    constructor() {
        super(...arguments);
        this._active = false;
    }
    elementConnected() {
        if (this._active) {
            return;
        }
        this._active = true;
        if (!this.initialized) {
            let for_ = this.paramFor.match(reForAttrValue);
            if (!for_) {
                throw new SyntaxError(`Invalid value of parameter "for" (${this.paramFor})`);
            }
            this._itemName = for_[1];
            this._prevList = [];
            this._list = new cellx_1.Cell(compileKeypath_1.compileKeypath(for_[2]), {
                context: this.$context
            });
            this._$itemMap = new map_set_polyfill_1.Map();
            this._trackBy = this.paramTrackBy;
            this.initialized = true;
        }
        if (this.element.contentTemplate) {
            this._list.on('change', this._onListChange, this);
            this._render(false);
        }
    }
    elementDisconnected() {
        next_tick_1.nextTick(() => {
            if (!this.element[ElementProtoMixin_1.KEY_ELEMENT_CONNECTED]) {
                this._deactivate();
            }
        });
    }
    _onListChange() {
        if (this.element.parentNode) {
            this._render(true);
        }
    }
    _attach() {
        this._attached = true;
    }
    _detach() {
        this._attached = false;
    }
    _render(fromChangeEvent) {
        let prevList = this._prevList;
        let prevListLength = prevList.length;
        let list = this._list.get();
        let $itemMap = this._$itemMap;
        let trackBy = this._trackBy;
        let startIndex = 0;
        let changed = false;
        if (list) {
            let new$ItemMap = new map_set_polyfill_1.Map();
            let removedValues = new map_set_polyfill_1.Map();
            let el = this.element;
            let lastNode = el;
            for (let i = 0, l = list.length; i < l;) {
                let item = getItem(list, i);
                let value = trackBy ? item[trackBy] : item;
                let $items = $itemMap.get(value);
                if ($items) {
                    if (removedValues.has(value)) {
                        let $item = $items.shift();
                        if (new$ItemMap.has(value)) {
                            new$ItemMap.get(value).push($item);
                        }
                        else {
                            new$ItemMap.set(value, [$item]);
                        }
                        if (!$items.length) {
                            $itemMap.delete(value);
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
                        lastNode = insertBefore($item.nodes, lastNode == el ? lastNode : lastNode.nextSibling);
                        i++;
                    }
                    else {
                        let foundIndex;
                        for (let j = startIndex;; j++) {
                            if (foundIndex === undefined) {
                                if (value === (trackBy ? prevList[j][trackBy] : prevList[j])) {
                                    let $item = $items.shift();
                                    if (new$ItemMap.has(value)) {
                                        new$ItemMap.get(value).push($item);
                                    }
                                    else {
                                        new$ItemMap.set(value, [$item]);
                                    }
                                    if (!$items.length) {
                                        $itemMap.delete(value);
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
                                        let ii$Items = $itemMap.get(iiValue);
                                        if (new$ItemMap.has(iiValue)) {
                                            new$ItemMap.get(iiValue).push(ii$Items.shift());
                                        }
                                        else {
                                            new$ItemMap.set(iiValue, [ii$Items.shift()]);
                                        }
                                        if (!ii$Items.length) {
                                            $itemMap.delete(iiValue);
                                        }
                                        continue;
                                    }
                                    if (foundCount < foundIndex - startIndex) {
                                        for (let k = foundIndex; k < j; k++) {
                                            let kValue = trackBy
                                                ? prevList[k][trackBy]
                                                : prevList[k];
                                            let k$Item = new$ItemMap.get(kValue);
                                            k$Item[0].item.set(item);
                                            k$Item[0].index.set(i);
                                            lastNode = insertBefore(k$Item[0].nodes, lastNode == el ? lastNode : lastNode.nextSibling);
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
                                    let index = removedValues.get(kValue) || 0;
                                    removeNodes_1.removeNodes($itemMap.get(kValue)[index].nodes);
                                    removedValues.set(kValue, index + 1);
                                }
                                let lastFoundValue = trackBy
                                    ? prevList[j - 1][trackBy]
                                    : prevList[j - 1];
                                let nodes = new$ItemMap.get(lastFoundValue)[removedValues.get(lastFoundValue) || 0].nodes;
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
                    let itemCell = new cellx_1.Cell(item);
                    let indexCell = new cellx_1.Cell(i);
                    let content = this.element.contentTemplate.render();
                    let context = this.$context;
                    let contentBindingResult = [null, null, null];
                    bindContent_1.bindContent(content, this.ownerComponent, Object.create(context, {
                        '$/': {
                            configurable: false,
                            enumerable: false,
                            writable: false,
                            value: context['$/'] || context
                        },
                        [this._itemName]: {
                            configurable: true,
                            enumerable: true,
                            get: (itemCell => () => itemCell.get())(itemCell)
                        },
                        $index: {
                            configurable: true,
                            enumerable: true,
                            get: (indexCell => () => indexCell.get())(indexCell)
                        }
                    }), contentBindingResult);
                    let childComponents = contentBindingResult[0];
                    let backBindings = contentBindingResult[2];
                    let new$Item = {
                        item: itemCell,
                        index: indexCell,
                        nodes: slice.call(content.childNodes),
                        bindings: contentBindingResult[1],
                        childComponents
                    };
                    if (new$ItemMap.has(value)) {
                        new$ItemMap.get(value).push(new$Item);
                    }
                    else {
                        new$ItemMap.set(value, [new$Item]);
                    }
                    if (childComponents) {
                        for (let i = childComponents.length; i;) {
                            let childComponent = childComponents[--i];
                            if (childComponent.element.firstChild &&
                                childComponent.constructor
                                    .bindsInputContent) {
                                childComponent.$inputContent = move_content_1.moveContent(document.createDocumentFragment(), childComponent.element);
                            }
                        }
                    }
                    let newLastNode = content.lastChild;
                    ElementProtoMixin_1.suppressConnectionStatusCallbacks();
                    lastNode.parentNode.insertBefore(content, lastNode == el ? lastNode : lastNode.nextSibling);
                    ElementProtoMixin_1.resumeConnectionStatusCallbacks();
                    lastNode = newLastNode;
                    if (childComponents) {
                        attachChildComponentElements_1.attachChildComponentElements(childComponents);
                    }
                    if (backBindings) {
                        for (let i = backBindings.length; i; i -= 3) {
                            backBindings[i - 3].on('change:' + backBindings[i - 2], backBindings[i - 1]);
                        }
                    }
                    changed = true;
                    i++;
                }
            }
            if (removedValues.size) {
                ($itemMap => {
                    removedValues.forEach((_removedCount, value) => {
                        for (let $item of $itemMap.get(value)) {
                            offBindings($item.bindings);
                            deactivateChildComponents($item.childComponents);
                        }
                    });
                })($itemMap);
            }
            this._$itemMap = new$ItemMap;
        }
        else {
            this._$itemMap = new map_set_polyfill_1.Map();
        }
        if (startIndex < prevListLength) {
            for (let i = startIndex; i < prevListLength; i++) {
                let value = trackBy ? prevList[i][trackBy] : prevList[i];
                for (let $item of $itemMap.get(value)) {
                    removeNodes_1.removeNodes($item.nodes);
                    offBindings($item.bindings);
                    deactivateChildComponents($item.childComponents);
                }
            }
        }
        else if (!changed) {
            return;
        }
        this._prevList = Array.isArray(list) ? list.slice() : list.toArray();
        if (fromChangeEvent) {
            cellx_1.Cell.forceRelease();
            this.emit('change');
        }
    }
    _deactivate() {
        if (!this._active) {
            return;
        }
        this._active = false;
        this._list.off('change', this._onListChange, this);
        let prevList = this._prevList;
        let $itemMap = this._$itemMap;
        let trackBy = this._trackBy;
        for (let i = 0, l = prevList.length; i < l; i++) {
            let value = trackBy ? prevList[i][trackBy] : prevList[i];
            for (let $item of $itemMap.get(value)) {
                removeNodes_1.removeNodes($item.nodes);
                offBindings($item.bindings);
                deactivateChildComponents($item.childComponents);
            }
        }
        $itemMap.clear();
    }
};
RnRepeat = __decorate([
    Component_1.Component({
        elementIs: 'RnRepeat',
        elementExtends: 'template',
        params: {
            for: { property: 'paramFor', type: String, required: true, readonly: true },
            trackBy: { property: 'paramTrackBy', type: String, readonly: true }
        }
    })
], RnRepeat);
exports.RnRepeat = RnRepeat;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = __webpack_require__(12);
const RnIfThen_1 = __webpack_require__(49);
let RnIfElse = class RnIfElse extends RnIfThen_1.RnIfThen {
    constructor() {
        super(...arguments);
        this._elseMode = true;
    }
};
RnIfElse = __decorate([
    Component_1.Component({
        elementIs: 'RnIfElse',
        elementExtends: 'template'
    })
], RnIfElse);
exports.RnIfElse = RnIfElse;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_uid_1 = __webpack_require__(29);
const map_set_polyfill_1 = __webpack_require__(7);
const move_content_1 = __webpack_require__(31);
const symbol_polyfill_1 = __webpack_require__(8);
const attachChildComponentElements_1 = __webpack_require__(33);
const BaseComponent_1 = __webpack_require__(28);
const bindContent_1 = __webpack_require__(34);
const Component_1 = __webpack_require__(12);
const ElementProtoMixin_1 = __webpack_require__(24);
const cloneNode_1 = __webpack_require__(56);
const KEY_SLOT_CONTENT_MAP = symbol_polyfill_1.Symbol('Rionite/RnSlot[slotContentMap]');
let RnSlot = class RnSlot extends BaseComponent_1.BaseComponent {
    static get bindsInputContent() {
        return true;
    }
    _attach() {
        this._attached = true;
        if (this.isReady) {
            this._unfreezeBindings();
            return;
        }
        let ownerComponent = this.ownerComponent;
        let contentOwnerComponent = ownerComponent.ownerComponent;
        let ownerComponentInputContent = ownerComponent.$inputContent;
        let el = this.element;
        let cloneContent = this.paramCloneContent;
        let content;
        let childComponents;
        let bindings;
        let backBindings;
        if (ownerComponentInputContent || !cloneContent) {
            let slotName = this.paramName;
            let forTag;
            let for$;
            if (!slotName) {
                forTag = this.paramForTag;
                if (forTag) {
                    forTag = forTag.toUpperCase();
                }
                else {
                    for$ = this.paramFor;
                }
            }
            let key = get_uid_1.getUID(ownerComponent) +
                '/' +
                (slotName ? 'slot:' + slotName : forTag ? 'tag:' + forTag : for$ || '');
            if (slotName || forTag || for$) {
                let contentMap;
                if (!cloneContent &&
                    (contentMap = contentOwnerComponent[KEY_SLOT_CONTENT_MAP]) &&
                    contentMap.has(key)) {
                    let container = contentMap.get(key);
                    if (container.firstChild) {
                        content = move_content_1.moveContent(document.createDocumentFragment(), container);
                        contentMap.set(key, el);
                        childComponents = container.$component._childComponents;
                        bindings = container.$component._bindings;
                    }
                }
                else if (ownerComponentInputContent) {
                    if (for$ && for$.indexOf('__') == -1) {
                        let elementBlockNames = ownerComponent.constructor
                            ._elementBlockNames;
                        for$ = elementBlockNames[elementBlockNames.length - 1] + '__' + for$;
                    }
                    let selectedElements = ownerComponentInputContent.querySelectorAll(for$ ? '.' + for$ : forTag || `[slot=${slotName}]`);
                    let selectedElementCount = selectedElements.length;
                    if (selectedElementCount) {
                        content = document.createDocumentFragment();
                        for (let i = 0; i < selectedElementCount; i++) {
                            content.appendChild(cloneContent ? cloneNode_1.cloneNode(selectedElements[i]) : selectedElements[i]);
                        }
                    }
                    if (!cloneContent) {
                        (contentMap ||
                            contentOwnerComponent[KEY_SLOT_CONTENT_MAP] ||
                            (contentOwnerComponent[KEY_SLOT_CONTENT_MAP] = new map_set_polyfill_1.Map())).set(key, el);
                    }
                }
            }
            else if (cloneContent) {
                content = cloneNode_1.cloneNode(ownerComponentInputContent);
            }
            else {
                let contentMap = contentOwnerComponent[KEY_SLOT_CONTENT_MAP];
                if (contentMap && contentMap.has(key)) {
                    let container = contentMap.get(key);
                    content = move_content_1.moveContent(document.createDocumentFragment(), container);
                    contentMap.set(key, el);
                    childComponents = container.$component._childComponents;
                    bindings = container.$component._bindings;
                }
                else if (ownerComponentInputContent) {
                    content = ownerComponentInputContent;
                    (contentMap || (contentOwnerComponent[KEY_SLOT_CONTENT_MAP] = new map_set_polyfill_1.Map())).set(key, el);
                }
            }
        }
        if (bindings === undefined) {
            if (content || this.element.contentTemplate) {
                let contentBindingResult = [null, null, null];
                if (content) {
                    bindContent_1.bindContent(content, contentOwnerComponent, this.paramGetContext
                        ? this.paramGetContext.call(ownerComponent, ownerComponent.$context, this)
                        : ownerComponent.$context, contentBindingResult);
                }
                else {
                    content = this.element.contentTemplate.render();
                    bindContent_1.bindContent(content, ownerComponent, this.paramGetContext
                        ? this.paramGetContext.call(ownerComponent, this.$context, this)
                        : this.$context, contentBindingResult);
                }
                childComponents = this._childComponents = contentBindingResult[0];
                this._bindings = contentBindingResult[1];
                backBindings = contentBindingResult[2];
                if (childComponents) {
                    for (let i = childComponents.length; i;) {
                        let childComponent = childComponents[--i];
                        if (childComponent.element.firstChild &&
                            childComponent.constructor.bindsInputContent) {
                            childComponent.$inputContent = move_content_1.moveContent(document.createDocumentFragment(), childComponent.element);
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
            ElementProtoMixin_1.suppressConnectionStatusCallbacks();
            el.appendChild(content);
            ElementProtoMixin_1.resumeConnectionStatusCallbacks();
        }
        if (childComponents) {
            attachChildComponentElements_1.attachChildComponentElements(childComponents);
        }
        if (backBindings) {
            for (let i = backBindings.length; i; i -= 3) {
                backBindings[i - 3].on('change:' + backBindings[i - 2], backBindings[i - 1]);
            }
        }
        this.isReady = true;
    }
    _detach() {
        this._attached = false;
        this._freezeBindings();
    }
};
RnSlot = __decorate([
    Component_1.Component({
        elementIs: 'RnSlot',
        params: {
            name: { property: 'paramName', type: String, readonly: true },
            forTag: { property: 'paramForTag', type: String, readonly: true },
            for: { property: 'paramFor', type: String, readonly: true },
            cloneContent: { property: 'paramCloneContent', default: false, readonly: true },
            getContext: { property: 'paramGetContext', type: Object, readonly: true }
        }
    })
], RnSlot);
exports.RnSlot = RnSlot;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const IE = !!document.documentMode || navigator.userAgent.indexOf('Edge/') != -1;
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
            else if (IE) {
                copy = window.innerHTML(document.createElement('div'), `<${tagName}>`)
                    .firstChild;
            }
            else {
                copy = document.createElementNS(node.namespaceURI, tagName);
            }
            if ((tagName == 'template' || tagName == 'rn-slot') &&
                node.contentTemplate) {
                copy.contentTemplate = node.contentTemplate;
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
exports.cloneNode = cloneNode;


/***/ })
/******/ ]);
});