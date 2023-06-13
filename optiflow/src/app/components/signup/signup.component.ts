import { Component, OnInit } from '@angular/core';
import { AuthService } from '@src/app/authorization/auth.service';
import { UnsubscribeDirective } from '@src/app/share/directives/unsubsrcibe.directive';
import { UserApiService } from '@src/app/share/services/api/user-api.service';
import { AlertService, AlertType } from '@src/app/share/services/alert.service';
import { Router } from '@angular/router';
import { log } from 'console';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [
    '../../../assets/vendor/bootstrap/css/bootstrap.min.css',
    '../../../assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../../assets/fonts/iconic/css/material-design-iconic-font.min.css',
    '../../../assets/vendor/animate/animate.css',
    '../../../assets/vendor/css-hamburgers/hamburgers.min.css',
    '../../../assets/vendor/animsition/css/animsition.min.css',
    '../../../assets/vendor/animsition/css/animsition.min.css',
    '../../../assets/vendor/select2/select2.min.css',
    '../../../assets/vendor/daterangepicker/daterangepicker.css',
    './signup.component.scss'],
})
export class SignupComponent extends UnsubscribeDirective implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  rpassword: string = '';
  constructor(
    private authService: AuthService,
    private readonly router: Router
    ) { 
      super() 
    }

  ngOnInit() { }

  signup() {
    if (this.email != '' && this.password != '' && this.rpassword != '' && this.password === this.rpassword) {
      this.authService.signup(this.email, this.password)
        .then((userCredential) => {
          this.errorMessage = '';
          this.router.navigate(['/signin']);
        })
        .catch((error) => {
          if(error.code === 'auth/email-already-in-use')
          this.errorMessage = 'The email address is already in use. Please try again.';
          else if(error.code === 'auth/invalid-email')
          this.errorMessage = 'The email address is not valid. Please try again.';
          else if(error.code === 'auth/weak-password')
          this.errorMessage = 'The password is too weak. Please try again.';
          else
          this.errorMessage = 'An error has occurred. Please try again later.';
          console.log(error);
        });
    }
    else if(this.email === '' || this.password === '' || this.rpassword === ''){
      this.errorMessage = 'Fields cannot be empty. Please try again.';
    }
    else if(this.password != this.rpassword){
      this.errorMessage = 'Passwords do not match. Please try again.';
    }
    
    else
    this.errorMessage = 'An error has occurred.';
  }
  
}
