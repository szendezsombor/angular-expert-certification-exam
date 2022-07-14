import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {CurrentConditionService} from '../current-condition/current-condition.service';
import {tap} from 'rxjs/operators';
import {ForecastModel} from '../../models/forecast.model';

@Injectable()
export class ForecastService {

  static URL = 'https://api.openweathermap.org/data/2.5';
  static APPID = '5a4b2d457ecbef9eb2a71e480b947604';

  constructor(private http: HttpClient, private currentConditionService: CurrentConditionService) { }

  getForecast(zipcode: string): Observable<ForecastModel> {
    const country = this.currentConditionService.findCurrentConditionCountryFromZipCode(zipcode);
    return this.http.get<ForecastModel>(`${ForecastService.URL}/forecast/daily?zip=${zipcode},${country}&units=imperial&cnt=5&APPID=${ForecastService.APPID}`);
  }

}
