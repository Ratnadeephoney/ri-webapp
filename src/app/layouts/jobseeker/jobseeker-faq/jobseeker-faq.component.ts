import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataStorageService } from '../../../shared/service/data-storage.service';

@Component({
    selector: 'app-jobseeker-faq',
    templateUrl: './jobseeker-faq.component.html',
    styleUrls: ['./jobseeker-faq.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class JobseekerFaqComponent implements OnInit {

    expandedfaqId;
    
    faqList = [
        {
            faqID: 'divJobSeeker',
            faqTitle: 'JOB SEEKER',
            faqs: [
                {
                    faqId: 1, faqTitle: 'I have never given a mock interview before. How does it work?', isChecked: false,
                    answer: '<p>A mock interview is a simulation of an actual job interview. Attending a mock interview gives the candidate a clear idea of the kind of questions that are most likely to be asked and allows them an opportunity to test out different ways of presenting their skills, work history and expectations. Think of it as a practice session that prepares you for the real interview.</p>'
                },
                {
                    faqId: 2, faqTitle: 'Who will I be interviewed by for my mock interview?', isChecked: false,
                    answer: '<p>Once you register on Rock Interview, your profile and other details get assessed by our unique program that analyses data using AI. Based on the analysis, you will be assigned a mentor who is an expert in the domains that you need help with. Both you and your mentor will be notified through the app and you can schedule a mock interview according to your convenience. You can also request for special attention to aspects of the interview process that you know to be needing improvement in.</p>'
                },
                {
                    faqId: 3, faqTitle: 'How do I know that the person interviewing/mentoring me is qualified enough for the task?',
                    isChecked: false, answer: '<p>All mentors that partner with Rock Interview are vetted and verified by a rigorous process that includes resume and profile verification, panel interview and social media verification. Every interviewer is rated by the candidate after each interview. This rating will be visible to you on the Rock Interview app.</p>'
                },
                {
                    faqId: 4, faqTitle: 'What do I do if I am unsatisfied with an interviewer/mentor? How do I address it?', isChecked: false,
                    answer: '<p>After every mock interview, you will be able to rate your mentor/interviewer based on your experience with him/her. This star-based review system records your feedback and takes the necessary steps based on the seriousness of the issue.</p>'
                },
                {
                    faqId: 5, faqTitle: 'How do I know if the feedback given by the mentor/interviewer is genuine?', isChecked: false,
                    answer: '<p>Mock interviews with Rock interview are recorded so that the candidate can review their performance afterward. You will also receive specific feedback from the interviewer on aspects of the interview process in a detailed assessment report that will be sent confidentially to your registered mail id.</p>'
                }
            ]
        }
    ];

    constructor(public dataStorage: DataStorageService, private modalService: NgbModal) {
    }

    ngOnInit() {
    }

    getfaqDescription(faqId) {
        if (faqId) {
            this.expandedfaqId = faqId;
        }
    }
}
