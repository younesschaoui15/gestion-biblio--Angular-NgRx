import {Component, OnInit} from '@angular/core';
import {from, interval, timer} from 'rxjs';
import {filter, map, switchMap, tap} from 'rxjs/operators';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  obs$ = from([
    {name: 'Joe', age: 10},
    {name: 'Frank', age: 20},
    {name: 'Ryan', age: 30}
  ]);

  constructor() {
  }

  ngOnInit() {
    this.obs$.subscribe(data => console.log('DATA', data));
    this.obs$.pipe(
      /*map(d => [d.name + 'x', d.age + 10]),*/
      map(d => {
        return {name: d.name + 'x', age: d.age + 10};
      }),
      filter(d => d.age >= 40),
      tap(d => console.log('TAP', d), () => console.log('Tap error'), () => console.log('Tap complete'))
    )
      .subscribe(res => console.log('RESULT', res));
  }

}
