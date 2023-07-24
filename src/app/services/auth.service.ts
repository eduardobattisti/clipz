import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable, of, delay, map, filter, switchMap } from 'rxjs';

import type IUser from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<IUser>;
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;
  public redirect = false;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.usersCollection = this.db.collection<IUser>('users');
    this.isAuthenticated$ = auth.user.pipe(
      map(user => !!user)
    );
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    );

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(_e => this.route.firstChild),
      switchMap(route => route?.data ?? of({ authOnly: false }))
    ).subscribe((data) => {
      this.redirect = data.authOnly ?? false;
    });
  }

  public async createUser(userData: IUser) {
    const { name, email, password, age, phoneNumber: phoneNumber } = userData;

    if (!password) {
      throw new Error('Password not provided!');
    }

    const userCred = await this.auth.createUserWithEmailAndPassword(email, password);

    if(!userCred.user) {
      throw new Error('User can\'t be found');
    }

    await this.usersCollection.doc(userCred.user.uid).set({
      name,
      email,
      age,
      phoneNumber,
    });

    await userCred.user.updateProfile({
      displayName: name
    });
  }

  public async logout($event?: Event) {
    if ($event) {
      $event.preventDefault();
    }

    await this.auth.signOut();

    if(this.redirect) {
      await this.router.navigateByUrl('/');
    }
  }
}
