import { Component, ViewEncapsulation, OnInit, Input } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackComponent } from "../feedback/feedback.component";
import { DataStorageService } from "../../../service/data-storage.service";

@Component({
    selector: 'app-video-section',
    templateUrl: './video-section.component.html',
    styleUrls: ['./video-section.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class VideoSectionComponent implements OnInit {
    @Input('module') module:any;
    constructor(private modalService: NgbModal, public dataStorage: DataStorageService){

    }
    ngOnInit() {
    }

    onVideoClick(content) {
        this.modalService.open(content, { centered: true, size: 'lg' });
      }

}