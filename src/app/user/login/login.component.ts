import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  inSubmission = false;
  showAlert = false;
  alertMsg = 'Please wait! We are logging you in';
  alertColor = 'blue';

  credentials = {
    email: '',
    password: ''
  }

  constructor(private auth: AngularFireAuth) { }

  async login() {
    this.inSubmission = true;
    this.showAlert = true;
    this.alertMsg = 'Please wait! We are logging you in';
    this.alertColor = 'blue';

    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email, this.credentials.password
      );

      this.alertMsg = 'Success! You are now logged in.';
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
