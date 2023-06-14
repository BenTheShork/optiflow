import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule, DxDataGridModule, DxDateBoxModule, DxNumberBoxModule, DxPopupModule, DxSelectBoxModule, DxTagBoxModule, DxTextAreaModule, DxTextBoxModule, DxValidationGroupModule, DxValidatorModule } from 'devextreme-angular';
import { ProjectDataComponent } from './components/project-data/project-data.component';
import { ProjectsOverviewComponent } from './components/projects-overview/projects-overview.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { AppModule } from '@src/app/app.module';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProjectRoutingModule } from './projects-routing.module';
import { ShareModule } from '@src/app/share/share.module';
import { ProcessesModule } from '../processes/processes.module';



@NgModule({
  declarations: [
    ProjectDataComponent,
    ProjectDetailComponent,
    ProjectsOverviewComponent
  ],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxTextBoxModule,
    DxTextAreaModule,
    DxSelectBoxModule,
    DxValidatorModule,
    DxDateBoxModule,
    DxTagBoxModule,
    DxNumberBoxModule,
    DxValidationGroupModule,
    RouterModule,
    ProjectRoutingModule,
    ShareModule,
    ProcessesModule
  ],
  exports: [
    ProjectDataComponent,
    ProjectDetailComponent,
    ProjectsOverviewComponent
  ]
})
export class ProjectsModule { }
