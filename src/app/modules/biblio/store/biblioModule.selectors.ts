import {AppState} from '../../../reducers';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as _ from 'lodash';
import {BiblioModuleState} from './BiblioModuleState';
import * as fromBiblioReducer from './biblio.reducer';

// export const selectBiblioState = (state: AppState) => state.biblioModuleState;
export const selectBiblioState =  createFeatureSelector<BiblioModuleState>('biblioModuleState');

export const selectLivres = createSelector(
  selectBiblioState,
  fromBiblioReducer.selectAll
);

export const selectIsLivresLoadedSuccess = createSelector(
  selectBiblioState,
  s1 => s1.isBiblioLoaded
);

export const selectOneLivre = (id) => createSelector(
  selectBiblioState,
  s1 => s1.entities[id]
);

// export const selectOneLivre = (ISBN) => createSelector(
//   selectLivres,
//   s1 => {
//     return _.find(s1, { id: ISBN });
//   }
// );
