import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { InterviewsComponent } from './layouts/interviews/interviews.component';
import { ModernComponent } from './layouts/modern/modern.component';
//import { InterviewerComponent } from './layouts/interviewer/interviewer.component';
export const routes: Routes = [
  // {
  //   path: '',
  //   component: ModernComponent
  // }
  // {
  //   path: 'landing',
  //   component: LandingComponent
  // }
  {
    path: 'interviews',
     component: InterviewsComponent

  },
  {
    path: 'modern',
    redirectTo: 'modern',
    pathMatch: 'full',
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// export const myRoutings = [
//   InterviewsComponent
// ];
