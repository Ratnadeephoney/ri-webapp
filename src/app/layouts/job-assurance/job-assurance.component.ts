import { Component, OnInit, ViewEncapsulation, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd, NavigationStart } from '@angular/router';
import { ColorScssService } from '../../shared/service/color-scss.service';
import { DataStorageService } from '../../shared/service/data-storage.service';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackComponent } from '../../shared/components/pages/feedback/feedback.component';


@Component({
  selector: 'app-job-assurance',
  templateUrl: './job-assurance.component.html',
  styleUrls: ['./job-assurance.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobAssuranceComponent implements OnInit {


// faqs = [
//   {
//       faqId: 1, faqTitle: 'Should I pay money upfront?', isChecked: false,
//       answer: '<p>No. You do not need to pay any money upfront.</p>'
//   },
//   {
//       faqId: 2, faqTitle: 'Do I need to do an agreement?', isChecked: false,
//       answer: '<p>Yes. Rock Interview will do an Agreement.It will includes all the terms and Conditions. You will be asked to pay 18 % of the salary that is taken for a period of 9 months from the date of joining.</p>'
//   },
//   {
//       faqId: 3, faqTitle: 'Is it online or offline course?',
//       isChecked: false, answer: '<p>It is completely online.</p>'
//   },
//   {
//       faqId: 4, faqTitle: 'I lost my job or I change in the middle of an agreement?', isChecked: false,
//       answer: '<p>You do not need to pay after you loose the job while you are in the contract.If You change the job ,the contract will continue for the time mentioned.</p>'
//   },
//   {
//       faqId: 5, faqTitle: 'I have got a job offer from some other company without Rock Interview help, Should I still pay?', isChecked: false,
//       answer: "<p>You don't need to pay</p>"
//   },
//   {
//     faqId: 6, faqTitle: 'Timeframe?', isChecked: false,
//     answer: '<p>We will invest 8- 12 weeks of our time with you. Our Mentors and platform will work directly to you.</p>'
// },
// {
//   faqId: 7, faqTitle: 'Is the job permanent or contract?', isChecked: false,
//   answer: '<p>Both options can exist.</p>'
// },
// {
//   faqId: 8, faqTitle: 'Is it for everyone?', isChecked: false,
//   answer: '<p>No. We will review resume, assess and then take it forward.</p>'
// },
// ]

faqs = [
  {
      faqId: 1, faqTitle: 'What is my upfront cost?', isChecked: false,
      answer: '<p>There is no upfront cost for you.</p>'
  },
  {
      faqId: 2, faqTitle: 'What are my terms and conditions?', isChecked: false,
      answer: '<p>Rock Interview will take a flat 18% commission off your salary for the first 9-months after your employment.</p>'
  },
  {
      faqId: 3, faqTitle: 'Are my trainings online or offline?',
      isChecked: false, answer: '<p>Majority of your trainings will be online with may be a few offline basic trainings as needed.</p>'
  },
  {
      faqId: 4, faqTitle: 'What if I lose my job or change job during the first 9 months?', isChecked: false,
      answer: '<p>In the event you lose your job we will do everything to land your next job, but you are not expected to pay out the commission for the remainder of the term unless we find your next opportunity.If you change your job, the contract will continue for the remainder of the 9-month term.</p>'
  },
  {
      faqId: 5, faqTitle: 'What if I choose to honor a different job offer without Rock Interview’s help, should I still pay?', isChecked: false,
      answer: "<p>You don't need to pay if you take up an offer from another company prior to committing to the company recommended by Rock Interview</p>"
  },
  {
    faqId: 6, faqTitle: 'What is the timeframe for this program?', isChecked: false,
    answer: '<p>This will be a 8-12 weeks program where our Mentors and Platform will work directly with you on assessment, training, coaching and landing your dream job.</p>'
},
{
  faqId: 7, faqTitle: 'Is the job permanent or contract?', isChecked: false,
  answer: '<p>You may be presented with both options.</p>'
},
{
  faqId: 8, faqTitle: 'Can anyone join this program?', isChecked: false,
  answer: '<p>Any candidate who want to participate in this program will go through an internal assessment prior to entering the program formally.</p>'
},
]

expandedfaqId: any;
faqDescription: any;

  constructor(private route: ActivatedRoute,
    private title: Title,
    public colorPicker: ColorScssService,
    public dataStorage: DataStorageService,
    private location: Location, private router: Router,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private meta: Meta) {
    
     }

  ngOnInit() {
    this.title.setTitle(this.route.snapshot.data['title']);
    this.colorPicker.setColorScheme('color-2');
    this.updateTitle();
  }

  getfaqDescription(faqId) {
    if (faqId) {
        this.expandedfaqId = faqId;
    }
  }

  onLeaveMessageClick(){
    this.modalService.open(FeedbackComponent);
  }

  updateTitle() {
    let title = this.route.snapshot.data['title'];
    this.meta.addTag({ name: 'og:title', property: 'og:title', content: title });
    this.meta.addTag({ name: 'og:description', property: 'og:description', content: 'Rock Interview | Job Assurance Program' });
    
    this.meta.addTag({ name: 'twitter:title', property: 'twitter:title', content: title });
    this.meta.addTag({ name: 'twitter:description', property: 'twitter:description', content: 'Rock Interview | Job Assurance Program' });
  }

}
