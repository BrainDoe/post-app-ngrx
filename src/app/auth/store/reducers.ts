import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../types/authState.interface';
import { authActions } from './actions';
import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: undefined,
  validationsErrors: null,
  users: [],
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      validationsErrors: null,
    })),
    on(authActions.registerSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationsErrors: action.errors,
    })),

    // Handle fetching users
    on(authActions.getUsers, (state) => ({
      ...state,
      isLoading: true,
      validationsErrors: null,
    })),
    on(authActions.getUsersSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      users: action.users,
    })),
    on(authActions.getUsersFailure, (state, action) => ({
      ...state,
      isLoading: false,
      validationsErrors: action.errors,
    }))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectCurrentUser,
  selectIsLoading,
  selectValidationsErrors,
  selectUsers,
} = authFeature;

// Because we use the createFeature() here, we can easily get a slice of the the state without using selectors. Thus we would no longer need the selector file. Am only leaving the selector file for a reference.
