import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthService } from './services/authorization/auth.service';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SignIn } from './components/signin/signin.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'signin', component: SignIn },
  { path: 'signup', component: SignupComponent }
  ];

@NgModule({
  declarations: [AppComponent, SignIn, SignupComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
     RouterModule.forRoot(routes)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}