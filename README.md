<p align="right">
    <a href="https://github.com/Riim/rista/blob/master/README.ru.md">Этот документ на русском</a>
</p>

# Rista

<p>
    <img src="https://raw.githubusercontent.com/Riim/rista/master/docs/images/logo.png" width="160.5" height="146">
</p>

A simple framework combining the functionality of [cellx](https://github.com/Riim/cellx), [morphdom](https://github.com/patrick-steele-idem/morphdom) and [MutationObserver](https://developer.mozilla.org/ru/docs/Web/API/MutationObserver).  
In general, we receive a lightweight (minify+gzip ~ 10kB) alternative to [ReactJS](https://facebook.github.io/react/), which is faster and does not require any code pretreatment (jsx).

## Installation

```
npm install rista --save
```

## Browser support

Rista supports IE9 and above and all modern browsers.

## TodoApp

[jsfiddle](http://jsfiddle.net/9sudert7/)

## Principle of operation

Using [MutationObserver](https://developer.mozilla.org/ru/docs/Web/API/MutationObserver) `Rista` monitors the elements appearing in the document with `rt-is` attribute and applies to them components with names specified in the attribute value.

### Example

```js
<div rt-is="hello-world">Hello, World!</div>

<script type="text/ecmascript-7">

rista.component('hello-world', {
    init() {
        // Triggers when the element with `rt-is="hello-world"` appears in the document.
        // `this.block` — a link to the element which has appeared.
    },

    dispose() {
        // Triggers when deleting the element with `rt-is="hello-world"` from the document.
    }
});

</script>
```

Instead of `rt-is` attribute, you can use the tag name:

```js
<hello-world>Hello, World!</hello-world>

<script type="text/ecmascript-7">

rista.component('hello-world', {/* ... */});

</script>
```

If a component needs to set its own content, you can determine the method `renderInner`, which should return the html-string. The element content will be replaced with the result of its call. Then, `Rista`, using functionality of [cellx](https://github.com/Riim/cellx), tracks changes in all the properties used in the method `renderInner` and when they change, it renders the contents applying changes using [morphdom](https://github.com/patrick-steele-idem/morphdom).

### Example

[jsfiddle](http://jsfiddle.net/yoLkuxtw/)

```js
<user-card></user-card>

<script type="text/ecmascript-7">

let d = rista.d;

// App model
let appModel = {
    // Observable property. Details in cellx-а description.
    @d.observable userAge: 0,

    // Computed property.
    @d.computed userAgeYearLater: function() {
        return this.userAge + 1;
    }
};

setInterval(() => {
    // every second the user will age one year
    appModel.userAge++;
}, 1000);

rista.component('user-card', {
    // Own property of the component is computed from properties of the model.
    @d.computed userAgeTwoYearsLater: function() {
        return appModel.userAgeYearLater + 1;
    },

    renderInner() {
        // write everything
        return `
            <div>${appModel.userAge}</div>
            <div>${appModel.userAgeYearLater}</div>
            <div>${this.userAgeTwoYearsLater}</div>
        `;
    }
});

</script>
```

## Element event processing

`Rista` allows you to add element event handlers in the declarative style:

[jsfiddle](http://jsfiddle.net/utvffa63/)

```js
<counter></counter>

<script type="text/ecmascript-7">

rista.component('counter', {
    @rista.d.observable counter: 0,

    renderInner() {
        return `
            <div>${this.counter}</div>
            <button rt-click="_onBtnClick">Click Me!</button>
        `;
    },

    _onBtnClick() {
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
    <div rt-bar="_onFooBar">
        <foo rt-baz="_onFooBaz"></foo>
        <foo></foo>
    </div>
`;
```

## Element selection

In the component methods there is `$` method, allowing to reduce the record when selecting elements. The record `$(this.block).find('.element-name')` can be reduced to `this.$('.element-name')`. Furthermore, when using BEM methodology in layout, you can use a symbol `&` in the selector, which will be replaced by the block selector. For example, here, the record `this.$('.block-name__element-name')` can be reduced to `this.$('&__element-name')`:

```js
<example></example>

<script type="text/ecmascript-7">

rista.component('example', {
    renderInner() {
        return `
            <input class="example__tf-search" type="text">
        `;
    },

    init() {
        this.$('&__tf-search').focus();
    }
});

</script>
```

If `jQuery/Zepto/...` unavailable, `$` will return [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList).

## Memory control

### Component#listenTo

This adds the event handler that will be automatically removed in cleaning (`dispose`) the component.  
The following two examples are equivalent:

```js
rista.component('example', {
    init() {
        this._onDocumentScroll = this._onDocumentScroll.bind(this);
        document.addEventListener('scroll', this._onDocumentScroll);
    },

    dispose() {
        document.removeEventListener('scroll', this._onDocumentScroll);
    }
});
```

```js
rista.component('example', {
    init() {
        this.listenTo(document, 'scroll', this._onDocumentScroll);
    }
});
```

The target can be [EventTarget](https://developer.mozilla.org/en/docs/Web/API/EventTarget), `jQuery/Zepto/...`-collection or `cellx.EventEmitter` (in `Rista` it is available as `rista.EventEmitter`).  
You can pass an object whose keys will be types of events, and values — handlers:

```js
this.listenTo(document, {
    mousedown: this._onDocumentMouseDown,
    mouseup: this._onDocumentMouseUp
});
```

This returns object with method `stop`, when calling which the handler will be removed (if one `listenTo` added several handlers at once, `stop` will remove all of them).

### Component#setTimeout

This sets a timer that will be automatically removed in cleaning (`dispose`) the component (if it has not worked out yet).  
The following two examples are equivalent:

```js
rista.component('example', {
    _timerId: undefined,

    init() {
        this._timerId = setTimeout(() => {
            this._timerId = undefined;
            this._onTimer();
        }, 10000);
    },

    dispose() {
        if (this._timerId) {
            clearTimeout(this._timerId);
        }
    }
});
```

```js
rista.component('example', {
    init() {
        this.setTimeout(this._onTimer, 10000);
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
let BackendProvider = require('../../../Proxy/BackendProvider');

rista.component('user-card', {
    init() {
        BackendProvider.getUser(this.registerCallback((err, user) => {
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
<div rt-is="parent"></div>

<script type="text/ecmascript-7">

rista.component('parent', {
    renderInner() {
        return `
            <div rt-is="child" data-id="1"></div>
            <div rt-is="child" data-id="2"></div>
        `;
    },

    init() {
        this.listenTo(this, 'foo', this._onFoo);
    },

    _onFoo(evt) {
        console.log(evt.childId);
    }
});

rista.component('child', {
    init() {
        this.setInterval(() => {
            this.emit({
                type: 'foo',
                childId: this.block.dataset.id
            });
        }, 1000);
    }
});

</script>
```

### Component#broadcast

This allows you to send the signal from the ancestor component to descendant component. The first argument is the name of the descendant components (specifies attribute `name`), second is the name of the called method, and the rest are arguments passed to the method. If the descendant component does not contain the desired method, it is skipped.  
It returns an array of results.

#### Example

[jsfiddle](http://jsfiddle.net/n7fv5k8s/)

```js
<div rt-is="parent"></div>

<script type="text/ecmascript-7">

rista.component('parent', {
    renderInner() {
        return `
            <div name="foo" rt-is="child"></div>
            <div name="foo" rt-is="child"></div>
        `;
    },

    init() {
        this.setInterval(() => {
            this.broadcast('foo', 'method', Math.random());
        }, 1000);
    }
});

rista.component('child', {
    method(num) {
        console.log(num);
    }
});

</script>
```

## Ready components

- [router](https://github.com/Riim/rista-router)
- [popup](https://github.com/Riim/rista-popup)
- [switcher](https://github.com/Riim/rista-switcher)
