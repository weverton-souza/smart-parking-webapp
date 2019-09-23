import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IVehicleState } from './vehicle.actions';

export const getVehicleState = createFeatureSelector<IVehicleState>('VEHICLE_STATE');

export const getVehicle = createSelector(
    getVehicleState,
    (state: IVehicleState) => state.vehicle.content
);

export const getAllVehicles = createSelector(
    getVehicleState,
    (state: IVehicleState) => state.vehicles.content
);
