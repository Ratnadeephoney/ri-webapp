import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { CommonService } from './shared/service/common.service';
import { SendReceiveService } from './shared/service/send-receive.service';
import { WebsocketService } from './shared/service/WebSocket.service';
import { LayoutsModule } from './layouts/layouts.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { SharedModule } from './shared/shared.module';
import { NgOtpInputModule } from 'ng-otp-input';
import { RouterModule } from '@angular/router';
import { AppTranslateModule } from './app-translate.module';
// import { CarouselModule } from 'ngx-owl-carousel-o';
import { AvatarFilter } from './shared/pipes/avtar';
import { LayoutsRoutingModule } from './layouts/layouts-routing.module';
import { AppServerModule } from './app.server.module';
//import { TooltipModule } from 'ng2-tooltip-directive';
//import {myRoutings} from './app-routing.module'

declare module "@angular/core" {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers?: Provider[];
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    //myRoutings
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    //TooltipModule,
    // TranslateService,
    ToastrModule.forRoot({
      positionClass :'toast-top-right'
    }),
    TranslateModule.forRoot(),
    BrowserAnimationsModule,
    LayoutsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    SharedModule,
    NgOtpInputModule,
    RouterModule.forRoot(routes, { useHash: false, anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
    AppTranslateModule,
    LayoutsRoutingModule,
    // CarouselModule
    // NgbModule,
    // AppServerModule
  ],
  providers: [TranslateService, TranslateStore, CommonService, SendReceiveService, WebsocketService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LdcV-kUAAAAAF3e61JkIRdTX5AZZtt2hMKm0rEM',
      } as RecaptchaSettings,
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
