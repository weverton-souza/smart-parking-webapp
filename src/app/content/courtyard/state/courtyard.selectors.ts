import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ICourtyardState } from './courtyard.actions';

export const getCourtyardState = createFeatureSelector<ICourtyardState>('COURTYARD_STATE');

export const getCourtyard = createSelector(
    getCourtyardState,
    (state: ICourtyardState) => state.courtyard.content
);

export const getAllCourtyards = createSelector(
    getCourtyardState,
    (state: ICourtyardState) => state.courtyards.content
);
