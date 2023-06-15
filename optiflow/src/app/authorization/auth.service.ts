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
  public isLoggedIn = false;
  constructor(
    public userApiService: UserApiService,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router
  ) {
    if(sessionStorage.getItem('log') == 'true'){
      this.isLoggedIn = true;
    }else{
      this.isLoggedIn = false;
    }
    
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }
  generateRandomToken(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
  
    return token;
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.userLogin = {
          username: result.user.email,
          token: this.generateRandomToken(50),
          id: null,
          created_at: null,
          updated_at: null
          
        };
          
          this.userApiService.postUser(this.userLogin).subscribe((data) => {
            try {
              if (data) { 
                sessionStorage.setItem('userid',data.id);
                sessionStorage.setItem('token', this.userLogin.token);
                sessionStorage.setItem('username', this.userLogin.username);
                this.login();
                this.router.navigate(['/project/']);
              } else {
                console.log('Invalid data received');
              }
            } catch (error) {
              console.error('An error occurred:', error);
            }
          });
       
      })
      .catch((error) => {
        return error;
      });
  }
  logout(){
    sessionStorage.clear();
    this.isLoggedIn = false;
    sessionStorage.setItem('log', 'false');
    this.router.navigate(['/signin']);
  }
  login(){
    this.isLoggedIn = true;
    sessionStorage.setItem('log', 'true');
  }

  signin(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
  signup(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }
}