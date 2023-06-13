import { NgModule,APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SignIn } from './components/signin/signin.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { DxButtonModule, DxChartModule, DxDataGridModule, DxDateBoxModule, DxNumberBoxModule, DxPieChartModule, DxSelectBoxModule, DxTagBoxModule, DxTextAreaModule, DxTextBoxModule, DxValidationGroupModule, DxValidatorModule } from 'devextreme-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { ShareModule } from './share/share.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageService } from './share/services/language.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { ActivityLogComponent } from './components/activity-log/activity-log.component';
import { BpmnModelerComponent } from './components/bpmn-modeler/bpmn-modeler.component';
import { InsightsOverviewComponent } from './components/insights-overview/insights-overview.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export const setupLanguageFactory = (service: LanguageService) => service.initialize();

@NgModule({
  declarations: [AppComponent, SignIn, SignupComponent, AboutUsComponent, PrivacyPolicyComponent, ActivityLogComponent, BpmnModelerComponent, InsightsOverviewComponent],
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
    DxPieChartModule,
    DxNumberBoxModule,
    DxChartModule,
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

platformBrowserDynamic().bootstrapModule(AppModule);