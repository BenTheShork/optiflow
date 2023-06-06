import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth // Inject Firebase auth service
  ) {}
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        
        return result;
      })
      .catch((error) => {
        return error;
      });
  }
  
  signin(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
  signup(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }
}