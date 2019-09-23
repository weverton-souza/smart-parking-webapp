import * as actions from './auth.actions';
import * as selectors from './auth.selectors';
import * as effects from './auth.effects';

export const fromAuthState = { ...actions, ...selectors, ...effects };
