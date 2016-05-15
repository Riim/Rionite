# Rista

<p>
    <img src="https://raw.githubusercontent.com/Riim/rista/master/docs/images/logo.png" width="160.5" height="146">
</p>

Простой фреймворк объединяющий в себе возможности [cellx](https://github.com/Riim/cellx)-а, [morphdom](https://github.com/patrick-steele-idem/morphdom)-а и [Custom Elements](https://www.w3.org/TR/custom-elements/).  
В целом, по возможностям получается легковесная (minify+gzip ~ 10kB) альтернатива [ReactJS](https://facebook.github.io/react/)-у, более быстрая и не требующая какой-то предварительной обработки кода (jsx).

## Описание частично устарело.

## Установка

```
npm install rista --save
```

## Поддержка браузеров

Все актуальные, IE9+.

## TodoApp

[jsfiddle](http://jsfiddle.net/9sudert7/)

## Принцип работы

Используя [MutationObserver](https://developer.mozilla.org/ru/docs/Web/API/MutationObserver) `Rista` отслеживает появляющиеся в документе кастомные элементы и применяет к ним компоненты с заданными в значении атрибута именами.

### Пример

```js
<hello-world>Hello, World!</hello-world>

<script>

Rista.Component.extend('hello-world', {
    onElementAttached: function() {
        // Сработает при появлении элемента с `rt-is="hello-world"` в документе.
        // `this.element` — ссылка на появившийся элемент.
    },

    onElementDetached: function() {
        // Сработает при удалении элемента с `rt-is="hello-world"` из документа.
    }
});

</script>
```

Если компонент должен задавать собственное содержимое, можно определить метод `renderInner`, который должен вернуть html-строку. Содержимое элемента будет заменено на результат его вызова. Далее `Rista`, используя возможности [cellx](https://github.com/Riim/cellx)-а, отслеживает изменения всех используемых в методе `renderInner` наблюдаемых свойств и при их изменении перерендеривает содержимое применяя изменения с помощью [morphdom](https://github.com/patrick-steele-idem/morphdom)-а.

### Пример

[jsfiddle](http://jsfiddle.net/yoLkuxtw/)

```js
<user-card></user-card>

<script>

var cellx = Rista.cellx;

// модель приложения
var appModel = cellx.define({}, {
    // Наблюдаемое свойство. Подробности в описании cellx-а.
    userAge: 0,

    // Вычисляемое свойство.
    userAgeYearLater: function() {
        return this.userAge + 1;
    }
});

setInterval(function() {
    // каждую секунду юзер будет стареть на год
    appModel.userAge++;
}, 1000);

Rista.Component.extend('user-card', {
    constructor: function() {
        Rista.Component.call(this);
        
        cellx.define(this, {
            // Собственное свойство компонента, вычисляемое из свойства модели.
            userAgeTwoYearsLater: function() {
                return appModel.userAgeYearLater + 1;
            }
        });
    },

    renderInner: function() {
        // выводим всё
        return `
            <div>${ appModel.userAge }</div>
            <div>${ appModel.userAgeYearLater }</div>
            <div>${ this.userAgeTwoYearsLater }</div>
        `;
    }
});

</script>
```

## Обработка событий элементов

`Rista` позволяет добавлять обработчики событий элементов в декларативном стиле:

[jsfiddle](http://jsfiddle.net/utvffa63/)

```js
<simple-counter></simple-counter>

<script>

Rista.Component.extend('simple-counter', {
	constructor: function() {
		Rista.Component.call(this);
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

Можно добавлять обработчики на всплывающие события:

```js
return `
    <div rt-change="onInputChange">
        <input type="checkbox">
        <input type="checkbox">
    </div>
`;
```

В том числе на события компонентов:

```js
return `
    <div rt-bar="onFooBar">
        <x-foo rt-baz="onFooBaz"></x-foo>
        <x-foo></x-foo>
    </div>
`;
```

## Контроль памяти

### Component#listenTo

Добавляет обработчик собития, который будет автоматически снят при очистке (`dispose`) компонента.  
Следующие два примера равносильны:

```js
Rista.Component.extend('my-example', {
    onElementAttached: function() {
        this.onDocumentScroll = this.onDocumentScroll.bind(this);
        document.addEventListener('scroll', this.onDocumentScroll);
    },

    onElementDetached: function() {
        document.removeEventListener('scroll', this.onDocumentScroll);
    }
});
```

```js
Rista.Component.extend('my-example', {
    onElementAttached: function() {
        this.listenTo(document, 'scroll', this.onDocumentScroll);
    }
});
```

Целевым объектом может быть [EventTarget](https://developer.mozilla.org/en/docs/Web/API/EventTarget), `jQuery/Zepto/...`-коллекция или `cellx.EventEmitter` (в `Rista` доступен как `rista.EventEmitter`).  
Можно передать объект, ключи которого будут типами событий, а значения — обработчиками:

```js
this.listenTo(document, {
    mousedown: this.onDocumentMouseDown,
    mouseup: this.onDocumentMouseUp
});
```

Возвращает объект с методом `stop`, при вызове которого обработчик будет снят (если один `listenTo` добавил сразу несколько обработчиков, то `stop` снимет их все).

### Component#setTimeout

Устанавливает таймер, который будет автоматически снят при очистке (`dispose`) компонента (в случае если он ещё не отработал).  
Следующие два примера равносильны:

```js
Rista.Component.extend('my-example', {
    _timerId: void 0,

    onElementAttached: function() {
        this._timerId = setTimeout(() => {
            this._timerId = void 0;
            this.onTimer();
        }, 10000);
    },

    onElementDetached: function() {
        if (this._timerId) {
            clearTimeout(this._timerId);
        }
    }
});
```

```js
Rista.Component.extend('my-example', {
    onElementAttached: function() {
        this.setTimeout(this.onTimer, 10000);
    }
});
```

Возвращает объект с методом `clear`, при вызове которого таймер будет снят.

### Component#setInterval

Аналогично с `Component#setTimeout`.

### Component#registerCallback

Аналогично с `Component#listenTo` и `Component#setTimeout` хотелось бы прерывать запрос при очистке компонента создавшего его. Но есть ли смысл прерывать его с помощью [XMLHTTPRequest#abort](https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest#abort())? На самом деле нет. `abort` вовсе не "догоняет" уже отправленный запрос в сети и не остановливает его, он просто отменяет его обработку на клиенте, но полная отмена часто скорее вредна, например, вместо голого `XMLHttpRequest` используется умная обёртка, способная один и тот же запрос, отправленный двумя разными компонентами, отправить лишь один раз, или, при поддержке такой возможности сервером, сгрупировать несколько запросов в один (для этого запрос отправляется не мгновенно, а с небольшой задержкой, позволяющей накопить несколько запросов). Если, в таком случае, отменять запрос `abort`-ом, то очищающийся компонент будет отменять запросы отправленные другими компонентами, которые ещё работают. То есть, по сути, отменять нужно не сам запрос, а только лишь его обработчик — callback. Для этого обработчик пропускается через `Component#registerCallback` который запоминает его в замыкании. Возвращённая `registerCallback`-ом функция запустит исходный callback (и вернёт результат его вызова) только в случае, если компонент не будет очищен до ответа.

#### Пример

```js
var BackendProvider = require('../../../Proxy/BackendProvider');

Rista.Component.extend('user-card', {
    onElementAttached: function() {
        BackendProvider.getUser(this.registerCallback(function(err, user) {
            //
        }));
    }
});
```

## Передача сигналов между компонентами

Сложное взаимодействие между несколькими компонентами обычно делается через модель приложения, но простейшее взаимодействие, видящих друг-друга напрямую компонентов, обычно допустимо и удобнее делать без использования модели.

### Component#emit

Создаёт всплывающее событие на компоненте, что позволяет отправить сигнал от компонента-потомка к компонентам-предкам.

#### Пример

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

    onElementAttached: function() {
        this.listenTo(this, 'foo', this.onFoo);
    },

    onFoo: function(evt) {
        console.log(evt.childId);
    }
});

Rista.Component.extend('x-child', {
    onElementAttached: function() {
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
