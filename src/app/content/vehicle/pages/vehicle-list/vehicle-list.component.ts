import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractComponent } from '@/shared/abstracts/component.shared';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@/reducers/app.reducers';
import { Vehicle } from '../../models/vehicle.model';
import { fromVehicleState } from '../../state';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent extends AbstractComponent {
  public vehicle$: Observable<any>;
  public vehicles$: Observable<any[]>;

  constructor(private store: Store<IAppState>) {
    super();
   }

   ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.store.dispatch(new fromVehicleState.FindAll());
    this.vehicles$ = this.store.pipe(select(fromVehicleState.getAllVehicles));
  }

  delete(vehicle: Vehicle) {
    this.store.dispatch(new fromVehicleState.Delete(vehicle));
  }

  edit(vehicle: Vehicle) {
    this.store.dispatch(new fromVehicleState.FindById(vehicle.id));
  }

}
