import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from '../weather.service';
import {LocationService} from '../location.service';
import {Router} from '@angular/router';
import {interval, Observable, of, Subscription} from 'rxjs';
import {CurrentConditionModel} from '../models/current-condition.model';
import {CurrentConditionService} from '../services/current-condition.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentConditionsComponent implements OnInit, OnDestroy {

  timerSub: Subscription;

  currentConditions$: Observable<CurrentConditionModel[]> = of([])

  constructor(private currentConditionService: CurrentConditionService, private weatherService: WeatherService, private router : Router) {
  }

  ngOnInit(): void {
    this.currentConditions$ = this.currentConditionService.getCurrentConditions$();
    this.currentConditionService.getAllCurrentCondition();
    this.timerSub = interval(30000).pipe(tap(() => this.currentConditionService.getAllCurrentCondition())).subscribe();
  }

  showForecast(zipcode : string){
    this.router.navigate(['/forecast', zipcode])
  }

  ngOnDestroy(): void {
    this.timerSub.unsubscribe();
  }


}
