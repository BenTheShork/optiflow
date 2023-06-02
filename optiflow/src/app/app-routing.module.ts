import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignIn } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { PageNotFoundComponent } from './share/components/page-not-found/page-not-found.component';
import { ProjectDataComponent } from './components/projects/components/project-data/project-data.component';
import { ProcessDataComponent } from './components/processes/components/process-data/process-data.component';
import { VersionDataComponent } from './components/versions/components/version-data/version-data.component';

const routes: Routes = [
  { path: 'signin', component: SignIn },
  { path: 'signup', component: SignupComponent },
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
        {
          path: 'create-process',
          component: ProcessDataComponent,
        },
        {
          path: 'create-version',
          component: VersionDataComponent,
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
