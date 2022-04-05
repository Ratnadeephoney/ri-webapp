import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataStorageService } from '../../../shared/service/data-storage.service';
import { Location } from '@angular/common';


@Component({
    selector: 'app-faq-section',
    templateUrl: './faq-section.component.html',
    styleUrls: ['./faq-section.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FaqSectionComponent implements OnInit, AfterViewInit {

    faqList = [
        {
            faqID: 'divJobSeeker',
            faqTitle: 'JOB SEEKER',
            faqs: [
                {
                    faqId: 1, faqTitle: 'I have never given a interview before. How does it work?', isChecked: false,
                    answer: '<p>A interview is a simulation of an actual job interview. Attending a interview gives the candidate a clear idea of the kind of questions that are most likely to be asked and allows them an opportunity to test out different ways of presenting their skills, work history and expectations. Think of it as a practice session that prepares you for the real interview.</p>'
                },
                {
                    faqId: 2, faqTitle: 'Who will I be interviewed by for my interview?', isChecked: false,
                    answer: '<p>Once you register on Rock Interview, your profile and other details get assessed by our unique program that analyses data using AI. Based on the analysis, you will be assigned a mentor who is an expert in the domains that you need help with. Both you and your mentor will be notified through the app and you can schedule a interview according to your convenience. You can also request for special attention to aspects of the interview process that you know to be needing improvement in.</p>'
                },
                {
                    faqId: 3, faqTitle: 'How do I know that the person interviewing/mentoring me is qualified enough for the task?',
                    isChecked: false, answer: '<p>All mentors that partner with Rock Interview are vetted and verified by a rigorous process that includes resume and profile verification, panel interview and social media verification. Every interviewer is rated by the candidate after each interview. This rating will be visible to you on the Rock Interview app.</p>'
                },
                {
                    faqId: 4, faqTitle: 'What do I do if I am unsatisfied with an interviewer/mentor? How do I address it?', isChecked: false,
                    answer: '<p>After every interview, you will be able to rate your mentor/interviewer based on your experience with him/her. This star-based review system records your feedback and takes the necessary steps based on the seriousness of the issue.</p>'
                },
                {
                    faqId: 5, faqTitle: 'How do I know if the feedback given by the mentor/interviewer is genuine?', isChecked: false,
                    answer: '<p>Interviews with Rock interview are recorded so that the candidate can review their performance afterward. You will also receive specific feedback from the interviewer on aspects of the interview process in a detailed assessment report that will be sent confidentially to your registered mail id.</p>'
                }
            ]
        },
        {
            faqID: 'divInterviewer',
            faqTitle: 'INTERVIEWER / MENTOR',
            faqs: [
                {
                    faqId: 6, faqTitle: 'How confidential is the process at Rock Interview? Will my current boss find out that I am preparing for an interview?',
                    isChecked: false, answer: '<p>No. Abouselty 100 % Protection on your data and no shared will be shared to anyone with your consent</p>'
                },
                {
                    faqId: 7, faqTitle: 'Can I be an interviewer with Rock Interview?', isChecked: false,
                    answer: '<p>Are you a working professional with significant experience in your field? Do you take joy in sharing your expertise to better other people’s career and improve the standards of the industry at large? Do you have a keen eye for what can make or break a decision in hiring? Are you willing to spare your time to guide young professionals in their search for the right attitude in today’s competitive job market? If you answered yes to most of these questions, you can be a mentor with Rock Interview.</p>'
                },
                {
                    faqId: 8, faqTitle: 'What are the eligibility requirements of a mentor at Rock Interview?', isChecked: false,
                    answer: '<ul><li>Real industry experience </li> <li>Verifiable professional accreditation</li> <li>Strong work profile </li> <li>Passion to mentor</li> </ul>'
                },
                {
                    faqId: 9, faqTitle: 'Is there a certain minimum years of experience needed to qualify as an interviewer?',
                    isChecked: false, answer: '<p>No, there’s no mandatory requirement. However we would recommend at least 5 to 10 years of experience.</p>'
                },
                {
                    faqId: 10, faqTitle: 'Are there any special rules or processes that I need to follow while conducting a interview?',
                    isChecked: false, answer: '<p>A interview follows the same processes as a regular job interview. The interviewer will have to prepare as he/she does for real one. You can take a look at this handy e-book by Rock Interview for a detailed step-by-step guide.</p>'
                },
                {
                    faqId: 11, faqTitle: 'How do I get paid for my services at Rock Interview?', isChecked: false,
                    answer: '<p>Once you finish conducting a interview , enter the necessary feedback on the app and send the feedback form - you will be paid instantly through electronic transfer or get vouchers ( We are flexible here ). You fee / Voucher will reflect on the account number given to us during the registration process within 3 to 5 bank working days.</p>'
                },
                {
                    faqId: 12, faqTitle: 'How do I know what my rating on Rock Interview is?', isChecked: false,
                    answer: '<p>On logging into the Rock Interview app, you will be able to see your personal rating on your dashboard. This rating (out of 5 stars) is given to you by the candidates you have interviewed, trained or helped in other ways.</p>'
                },
                {
                    faqId: 13, faqTitle: 'How can I improve my rating on Rock Interview?', isChecked: false,
                    answer: '<p>Mentors that partner with Rock Interview are rated based on their interviews by Jobseeker. RI as a platform will take the feedback from Jobseekers and post “ AS-IS”. If in case of any issues, you can check with Rock Interview.</p>'
                },
                {
                    faqId: 14, faqTitle: 'What do I do if I get rated unfairly by a candidate?', isChecked: false,
                    answer: '<p>RI will review with the whole process one more time and RI has completely authority to review – if the change is required</p>.'
                }
            ]
        },
        {
            faqID: 'divEnterprise',
            faqTitle: 'STAFFING AGENCIES / ENTERPRISES',
            faqs: [
                {
                    faqId: 15, faqTitle: 'What are the staffing solutions that Rock Interview offers?', isChecked: false,
                    answer: '<ul> <li>Chalk out the hiring approach</li> <li>Help build an interview panel</li> <li>Add value to the hiring process</li> <li>Outsource the hiring process completely</li> </ul>'
                },
                {
                    faqId: 16, faqTitle: 'How does Rock Interview serve the unique needs of a startup organisation?', isChecked: false,
                    answer: '<p>Rock Interview understands that startup organisations hire based on a completely different set of criteria. We help startups by:</p> <ul> <li>Chalking out hiring approaches that support lean models</li> <li>Screening candidates based on their approach to the startup culture</li> <li>Helping you hire recruits directly from the app</li> <li>Providing a cost-effective and hassle-free hiring process</li> </ul>'
                }
            ]
        }
    ];

    expandedfaqId: any;
    faqDescription: any;

    constructor(public dataStorage: DataStorageService, private route: ActivatedRoute, private location: Location) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.route.queryParams.subscribe(params => {
                if (params.section) {
                   this.sectionScroll(params.section);
                }
                else{
                    this.route.fragment.subscribe((fragment: string) => {
                        if(fragment == 'interviewer-mentor'){
                            this.sectionScroll('divInterviewer');
                        }
                        else if(fragment == 'jobseeker-faq'){
                            this.sectionScroll('divJobSeeker');
                        }
                      })
                }
    
            });
        }, 200);
      
    }

    sectionScroll(section){
        const element = document.getElementById(section) as HTMLInputElement;
        if (!!element)
            element.scrollIntoView({ behavior: 'smooth' });

    this.location.replaceState(this.dataStorage.globalPathInformation.COMPANY_FAQ.PATH);
    }

    getfaqDescription(faqId) {
        if (faqId) {
            this.expandedfaqId = faqId;
            // this.careerOpportunities.forEach(element => {
            //     element.faqs.filter(x => x.faqId != faqId).map(y => y.isChecked = false);
            // });
            // this.faqDescription = 'this is faq description of '+ faqId;
        }
    }

}
