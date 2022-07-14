import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'appBoldPartPipe',
})
export class BoldPartPipe implements PipeTransform {
    transform(value: string, boldPart: string): any {
        return value.replace(new RegExp(boldPart, 'gi'), (match: string) => `<b>${match}</b>`)
    }
}
