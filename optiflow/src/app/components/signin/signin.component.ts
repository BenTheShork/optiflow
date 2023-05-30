import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '@src/app/authorization/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
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
    './signin.component.scss',

  ]
})
export class SignIn implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // Define a variable to hold the error message

  constructor(public authService: AuthService) { }

  ngOnInit() { }

  login() {
    this.authService.signin(this.email, this.password)
      .then((userCredential) => {
        console.log('You have been successfully logged in!');
        // Do something with the userCredential if needed
      })
      .catch((error) => {
        console.log(error);
        if(this.email === '' || this.password === '')
        this.errorMessage = 'Fields cannot be empty. Please try again.';
        else if(error.code === 'auth/user-not-found')
        this.errorMessage = 'Login or password are incorrect. Please try again.';
        else if(error.code === 'auth/invalid-email')
        this.errorMessage = 'The email address is not valid. Please try again.';
        else if(error.code === 'auth/user-disabled')
        this.errorMessage = 'This account has been disabled. Please contact the administrator.';
        else
        this.errorMessage = 'An error has occurred. Please try again later.';
      });
  }
  
  // This function checks if a form control has been touched or submitted and if it is invalid, it shows the error message.
  isInvalid(controlName: string, form: NgForm) {
    return form.form.get(controlName)?.touched && form.form.get(controlName)?.invalid;
  }
}
