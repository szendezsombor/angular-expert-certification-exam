import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
    selector: '[appTemplate]',
})
export class TemplateDirective {

    @Input() type: string;

    @Input('appTemplate') name: string;

    constructor(public template: TemplateRef<any>) {
    }


    getType(): string {
        return this.name;
    }
}
