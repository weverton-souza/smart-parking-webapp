import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fromCustomerState } from '../../state';
import { Customer } from '../../models/customer.model';
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
  public customer$: Observable<any>;
  public customers$: Observable<any[]>;
  public pageTitle: string;
  public currentAction: string;
  public phonePattern: string;
  public customerForm: FormGroup;

  constructor(private store: Store<IAppState>, private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router) { 
    super();
  }

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]]
    });
    this.setPageTitle();
  }

  save(customer: Customer) {
    this.store.dispatch(new fromCustomerState.Save(customer));
    this.customers$ = this.store.pipe(select(fromCustomerState.getAllCustomers));
  }

  findAll() {
    this.store.dispatch(new fromCustomerState.FindAll());
    this.customers$ = this.store.pipe(select(fromCustomerState.getAllCustomers));
  }

  findById(customerId: string) {
    this.store.dispatch(new fromCustomerState.FindById(customerId));
    this.customer$ = this.store.pipe(select(fromCustomerState.getCustomer));
  }

  private setPageTitle() {
    if(this.router.url.endsWith('create')) {
      this.pageTitle = 'Registro de Cliente';
    } else {
      this.store.pipe(select(fromCustomerState.getCustomer)).subscribe(c => {
        this.pageTitle = 'Edição de Cliente: ' + c.name;
        Object.keys(this.customerForm.controls)
          .map(control => this.customerForm.controls[control].setValue(c[control]));
      })
    }
  }

  onChange(value: string) {
    if(value.charAt(5)  == '9') {
      this.phonePattern = '(00) 0.0000-0000';
    } else {
      this.phonePattern = '(00) 0000-0000?0';
    }
  }

  getPhonePattern(): string {
    return this.phonePattern;
  }
}
