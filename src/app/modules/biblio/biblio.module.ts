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
import { LivresTableComponent } from './components/livres-table/livres-table.component';
import {CarTestService} from './services/car-test-service.service';
import { Dir1Directive } from './directives/dir1.directive';
import { Dir2Directive } from './directives/dir2.directive';
import {environment} from '../../../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule, StorageBucket} from '@angular/fire/storage';
import {AngularFirestoreModule} from '@angular/fire/firestore';

@NgModule({
  declarations: [BiblioComponent, LivresComponent, EditLivreComponent, LivresTableComponent, Dir1Directive, Dir2Directive],
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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
  ],
  providers: [BiblioService, CarTestService, { provide: StorageBucket, useValue: 'gestion-livres-app.appspot.com' }],
  exports: [Dir1Directive]
})
export class BiblioModule { }
