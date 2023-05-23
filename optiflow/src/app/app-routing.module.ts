import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignIn } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProjectsOverviewComponent } from './components/projects-overview/projects-overview.component';

const routes: Routes = [
  { path: 'signin', component: SignIn },
  { path: 'signup', component: SignupComponent },
  {
    path: 'projects',
    component: ProjectsOverviewComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
