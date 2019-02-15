# Rionite

Реактивная обёртка над [custom-elements](https://www.w3.org/TR/custom-elements/).

## Установка

```
npm install cellx rionite --save
```

### Пример

```html
<hello-user name="Matroskin"></hello-user>

<script src="...">

import { BaseComponent, Component, Param } from 'rionite';

@Component({
    template: 'Hello, {paramName}!'
})
class HelloUser extends BaseComponent {
    @Param paramName: string;

    elementAttached() {
        // Сработает при появлении элемента `<hello-world>` в документе.
        // `this.element` — ссылка на появившийся элемент.
        // Отличное место для добавления обработчиков событий.
    },

    elementDetached() {
        // Сработает при удалении элемента `<hello-world>` из документа.
        // Не забыть снять добавленные обработчики событий.
    }
}

</script>
```

Можно использовать ES.Next синтаксис:

Элемент в приведённом примере отрендерится в следующий вид:
```html
<hello-user name="Matroskin" class="HelloUser">Hello, Matroskin!</hello-user>
```

Имя компонента добавляется в css-класс элемента, это необходимо для наследования стилей — имя тега элемента у наследуемого компонента будет другим, но оба имени добавятся в css-класс элемента:
```html
<hello-super-user name="Matroskin" class="HelloUser HelloSuperUser">Hello, Matroskin!</hello-super-user>
```
Таким образом стили элемента родительского компонента применятся и к элементу наследуемого компонента. В дальнейшем можно доопределить их:
```css
.HelloSuperUser {
    color: red;

    & .HelloUser__someInnerElement {
        font-width: bold;
    }
}
```

Стили элемента лучше назначать на css-класс элемента. На тег элемента обычно назначаются стили которые должны применяться к нему пока он не отрендерился, например, для скрытия передаваемого содержимого:
```html
<style>
super-select {
    display: none;
}

.SuperSelect {
    display: inline-block;
}
</style>

<super-select>
    <super-select-option>1</super-select-option>
    <super-select-option>2</super-select-option>
    <super-select-option>3</super-select-option>
</super-select>
```

Конструкции вида `{name}` — это привязки данных — биндинги. Они будут автоматически обновляться в разметке при изменении соответствующих свойств. Сами свойства для этого должно быть реактивным и создаваться с помощью [cellx](https://github.com/Riim/cellx)-а:
```html
<simple-counter></simple-counter>

<script src="...">

import { Observable } from 'cellx-decorators';
import { BaseComponent, Component } from 'rionite';

@Component({
    template: `
        div {
            'value: {value}'
        }

        button (on-click=_onButtonClick) {
            'value++'
        }
    `
})
class SimpleCounter extends BaseComponent {
    @Observable value = 0;

    _onButtonClick() {
        this.value++;
    }
}

</script>
```

Для управления потоком в шаблоне используются компоненты `RnIfThen`, `RnIfElse` и `RnRepeat`.

TODO:
- formatters
- больше про `RnIfThen`, `RnIfElse` и `RnRepeat`
- callbacks и `movedElement`
- удаление атрибута биндингом
- component vs element

## Benchmarks

[js-repaint-perfs](http://mathieuancelin.github.io/js-repaint-perfs/)
