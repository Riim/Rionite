# Rista

<p>
    <img src="https://raw.githubusercontent.com/Riim/rista/master/docs/images/logo.png" width="160.5" height="146">
</p>

Простой фреймворк объединяющий в себе возможности [cellx](https://github.com/Riim/cellx)-а, [morphdom](https://github.com/patrick-steele-idem/morphdom)-а и [MutationObserver](https://developer.mozilla.org/ru/docs/Web/API/MutationObserver)-а.  
В целом, по возможностям получается легковесная (minify+gzip ~ 10kB) альтернатива [ReactJS](https://facebook.github.io/react/)-у, более быстрая и не требующая какой-то предварительной обработки кода (jsx).

## Установка

```
npm install rista --save
```

## Поддержка браузеров

Все актуальные, IE9+.

## TodoApp

[jsfiddle](http://jsfiddle.net/9sudert7/)

## Принцип работы

Используя [MutationObserver](https://developer.mozilla.org/ru/docs/Web/API/MutationObserver) `Rista` отслеживает появляющиеся в документе элементы с атрибутом `rt-is` и применяет к ним компоненты с заданными в значении атрибута именами.

### Пример

```js
<div rt-is="hello-world">Hello, World!</div>

<script type="text/ecmascript-7">

rista.component('hello-world', {
    init() {
        // Сработает при появлении элемента с `rt-is="hello-world"` в документе.
        // `this.block` — ссылка на появившийся элемент.
    },

    dispose() {
        // Сработает при удалении элемента с `rt-is="hello-world"` из документа.
    }
});

</script>
```

Вместо атрибута `rt-is` можно использовать имя тега:

```js
<hello-world>Hello, World!</hello-world>

<script type="text/ecmascript-7">

rista.component('hello-world', {/* ... */});

</script>
```

Если компонент должен задавать собственное содержимое, можно определить метод `renderInner`, который должен вернуть html-строку. Содержимое элемента будет заменено на результат его вызова. Далее `Rista`, используя возможности [cellx](https://github.com/Riim/cellx)-а, отслеживает изменения всех используемых в методе `renderInner` наблюдаемых свойств и при их изменении перерендеривает содержимое применяя изменения с помощью [morphdom](https://github.com/patrick-steele-idem/morphdom)-а.

### Пример

[jsfiddle](http://jsfiddle.net/yoLkuxtw/)

```js
<user-card></user-card>

<script type="text/ecmascript-7">

let d = rista.d;

// модель приложения
let appModel = {
    // Наблюдаемое свойство. Подробности в описании cellx-а.
    @d.observable userAge: 0,

    // Вычисляемое свойство.
    @d.computed userAgeYearLater: function() {
        return this.userAge + 1;
    }
};

setInterval(() => {
    // каждую секунду юзер будет стареть на год
    appModel.userAge++;
}, 1000);

rista.component('user-card', {
    // Собственное свойство компонента, вычисляемое из свойства модели.
    @d.computed userAgeTwoYearsLater: function() {
        return appModel.userAgeYearLater + 1;
    },

    renderInner() {
        // выводим всё
        return `
            <div>${appModel.userAge}</div>
            <div>${appModel.userAgeYearLater}</div>
            <div>${this.userAgeTwoYearsLater}</div>
        `;
    }
});

</script>
```

## Обработка событий элементов

`Rista` позволяет добавлять обработчики событий элементов в декларативном стиле:

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

Можно добавлять обработчики на всплывающие события:

```js
return `
    <div rt-change="_onInputChange">
        <input type="checkbox">
        <input type="checkbox">
    </div>
`;
```

В том числе на события компонентов:

```js
return `
    <div rt-bar="_onFooBar">
        <foo rt-baz="_onFooBaz"></foo>
        <foo></foo>
    </div>
`;
```

## Выбор элементов

В методах компонента доступен метод `$` позволяющий сократить запись при выборе элементов. Запись `$(this.block).find('.elementName')` можно сократить до `this.$('.elementName')`. Кроме того, при использовании в вёрстке методологии БЭМ, вы можете использовать в селекторе символ `&`, который будет заменён на селектор блока. Например, запись `this.$('.blockName__elementName')` можно сократить до `this.$('&__elementName')`:

```js
<example></example>

<script type="text/ecmascript-7">

rista.component('example', {
    renderInner() {
        return `
            <input class="example__tfSearch" type="text">
        `;
    },

    init() {
        this.$('&__tfSearch').focus();
    }
});

</script>
```

Если недоступен `jQuery/Zepto/...`, то `$` вернёт [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList).

## Контроль памяти

### Component#listenTo

Добавляет обработчик собития, который будет автоматически снят при очистке (`dispose`) компонента.  
Следующие два примера равносильны:

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

Целевым объектом может быть [EventTarget](https://developer.mozilla.org/en/docs/Web/API/EventTarget), `jQuery/Zepto/...`-коллекция или `cellx.EventEmitter` (в `Rista` доступен как `rista.EventEmitter`).  
Можно передать объект, ключи которого будут типами событий, а значения — обработчиками:

```js
this.listenTo(document, {
    mousedown: this._onDocumentMouseDown,
    mouseup: this._onDocumentMouseUp
});
```

Возвращает объект с методом `stop`, при вызове которого обработчик будет снят (если один `listenTo` добавил сразу несколько обработчиков, то `stop` снимет их все).

### Component#setTimeout

Устанавливает таймер, который будет автоматически снят при очистке (`dispose`) компонента (в случае если он ещё не отработал).  
Следующие два примера равносильны:

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

Возвращает объект с методом `clear`, при вызове которого таймер будет снят.

### Component#setInterval

Аналогично с `Component#setTimeout`.

### Component#registerCallback

Аналогично с `Component#listenTo` и `Component#setTimeout` хотелось бы прерывать запрос при очистке компонента создавшего его. Но есть ли смысл прерывать его с помощью [XMLHTTPRequest#abort](https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest#abort())? На самом деле нет. `abort` вовсе не "догоняет" уже отправленный запрос в сети и не остановливает его, он просто отменяет его обработку на клиенте, но полная отмена часто скорее вредна, например, вместо голого `XMLHttpRequest` используется умная обёртка, способная один и тот же запрос, отправленный двумя разными компонентами, отправить лишь один раз, или, при поддержке такой возможности сервером, сгрупировать несколько запросов в один (для этого запрос отправляется не мгновенно, а с небольшой задержкой, позволяющей накопить несколько запросов). Если, в таком случае, отменять запрос `abort`-ом, то очищающийся компонент будет отменять запросы отправленные другими компонентами, которые ещё работают. То есть, по сути, отменять нужно не сам запрос, а только лишь его обработчик — callback. Для этого обработчик пропускается через `Component#registerCallback` который запоминает его в замыкании. Возвращённая `registerCallback`-ом функция запустит исходный callback (и вернёт результат его вызова) только в случае, если компонент не будет очищен до ответа.

#### Пример

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

## Передача сигналов между компонентами

Сложное взаимодействие между несколькими компонентами обычно делается через модель приложения, но простейшее взаимодействие, видящих друг-друга напрямую компонентов, обычно допустимо и удобнее делать без использования модели.

### Component#emit

Создаёт всплывающее событие на компоненте, что позволяет отправить сигнал от компонента-потомка к компонентам-предкам.

#### Пример

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

Позволяет отправить сигнал от компонента-предка к компонентам-потомкам. Первый аргумент — имя компонентов-потомков (задаётся атрибутом `name` элементов), второй — имя вызываемого метода, остальные — передаваемые в метод аргументы. Если компонент-потомок не содержит нужного метода, он пропускается.  
Возвращает массив результатов.

#### Пример

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

## Готовые компоненты

- [router](https://github.com/Riim/rista-router)
- [popup](https://github.com/Riim/rista-popup)
- [switcher](https://github.com/Riim/rista-switcher)
