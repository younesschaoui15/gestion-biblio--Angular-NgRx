import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {LazyLoadEvent} from 'primeng/api';
import {Livre} from '../../models/livre';
import {CarTestService} from '../../services/car-test-service.service';
import {Car} from '../../models/CarTest';

@Component({
  selector: 'app-livres-table',
  templateUrl: './livres-table.component.html',
  styleUrls: ['./livres-table.component.css']
})

export class LivresTableComponent implements OnInit {

  @Input() livres$: Observable<Livre[]>;
  virtualCars: Car[];
  loading: boolean;
  totalRecords = 5000;
  cols = [
    {field: 'vin', header: 'Vin'},
    {field: 'brand', header: 'Brand'},
    {field: 'year', header: 'Year'},
    {field: 'price', header: 'Price'},
    {field: 'color', header: 'Color'}
  ];

  constructor(private carService: CarTestService) {
  }

  ngOnInit() {
    this.loading = true;
  }

  loadDataOnScroll(event: LazyLoadEvent) {
    this.loading = true;
    console.log('+ event.first', event.first);
    // for demo purposes keep loading the same dataset
    // in a real production application, this data should come from server by building the query with LazyLoadEvent options
    setTimeout(() => {
      // this.virtualCars = cars.splice(event.first, 10);
      this.carService.getCarsHuge().then(data => this.virtualCars = data.splice(event.first, 20) );
      /*this.virtualCars = [
      {brand: 'VW', year: 2012, color: 'Orange', vin: event.first},
      {brand: 'Audi', year: 2011, color: 'Black', vin: event.first + 1},
      {brand: 'Renault', year: 2005, color: 'Gray', vin: event.first + 2},
      {brand: 'BMW', year: 2003, color: 'Blue', vin: event.first + 3},
      {brand: 'Mercedes', year: 1995, color: 'Orange', vin: event.first + 4},
      {brand: 'Volvo', year: 2005, color: 'Black', vin: event.first + 5},
      {brand: 'Honda', year: 2012, color: 'Yellow', vin: event.first + 6},
      {brand: 'Jaguar', year: 2013, color: 'Orange', vin: event.first + 7},
      {brand: 'Ford', year: 2000, color: 'Black', vin: event.first + 8},
      {brand: 'Fiat', year: 2013, color: 'Red', vin: event.first + 9},
      {brand: 'VW', year: 2012, color: 'Orange', vin: event.first + 10},
      {brand: 'Audi', year: 2011, color: 'Black', vin: event.first + 11},
      {brand: 'Renault', year: 2005, color: 'Gray', vin: event.first + 12},
      {brand: 'BMW', year: 2003, color: 'Blue', vin: event.first + 13},
      {brand: 'Mercedes', year: 1995, color: 'Orange', vin: event.first + 14},
      {brand: 'Volvo', year: 2005, color: 'Black', vin: event.first + 15},
      {brand: 'Honda', year: 2012, color: 'Yellow', vin: event.first + 16},
      {brand: 'Jaguar', year: 2013, color: 'Orange', vin: event.first + 17},
      {brand: 'Ford', year: 2000, color: 'Black', vin: event.first + 18},
      {brand: 'Fiat', year: 2013, color: 'Red', vin: event.first + 19},
      {brand: 'VW', year: 2012, color: 'Orange', vin: event.first + 20},
      {brand: 'Audi', year: 2011, color: 'Black', vin: event.first + 21},
      {brand: 'Renault', year: 2005, color: 'Gray', vin: event.first + 22},
      {brand: 'BMW', year: 2003, color: 'Blue', vin: event.first + 23},
      {brand: 'Mercedes', year: 1995, color: 'Orange', vin: event.first + 24},
      {brand: 'Volvo', year: 2005, color: 'Black', vin: event.first + 25},
      {brand: 'Honda', year: 2012, color: 'Yellow', vin: event.first + 26},
      {brand: 'Jaguar', year: 2013, color: 'Orange', vin: event.first + 27},
      {brand: 'Ford', year: 2000, color: 'Black', vin: event.first + 28},
      {brand: 'Fiat', year: 2013, color: 'Red', vin: event.first + 29},
      {brand: 'VW', year: 2012, color: 'Orange', vin: event.first + 30},
      {brand: 'Audi', year: 2011, color: 'Black', vin: event.first + 31},
      {brand: 'Renault', year: 2005, color: 'Gray', vin: event.first + 32},
      {brand: 'BMW', year: 2003, color: 'Blue', vin: event.first + 33},
      {brand: 'Mercedes', year: 1995, color: 'Orange', vin: event.first + 34},
      {brand: 'Volvo', year: 2005, color: 'Black', vin: event.first + 35},
      {brand: 'Honda', year: 2012, color: 'Yellow', vin: event.first + 36},
      {brand: 'Jaguar', year: 2013, color: 'Orange', vin: event.first + 37},
      {brand: 'Ford', year: 2000, color: 'Black', vin: event.first + 38},
      {brand: 'Fiat', year: 2013, color: 'Red', vin: event.first + 39}
      ];*/

      console.log('- event.first', event.first);
      this.loading = false;
    }, 200);
  }

}
