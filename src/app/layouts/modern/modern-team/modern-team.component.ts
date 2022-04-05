import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-modern-team',
  templateUrl: './modern-team.component.html',
  styleUrls: ['./modern-team.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModernTeamComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  teams = [
    { img: "assets/images/rockinterview/Naveen_1-1.png",
      name: "Naveen",
      designation: "Rock Interviewer in Automation QA",
      description: "On a mission for automating web applications for testing purposes;change Boring web-based administration task can (and should!) be automated as well."
    },
    {
      img: "assets/images/rockinterview/Srihari_4-1.png",
      name: "Sri",
      designation: "Rock Interviewer in Coding for Java",
      description: "Believes in  “write once, run anywhere” (WORA) . Luvs in class-based, Object-oriented and to share his knowledge for you."
    },
    { 
      img: "assets/images/rockinterview/image-1.png",
      name: "Rayulu",
      designation: "Rock Interviewer in Front End Technologies",
      description: "Loves to build applications with Angular & Ionic, like to share the experiences on how to reuse your code and abilities to build apps for any deployment target."
    },
    { 
      img: "assets/images/rockinterview/sateesh0001-1.png",
      name: "Ashi",
      designation: "Rock interviewer in Prog Management",
      description: "Helping organisations in the process of managing several related projects, often with the intention of improving an organization’s performance"
    },
    { 
      img: "assets/images/rockinterview/RameshKarthik-1.png",
      name: "Karthick",
      designation: "Rock interviewer in Microsoft SharePoint",
      description: "Specialist on Microsoft, especially with the collaborative product – SharePoint for more than 9 years"
    }
  ]
  
  teamcarouselOptions= {
    items: 5,
    margin: 30,
    autoHeight: true,
    nav: false,
    dots:false,
    autoplay: false,
    slideSpeed: 300,
    paginationSpeed: 400,
    loop: true,
    responsive: {
        0: {
            items: 1
        },
        576: {
            items: 2,
            margin: 10
        },
        991: {
            items: 3,
            margin: 10
        }
    }
  }

}
