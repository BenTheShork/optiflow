import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VersionDetailComponent } from './components/version-detail/version-detail.component';
import { VersionDataComponent } from './components/version-data/version-data.component';
import { VersionsTableComponent } from './components/versions-table/versions-table.component';
import { ShareModule } from '@src/app/share/share.module';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxTextBoxModule, DxTextAreaModule, DxSelectBoxModule, DxValidatorModule, DxDateBoxModule, DxTagBoxModule, DxNumberBoxModule, DxValidationGroupModule } from 'devextreme-angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    VersionDetailComponent,
    VersionDataComponent,
    VersionsTableComponent
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
    ShareModule,
    RouterModule
  ],
  exports: [
    VersionsTableComponent
  ]
})
export class VersionsModule { }
