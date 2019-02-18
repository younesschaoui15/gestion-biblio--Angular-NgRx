import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {BiblioService} from '../services/biblio.service';
import {BiblioActionTypes, LoadLivres, LoadLivresFail, LoadLivresReq, LoadLivresSuccess} from './biblio.actions';
import {map, mergeMap, tap} from 'rxjs/operators';
import {Livre} from '../models/livre';





@Injectable()
export class BiblioEffects {

  constructor(private actions$: Actions, private biblioServives: BiblioService) {}

  @Effect()
  allLoadedLivres$ = this.actions$.pipe(
    ofType<LoadLivresReq>(BiblioActionTypes.LoadLivresReq),
    mergeMap(action => this.biblioServives.getBooks() ),
    map(allLivres => new LoadLivres({livres: allLivres})), /* {livres: allLivres} Or {livres} if they have the same name */
    // tap( () => new LoadLivresSuccess() ),
    // error ( () => new LoadLivresFail() )
  );
}
