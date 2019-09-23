import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ICustomerState } from './customer.actions';

export const getCustomerState = createFeatureSelector<ICustomerState>('CUSTOMER_STATE');

export const getCustomer = createSelector(
    getCustomerState,
    (state: ICustomerState) => state.customer.content
);

export const getAllCustomers = createSelector(
    getCustomerState,
    (state: ICustomerState) => state.customers.content
);
