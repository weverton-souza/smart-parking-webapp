import { NgModule } from '@angular/core';

import { CourtyardRoutingModule } from './courtyard-routing.module';
import { CreateEditComponent } from './pages/create-edit/create-edit.component';
import { SharedModule } from '@/shared/shared.module';
import { CourtyardListComponent } from './pages/courtyard-list/courtyard-list.component';


@NgModule({
  declarations: [CreateEditComponent, CourtyardListComponent],
  imports: [
    SharedModule,
    CourtyardRoutingModule
  ]
})
export class CourtyardModule { }
