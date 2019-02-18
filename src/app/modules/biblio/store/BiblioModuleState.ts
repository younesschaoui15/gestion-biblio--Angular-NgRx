import {Livre} from '../models/livre';
import {EntityState} from '@ngrx/entity';

export interface BiblioModuleState extends EntityState<Livre> {
  isBiblioLoaded: boolean;
  nbInserts: number;
  nbUpdates: number;
  nbDeletes: number;
}

