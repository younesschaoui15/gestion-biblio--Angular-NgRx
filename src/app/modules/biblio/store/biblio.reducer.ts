import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {BiblioActions, BiblioActionTypes} from './biblio.actions';
import {BiblioModuleState} from './BiblioModuleState';
import {Livre} from '../models/livre';

export const adapter: EntityAdapter<Livre> = createEntityAdapter<Livre>();

export const initialState: BiblioModuleState = adapter.getInitialState({
  isBiblioLoaded: false,
  nbInserts: 0,
  nbUpdates: 0,
  nbDeletes: 0
});

export function BiblioReducer(state = initialState, action: BiblioActions): BiblioModuleState {
  switch (action.type) {

    case BiblioActionTypes.LoadLivres: {
      return adapter.addAll(action.payload.livres, state);
    }

    case BiblioActionTypes.LoadLivresSuccess: {
      return {...state, isBiblioLoaded: true};
    }

    case BiblioActionTypes.LoadLivresFail: {
      return {...state, isBiblioLoaded: false};
    }

    case BiblioActionTypes.AddLivre: {
      return adapter.addOne(action.payload.livre, state);
    }

    case BiblioActionTypes.UpsertLivre: {
      return adapter.upsertOne(action.payload.livre, state);
    }

    case BiblioActionTypes.AddLivres: {
      return adapter.addMany(action.payload.livres, state);
    }

    case BiblioActionTypes.UpsertLivres: {
      return adapter.upsertMany(action.payload.livres, state);
    }

    case BiblioActionTypes.UpdateLivre: {
      return adapter.updateOne(action.payload.livre, state);
    }

    case BiblioActionTypes.UpdateLivres: {
      return adapter.updateMany(action.payload.livres, state);
    }

    case BiblioActionTypes.DeleteLivre: {
      return adapter.removeOne(action.payload.id, state);
    }

    case BiblioActionTypes.DeleteLivres: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case BiblioActionTypes.ClearLivres: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
