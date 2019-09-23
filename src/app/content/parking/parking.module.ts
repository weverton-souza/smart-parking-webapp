import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ParkingRoutingModule } from './parking-routing.module';
import { ParkingComponent } from './parking.component';
import { CreateEditComponent } from './pages/create-edit/create-edit.component';

@NgModule({
  declarations: [ParkingComponent, CreateEditComponent],
  imports: [
    SharedModule,
    ParkingRoutingModule
  ]
})
export class ParkingModule { }
