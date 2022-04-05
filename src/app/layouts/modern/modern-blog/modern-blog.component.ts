import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modern-blog',
  templateUrl: './modern-blog.component.html',
  styleUrls: ['./modern-blog.component.scss']
})
export class ModernBlogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  blogs = [
    { 
     img:"https://rockinterview.in/wp-content/uploads/2019/07/04.jpg",
     date:"5 September 2019",
     type:"admin",
     title:"Find Great Speaker For Event.",
     subTitle:"Detais This Event",
     description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard ."
    },
    { 
      img:"https://rockinterview.in/wp-content/uploads/2019/08/01.jpg",
      date:"5 September 2019",
      type:"admin",
      title:"Find Great Speaker For Event.",
      subTitle:"Detais This Event",
      description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard ."
     }
  ]

  
  blogCarouselOptions= {
    items: 3,
    margin: 60,
    nav: false,
    dots: false,
    autoplay: false,
    slideSpeed: 300,
    paginationSpeed: 400,
    loop: true,
    responsive: {
        0: {
            items: 1
        },
        575: {
            items: 1,
            margin: 10
        },
        768: {
            items: 2,
            margin: 10
        },
        1199: {
            items: 2,
            margin: 10
        },
        1200: {
            items: 3,
            margin: 30
        },
        1600: {
            items: 3,
            margin: 30
        }
    }
}

}
