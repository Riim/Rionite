# rista

Простой фреймворк объединяющий в себе возможности [cellx](https://github.com/Riim/cellx)-а, [morphdom](https://github.com/patrick-steele-idem/morphdom)-а и [MutationObserver](https://developer.mozilla.org/ru/docs/Web/API/MutationObserver)-а.

## Установка

```
npm install rista --save
```

## TodoApp

Пример намеренно немного усложнён: [jsfiddle](http://jsfiddle.net/aw7j9mxk/).

## Принцип работы

Используя [MutationObserver](https://developer.mozilla.org/ru/docs/Web/API/MutationObserver) `rista` отслеживает появляющиеся в документе элементы с атрибутом `rt-view` и применяет к ним въюшки с заданными в значении атрибута именами.

### Пример

```html
<div rt-view="helloWorld">Hello, World!</div>

<script type="text/ecmascript-7">
    
rista.view('helloWorld', {
    init() {
        // Сработает при появлении элемента с `rt-view="helloWorld"` в документе.
        // `this.block` - ссылка на появившийся элемент.
    },

    dispose() {
        // Сработает при удалении элемента с `rt-view="helloWorld"` из документа.
    }
});

</script>
```

Если въюшка должна задавать собственное содержимое, можно определить метод `render`, который должен вернуть html-строку. Содержимое элемента будет заменено на результат его вызова. Далее `rista`, используя возможности [cellx](https://github.com/Riim/cellx)-а, начинает  отслеживать изменения всех используемых в методе `render` наблюдаемых свойств и при их изменении перерендеривает содержимое применяя изменения с помощью [morphdom](https://github.com/patrick-steele-idem/morphdom)-а.

### Пример

[jsfiddle](http://jsfiddle.net/s722vL27/)

```html
<div rt-view="userAge"></div>

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

rista.view('userAge', {
    // Собственное свойство въюшки, вычисляемое из свойства модели.
    @d.computed userAgeTwoYearsLater: function() {
        return appModel.userAgeYearLater + 1;
    },

    render() {
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

## preinit

Иногда нужно что бы въюшка не только определяла собственное содержимое, но и использовала переданное ей:

```html
<div rt-view="header">Title</div>

<script type="text/ecmascript-7">

rista.view('header', {
    render() {
        return `
            <img src="/logo.png">
            <div>${this.block.innerHTML}</div>
        `;
    }
});

</script>
```

Но использование `this.block.innerHTML` прямо в `render`-е будет приводить к постоянному лишнему обёртыванию при перерендеривании:

[jsfiddle](http://jsfiddle.net/2k1tL2jh/)

```html
<div rt-view="header2">Title</div>

<script type="text/ecmascript-7">

rista.view('header2', {
    @rista.d.observable counter: 0,

    render() {
        return `
            <img src="/logo.png">
            <div>${this.block.innerHTML}</div>
            <span>${this.counter}</span>
        `;
    },

    init() {
        setInterval(() => {
            this.counter++;
        }, 1000);
    }
});

</script>
```

`preinit` срабатывает один раз при инициализации компонента, но в отличии от `init` срабатывает перед `render`. Это позволяет запомнить исходное содержимое перед `render`-ом и использовать его в дальнейшем:

[jsfiddle](http://jsfiddle.net/daL2swe9/)

```html
<div rt-view="header3">Title</div>

<script type="text/ecmascript-7">

rista.view('header3', {
    @rista.d.observable counter: 0,

    title: undefined,

    preinit() {
        this.title = this.block.innerHTML;
    },

    render() {
        return `
            <img src="/logo.png">
            <div>${this.title}</div>
            <span>${this.counter}</span>
        `;
    },

    init() {
        setInterval(() => {
            this.counter++;
        }, 1000);
    }
});

</script>
```

## Обработка событий элементов

`rista` позволяет добавлять обработчики событий элементов в декларативном стиле:

[jsfiddle](http://jsfiddle.net/b6vsL1bx/)

```html
<div rt-view="eventExample"></div>

<script type="text/ecmascript-7">

rista.view('eventExample', {
    @rista.d.observable counter: 0,

    render() {
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

## Выбор элементов

В методах въюшки доступен метод `$` позволяющий сократить запись при выборе элементов. Запись `$(this.block).find('.elementName')` можно сократить до `this.$('.elementName')`. Кроме того, при использовании в вёрстке методологии БЭМ, вы можете использовать в селекторе символ `&`, который будет заменён на имя блока с разделителем между именем блока и именем элемента. Например, запись `$(this.block).find('.blockName__elementName')` можно сократить до `this.$('&elementName')`. Имя блока соответствует имени въюшки, но, при наличии в нём недопустимых символов, они удаляются с приведением в верхнему регистру последующего допустимого символа:

```html
<div rt-view="company.project.view"></div>

<script type="text/ecmascript-7">

rista.view('company.project.view', {
    init() {
        console.log(this.blockName); // 'companyProjectView'
    }
});

</script>
```

Можно вручную задать имя блока при определении въюшки:

```js
rista.view('company.project.view', {
    blockName: 'customBlockName',

    init() {
        console.log(this.blockName); // 'customBlockName'
    }
});
```

Можно задать разделитель между именем блока и именем элемента:
```js
rista.settings.blockElementDelimiter = '--';
```

Если недоступен `jQuery/Zepto/...`, то `$` вернёт [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList).

## Контроль памяти

### View#listenTo

Добавляет обработчик собития, который будет автоматически снят при очистке (`dispose`) въюшки.  
Следующие два примера равносильны:

```js
rt.view('example', {
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
rt.view('example', {
    init() {
        this.listenTo(document, 'scroll', this._onDocumentScroll);
    }
});
```

Целевым объектом может быть [EventTarget](https://developer.mozilla.org/en/docs/Web/API/EventTarget), `jQuery/Zepto/...`-коллекция или `cellx.EventEmitter` (в `rista` доступен как `rista.EventEmitter`).  
Можно передать объект, ключи которого будут типами событий, а значения - обработчиками:

```js
rt.view('exampleNoListenTo', {
    init() {
        this.listenTo(document, {
            mousedown: this._onDocumentMouseDown,
            mouseup: this._onDocumentMouseUp
        });
    }
});
```

Возвращает объект с методом `stop`, при вызове которого обработчик будет снят (если один `listenTo` добавил сразу несколько обработчиков, то `stop` снимет их все).

### View#setTimeout

Устанавливает таймер, который будет автоматически снят при очистке (`dispose`) въюшки (в случае если он ещё не отработал).  
Следующие два примера равносильны:

```js
rt.view('example', {
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
rt.view('example', {
    init() {
        this.setTimeout(this._onTimer, 10000);
    }
});
```

Возвращает объект с методом `clear`, при вызове которого таймер будет снят.

### View#setInterval

Аналогично с `View#setTimeout`.

### View#registerCallback

Аналогично с `View#listenTo` и `View#setTimeout` хотелось бы прерывать запрос при очистке въюшки создавшей его. Но есть ли смысл прерывать его с помощью [XMLHTTPRequest#abort](https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest#abort())? На самом деле нет. `abort` вовсе не "догоняет" уже отправленный запрос в сети и не остановливает его, он просто отменяет его обработку на клиенте, но полная отмена часто скорее вредна, например, вместо голого `XMLHttpRequest` используется умная обёртка, способная один и тот же запрос, отправленный двумя разными въюшками, отправить лишь один раз, или, при поддержке такой возможности сервером, сгрупировать несколько запросов в один (для этого запрос отправляется не мгновенно, а с небольшой задержкой, позволяющей накопить несколько запросов). Если, в таком случае, отменять запрос `abort`-ом, то очищающаяся въюшка будет отменять запросы для других въюшек, которые ещё работают. То есть, по сути, отменять нужно не сам запрос, а только лишь его обработчик - callback. Для этого обработчик пропускается через `View#registerCallback` который запоминает его в замыкании. Возвращённая `registerCallback`-ом функция запустит исходный callback (и вернёт результат его вызова) только в случае, если въюшка не быдет очищена до ответа.

#### Пример

```js
let BackendProvider = require('../../../Proxy/BackendProvider');

rt.view('userCard', {
    init() {
        BackendProvider.getUser(this.registerCallback((err, user) => {
            //
        }));
    }
});
```

## Передача сигналов между въюшками

Сложное взаимодействие между несколькими въюшками обычно делается через модель приложения, но простейшее взаимодействие, видящих друг-друга напрямую въюшек, обычно допустимо и удобнее делать без использования модели.

### View#emit

Создаёт всплывающее событие на въюшке, что позволяет отправить сигнал от въюшки-потомка к въюшкам-предкам.

#### Пример

[jsfiddle](http://jsfiddle.net/pxmwxe22/)

```js
<div rt-view="parent"></div>

<script type="text/ecmascript-7">

rista.view('parent', {
    render() {
        return `
            <div rt-view="child" data-id="1"></div>
            <div rt-view="child" data-id="2"></div>
        `;
    },

    init() {
        this.listenTo(this, 'foo', this._onFoo);
    },

    _onFoo(evt) {
        console.log(evt.childId);
    }
});

rista.view('child', {
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

### View#broadcast

Позволяет отправить сигнал от въюшки-предка к въюшкам-потомкам. Первый аргумент - имя вызываемого метода, остальные - передаваемые в метод аргументы. Если въюшка-потомок не содержит нужного метода, она пропускается.  
Возвращает массив результатов.

#### Пример

[jsfiddle](http://jsfiddle.net/a5ta2z6q/)

```js
<div rt-view="parent"></div>

<script type="text/ecmascript-7">

rista.view('parent', {
    render() {
        return `
            <div rt-view="child"></div>
            <div rt-view="child"></div>
        `;
    },

    init() {
        this.setInterval(() => {
            this.broadcast('method', Math.random());
        }, 1000);
    }
});

rista.view('child', {
    method(num) {
        console.log(num);
    }
});

</script>
```
