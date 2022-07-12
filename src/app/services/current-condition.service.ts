import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable} from 'rxjs';
import {CurrentConditionModel} from '../models/current-condition.model';
import {CurrentConditionDataModel} from '../models/current-condition-data.model';
import {map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {LOCATIONS} from '../location.service';

@Injectable({providedIn: 'root'})
export class CurrentConditionService {

    static URL = 'http://api.openweathermap.org/data/2.5';
    static APPID = '5a4b2d457ecbef9eb2a71e480b947604';

    _currentConditions$: BehaviorSubject<CurrentConditionModel[]> = new BehaviorSubject<CurrentConditionModel[]>([]);

    constructor(private http: HttpClient) {
    }

    getCurrentConditions$ = (): Observable<CurrentConditionModel[]> => {
        return this._currentConditions$.asObservable();
    }

    addCurrentCondition$ = (condition: CurrentConditionModel): void => {
        const currentConditions: CurrentConditionModel[] = [condition, ...this._currentConditions$.getValue()]
        this._currentConditions$.next(currentConditions);
        localStorage.setItem(LOCATIONS, JSON.stringify(currentConditions.map(( condition: CurrentConditionModel) => condition.zip)));
    }

    getAllCurrentCondition() {
        let locString = localStorage.getItem(LOCATIONS);
        if (locString) {
            const zipcodes: string[] = JSON.parse(locString) as string[];
            const requests: Observable<CurrentConditionModel>[] = zipcodes.map((zipcode: string) => {
                console.log(zipcode)
                return this.http.get<CurrentConditionDataModel>(`${CurrentConditionService.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${CurrentConditionService.APPID}`)
                    .pipe(map((currentConditionDataModel: CurrentConditionDataModel) => ({ zip: zipcode, data: currentConditionDataModel })))
            });

            forkJoin(requests).pipe(tap((currentConditions: CurrentConditionModel[]) => {
                this._currentConditions$.next([...currentConditions])
            })).subscribe();
        }

    }

    addCurrentCondition(zipcode: string): Observable<CurrentConditionModel> {
        return this.http.get<CurrentConditionDataModel>(`${CurrentConditionService.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${CurrentConditionService.APPID}`)
            .pipe(
                map((data: CurrentConditionDataModel) =>({ zip: zipcode, data: data })),
                tap((data: CurrentConditionModel) => this.addCurrentCondition$(data))
            );
    }
}
