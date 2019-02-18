import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import {Livre} from '../models/livre';

export enum BiblioActionTypes {
  LoadLivresReq = '[Biblio] Load livres request',
  LoadLivres = '[Biblio] Load livres',
  LoadLivresSuccess = '[Biblio] Load livres is successed',
  LoadLivresFail = '[Biblio] Load livres is failed',
  AddLivre = '[Biblio] Add livre',
  UpsertLivre = '[Biblio] Upsert livre',
  AddLivres = '[Biblio] Add livres',
  UpsertLivres = '[Biblio] Upsert livres',
  UpdateLivre = '[Biblio] Update livre',
  UpdateLivres = '[Biblio] Update livres',
  DeleteLivre = '[Biblio] Delete livre',
  DeleteLivres = '[Biblio] Delete livres',
  ClearLivres = '[Biblio] Clear livres'
}

export class LoadLivresReq implements Action {
  readonly type = BiblioActionTypes.LoadLivresReq;
}

export class LoadLivres implements Action {
  readonly type = BiblioActionTypes.LoadLivres;

  constructor(public payload: { livres: Livre[] }) {}
}

export class LoadLivresSuccess implements Action {
  readonly type = BiblioActionTypes.LoadLivresSuccess;
}

export class LoadLivresFail implements Action {
  readonly type = BiblioActionTypes.LoadLivresFail;
}

export class AddLivre implements Action {
  readonly type = BiblioActionTypes.AddLivre;

  constructor(public payload: { livre: Livre }) {}
}

export class UpsertLivre implements Action {
  readonly type = BiblioActionTypes.UpsertLivre;

  constructor(public payload: { livre: Livre }) {}
}

export class AddLivres implements Action {
  readonly type = BiblioActionTypes.AddLivres;

  constructor(public payload: { livres: Livre[] }) {}
}

export class UpsertLivres implements Action {
  readonly type = BiblioActionTypes.UpsertLivres;

  constructor(public payload: { livres: Livre[] }) {}
}

export class UpdateLivre implements Action {
  readonly type = BiblioActionTypes.UpdateLivre;

  constructor(public payload: { livre: Update<Livre> }) {}
}

export class UpdateLivres implements Action {
  readonly type = BiblioActionTypes.UpdateLivres;

  constructor(public payload: { livres: Update<Livre>[] }) {}
}

export class DeleteLivre implements Action {
  readonly type = BiblioActionTypes.DeleteLivre;

  constructor(public payload: { id: string }) {}
}

export class DeleteLivres implements Action {
  readonly type = BiblioActionTypes.DeleteLivres;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearLivres implements Action {
  readonly type = BiblioActionTypes.ClearLivres;
}

export type BiblioActions =
 LoadLivres
 | LoadLivresReq
 | LoadLivresSuccess
 | LoadLivresFail
 | AddLivre
 | UpsertLivre
 | AddLivres
 | UpsertLivres
 | UpdateLivre
 | UpdateLivres
 | DeleteLivre
 | DeleteLivres
 | ClearLivres;
