import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModernComponent } from './modern/modern.component';

import { JobsComponent } from './jobs/jobs.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { InterviewerComponent } from './interviewer/interviewer.component';
import { TeamComponent } from './team/team.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CareersComponent } from './careers/careers.component';
import { FaqComponent } from './faq/faq.component';
import { DownloadEbookComponent } from './download-ebook/download-ebook.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { AcceptOfferComponent } from './accept-offer/accept-offer.component';
import { RejectOfferComponent } from './reject-offer/reject-offer.component';
import { MyAppHttpService } from '../shared/service/my-app-http.service';
import { JobseekerComponent } from './jobseeker/jobseeker.component';
import { JobseekerTrainingsComponent } from './jobseeker-trainings/jobseeker-trainings.component';
import { CareerOpportunitiesComponent } from './career-opportunities/career-opportunities.component';
import { JobseekerFaqComponent } from './jobseeker/jobseeker-faq/jobseeker-faq.component';
import { InterviewerFaqComponent } from './interviewer/interviewer-faq/interviewer-faq.component';
import { JobAssuranceComponent } from './job-assurance/job-assurance.component';
import { SetupInterviewComponent } from './setup-interview/setup-interview.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { InterviewsComponent } from './interviews/interviews.component';
import { CreateTrainingComponent } from './create-training/create-training.component';
import { HiringIdComponent } from './hiring-id/hiring-id.component';
import { JobDetailsNewComponent } from './job-details-new/job-details-new.component';
import { BecomeMentorComponent } from './interviewer/become-mentor/become-mentor.component';
import { BecomeMentorNewComponent } from './become-mentor/become-mentor-new.component';
import { MentorVerificationComponent } from './mentor-verification/mentor-verification.component';
import { TrainingDetailsComponent } from './training-details/training-details.component';
import { SettingsComponent } from './settings/settings.component';
import { MyVideosComponent } from './my-videos/my-videos.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { ChatComponent } from './chat/chat.component';
import { MentorsListComponent } from './mentors-list/mentors-list.component';
import { RefferalComponent } from './refferal/refferal.component';

