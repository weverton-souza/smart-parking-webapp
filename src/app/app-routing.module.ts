import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: 'src/app/content/content.module#ContentModule',
  },
  {
    path: 'login',
    loadChildren: 'src/app/shared/shared.module#SharedModule'
  },
  { path: '', redirectTo: 'src/app/content/content.module#ContentModule', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
