import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsRoutingModule } from './layouts-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module'
// import { CountToModule } from 'angular-count-to';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { AngularTiltModule } from 'angular-tilt';
// import 'hammerjs';
import 'mousetrap';
// import { ScrollToModule } from 'ng2-scroll-to-el';
// import { MasonryGalleryModule } from 'ngx-masonry-gallery';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPayPalModule } from 'ngx-paypal';
import { Ng5SliderModule } from 'ng5-slider';


// Modern Layout
import { ModernComponent } from './modern/modern.component';
import { ModernNavComponent } from './modern/modern-nav/modern-nav.component';
import { ModernHeaderComponent } from './modern/modern-header/modern-header.component';
import { ModernServicesComponent } from './modern/modern-services/modern-services.component';
import { ModernAboutComponent } from './modern/modern-about/modern-about.component';
import { ModernFunctionComponent } from './modern/modern-function/modern-function.component';
import { ModernTeamComponent } from './modern/modern-team/modern-team.component';
import { ModernScreenshotsComponent } from './modern/modern-screenshots/modern-screenshots.component';
import { ModernTeamMemberComponent } from './modern/modern-team-member/modern-team-member.component';
import { ModernPricingComponent } from './modern/modern-pricing/modern-pricing.component';
import { ModernBrandComponent } from './modern/modern-brand/modern-brand.component';
import { ModernSubscribeComponent } from './modern/modern-subscribe/modern-subscribe.component';
import { ModernFooterComponent } from './modern/modern-footer/modern-footer.component';

