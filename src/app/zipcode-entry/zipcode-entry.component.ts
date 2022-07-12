import {Component} from '@angular/core';
import {LocationService} from '../location.service';
import {CurrentConditionService} from '../services/current-condition.service';
import {catchError, delay, finalize, tap} from 'rxjs/operators';

@Component({
    selector: 'app-zipcode-entry',
    templateUrl: './zipcode-entry.component.html'
})
export class ZipcodeEntryComponent {

    status: 'default' | 'started' | 'done' = 'default';

    constructor(private currentConditionService: CurrentConditionService) {
    }

    addLocation(zipcode: string) {
        this.status = 'started';
        this.currentConditionService.addCurrentCondition(zipcode).pipe(
            tap(() => {
                this.status = 'done'
            }),
            finalize(() => setTimeout(() => this.status = 'default', 500))
        ).subscribe();
    }

}
