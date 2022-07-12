import { Injectable } from '@angular/core';
import {WeatherService} from "./weather.service";
import {CurrentConditionService} from './services/current-condition.service';

export const LOCATIONS : string = "locations";

@Injectable()
export class LocationService {

  locations : string[] = [];

  constructor(private weatherService : WeatherService, private currentConditionService: CurrentConditionService) {
    // let locString = localStorage.getItem(LOCATIONS);
    // if (locString)
    //   this.locations = JSON.parse(locString);
    // for (let loc of this.locations) {
    //   this.currentConditionService.addCurrentCondition(loc);
    // }
  }

  addLocation(zipcode : string){
    this.locations.push(zipcode);
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    this.currentConditionService.addCurrentCondition(zipcode);
  }

  removeLocation(zipcode : string){
    let index = this.locations.indexOf(zipcode);
    if (index !== -1){
      this.locations.splice(index, 1);
      localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
      this.weatherService.removeCurrentConditions(zipcode);
    }
  }
}
