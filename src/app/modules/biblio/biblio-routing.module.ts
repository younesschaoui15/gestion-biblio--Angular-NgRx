import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LivresComponent} from './components/livres/livres.component';
import { EditLivreComponent } from './components/edit-livre/edit-livre.component';

const routes: Routes = [
  {path: '', redirectTo: 'livres', pathMatch: 'full'},
  {path: 'livres', component: LivresComponent},
  {path: 'livres/edit/:id', component: EditLivreComponent},
  {path: '**', redirectTo: 'livres', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BiblioRoutingModule { }
