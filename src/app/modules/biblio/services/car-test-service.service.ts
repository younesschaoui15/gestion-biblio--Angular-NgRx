import { Injectable } from '@angular/core';
import {Car} from '../models/CarTest';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarTestService {

  constructor(private http: HttpClient) { }

  getCarsSmall() {
    return this.http.get<any>('assets/data/cars-small.json')
      .toPromise()
      .then(res => res.data as Car[])
      .then(data => data);
  }

  getCarsMedium() {
    return this.http.get<any>('assets/data/cars-medium.json')
      .toPromise()
      .then(res => res.data as Car[])
      .then(data => data);
  }

  getCarsLarge() {
    return this.http.get<any>('assets/data/cars-large.json')
      .toPromise()
      .then(res => res.data as Car[])
      .then(data => data);
  }

  getCarsHuge() {
    return this.http.get<any>('assets/data/cars-huge.json')
      .toPromise()
      .then(res => res.data as Car[])
      .then(data => data);
  }
}
