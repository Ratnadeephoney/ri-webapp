import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';


import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';
import 'rxjs';
import { map, take } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MyAppHttpService } from './my-app-http.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { DataStorageService } from './data-storage.service';
import { SendReceiveService } from './send-receive.service';
//import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';

declare var jsSHA: any;

@Injectable()
export class CommonService {
  constructor(private sendReceiveService: SendReceiveService, private toastr: ToastrService, public dataStorage: DataStorageService) {

  }

  showToast(toastType, title, message) {
    this.toastr[toastType](message, title, {
      timeOut: 6000
    });
  }

  showLoader(){
    this.dataStorage.globalShowLoader =true;
  }

  hideLoader(){
    //this.sendReceiveService.hideLoader();
    setTimeout(() => {
      this.dataStorage.globalShowLoader = false;
  }, 500);
  }

  AES_Encrypt(text, securityKey) {
    return CryptoJS.AES.encrypt(text, securityKey).toString();
  }

  AES_Decrypt(text, securityKey) {
    return CryptoJS.AES.decrypt(text, securityKey).toString();
  }

  getAllSkills() {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Get, MyAppHttpService.REQUESTS.GetAllSkills);
  }

  getAllLocations() {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.GetAllLocations, {});
  }

  getAllSearchedJobs(requestData) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.GetAllSearchedJobs, requestData);
  }

  getAllMentorsList(requestData) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.GetAllMentorsList, requestData);
  }

  getSelectedJobByJobId(requestData) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.GetSelectedJobByJobId, requestData);
  }

  getAllTrainings(requestObj, trainingType) {
    // if (trainingType == 1) {
      return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.GetAllTrainings, requestObj);
    // }
    // else {
    //   return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.getSuggestedTrainingsToMe, requestObj);
    // }
  }

  getInterviewedJobseekers(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.getInterviewedJobseekers, requestObj);
  }

  shareTrainingToAll(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.shareTrainingToAll, requestObj);
  }

  shareTrainingToJS(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.shareTrainingToJobseekers, requestObj);
  }

  getTrainingSession(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.getRegisteredUsers, requestObj);
  }

  // getTrainingInfoByTrainingId(trainingId) {
  //   return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Get, `${MyAppHttpService.REQUESTS.GetTrainingInfoByTrainingId}?trainingId=${trainingId}`, {});
  // }

  getTrainingInfoByTrainingId(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.GetTrainingInfoByTrainingId, requestObj);
  }

  getMentorInfoByMentorId(requestObj) {
    // return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Get, `${MyAppHttpService.REQUESTS.getTrainerInfoByMentorId}?mentorId=${mentorId}`, {});
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.getTrainerInfoByMentorId, requestObj);
  }

  getTrainingTopicsByMentorId(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.getTrainingTopicsByMentorId, requestObj);
  }

  postContactUs(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.postContactUs, requestObj);
  }

  downloadEbook(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.downloadEbook, requestObj);
  }

  leaveMessage(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.leaveMessage, requestObj);
  }

  getJobOfferStatus(transactionId) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Get, `${MyAppHttpService.REQUESTS.getJobOfferStatus}?transactionId=${transactionId}`, {}, MyAppHttpService.MWType.ENTERPRISE);
  }

  rejectJobOffer(transactionId, comments) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Get, `${MyAppHttpService.REQUESTS.rejectJobOffer}?transactionId=${transactionId}&comments=${comments}`, {}, MyAppHttpService.MWType.ENTERPRISE);
  }

  acceptJobOffer(transactionId) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Get, `${MyAppHttpService.REQUESTS.acceptJobOffer}?transactionId=${transactionId}`, {}, MyAppHttpService.MWType.ENTERPRISE);
  }

  sendAppLink(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.sendAppLink, requestObj);
  }

  sendOTP(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.sendOtp, requestObj);
  }

  verifyOTP(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.verifyOtp, requestObj);
  }

  registerUser(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.registerUser, requestObj);
  }

  applyJob(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.applyJob, requestObj);
  }

  registerTraining(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.registerTraining, requestObj);
  }

  getTrainingAmount(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.getTrainingAmount, requestObj);
  }

  getUserProfileInfo() {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Get, MyAppHttpService.REQUESTS.getUserProfileInfo)
  }

  getMasterDataForEditProfile() {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Get, MyAppHttpService.REQUESTS.getMasterData);
  }

  editUserDetails(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.editUserProfile, requestObj);
  }

  MarkJobAsRead(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.jobRead, requestObj);
  }

  getInterviewLevels() {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Get, MyAppHttpService.REQUESTS.getInterviewLevels, {});
  }

  getProfileSkills() {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Get, MyAppHttpService.REQUESTS.getProfileSkills, {})
  }

  getSetupInterviewMetadata() {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Get, MyAppHttpService.REQUESTS.getSetupInterviewMetadata, {})
  }

  getInterviewersBySkillIds(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.getInterviewersBySkillIds, requestObj);
  }

  getInterviewTimeSlots(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.getInterviewTimeSlots, requestObj);
  }

  submitSetupInterview(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.submitSetupInterview, requestObj);
  }

  paymentCancel(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.paymentCancel, requestObj);
  }

  getAllInterviews(requestData, filterId, type) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Get, `${MyAppHttpService.REQUESTS.getAllInterviewsList}?filter=${filterId}&type=${type}`);
  }

  cancelInterview(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.cancelInterview, requestObj);
  }

  getJSFeedback(interviewId) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Get, `${MyAppHttpService.REQUESTS.getJSFeedback}?interviewId=${interviewId}`);
  }

  getIntFeedback(interviewId) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Get, `${MyAppHttpService.REQUESTS.getIntFeedback}?interviewId=${interviewId}`);
  }

  postJSFeedback(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.postJSFeedback, requestObj);
  }

  postIntFeedback(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.postIntFeedback, requestObj);
  }

  getTopJobsAndCounts() {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Get, MyAppHttpService.REQUESTS.getTopJobsCounts);
  }

  getTopTrainingsAndCounts() {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Get, MyAppHttpService.REQUESTS.getTopTrainingsCounts);
  }

  createTraining(requestObj){
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.createTraining, requestObj);
  }

  editTraining(requestObj){
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.editTraining, requestObj);
  }

  getCourseDetails(requestObj){
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.getCourseDetails, requestObj);
  }

  getAttachmentsByCourseId(requestObj){
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.getAttachmentsByCourseId, requestObj);
  }

  deleteAttachmentByAttachmentId(requestObj){
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.deleteAttachmentByAttachmentId, requestObj);
  }

  addTopic(requestObj){
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.addTopic, requestObj);
  }

  deleteTopic(requestObj){
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.deleteTopic, requestObj);
  }
  
  getAllTopics(requestObj){
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.getAllTopics, requestObj);
  }

  updateTopic(requestObj){
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.updateTopic, requestObj);
  }

  getHiringIdDetails() {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.getHiringId);
  }

  GetUserProfileData(){
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Get, MyAppHttpService.REQUESTS.getHiringId);
  }
  
  requestRoleChange(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.requestRoleChange, requestObj);
  }

  roleChangeStatus(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.roleChangeStatus, requestObj);
  }

  postGetMyVideos(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.getProfileVideoDetails, requestObj);
  }
  GetSettingsData() {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.getAllSettings,);
  }

  UpdateSettingsData(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.updateSettings, requestObj);
  }

  // uploadProfileVideo(requestObj) {
  //   return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.uploadProfileVideo, requestObj);
  // }

  PostDeleteMyVideo(requestObj) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.deleteProfileVideo, requestObj);
  }

  getAllBanks(){
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.getAllBanks);
  }

  bankDetails(){
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.getBankdetails);
  }

  saveBankDetails(requestObj){
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.saveBankDetails,requestObj);
  }
  
  getAllCertificates(){
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.getAllCertificates);
  }

  GetAllGroupsList(requestObj){
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.postchatgroups, requestObj);
  }

  GetAllEmployerchatList(requestObj){
    return this.sendReceiveService.sendforchat(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.postgetchat, requestObj, 'CHAT');
  }

  getUnreadChatCounts(requestData) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.GetChatUnreadCounts, requestData);
  }

  SendGroupChatMessage(requestObj, loader){
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.SendGroupChatMessage, requestObj, loader);
  }

  GetChatMembersList(requestObj){
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.GetMembersList, requestObj);
  }

  ReadChatMessage(requestObj){
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.postReadchatmsg, requestObj, false);
  }

  GetChatById(requestObj){
    return this.sendReceiveService.sendforchat(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.PostGetchatbyId, requestObj);
  }

  GetUserDetails(requestObj){
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.GetUserDetails, requestObj);
  }

  joinGroupChat(requestData) {
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.JoinGroupChat, requestData);
  }

  RemoveUserFromGroup(requestObj){
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.RemoveUserFromGroup, requestObj);
  }

  GetEmployerDetails(requestObj){
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.GetEmployerDetails, requestObj);
  }

  GetAllGroupdetail(requestObj){
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.postgetgroupchatdetails, requestObj);
  }

  GettingContentType(apiUrl){
    return this.sendReceiveService.downloadImage(apiUrl);
  }
  // ----------->
  getAllUsers(requestObj){
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.GetALLReferalList, requestObj);
  }

  updateReferalStatus(requestObj){
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.UpdateReferal, requestObj);
  }

  addReferalUser(requestObj){
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.AddReferalUser, requestObj);
  }
  //
  givereferencefeedback(requestObj){
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.GiveRefFeedback, requestObj);
  }

  viewreferalfeedback(requestObj){
    return this.sendReceiveService.send(this.sendReceiveService.httpVerb.Post, MyAppHttpService.REQUESTS.ViewRefFeedback, requestObj);
  }

  GettingChatUnread() {
    let apiRequest = {
      userId: this.dataStorage.globalLoggedInUserData.userId,
      userType: "RI"
    }

    // this.commonService.GetChatCount(apiRequest).subscribe(apiResponse => {
    //   console.log('response of chat count', apiResponse);
    //   if (apiResponse != undefined && apiResponse != null) {
    //     if (apiResponse.isUnreadMsg == true) {
    //       this.dataStorage.chatcount = 1;
    //     } else {
    //       this.dataStorage.chatcount = 0;
    //     }
    //   }
    // });

    this.getUnreadChatCounts(apiRequest).subscribe(apiResponse => {
      console.log('Response of total chat counts: ', apiResponse);
      if(apiResponse && apiResponse.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
        this.dataStorage.globalGroupChatUnreadCount = apiResponse.groupUnReadCount;
        this.dataStorage.globalRIMemberChatUnreadCount = apiResponse.singleUnreadCount;
        this.dataStorage.globalRIREChatUnreadCount = apiResponse.singleUnreadCount;
        // this.dataStorage.globalTotalChatUnreadCount = apiResponse.groupUnReadCount + apiResponse.singleUnreadCount;
        // this.dataStorage.globalTotalChatUnreadCount = apiResponse.singleUnreadCount;
        this.dataStorage.globalAdminChatUnreadCount = apiResponse.adminUnreadCount;
        this.dataStorage.globalEmployerChatUnreadCount = apiResponse.empUnreadCount;
        this.dataStorage.globalMemberChatUnreadCount = apiResponse.memberUnreadCount;
        this.dataStorage.globalEmployerTabChatUnreadCount = apiResponse.adminUnreadCount + apiResponse.empUnreadCount;

        console.log('chat counts: ', this.dataStorage.globalGroupChatUnreadCount, this.dataStorage.globalRIMemberChatUnreadCount, this.dataStorage.globalTotalChatUnreadCount);
      }
    });
  }

  getTotalInterviewsCount() {
    let totalInterviews = 0;
    if(this.dataStorage.globalIsLoggedInUser) {
      let type;
      let filter = 7;
      // if (this.dataStorage.globalLoggedInUserData.userType == MyAppHttpService.Roles.INTERVIEWER.roleId) {
      //   type = MyAppHttpService.Roles.INTERVIEWER.roleName;
      // } else {
        type = MyAppHttpService.Roles.JOB_SEEKER.roleName;
      // }

       
      let requestObj = {
        "skills": this.dataStorage.globalSelectedSKillsList ? this.dataStorage.globalSelectedSKillsList : [],
        "locationIds": this.dataStorage.globalSelectedLocationsList ? this.dataStorage.globalSelectedLocationsList : [],
        "limit": 5,
        "offset": 0
      };
      
      this.getAllInterviews(requestObj, filter, type).subscribe(response => {
        console.log('interviews response: ', response);
        if(!!response) {
          this.dataStorage.totalInterviewsCount = response.totalResults;
          totalInterviews = response.totalResults;
        }
      });
    }
   

    
  }

}


