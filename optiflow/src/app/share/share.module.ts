import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { DefaultPhotoDirective } from './directives/default-photo.directive';
import { FooterComponent } from './components/footer/footer.component';
import { ConfirmationPopupComponent } from './components/confirmation-popup/confirmation-popup.component';
import { DxButtonModule, DxPopupModule, DxProgressBarModule } from 'devextreme-angular';
import { RouterModule } from '@angular/router';
import { StatusMessagePipe } from './pipes/status-message.pipe';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';



@NgModule({
  declarations: [HeaderComponent, DefaultPhotoDirective, FooterComponent, ConfirmationPopupComponent, StatusMessagePipe, PageNotFoundComponent],
  imports: [
    CommonModule,
    DxPopupModule,
    DxButtonModule,
    RouterModule,
    DxProgressBarModule
  ],
  exports: [
    HeaderComponent, 
    DefaultPhotoDirective, 
    FooterComponent, 
    ConfirmationPopupComponent,
    StatusMessagePipe,
    PageNotFoundComponent
  ]
})
export class ShareModule { }
