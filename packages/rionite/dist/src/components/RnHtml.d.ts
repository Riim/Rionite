import { BaseComponent } from '../BaseComponent';
export declare class RnHtml extends BaseComponent {
    html: string;
    ready(): void;
    elementAttached(): void;
    _onHtmlChange(): void;
    _setHtml(): void;
}
