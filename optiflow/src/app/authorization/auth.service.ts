import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserApiService } from '../share/services/api/user-api.service';
import { Router } from '@angular/router';
import { User } from '../share/classes/user.class';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userLogin: User;
  private isLoggedIn = false;
  constructor(
    public userApiService: UserApiService,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router
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
          result.user.getIdToken().then((token) => {
            
          this.userLogin = {
            username: result.user.email,
            token: token,
            id: null,
            created_at: null,
            updated_at: null
          };
          this.userApiService.postUser(this.userLogin).subscribe((data) => {
            if (data) { 
              console.log(data.id);
              sessionStorage.setItem('userid', this.userLogin.token);
              sessionStorage.setItem('token', this.userLogin.token);
              sessionStorage.setItem('username', this.userLogin.username);
              this.isLoggedIn = true;
              this.router.navigate(['/projects/']);
            } else {
              console.log('Invalid data received');
            }
        });
       
      })
      .catch((error) => {
         
      });
      })
      .catch((error) => {
        return error;
      });
  }
  logout(){
    sessionStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['/signin']);
  }
  signin(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
  signup(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }
}