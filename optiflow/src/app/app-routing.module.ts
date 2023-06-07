import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignIn } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { PageNotFoundComponent } from './share/components/page-not-found/page-not-found.component';
import { ProjectDataComponent } from './components/projects/components/project-data/project-data.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';

const routes: Routes = [
  { path: 'signin', component: SignIn },
  { path: 'signup', component: SignupComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'privacy', component: PrivacyPolicyComponent },
  {
    path: '',
    children: [
        {
            path: 'project',
            loadChildren: () => import('./components/projects/projects.module').then(m => m.ProjectsModule)
        },
        {
          path: 'create-project',
          component: ProjectDataComponent,
        },
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
