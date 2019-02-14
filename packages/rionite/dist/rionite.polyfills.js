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
		module.exports = factory(require("@riim/kebab-case"), require("@riim/rionite-snake-case-attribute-name"), require("@riim/map-set-polyfill"), require("@riim/symbol-polyfill"), require("@riim/next-uid"), require("cellx"), require("@riim/gettext"), require("@riim/escape-html"), require("@riim/is-regexp"), require("@riim/defer"), require("@riim/lower-case-first-word"), require("@riim/get-uid"), require("@riim/logger"), require("@riim/move-content"), require("@riim/set-attribute"), require("escape-string"), require("@riim/next-tick"));
	else if(typeof define === 'function' && define.amd)
		define(["@riim/kebab-case", "@riim/rionite-snake-case-attribute-name", "@riim/map-set-polyfill", "@riim/symbol-polyfill", "@riim/next-uid", "cellx", "@riim/gettext", "@riim/escape-html", "@riim/is-regexp", "@riim/defer", "@riim/lower-case-first-word", "@riim/get-uid", "@riim/logger", "@riim/move-content", "@riim/set-attribute", "escape-string", "@riim/next-tick"], factory);
	else if(typeof exports === 'object')
		exports["rionite"] = factory(require("@riim/kebab-case"), require("@riim/rionite-snake-case-attribute-name"), require("@riim/map-set-polyfill"), require("@riim/symbol-polyfill"), require("@riim/next-uid"), require("cellx"), require("@riim/gettext"), require("@riim/escape-html"), require("@riim/is-regexp"), require("@riim/defer"), require("@riim/lower-case-first-word"), require("@riim/get-uid"), require("@riim/logger"), require("@riim/move-content"), require("@riim/set-attribute"), require("escape-string"), require("@riim/next-tick"));
	else
		root["rionite"] = factory(root["@riim/kebab-case"], root["@riim/rionite-snake-case-attribute-name"], root["@riim/map-set-polyfill"], root["@riim/symbol-polyfill"], root["@riim/next-uid"], root["cellx"], root["@riim/gettext"], root["@riim/escape-html"], root["@riim/is-regexp"], root["@riim/defer"], root["@riim/lower-case-first-word"], root["@riim/get-uid"], root["@riim/logger"], root["@riim/move-content"], root["@riim/set-attribute"], root["escape-string"], root["@riim/next-tick"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__4__, __WEBPACK_EXTERNAL_MODULE__5__, __WEBPACK_EXTERNAL_MODULE__7__, __WEBPACK_EXTERNAL_MODULE__8__, __WEBPACK_EXTERNAL_MODULE__11__, __WEBPACK_EXTERNAL_MODULE__12__, __WEBPACK_EXTERNAL_MODULE__14__, __WEBPACK_EXTERNAL_MODULE__22__, __WEBPACK_EXTERNAL_MODULE__23__, __WEBPACK_EXTERNAL_MODULE__27__, __WEBPACK_EXTERNAL_MODULE__29__, __WEBPACK_EXTERNAL_MODULE__31__, __WEBPACK_EXTERNAL_MODULE__32__, __WEBPACK_EXTERNAL_MODULE__33__, __WEBPACK_EXTERNAL_MODULE__36__, __WEBPACK_EXTERNAL_MODULE__38__, __WEBPACK_EXTERNAL_MODULE__51__) {
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
var DisposableMixin_1 = __webpack_require__(10);
exports.DisposableMixin = DisposableMixin_1.DisposableMixin;
var formatters_1 = __webpack_require__(13);
exports.formatters = formatters_1.formatters;
var Component_1 = __webpack_require__(15);
exports.Component = Component_1.Component;
var Param_1 = __webpack_require__(28);
exports.Param = Param_1.Param;
var Constants_1 = __webpack_require__(24);
exports.KEY_PARAMS_CONFIG = Constants_1.KEY_PARAMS_CONFIG;
exports.KEY_PARAMS = Constants_1.KEY_PARAMS;
var BaseComponent_1 = __webpack_require__(30);
exports.BaseComponent = BaseComponent_1.BaseComponent;
var ElementProtoMixin_1 = __webpack_require__(26);
exports.KEY_ELEMENT_CONNECTED = ElementProtoMixin_1.KEY_ELEMENT_CONNECTED;
var ComponentParams_1 = __webpack_require__(20);
exports.ComponentParams = ComponentParams_1.ComponentParams;
var Template2_1 = __webpack_require__(3);
exports.TemplateNodeType = Template2_1.NodeType;
exports.Template = Template2_1.Template;
var registerComponent_1 = __webpack_require__(16);
exports.registerComponent = registerComponent_1.registerComponent;
var RnIfThen_1 = __webpack_require__(50);
exports.RnIfThen = RnIfThen_1.RnIfThen;
var RnIfElse_1 = __webpack_require__(55);
exports.RnIfElse = RnIfElse_1.RnIfElse;
var RnRepeat_1 = __webpack_require__(54);
exports.RnRepeat = RnRepeat_1.RnRepeat;
var RnSlot_1 = __webpack_require__(56);
exports.RnSlot = RnSlot_1.RnSlot;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

if (!('firstElementChild' in DocumentFragment.prototype)) {
    Object.defineProperty(DocumentFragment.prototype, 'firstElementChild', {
        configurable: true,
        enumerable: false,
        get: function () {
            for (var child = this.firstChild; child; child = child.nextSibling) {
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
        get: function () {
            for (var child = this.nextSibling; child; child = child.nextSibling) {
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
var Template2_1 = __webpack_require__(3);
['if-then', 'if-else', 'repeat'].forEach(function (name) {
    Template2_1.Template.helpers[name] = function (el) {
        var attrs = el.attributes;
        // проверка на attrs для `@/name // ...`
        if (name != 'repeat' && attrs) {
            var list = attrs.list;
            if (list) {
                var index = list['length='] - 1;
                var foundIndex = void 0;
                for (; index >= 0; index--) {
                    if (list[index].value == '') {
                        foundIndex = index;
                    }
                    else if (list[index].name == 'if') {
                        break;
                    }
                }
                if (index == -1 && foundIndex !== undefined) {
                    var attr = list[foundIndex];
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
                nodeType: Template2_1.NodeType.ELEMENT,
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
Template2_1.Template.helpers.slot = function (el) {
    return [
        {
            nodeType: Template2_1.NodeType.ELEMENT,
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
var kebab_case_1 = __webpack_require__(4);
var rionite_snake_case_attribute_name_1 = __webpack_require__(5);
var NodeType;
(function (NodeType) {
    NodeType[NodeType["BLOCK"] = 1] = "BLOCK";
    NodeType[NodeType["ELEMENT_CALL"] = 2] = "ELEMENT_CALL";
    NodeType[NodeType["SUPER_CALL"] = 3] = "SUPER_CALL";
    NodeType[NodeType["DEBUGGER_CALL"] = 4] = "DEBUGGER_CALL";
    NodeType[NodeType["ELEMENT"] = 5] = "ELEMENT";
    NodeType[NodeType["TEXT"] = 6] = "TEXT";
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
var reWhitespace = /\s/;
var reTagNameOrNothing = /[a-zA-Z][\-\w]*(?::[a-zA-Z][\-\w]*)?|/g;
var reElementNameOrNothing = /[a-zA-Z][\-\w]*|/g;
var reAttributeNameOrNothing = /[^\s'">/=,)]+|/g;
var reSuperCallOrNothing = /super(?:\.([a-zA-Z][\-\w]*))?!|/g;
function normalizeMultilineText(text) {
    return text
        .trim()
        .replace(/[ \t]*(?:\n|\r\n?)/g, '\n')
        .replace(/\n[ \t]+/g, '\n');
}
exports.ELEMENT_NAME_DELIMITER = '__';
var Template = /** @class */ (function () {
    function Template(template, options) {
        this.initialized = false;
        var isEmbedded = (this._isEmbedded = !!(options && options._isEmbedded));
        var parent = (this.parent = (options && options.parent) || null);
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
            var blockName = options && options.blockName;
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
    Template.prototype.initialize = function (component) {
        var _this = this;
        if (this.initialized) {
            return;
        }
        this.initialized = true;
        if (this.parent) {
            this.parent.parse(component);
        }
        var parent = this.parent;
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
                parent._embeddedTemplates.map(function (template) {
                    return new Template({
                        nodeType: NodeType.BLOCK,
                        content: template.block.content,
                        elements: _this._elements
                    }, {
                        _isEmbedded: true,
                        parent: _this
                    });
                });
    };
    Template.prototype.parse = function (component) {
        this.initialize(component);
        if (this.block) {
            return this.block;
        }
        this._pos = 0;
        this._chr = this.template.charAt(0);
        this._skipWhitespacesAndComments();
        var block = (this.block = {
            nodeType: NodeType.BLOCK,
            content: null,
            elements: this._elements
        });
        this._readContent(this.parent ? null : block.elements['@root'].content, null, false, component && component.constructor);
        return block;
    };
    Template.prototype._readContent = function (content, superElName, brackets, componentConstr) {
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
                    var chr = this._chr;
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
                        var superCall = this._readSuperCall(superElName);
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
    };
    Template.prototype._readElement = function (targetContent, superElName, componentConstr) {
        var pos = this._pos;
        var isHelper = this._chr == '@';
        if (isHelper) {
            this._next();
        }
        var tagName = this._readName(reTagNameOrNothing);
        var elNames;
        var elName;
        if (this._chr == '/') {
            this._next();
            var pos_1 = this._pos;
            this._skipWhitespaces();
            if (this._chr == ',') {
                this._next();
                this._skipWhitespaces();
                elNames = [null];
            }
            for (var name_1; (name_1 = this._readName(reElementNameOrNothing));) {
                (elNames || (elNames = [])).push(name_1);
                if (this._skipWhitespaces() != ',') {
                    break;
                }
                this._next();
                this._skipWhitespaces();
            }
            if (!elNames || (!elNames[0] && elNames.length == 1)) {
                this._throwError('Expected element name', pos_1);
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
        var attrs;
        if (this._chr == '(') {
            attrs = this._readAttributes(elName || superElName, isHelper);
            this._skipWhitespaces();
        }
        if (elNames && componentConstr) {
            var events = componentConstr.events;
            var domEvents = componentConstr.domEvents;
            if (events || domEvents) {
                for (var _i = 0, elNames_1 = elNames; _i < elNames_1.length; _i++) {
                    var name_2 = elNames_1[_i];
                    if (!name_2) {
                        continue;
                    }
                    if (events && events[name_2]) {
                        var attrList = (attrs ||
                            (attrs = {
                                isAttributeValue: null,
                                list: { __proto__: null, 'length=': 0 }
                            })).list;
                        for (var type in events[name_2]) {
                            var attrName = 'oncomponent-' +
                                (type.charAt(0) == '<'
                                    ? type.slice(type.indexOf('>', 2) + 1)
                                    : type);
                            attrList[attrList[attrName] === undefined
                                ? (attrList[attrName] = attrList['length=']++)
                                : attrList[attrName]] = {
                                name: attrName,
                                value: ':' + name_2
                            };
                        }
                    }
                    if (domEvents && domEvents[name_2]) {
                        var attrList = (attrs ||
                            (attrs = {
                                isAttributeValue: null,
                                list: { __proto__: null, 'length=': 0 }
                            })).list;
                        for (var type in domEvents[name_2]) {
                            var attrName = 'on-' + type;
                            attrList[attrList[attrName] === undefined
                                ? (attrList[attrName] = attrList['length=']++)
                                : attrList[attrName]] = {
                                name: attrName,
                                value: ':' + name_2
                            };
                        }
                    }
                }
            }
        }
        var content;
        if (this._chr == '{') {
            content = this._readContent(null, elName || superElName, true, componentConstr);
        }
        var el;
        if (isHelper) {
            var helper = Template.helpers[tagName];
            if (!helper) {
                this._throwError("Helper \"" + tagName + "\" is not defined", pos);
            }
            el = {
                nodeType: NodeType.ELEMENT,
                isHelper: true,
                tagName: tagName,
                is: (attrs && attrs.isAttributeValue) || null,
                names: elNames || null,
                attributes: attrs || null,
                content: content || null,
                contentTemplateIndex: null
            };
            content = helper(el);
            if (content && content.length) {
                el.content = content;
                for (var i = 0, l = content.length; i < l; i++) {
                    var node = content[i];
                    if (node.nodeType == NodeType.ELEMENT) {
                        if (node.content &&
                            (node.tagName == 'template' ||
                                node.tagName == 'rn-slot')) {
                            var el_1 = {
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
                            var elName_1 = el_1.names && el_1.names[0];
                            if (elName_1) {
                                this._elements[elName_1] = el_1;
                                content[i] = {
                                    nodeType: NodeType.ELEMENT_CALL,
                                    name: elName_1
                                };
                            }
                            else {
                                content[i] = el_1;
                            }
                        }
                        else {
                            var elName_2 = node.names && node.names[0];
                            if (elName_2) {
                                this._elements[elName_2] = node;
                                content[i] = {
                                    nodeType: NodeType.ELEMENT_CALL,
                                    name: elName_2
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
                tagName: tagName,
                is: (attrs && attrs.isAttributeValue) || null,
                names: elNames || null,
                attributes: attrs || null,
                content: content || null,
                contentTemplateIndex: content && (tagName == 'template' || tagName == 'rn-slot')
                    ? (this._embeddedTemplates || (this._embeddedTemplates = [])).push(new Template({
                        nodeType: NodeType.BLOCK,
                        content: content,
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
    };
    Template.prototype._readAttributes = function (superElName, isElementHelper) {
        this._next('(');
        if (this._skipWhitespacesAndComments() == ')') {
            this._next();
            return null;
        }
        var superCall;
        var isAttrValue;
        var list;
        loop: for (var f = true;;) {
            if (f && this._chr == 's' && (superCall = this._readSuperCall(superElName))) {
                var superElAttrs = superCall.element.attributes;
                if (superElAttrs) {
                    isAttrValue = superElAttrs.isAttributeValue;
                    list = { __proto__: superElAttrs.list };
                }
                this._skipWhitespacesAndComments();
            }
            else {
                var name_3 = this._readName(reAttributeNameOrNothing);
                if (!name_3) {
                    this._throwError('Expected attribute name');
                    throw 1;
                }
                if (this._skipWhitespacesAndComments() == '=') {
                    this._next();
                    var chr = this._skipWhitespaces();
                    if (chr == "'" || chr == '"' || chr == '`') {
                        if (name_3 == 'is') {
                            isAttrValue = this._readString();
                        }
                        else {
                            (list || (list = { __proto__: null, 'length=': 0 }))[list[name_3] === undefined
                                ? (list[name_3] = list['length=']++)
                                : list[name_3]] = {
                                name: name_3,
                                value: this._readString()
                            };
                        }
                        this._skipWhitespacesAndComments();
                    }
                    else {
                        var value = '';
                        for (;;) {
                            if (!chr) {
                                this._throwError('Unexpected end of template. Expected "," or ")" to finalize attribute value.');
                            }
                            if (chr == ',' || chr == ')' || chr == '\n' || chr == '\r') {
                                if (name_3 == 'is') {
                                    isAttrValue = value.trim();
                                }
                                else {
                                    (list || (list = { __proto__: null, 'length=': 0 }))[list[name_3] === undefined
                                        ? (list[name_3] = list['length=']++)
                                        : list[name_3]] = {
                                        name: name_3,
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
                else if (name_3 == 'is') {
                    isAttrValue = '';
                }
                else {
                    (list || (list = { __proto__: null, 'length=': 0 }))[list[name_3] === undefined ? (list[name_3] = list['length=']++) : list[name_3]] = {
                        name: name_3,
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
    };
    Template.prototype._readSuperCall = function (defaultElName) {
        reSuperCallOrNothing.lastIndex = this._pos;
        var match = reSuperCallOrNothing.exec(this.template);
        if (match[0]) {
            if (!this.parent) {
                this._throwError('SuperCall is impossible if no parent is defined');
            }
            var elName = match[1] ||
                defaultElName ||
                this._throwError('SuperCall.elementName is required');
            var el = (elName.charAt(0) == '@' && this.parent._elements[elName.slice(1)]) ||
                this.parent._elements[elName];
            if (!el) {
                this._throwError("Element \"" + elName + "\" is not defined");
            }
            this._chr = this.template.charAt((this._pos = reSuperCallOrNothing.lastIndex));
            return {
                nodeType: NodeType.SUPER_CALL,
                elementName: elName,
                element: el
            };
        }
        return null;
    };
    Template.prototype._readName = function (reNameOrNothing) {
        reNameOrNothing.lastIndex = this._pos;
        var name = reNameOrNothing.exec(this.template)[0];
        if (name) {
            this._chr = this.template.charAt((this._pos = reNameOrNothing.lastIndex));
            return name;
        }
        return null;
    };
    Template.prototype._readString = function () {
        var quoteChar = this._chr;
        // if (process.env.DEBUG && quoteChar != "'" && quoteChar != '"' && quoteChar != '`') {
        // 	this._throwError('Expected string');
        // }
        var str = '';
        for (var chr = this._next(); chr;) {
            if (chr == quoteChar) {
                this._next();
                return quoteChar == '`' ? normalizeMultilineText(str) : str;
            }
            if (chr == '\\') {
                chr = this._next();
                if (chr == 'x' || chr == 'u') {
                    var pos = this._pos + 1;
                    var hexadecimal = chr == 'x';
                    var code = parseInt(this.template.slice(pos, pos + (hexadecimal ? 2 : 4)), 16);
                    if (!isFinite(code)) {
                        this._throwError("Invalid " + (hexadecimal ? 'hexadecimal' : 'unicode') + " escape sequence", pos);
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
    };
    Template.prototype._skipWhitespaces = function () {
        var chr = this._chr;
        while (chr && reWhitespace.test(chr)) {
            chr = this._next();
        }
        return chr;
    };
    Template.prototype._skipWhitespacesAndComments = function () {
        var chr = this._chr;
        loop1: for (;;) {
            if (chr == '/') {
                switch (this.template.charAt(this._pos + 1)) {
                    case '/': {
                        this._next();
                        while ((chr = this._next()) && chr != '\n' && chr != '\r') { }
                        break;
                    }
                    case '*': {
                        var pos = this._pos;
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
    };
    Template.prototype._next = function (current) {
        if (current && current != this._chr) {
            this._throwError("Expected \"" + current + "\" instead of \"" + this._chr + "\"");
        }
        return (this._chr = this.template.charAt(++this._pos));
    };
    Template.prototype._throwError = function (msg, pos) {
        if (pos === void 0) { pos = this._pos; }
        var n = pos < 40 ? 40 - pos : 0;
        throw new SyntaxError(msg +
            '\n' +
            this.template
                .slice(pos < 40 ? 0 : pos - 40, pos + 20)
                .replace(/\t/g, ' ')
                .replace(/\n|\r\n?/g, function (match) {
                if (match.length == 2) {
                    n++;
                }
                return '↵';
            }) +
            '\n' +
            '----------------------------------------'.slice(n) +
            '↑');
    };
    Template.prototype.extend = function (template, options) {
        return new Template(template, {
            __proto__: options,
            parent: this
        });
    };
    Template.prototype.setBlockName = function (blockName) {
        if (Array.isArray(blockName)) {
            (this._elementNamesTemplate = blockName.map(function (blockName) { return blockName + exports.ELEMENT_NAME_DELIMITER; })).push('');
        }
        else {
            this._elementNamesTemplate[0] = blockName + exports.ELEMENT_NAME_DELIMITER;
        }
        return this;
    };
    Template.prototype.render = function (component) {
        var block = this.parse(component);
        return renderContent(document.createDocumentFragment(), this, block.content || block.elements['@root'].content);
    };
    Template.helpers = {
        section: function (el) { return el.content; }
    };
    return Template;
}());
exports.Template = Template;
function renderContent(targetNode, template, content, isSVG) {
    if (content) {
        for (var _i = 0, content_1 = content; _i < content_1.length; _i++) {
            var node = content_1[_i];
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
                        var el = void 0;
                        if (isSVG) {
                            el = document.createElementNS('http://www.w3.org/2000/svg', node.tagName);
                        }
                        else if (node.is) {
                            el = window.innerHTML(document.createElement('div'), "<" + node.tagName + " is=\"" + node.is + "\">").firstChild;
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
                        var attrList = node.attributes && node.attributes.list;
                        if (attrList) {
                            for (var i = 0, l = attrList['length=']; i < l; i++) {
                                var attr = attrList[i];
                                var attrName = attr.name;
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
    var elClasses = '';
    for (var i = elNames[0] ? 0 : 1, l = elNames.length; i < l; i++) {
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
var map_set_polyfill_1 = __webpack_require__(7);
var symbol_polyfill_1 = __webpack_require__(8);
var Features_1 = __webpack_require__(9);
var Container = /** @class */ (function () {
    function Container() {
    }
    Container.registerService = function (key, service) {
        this._services.set(key, service);
        return this;
    };
    Container.get = function (key, args) {
        var service = this._services.get(key) || key;
        return (service.$instance ||
            (Features_1.reflectConstructFeature
                ? Reflect.construct(service, args || [])
                : service.apply(Object.create(service.prototype), args)));
    };
    Container.reset = function () {
        this._services.clear();
        return this;
    };
    Container._services = new map_set_polyfill_1.Map();
    return Container;
}());
exports.Container = Container;
function Inject(target, propertyName, propertyDesc) {
    var type = Reflect.getMetadata('design:type', target, propertyName);
    var KEY_INSTANCE = symbol_polyfill_1.Symbol("Rionite/Inject[instance:" + propertyName + "]");
    return {
        configurable: propertyDesc && propertyDesc.configurable !== undefined
            ? propertyDesc.configurable
            : true,
        enumerable: propertyDesc && propertyDesc.enumerable !== undefined ? propertyDesc.enumerable : true,
        get: function () {
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
var nativeCustomElementsFeature_ = false;
var TestNativeCustomElementsFeature = exports.reflectConstructFeature
    ? function TestNativeCustomElementsFeature(self) {
        return Reflect.construct(HTMLElement, [self], TestNativeCustomElementsFeature);
    }
    : function TestNativeCustomElementsFeature(self) {
        return HTMLElement.call(this, self);
    };
Object.defineProperty(TestNativeCustomElementsFeature, 'observedAttributes', {
    get: function () {
        return ['test'];
    }
});
TestNativeCustomElementsFeature.prototype = Object.create(HTMLElement.prototype);
TestNativeCustomElementsFeature.prototype.constructor = TestNativeCustomElementsFeature;
TestNativeCustomElementsFeature.prototype.attributeChangedCallback = function () {
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
var next_uid_1 = __webpack_require__(11);
var cellx_1 = __webpack_require__(12);
var DisposableMixin = /** @class */ (function () {
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
            if (Array.isArray(target) ||
                target instanceof NodeList ||
                target instanceof HTMLCollection) {
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
        var id = next_uid_1.nextUID();
        var stopListening = function () {
            for (var i = listenings.length; i;) {
                listenings[--i].stop();
            }
            delete _this._disposables[id];
        };
        var listening = (this._disposables[id] = {
            stop: stopListening,
            dispose: stopListening
        });
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
        var id = next_uid_1.nextUID();
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
        var listening = (this._disposables[id] = {
            stop: stopListening,
            dispose: stopListening
        });
        return listening;
    };
    DisposableMixin.prototype.setTimeout = function (callback, delay) {
        var _this = this;
        var id = next_uid_1.nextUID();
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
        var timeout = (this._disposables[id] = {
            clear: clearTimeout_,
            dispose: clearTimeout_
        });
        return timeout;
    };
    DisposableMixin.prototype.setInterval = function (callback, delay) {
        var _this = this;
        var id = next_uid_1.nextUID();
        var intervalId = setInterval(function () {
            callback.call(_this);
        }, delay);
        var clearInterval_ = function () {
            if (_this._disposables[id]) {
                clearInterval(intervalId);
                delete _this._disposables[id];
            }
        };
        var interval = (this._disposables[id] = {
            clear: clearInterval_,
            dispose: clearInterval_
        });
        return interval;
    };
    DisposableMixin.prototype.registerCallback = function (callback) {
        var _this = this;
        var id = next_uid_1.nextUID();
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
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__11__;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__12__;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var gettext_1 = __webpack_require__(14);
exports.formatters = {
    default: function (value, arg) {
        return value === undefined ? arg : value;
    },
    placeholder: function (value, arg) {
        return value === null ? arg : value;
    },
    or: function (value, arg) {
        return value || arg;
    },
    cond: function (condition, value1, value2) {
        return condition ? value1 : value2;
    },
    not: function (value) {
        return !value;
    },
    notnot: function (value) {
        return !!value;
    },
    eq: function (value, arg) {
        return value == arg;
    },
    identical: function (value, arg) {
        return value === arg;
    },
    lt: function (value, arg) {
        return value < arg;
    },
    lte: function (value, arg) {
        return value <= arg;
    },
    gt: function (value, arg) {
        return value > arg;
    },
    gte: function (value, arg) {
        return value >= arg;
    },
    has: function (obj, key) {
        return !!obj && (typeof obj.has == 'function' ? obj.has(key) : obj.hasOwnProperty(key));
    },
    get: function (obj, key) {
        return obj && (typeof obj.get == 'function' ? obj.get(key) : obj[key]);
    },
    key: function (obj, key) {
        return obj && obj[key];
    },
    join: function (arr, separator) {
        if (separator === void 0) { separator = ', '; }
        return arr && arr.join(separator);
    },
    dump: function (value) {
        return value == null ? value : JSON.stringify(value);
    },
    t: function (msgid) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return gettext_1.getText('', msgid, args);
    },
    pt: function (msgid, msgctxt) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return gettext_1.getText(msgctxt, msgid, args);
    }
};
exports.formatters.seq = exports.formatters.identical;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__14__;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var registerComponent_1 = __webpack_require__(16);
function Component(config) {
    return function (componentConstr) {
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var kebab_case_1 = __webpack_require__(4);
var pascalize_1 = __webpack_require__(17);
var rionite_snake_case_attribute_name_1 = __webpack_require__(5);
var cellx_1 = __webpack_require__(12);
var componentConstructorMap_1 = __webpack_require__(19);
var ComponentParams_1 = __webpack_require__(20);
var Constants_1 = __webpack_require__(24);
var elementConstructorMap_1 = __webpack_require__(25);
var ElementProtoMixin_1 = __webpack_require__(26);
var Features_1 = __webpack_require__(9);
var Template2_1 = __webpack_require__(3);
var push = Array.prototype.push;
function inheritProperty(target, source, name, depth) {
    var obj = target[name];
    var parentObj = source[name];
    if (obj && parentObj && obj != parentObj) {
        var o = (target[name] = { __proto__: parentObj });
        for (var key in obj) {
            o[key] = obj[key];
            if (depth) {
                inheritProperty(o, parentObj, key, depth - 1);
            }
        }
    }
}
function registerComponent(componentConstr) {
    var elIs = componentConstr.hasOwnProperty('elementIs')
        ? componentConstr.elementIs
        : (componentConstr.elementIs = componentConstr.name);
    if (!elIs) {
        throw new TypeError('Static property "elementIs" is required');
    }
    var kebabCaseElIs = kebab_case_1.kebabCase(elIs, true);
    if (componentConstructorMap_1.componentConstructorMap.has(kebabCaseElIs)) {
        throw new TypeError("Component \"" + kebabCaseElIs + "\" already registered");
    }
    var componentProto = componentConstr.prototype;
    var parentComponentConstr = Object.getPrototypeOf(componentProto)
        .constructor;
    inheritProperty(componentConstr, parentComponentConstr, 'params', 0);
    var paramsConfig = componentConstr.params;
    if (paramsConfig) {
        var _loop_1 = function (name_1) {
            var paramConfig = paramsConfig[name_1];
            if (paramConfig === null) {
                var parentParamConfig = parentComponentConstr.params && parentComponentConstr.params[name_1];
                if (parentParamConfig != null) {
                    Object.defineProperty(componentProto, (typeof parentParamConfig == 'object' &&
                        (parentParamConfig.type || parentParamConfig.default !== undefined) &&
                        parentParamConfig.property) ||
                        name_1, {
                        configurable: true,
                        enumerable: true,
                        writable: true,
                        value: null
                    });
                }
            }
            else {
                var snakeCaseName_1 = rionite_snake_case_attribute_name_1.snakeCaseAttributeName(name_1, true);
                var isObject = typeof paramConfig == 'object' &&
                    (!!paramConfig.type || paramConfig.default !== undefined);
                var propertyName_1 = (isObject && paramConfig.property) || name_1;
                var required = void 0;
                var readonly = void 0;
                if (isObject) {
                    required = paramConfig.required || false;
                    readonly = paramConfig.readonly || false;
                }
                else {
                    required = readonly = false;
                }
                var $paramConfig_1 = ((componentConstr.hasOwnProperty(Constants_1.KEY_PARAMS_CONFIG)
                    ? componentConstr[Constants_1.KEY_PARAMS_CONFIG]
                    : (componentConstr[Constants_1.KEY_PARAMS_CONFIG] = Object.create(null)))[name_1] = componentConstr[Constants_1.KEY_PARAMS_CONFIG][snakeCaseName_1] = {
                    name: name_1,
                    property: propertyName_1,
                    type: undefined,
                    typeSerializer: undefined,
                    default: undefined,
                    required: required,
                    readonly: readonly,
                    paramConfig: paramsConfig[name_1]
                });
                var descriptor = void 0;
                if (readonly) {
                    descriptor = {
                        configurable: true,
                        enumerable: true,
                        get: function () {
                            return this[Constants_1.KEY_PARAMS].get(name_1);
                        },
                        set: function (value) {
                            if (this[ComponentParams_1.KEY_COMPONENT_PARAMS_INITED]) {
                                if (value !== this[Constants_1.KEY_PARAMS].get(name_1)) {
                                    throw new TypeError("Parameter \"" + name_1 + "\" is readonly");
                                }
                            }
                            else {
                                this[Constants_1.KEY_PARAMS].set(name_1, value);
                            }
                        }
                    };
                }
                else {
                    Object.defineProperty(componentProto, propertyName_1 + 'Cell', {
                        configurable: true,
                        enumerable: false,
                        writable: true,
                        value: undefined
                    });
                    descriptor = {
                        configurable: true,
                        enumerable: true,
                        get: function () {
                            var valueCell = this[propertyName_1 + 'Cell'];
                            if (valueCell) {
                                return valueCell.get();
                            }
                            var currentlyPulling = cellx_1.Cell.currentlyPulling;
                            var value = this[Constants_1.KEY_PARAMS].get(name_1);
                            if (currentlyPulling || cellx_1.EventEmitter.currentlySubscribing) {
                                valueCell = new cellx_1.Cell(value, { context: this });
                                Object.defineProperty(this, propertyName_1 + 'Cell', {
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
                        set: function (value) {
                            if (this[ComponentParams_1.KEY_COMPONENT_PARAMS_INITED]) {
                                var rawValue = $paramConfig_1.typeSerializer.write(value, $paramConfig_1.default);
                                if (rawValue === null) {
                                    this.element.removeAttribute(snakeCaseName_1);
                                }
                                else {
                                    this.element.setAttribute(snakeCaseName_1, rawValue);
                                }
                                var valueCell = this[propertyName_1 + 'Cell'];
                                if (valueCell) {
                                    valueCell.set(value);
                                }
                                else {
                                    this[Constants_1.KEY_PARAMS].set(name_1, value);
                                }
                            }
                            else {
                                this[Constants_1.KEY_PARAMS].set(name_1, value);
                            }
                        }
                    };
                }
                Object.defineProperty(componentProto, propertyName_1, descriptor);
            }
        };
        for (var name_1 in paramsConfig) {
            _loop_1(name_1);
        }
    }
    inheritProperty(componentConstr, parentComponentConstr, 'i18n', 0);
    componentConstr._blockNamesString =
        elIs + ' ' + (parentComponentConstr._blockNamesString || '');
    componentConstr._elementBlockNames = [elIs];
    if (parentComponentConstr._elementBlockNames) {
        push.apply(componentConstr._elementBlockNames, parentComponentConstr._elementBlockNames);
    }
    var template = componentConstr.template;
    if (template !== null) {
        if (template === parentComponentConstr.template) {
            componentConstr.template = template.extend('', {
                blockName: elIs
            });
        }
        else if (template instanceof Template2_1.Template) {
            template.setBlockName(componentConstr._elementBlockNames);
        }
        else {
            componentConstr.template = parentComponentConstr.template
                ? parentComponentConstr.template.extend(template, {
                    blockName: elIs
                })
                : new Template2_1.Template(template, { blockName: componentConstr._elementBlockNames });
        }
    }
    inheritProperty(componentConstr, parentComponentConstr, 'events', 1);
    inheritProperty(componentConstr, parentComponentConstr, 'domEvents', 1);
    var elExtends = componentConstr.elementExtends;
    var parentElConstr;
    if (elExtends) {
        parentElConstr =
            elementConstructorMap_1.elementConstructorMap.get(elExtends) || window["HTML" + pascalize_1.pascalize(elExtends) + "Element"];
        if (!parentElConstr) {
            throw new TypeError("Component \"" + elExtends + "\" is not registered");
        }
    }
    else {
        parentElConstr = HTMLElement;
    }
    var elConstr = Features_1.reflectConstructFeature
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
        get: function () {
            var paramsConfig = componentConstr.params;
            if (!paramsConfig) {
                return [];
            }
            var attrs = [];
            for (var name_2 in paramsConfig) {
                attrs.push(rionite_snake_case_attribute_name_1.snakeCaseAttributeName(name_2, true));
            }
            return attrs;
        }
    });
    var elProto = (elConstr.prototype = Object.create(parentElConstr.prototype));
    elProto.constructor = elConstr;
    var names = Object.getOwnPropertyNames(ElementProtoMixin_1.ElementProtoMixin);
    for (var i = 0, l = names.length; i < l; i++) {
        Object.defineProperty(elProto, names[i], Object.getOwnPropertyDescriptor(ElementProtoMixin_1.ElementProtoMixin, names[i]));
    }
    names = Object.getOwnPropertySymbols(ElementProtoMixin_1.ElementProtoMixin);
    for (var i = 0, l = names.length; i < l; i++) {
        Object.defineProperty(elProto, names[i], Object.getOwnPropertyDescriptor(ElementProtoMixin_1.ElementProtoMixin, names[i]));
    }
    window.customElements.define(kebabCaseElIs, elConstr, elExtends ? { extends: elExtends } : undefined);
    componentConstructorMap_1.componentConstructorMap.set(elIs, componentConstr).set(kebabCaseElIs, componentConstr);
    elementConstructorMap_1.elementConstructorMap.set(elIs, elConstr);
    return componentConstr;
}
exports.registerComponent = registerComponent;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var camelize_1 = __webpack_require__(18);
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
/* 18 */
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var map_set_polyfill_1 = __webpack_require__(7);
exports.componentConstructorMap = new map_set_polyfill_1.Map();


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rionite_snake_case_attribute_name_1 = __webpack_require__(5);
var symbol_polyfill_1 = __webpack_require__(8);
var componentParamTypeSerializerMap_1 = __webpack_require__(21);
var Constants_1 = __webpack_require__(24);
exports.KEY_COMPONENT_PARAMS_INITED = symbol_polyfill_1.Symbol('Rionite/ComponentParams[componentParamsInited]');
function initParam(component, $paramConfig, name) {
    if ($paramConfig === null) {
        return;
    }
    var typeSerializer = $paramConfig.typeSerializer;
    var defaultValue;
    if (typeSerializer) {
        defaultValue = $paramConfig.default;
    }
    else {
        var paramConfig = $paramConfig.paramConfig;
        var type = typeof paramConfig;
        defaultValue = component[$paramConfig.property];
        var isObject = type == 'object' &&
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
    var el = component.element;
    var snakeCaseName = rionite_snake_case_attribute_name_1.snakeCaseAttributeName(name, true);
    var rawValue = el.getAttribute(snakeCaseName);
    if (rawValue === null) {
        if ($paramConfig.required) {
            throw new TypeError("Parameter \"" + name + "\" is required");
        }
        if (defaultValue != null && defaultValue !== false) {
            el.setAttribute(snakeCaseName, typeSerializer.write(defaultValue));
        }
    }
    component[Constants_1.KEY_PARAMS].set(name, typeSerializer.read(rawValue, defaultValue, el));
}
exports.ComponentParams = {
    init: function (component) {
        if (component[exports.KEY_COMPONENT_PARAMS_INITED]) {
            return;
        }
        var paramsConfig = component.constructor.params;
        if (paramsConfig) {
            var $paramsConfig = component.constructor[Constants_1.KEY_PARAMS_CONFIG];
            for (var name_1 in paramsConfig) {
                initParam(component, $paramsConfig[name_1], name_1);
            }
        }
        component[exports.KEY_COMPONENT_PARAMS_INITED] = true;
    }
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var escape_html_1 = __webpack_require__(22);
var is_regexp_1 = __webpack_require__(23);
var map_set_polyfill_1 = __webpack_require__(7);
var symbol_polyfill_1 = __webpack_require__(8);
exports.KEY_COMPONENT_PARAM_VALUE_MAP = symbol_polyfill_1.Symbol('Rionite/componentParamTypeSerializerMap[componentParamValueMap]');
exports.componentParamTypeSerializerMap = new map_set_polyfill_1.Map([
    [
        Boolean,
        {
            read: function (rawValue, defaultValue) {
                return rawValue !== null ? rawValue != 'no' : !!defaultValue;
            },
            write: function (value, defaultValue) {
                return value ? '' : defaultValue ? 'no' : null;
            }
        }
    ],
    [
        Number,
        {
            read: function (rawValue, defaultValue) {
                return rawValue !== null
                    ? +rawValue
                    : defaultValue !== undefined
                        ? defaultValue
                        : null;
            },
            write: function (value) {
                return value != null ? +value + '' : null;
            }
        }
    ],
    [
        String,
        {
            read: function (rawValue, defaultValue) {
                return rawValue !== null
                    ? rawValue
                    : defaultValue !== undefined
                        ? defaultValue
                        : null;
            },
            write: function (value) {
                return value != null ? value + '' : null;
            }
        }
    ],
    [
        Object,
        {
            read: function (rawValue, defaultValue, el) {
                if (!rawValue) {
                    return defaultValue || null;
                }
                var value = (el[exports.KEY_COMPONENT_PARAM_VALUE_MAP] || Object.create(null))[rawValue];
                if (!value) {
                    throw new TypeError('Value is not an object');
                }
                return value;
            },
            write: function (value) {
                return value != null ? '' : null;
            }
        }
    ],
    [
        eval,
        {
            read: function (rawValue, defaultValue) {
                return rawValue !== null
                    ? Function("return " + escape_html_1.unescapeHTML(rawValue) + ";")()
                    : defaultValue !== undefined
                        ? defaultValue
                        : null;
            },
            write: function (value) {
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
/* 22 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__22__;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__23__;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var symbol_polyfill_1 = __webpack_require__(8);
exports.KEY_PARAMS_CONFIG = symbol_polyfill_1.Symbol('Rionite/BaseComponent[paramsConfig]');
exports.KEY_PARAMS = symbol_polyfill_1.Symbol('Rionite/BaseComponent[params]');
exports.KEY_CHILD_COMPONENTS = symbol_polyfill_1.Symbol('Rionite/BaseComponent[childComponents]');


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var map_set_polyfill_1 = __webpack_require__(7);
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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var defer_1 = __webpack_require__(27);
var symbol_polyfill_1 = __webpack_require__(8);
var ComponentParams_1 = __webpack_require__(20);
var Constants_1 = __webpack_require__(24);
var DI_1 = __webpack_require__(6);
var Features_1 = __webpack_require__(9);
// export const KEY_IS_COMPONENT_ELEMENT = Symbol('Rionite/ElementProtoMixin[isComponentElement]');
exports.KEY_ELEMENT_CONNECTED = symbol_polyfill_1.Symbol('Rionite/ElementProtoMixin[elementConnected]');
var connectionStatusCallbacksSuppressed = false;
function suppressConnectionStatusCallbacks() {
    connectionStatusCallbacksSuppressed = true;
}
exports.suppressConnectionStatusCallbacks = suppressConnectionStatusCallbacks;
function resumeConnectionStatusCallbacks() {
    connectionStatusCallbacksSuppressed = false;
}
exports.resumeConnectionStatusCallbacks = resumeConnectionStatusCallbacks;
exports.ElementProtoMixin = (_a = {
        // [KEY_IS_COMPONENT_ELEMENT]: true,
        $component: null,
        get rioniteComponent() {
            return (this.$component || DI_1.Container.get(this.constructor._rioniteComponentConstructor, [this]));
        }
    },
    _a[exports.KEY_ELEMENT_CONNECTED] = false,
    _a.connectedCallback = function () {
        var _this = this;
        this[exports.KEY_ELEMENT_CONNECTED] = true;
        if (connectionStatusCallbacksSuppressed) {
            return;
        }
        var component = this.$component;
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
            defer_1.defer(function () {
                if (_this[exports.KEY_ELEMENT_CONNECTED]) {
                    var component_1 = _this.rioniteComponent;
                    component_1._parentComponent = undefined;
                    if (!component_1.parentComponent && !component_1._attached) {
                        ComponentParams_1.ComponentParams.init(component_1);
                        component_1.elementConnected();
                        component_1._attach();
                    }
                }
            });
        }
    },
    _a.disconnectedCallback = function () {
        this[exports.KEY_ELEMENT_CONNECTED] = false;
        if (connectionStatusCallbacksSuppressed) {
            return;
        }
        var component = this.$component;
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
    _a.attributeChangedCallback = function (name, _prevRawValue, rawValue) {
        var component = this.$component;
        if (component && component.isReady) {
            var $paramConfig = component.constructor[Constants_1.KEY_PARAMS_CONFIG][name];
            if ($paramConfig.readonly) {
                if (Features_1.nativeCustomElementsFeature) {
                    throw new TypeError("Cannot write to readonly parameter \"" + $paramConfig.name + "\"");
                }
            }
            else {
                var valueCell = component[$paramConfig.property + 'Cell'];
                var value = $paramConfig.typeSerializer.read(rawValue, $paramConfig.default, this);
                if (valueCell) {
                    valueCell.set(value);
                }
                else {
                    component[Constants_1.KEY_PARAMS].set($paramConfig.name, value);
                }
            }
        }
    },
    _a);


/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__27__;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var lower_case_first_word_1 = __webpack_require__(29);
var map_set_polyfill_1 = __webpack_require__(7);
var types = new map_set_polyfill_1.Set([Boolean, Number, String, Object]);
var prefix = 'param';
var prefixLength = prefix.length;
function Param(target, propertyName, _propertyDesc, name, config) {
    if (typeof propertyName != 'string') {
        if (target && typeof target != 'string') {
            config = target;
        }
        else {
            name = target;
            config = propertyName;
        }
        return function (target, propertyName, propertyDesc) {
            return Param(target, propertyName, propertyDesc, name, config);
        };
    }
    if (!config) {
        config = {};
    }
    else if (typeof config == 'function') {
        config = { type: config };
    }
    config.property = propertyName;
    if (!config.type) {
        var type = Reflect.getMetadata('design:type', target, propertyName);
        config.type = types.has(type) ? type : Object;
    }
    var constr = target.constructor;
    ((constr.hasOwnProperty('params') && constr.params) || (constr.params = {}))[(name ||
        (propertyName.length <= prefixLength || propertyName.lastIndexOf(prefix, 0)
            ? propertyName
            : lower_case_first_word_1.lowerCaseFirstWord(propertyName.slice(5))))] = config;
}
exports.Param = Param;


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__29__;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var get_uid_1 = __webpack_require__(31);
var kebab_case_1 = __webpack_require__(4);
var logger_1 = __webpack_require__(32);
var map_set_polyfill_1 = __webpack_require__(7);
var move_content_1 = __webpack_require__(33);
var cellx_1 = __webpack_require__(12);
var attachChildComponentElements_1 = __webpack_require__(34);
var bindContent_1 = __webpack_require__(35);
var componentBinding_1 = __webpack_require__(45);
var componentConstructorMap_1 = __webpack_require__(19);
var Constants_1 = __webpack_require__(24);
var DI_1 = __webpack_require__(6);
var DisposableMixin_1 = __webpack_require__(10);
var elementConstructorMap_1 = __webpack_require__(25);
var ElementProtoMixin_1 = __webpack_require__(26);
var handledEvents_1 = __webpack_require__(46);
var handleDOMEvent_1 = __webpack_require__(47);
var handleEvent_1 = __webpack_require__(48);
var normalizeTextNodes_1 = __webpack_require__(49);
var map = Array.prototype.map;
var BaseComponent = /** @class */ (function (_super) {
    __extends(BaseComponent, _super);
    function BaseComponent(el) {
        var _this = _super.call(this) || this;
        _this._parentComponent = null;
        _this.$inputContent = null;
        _this._attached = false;
        _this.initialized = false;
        _this.isReady = false;
        DisposableMixin_1.DisposableMixin.call(_this);
        var constr = _this.constructor;
        if (!elementConstructorMap_1.elementConstructorMap.has(constr.elementIs)) {
            throw new TypeError('Component must be registered');
        }
        if (!el) {
            el = document.createElement(kebab_case_1.kebabCase(constr.elementIs, true));
        }
        _this.element = el;
        el.$component = _this;
        _this[Constants_1.KEY_PARAMS] = new map_set_polyfill_1.Map();
        return _this;
    }
    Object.defineProperty(BaseComponent, "bindsInputContent", {
        get: function () {
            return this.template !== null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "ownerComponent", {
        get: function () {
            if (this._ownerComponent) {
                return this._ownerComponent;
            }
            var component = this.parentComponent;
            if (!component) {
                return (this._ownerComponent = this);
            }
            for (var parentComponent = void 0; (parentComponent = component.parentComponent);) {
                component = parentComponent;
            }
            return (this._ownerComponent = component);
        },
        set: function (ownerComponent) {
            this._ownerComponent = ownerComponent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "parentComponent", {
        get: function () {
            if (this._parentComponent !== undefined) {
                return this._parentComponent;
            }
            for (var node = void 0; (node = (node || this.element).parentNode);) {
                if (node.$component !== undefined) {
                    return (this._parentComponent = node.$component || node.rioniteComponent);
                }
            }
            return (this._parentComponent = null);
        },
        enumerable: true,
        configurable: true
    });
    BaseComponent.prototype.handleEvent = function (evt) {
        _super.prototype.handleEvent.call(this, evt);
        if (evt.bubbles !== false && !evt.propagationStopped) {
            var parentComponent = this.parentComponent;
            if (parentComponent) {
                parentComponent.handleEvent(evt);
                return;
            }
        }
        handleEvent_1.handleEvent(evt);
    };
    BaseComponent.prototype.listenTo = function (target, type, listener, context, useCapture) {
        return DisposableMixin_1.DisposableMixin.prototype.listenTo.call(this, typeof target == 'string' ? this.$(target) : target, type, listener, context, useCapture);
    };
    BaseComponent.prototype._listenTo = function (target, type, listener, context, useCapture) {
        if (target instanceof BaseComponent) {
            if (type.charAt(0) == '<') {
                var index = type.indexOf('>', 2);
                var targetType = type.slice(1, index);
                if (targetType != '*') {
                    var targetConstr_1 = elementConstructorMap_1.elementConstructorMap.has(targetType) &&
                        componentConstructorMap_1.componentConstructorMap.get(targetType);
                    if (!targetConstr_1) {
                        throw new TypeError("Component \"" + targetType + "\" is not defined");
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
    BaseComponent.prototype._attach = function () {
        var _this = this;
        this._attached = true;
        if (!this.initialized) {
            var initializationResult = this.initialize();
            if (initializationResult) {
                initializationResult.then(function () {
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
        }
        else {
            var el = this.element;
            el.className = constr._blockNamesString + el.className;
            if (constr.template === null) {
                if (this.ownerComponent == this) {
                    var contentBindingResult = [null, null, null];
                    bindContent_1.bindContent(el, this, this, contentBindingResult);
                    var childComponents = contentBindingResult[0];
                    var backBindings = contentBindingResult[2];
                    this._bindings = contentBindingResult[1];
                    if (childComponents) {
                        attachChildComponentElements_1.attachChildComponentElements(childComponents);
                    }
                    if (backBindings) {
                        for (var i = backBindings.length; i; i -= 3) {
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
                var content = constr.template.render(this);
                var contentBindingResult = [null, null, null];
                bindContent_1.bindContent(content, this, this, contentBindingResult);
                var childComponents = contentBindingResult[0];
                var backBindings = contentBindingResult[2];
                this._bindings = contentBindingResult[1];
                if (childComponents) {
                    for (var i = childComponents.length; i;) {
                        var childComponent = childComponents[--i];
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
                    for (var i = backBindings.length; i; i -= 3) {
                        backBindings[i - 3].on('change:' + backBindings[i - 2], backBindings[i - 1]);
                    }
                }
            }
            this.ready();
            this.isReady = true;
        }
        this.elementAttached();
    };
    BaseComponent.prototype._detach = function () {
        this._attached = false;
        this.elementDetached();
        this.dispose();
    };
    BaseComponent.prototype.dispose = function () {
        this._freezeBindings();
        return DisposableMixin_1.DisposableMixin.prototype.dispose.call(this);
    };
    BaseComponent.prototype._freezeBindings = function () {
        if (this._bindings) {
            componentBinding_1.freezeBindings(this._bindings);
        }
    };
    BaseComponent.prototype._unfreezeBindings = function () {
        if (this._bindings) {
            componentBinding_1.unfreezeBindings(this._bindings);
        }
    };
    BaseComponent.prototype._destroyBindings = function () {
        var bindings = this._bindings;
        if (bindings) {
            for (var i = bindings.length; i;) {
                bindings[--i].off();
            }
            this._bindings = null;
        }
    };
    // Callbacks
    BaseComponent.prototype.elementConnected = function () { };
    BaseComponent.prototype.elementDisconnected = function () { };
    BaseComponent.prototype.initialize = function () { };
    BaseComponent.prototype.ready = function () { };
    BaseComponent.prototype.elementAttached = function () { };
    BaseComponent.prototype.elementDetached = function () { };
    BaseComponent.prototype.elementMoved = function () { };
    // Utils
    BaseComponent.prototype.$ = function (name, container) {
        var elList = this._getElementList(name, container);
        return (elList && elList.length
            ? elList[0].$component || elList[0]
            : null);
    };
    BaseComponent.prototype.$$ = function (name, container) {
        var elList = this._getElementList(name, container);
        return elList
            ? map.call(elList, function (el) { return el.$component || el; })
            : [];
    };
    BaseComponent.prototype._getElementList = function (name, container) {
        var elListMap = this._elementListMap ||
            (this._elementListMap = new map_set_polyfill_1.Map());
        var containerEl;
        if (container) {
            if (typeof container == 'string') {
                container = this.$(container);
            }
            containerEl = container instanceof BaseComponent ? container.element : container;
        }
        else {
            containerEl = this.element;
        }
        var key = container ? get_uid_1.getUID(containerEl) + '/' + name : name;
        var elList = elListMap.get(key);
        if (!elList) {
            var elementBlockNames = this.constructor._elementBlockNames;
            elList = containerEl.getElementsByClassName(elementBlockNames[elementBlockNames.length - 1] + '__' + name);
            elListMap.set(key, elList);
        }
        return elList;
    };
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
    return BaseComponent;
}(cellx_1.EventEmitter));
exports.BaseComponent = BaseComponent;
var disposableMixinProto = DisposableMixin_1.DisposableMixin.prototype;
var baseComponentProto = BaseComponent.prototype;
Object.getOwnPropertyNames(disposableMixinProto).forEach(function (name) {
    if (!(name in baseComponentProto)) {
        Object.defineProperty(baseComponentProto, name, Object.getOwnPropertyDescriptor(disposableMixinProto, name));
    }
});
document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
    document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
    handledEvents_1.handledEvents.forEach(function (type) {
        document.body.addEventListener(type, function (evt) {
            if (evt.target != document.body) {
                handleDOMEvent_1.handleDOMEvent(evt);
            }
        });
    });
});


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
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__33__;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ComponentParams_1 = __webpack_require__(20);
// import { KEY_ELEMENT_CONNECTED } from './ElementProtoMixin';
function attachChildComponentElements(childComponents) {
    for (var _i = 0, childComponents_1 = childComponents; _i < childComponents_1.length; _i++) {
        var childComponent = childComponents_1[_i];
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var map_set_polyfill_1 = __webpack_require__(7);
var set_attribute_1 = __webpack_require__(36);
var cellx_1 = __webpack_require__(12);
var compileContentNodeValue_1 = __webpack_require__(37);
var Constants_1 = __webpack_require__(24);
var ContentNodeValueParser_1 = __webpack_require__(40);
var compileKeypath_1 = __webpack_require__(44);
exports.KEY_CONTEXT = Symbol('Rionite/bindContent[context]');
var contentNodeValueASTCache = {
    __proto__: null
};
function onAttributeBindingCellChange(evt) {
    set_attribute_1.setAttribute(evt.target.meta.element, evt.target.meta.attributeName, evt.data.value);
}
function onTextNodeBindingCellChange(evt) {
    evt.target.meta.textNode.nodeValue = evt.data.value;
}
function bindContent(node, ownerComponent, context, result, parentComponent) {
    for (var child = node.firstChild; child; child = child.nextSibling) {
        switch (child.nodeType) {
            case Node.ELEMENT_NODE: {
                var childComponent = child.rioniteComponent;
                var $paramsConfig = void 0;
                var $specifiedParams = void 0;
                if (childComponent) {
                    $paramsConfig = childComponent.constructor[Constants_1.KEY_PARAMS_CONFIG];
                    $specifiedParams = new map_set_polyfill_1.Set();
                }
                var attrs = child.attributes;
                for (var i = attrs.length; i;) {
                    var attr = attrs[--i];
                    var name_1 = attr.name;
                    var targetName = void 0;
                    if (name_1.charAt(0) == '_') {
                        targetName = name_1.slice(1);
                    }
                    else {
                        targetName = name_1;
                        if (!name_1.lastIndexOf('oncomponent-', 0) || !name_1.lastIndexOf('on-', 0)) {
                            child[exports.KEY_CONTEXT] = context;
                        }
                    }
                    var $paramConfig = $paramsConfig && $paramsConfig[targetName];
                    if ($paramConfig) {
                        $specifiedParams.add($paramConfig.name);
                    }
                    var value = attr.value;
                    if (!value) {
                        continue;
                    }
                    var valueAST = contentNodeValueASTCache[value];
                    if (!valueAST) {
                        if (valueAST === null) {
                            continue;
                        }
                        var bracketIndex = value.indexOf('{');
                        if (bracketIndex == -1) {
                            contentNodeValueASTCache[value] = null;
                            continue;
                        }
                        valueAST = contentNodeValueASTCache[value] = new ContentNodeValueParser_1.ContentNodeValueParser(value).parse(bracketIndex);
                    }
                    var valueASTLength = valueAST.length;
                    if (valueASTLength > 1 ||
                        valueAST[0].nodeType == ContentNodeValueParser_1.ContentNodeValueNodeType.BINDING) {
                        var prefix = valueAST.length == 1
                            ? valueAST[0].prefix
                            : null;
                        if (prefix === '=') {
                            set_attribute_1.setAttribute(child, targetName, compileContentNodeValue_1.compileContentNodeValue(valueAST, value, true).call(context));
                        }
                        else {
                            if (prefix !== '->') {
                                var cell = new cellx_1.Cell(compileContentNodeValue_1.compileContentNodeValue(valueAST, value, valueAST.length == 1), {
                                    context: context,
                                    meta: {
                                        element: child,
                                        attributeName: targetName
                                    },
                                    onChange: onAttributeBindingCellChange
                                });
                                set_attribute_1.setAttribute(child, targetName, cell.get());
                                (result[1] || (result[1] = [])).push(cell);
                            }
                            var paramConfig = void 0;
                            if ($paramConfig) {
                                paramConfig = $paramConfig.paramConfig;
                            }
                            if (paramConfig !== undefined &&
                                (prefix === '->' || prefix === '<->')) {
                                if (prefix == '->' && name_1.charAt(0) != '_') {
                                    child.removeAttribute(name_1);
                                }
                                var keypath = valueAST[0].keypath;
                                var keys = keypath.split('.');
                                var handler = void 0;
                                if (keys.length == 1) {
                                    handler = (function (propertyName) {
                                        return function (evt) {
                                            this.ownerComponent[propertyName] = evt.data.value;
                                        };
                                    })(keys[0]);
                                }
                                else {
                                    handler = (function (propertyName, keys) {
                                        var getPropertyHolder = compileKeypath_1.compileKeypath(keys, keys.join('.'));
                                        return function (evt) {
                                            var propertyHolder = getPropertyHolder.call(this.ownerComponent);
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
                var value = child.nodeValue;
                var valueAST = contentNodeValueASTCache[value];
                if (!valueAST) {
                    if (valueAST === null) {
                        continue;
                    }
                    var bracketIndex = value.indexOf('{');
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
                        var cell = new cellx_1.Cell(compileContentNodeValue_1.compileContentNodeValue(valueAST, value, false), {
                            context: context,
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
/* 36 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__36__;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var escape_string_1 = __webpack_require__(38);
var bindingToJSExpression_1 = __webpack_require__(39);
var componentParamTypeSerializerMap_1 = __webpack_require__(21);
var ContentNodeValueParser_1 = __webpack_require__(40);
var formatters_1 = __webpack_require__(13);
var cache = Object.create(null);
function compileContentNodeValue(contentNodeValueAST, contentNodeValueString, useComponentParamValueMap) {
    var cacheKey = contentNodeValueString + (useComponentParamValueMap ? ',' : '.');
    if (cache[cacheKey]) {
        return cache[cacheKey];
    }
    var inner;
    if (contentNodeValueAST.length == 1) {
        inner = Function('formatters', "var tmp; return " + bindingToJSExpression_1.bindingToJSExpression(contentNodeValueAST[0]) + ";");
    }
    else {
        var jsExpr = [];
        for (var _i = 0, contentNodeValueAST_1 = contentNodeValueAST; _i < contentNodeValueAST_1.length; _i++) {
            var node = contentNodeValueAST_1[_i];
            jsExpr.push(node.nodeType == ContentNodeValueParser_1.ContentNodeValueNodeType.TEXT
                ? "'" + escape_string_1.escapeString(node.value) + "'"
                : bindingToJSExpression_1.bindingToJSExpression(node));
        }
        inner = Function('formatters', "var tmp; return [" + jsExpr.join(', ') + "].join('');");
    }
    return (cache[cacheKey] = useComponentParamValueMap
        ? function (cell) {
            var value = inner.call(this, formatters_1.formatters);
            if (value) {
                var valueType = typeof value;
                if (valueType == 'object' || valueType == 'function') {
                    var meta = cell.meta;
                    (meta.element[componentParamTypeSerializerMap_1.KEY_COMPONENT_PARAM_VALUE_MAP] ||
                        (meta.element[componentParamTypeSerializerMap_1.KEY_COMPONENT_PARAM_VALUE_MAP] = Object.create(null)))[meta.attributeName] = value;
                    return meta.attributeName;
                }
            }
            return value;
        }
        : function () {
            var value = inner.call(this, formatters_1.formatters);
            return value == null ? '' : value + '';
        });
}
exports.compileContentNodeValue = compileContentNodeValue;


/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__38__;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function formattersReducer(jsExpr, formatter) {
    var args = formatter.arguments;
    return "(this." + formatter.name + " || formatters." + formatter.name + ").call(this['$/'], " + jsExpr + (args && args.value.length ? ', ' + args.value.join(', ') : '') + ")";
}
function bindingToJSExpression(binding) {
    var formatters = binding.formatters;
    if (binding.keypath) {
        var keys = binding.keypath.split('.');
        var keyCount = keys.length;
        if (keyCount == 1) {
            return formatters
                ? formatters.reduce(formattersReducer, "this['" + keys[0] + "']")
                : "this['" + keys[0] + "']";
        }
        var index = keyCount - 2;
        var jsExprArr = Array(index);
        while (index) {
            jsExprArr[--index] = " && (tmp = tmp['" + keys[index + 1] + "'])";
        }
        var jsExpr = "(tmp = this['" + keys[0] + "'])" + jsExprArr.join('') + " && tmp['" + keys[keyCount - 1] + "']";
        return formatters ? formatters.reduce(formattersReducer, jsExpr) : jsExpr;
    }
    return formatters ? formatters.reduce(formattersReducer, binding.value) : binding.value;
}
exports.bindingToJSExpression = bindingToJSExpression;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var keypathPattern_1 = __webpack_require__(41);
var keypathToJSExpression_1 = __webpack_require__(43);
var namePattern_1 = __webpack_require__(42);
var ContentNodeValueNodeType;
(function (ContentNodeValueNodeType) {
    ContentNodeValueNodeType[ContentNodeValueNodeType["TEXT"] = 1] = "TEXT";
    ContentNodeValueNodeType[ContentNodeValueNodeType["BINDING"] = 2] = "BINDING";
    ContentNodeValueNodeType[ContentNodeValueNodeType["BINDING_KEYPATH"] = 3] = "BINDING_KEYPATH";
    ContentNodeValueNodeType[ContentNodeValueNodeType["BINDING_FORMATTER"] = 4] = "BINDING_FORMATTER";
    ContentNodeValueNodeType[ContentNodeValueNodeType["BINDING_FORMATTER_ARGUMENTS"] = 5] = "BINDING_FORMATTER_ARGUMENTS";
})(ContentNodeValueNodeType = exports.ContentNodeValueNodeType || (exports.ContentNodeValueNodeType = {}));
var reWhitespace = /\s/;
var reNameOrNothing = RegExp(namePattern_1.namePattern + '|', 'g');
var reKeypathOrNothing = RegExp(keypathPattern_1.keypathPattern + '|', 'g');
var reBooleanOrNothing = /false|true|/g;
var reNumberOrNothing = /(?:[+-]\s*)?(?:0b[01]+|0[0-7]+|0x[0-9a-fA-F]+|(?:(?:0|[1-9]\d*)(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?|Infinity|NaN)|/g;
var reVacuumOrNothing = /null|undefined|void 0|/g;
var ContentNodeValueParser = /** @class */ (function () {
    function ContentNodeValueParser(contentNodeValue) {
        this.contentNodeValue = contentNodeValue;
    }
    ContentNodeValueParser.prototype.parse = function (index) {
        var contentNodeValue = this.contentNodeValue;
        this.at = 0;
        var result = (this.result = []);
        do {
            this._pushText(contentNodeValue.slice(this.at, index));
            this.at = index;
            this.chr = contentNodeValue.charAt(index);
            var binding = this._readBinding();
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
    };
    ContentNodeValueParser.prototype._pushText = function (value) {
        if (value) {
            var result = this.result;
            var resultLen = result.length;
            if (resultLen && result[resultLen - 1].nodeType == ContentNodeValueNodeType.TEXT) {
                result[resultLen - 1].value += value;
            }
            else {
                result.push({
                    nodeType: ContentNodeValueNodeType.TEXT,
                    value: value
                });
            }
        }
    };
    ContentNodeValueParser.prototype._readBinding = function () {
        var at = this.at;
        this._next('{');
        this._skipWhitespaces();
        var prefix = this._readPrefix();
        this._skipWhitespaces();
        var keypath = this._readKeypath();
        var value;
        if (!prefix && !keypath) {
            value = this._readValue();
        }
        if (keypath || value) {
            var formatters = void 0;
            for (var formatter = void 0; this._skipWhitespaces() == '|' && (formatter = this._readFormatter());) {
                (formatters || (formatters = [])).push(formatter);
            }
            if (this.chr == '}') {
                this._next();
                return {
                    nodeType: ContentNodeValueNodeType.BINDING,
                    prefix: prefix,
                    keypath: keypath,
                    value: value || null,
                    formatters: formatters || null,
                    raw: this.contentNodeValue.slice(at, this.at)
                };
            }
        }
        this.at = at;
        this.chr = this.contentNodeValue.charAt(at);
        return null;
    };
    ContentNodeValueParser.prototype._readPrefix = function () {
        var chr = this.chr;
        if (chr == '=') {
            this._next();
            return '=';
        }
        if (chr == '<') {
            var at = this.at;
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
    };
    ContentNodeValueParser.prototype._readFormatter = function () {
        var at = this.at;
        this._next('|');
        this._skipWhitespaces();
        var name = this._readName();
        if (name) {
            var args = this.chr == '(' ? this._readFormatterArguments() : null;
            return {
                nodeType: ContentNodeValueNodeType.BINDING_FORMATTER,
                name: name,
                arguments: args
            };
        }
        this.at = at;
        this.chr = this.contentNodeValue.charAt(at);
        return null;
    };
    ContentNodeValueParser.prototype._readFormatterArguments = function () {
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
                this.chr = this.contentNodeValue.charAt(at);
                return null;
            }
        }
        this._next();
        return {
            nodeType: ContentNodeValueNodeType.BINDING_FORMATTER_ARGUMENTS,
            value: args
        };
    };
    ContentNodeValueParser.prototype._readValue = function () {
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
    ContentNodeValueParser.prototype._readObject = function () {
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
            this.chr = this.contentNodeValue.charAt(at);
            return null;
        }
        this._next();
        return obj;
    };
    ContentNodeValueParser.prototype._readObjectKey = function () {
        return this._readName();
    };
    ContentNodeValueParser.prototype._readArray = function () {
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
                    this.chr = this.contentNodeValue.charAt(at);
                    return null;
                }
            }
        }
        this._next();
        return arr + ']';
    };
    ContentNodeValueParser.prototype._readBoolean = function () {
        reBooleanOrNothing.lastIndex = this.at;
        var bool = reBooleanOrNothing.exec(this.contentNodeValue)[0];
        if (bool) {
            this.chr = this.contentNodeValue.charAt((this.at = reBooleanOrNothing.lastIndex));
            return bool;
        }
        return null;
    };
    ContentNodeValueParser.prototype._readNumber = function () {
        reNumberOrNothing.lastIndex = this.at;
        var num = reNumberOrNothing.exec(this.contentNodeValue)[0];
        if (num) {
            this.chr = this.contentNodeValue.charAt((this.at = reNumberOrNothing.lastIndex));
            return num;
        }
        return null;
    };
    ContentNodeValueParser.prototype._readString = function () {
        var quoteChar = this.chr;
        if (quoteChar != "'" && quoteChar != '"') {
            throw {
                name: 'SyntaxError',
                message: "Expected \"'\" instead of \"" + this.chr + "\"",
                at: this.at,
                contentNodeValue: this.contentNodeValue
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
                if (next == '\n' || next == '\r') {
                    break;
                }
                str += next;
            }
        }
        this.at = at;
        this.chr = this.contentNodeValue.charAt(at);
        return null;
    };
    ContentNodeValueParser.prototype._readVacuum = function () {
        reVacuumOrNothing.lastIndex = this.at;
        var vacuum = reVacuumOrNothing.exec(this.contentNodeValue)[0];
        if (vacuum) {
            this.chr = this.contentNodeValue.charAt((this.at = reVacuumOrNothing.lastIndex));
            return vacuum;
        }
        return null;
    };
    ContentNodeValueParser.prototype._readKeypath = function (toJSExpression) {
        reKeypathOrNothing.lastIndex = this.at;
        var keypath = reKeypathOrNothing.exec(this.contentNodeValue)[0];
        if (keypath) {
            this.chr = this.contentNodeValue.charAt((this.at = reKeypathOrNothing.lastIndex));
            return toJSExpression ? keypathToJSExpression_1.keypathToJSExpression(keypath) : keypath;
        }
        return null;
    };
    ContentNodeValueParser.prototype._readName = function () {
        reNameOrNothing.lastIndex = this.at;
        var name = reNameOrNothing.exec(this.contentNodeValue)[0];
        if (name) {
            this.chr = this.contentNodeValue.charAt((this.at = reNameOrNothing.lastIndex));
            return name;
        }
        return null;
    };
    ContentNodeValueParser.prototype._skipWhitespaces = function () {
        var chr = this.chr;
        while (chr && reWhitespace.test(chr)) {
            chr = this._next();
        }
        return chr;
    };
    ContentNodeValueParser.prototype._next = function (current) {
        if (current && current != this.chr) {
            throw {
                name: 'SyntaxError',
                message: "Expected \"" + current + "\" instead of \"" + this.chr + "\"",
                at: this.at,
                contentNodeValue: this.contentNodeValue
            };
        }
        return (this.chr = this.contentNodeValue.charAt(++this.at));
    };
    return ContentNodeValueParser;
}());
exports.ContentNodeValueParser = ContentNodeValueParser;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var namePattern_1 = __webpack_require__(42);
exports.keypathPattern = "(?:" + namePattern_1.namePattern + "|\\d+)(?:\\.(?:" + namePattern_1.namePattern + "|\\d+))*";


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.namePattern = '[$_a-zA-Z][$\\w]*';


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cache = Object.create(null);
function keypathToJSExpression(keypath, cacheKey) {
    if (cacheKey === void 0) { cacheKey = keypath; }
    if (cache[cacheKey]) {
        return cache[cacheKey];
    }
    var keys = typeof keypath == 'string' ? keypath.split('.') : keypath;
    var keyCount = keys.length;
    if (keyCount == 1) {
        return (cache[cacheKey] = "this['" + keypath + "']");
    }
    var index = keyCount - 2;
    var jsExpr = Array(index);
    while (index) {
        jsExpr[--index] = " && (tmp = tmp['" + keys[index + 1] + "'])";
    }
    return (cache[cacheKey] = "(tmp = this['" + keys[0] + "'])" + jsExpr.join('') + " && tmp['" + keys[keyCount - 1] + "']");
}
exports.keypathToJSExpression = keypathToJSExpression;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var keypathToJSExpression_1 = __webpack_require__(43);
var cache = Object.create(null);
function compileKeypath(keypath, cacheKey) {
    if (cacheKey === void 0) { cacheKey = keypath; }
    return (cache[cacheKey] ||
        (cache[cacheKey] = Function("var tmp; return " + keypathToJSExpression_1.keypathToJSExpression(keypath, cacheKey) + ";")));
}
exports.compileKeypath = compileKeypath;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(12);
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
    for (var _i = 0, bindings_1 = bindings; _i < bindings_1.length; _i++) {
        var binding = bindings_1[_i];
        freezeBinding(binding);
    }
}
exports.freezeBindings = freezeBindings;
function unfreezeBindings(bindings) {
    for (var _i = 0, bindings_2 = bindings; _i < bindings_2.length; _i++) {
        var binding = bindings_2[_i];
        unfreezeBinding(binding);
    }
    cellx_1.Cell.forceRelease();
}
exports.unfreezeBindings = unfreezeBindings;


/***/ }),
/* 46 */
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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var bindContent_1 = __webpack_require__(35);
function handleDOMEvent(evt) {
    var attrName = 'on-' + evt.type;
    var el = evt.target;
    var parentEl = el.parentElement;
    var receivers;
    while (parentEl) {
        if (el.hasAttribute(attrName)) {
            (receivers || (receivers = [])).push(el);
        }
        var component = parentEl.$component;
        if (component && receivers && receivers.length) {
            for (var i = 0;;) {
                var receiver = receivers[i];
                var handlerName = receiver.getAttribute(attrName);
                var handler = void 0;
                if (handlerName.charAt(0) == ':') {
                    var events = component.constructor.domEvents;
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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var bindContent_1 = __webpack_require__(35);
var stack = [];
function handleEvent(evt) {
    var _a;
    var target = evt.target;
    var ownerComponent = target.ownerComponent;
    if (target == ownerComponent) {
        return;
    }
    var targetEl = target.element;
    var el = targetEl;
    var parentEl = el.parentElement;
    if (!parentEl) {
        return;
    }
    stack.length = 0;
    var attrName = 'oncomponent-' + evt.type;
    var ownerComponentEl = ownerComponent.element;
    var receivers;
    for (var component = void 0;;) {
        if (el.hasAttribute(attrName)) {
            (receivers || (receivers = [])).push(el);
        }
        if (parentEl == ownerComponentEl) {
            if (receivers) {
                for (var i = 0, l = receivers.length; i < l; i++) {
                    var receiver = receivers[i];
                    var handlerName = receiver.getAttribute(attrName);
                    var handler = void 0;
                    if (handlerName.charAt(0) == ':') {
                        var events = ownerComponent.constructor.events;
                        if (receiver == targetEl) {
                            handler = events[handlerName.slice(1)][evt.type];
                        }
                        else {
                            var elementBlockNames = target.constructor
                                ._elementBlockNames;
                            for (var j = 0, m = elementBlockNames.length; j < m; j++) {
                                var typedHandler = events[handlerName.slice(1)]["<" + elementBlockNames[j] + ">" + evt.type];
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
            _a = stack.pop(), ownerComponent = _a[0], receivers = _a[1];
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
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function normalizeTextNodes(node) {
    for (var child = node.firstChild; child;) {
        switch (child.nodeType) {
            case Node.ELEMENT_NODE: {
                normalizeTextNodes(child);
                child = child.nextSibling;
                break;
            }
            case Node.TEXT_NODE: {
                var nextChild = child.nextSibling;
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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
var next_tick_1 = __webpack_require__(51);
var cellx_1 = __webpack_require__(12);
var move_content_1 = __webpack_require__(52);
var attachChildComponentElements_1 = __webpack_require__(34);
var BaseComponent_1 = __webpack_require__(30);
var bindContent_1 = __webpack_require__(35);
var Component_1 = __webpack_require__(15);
var ElementProtoMixin_1 = __webpack_require__(26);
var compileKeypath_1 = __webpack_require__(44);
var keypathPattern_1 = __webpack_require__(41);
var removeNodes_1 = __webpack_require__(53);
var RnRepeat_1 = __webpack_require__(54);
var slice = Array.prototype.slice;
var reKeypath = RegExp("^" + keypathPattern_1.keypathPattern + "$");
var RnIfThen = /** @class */ (function (_super) {
    __extends(RnIfThen, _super);
    function RnIfThen() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._elseMode = false;
        _this._nodes = null;
        _this._childComponents = null;
        _this._active = false;
        return _this;
    }
    RnIfThen_1 = RnIfThen;
    Object.defineProperty(RnIfThen, "bindsInputContent", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    RnIfThen.prototype.elementConnected = function () {
        if (this._active) {
            return;
        }
        this._active = true;
        if (!this.initialized) {
            var if_ = this.paramIf.trim();
            if (!reKeypath.test(if_)) {
                throw new SyntaxError("Invalid value of attribute \"if\" (" + if_ + ")");
            }
            var getIfValue_1 = compileKeypath_1.compileKeypath(if_);
            this._if = new cellx_1.Cell(function () {
                return !!getIfValue_1.call(this);
            }, { context: this.$context });
            this.initialized = true;
        }
        if (this.element.contentTemplate) {
            this._if.on('change', this._onIfChange, this);
            this._render(false);
        }
    };
    RnIfThen.prototype.elementDisconnected = function () {
        var _this = this;
        next_tick_1.nextTick(function () {
            if (!_this.element[ElementProtoMixin_1.KEY_ELEMENT_CONNECTED]) {
                _this._deactivate();
            }
        });
    };
    RnIfThen.prototype._onIfChange = function () {
        if (this.element.parentNode) {
            this._render(true);
        }
    };
    RnIfThen.prototype._attach = function () {
        this._attached = true;
    };
    RnIfThen.prototype._detach = function () {
        this._attached = false;
    };
    RnIfThen.prototype._render = function (changed) {
        if (this._elseMode ? this._if.get() === false : this._if.get()) {
            var content = this.element.contentTemplate.render();
            var contentBindingResult = [null, null, null];
            bindContent_1.bindContent(content, this.ownerComponent, this.$context, contentBindingResult);
            var childComponents = contentBindingResult[0];
            var backBindings = contentBindingResult[2];
            this._nodes = slice.call(content.childNodes);
            this._childComponents = childComponents;
            this._bindings = contentBindingResult[1];
            if (childComponents) {
                for (var i = childComponents.length; i;) {
                    var childComponent = childComponents[--i];
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
                for (var i = backBindings.length; i; i -= 3) {
                    backBindings[i - 3].on('change:' + backBindings[i - 2], backBindings[i - 1]);
                }
            }
        }
        else {
            var nodes = this._nodes;
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
    };
    RnIfThen.prototype._deactivate = function () {
        if (!this._active) {
            return;
        }
        this._active = false;
        this._if.off('change', this._onIfChange, this);
        var nodes = this._nodes;
        if (nodes) {
            removeNodes_1.removeNodes(nodes);
            this._destroyBindings();
            this._nodes = null;
            this._deactivateChildComponents();
        }
    };
    RnIfThen.prototype._deactivateChildComponents = function () {
        var childComponents = this._childComponents;
        if (childComponents) {
            for (var i = childComponents.length; i;) {
                var childComponent = childComponents[--i];
                if (childComponent instanceof RnIfThen_1 || childComponent instanceof RnRepeat_1.RnRepeat) {
                    childComponent._deactivate();
                }
            }
        }
        this._childComponents = null;
    };
    var RnIfThen_1;
    RnIfThen = RnIfThen_1 = __decorate([
        Component_1.Component({
            elementIs: 'RnIfThen',
            elementExtends: 'template',
            params: {
                if: { property: 'paramIf', type: String, required: true, readonly: true }
            }
        })
    ], RnIfThen);
    return RnIfThen;
}(BaseComponent_1.BaseComponent));
exports.RnIfThen = RnIfThen;


/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__51__;

/***/ }),
/* 52 */
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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function removeNodes(nodes) {
    var nodeCount = nodes.length;
    if (nodeCount == 1) {
        var node = nodes[0];
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    else {
        for (var i = 0; i < nodeCount; i++) {
            var node = nodes[i];
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
        }
    }
}
exports.removeNodes = removeNodes;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
var map_set_polyfill_1 = __webpack_require__(7);
var next_tick_1 = __webpack_require__(51);
var cellx_1 = __webpack_require__(12);
var move_content_1 = __webpack_require__(52);
var attachChildComponentElements_1 = __webpack_require__(34);
var BaseComponent_1 = __webpack_require__(30);
var bindContent_1 = __webpack_require__(35);
var Component_1 = __webpack_require__(15);
var ElementProtoMixin_1 = __webpack_require__(26);
var compileKeypath_1 = __webpack_require__(44);
var keypathPattern_1 = __webpack_require__(41);
var namePattern_1 = __webpack_require__(42);
var removeNodes_1 = __webpack_require__(53);
var RnIfThen_1 = __webpack_require__(50);
var slice = Array.prototype.slice;
var reForAttrValue = RegExp("^\\s*(" + namePattern_1.namePattern + ")\\s+(?:in|of)\\s+(" + keypathPattern_1.keypathPattern + ")\\s*$");
function getItem(list, index) {
    return Array.isArray(list) ? list[index] : list.get(index);
}
function insertBefore(nodes, beforeNode) {
    var nodeCount = nodes.length;
    if (nodeCount == 1) {
        beforeNode.parentNode.insertBefore(nodes[0], beforeNode);
        return nodes[0];
    }
    var parent = beforeNode.parentNode;
    for (var i = 0; i < nodeCount; i++) {
        parent.insertBefore(nodes[i], beforeNode);
    }
    return nodes[nodeCount - 1];
}
function offBindings(bindings) {
    if (bindings) {
        for (var i = bindings.length; i;) {
            bindings[--i].off();
        }
    }
}
function deactivateChildComponents(childComponents) {
    if (childComponents) {
        for (var i = childComponents.length; i;) {
            var childComponent = childComponents[--i];
            if (childComponent instanceof RnIfThen_1.RnIfThen || childComponent instanceof RnRepeat) {
                childComponent._deactivate();
            }
        }
    }
}
var RnRepeat = /** @class */ (function (_super) {
    __extends(RnRepeat, _super);
    function RnRepeat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._active = false;
        return _this;
    }
    RnRepeat.prototype.elementConnected = function () {
        if (this._active) {
            return;
        }
        this._active = true;
        if (!this.initialized) {
            var for_ = this.paramFor.match(reForAttrValue);
            if (!for_) {
                throw new SyntaxError("Invalid value of parameter \"for\" (" + this.paramFor + ")");
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
    };
    RnRepeat.prototype.elementDisconnected = function () {
        var _this = this;
        next_tick_1.nextTick(function () {
            if (!_this.element[ElementProtoMixin_1.KEY_ELEMENT_CONNECTED]) {
                _this._deactivate();
            }
        });
    };
    RnRepeat.prototype._onListChange = function () {
        if (this.element.parentNode) {
            this._render(true);
        }
    };
    RnRepeat.prototype._attach = function () {
        this._attached = true;
    };
    RnRepeat.prototype._detach = function () {
        this._attached = false;
    };
    RnRepeat.prototype._render = function (fromChangeEvent) {
        var _a;
        var prevList = this._prevList;
        var prevListLength = prevList.length;
        var list = this._list.get();
        var $itemMap = this._$itemMap;
        var trackBy = this._trackBy;
        var startIndex = 0;
        var changed = false;
        if (list) {
            var new$ItemMap = new map_set_polyfill_1.Map();
            var removedValues_1 = new map_set_polyfill_1.Map();
            var el = this.element;
            var lastNode = el;
            for (var i = 0, l = list.length; i < l;) {
                var item = getItem(list, i);
                var value = trackBy ? item[trackBy] : item;
                var $items = $itemMap.get(value);
                if ($items) {
                    if (removedValues_1.has(value)) {
                        var $item = $items.shift();
                        if (new$ItemMap.has(value)) {
                            new$ItemMap.get(value).push($item);
                        }
                        else {
                            new$ItemMap.set(value, [$item]);
                        }
                        if (!$items.length) {
                            $itemMap.delete(value);
                        }
                        var removedCount = removedValues_1.get(value);
                        if (removedCount == 1) {
                            removedValues_1.delete(value);
                        }
                        else {
                            removedValues_1.set(value, removedCount - 1);
                        }
                        $item.item.set(item);
                        $item.index.set(i);
                        lastNode = insertBefore($item.nodes, lastNode == el ? lastNode : lastNode.nextSibling);
                        i++;
                    }
                    else {
                        var foundIndex = void 0;
                        for (var j = startIndex;; j++) {
                            if (foundIndex === undefined) {
                                if (value === (trackBy ? prevList[j][trackBy] : prevList[j])) {
                                    var $item = $items.shift();
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
                                var foundCount = j - foundIndex;
                                var ii = i + foundCount;
                                if (ii < l) {
                                    var iiValue = void 0;
                                    if (j < prevListLength &&
                                        (trackBy
                                            ? (iiValue = getItem(list, ii)[trackBy]) ===
                                                prevList[j][trackBy]
                                            : (iiValue = getItem(list, ii)) === prevList[j])) {
                                        var ii$Items = $itemMap.get(iiValue);
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
                                        for (var k = foundIndex; k < j; k++) {
                                            var kValue = trackBy
                                                ? prevList[k][trackBy]
                                                : prevList[k];
                                            var k$Item = new$ItemMap.get(kValue);
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
                                for (var k = startIndex; k < foundIndex; k++) {
                                    var kValue = trackBy ? prevList[k][trackBy] : prevList[k];
                                    var index = removedValues_1.get(kValue) || 0;
                                    removeNodes_1.removeNodes($itemMap.get(kValue)[index].nodes);
                                    removedValues_1.set(kValue, index + 1);
                                }
                                var lastFoundValue = trackBy
                                    ? prevList[j - 1][trackBy]
                                    : prevList[j - 1];
                                var nodes = new$ItemMap.get(lastFoundValue)[removedValues_1.get(lastFoundValue) || 0].nodes;
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
                    var itemCell = new cellx_1.Cell(item);
                    var indexCell = new cellx_1.Cell(i);
                    var content = this.element.contentTemplate.render();
                    var context = this.$context;
                    var contentBindingResult = [null, null, null];
                    bindContent_1.bindContent(content, this.ownerComponent, Object.create(context, (_a = {
                            '$/': {
                                configurable: false,
                                enumerable: false,
                                writable: false,
                                value: context['$/'] || context
                            }
                        },
                        _a[this._itemName] = {
                            configurable: true,
                            enumerable: true,
                            get: (function (itemCell) { return function () { return itemCell.get(); }; })(itemCell)
                        },
                        _a.$index = {
                            configurable: true,
                            enumerable: true,
                            get: (function (indexCell) { return function () { return indexCell.get(); }; })(indexCell)
                        },
                        _a)), contentBindingResult);
                    var childComponents = contentBindingResult[0];
                    var backBindings = contentBindingResult[2];
                    var new$Item = {
                        item: itemCell,
                        index: indexCell,
                        nodes: slice.call(content.childNodes),
                        bindings: contentBindingResult[1],
                        childComponents: childComponents
                    };
                    if (new$ItemMap.has(value)) {
                        new$ItemMap.get(value).push(new$Item);
                    }
                    else {
                        new$ItemMap.set(value, [new$Item]);
                    }
                    if (childComponents) {
                        for (var i_1 = childComponents.length; i_1;) {
                            var childComponent = childComponents[--i_1];
                            if (childComponent.element.firstChild &&
                                childComponent.constructor
                                    .bindsInputContent) {
                                childComponent.$inputContent = move_content_1.moveContent(document.createDocumentFragment(), childComponent.element);
                            }
                        }
                    }
                    var newLastNode = content.lastChild;
                    ElementProtoMixin_1.suppressConnectionStatusCallbacks();
                    lastNode.parentNode.insertBefore(content, lastNode == el ? lastNode : lastNode.nextSibling);
                    ElementProtoMixin_1.resumeConnectionStatusCallbacks();
                    lastNode = newLastNode;
                    if (childComponents) {
                        attachChildComponentElements_1.attachChildComponentElements(childComponents);
                    }
                    if (backBindings) {
                        for (var i_2 = backBindings.length; i_2; i_2 -= 3) {
                            backBindings[i_2 - 3].on('change:' + backBindings[i_2 - 2], backBindings[i_2 - 1]);
                        }
                    }
                    changed = true;
                    i++;
                }
            }
            if (removedValues_1.size) {
                (function ($itemMap) {
                    removedValues_1.forEach(function (_removedCount, value) {
                        for (var _i = 0, _a = $itemMap.get(value); _i < _a.length; _i++) {
                            var $item = _a[_i];
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
            for (var i = startIndex; i < prevListLength; i++) {
                var value = trackBy ? prevList[i][trackBy] : prevList[i];
                for (var _i = 0, _b = $itemMap.get(value); _i < _b.length; _i++) {
                    var $item = _b[_i];
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
    };
    RnRepeat.prototype._deactivate = function () {
        if (!this._active) {
            return;
        }
        this._active = false;
        this._list.off('change', this._onListChange, this);
        var prevList = this._prevList;
        var $itemMap = this._$itemMap;
        var trackBy = this._trackBy;
        for (var i = 0, l = prevList.length; i < l; i++) {
            var value = trackBy ? prevList[i][trackBy] : prevList[i];
            for (var _i = 0, _a = $itemMap.get(value); _i < _a.length; _i++) {
                var $item = _a[_i];
                removeNodes_1.removeNodes($item.nodes);
                offBindings($item.bindings);
                deactivateChildComponents($item.childComponents);
            }
        }
        $itemMap.clear();
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
    return RnRepeat;
}(BaseComponent_1.BaseComponent));
exports.RnRepeat = RnRepeat;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
var Component_1 = __webpack_require__(15);
var RnIfThen_1 = __webpack_require__(50);
var RnIfElse = /** @class */ (function (_super) {
    __extends(RnIfElse, _super);
    function RnIfElse() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._elseMode = true;
        return _this;
    }
    RnIfElse = __decorate([
        Component_1.Component({
            elementIs: 'RnIfElse',
            elementExtends: 'template'
        })
    ], RnIfElse);
    return RnIfElse;
}(RnIfThen_1.RnIfThen));
exports.RnIfElse = RnIfElse;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
var get_uid_1 = __webpack_require__(31);
var map_set_polyfill_1 = __webpack_require__(7);
var move_content_1 = __webpack_require__(33);
var symbol_polyfill_1 = __webpack_require__(8);
var attachChildComponentElements_1 = __webpack_require__(34);
var BaseComponent_1 = __webpack_require__(30);
var bindContent_1 = __webpack_require__(35);
var Component_1 = __webpack_require__(15);
var ElementProtoMixin_1 = __webpack_require__(26);
var cloneNode_1 = __webpack_require__(57);
var KEY_SLOT_CONTENT_MAP = symbol_polyfill_1.Symbol('Rionite/RnSlot[slotContentMap]');
var RnSlot = /** @class */ (function (_super) {
    __extends(RnSlot, _super);
    function RnSlot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RnSlot, "bindsInputContent", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    RnSlot.prototype._attach = function () {
        this._attached = true;
        if (this.isReady) {
            this._unfreezeBindings();
            return;
        }
        var ownerComponent = this.ownerComponent;
        var contentOwnerComponent = ownerComponent.ownerComponent;
        var ownerComponentInputContent = ownerComponent.$inputContent;
        var el = this.element;
        var cloneContent = this.paramCloneContent;
        var content;
        var childComponents;
        var bindings;
        var backBindings;
        if (ownerComponentInputContent || !cloneContent) {
            var slotName = this.paramName;
            var forTag = void 0;
            var for$ = void 0;
            if (!slotName) {
                forTag = this.paramForTag;
                if (forTag) {
                    forTag = forTag.toUpperCase();
                }
                else {
                    for$ = this.paramFor;
                }
            }
            var key = get_uid_1.getUID(ownerComponent) +
                '/' +
                (slotName ? 'slot:' + slotName : forTag ? 'tag:' + forTag : for$ || '');
            if (slotName || forTag || for$) {
                var contentMap = void 0;
                if (!cloneContent &&
                    (contentMap = contentOwnerComponent[KEY_SLOT_CONTENT_MAP]) &&
                    contentMap.has(key)) {
                    var container = contentMap.get(key);
                    if (container.firstChild) {
                        content = move_content_1.moveContent(document.createDocumentFragment(), container);
                        contentMap.set(key, el);
                        childComponents = container.$component._childComponents;
                        bindings = container.$component._bindings;
                    }
                }
                else if (ownerComponentInputContent) {
                    if (for$ && for$.indexOf('__') == -1) {
                        var elementBlockNames = ownerComponent.constructor
                            ._elementBlockNames;
                        for$ = elementBlockNames[elementBlockNames.length - 1] + '__' + for$;
                    }
                    var selectedElements = ownerComponentInputContent.querySelectorAll(for$ ? '.' + for$ : forTag || "[slot=" + slotName + "]");
                    var selectedElementCount = selectedElements.length;
                    if (selectedElementCount) {
                        content = document.createDocumentFragment();
                        for (var i = 0; i < selectedElementCount; i++) {
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
                var contentMap = contentOwnerComponent[KEY_SLOT_CONTENT_MAP];
                if (contentMap && contentMap.has(key)) {
                    var container = contentMap.get(key);
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
                var contentBindingResult = [null, null, null];
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
                    for (var i = childComponents.length; i;) {
                        var childComponent = childComponents[--i];
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
            for (var i = backBindings.length; i; i -= 3) {
                backBindings[i - 3].on('change:' + backBindings[i - 2], backBindings[i - 1]);
            }
        }
        this.isReady = true;
    };
    RnSlot.prototype._detach = function () {
        this._attached = false;
        this._freezeBindings();
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
    return RnSlot;
}(BaseComponent_1.BaseComponent));
exports.RnSlot = RnSlot;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IE = !!document.documentMode || navigator.userAgent.indexOf('Edge/') != -1;
function cloneNode(node) {
    var copy;
    switch (node.nodeType) {
        case Node.DOCUMENT_FRAGMENT_NODE: {
            copy = document.createDocumentFragment();
            for (var child = node.firstChild; child; child = child.nextSibling) {
                copy.appendChild(cloneNode(child));
            }
            break;
        }
        case Node.ELEMENT_NODE: {
            var tagName = node.tagName.toLowerCase();
            var is = node.getAttribute('is');
            if (is) {
                copy = window.innerHTML(document.createElement('div'), "<" + tagName + " is=\"" + is + "\">").firstChild;
            }
            else if (IE) {
                copy = window.innerHTML(document.createElement('div'), "<" + tagName + ">")
                    .firstChild;
            }
            else {
                copy = document.createElementNS(node.namespaceURI, tagName);
            }
            if ((tagName == 'template' || tagName == 'rn-slot') &&
                node.contentTemplate) {
                copy.contentTemplate = node.contentTemplate;
            }
            var attrs = node.attributes;
            for (var i = 0, l = attrs.length; i < l; i++) {
                var attr = attrs.item(i);
                if (!is || attr.name != 'is') {
                    copy.setAttributeNS(attr.namespaceURI, attr.name, attr.value);
                }
            }
            for (var child = node.firstChild; child; child = child.nextSibling) {
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