import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessesTableComponent } from './components/processes-table/processes-table.component';
import { ProcessDetailComponent } from './components/process-detail/process-detail.component';
import { ProcessDataComponent } from './components/process-data/process-data.component';
import { DxButtonModule, DxDataGridModule, DxDateBoxModule, DxNumberBoxModule, DxPopupModule, DxSelectBoxModule, DxTagBoxModule, DxTextAreaModule, DxTextBoxModule, DxValidationGroupModule, DxValidatorModule } from 'devextreme-angular';
import { ShareModule } from '@src/app/share/share.module';
import { DxoHeaderFilterModule } from 'devextreme-angular/ui/nested';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProcessesTableComponent,
    ProcessDetailComponent,
    ProcessDataComponent
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
    DxoHeaderFilterModule,
    RouterModule,
  ],
  exports: [
    ProcessesTableComponent,
    ProcessDetailComponent
  ]
})
export class ProcessesModule { }
