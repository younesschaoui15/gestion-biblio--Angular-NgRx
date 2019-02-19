import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Livre} from '../../models/livre';
import {NzMessageService} from 'ng-zorro-antd';
import {AppState} from '../../../../reducers';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as livreModuleSelectors from '../../store/biblioModule.selectors';
import * as _ from 'lodash';
import {BiblioService} from '../../services/biblio.service';
import {UpdateLivre} from '../../store/biblio.actions';
import {BiblioStoreService} from '../../services/biblio-store.service';

@Component({
  selector: 'app-edit-livre',
  templateUrl: './edit-livre.component.html',
  styleUrls: ['./edit-livre.component.css']
})
export class EditLivreComponent implements OnInit {

  id: string;
  livre: Livre;

  constructor(private biblioServices: BiblioService,
              private msg: NzMessageService,
              private biblioStoreServices: BiblioStoreService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => this.id = params.get('id'));
    this.biblioStoreServices.getOneLivre(this.id).subscribe(data => this.livre = data);
  }

  updateBook() {
    this.biblioStoreServices.updateLivre(this.livre);

    this.msg.create('success', 'The book was updated successfully');
    setTimeout(() => {
      this.router.navigate(['biblio/livres']);
    }, 1000);
  }

  onChangeDate(result: Date): void {
    console.log('Date: ', result);
  }

  onChangeStatus(value: string): void {
    console.log('Status : ', value);
  }
}
