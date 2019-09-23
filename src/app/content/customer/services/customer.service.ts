import { Injectable, Injector } from '@angular/core';
import { AbstractService } from '@/shared/abstracts/shared.abstract';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends AbstractService<Customer> {
  constructor(private injector: Injector) {
    super(injector, '/customers');
  }
}
