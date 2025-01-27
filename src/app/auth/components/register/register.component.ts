import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/actions';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { RouterLink } from '@angular/router';
import {
  selectIsSubmitting,
  selectValidationsErrors,
} from '../../store/reducers';
import { CommonModule } from '@angular/common';
import { combineLatest } from 'rxjs';
import { BackendErrorMessagesComponent } from 'src/app/shared/backendErrorMessages/backendErrorMessages.component';

const items = { name: 'Donatus Okwe' };

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessagesComponent,
  ],
})
export class RegisterComponent {
  items = items;
  isSubmitting$ = this.store$.select(selectIsSubmitting);
  data$ = combineLatest({
    isSubmitting: this.store$.select(selectIsSubmitting),
    backendErrors: this.store$.select(selectValidationsErrors),
  });

  constructor(private fb: FormBuilder, private store$: Store) {}

  ngOnInit() {
    console.log(this.items);

    this.getUsers();
  }

  getUsers() {
    console.log('users');
    this.store$.dispatch(authActions.getUsers());
  }

  form: FormGroup = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    console.log(this.form.getRawValue());
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    };

    this.store$.dispatch(authActions.register({ request }));
  }
}
