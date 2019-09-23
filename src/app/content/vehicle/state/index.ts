import * as actions from './vehicle.actions';
import * as selectors from './vehicle.selectors';
import * as effects from './vehicle.effects';

export const fromVehicleState = { ...actions, ...selectors, ...effects };
