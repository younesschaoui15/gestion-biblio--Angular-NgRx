import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BiblioRoutingModule } from './biblio-routing.module';
import { LivresComponent } from './components/livres/livres.component';
import {TableModule} from 'primeng/table';
import {NgZorroAntdModule, NzInputModule, NzDatePickerModule, NzSelectModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditLivreComponent } from './components/edit-livre/edit-livre.component';
import {BiblioService} from './services/biblio.service';
import { StoreModule } from '@ngrx/store';
import * as fromBiblioModule from './store/biblio.reducer';
import { BiblioComponent } from './biblio-containers/biblio-container/biblio.component';
import { EffectsModule } from '@ngrx/effects';
import { BiblioEffects } from './store/biblio.effects';

@NgModule({
  declarations: [BiblioComponent, LivresComponent, EditLivreComponent],
  imports: [
    CommonModule,
    BiblioRoutingModule,
    TableModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('biblioModuleState', fromBiblioModule.BiblioReducer),
    /* 1st arg: this module state, 2nd arg: this module reducer */
    EffectsModule.forFeature([BiblioEffects]),
  ],
  providers: [BiblioService]
})
export class BiblioModule { }
