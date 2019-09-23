import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.actions';

const getFeatureState = createFeatureSelector<AuthState>('auth');

export const getPage = createSelector(
    getFeatureState,
    (page: AuthState) => page
);

export const getLoading = createSelector(
    getFeatureState,
    (page: AuthState) => page.loading
);
