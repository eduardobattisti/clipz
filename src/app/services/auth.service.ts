import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<IUser>;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    this.usersCollection = this.db.collection<IUser>('users');
  }

  public async createUser(userData: IUser) {
    const { name, email, password, age, phoneNumber: phoneNumber } = userData;

    if (!password) {
      throw new Error('Password not provided!');
    }

    await this.auth.createUserWithEmailAndPassword(email, password);

    await this.usersCollection.add({
      name,
      email,
      age,
      phoneNumber,
    });
  }
}