import { NgxMasonryModule } from 'ngx-masonry';
import { ModernAboutOtherComponent } from './modern/modern-about-other/modern-about-other.component';
import { TypeaheadModule } from 'ngx-type-ahead';
import { NgSelectModule } from '@ng-select/ng-select';
import { JobsComponent } from './jobs/jobs.component';
import { HeaderTemplateComponent } from './modern/modern-header/header-template/header-template.component';
import { NgxPaginationModule } from "ngx-pagination";
import { ModernHeaderJobsComponent } from './modern/modern-header-jobs/modern-header-jobs.component';
import { ModernHeaderTrainingsComponent } from './modern/modern-header-trainings/modern-header-trainings.component';
import { ModernHeaderProfilesComponent } from './modern/modern-header-profiles/modern-header-profiles.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { InterviewerComponent } from './interviewer/interviewer.component';
import { InterviewerBannerComponent } from './interviewer/interviewer-banner/interviewer-banner.component';
import { BecomeMentorComponent } from './interviewer/become-mentor/become-mentor.component';
import { InterviewerReadFAQComponent } from './interviewer/interviewer-read-faq/interviewer-read-faq.component';
import { PeerRatingComponent } from './interviewer/peer-rating/peer-rating.component';
import { TeamComponent } from './team/team.component';
import { TeamHeaderComponent } from './team/team-header/team-header.component';
import { TeamAboutComponent } from './team/team-about/team-about.component';
import { ModernEBookComponent } from './modern/modern-ebook/modern-ebook.component';
import { ModernTestimonialComponent } from './modern/modern-testimonial/modern-testimonial.component';
import { ModernBlogComponent } from './modern/modern-blog/modern-blog.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ContactUsHeaderComponent } from './contact-us/contact-us-header/contact-us-header.component';
import { ContactUsFormComponent } from './contact-us/contact-us-form/contact-us-form.component';
import { ContactUsInfoComponent } from './contact-us/contact-us-info/contact-us-info.component';
import { CareersHeaderComponent } from './careers/careers-header/careers-header.component';
import { CareersComponent } from './careers/careers.component';
import { FaqComponent } from './faq/faq.component';
import { CareersOpenPositionsComponent } from './careers/careers-open-positions/careers-open-positions.component';
import { FaqHeaderComponent } from './faq/faq-header/faq-header.component';
import { FaqSectionComponent } from './faq/faq-section/faq-section.component';
import { JobsHeaderComponent } from './jobs/jobs-header/jobs-header.component';
import { TrainingsHeaderComponent } from './trainings/trainings-header/trainings-header.component';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaFormsModule } from 'ng-recaptcha';
import { DownloadEbookComponent } from './download-ebook/download-ebook.component';
import { DownloadEbookHeaderComponent } from './download-ebook/download-ebook-header/download-ebook-header.component';
import { DownloadEbookBodyComponent } from './download-ebook/download-ebook-body/download-ebook-body.component';
import { TranslateModule } from '@ngx-translate/core';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { TermsAndConditionsHeaderComponent } from './terms-and-conditions/terms-and-conditions-header/terms-and-conditions-header.component';
import { TermsAndConditionsBodyComponent } from './terms-and-conditions/terms-and-conditions-body/terms-and-conditions-body.component';
import { AcceptOfferComponent } from './accept-offer/accept-offer.component';
import { RejectOfferComponent } from './reject-offer/reject-offer.component';
import { OfferHeaderComponent } from './accept-offer/offer-header/offer-header.component';
import { OfferTrasactionComponent } from './accept-offer/offer-transaction/offer-transaction.component';
import { JobseekerComponent } from './jobseeker/jobseeker.component';
import { JobseekerBannerComponent } from './jobseeker/jobseeker-banner/jobseeker-banner.component';
import { JobseekerBookMockInterviewComponent } from './jobseeker/jobseeker-book-mock-interview/jobseeker-book-mock-interview.component';
import { JobseekerLearnMoreComponent } from './jobseeker/jobseeker-learn-more/jobseeker-learn-more.component';
import { JobseekerLoveRiComponent } from './jobseeker/jobseeker-love-ri/jobseeker-love-ri.component';
import { JobseekerAssessmentsComponent } from './jobseeker/jobseeker-assessments/jobseeker-assessments.component';
import { JobseekerTrainingsComponent } from './jobseeker-trainings/jobseeker-trainings.component';
import { JobseekerTrainingsBannerComponent } from './jobseeker-trainings/jobseeker-trainings-banner/jobseeker-trainings-banner.component';
import { JobseekerTrainingsBodyComponent } from './jobseeker-trainings/jobseeker-trainings-body/jobseeker-trainings-body.component';
import { JobseekerTrainingsWorksComponent } from './jobseeker-trainings/jobseeker-trainings-works/jobseeker-trainings-works.component';
import { JobseekerTrainingsGetTouchComponent } from './jobseeker-trainings/jobseeker-trainings-get-touch/jobseeker-trainings-get-touch.component';
import { CareerOpportunitiesComponent } from './career-opportunities/career-opportunities.component';
import { OpportunityDetailsComponent } from './career-opportunities/careers-opportunities/opportunity-details.component';
import { JobseekerFaqComponent } from './jobseeker/jobseeker-faq/jobseeker-faq.component';
import { InterviewerFaqComponent } from './interviewer/interviewer-faq/interviewer-faq.component';
import { JobAssuranceComponent } from './job-assurance/job-assurance.component';
import { SetupInterviewComponent } from './setup-interview/setup-interview.component';
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { InterviewsComponent } from './interviews/interviews.component';
import { IntFeedbackComponent } from './interviews/int-feedback/int-feedback.component';
import { JSFeedbackComponent } from './interviews/js-feedback/js-feedback.component';
import { DownloadReportsComponent } from './interviews/download-reports/download-reports.component';
import { CreateTrainingComponent } from './create-training/create-training.component';
import { HiringIdComponent } from './hiring-id/hiring-id.component';
import { JobDetailsComponent } from './jobs/job-details/job-details.component';
import { JobDetailsNewComponent } from './job-details-new/job-details-new.component';
import { BecomeMentorNewComponent } from './become-mentor/become-mentor-new.component';
import { MentorVerificationComponent } from './mentor-verification/mentor-verification.component';
import { AlertCompComponent } from './alert-comp/alert-comp.component';
import { TrainingShareComponent } from './trainings/training-share/training-share.component';
import { TrainingDetailsComponent } from './training-details/training-details.component';
import { SettingsComponent } from './settings/settings.component';
import { MyVideosComponent } from './my-videos/my-videos.component';
import { VideoProfilesComponent } from './my-videos/video-profiles/video-profiles.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { ChatComponent } from './chat/chat.component';
import { UserDetailsComponent } from './chat/user-details/user-details.component';
import { ToscheduleInterviewComponent } from './jobs/toschedule-interview/toschedule-interview.component';
import { Meta } from '@angular/platform-browser';
import { LaunchPopupComponent } from '../shared/components/pages/launch-popup/launch-popup.component';
import { UserLoginComponent } from '../shared/components/pages/user-login/user-login.component';
import { MentorsListComponent } from './mentors-list/mentors-list.component';
import { FeedbackComponent } from '../shared/components/pages/feedback/feedback.component';
import { ConfirmationPopupComponent } from '../shared/components/pages/confirmation-popup/confirmation-popup.component';
import { FeedbackPopupComponent } from '../shared/components/pages/feedback-popup/feedback-popup.component';
import { DownloadAppComponent } from '../shared/components/pages/download-app/download-app.component';
import { VideoSectionComponent } from '../shared/components/pages/video-section/video-section.component';
import { RegisteredTrainingUsersComponent } from '../shared/components/pages/registered-training-users/registered-training-users.component';
import { ToastrModule } from 'ngx-toastr';
import { RefferalComponent } from './refferal/refferal.component';
import { AddrefferaluserComponent } from './refferal/addrefferaluser/addrefferaluser.component';
import { GivefeedbackComponent } from './refferal/givefeedback/givefeedback.component';
import { ViewfeedbackComponent } from './refferal/viewfeedback/viewfeedback.component';
import {MeterialModule} from '../meterial/meterial.module';
import {PopoverModule} from "ngx-smart-popover";



