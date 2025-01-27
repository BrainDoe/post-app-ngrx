import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { CurrentUserInterface } from '../types/currentUser.interface';
import { BackendErrorsInterface } from '../types/backendErrors';

// export const register = createAction(
//   '[Auth] register',
//   props<{ request: RegisterRequestInterface }>()
// );

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register Success': props<{ currentUser: CurrentUserInterface }>(),
    'Register Failure': props<{ errors: BackendErrorsInterface }>(),

    GetUsers: emptyProps(),
    'Get Users Success': props<{ users: CurrentUserInterface[] }>(),
    'Get Users Failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