const routes: Routes = [
  {
    path: '',
    component: ModernComponent,
    data: {
      title: "Rock Interview | The Career Transformation App"
    }
  },
  {
    // path: MyAppHttpService.PathInformation.JOBS.PATH.slice(1),
    path: 'jobs',
    component: JobsComponent,
    data: {
      title: "RockInterview | Jobs",
      // path: MyAppHttpService.PathInformation.JOBS
      path: { PATH: '/jobs', PAGE_NAME: 'Jobs'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.TRAININGS.PATH.slice(1),
    path: 'trainings',
    component: TrainingsComponent,
    data: {
      // title: "RockInterview | Trainings",
      title: "Learn directly from Rock Certified Mentor - Enjoy the power of Peer-to-Peer Learning!",
      // path: MyAppHttpService.PathInformation.TRAININGS
      path: {PATH: '/trainings', PAGE_NAME: 'Trainings'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.INTERVIEWER.PATH.slice(1),
    path: 'interviewer',
    component: InterviewerComponent,
    data: {
      title: "RockInterview | Interviewer",
      // path: MyAppHttpService.PathInformation.INTERVIEWER
      path: { PATH: '/interviewer', PAGE_NAME: 'Interviewer'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.COMPANY_TEAM.PATH.slice(1),
    path: 'company/team',
    component: TeamComponent,
    data: {
      title: "RockInterview | Team",
      // path: MyAppHttpService.PathInformation.COMPANY_TEAM
      path: {PATH: '/company/team', PAGE_NAME: 'Company / Team'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.CONTACT_US.PATH.slice(1),
    path: 'contact-us',
    component: ContactUsComponent,
    data: {
      title: "RockInterview | Contact-US",
      // path: MyAppHttpService.PathInformation.CONTACT_US
      path: { PATH: '/contact-us', PAGE_NAME: 'Contact'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.COMPANY_CAREERS.PATH.slice(1),
    path: 'company/careers',
    component: CareersComponent,
    data: {
      title: "RockInterview | Careers",
      // path: MyAppHttpService.PathInformation.COMPANY_CAREERS
      path: { PATH: '/company/careers', PAGE_NAME: 'Company / Careers'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.COMPANY_OPPORTUNITIES.PATH.slice(1),
    path: 'career-opportunities',
    component: CareerOpportunitiesComponent,
    data: {
      title: "RockInterview | Career Opportunities",
      // path: MyAppHttpService.PathInformation.COMPANY_OPPORTUNITIES
      path: { PATH: '/career-opportunities', PAGE_NAME: 'Company / Career Opportunities'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.COMPANY_FAQ.PATH.slice(1),
    path: 'company/faq',
    component: FaqComponent,
    data: {
      title: "RockInterview | FAQ",
      // path: MyAppHttpService.PathInformation.COMPANY_FAQ
      path: { PATH: '/company/faq', PAGE_NAME: 'Company / FAQ'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.JOBSEEKER_FAQ.PATH.slice(1),
    path: 'job-seeker/faqs',
    component: JobseekerFaqComponent,
    data: {
      title: "RockInterview | Job Seeker FAQ",
      // path: MyAppHttpService.PathInformation.JOBSEEKER_FAQ
      path: { PATH: '/job-seeker/faqs', PAGE_NAME: 'Job Seeker / FAQ'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.INTERVIEWER_FAQ.PATH.slice(1),
    path: 'interviewer/faq',
    component: InterviewerFaqComponent,
    data: {
      title: "RockInterview | Interviewer FAQ",
      // path: MyAppHttpService.PathInformation.INTERVIEWER_FAQ
      path: { PATH: '/interviewer/faq', PAGE_NAME: 'Interviewer / FAQ'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.DOWNLOAD_EBOOK.PATH.slice(1),
    path: 'download-ebook',
    component: DownloadEbookComponent,
    data: {
      title: "RockInterview | Download Ebook",
      // path: MyAppHttpService.PathInformation.DOWNLOAD_EBOOK
      path: { PATH: '/download-ebook', PAGE_NAME: 'Download EBook'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.TERMS.PATH.slice(1),
    path: 'terms',
    component: TermsAndConditionsComponent,
    data: {
      title: "RockInterview | Terms and Conditions",
      // path: MyAppHttpService.PathInformation.TERMS
      path: {PATH: '/terms', PAGE_NAME: 'Terms'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.ACCEPT_OFFER.PATH.slice(1),
    path: 'accept-offer',
    component: AcceptOfferComponent,
    data: {
      title: "RockInterview | Accept Offer",
      // path: MyAppHttpService.PathInformation.ACCEPT_OFFER
      path: { PATH: '/accept-offer', PAGE_NAME: 'Accept Offer'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.REJECT_OFFER.PATH.slice(1),
    path: 'reject-offer',
    component: RejectOfferComponent,
    data: {
      title: "RockInterview | Reject Offer",
      // path: MyAppHttpService.PathInformation.REJECT_OFFER
      path: {PATH: '/reject-offer', PAGE_NAME: 'Reject Offer'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.JOBSEEKER.PATH.slice(1),
    path: 'job-seeker',
    component: JobseekerComponent,
    data: {
      title: "RockInterview | Job Seeker",
      // path: MyAppHttpService.PathInformation.JOBSEEKER
      path: { PATH: '/job-seeker', PAGE_NAME: 'Job Seeker'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.JOBSEEKER_TRAININGS.PATH.slice(1),
    path: 'job-seeker/training',
    component: JobseekerTrainingsComponent,
    data: {
      title: "RockInterview | Job Seeker - Trainings",
      // path: MyAppHttpService.PathInformation.JOBSEEKER_TRAININGS
      path: { PATH: '/job-seeker/training', PAGE_NAME: 'Job Seeker / Trainings'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.JOB_ASSURANCE_PROGRAM.PATH.slice(1),
    path: 'job-assurance-program',
    component: JobAssuranceComponent,
    data: {
      title: "RockInterview | Job Assurance Program",
      // path: MyAppHttpService.PathInformation.JOB_ASSURANCE_PROGRAM
      path: {PATH: '/job-assurance-program', PAGE_NAME: 'Job Assurance Program'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.SETUP_INTERVIEW.PATH.slice(1),
    path: 'setup-interview',
    component: SetupInterviewComponent,
    data: {
      title: "RockInterview | Setup Interview",
      // path: MyAppHttpService.PathInformation.SETUP_INTERVIEW
      path: {PATH: '/setup-interview', PAGE_NAME: 'Setup Interview'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.MY_PROFILE.PATH.slice(1),
    path: 'my-profile',
    component: MyProfileComponent,
    data: {
      title: "RockInterview | My Profile",
      // path: MyAppHttpService.PathInformation.MY_PROFILE
      path: {PATH: '/my-profile', PAGE_NAME: 'My Profile'}
    }
  },
  {
    // path: `${MyAppHttpService.PathInformation.COMING_SOON.PATH.slice(1)}/:path`,
    path: 'coming-soon/:path',
    component: ComingSoonComponent,
    data: {
      title: "RockInterview | Coming Soon",
      // path: MyAppHttpService.PathInformation.COMING_SOON
      path: {PATH: '/coming-soon', PAGE_NAME: 'Coming Soon'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.INTERVIEWS.PATH.slice(1),
    path: 'interviews',
    component: InterviewsComponent,
    data: {
      title: "RockInterview | Interviews",
      // path: MyAppHttpService.PathInformation.INTERVIEWS
      path: {PATH: '/interviews', PAGE_NAME: 'Interviews'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.CREATE_TRAINING.PATH.slice(1),
    path: 'create-training',
    component: CreateTrainingComponent,
    data: {
      title: "RockInterview | Create Training",
      // path: MyAppHttpService.PathInformation.CREATE_TRAINING
      path: {PATH: '/create-training', PAGE_NAME: 'Create Training'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.EDIT_TRAINING.PATH.slice(1),
    path: 'edit-training',
    component: CreateTrainingComponent,
    data: {
      title: "RockInterview | Edit Training",
      // path: MyAppHttpService.PathInformation.EDIT_TRAINING
      path: {PATH: '/edit-training', PAGE_NAME: 'Edit Training'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.SETTINGS.PATH.slice(1),
    path: 'settings',
    component: SettingsComponent,
    data: {
      title: "RockInterview | Settings",
      // path: MyAppHttpService.PathInformation.SETTINGS
      path: {PATH: '/settings', PAGE_NAME: 'Settings'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.MY_VIDEOS.PATH.slice(1),
    path: 'my-videos',
    component: MyVideosComponent,
    data: {
      title: "RockInterview | My-videos",
      // path: MyAppHttpService.PathInformation.MY_VIDEOS
      path: {PATH: '/my-videos', PAGE_NAME: 'My-videos'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.HIRING_ID.PATH.slice(1),
    path: 'hiring-id',
    component: HiringIdComponent,
    data: {
      title: "RockInterview | Hiring Id",
      // path: MyAppHttpService.PathInformation.HIRING_ID
      path: {PATH: '/hiring-id', PAGE_NAME: 'Hiring Id'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.JOB_DETAILS.PATH.slice(1),
    path: 'job-details',
    component: JobDetailsNewComponent,
    data: {
      title: "RockInterview | Job Details",
      // path: MyAppHttpService.PathInformation.JOB_DETAILS
      path: { PATH: '/job-details', PAGE_NAME: 'Job Details'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.BECOME_A_MENTOR.PATH.slice(1),
    path: 'become-mentor-new',
    component: BecomeMentorNewComponent,
    data: {
      title: "RockInterview | Become a Mentor",
      // path: MyAppHttpService.PathInformation.BECOME_A_MENTOR
      path: { PATH: '/become-mentor-new', PAGE_NAME: 'Become Mentor'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.MENTOR_VERIFICATION.PATH.slice(1),
    path: 'mentor-verification',
    component: MentorVerificationComponent,
    data: {
      title: "RockInterview | Mentor Verification",
      // path: MyAppHttpService.PathInformation.MENTOR_VERIFICATION
      path: { PATH: '/mentor-verification', PAGE_NAME: 'Mentor Verification'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.TRAINING_DETAILS.PATH.slice(1) + '/:training_id/:user_type',
    path: 'training-details' + '/:training_id',
    component: TrainingDetailsComponent,
    data: {
      title: "RockInterview | Training Details",
      // path: MyAppHttpService.PathInformation.TRAINING_DETAILS + '/:training_id/:user_type'
      path: { PATH: '/training-details', PAGE_NAME: 'Training-details'} + '/:training_id'
    }
  },
  {
    // path: MyAppHttpService.PathInformation.BANK_DETAILS.PATH.slice(1),
    path: 'bank-details',
    component: BankDetailsComponent,
    data: {
      title: "RockInterview | Bank Details",
      // path: MyAppHttpService.PathInformation.BANK_DETAILS
      path: { PATH: '/bank-details', PAGE_NAME: 'bank details'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.CHAT.PATH.slice(1),
    path: 'chat',
    component: ChatComponent,
    data: {
      title: "RockInterview | Chat",
      // path: MyAppHttpService.PathInformation.CHAT
      path: { PATH: '/chat', PAGE_NAME: 'chat'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.CERTIFICATES.PATH.slice(1),
    path: 'certificates',
    component: CertificatesComponent,
    data: {
      title: "RockInterview | Certificate Details",
      // path: MyAppHttpService.PathInformation.CERTIFICATES
      path: { PATH: '/certificates', PAGE_NAME: 'certificate details'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.MENTORSLIST.PATH.slice(1),
    path: 'mentorslist',
    component: MentorsListComponent,
    data: {
      title: "RockInterview | Mentors List",
      // path: MyAppHttpService.PathInformation.MENTORSLIST
      path: { PATH: '/mentorslist', PAGE_NAME: 'mentors list'}
    }
  },
  {
    // path: MyAppHttpService.PathInformation.REFFERAL.PATH.slice(1),
     path : 'refferal',
     component:RefferalComponent,
     data: {
       title: "RockInterview | Refferal List",
      // path: MyAppHttpService.PathInformation.REFFERAL
      path : {PATH : '/refferal', PAGE_NAME : 'refferal list'}
     }
   },
  {
    path: '**',
    // redirectTo: '',
    component: ModernComponent,
    data: {
      title: "RockInterview | Page Not Found",
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