declare module "@angular/core" {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers?: Provider[];
  }
}

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {};

@NgModule({
  declarations: [
   ModernComponent, ModernNavComponent, ModernHeaderComponent,
    ModernServicesComponent, ModernAboutComponent, ModernAboutOtherComponent, ModernFunctionComponent, ModernTeamComponent,
    ModernScreenshotsComponent, ModernTeamMemberComponent, ModernPricingComponent, ModernBrandComponent, ModernSubscribeComponent,
    ModernFooterComponent,
    JobsComponent, HeaderTemplateComponent, ModernHeaderJobsComponent, ModernHeaderTrainingsComponent, ModernHeaderProfilesComponent,
    TrainingsComponent, InterviewerComponent, InterviewerBannerComponent, BecomeMentorComponent, InterviewerReadFAQComponent,
    PeerRatingComponent,
    ModernEBookComponent, ModernTestimonialComponent, ModernBlogComponent,
    ContactUsComponent, ContactUsHeaderComponent, ContactUsFormComponent, ContactUsInfoComponent
    ,TeamAboutComponent, TeamHeaderComponent, TeamComponent,
    CareersComponent, CareersHeaderComponent, CareersOpenPositionsComponent,
    CareerOpportunitiesComponent, OpportunityDetailsComponent,
    FaqComponent, FaqHeaderComponent, FaqSectionComponent,
    JobsHeaderComponent, TrainingsHeaderComponent,
    DownloadEbookComponent, DownloadEbookHeaderComponent, DownloadEbookBodyComponent,
    TermsAndConditionsComponent, TermsAndConditionsHeaderComponent, TermsAndConditionsBodyComponent,
    AcceptOfferComponent, RejectOfferComponent, OfferHeaderComponent, OfferTrasactionComponent,
    JobseekerComponent, JobseekerBannerComponent, JobseekerBookMockInterviewComponent, 
    JobseekerLearnMoreComponent,
    JobseekerLoveRiComponent, JobseekerAssessmentsComponent,
    JobseekerTrainingsComponent, JobseekerTrainingsBannerComponent, JobseekerTrainingsBodyComponent, JobseekerTrainingsWorksComponent,
    JobseekerTrainingsGetTouchComponent, JobseekerFaqComponent, InterviewerFaqComponent,
    JobAssuranceComponent,
    SetupInterviewComponent,
    MyProfileComponent,
    HiringIdComponent,
    MentorsListComponent,
    ComingSoonComponent,
    InterviewsComponent, IntFeedbackComponent, JSFeedbackComponent, DownloadReportsComponent, TrainingShareComponent,
    CreateTrainingComponent, JobDetailsComponent, JobDetailsNewComponent, BecomeMentorNewComponent, MentorVerificationComponent, 
    AlertCompComponent, TrainingDetailsComponent, SettingsComponent,MyVideosComponent, VideoProfilesComponent, 
    BankDetailsComponent, CertificatesComponent, ChatComponent, UserDetailsComponent, ToscheduleInterviewComponent, RefferalComponent, AddrefferaluserComponent, GivefeedbackComponent, ViewfeedbackComponent
  ],

  imports: [
    CommonModule,
    LayoutsRoutingModule,
    SwiperModule,
    CarouselModule,
    NgbModule,
    GalleryModule.forRoot(),
    SharedModule,
    // CountToModule,
    AngularTiltModule,
    // ScrollToModule.forRoot(),
    // MasonryGalleryModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPayPalModule,
    Ng5SliderModule,
    NgxMasonryModule,
    TypeaheadModule,
    NgSelectModule,
    NgxPaginationModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    NgxPaginationModule,
    TranslateModule,
    MeterialModule,
    PopoverModule,
    
    // OwlDateTimeModule,
    // OwlNativeDateTimeModule
    ToastrModule.forRoot({
      positionClass :'toast-top-right'
    }),
  ],

  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents: [LaunchPopupComponent, UserLoginComponent, JobDetailsComponent, FeedbackComponent, ConfirmationPopupComponent, 
  FeedbackPopupComponent, DownloadAppComponent, VideoSectionComponent, AlertCompComponent, RegisteredTrainingUsersComponent,
  UserDetailsComponent, IntFeedbackComponent, JSFeedbackComponent, ToscheduleInterviewComponent, VideoProfilesComponent,
  TrainingShareComponent, RefferalComponent, AddrefferaluserComponent, ViewfeedbackComponent, GivefeedbackComponent
],
  providers: [Meta,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LdcV-kUAAAAAF3e61JkIRdTX5AZZtt2hMKm0rEM',
      } as RecaptchaSettings,
    }
  ]
})

export class LayoutsModule { }
