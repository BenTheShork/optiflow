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
import { HeaderComponent } from './components/header/header.component';
import { DefaultPhotoDirective } from './directives/default-photo.directive';
import { ProjectsOverviewComponent } from './components/projects-overview/projects-overview.component';
import { FooterComponent } from './components/footer/footer.component';
import { DxDataGridModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'signin', component: SignIn },
  { path: 'signup', component: SignupComponent },
  {
    path: 'projects',
    component: ProjectsOverviewComponent
  }
];

@NgModule({
  declarations: [AppComponent, SignIn, SignupComponent, HeaderComponent, DefaultPhotoDirective, ProjectsOverviewComponent, FooterComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    DxDataGridModule,
    HttpClientModule,
     RouterModule.forRoot(routes)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}