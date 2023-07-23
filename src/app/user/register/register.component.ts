import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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
  ]);
  age = new FormControl('', [
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
  phone_number = new FormControl('', [
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
    phone_number: this.phone_number,
  });

  constructor(private auth: AngularFireAuth) {}

  public async register() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your account is being created';
    this.alertColor = 'blue';

    const { email, password } =  this.registerForm.value;

    try {
      const userCredentials = await this.auth.createUserWithEmailAndPassword(
        email as string, password as string
      );
      console.log(userCredentials);
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