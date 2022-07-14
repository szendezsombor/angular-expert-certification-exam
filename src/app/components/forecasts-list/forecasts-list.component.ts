import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WeatherService} from '../../services/weather/weather.service';
import {ForecastService} from '../../services/forecast/forecast.service';
import {ForecastModel} from '../../models/forecast.model';
import {CurrentConditionService} from '../../services/current-condition/current-condition.service';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent {
  zipcode: string;
  forecast: ForecastModel;

  constructor(private currentConditionService: CurrentConditionService, private forecastService: ForecastService, private weatherService: WeatherService,private route: ActivatedRoute) {
    this.currentConditionService.getAllCurrentCondition();
    route.params.subscribe(params => {
      this.zipcode = params['zipcode'];
      this.forecastService.getForecast(this.zipcode)
        .subscribe(data => this.forecast = data);
    });
  }
}
