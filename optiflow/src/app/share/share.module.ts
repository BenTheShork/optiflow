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
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [HeaderComponent, DefaultPhotoDirective, FooterComponent, ConfirmationPopupComponent, StatusMessagePipe, PageNotFoundComponent],
  imports: [
    CommonModule,
    DxPopupModule,
    DxButtonModule,
    FormsModule,
    RouterModule,
    DxProgressBarModule,
    TranslateModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
      maxOpened: 5,
      toastClass: '',
      iconClasses: {
          success: 'alert alert--success',
          error: 'alert alert--danger',
          info: 'alert alert--info',
          warning: 'alert alert--warning',
      },
      // individual
      closeButton: false,
      tapToDismiss: true,
      progressBar: true,
      preventDuplicates: true
  }),
  ],
  exports: [
    HeaderComponent, 
    DefaultPhotoDirective, 
    FooterComponent, 
    ConfirmationPopupComponent,
    StatusMessagePipe,
    PageNotFoundComponent,
    TranslateModule,
  ]
})
export class ShareModule { }
