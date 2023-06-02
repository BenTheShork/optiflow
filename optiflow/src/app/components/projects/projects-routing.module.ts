import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsOverviewComponent } from './components/projects-overview/projects-overview.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { ProcessDetailComponent } from '../processes/components/process-detail/process-detail.component';
import { VersionDetailComponent } from '../versions/components/version-detail/version-detail.component';
import { ProjectDataComponent } from './components/project-data/project-data.component';

const projectRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: ProjectsOverviewComponent,
            },
            {
                path: ':id',
                component: ProjectDetailComponent,
            },
            {
                path: ':id/:processId',
                component: ProcessDetailComponent,
            },
            {
                path: ':id/:processId/:versionId',
                component: VersionDetailComponent,
            }
        ]
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(projectRoutes)
  ],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
