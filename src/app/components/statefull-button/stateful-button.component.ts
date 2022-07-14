import {AfterContentInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef} from '@angular/core';
import {TemplateDirective} from '../../directives/template.directive';

@Component({
    selector: 'app-stateful-button',
    templateUrl: './stateful-button.component.html',
    styleUrls: ['./stateful-button.component.css']
})
export class StatefulButtonComponent implements AfterContentInit {
    @Input() status: 'default' | 'started' | 'done' = 'default';

    @Output() statefulButtonClick: EventEmitter<void> = new EventEmitter<void>();

    @ContentChildren(TemplateDirective) templates: QueryList<any>;

    defaultTemplate: TemplateRef<any>;

    startTemplate: TemplateRef<any>;

    finishedTemplate: TemplateRef<any>;

    ngAfterContentInit(): void {
        this.templates.forEach((template: TemplateDirective) => {
            switch (template.getType()) {
                case 'default':
                    this.defaultTemplate = template.template;
                case 'started':
                    this.startTemplate = template.template
                case 'done':
                    this.finishedTemplate = template.template;
            }
        })
    }

    onClick() {
        this.statefulButtonClick.emit();
    }
}
