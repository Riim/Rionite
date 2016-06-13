<p align="right">
    <a href="https://github.com/Riim/rista/blob/master/README.ru.md">Этот документ на русском</a>
</p>

# Rista

<p>
    <img src="https://raw.githubusercontent.com/Riim/rista/master/docs/images/logo.png" width="160.5" height="146">
</p>

A simple framework combining the functionality of [cellx](https://github.com/Riim/cellx), [morphdom](https://github.com/patrick-steele-idem/morphdom) and [Custom Elements](https://www.w3.org/TR/custom-elements/).  
In general, we receive a lightweight (minify+gzip ~ 10kB) alternative to [ReactJS](https://facebook.github.io/react/), which is faster and does not require any code pretreatment (jsx).

## Description partially outdated.

## Installation

```
npm install rista --save
```

## Browser support

Rista supports IE9 and above and all modern browsers.

## TodoApp

[jsfiddle](http://jsfiddle.net/9sudert7/)

## Principle of operation

Using [MutationObserver](https://developer.mozilla.org/ru/docs/Web/API/MutationObserver) `Rista` monitors the custom elements appearing in the document and applies to them components with names specified in the attribute value.

### Example

```js
<hello-world>Hello, World!</hello-world>

<script>

Rista.Component.extend('hello-world', {
    elementAttached: function() {
        // Triggers when the element `hello-world` appears in the document.
        // `this.element` — a link to the element which has appeared.
    },

    elementDetached: function() {
        // Triggers when deleting the element `hello-world` from the document.
    }
});

</script>
```

If a component needs to set its own content, you can determine the method `renderInner`, which should return the html-string. The element content will be replaced with the result of its call. Then, `Rista`, using functionality of [cellx](https://github.com/Riim/cellx), tracks changes in all the properties used in the method `renderInner` and when they change, it renders the contents applying changes using [morphdom](https://github.com/patrick-steele-idem/morphdom).

### Example

[jsfiddle](http://jsfiddle.net/yoLkuxtw/)

```js
<user-card></user-card>

<script>

var cellx = Rista.cellx;

// модель приложения
var appModel = cellx.define({}, {
    // Observable property. Details in cellx-а description.
    userAge: 0,

    // Computed property.
    userAgeYearLater: function() {
        return this.userAge + 1;
    }
});

setInterval(function() {
    // every second the user will age one year
    appModel.userAge++;
}, 1000);

Rista.Component.extend('user-card', {
    initialize: function() {
        cellx.define(this, {
            // Own property of the component is computed from properties of the model.
            userAgeTwoYearsLater: function() {
                return appModel.userAgeYearLater + 1;
            }
        });
    },

    renderInner: function() {
        // write everything
        return `
            <div>${ appModel.userAge }</div>
            <div>${ appModel.userAgeYearLater }</div>
            <div>${ this.userAgeTwoYearsLater }</div>
        `;
    }
});

</script>
```

## Element event processing

`Rista` allows you to add element event handlers in the declarative style:

[jsfiddle](http://jsfiddle.net/utvffa63/)

```js
<simple-counter></simple-counter>

<script>

Rista.Component.extend('simple-counter', {
	initialize: function() {
		Rista.cellx.define(this, 'counter', 0);
	},

	renderInner: function() {
		return `
			<div>${ this.counter }</div>
			<button rt-click="onBtnClick">Click Me!</button>
		`;
	},

	onBtnClick: function() {
		this.counter++;
	}
});

</script>
```

You can add event handlers to pop up events:

```js
return `
    <div rt-change="_onInputChange">
        <input type="checkbox">
        <input type="checkbox">
    </div>
`;
```

Including the event components:

```js
return `
    <div rt-component-bar="onFooBar">
        <x-foo rt-component-baz="onFooBaz"></x-foo>
        <x-foo></x-foo>
    </div>
`;
```

## Memory control

### Component#listenTo

This adds the event handler that will be automatically removed in cleaning (`dispose`) the component.  
The following two examples are equivalent:

```js
Rista.Component.extend('my-example', {
    elementAttached: function() {
        this.onDocumentScroll = this.onDocumentScroll.bind(this);
        document.addEventListener('scroll', this.onDocumentScroll);
    },

    elementDetached: function() {
        document.removeEventListener('scroll', this.onDocumentScroll);
    }
});
```

```js
Rista.Component.extend('my-example', {
    elementAttached: function() {
        this.listenTo(document, 'scroll', this.onDocumentScroll);
    }
});
```

The target can be [EventTarget](https://developer.mozilla.org/en/docs/Web/API/EventTarget), `jQuery/Zepto/...`-collection or `cellx.EventEmitter` (in `Rista` it is available as `rista.EventEmitter`).  
You can pass an object whose keys will be types of events, and values — handlers:

```js
this.listenTo(document, {
    mousedown: this.onDocumentMouseDown,
    mouseup: this.onDocumentMouseUp
});
```

This returns object with method `stop`, when calling which the handler will be removed (if one `listenTo` added several handlers at once, `stop` will remove all of them).

### Component#setTimeout

This sets a timer that will be automatically removed in cleaning (`dispose`) the component (if it has not worked out yet).  
The following two examples are equivalent:

```js
Rista.Component.extend('my-example', {
    _timerId: void 0,

    elementAttached: function() {
        this._timerId = setTimeout(() => {
            this._timerId = void 0;
            this.onTimer();
        }, 10000);
    },

    elementDetached: function() {
        if (this._timerId) {
            clearTimeout(this._timerId);
        }
    }
});
```

```js
Rista.Component.extend('my-example', {
    elementAttached: function() {
        this.setTimeout(this.onTimer, 10000);
    }
});
```

This returns the object with method `clear`, when calling which the timer will be cleaned.

### Component#setInterval

Similar to `Component#setTimeout`.

### Component#registerCallback

Similarly to `Component#listenTo` and `Component#setTimeout` I would like to interrupt the request when cleaning that has created it. But is there any sense to interrupt it using [XMLHTTPRequest#abort](https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest#abort())? Actually, no. `abort` does not "catch up" a request already sent in the network and does not stop it, it just cancels its processing on the client, but the complete cancelling is often more harmful, for example, instead of `XMLHttpRequest`, it is used a smart wrapper, which can send the same request, sent by two different components, only one time, or, if the server supports such a function, simply group multiple requests in a single one (to do this, the request is sent not instantaneously, but with a slight delay, allowing to save several requests). If, in this case, you cancel the request using `abort`, the component being cleaned will cancel the requests sent of other components that are still working. That is, in fact, there is no need to cancel the request itself, but only its handler — callback. To do this, the handler is passed through `Component#registerCallback` which saves it in the closure. The function returned by `registerCallback` will trigger the source callback (and will return the result of its call) only if the component is not be cleared until the response.

#### Example

```js
var BackendProvider = require('../../../Proxy/BackendProvider');

Rista.Component.extend('user-card', {
    elementAttached: function() {
        BackendProvider.getUser(this.registerCallback(function(err, user) {
            //
        }));
    }
});
```

## Signaling between components

The complex interaction between several components is usually done through the application model, but the simple interaction of components seeing each other directly is generally acceptable and more convenient to do without the use of the model.

### Component#emit

This creates a pop-up event on the component that allows you to send the signal from the descendant component to ancestor component. 

#### Example

[jsfiddle](http://jsfiddle.net/esb8cx6x/)

```js
<x-parent></x-parent>

<script>

Rista.Component.extend('x-parent', {
    renderInner: function() {
        return `
            <x-child data-id="1"></x-child>
            <x-child data-id="2"></x-child>
        `;
    },

    elementAttached: function() {
        this.listenTo(this, 'foo', this.onFoo);
    },

    onFoo: function(evt) {
        console.log(evt.childId);
    }
});

Rista.Component.extend('x-child', {
    elementAttached: function() {
        this.setInterval(function() {
            this.emit({
                type: 'foo',
                childId: this.element.dataset.id
            });
        }, 1000);
    }
});

</script>
```
