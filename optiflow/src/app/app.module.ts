import { NgModule,APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SignIn } from './components/signin/signin.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { DxButtonModule, DxDataGridModule, DxDateBoxModule, DxNumberBoxModule, DxSelectBoxModule, DxTagBoxModule, DxTextAreaModule, DxTextBoxModule, DxValidationGroupModule, DxValidatorModule } from 'devextreme-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { ShareModule } from './share/share.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageService } from './share/services/language.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export const setupLanguageFactory = (service: LanguageService) => service.initialize();

@NgModule({
  declarations: [AppComponent, SignIn, SignupComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    DxDataGridModule,
    DxButtonModule,
    DxTextBoxModule,
    DxTextAreaModule,
    DxSelectBoxModule,
    DxValidatorModule,
    DxDateBoxModule,
    DxTagBoxModule,
    DxNumberBoxModule,
    HttpClientModule,
    DxValidationGroupModule,
    AppRoutingModule,
    CommonModule,
    ShareModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
  }),
  ],
  providers: [
    AuthService,
    { provide: LOCALE_ID, deps: [LanguageService], useFactory: setupLanguageFactory }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}