import { Component } from '@angular/core';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    observable: any = of().pipe(delay(5000));

    constructor() {

    }
}
