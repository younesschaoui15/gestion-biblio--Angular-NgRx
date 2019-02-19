import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../reducers';
import {AddLivre, DeleteLivre, LoadLivresReq, LoadLivresSuccess, UpdateLivre} from '../store/biblio.actions';
import * as biblioModuleSelectors from '../store/biblioModule.selectors';
import {Livre} from '../models/livre';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BiblioStoreService {

  constructor(private store: Store<AppState>) { }

  getLivres() {
    this.store.dispatch(new LoadLivresReq());
    const livres$ = this.store.select(biblioModuleSelectors.selectLivres);
    this.store.dispatch(new LoadLivresSuccess());
    return livres$;
  }

  getOneLivre(id): Observable<Livre> {
    const livre$ = this.store.select(biblioModuleSelectors.selectOneLivre(id));
    return livre$;
  }

  addLivre(newLivre: Livre) {
    newLivre.status ? newLivre.status = 'Disponible' : newLivre.status = 'Epuisé';
    this.store.dispatch(new AddLivre({livre: newLivre}));
  }

  updateLivre(livre: Livre) {
    this.store.dispatch(new UpdateLivre({livre: {id: livre.id, changes: livre}}));
  }

  deleteLivre(idx) {
    this.store.dispatch(new DeleteLivre({id: idx}));
  }
}
