import * as actions from './courtyard.actions';
import * as selectors from './courtyard.selectors';
import * as effects from './courtyard.effects';

export const fromCourtyardState = { ...actions, ...selectors, ...effects };
