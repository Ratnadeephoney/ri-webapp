import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/navigation/menu/menu.component';
import { TapToTopComponent } from './components/tap-to-top/tap-to-top.component';
import { HeaderComponent } from './components/pages/header/header.component';
import { BreadcrumbComponent } from './components/pages/breadcrumb/breadcrumb.component';
import { FooterComponent } from './components/pages/footer/footer.component';
import { RouterModule } from '@angular/router';
import { CenterMenuComponent } from './components/navigation/center-menu/center-menu.component';
import { ToastrModule } from 'ngx-toastr';
import { OrderByPipe } from './pipes/order-by.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { AppMoreInfoComponent } from './components/pages/more-info/more-info.component';
import { FeedbackComponent } from './components/pages/feedback/feedback.component';
import { DownloadAppComponent } from './components/pages/download-app/download-app.component';
import { DetailedFooterComponent } from './components/pages/detailed-footer/detailed-footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { VideoSectionComponent } from './components/pages/video-section/video-section.component';
import { RecaptchaFormsModule, RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { FeedbackPopupComponent } from './components/pages/feedback-popup/feedback-popup.component';
import { JODModalComponent } from './components/pages/jod-modal/jod-modal.component';
import { LaunchPopupComponent } from './components/pages/launch-popup/launch-popup.component';
import { UserLoginComponent } from './components/pages/user-login/user-login.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { UserRegistrationComponent } from './components/pages/user-registration/user-registration.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthorizeLayoutComponent } from './components/layouts/authorize-layout/authorize-layout.component';
import { ConfirmationPopupComponent } from './components/pages/confirmation-popup/confirmation-popup.component';
import { RegisteredTrainingUsersComponent } from './components/pages/registered-training-users/registered-training-users.component';
import { AvatarFilter } from './pipes/avtar';

declare module "@angular/core" {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers?: Provider[];
  }
}

@NgModule({
  declarations: [MenuComponent, TapToTopComponent,HeaderComponent,BreadcrumbComponent,FooterComponent, CenterMenuComponent,
    OrderByPipe, LoaderComponent, AppMoreInfoComponent, FeedbackComponent, DownloadAppComponent, DetailedFooterComponent
   ,VideoSectionComponent, FeedbackPopupComponent, JODModalComponent, UserLoginComponent, UserRegistrationComponent, 
   LaunchPopupComponent
   ,AuthorizeLayoutComponent,
   ConfirmationPopupComponent,
   RegisteredTrainingUsersComponent, AvatarFilter
  ],
  exports:[
    MenuComponent,
    LoaderComponent,
    CenterMenuComponent,
    TapToTopComponent,
    HeaderComponent,
    BreadcrumbComponent,
    FooterComponent,
    AppMoreInfoComponent,
    FeedbackComponent,
    OrderByPipe,
    AvatarFilter,
    DownloadAppComponent,
    DetailedFooterComponent,
    VideoSectionComponent,
    FeedbackPopupComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    LaunchPopupComponent,
    JODModalComponent,
    AuthorizeLayoutComponent,
    ConfirmationPopupComponent,
    RegisteredTrainingUsersComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    NgOtpInputModule,
    NgSelectModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LdcV-kUAAAAAF3e61JkIRdTX5AZZtt2hMKm0rEM',
      } as RecaptchaSettings,
    }],
})
export class SharedModule { }
