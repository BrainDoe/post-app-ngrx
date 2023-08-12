import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { register } from '../../store/actions';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { RouterLink } from '@angular/router';
import { selectIsSubmitting } from '../../store/selector';
import { AuthStateInterface } from '../../types/authState.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
})
export class RegisterComponent {
  isSubmitting$ = this.store$.select(selectIsSubmitting);

  constructor(
    private fb: FormBuilder,
    private store$: Store<{ auth: AuthStateInterface }>
  ) {}

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
    this.store$.dispatch(register({ request }));
  }
}
