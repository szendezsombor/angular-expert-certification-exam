import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, of, Subscription} from 'rxjs';
import {CurrentConditionModel} from '../../models/current-condition.model';
import {tap} from 'rxjs/operators';
import {CurrentConditionService} from '../../services/current-condition/current-condition.service';
import {WeatherService} from '../../services/weather/weather.service';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentConditionsComponent implements OnInit, OnDestroy {

  timerSub: Subscription;

  currentConditions$: Observable<CurrentConditionModel[]> = of([])

  constructor(private currentConditionService: CurrentConditionService, private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.currentConditions$ = this.currentConditionService.getCurrentConditions$();
    this.currentConditionService.getAllCurrentCondition().subscribe();
    this.timerSub = interval(30000).pipe(tap(() => this.currentConditionService.getAllCurrentCondition().subscribe())).subscribe();
  }

  ngOnDestroy(): void {
    this.timerSub.unsubscribe();
  }
}
