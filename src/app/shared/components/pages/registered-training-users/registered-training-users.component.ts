import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../../service/common.service';
import { response } from 'express';
import { MyAppHttpService } from '../../../service/my-app-http.service';


@Component({
    selector: 'app-registered-training-users',
    templateUrl: './registered-training-users.component.html',
    styleUrls: ['./registered-training-users.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RegisteredTrainingUsersComponent implements OnInit {

    public url: any;
    data;
    registeredUsersList:any =[
        {avatar: 'SD', userName: 'Sneha dev js skdjhf',status: 'Registered', designation: 'UI Developer', userId: 1290},
        {avatar: 'P', userName: 'Praveen',status: 'Completed', designation: 'UI Developer', userId: 1290},
        {avatar: 'UD', userName: 'Uma dev js',status: 'In Progress', designation: 'UI Developer', userId: 1290},
        {avatar: 'H', userName: 'Hrushikesh',status: 'In Progress', designation: 'UI Developer', userId: 1290}
    ];
    constructor(private router: Router, public activeModal: NgbActiveModal, private fb: FormBuilder,
        private commonService: CommonService) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.url = event.url;
            }
        });
    }

    ngOnInit() {
        console.log('data : ', this.data.trainingInfo);
    }

    onModalDismiss(value) {
        this.activeModal.close(value);
    }

}
