import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterValidators } from '../validators/register-validators';
import { EmailTaken } from '../validators/email-taken';

import type IUser from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  inSubmission = false;

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ], [this.emailTaken.validate]);
  age = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(18),
    Validators.max(120)
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ]);
  confirm_password = new FormControl('', [
    Validators.required
  ]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(14),
    Validators.maxLength(14)
  ]);
  showAlert = false;
  alertMsg = 'Please wait! Your account is being created';
  alertColor = 'blue';

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber,
  }, [RegisterValidators.match('password', 'confirm_password')]);

  constructor(
    private auth: AuthService,
    private emailTaken: EmailTaken
  ) {}

  public async register() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your account is being created';
    this.alertColor = 'blue';

    try {
      await this.auth.createUser(this.registerForm.value as IUser);

      this.alertMsg = 'Success! Your account has been created.';
      this.alertColor = 'green';
    } catch(error) {
      this.showAlert = true;
      this.alertMsg = 'An unexpected error occurred. Please try again later.';
      this.alertColor = 'red';
    } finally {
      this.inSubmission = false;
    }
  }
}
