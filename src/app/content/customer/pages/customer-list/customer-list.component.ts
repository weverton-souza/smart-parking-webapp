import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AbstractComponent } from '@/shared/abstracts/component.shared';
import { fromCustomerState } from '../../state';
import { Customer } from '../../models/customer.model';
import { IAppState } from '@/reducers/app.reducers';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent extends AbstractComponent {
  public customer$: Observable<any>;
  public customers$: Observable<any[]>;

  constructor(private store: Store<IAppState>) {
    super();
   }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.store.dispatch(new fromCustomerState.FindAll());
    this.customers$ = this.store.pipe(select(fromCustomerState.getAllCustomers));
  }

  delete(customer: Customer) {
    this.store.dispatch(new fromCustomerState.Delete(customer));
  }

  edit(customer: Customer) {
    this.store.dispatch(new fromCustomerState.FindById(customer.id));
  }

  getPhonePattern(value: string): string {
    if(value.charAt(5)  == '9') {
      return '(00) 0.0000-0000';
    } else {
      return '(00) 0000-0000?0';
    }
  }
}
