import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackComponent } from "../feedback/feedback.component";
import { DataStorageService } from "../../../service/data-storage.service";

@Component({
    selector: 'app-more-info',
    templateUrl: './more-info.component.html',
    styleUrls: ['./more-info.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppMoreInfoComponent implements OnInit {
    constructor(private modalService: NgbModal, public dataStorage: DataStorageService){

    }
    ngOnInit() {
    }

    onLeaveMessageClick(){
        this.modalService.open(FeedbackComponent);
    }

    scrollTop(){
        window.scroll(0,0);
    }

}