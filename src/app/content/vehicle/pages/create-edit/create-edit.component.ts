import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fromVehicleState } from '../../state';
import { Vehicle } from '../../models/vehicle.model';
import { AbstractComponent } from '@/shared/abstracts/component.shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAppState } from '@/reducers/app.reducers';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateEditComponent extends AbstractComponent {
  public vehicle$: Observable<any>;
  public vehicles$: Observable<any[]>;
  public pageTitle: string;
  public currentAction: string;
  public vehicleForm: FormGroup;

  constructor(private store: Store<IAppState>, private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router) { 
    super();
  }

  ngOnInit() {
    this.vehicleForm = this.formBuilder.group({
      id: [''],
      licencePlate: ['', [Validators.required]],
      model: ['', [Validators.required]],
      color: ['', [Validators.required]]
    });
    this.setPageTitle();
  }

  save(vehicle: Vehicle) {
    Object.keys(vehicle)
          .map(control => vehicle[control] = this.toUpperCase(vehicle[control]))

    this.store.dispatch(new fromVehicleState.Save(vehicle));
    this.vehicles$ = this.store.pipe(select(fromVehicleState.getAllVehicles));
  }

  findAll() {
    this.store.dispatch(new fromVehicleState.FindAll());
    this.vehicles$ = this.store.pipe(select(fromVehicleState.getAllVehicles));
  }

  findById(vehicleId: string) {
    this.store.dispatch(new fromVehicleState.FindById(vehicleId));
    this.vehicle$ = this.store.pipe(select(fromVehicleState.getVehicle));
  }

  private setPageTitle() {
    if(this.router.url.endsWith('create')) {
      this.pageTitle = 'Registro de Veículo';
    } else {
      this.store.pipe(select(fromVehicleState.getVehicle)).subscribe(c => {
        this.pageTitle = 'Edição de veículo: ' + c.licencePlate;
        Object.keys(this.vehicleForm.controls)
          .map(control => this.vehicleForm.controls[control].setValue(c[control]));
      })
    }
  }

  private toUpperCase(value: string): string {
    if (value === undefined || value === null) {
      return value;
    }
    return value.toUpperCase();
  }
}
