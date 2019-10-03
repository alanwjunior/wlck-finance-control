import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private firebaseAuth: AngularFireAuth
  ) { }

  async login(email, password) {
    try {
      const result = await this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
      const datetimeNow = new Date();
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('userEmail', result.user.email);
      localStorage.setItem('uidtoken', result.user.uid);
      localStorage.setItem('loginDate', datetimeNow.toString());
      return true;
    } catch {
      return false;
    }
  }

  getCurrentUser() {
    return localStorage.getItem('uidtoken');
  }
}
