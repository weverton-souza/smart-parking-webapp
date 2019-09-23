import { NgModule } from '@angular/core';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { CreateEditComponent } from './pages/create-edit/create-edit.component';
import { VehicleListComponent } from './pages/vehicle-list/vehicle-list.component';
import { fromVehicleState } from './state';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@/shared/shared.module';
import { ColorSwatchesModule } from 'ngx-color/swatches';

@NgModule({
  declarations: [CreateEditComponent, VehicleListComponent],
  imports: [
    SharedModule,
    ColorSwatchesModule,
    VehicleRoutingModule,
    StoreModule.forFeature('VEHICLE_STATE', {
      'vehicle': fromVehicleState.ResourceReducer,
      'vehicles': fromVehicleState.VehiclePageReducer
    }),
    EffectsModule.forFeature([
      fromVehicleState.VehicleEffect])
  ]
})
export class VehicleModule { }
