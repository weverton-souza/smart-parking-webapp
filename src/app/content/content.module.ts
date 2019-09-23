import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { fromCourtyardState } from './courtyard/state';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [ContentComponent, HomeComponent],
  imports: [
    SharedModule,
    ContentRoutingModule,
    StoreModule.forFeature('COURTYARD_STATE', {
      'courtyard': fromCourtyardState.ResourceReducer,
      'courtyards': fromCourtyardState.ResourcePageReducer
    }),
    EffectsModule.forFeature([
      fromCourtyardState.CourtyardEffect])
  ]
})
export class ContentModule { }
