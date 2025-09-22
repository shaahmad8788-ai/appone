import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { Add } from './add/add';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'add', component: Add},
  { path: 'edit/:id', component: Add }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudRoutingModule { }
