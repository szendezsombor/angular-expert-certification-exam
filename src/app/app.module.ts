import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {routing} from "./app.routing";
import {HttpClientModule} from "@angular/common/http";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {StatefulButtonComponent} from './components/statefull-button/stateful-button.component';
import {TemplateDirective} from './directives/template.directive';
import {CountrySearchComponent} from './components/country-search/country-search.component';
import {BoldPartPipe} from './pipes/bold-part.pipe';
import {ForecastService} from './services/forecast/forecast.service';
import {CurrentConditionApi} from './services/current-condition/current-condition.api';
import {CurrentConditionService} from './services/current-condition/current-condition.service';
import {CurrentConditionStore} from './services/current-condition/current-condition.store';
import {ZipcodeEntryComponent} from './components/zipcode-entry/zipcode-entry.component';
import {ForecastsListComponent} from './components/forecasts-list/forecasts-list.component';
import {CurrentConditionsComponent} from './components/current-conditions/current-conditions.component';
import {MainPageComponent} from './components/main-page/main-page.component';

@NgModule({
    declarations: [
        AppComponent,
        CountrySearchComponent,
        BoldPartPipe,
        ZipcodeEntryComponent,
        ForecastsListComponent,
        CurrentConditionsComponent,
        MainPageComponent,
        StatefulButtonComponent,
        TemplateDirective
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    routing,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [CurrentConditionApi, CurrentConditionService, CurrentConditionStore, ForecastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
