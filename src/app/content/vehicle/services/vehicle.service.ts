import { Injectable, Injector } from '@angular/core';
import { AbstractService } from '@/shared/abstracts/shared.abstract';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends AbstractService<Vehicle> {

  constructor(private injector: Injector) {
    super(injector, '/vehicles');
  }
}
