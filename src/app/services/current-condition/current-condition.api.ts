import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CurrentConditionDataModel} from '../../models/current-condition-data.model';
import {CurrentConditionModel} from '../../models/current-condition.model';

@Injectable()
export class CurrentConditionApi {
    static URL = 'https://api.openweathermap.org/data/2.5';
    static APPID = '5a4b2d457ecbef9eb2a71e480b947604';

    constructor(private http: HttpClient) {
    }

    addCurrentCondition(zipcode: string, country: string): Observable<CurrentConditionDataModel> {
        return this.http.get<CurrentConditionDataModel>(`${CurrentConditionApi.URL}/weather?zip=${zipcode},${country}&units=imperial&APPID=${CurrentConditionApi.APPID}`)
    }

    getAllCurrentCondition(zipAndCountryCodes: Partial<CurrentConditionModel>[]): Observable<CurrentConditionModel[]> {
            const requests: Observable<CurrentConditionModel>[] = zipAndCountryCodes.map((zipAndCountryCode: Partial<CurrentConditionModel>) => {
                return this.http.get<CurrentConditionDataModel>(`${CurrentConditionApi.URL}/weather?zip=${zipAndCountryCode.zipcode},${zipAndCountryCode.country}&units=imperial&APPID=${CurrentConditionApi.APPID}`)
                    .pipe(map((currentConditionDataModel: CurrentConditionDataModel) => ({
                        zipcode: zipAndCountryCode.zipcode,
                        country: zipAndCountryCode.country,
                        data: currentConditionDataModel
                    })))
            });

            return forkJoin(requests);

    }
}
