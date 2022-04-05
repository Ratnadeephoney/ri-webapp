import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modern-testimonial',
  templateUrl: './modern-testimonial.component.html',
  styleUrls: ['./modern-testimonial.component.scss']
})
export class ModernTestimonialComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  testimonial = [
    {
      img:'assets/images/rockinterview/male-avatar.png',
      msgIcon:'assets/images/icon/message.png',
      name:'ABISHEK R - ',
      designation:'Fresher',
      comments: 'Thank you for the ratings. Actually the phone interview seemed to be quite similar to the technical round held during interviews, it was a great experience and gave me many ideas for improving myself before I attend my actual interviews.I thank your team for creating such a good platform and providing mock interviews for freshers.'
    },
    {
      img:'assets/images/rockinterview/male-avatar.png',
      msgIcon:'assets/images/icon/message.png',
      name:'RAJESH - ',
      designation:'Job Seeker in SAP', 
      comments: 'Thank you for the interview and the feedback. Got to know about myself on where do I stand interns of SAP domain exp.Lot of learning because of the way the interview was conducted.Though i was expecting more questions in terms of implementation but i learn business scenarios are important to crack any interview.Interviewer was very kind to give feedback on my areas of improvements and where do i have to concentrate more.Would be great if i get more business scenarios to crack interviews in future…Thank you once again Rock interview rockz…'
    }
  ]

  testimonialcarouselOptions= {
    items: 1,
    margin: 0,
    autoHeight: true,
    nav: true,
    dots: false,
    navText: ['<img src="assets/images/icon/left.png">', '<img src="assets/images/icon/right.png">'],
    autoplay: false,
    slideSpeed: 300,
    paginationSpeed: 400,
    loop: true
  }
}
