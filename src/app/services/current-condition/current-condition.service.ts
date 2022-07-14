import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {CurrentConditionStore} from './current-condition.store';
import {CurrentConditionApi} from './current-condition.api';
import {CurrentConditionModel} from '../../models/current-condition.model';
import {CurrentConditionDataModel} from '../../models/current-condition-data.model';

@Injectable()
export class CurrentConditionService {

    constructor(private currentConditionStore: CurrentConditionStore, private currentConditionApi: CurrentConditionApi) {
    }

    getCurrentConditions$ = (): Observable<CurrentConditionModel[]> => {
        return this.currentConditionStore.getCurrentConditions$();
    }

    getAllCurrentCondition(): Observable<CurrentConditionModel[]> {
        const currentConditions: string = this.currentConditionStore.getCurrentConditionsFromLocalStorage();

        if (currentConditions) {
            const zipAndCountryCodes: Partial<CurrentConditionModel>[] = JSON.parse(currentConditions) as Partial<CurrentConditionModel>[];
            if (zipAndCountryCodes.length > 0) {
                return this.currentConditionApi.getAllCurrentCondition(zipAndCountryCodes).pipe(tap(this.currentConditionStore.setCurrentConditions$));
            }
        }
        return of();

    }

    addCurrentCondition(zipcode: string, country: string): Observable<CurrentConditionModel> {
        return this.currentConditionApi.addCurrentCondition(zipcode, country)
            .pipe(
                map((data: CurrentConditionDataModel) => ({zipcode: zipcode, country: country, data: data})),
                tap(this.currentConditionStore.addCurrentCondition$)
            );
    }

    removeCurrentCondition(zipcode: string) {
        this.currentConditionStore.removeCurrentCondition$(zipcode);
    }

    findCurrentConditionCountryFromZipCode(zipcode: string): string {
        return this.currentConditionStore.findCurrentConditionCountryFromZipCode(zipcode);
    }
}
