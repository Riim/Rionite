/*!
Copyright (C) 2014-2015 by WebReflection

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
;(function(window, document, Object, REGISTER_ELEMENT){'use strict';

// in case it's there or already patched
if (REGISTER_ELEMENT in document) return;

// DO NOT USE THIS FILE DIRECTLY, IT WON'T WORK
// THIS IS A PROJECT BASED ON A BUILD SYSTEM
// THIS FILE IS JUST WRAPPED UP RESULTING IN
// build/document-register-element.js
// and its .max.js counter part

var
  // IE < 11 only + old WebKit for attributes + feature detection
  EXPANDO_UID = '__' + REGISTER_ELEMENT + (Math.random() * 10e4 >> 0),

  // shortcuts and costants
  ATTACHED = 'attached',
  DETACHED = 'detached',
  EXTENDS = 'extends',
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
  gOPD = Object.getOwnPropertyDescriptor,
  gOPN = Object.getOwnPropertyNames,
  gPO = Object.getPrototypeOf,
  sPO = Object.setPrototypeOf,

  // jshint proto: true
  hasProto = !!Object.__proto__,

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

  isValidNode = IE8 ?
    function (node) {
      return node.nodeType === 1;
    } :
    function (node) {
      return iPO.call(HTMLElementPrototype, node);
    },

  targets = IE8 && [],

  setAttribute = HTMLElementPrototype.setAttribute,
  removeAttribute = HTMLElementPrototype.removeAttribute,

  // replaced later on
  createElement = document.createElement,

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
  rAF = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (fn) { setTimeout(fn, 10); },

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

  // based on setting prototype capability
  // will check proto or the expando attribute
  // in order to setup the node once
  patchIfNotAlready,
  patch
;

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
      descriptor = gOPD(HTMLElementPrototype, 'addEventListener'),
      addEventListener = descriptor.value,
      patchedRemoveAttribute = function (name) {
        var e = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true});
        e.attrName = name;
        e.prevValue = this.getAttribute(name);
        e.newValue = null;
        e[REMOVAL] = e.attrChange = 2;
        removeAttribute.call(this, name);
        this.dispatchEvent(e);
      },
      patchedSetAttribute = function (name, value) {
        var
          had = this.hasAttribute(name),
          old = had && this.getAttribute(name),
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
        this.dispatchEvent(e);
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
          node.dispatchEvent(event);
        }
      }
    ;
    descriptor.value = function (type, handler, capture) {
      if (
        type === DOM_ATTR_MODIFIED &&
        this.attributeChangedCallback &&
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
    defineProperty(HTMLElementPrototype, 'addEventListener', descriptor);
  }());
} else if (!MutationObserver) {
  documentElement.addEventListener(DOM_ATTR_MODIFIED, DOMAttrModified);
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
    is = target.getAttribute('is'),
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
    target = e.target
  ;
  if (notFromInnerHTMLHelper &&
      (!target || target === node) &&
      node.attributeChangedCallback &&
      attrName !== 'style' &&
      e.prevValue !== e.newValue) {
    node.attributeChangedCallback(
      attrName,
      attrChange === e[ADDITION] ? null : e.prevValue,
      attrChange === e[REMOVAL] ? null : e.newValue
    );
  }
}

function onDOMNode(action) {
  var executor = executeAction(action);
  return function (e) {
    asapQueue.push(executor, e.target);
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
      node.addEventListener(DOM_SUBTREE_MODIFIED, onSubtreeModified);
    }
    node.addEventListener(DOM_ATTR_MODIFIED, onDOMAttrModified);
  }
  if (node.createdCallback && notFromInnerHTMLHelper) {
    node.created = true;
    node.createdCallback();
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
    if (i && (fn = node[action + 'Callback'])) fn.call(node);
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
                  node.attributeChangedCallback &&
                  current.attributeName !== 'style') {
                newValue = node.getAttribute(current.attributeName);
                if (newValue !== current.oldValue) {
                  node.attributeChangedCallback(
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
      observer.observe(
        document,
        {
          childList: true,
          subtree: true
        }
      );
    } else {
      asapQueue = [];
      rAF(function ASAP() {
        while (asapQueue.length) {
          asapQueue.shift().call(
            null, asapQueue.shift()
          );
        }
        rAF(ASAP);
      });
      document.addEventListener('DOMNodeInserted', onDOMNode(ATTACHED));
      document.addEventListener('DOMNodeRemoved', onDOMNode(DETACHED));
    }

    document.addEventListener(DOM_CONTENT_LOADED, onReadyStateChange);
    document.addEventListener('readystatechange', onReadyStateChange);

    document.createElement = function (localName, typeExtension) {
      var
        node = createElement.apply(document, arguments),
        name = '' + localName,
        i = indexOf.call(
          types,
          (typeExtension ? PREFIX_IS : PREFIX_TAG) +
          (typeExtension || name).toUpperCase()
        ),
        setup = -1 < i
      ;
      if (typeExtension) {
        node.setAttribute('is', typeExtension = typeExtension.toLowerCase());
        if (setup) {
          setup = isInQSA(name.toUpperCase(), typeExtension);
        }
      }
      notFromInnerHTMLHelper = !document.createElement.innerHTMLHelper;
      if (setup) patch(node, protos[i]);
      return node;
    };

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

}(window, document, Object, 'registerElement'));
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
				var df = this.__contentische__ = document.createDocumentFragment();

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
		exports["Rionite"] = factory(require("cellx"));
	else
		root["Rionite"] = factory(root["cellx"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DisposableMixin = __webpack_require__(1);
	var ElementAttributes = __webpack_require__(3);
	var Component = __webpack_require__(10);
	var registerComponent = __webpack_require__(11);
	var RtContent = __webpack_require__(25);
	var RtIfThen = __webpack_require__(26);
	var RtIfElse = __webpack_require__(27);
	var RtRepeat = __webpack_require__(28);
	var camelize = __webpack_require__(8);
	var hyphenize = __webpack_require__(9);
	var escapeHTML = __webpack_require__(5);
	var unescapeHTML = __webpack_require__(6);
	var isRegExp = __webpack_require__(7);
	var pathToJSExpression = __webpack_require__(18);
	var compilePath = __webpack_require__(19);
	var compileString = __webpack_require__(17);
	var defer = __webpack_require__(14);
	var htmlToFragment = __webpack_require__(24);

	var Rionite = module.exports = {
		DisposableMixin: DisposableMixin,
		ElementAttributes: ElementAttributes,
		Component: Component,
		registerComponent: registerComponent,

		components: {
			RtContent: RtContent,
			RtIfThen: RtIfThen,
			RtIfElse: RtIfElse,
			RtRepeat: RtRepeat
		},

		utils: {
			camelize: camelize,
			hyphenize: hyphenize,
			escapeHTML: escapeHTML,
			unescapeHTML: unescapeHTML,
			isRegExp: isRegExp,
			pathToJSExpression: pathToJSExpression,
			compilePath: compilePath,
			compileString: compileString,
			defer: defer,
			htmlToFragment: htmlToFragment
		}
	};
	Rionite.Rionite = Rionite; // for destructuring

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _require = __webpack_require__(2);

	var EventEmitter = _require.EventEmitter;
	var nextUID = _require.utils.nextUID;


	var isArray = Array.isArray;

	var DisposableMixin = EventEmitter.extend({
		constructor: function DisposableMixin() {
			/**
	   * @type {Object<{ dispose: () }>}
	   */
			this._disposables = {};
		},

		listenTo: function listenTo(target, type, listener, context) {
			var _this = this;

			var listenings = void 0;

			if (isArray(target) || target instanceof NodeList || target instanceof HTMLCollection || target.addClass && target.each) {
				if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) == 'object' && !isArray(type)) {
					if (arguments.length < 3) {
						listener = this;
					}
				} else if (arguments.length < 4) {
					context = this;
				}

				listenings = [];

				for (var i = 0, l = target.length; i < l; i++) {
					listenings.push(this.listenTo(target[i], type, listener, context));
				}
			} else if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) == 'object') {
				listenings = [];

				if (isArray(type)) {
					if (arguments.length < 4) {
						context = this;
					}

					var types = type;

					for (var _i = 0, _l = types.length; _i < _l; _i++) {
						listenings.push(this.listenTo(target, types[_i], listener, context));
					}
				} else {
					context = arguments.length < 3 ? this : listener;

					var listeners = type;

					for (var _type in listeners) {
						listenings.push(this.listenTo(target, _type, listeners[_type], context));
					}
				}
			} else {
				if (arguments.length < 4) {
					context = this;
				}

				if ((typeof listener === 'undefined' ? 'undefined' : _typeof(listener)) == 'object') {
					var _listeners = listener;

					listenings = [];

					if (isArray(_listeners)) {
						for (var _i2 = 0, _l2 = _listeners.length; _i2 < _l2; _i2++) {
							listenings.push(this.listenTo(target, type, _listeners[_i2], context));
						}
					} else {
						for (var name in _listeners) {
							listenings.push(this.listenTo(target[name]('unwrap', 0), type, _listeners[name], context));
						}
					}
				} else {
					return this._listenTo(target, type, listener, context);
				}
			}

			var id = nextUID();

			var stopListening = function stopListening() {
				for (var _i3 = listenings.length; _i3;) {
					listenings[--_i3].stop();
				}

				delete _this._disposables[id];
			};

			var listening = this._disposables[id] = {
				stop: stopListening,
				dispose: stopListening
			};

			return listening;
		},


		/**
	  * @typesign (
	  *     target: cellx.EventEmitter|EventTarget,
	  *     type: string,
	  *     listener: (evt: cellx~Event|Event) -> ?boolean,
	  *     context
	  * ) -> { stop: (), dispose: () };
	  */
		_listenTo: function _listenTo(target, type, listener, context) {
			var _this2 = this;

			if (target instanceof EventEmitter) {
				target.on(type, listener, context);
			} else if (target.addEventListener) {
				if (target !== context) {
					listener = listener.bind(context);
				}

				target.addEventListener(type, listener);
			} else {
				throw new TypeError('Unable to add a listener');
			}

			var id = nextUID();

			var stopListening = function stopListening() {
				if (_this2._disposables[id]) {
					if (target instanceof EventEmitter) {
						target.off(type, listener, context);
					} else {
						target.removeEventListener(type, listener);
					}

					delete _this2._disposables[id];
				}
			};

			var listening = this._disposables[id] = {
				stop: stopListening,
				dispose: stopListening
			};

			return listening;
		},


		/**
	  * @typesign (cb: Function, delay: uint) -> { clear: (), dispose: () };
	  */
		setTimeout: function (_setTimeout) {
			function setTimeout(_x, _x2) {
				return _setTimeout.apply(this, arguments);
			}

			setTimeout.toString = function () {
				return _setTimeout.toString();
			};

			return setTimeout;
		}(function (cb, delay) {
			var _this3 = this;

			var id = nextUID();

			var timeoutId = setTimeout(function () {
				delete _this3._disposables[id];
				cb.call(_this3);
			}, delay);

			var clearTimeout_ = function clearTimeout_() {
				if (_this3._disposables[id]) {
					clearTimeout(timeoutId);
					delete _this3._disposables[id];
				}
			};

			var timeout = this._disposables[id] = {
				clear: clearTimeout_,
				dispose: clearTimeout_
			};

			return timeout;
		}),


		/**
	  * @typesign (cb: Function, delay: uint) -> { clear: (), dispose: () };
	  */
		setInterval: function (_setInterval) {
			function setInterval(_x3, _x4) {
				return _setInterval.apply(this, arguments);
			}

			setInterval.toString = function () {
				return _setInterval.toString();
			};

			return setInterval;
		}(function (cb, delay) {
			var _this4 = this;

			var id = nextUID();

			var intervalId = setInterval(function () {
				cb.call(_this4);
			}, delay);

			var clearInterval_ = function clearInterval_() {
				if (_this4._disposables[id]) {
					clearInterval(intervalId);
					delete _this4._disposables[id];
				}
			};

			var interval = this._disposables[id] = {
				clear: clearInterval_,
				dispose: clearInterval_
			};

			return interval;
		}),


		/**
	  * @typesign (cb: Function) -> { (), cancel: (), dispose: () };
	  */
		registerCallback: function registerCallback(cb) {
			var _this5 = this;

			var id = nextUID();
			var component = this;

			var cancelCallback = function cancelCallback() {
				delete _this5._disposables[id];
			};

			function wrapper() {
				if (component._disposables[id]) {
					delete component._disposables[id];
					return cb.apply(component, arguments);
				}
			}
			wrapper.cancel = cancelCallback;
			wrapper.dispose = cancelCallback;

			this._disposables[id] = wrapper;

			return wrapper;
		},


		/**
	  * @typesign () -> Rionite.DisposableMixin;
	  */
		dispose: function dispose() {
			var disposables = this._disposables;

			for (var id in disposables) {
				disposables[id].dispose();
			}

			return this;
		}
	});

	module.exports = DisposableMixin;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _require = __webpack_require__(2);

	var EventEmitter = _require.EventEmitter;
	var Cell = _require.Cell;

	var typeHandlers = __webpack_require__(4);
	var camelize = __webpack_require__(8);
	var hyphenize = __webpack_require__(9);

	var defineProperty = Object.defineProperty;

	/**
	 * @typesign new ElementAttributes(el: HTMLElement) -> Rionite.ElementAttributes;
	 */
	var ElementAttributes = EventEmitter.extend({
		constructor: function ElementAttributes(el) {
			var _this = this;

			var component = el.$c;
			var attributesConfig = component.constructor.elementAttributes;

			var _loop = function _loop(name) {
				var defaultValue = attributesConfig[name];
				var type = typeof defaultValue === 'undefined' ? 'undefined' : _typeof(defaultValue);
				var handlers = typeHandlers.get(type == 'function' ? defaultValue : type);

				if (!handlers) {
					throw new TypeError('Unsupported attribute type');
				}

				var camelizedName = camelize(name);
				var hyphenizedName = hyphenize(name);

				var attrValue = _this['_' + camelizedName] = _this['_' + hyphenizedName] = new Cell(el.getAttribute(hyphenizedName), {
					merge: function merge(value, oldValue) {
						return oldValue && value === oldValue[0] ? oldValue : [value, handlers[0](value, defaultValue, component)];
					},
					onChange: function onChange(evt) {
						if (component.isReady) {
							component.elementAttributeChanged(hyphenizedName, evt.oldValue[1], evt.value[1]);
						}
					}
				});

				var descriptor = {
					configurable: true,
					enumerable: true,

					get: function get() {
						return attrValue.get()[1];
					},
					set: function set(value) {
						value = handlers[1](value, defaultValue);

						if (value === null) {
							el.removeAttribute(hyphenizedName);
						} else {
							el.setAttribute(hyphenizedName, value);
						}

						attrValue.set(value);
					}
				};

				defineProperty(_this, camelizedName, descriptor);

				if (hyphenizedName != camelizedName) {
					defineProperty(_this, hyphenizedName, descriptor);
				}
			};

			for (var name in attributesConfig) {
				_loop(name);
			}
		}
	});

	module.exports = ElementAttributes;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(2);

	var Map = _require.js.Map;

	var escapeHTML = __webpack_require__(5);
	var unescapeHTML = __webpack_require__(6);
	var isRegExp = __webpack_require__(7);

	module.exports = new Map([[Boolean, [function (value) {
		return value !== null ? value != 'no' : false;
	}, function (value) {
		return value ? '' : null;
	}]], ['boolean', [function (value, defaultValue) {
		return value !== null ? value != 'no' : defaultValue;
	}, function (value, defaultValue) {
		return value ? '' : defaultValue ? 'no' : null;
	}]], [Number, [function (value) {
		return value !== null ? +value : void 0;
	}, function (value) {
		return value !== void 0 ? String(+value) : null;
	}]], ['number', [function (value, defaultValue) {
		return value !== null ? +value : defaultValue;
	}, function (value) {
		return value !== void 0 ? String(+value) : null;
	}]], [String, [function (value) {
		return value !== null ? value : void 0;
	}, function (value) {
		return value !== void 0 ? String(value) : null;
	}]], ['string', [function (value, defaultValue) {
		return value !== null ? value : defaultValue;
	}, function (value) {
		return value !== void 0 ? String(value) : null;
	}]], [Object, [function (value, defaultValue, component) {
		return value !== null ? Object(Function('return ' + unescapeHTML(value) + ';').call(component)) : void 0;
	}, function (value) {
		return value != null ? escapeHTML(isRegExp(value) ? value.toString() : JSON.stringify(value)) : null;
	}]], ['object', [function (value, defaultValue, component) {
		return value !== null ? Object(Function('return ' + unescapeHTML(value) + ';').call(component)) : defaultValue;
	}, function (value) {
		return value != null ? escapeHTML(isRegExp(value) ? value.toString() : JSON.stringify(value)) : null;
	}]]]);

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var reEscapableChars = /[&<>"]/g;
	var charToEntityMap = Object.create(null);

	charToEntityMap['&'] = '&amp;';
	charToEntityMap['<'] = '&lt;';
	charToEntityMap['>'] = '&gt;';
	charToEntityMap['"'] = '&quot;';

	function escapeHTML(str) {
		return reEscapableChars.test(str) ? str.replace(reEscapableChars, function (chr) {
			return charToEntityMap[chr];
		}) : str;
	}

	module.exports = escapeHTML;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var reEscapableEntities = /&(?:amp|lt|gt|quot);/g;
	var entityToCharMap = Object.create(null);

	entityToCharMap['&amp;'] = '&';
	entityToCharMap['&lt;'] = '<';
	entityToCharMap['&gt;'] = '>';
	entityToCharMap['&quot;'] = '"';

	function unescapeHTML(str) {
		return reEscapableEntities.test(str) ? str.replace(reEscapableEntities, function (entity) {
			return entityToCharMap[entity];
		}) : str;
	}

	module.exports = unescapeHTML;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	var toString = Object.prototype.toString;

	function isRegExp(value) {
		return toString.call(value) == '[object RegExp]';
	}

	module.exports = isRegExp;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	var reHyphen = /[\-_]+([a-z]|$)/g;

	var cache = Object.create(null);

	function camelize(str) {
		return cache[str] || (cache[str] = str.replace(reHyphen, function (match, chr) {
			return chr.toUpperCase();
		}));
	}

	module.exports = camelize;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	var reHump = /\-?([A-Z])([^A-Z])/g;
	var reLongHump = /\-?([A-Z]+)/g;
	var reMinus = /^-/;

	var cache = Object.create(null);

	function hyphenize(str) {
		return cache[str] || (cache[str] = str.replace(reHump, function (match, chr1, chr2) {
			return '-' + chr1.toLowerCase() + chr2;
		}).replace(reLongHump, function (match, chars) {
			return '-' + chars.toLowerCase();
		}).replace(reMinus, ''));
	}

	module.exports = hyphenize;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(2);

	var EventEmitter = _require.EventEmitter;
	var Cell = _require.Cell;
	var _Symbol = _require.js.Symbol;
	var createClass = _require.utils.createClass;

	var DisposableMixin = __webpack_require__(1);
	var ElementAttributes = __webpack_require__(3);
	var registerComponent = __webpack_require__(11);
	var bind = __webpack_require__(15);
	var defineAssets = __webpack_require__(20);
	var listenAssets = __webpack_require__(21);
	var eventTypes = __webpack_require__(22);
	var onEvent = __webpack_require__(23);
	var camelize = __webpack_require__(8);
	var defer = __webpack_require__(14);
	var htmlToFragment = __webpack_require__(24);

	var createObject = Object.create;
	var getPrototypeOf = Object.getPrototypeOf;
	var defineProperty = Object.defineProperty;
	var map = Array.prototype.map;

	var KEY_RAW_CONTENT = _Symbol('rawContent');

	var reClosedCustomElementTag = /<(\w+(?:\-\w+)+)([^>]*)\/>/g;

	function created() {}
	function initialize() {}
	function ready() {}
	function elementAttached() {}
	function elementDetached() {}
	function elementMoved() {}
	function elementAttributeChanged() {}

	var Component = EventEmitter.extend({
		Implements: [DisposableMixin],

		Static: {
			extend: function extend(elementIs, description) {
				description.Extends = this;
				(description.Static || (description.Static = {})).elementIs = elementIs;
				return registerComponent(createClass(description));
			},


			template: null,

			elementIs: void 0,
			elementExtends: void 0,

			elementAttributes: null,

			assets: null
		},

		/**
	  * @type {?Rionite.Component}
	  */
		ownerComponent: null,

		_parentComponent: null,

		/**
	  * @type {?Rionite.Component}
	  */
		get parentComponent() {
			if (this._parentComponent !== void 0) {
				return this._parentComponent;
			}

			for (var node; node = (node || this.element).parentNode;) {
				if (node.$c) {
					return this._parentComponent = node.$c;
				}
			}

			return this._parentComponent = null;
		},

		/**
	  * @type {HTMLElement}
	  */
		element: null,

		/**
	  * @type {Rionite.ElementAttributes}
	  */
		get elementAttributes() {
			var attrs = new ElementAttributes(this.element);

			defineProperty(this, 'elementAttributes', {
				configurable: true,
				enumerable: true,
				writable: true,
				value: attrs
			});

			return attrs;
		},

		/**
	  * @type {Rionite.Properties}
	  */
		get props() {
			var props = createObject(this.elementAttributes);

			props.content = null;
			props.context = null;

			defineProperty(this, 'props', {
				configurable: true,
				enumerable: true,
				writable: true,
				value: props
			});

			return props;
		},

		_elementAttached: null,

		_bindings: null,

		initialized: false,
		isReady: false,

		_blockNameInMarkup: void 0,

		constructor: function Component(el, props) {
			EventEmitter.call(this);
			DisposableMixin.call(this);

			if (el == null) {
				el = document.createElement(this.constructor.elementIs);
			} else if (typeof el == 'string') {
				var elementIs = this.constructor.elementIs;
				var html = el;

				el = document.createElement(elementIs);
				el.innerHTML = html;

				var firstChild = el.firstChild;

				if (firstChild == el.lastChild && firstChild.nodeType == 1 && firstChild.tagName.toLowerCase() == elementIs) {
					el = firstChild;
				}
			}

			this.element = el;

			defineProperty(el, '$c', { value: this });

			if (props) {
				var properties = this.props;

				for (var name in props) {
					properties[camelize(name)] = props[name];
				}
			}

			this._elementAttached = new Cell(false, {
				owner: this,
				onChange: this._onElementAttachedChange
			});

			this.created();
		},

		/**
	  * @override
	  */
		_handleEvent: function _handleEvent(evt) {
			EventEmitter.prototype._handleEvent.call(this, evt);

			if (evt.bubbles !== false && !evt.isPropagationStopped) {
				var parentComponent = this.parentComponent;

				if (parentComponent) {
					parentComponent._handleEvent(evt);
				} else {
					onEvent(evt);
				}
			}
		},
		_onElementAttachedChange: function _onElementAttachedChange(evt) {
			var _this = this;

			if (evt.value) {
				if (!this.initialized) {
					this.initialize();
					this.initialized = true;
				}

				var constr = this.constructor;
				var rawContent = constr[KEY_RAW_CONTENT];
				var el = this.element;

				if (this.isReady) {
					for (var child; child = el.firstChild;) {
						el.removeChild(child);
					}
				} else {
					for (var c = constr;;) {
						el.classList.add(c.elementIs);
						c = getPrototypeOf(c.prototype).constructor;

						if (c == Component) {
							break;
						}
					}

					var attrs = this.elementAttributes;
					var attributesConfig = constr.elementAttributes;

					for (var name in attributesConfig) {
						if (typeof attributesConfig[name] != 'function') {
							var camelizedName = camelize(name);
							attrs[camelizedName] = attrs[camelizedName];
						}
					}

					if (constr.template != null) {
						if (!rawContent) {
							var template = constr.template;

							if (typeof template != 'string') {
								template = template.render ? template.render(this) : template.call(this, this);
							}

							rawContent = constr[KEY_RAW_CONTENT] = htmlToFragment(template.replace(reClosedCustomElementTag, '<$1$2></$1>'));
						}

						var inputContent = this.props.content = document.createDocumentFragment();

						for (var _child; _child = el.firstChild;) {
							inputContent.appendChild(_child);
						}
					}
				}

				var content = rawContent && rawContent.cloneNode(true);

				if (content) {
					this._bindings = bind(content, this);
					this.element.appendChild(content);
				}

				if (!this.isReady || this.elementAttached !== elementAttached) {
					defer(function () {
						var assetsConfig = _this.constructor.assets;

						if (!_this.isReady) {
							if (assetsConfig) {
								defineAssets(_this, assetsConfig);
							}

							_this.ready();

							_this.isReady = true;
						}

						if (assetsConfig) {
							listenAssets(_this, assetsConfig);
						}

						_this.elementAttached();
					});
				}
			} else {
				this.dispose();
				this._destroyBindings();
				this.elementDetached();
			}
		},
		_destroyBindings: function _destroyBindings() {
			var bindings = this._bindings;

			if (bindings) {
				for (var i = bindings.length; i;) {
					bindings[--i].off();
				}

				this._bindings = null;
			}
		},


		created: created,
		initialize: initialize,
		ready: ready,
		elementAttached: elementAttached,
		elementDetached: elementDetached,
		elementMoved: elementMoved,
		elementAttributeChanged: elementAttributeChanged,

		/**
	  * @typesign (selector: string) -> ?Rionite.Component|HTMLElement;
	  */
		$: function $(selector) {
			var el = this.element.querySelector(this._prepareSelector(selector));
			return el && (el.$c || el);
		},


		/**
	  * @typesign (selector: string) -> Array<Rionite.Component|HTMLElement>;
	  */
		$$: function $$(selector) {
			return map.call(this.element.querySelectorAll(this._prepareSelector(selector)), function (el) {
				return el.$c || el;
			});
		},
		_prepareSelector: function _prepareSelector(selector) {
			selector = selector.split('&');

			if (selector.length == 1) {
				return selector[0];
			}

			var blockName = this._blockNameInMarkup;

			if (!blockName) {
				for (var constr = this.constructor;;) {
					var parentConstr = getPrototypeOf(constr.prototype).constructor;

					if (constr.template !== parentConstr.template) {
						blockName = constr.elementIs;
						break;
					}

					if (parentConstr == Component) {
						blockName = this.constructor.elementIs;
						break;
					}

					constr = parentConstr;
				}

				this._blockNameInMarkup = blockName;
			}

			return selector.join('.' + blockName);
		}
	});

	module.exports = Component;

	document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
		document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);

		eventTypes.forEach(function (type) {
			document.addEventListener(type, onEvent);
		});
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(2);

	var mixin = _require.utils.mixin;

	var elementConstructorMap = __webpack_require__(12);
	var ElementProtoMixin = __webpack_require__(13);

	var createObject = Object.create;
	var getPrototypeOf = Object.getPrototypeOf;
	var hasOwn = Object.prototype.hasOwnProperty;

	var inheritedStaticProperties = ['template', 'elementExtends', 'elementAttributes', 'assets'];

	function registerComponent(componentConstr) {
		var elementIs = componentConstr.elementIs;

		if (!elementIs) {
			throw new TypeError('Static property "elementIs" is required');
		}

		var parentComponentConstr = void 0;

		inheritedStaticProperties.forEach(function (name) {
			if (!hasOwn.call(componentConstr, name)) {
				componentConstr[name] = (parentComponentConstr || (parentComponentConstr = getPrototypeOf(componentConstr.prototype).constructor))[name];
			}
		});

		var elementExtends = componentConstr.elementExtends;
		var parentElementConstr = elementExtends ? elementConstructorMap[elementExtends] || window['HTML' + (elementExtends.charAt(0).toUpperCase() + elementExtends.slice(1)) + 'Element'] : HTMLElement;
		var elementProto = createObject(parentElementConstr.prototype);

		mixin(elementProto, ElementProtoMixin);
		elementProto._rioniteComponentConstructor = componentConstr;

		elementConstructorMap[elementIs] = document.registerElement(elementIs, elementExtends ? { extends: elementExtends, prototype: elementProto } : { prototype: elementProto });

		return componentConstr;
	}

	module.exports = registerComponent;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(2);

	var mixin = _require.utils.mixin;


	module.exports = mixin(Object.create(null), {
		template: window.HTMLTemplateElement || HTMLElement,

		br: window.HTMLBRElement,
		caption: window.HTMLTableCaptionElement,
		col: window.HTMLTableColElement,
		datalist: window.HTMLDataListElement,
		dl: window.HTMLDListElement,
		fieldset: window.HTMLFieldSetElement,
		frameset: window.HTMLFrameSetElement,
		hr: window.HTMLHRElement,
		iframe: window.HTMLIFrameElement,
		li: window.HTMLLIElement,
		ol: window.HTMLOListElement,
		optgroup: window.HTMLOptGroupElement,
		tbody: window.HTMLTableSectionElement,
		td: window.HTMLTableCellElement,
		textarea: window.HTMLTextAreaElement,
		tfoot: window.HTMLTableSectionElement,
		thead: window.HTMLTableSectionElement,
		tr: window.HTMLTableRowElement,
		ul: window.HTMLUListElement
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(2);

	var nextTick = _require.utils.nextTick;

	var defer = __webpack_require__(14);

	var hasOwn = Object.prototype.hasOwnProperty;

	var ElementProtoMixin = {
		get rioniteComponent() {
			return this.$c;
		},

		get $c() {
			return new this._rioniteComponentConstructor(this);
		},

		attachedCallback: function attachedCallback() {
			var component = this.$c;

			if (component._elementAttached.get()) {
				if (component._parentComponent === null) {
					component._parentComponent = void 0;
					component.elementMoved();
				} else {
					component._parentComponent = void 0;
				}
			} else {
				component._parentComponent = void 0;

				if (component.parentComponent) {
					if (component.ownerComponent) {
						component._elementAttached.set(true);
					}
				} else {
					nextTick(function () {
						component._parentComponent = void 0;

						if (!component.parentComponent) {
							component._elementAttached.set(true);
						}
					});
				}
			}
		},
		detachedCallback: function detachedCallback() {
			var component = this.$c;

			component._parentComponent = null;

			defer(function () {
				if (component._parentComponent === null) {
					component._elementAttached.set(false);
				}
			});
		},
		attributeChangedCallback: function attributeChangedCallback(name, oldValue, value) {
			if (this.$c.isReady) {
				var attrs = this.$c.elementAttributes;
				var privateName = '_' + name;

				if (hasOwn.call(attrs, privateName)) {
					attrs[privateName].set(value);
				}
			}
		}
	};

	module.exports = ElementProtoMixin;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(2);

	var ErrorLogger = _require.ErrorLogger;


	var queue = void 0;

	function run() {
		var track = queue;

		queue = null;

		for (var i = 0, l = track.length; i < l; i++) {
			try {
				track[i]();
			} catch (err) {
				ErrorLogger.log(err);
			}
		}
	}

	function defer(cb) {
		if (queue) {
			queue.push(cb);
		} else {
			queue = [cb];
			setTimeout(run, 1);
		}
	}

	module.exports = defer;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(2);

	var Cell = _require.Cell;

	var pathPattern = __webpack_require__(16);
	var compileString = __webpack_require__(17);

	var reBinding = RegExp('\\{\\s*(' + pathPattern + ')\\s*\\}', 'g');

	function bind(node, component, context) {
		if (!context) {
			context = component;
		}

		var bindings = [];

		function bind_(node) {
			var _loop = function _loop(child) {
				switch (child.nodeType) {
					case 1:
						{
							var attrs = child.attributes;

							for (var i = attrs.length; i;) {
								var attr = attrs.item(--i);
								var value = attr.value;
								var splitValue = value.split(reBinding);

								if (splitValue.length > 1) {
									(function () {
										var name = attr.name;
										var cell = new Cell(compileString(splitValue, value), {
											owner: context,
											onChange: function onChange(_ref) {
												var value = _ref.value;

												if (value === false || value == null) {
													child.removeAttribute(name);
												} else {
													child.setAttribute(name, value === true ? '' : value);
												}
											}
										});

										value = cell.get();

										if (value === false || value == null) {
											child.removeAttribute(name);
										} else {
											child.setAttribute(name, value === true ? '' : value);
										}

										bindings.push(cell);
									})();
								}
							}

							var childComponent = child.$c;

							if (childComponent) {
								childComponent.ownerComponent = component;
								childComponent._parentComponent = void 0;
								childComponent.props.context = context;
								childComponent._elementAttached.set(true);
							}

							if (child.firstChild && (!childComponent || childComponent.constructor.template == null)) {
								bind_(child);
							}

							break;
						}
					case 3:
						{
							var content = child.textContent;
							var splitContent = content.split(reBinding);

							if (splitContent.length > 1) {
								var _cell = new Cell(compileString(splitContent, content), {
									owner: context,
									onChange: function onChange(evt) {
										child.textContent = evt.value;
									}
								});

								child.textContent = _cell.get();

								bindings.push(_cell);
							}

							break;
						}
				}
			};

			for (var child = node.firstChild; child; child = child.nextSibling) {
				_loop(child);
			}
		}

		bind_(node);

		return bindings.length ? bindings : null;
	}

	module.exports = bind;

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	module.exports = '[$\\w]+(?:\\??\\.[$\\w]+)*';

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var pathToJSExpression = __webpack_require__(18);
	var compilePath = __webpack_require__(19);

	var reEscapableChars = /['\r\n]/g;
	var charToRegExpMap = Object.create(null);

	charToRegExpMap['\''] = '\\\'';
	charToRegExpMap['\r'] = '\\r';
	charToRegExpMap['\n'] = '\\n';

	var cache = Object.create(null);

	function compileString(splitString, str) {
		if (cache[str]) {
			return cache[str];
		}

		if (splitString.length == 3 && splitString[0] == '' && splitString[2] == '') {
			return cache[str] = compilePath(splitString[1]);
		}

		var tempVar = false;
		var jsExpr = Array(splitString.length);

		for (var i = 0, l = splitString.length; i < l; i++) {
			if (i % 2) {
				var pathJSExpr = pathToJSExpression(splitString[i]);

				if (pathJSExpr[1]) {
					tempVar = true;
				}

				jsExpr[i] = '\', ' + pathJSExpr[0] + ', \'';
			} else {
				jsExpr[i] = reEscapableChars.test(splitString[i]) ? splitString[i].replace(reEscapableChars, function (chr) {
					return charToRegExpMap[chr];
				}) : splitString[i];
			}
		}

		return cache[str] = Function((tempVar ? 'var temp; ' : '') + 'return [\'' + jsExpr.join('') + '\'].join(\'\');');
	}

	module.exports = compileString;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	var cache = Object.create(null);

	function pathToJSExpression(path) {
		if (cache[path]) {
			return cache[path];
		}

		path = path.split('?');

		var pathLength = path.length;

		if (pathLength == 1) {
			return ['this.' + path[0], false];
		}

		var index = pathLength - 2;
		var jsExpr = Array(index);

		while (index) {
			jsExpr[--index] = ' && (temp = temp' + path[index + 1] + ')';
		}

		return cache[path] = ['(temp = this.' + path[0] + ')' + jsExpr.join('') + ' && temp' + path[pathLength - 1], true];
	}

	module.exports = pathToJSExpression;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var pathToJSExpression = __webpack_require__(18);

	var cache = Object.create(null);

	function compilePath(path) {
		if (cache[path]) {
			return cache[path];
		}

		var pathJSExpr = pathToJSExpression(path);
		return cache[path] = Function((pathJSExpr[1] ? 'var temp; ' : '') + 'return ' + pathJSExpr[0] + ';');
	}

	module.exports = compilePath;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hyphenize = __webpack_require__(9);

	var hasOwn = Object.prototype.hasOwnProperty;

	function defineAssets(component, assetsConfig) {
		for (var name in assetsConfig) {
			if (hasOwn.call(assetsConfig, name) && name.charAt(0) != ':') {
				component[name] = component.$(assetsConfig[name].selector || '&__' + hyphenize(name));
			}
		}
	}

	module.exports = defineAssets;

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	var hasOwn = Object.prototype.hasOwnProperty;

	function listenAssets(component, assetsConfig) {
		for (var name in assetsConfig) {
			if (hasOwn.call(assetsConfig, name)) {
				var asset = void 0;

				if (name == ':component') {
					asset = component;
				} else if (name == ':element') {
					asset = component.element;
				} else {
					asset = component[name];

					if (!asset) {
						throw new TypeError('Asset "' + name + '" is not defined');
					}
				}

				var assetConfig = assetsConfig[name];

				for (var key in assetConfig) {
					if (hasOwn.call(assetConfig, key) && key.length > 3 && key.slice(0, 3) == 'on-') {
						component.listenTo(asset, key.slice(3), assetConfig[key]);
					}
				}
			}
		}
	}

	module.exports = listenAssets;

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	module.exports = ['click', 'dblclick', 'mousedown', 'mouseup', 'input', 'change', 'submit', 'focusin', 'focusout'];

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * @typesign (evt: cellx~Event|Event);
	 */
	function onEvent(evt) {
		var node = void 0;
		var attrName = void 0;
		var targets = [];

		if (evt instanceof Event) {
			node = evt.target;
			attrName = 'rt-' + evt.type;
		} else {
			node = evt.target.element;
			attrName = 'rt-component-' + evt.type;
		}

		for (;;) {
			if (node.nodeType == 1 && node.hasAttribute(attrName)) {
				targets.unshift(node);
			}

			node = node.parentNode;

			if (!node) {
				break;
			}

			var component = node.$c;

			if (component) {
				for (var i = targets.length; i;) {
					var target = targets[--i];
					var handler = component[target.getAttribute(attrName)];

					if (typeof handler == 'function') {
						handler.call(component, evt, target);
						targets.splice(i, 1);
					}
				}
			}
		}
	}

	module.exports = onEvent;

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	var range = document.createRange();
	var htmlToFragment = void 0;

	if (range.createContextualFragment) {
		(function () {
			var selected = false;

			htmlToFragment = function htmlToFragment(html) {
				if (!selected) {
					range.selectNode(document.body);
					selected = true;
				}

				return range.createContextualFragment(html);
			};
		})();
	} else {
		htmlToFragment = function htmlToFragment(html) {
			var el = document.createElement('div');
			var df = document.createDocumentFragment();

			el.innerHTML = html;

			for (var child; child = el.firstChild;) {
				df.appendChild(child);
			}

			return df;
		};
	}

	module.exports = htmlToFragment;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bind = __webpack_require__(15);
	var Component = __webpack_require__(10);

	module.exports = Component.extend('rt-content', {
		Static: {
			template: '',

			elementAttributes: {
				select: String
			}
		},

		_rawContent: void 0,

		_onElementAttachedChange: function _onElementAttachedChange(evt) {
			if (evt.value) {
				var ownerComponent = this.ownerComponent;
				var el = this.element;
				var props = this.props;

				if (this.isReady) {
					for (var child; child = el.firstChild;) {
						el.removeChild(child);
					}
				} else {
					var inputContent = props.content = document.createDocumentFragment();

					for (var _child; _child = el.firstChild;) {
						inputContent.appendChild(_child);
					}

					var ownerComponentInputContent = ownerComponent.props.content;
					var selectors = this.elementAttributes.select;

					if (selectors) {
						selectors = selectors.split('|');

						for (var i = 0, l = selectors.length; i < l; i++) {
							var selectedElements = ownerComponentInputContent.querySelectorAll(selectors[i]);
							var selectedElementCount = selectedElements.length;

							if (selectedElementCount) {
								var rawContent = this._rawContent = document.createDocumentFragment();

								for (var _i = 0; _i < selectedElementCount; _i++) {
									rawContent.appendChild(selectedElements[_i].cloneNode(true));
								}

								break;
							}
						}

						if (!this._rawContent) {
							this._rawContent = inputContent;
						}
					} else {
						this._rawContent = ownerComponentInputContent.firstChild ? ownerComponentInputContent : inputContent;
					}

					this.isReady = true;
				}

				var content = this._rawContent.cloneNode(true);

				this._bindings = this._rawContent == props.content ? bind(content, ownerComponent, props.context) : bind(content, ownerComponent.ownerComponent, ownerComponent.props.context);

				el.appendChild(content);
			} else {
				this._destroyBindings();
			}
		}
	});

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(2);

	var Cell = _require.Cell;

	var bind = __webpack_require__(15);
	var Component = __webpack_require__(10);
	var pathPattern = __webpack_require__(16);
	var compilePath = __webpack_require__(19);

	var slice = Array.prototype.slice;

	var rePath = RegExp('^\\s*(' + pathPattern + ')\\s*$');

	module.exports = Component.extend('rt-if-then', {
		Static: {
			elementExtends: 'template',

			elementAttributes: {
				if: String
			}
		},

		_if: null,

		_elseMode: false,

		_nodes: null,

		_onElementAttachedChange: function _onElementAttachedChange(evt) {
			var _this = this;

			if (evt.value) {
				if (!this.initialized) {
					(function () {
						var props = _this.props;

						props.content = document.importNode(_this.element.content, true);

						if (!rePath.test(props.if)) {
							throw new SyntaxError('Invalid value of attribute "if"');
						}

						var getState = compilePath(RegExp.$1);

						_this._if = new Cell(_this._elseMode ? function () {
							return !getState.call(this);
						} : function () {
							return !!getState.call(this);
						}, { owner: props.context });

						_this.initialized = true;
					})();
				}

				this._renderElement();

				this._if.on('change', this._onIfChange, this);
			} else {
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
			}
		},
		_onIfChange: function _onIfChange() {
			this._renderElement();
		},
		_renderElement: function _renderElement() {
			if (this._if.get()) {
				var content = this.props.content.cloneNode(true);

				this._nodes = slice.call(content.childNodes);

				this._bindings = bind(content, this.ownerComponent, this.props.context);
				this.element.parentNode.insertBefore(content, this.element.nextSibling);
			} else {
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

			this.emit('change');
		}
	});

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var RtIfThen = __webpack_require__(26);

	module.exports = RtIfThen.extend('rt-if-else', {
		Static: {
			elementExtends: 'template'
		},

		_elseMode: true
	});

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var _require = __webpack_require__(2);

	var Cell = _require.Cell;
	var Map = _require.js.Map;

	var bind = __webpack_require__(15);
	var Component = __webpack_require__(10);
	var namePattern = __webpack_require__(29);
	var pathPattern = __webpack_require__(16);
	var compilePath = __webpack_require__(19);

	var createObject = Object.create;
	var slice = Array.prototype.slice;

	var reForAttributeValue = RegExp('^\\s*(' + namePattern + ')\\s+of\\s+(' + pathPattern + ')\\s*$');

	module.exports = Component.extend('rt-repeat', {
		Static: {
			elementExtends: 'template',

			elementAttributes: {
				for: String,
				trackBy: String,
				strip: false
			}
		},

		_itemName: void 0,

		_list: null,

		_itemMap: null,
		_oldItemMap: null,

		_trackBy: void 0,

		_rawContent: null,

		_context: null,

		_lastNode: null,

		_onElementAttachedChange: function _onElementAttachedChange(evt) {
			if (evt.value) {
				if (!this.initialized) {
					var props = this.props;
					var rawContent = props.content = document.importNode(this.element.content, true);

					if (props.strip) {
						var firstChild = rawContent.firstChild;
						var lastChild = rawContent.lastChild;

						if (firstChild == lastChild) {
							if (firstChild.nodeType == 3) {
								firstChild.textContent = firstChild.textContent.trim();
							}
						} else {
							if (firstChild.nodeType == 3) {
								if (!(firstChild.textContent = firstChild.textContent.replace(/^\s+/, ''))) {
									rawContent.removeChild(firstChild);
								}
							}
							if (lastChild.nodeType == 3) {
								if (!(lastChild.textContent = lastChild.textContent.replace(/\s+$/, ''))) {
									rawContent.removeChild(lastChild);
								}
							}
						}
					}

					var forAttrValue = props.for.match(reForAttributeValue);

					if (!forAttrValue) {
						throw new SyntaxError('Invalid value of attribute "for"');
					}

					this._itemName = forAttrValue[1];

					this._list = new Cell(compilePath(forAttrValue[2]), { owner: props.context });

					this._itemMap = new Map();

					this._trackBy = props.trackBy;

					this._rawContent = rawContent;

					this._context = props.context;

					this.initialized = true;
				}

				this._renderElement();

				this._list.on('change', this._onListChange, this);
			} else {
				this._clearItemMap(this._itemMap);
				this._list.off('change', this._onListChange, this);
			}
		},
		_onListChange: function _onListChange() {
			this._renderElement();
		},
		_renderElement: function _renderElement() {
			var _this = this;

			var oldItemMap = this._oldItemMap = this._itemMap;
			this._itemMap = new Map();

			var list = this._list.get();
			var changed = void 0;

			if (list) {
				this._lastNode = this.element;
				changed = list.reduce(function (changed, item, index) {
					return _this._renderListItem(item, index) || changed;
				}, false);
			}

			if (oldItemMap.size) {
				this._clearItemMap(oldItemMap);
			} else if (!changed) {
				return;
			}

			this.emit('change');
		},
		_renderListItem: function _renderListItem(item, index) {
			var _createObject;

			var trackBy = this._trackBy;
			var trackingValue = trackBy ? trackBy == '$index' ? index : item[trackBy] : item;
			var prevItems = this._oldItemMap.get(trackingValue);
			var currentItems = this._itemMap.get(trackingValue);

			if (prevItems) {
				var prevItem = void 0;

				if (prevItems.length == 1) {
					prevItem = prevItems[0];
					this._oldItemMap.delete(trackingValue);
				} else {
					prevItem = prevItems.shift();
				}

				if (currentItems) {
					currentItems.push(prevItem);
				} else {
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
				} else {
					var df = document.createDocumentFragment();

					for (var i = 0, l = nodes.length; i < l; i++) {
						df.appendChild(nodes[i]);
					}

					var _lastNode = df.lastChild;
					this._lastNode.parentNode.insertBefore(df, this._lastNode.nextSibling);
					this._lastNode = _lastNode;
				}

				return true;
			}

			item = new Cell(item);
			index = new Cell(index);

			var content = this._rawContent.cloneNode(true);
			var context = createObject(this._context, (_createObject = {}, _defineProperty(_createObject, this._itemName, {
				get: function get() {
					return item.get();
				}
			}), _defineProperty(_createObject, '$index', {
				get: function get() {
					return index.get();
				}
			}), _createObject));

			var newItem = {
				item: item,
				index: index,
				nodes: slice.call(content.childNodes),
				bindings: bind(content, this.ownerComponent, context)
			};

			if (currentItems) {
				currentItems.push(newItem);
			} else {
				this._itemMap.set(trackingValue, [newItem]);
			}

			var lastNode = content.lastChild;
			this._lastNode.parentNode.insertBefore(content, this._lastNode.nextSibling);
			this._lastNode = lastNode;

			return true;
		},
		_clearItemMap: function _clearItemMap(itemMap) {
			itemMap.forEach(this._clearItems, this);
			itemMap.clear();
		},
		_clearItems: function _clearItems(items) {
			for (var i = items.length; i;) {
				var item = items[--i];
				var bindings = item.bindings;

				if (bindings) {
					for (var _i = bindings.length; _i;) {
						bindings[--_i].off();
					}
				}

				var nodes = item.nodes;

				for (var _i2 = nodes.length; _i2;) {
					var node = nodes[--_i2];
					var parentNode = node.parentNode;

					if (parentNode) {
						parentNode.removeChild(node);
					}
				}
			}
		}
	});

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';

	module.exports = '[$_a-zA-Z][$\\w]*';

/***/ }
/******/ ])
});
;