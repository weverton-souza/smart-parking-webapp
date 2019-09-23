import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '@/core/security/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'courtyard',
        loadChildren: 'src/app/content/courtyard/courtyard.module#CourtyardModule'
      },
      {
        path: 'parking',
        loadChildren: 'src/app/content/parking/parking.module#ParkingModule'
      },
      {
        path: 'customer',
        loadChildren: 'src/app/content/customer/customer.module#CustomerModule'
      },
      {
        path: 'vehicle',
        loadChildren: 'src/app/content/vehicle/vehicle.module#VehicleModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
