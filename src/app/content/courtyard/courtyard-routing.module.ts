import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEditComponent } from './pages/create-edit/create-edit.component';
import { CourtyardListComponent } from './pages/courtyard-list/courtyard-list.component';
import { AuthGuard } from '@/core/security/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CourtyardListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'create',
        component: CreateEditComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'update',
        component: CreateEditComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourtyardRoutingModule { }
