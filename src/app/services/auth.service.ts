import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore
  ) {}

  public async createUser(userData: IUser) {
    const { name, email, password, age, phoneNumber: phoneNumber } = userData;

    await this.auth.createUserWithEmailAndPassword(email, password);

    await this.db.collection<IUser>('users').add({
      name,
      email,
      age,
      phoneNumber,
    });
  }
}
