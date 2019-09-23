import * as actions from './customer.actions';
import * as selectors from './customer.selectors';
import * as effects from './customer.effects';

export const fromCustomerState = { ...actions, ...selectors, ...effects };
