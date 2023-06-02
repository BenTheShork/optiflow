import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityTableComponent } from './activity-table/activity-table.component';
import { ShareModule } from '@src/app/share/share.module';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxTextBoxModule, DxTextAreaModule, DxSelectBoxModule, DxValidatorModule, DxDateBoxModule, DxTagBoxModule, DxNumberBoxModule, DxValidationGroupModule } from 'devextreme-angular';



@NgModule({
  declarations: [ActivityTableComponent],
  imports: [
    CommonModule,
    ShareModule,
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
  ],
  exports: [
    ActivityTableComponent
  ]
})
export class ActivitiesModule { }
