import {Component} from '@angular/core';
import {finalize, tap} from 'rxjs/operators';
import {CurrentConditionService} from '../../services/current-condition/current-condition.service';

@Component({
    selector: 'app-zipcode-entry',
    templateUrl: './zipcode-entry.component.html'
})
export class ZipcodeEntryComponent {
    status: 'default' | 'started' | 'done' = 'default';
    countryCode = 'us';

    constructor(private currentConditionService: CurrentConditionService) {
    }

    addLocation(zipcode: string) {
        this.status = 'started';
        this.currentConditionService.addCurrentCondition(zipcode, this.countryCode).pipe(
            tap(() => {
                this.status = 'done'
            }),
            finalize(() => setTimeout(() => this.status = 'default', 500))
        ).subscribe();
    }

    onCountryCodeUpdate(countryCode: string) {
        this.countryCode = countryCode;
    }
}
