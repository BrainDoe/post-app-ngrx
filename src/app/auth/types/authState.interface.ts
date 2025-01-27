import { BackendErrorsInterface } from './backendErrors';
import { CurrentUserInterface } from './currentUser.interface';

export interface AuthStateInterface {
  isSubmitting: boolean;
  currentUser: CurrentUserInterface | null | undefined;
  isLoading: boolean;
  validationsErrors: BackendErrorsInterface | null;
  users: any[];
}
