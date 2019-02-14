import {AppState} from '../../../reducers';
import {createSelector} from '@ngrx/store';
import * as _ from 'lodash';

export const selectLivresState = (state: AppState) => state.livreModuleState;

export const selectLivres = createSelector(
  selectLivresState,
  s1 => s1.livres
);

export const selectOneLivre = (ISBN) => createSelector(
  selectLivres,
  s1 => {
    return _.find(s1, { id: ISBN });
  }
);
