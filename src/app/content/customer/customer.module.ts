import { NgModule } from '@angular/core';
import { CreateEditComponent } from './pages/create-edit/create-edit.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from '@/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { fromCustomerState } from './state';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';

@NgModule({
  declarations: [CreateEditComponent, CustomerListComponent],
  imports: [
    SharedModule,
    CustomerRoutingModule,
    StoreModule.forFeature('CUSTOMER_STATE', {
      'customer': fromCustomerState.ResourceReducer,
      'customers': fromCustomerState.CustomerPageReducer
    }),
    EffectsModule.forFeature([
      fromCustomerState.CustomerEffect])
  ]
})
export class CustomerModule { }
