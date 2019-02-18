import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {BiblioModuleState} from '../modules/biblio/store/BiblioModuleState';
import {BiblioReducer} from '../modules/biblio/store/biblio.reducer';

export interface AppState {
  // biblioModuleState: BiblioModuleState;
}

export const reducers: ActionReducerMap<AppState> = {
  // biblioModuleReducer: BiblioReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
