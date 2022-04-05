import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataStorageService } from '../../../shared/service/data-storage.service';

@Component({
    selector: 'app-interviewer-faq',
    templateUrl: './interviewer-faq.component.html',
    styleUrls: ['./interviewer-faq.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InterviewerFaqComponent implements OnInit {

    expandedfaqId;
    
    faqList = [
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
                    faqId: 10, faqTitle: 'Are there any special rules or processes that I need to follow while conducting a mock interview?',
                    isChecked: false, answer: '<p>A mock interview follows the same processes as a regular job interview. The interviewer will have to prepare as he/she does for real one. You can take a look at this handy e-book by Rock Interview for a detailed step-by-step guide.</p>'
                },
                {
                    faqId: 11, faqTitle: 'How do I get paid for my services at Rock Interview?', isChecked: false,
                    answer: '<p>Once you finish conducting a mock interview , enter the necessary feedback on the app and send the feedback form - you will be paid instantly through electronic transfer or get vouchers ( We are flexible here ). You fee / Voucher will reflect on the account number given to us during the registration process within 3 to 5 bank working days.</p>'
                },
                {
                    faqId: 12, faqTitle: 'How do I know what my rating on Rock Interview is?', isChecked: false,
                    answer: '<p>On logging into the Rock Interview app, you will be able to see your personal rating on your dashboard. This rating (out of 5 stars) is given to you by the candidates you have interviewed, trained or helped in other ways.</p>'
                },
                {
                    faqId: 13, faqTitle: 'How can I improve my rating on Rock Interview?', isChecked: false,
                    answer: '<p>Mentors that partner with Rock Interview are rated based on their interviews by Jobseeker. RI as a platform will take the feedback from Jobseekers and post “ AS-IS”. If case of any issues, you can check with Rock Interview.</p>'
                },
                {
                    faqId: 14, faqTitle: 'What do I do if I get rated unfairly by a candidate?', isChecked: false,
                    answer: '<p>RI will review with the whole process one more time and RI has completely authority to review – if the change is required</p>.'
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
