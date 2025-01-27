import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/authService';
import { authActions } from './actions';
import { CurrentUserInterface } from '../types/currentUser.interface';
import { HttpErrorResponse } from '@angular/common/http';

export const registerEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) => {
        return authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            return authActions.registerSuccess({ currentUser });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(
              authActions.registerFailure({ errors: error.error.errors })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const getUsersEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.getUsers),
      switchMap(() => {
        return authService.getUsers().pipe(
          map((users: CurrentUserInterface[]) => {
            return authActions.getUsersSuccess({ users });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(
              authActions.getUsersFailure({ errors: error.error.errors })
            );
          })
        );
      })
    );
  },
  { functional: true }
);
