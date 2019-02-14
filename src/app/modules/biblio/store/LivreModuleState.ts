import {Livre} from '../models/livre';

export interface LivreModuleState {
  livres: Livre[];
  nbUpdates: number;
  nbDeletes: number;
  isLoaded: boolean;
}
