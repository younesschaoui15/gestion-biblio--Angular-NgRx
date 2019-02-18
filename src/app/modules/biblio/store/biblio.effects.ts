import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {BiblioService} from '../services/biblio.service';
import {AddLivre, BiblioActionTypes, LoadLivres, LoadLivresFail, LoadLivresReq, LoadLivresSuccess, UpdateLivre} from './biblio.actions';
import {catchError, filter, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import {Livre} from '../models/livre';
import {defer, pipe, throwError} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../../reducers';
import {selectIsLivresLoadedSuccess} from './biblioModule.selectors';


@Injectable()
export class BiblioEffects {

  constructor(private actions$: Actions, private store: Store<AppState>, private biblioServices: BiblioService) {}

  @Effect({dispatch: false})
  allLoadedLivres$ = this.actions$.pipe(
    ofType<LoadLivresReq>(BiblioActionTypes.LoadLivresReq),
    withLatestFrom(this.store.select(selectIsLivresLoadedSuccess)),
    filter(([action, selectIsLoadedSuccess]) => !selectIsLoadedSuccess), /* selectIsLoadedSuccess: reslut of the select */
    mergeMap(action => this.biblioServices.getBooks()),
    map(allLivres => this.store.dispatch(new LoadLivres({livres: allLivres})) ), /* {livres: allLivres} Or {livres} if they have the same name */
    catchError(err => {
      console.log('Erreur', err);
      this.store.dispatch(new LoadLivresFail());
      return throwError(err);
    })
  );

  @Effect({dispatch: false})
  addNewLivre$ = this.actions$.pipe(
    ofType<AddLivre>(BiblioActionTypes.AddLivre),
    // mergeMap(action => this.biblioServices.addNewBook(action.payload.livre)),
    map(action => this.biblioServices.addNewBook(action.payload.livre)),
    // tap( () => {}, (err) => console.log(err), () => console.log('....Complited'))
  );


  @Effect({dispatch: false})
  updateLivre$ = this.actions$.pipe(
    ofType<UpdateLivre>(BiblioActionTypes.UpdateLivre),
    map(action => this.biblioServices.updateBook(action.payload.livre.changes as Livre))
  );
}
