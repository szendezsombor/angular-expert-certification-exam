import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {CurrentConditionModel} from '../../models/current-condition.model';

@Injectable()
export class CurrentConditionStore {

    static CURRENT_CONDITION = 'CURRENT_CONDITION';

    _currentConditions$: BehaviorSubject<CurrentConditionModel[]> = new BehaviorSubject<CurrentConditionModel[]>([]);

    getCurrentConditions$ = (): Observable<CurrentConditionModel[]> => {
        return this._currentConditions$.asObservable();
    }

    addCurrentCondition$ = (condition: CurrentConditionModel): void => {
        const currentConditions: CurrentConditionModel[] = [condition, ...this._currentConditions$.getValue()]
        this.storeCurrentConditionsToLocalStorage(currentConditions);
        this._currentConditions$.next(currentConditions);
    }

    setCurrentConditions$ = (conditions: CurrentConditionModel[]): void => {
        this.storeCurrentConditionsToLocalStorage(conditions);
        this._currentConditions$.next(conditions);
    }

    removeCurrentCondition$ = (zipcode: string) => {
        const currentConditions = [...this._currentConditions$.getValue()];
        const currentCondition = currentConditions.find((condition: CurrentConditionModel) => condition.zipcode === zipcode);
        const index = currentConditions.indexOf(currentCondition);
        currentConditions.splice(index, 1);

        this.storeCurrentConditionsToLocalStorage(currentConditions);
        this._currentConditions$.next(currentConditions);
    }

    getCurrentConditionsFromLocalStorage(): string {
        return localStorage.getItem(CurrentConditionStore.CURRENT_CONDITION);
    }

    storeCurrentConditionsToLocalStorage(currentConditions: CurrentConditionModel[]) {
        localStorage.setItem(CurrentConditionStore.CURRENT_CONDITION, JSON.stringify(currentConditions.map((condition: CurrentConditionModel) => ({
            zipcode: condition.zipcode,
            country: condition.country
        }))));
    }

    findCurrentConditionCountryFromZipCode(zipcode: string): string {
        const data: Partial<CurrentConditionModel>[] = JSON.parse(this.getCurrentConditionsFromLocalStorage());
        return data.find((currentCondition: Partial<CurrentConditionModel>) => currentCondition.zipcode === zipcode)!.country;
    }
}
