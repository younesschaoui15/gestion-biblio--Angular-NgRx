import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {BiblioModuleState} from '../../store/BiblioModuleState';
import {AppState} from '../../../../reducers';

@Component({
  selector: 'app-biblio',
  templateUrl: './biblio.component.html',
  styleUrls: ['./biblio.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush /*Do not verify everytime */
})
export class BiblioComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

}
