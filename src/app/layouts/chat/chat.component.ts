import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { response } from 'express';
import { CommonService } from 'src/app/shared/service/common.service';
import { DataStorageService } from 'src/app/shared/service/data-storage.service';
import { MyAppHttpService } from 'src/app/shared/service/my-app-http.service';
import { WebsocketService } from 'src/app/shared/service/WebSocket.service';
import { environment } from 'src/environments/environment';
import { AlertCompComponent } from '../alert-comp/alert-comp.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { getMetadata, getThumbnails, Video } from 'video-metadata-thumbnails';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfirmationPopupComponent } from 'src/app/shared/components/pages/confirmation-popup/confirmation-popup.component';
const firebaseConfig = {
  apiKey: "AIzaSyBDPVFR4fpJbP655fi0gECiX3rB_DEk1fE",
  authDomain: "health-report-334d5.firebaseapp.com",
  projectId: "health-report-334d5",
  storageBucket: "health-report-334d5.appspot.com",
  messagingSenderId: "192843149376",
  appId: "1:192843149376:web:51df5b1c10bd7779be6fa5",
  measurementId: "G-L1GFZMT005"
    };

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnInit {
  

  editorMsg = '';
  filterUserListText;
  perPageItems = [5, 10, 15, 20, 25];
  limit = 0;
  @ViewChild('tabSet') tabSet: NgbTabset;
  selectedTab: any = 'Groups';
  offSet: number = 0;
  isGroupChatListLoaded: boolean;
  userData: any;
  selectedSkills: any = [];
  totalGroupChatsCount: number;
  activity = { REFRESH: 'REFRESH', LOAD_MORE: 'LOAD_MORE' };
  isDataAvailable: boolean;
  paginationProps = { itemsPerPage: this.perPageItems[0], currentPage: 1, totalItems: 200 };
  isBottomLoadingShow: boolean;
  isMembersChatListLoaded: boolean;
  SelectedGroupData: any = null;
  messageToSend: any;
  files: any;
  GroupUsersData: boolean = false;
  search: FormControl;
  GroupUserDetails: any = [];
  filteredGroupUserDetails: any = [];
  showjoiningroup: boolean = false;
  Mentorchat: boolean = false;
  MentorData: any;
  Employerschat: boolean = false;
  usernameforemployers = 'Rock Interview';
  compnameforemployers = 'Rock Interview Support';
  technologies = new FormControl();

  Hidebutton: boolean = false;
  Acceprejreq: boolean = true;
  footershadeout: boolean = false;
  userblocked: boolean = false;
  senddisable: boolean = false;
  msgtyped = new FormControl('');

  userdetails: boolean = false;

  showMoreMenu: boolean = false;
  AdminClicked: boolean = false;
  userdetailsfornewchat: any = null;
  ClearMentordatafromList: boolean = false;
  membersblockdisable: boolean = false;
  thumbnailPath: any;
  selectedUserInfo: any;
 
  msgleftchatdoc = "..."
  msgleftchatpdf = "..."
  blockunblockArray = []
  memberChatId:any
  employerChatId:any
  blockunblockmemberscenter
  blockunblockemployeecenter
  

  constructor(public dataStorage: DataStorageService, private commonService: CommonService, public modalService: NgbModal,
    public wsService: WebsocketService, public cdr: ChangeDetectorRef, public sanitizer: DomSanitizer,
    private http: HttpClient) {
    this.offSet = 0;
    this.userData = this.dataStorage.globalLoggedInUserData;
    console.log('user data', this.userData);
    this.GettingChatList();
    this.GettingChatUnread();
    this.dataStorage.globalTotalChatUnreadCount = 0;
    // this.FiringSocketforAdminchatconversation();
    this.search = new FormControl();
    
    this.dataStorage.scrolldown.subscribe((fired) => {
      console.log('firing in chat down', fired);
      //this.GettingChatList();
      //this.CompareIdandSelectMember()
      //block unblock user without refreshing
      setTimeout(() => {
        this.blockunblockmembersmethod()
        this.blockunblockemployeemethod()
      }, 3000);
     
      


      setTimeout(() => {
        if (!!document.getElementById('chatnewbody')) {
          document.getElementById('chatnewbody').scrollTop = document.getElementById('chatnewbody').scrollHeight;
        }
      }, 200);
      if (this.selectedTab == 'Groups') {
        this.UpdateReadCount();
       
      } else if (this.selectedTab == 'Members') {
        this.UpdateReadcount1();
        
      } else if (this.selectedTab == 'Employers') {
        this.UpdateReadcount2();
       
      }
    })
    this.dataStorage.EnteredChatlist = true;
    this.dataStorage.chatlist = true;
    this.dataStorage.mentorJSChat = true;
    this.technologies.valueChanges.subscribe((technology) => {
      console.log('change in technology', technology);
      this.selectedSkills = technology;
      this.GettingDataForGroupChatList();
    });

    this.dataStorage.admindataloaded.subscribe((chenge) => {
      console.log('fired after admin conversation');
      this.AdminClicked = true;
      this.openAdminchat(this.dataStorage.globalAdminChatInformation);
    });

    this.dataStorage.oldchatformember.subscribe((data) => {
      console.log('fired for old chat opening');
    })

    this.dataStorage.newchatformember.subscribe((data) => {
      console.log('fired for new chat opening');
    })

    this.dataStorage.FiringInvite.subscribe((data: any) => {
     
      if (data.firing == true) {
        this.HandlingPageBasedonInviteStatus(data);
        // let data1 = this.dataStorage.dataforconversation;
        // this.UpdateReadcount(data1);
      }
    })
  }

  ngOnInit(): void {
    console.log('chat oninit');
    this.commonService.GettingChatUnread();
    if (this.dataStorage.DataFromMentorsList != null) {
      // setTimeout(() => {
        console.log('mentors list', this.dataStorage.globalMentorJSChatList);
        if(this.dataStorage.globalMentorJSChatList.length > 0){
          console.log('data list');
          this.goToChat(this.dataStorage.DataFromMentorsList);
        } else {
          console.log('No data list');
          // this.GettingDataForJobseekersChatList();
          // setTimeout(() => {
          //   this.goToChat(this.dataStorage.DataFromMentorsList);
          // }, 5000);
          // this.dataStorage.globalMentorJSChatList = [];
          this.dataStorage.globalMentorJSChatUserInfo = {};
          setTimeout(() => {
            this.tabSet.select('tSecond');
            let dataunsub = this.dataStorage.fireformentorchat.subscribe((response)=>{
              if(response == true){
                this.goToChat(this.dataStorage.DataFromMentorsList);
                dataunsub.unsubscribe();
              }
            })
          }, 1000);
          
        }
      // }, 1000);
    }
  }

  ngAfterViewInit(){
    console.log('View Init', this.dataStorage.globalMentorJSChatList);
  }

  scrollToBottom() {
    setTimeout(() => {
      if (!!document.getElementById('chatnewbody')) {
        document.getElementById('chatnewbody').scrollTop = document.getElementById('chatnewbody').scrollHeight;
      }
    }, 200);
  }

  ngOnDestroy() {
    this.dataStorage.EnteredChatlist = false;
    this.dataStorage.ClearChatData();
  }

  onTabChange(event) {
    if (event.nextId == 'tFirst') {
      this.selectedTab = 'Groups';
     
    } else if (event.nextId == 'tSecond') {
      this.selectedTab = 'Members';
      
    } else if (event.nextId == 'tthird') {
      this.selectedTab = 'Employers';
      
    }
    this.GettingChatList();
  }

  allChatDocSplitSlice(val)
  {
    var s1 = val.split(">")
    this.msgleftchatdoc = s1[1].slice(0,-3)
    if(this.msgleftchatdoc.length < 19)
    {
      //document.getElementById('recovergap').style.border = "1px solid red"
      this.msgleftchatdoc =   this.msgleftchatdoc 
    }
    else if(this.msgleftchatdoc.length > 19)
    {
      this.msgleftchatdoc = this.msgleftchatdoc.slice(0,19) + "...doc"
    }
  }
  allChatPdfSplitSlice(val)
  {
    var s1 = val.split(">")
    this.msgleftchatpdf = s1[1].slice(0,-3)
    if(this.msgleftchatpdf.length < 19)
    {
      //document.getElementById('recovergap').style.color = "red"
      this.msgleftchatpdf = this.msgleftchatpdf 
    }
    else if(this.msgleftchatpdf.length > 19)
    {
      this.msgleftchatpdf = this.msgleftchatpdf.slice(0,19) + "...pdf"
    }
  }


  
  blockunblockmembersmethod()
  {
    if(this.blockunblockmemberscenter == "You will not able to send/receive message from this user")
    {
      
      this.GettingDataForJobseekersChatList()
      localStorage.setItem("memberschatblockunblock"+this.memberChatId,"true")
      
    }
    else if(localStorage.getItem("memberschatblockunblock"+this.memberChatId) == "true")
    {
      this.GettingDataForJobseekersChatList()
      localStorage.setItem("memberschatblockunblock"+this.memberChatId,"false")
    }
  }

  blockunblockemployeemethod()
  {
    if(this.blockunblockemployeecenter == "You will not able to send/receive message from this user")
    {
     
      this.GettingDataForEmployerChatList()
      this.GettingChatConversation(true)
      this.openEmployerchat
      localStorage.setItem("employeechatblockunblock"+this.employerChatId,"true")
      
    }
    else if(localStorage.getItem("employeechatblockunblock"+this.employerChatId) == "true")
    {
      
      this.GettingDataForEmployerChatList()
      this.GettingChatConversation(true)
      this.openEmployerchat
      localStorage.setItem("employeechatblockunblock"+this.employerChatId,"false")
    }
  }
  
  blockunblockmembers(val,id)
  {
    this.blockunblockmemberscenter = val
    this.memberChatId = id
  }

  
  blockunblockemployee(val,id)
  {
    this.blockunblockemployeecenter = val
    this.employerChatId = id
  }
  
 

  GettingChatList() {
    // debugger
    console.log('chat list', this.selectedTab);
    if (this.selectedTab == 'Groups') {
      this.dataStorage.Adminchatdetailsenabled = false;
      this.dataStorage.openedchatId = null;
      this.dataStorage.datasendingtochatdetails = null;
      this.dataStorage.selectedChatTab = 'Groups';
      this.offSet = 0;
      this.selectedSkills = [];
      this.GroupsTabClicked();
      this.GettingDataForGroupChatList();
      this.dataStorage.selectedMentorJSChatId = '';
      if(this.ClearMentordatafromList == true){
        console.log('clearing 1');
        this.dataStorage.DataFromMentorsList = null;
        this.ClearMentordatafromList = false;
      }
    } else if (this.selectedTab == 'Members') {
      this.dataStorage.Adminchatdetailsenabled = false;
      this.dataStorage.selectedChatTab = 'Members';
      this.MembersTabClicked();
      this.GettingDataForJobseekersChatList();
    } else if (this.selectedTab == 'Employers') {
      this.dataStorage.Adminchat = false;
      this.dataStorage.selectedChatTab = 'Employers';
      this.dataStorage.selectedMentorJSChatId = '';
      if(this.ClearMentordatafromList == true){
        console.log('clearing 2');
        this.dataStorage.DataFromMentorsList = null;
        this.ClearMentordatafromList = false;
      }
      // if (this.dataStorage.globalAdminChatInformation == []) {
      this.FiringSocketforAdminchatconversation();
      // }
      this.EmployersTabClicked();
      this.GettingDataForEmployerChatList();
    }
  }

  GroupsTabClicked() {
    this.dataStorage.globalMentorJSChatList = [];
    // this.dataStorage.globalAdminChatInformation = {};
    this.dataStorage.globalRIREChatList = [];
    this.Mentorchat = false;
    this.Employerschat = false;
    this.dataStorage.ongrpchatdetails = false;
    this.dataStorage.openedchatId = null;
  }

  MembersTabClicked() {
    this.dataStorage.openedchatId = null;
    this.dataStorage.globalRIGroupsChatList = [];
    // this.dataStorage.globalAdminChatInformation = {};
    this.dataStorage.globalRIREChatList = [];
    this.Employerschat = false;
    this.dataStorage.ongrpchatdetails = false;
    this.dataStorage.clickedGroupId = null;
  }

  EmployersTabClicked() {
    this.dataStorage.openedchatId = null;
    this.dataStorage.globalRIGroupsChatList = [];
    this.dataStorage.globalMentorJSChatList = [];
    this.Mentorchat = false;
    this.dataStorage.ongrpchatdetails = false;
    this.dataStorage.clickedGroupId = null;
  }

  // getFile(event, data) {

  //   this.files = event.target.files
  //   this.files = event.target.files || event.srcElement.files;
  //   console.log('file data', this.files, data);
  //   console.log('file path', this.files[0]);
  //   // let fileData = new FormData();
  //   var reader = new FileReader();
  //   // reader.addEventListener('load', readFile);
  //   reader.readAsBinaryString(this.files[0]);
  //   console.log('after convert', reader);
  //   var blob = new Blob([reader.result]);
  //   console.log('blob', blob);
  //   // fileData.append(this.files[0])
  //   // let contentype = this.dataStorage.GettingContentType(fileExt);
  //   let filenamefromlocal = this.files[0].name;
  //   var fileExt = filenamefromlocal.split('.')[1];
  //   // if (fileExt != undefined || fileExt != '') {
  //   console.log('file name', fileExt, filenamefromlocal);
  //   let contentType = this.dataStorage.GettingContentType(fileExt);
  //   // }
  //   let usertype: any = 'JS';
  //   if (this.dataStorage.globalLoggedInUserData.userType == 2) {
  //     usertype = 'M';
  //   }
  //   var xhr = new XMLHttpRequest();
  //   var apiURL = environment.attachment_Upload_url + environment.env + '%2F' + 'groupchat' + '%2F' + usertype + '%2F' + this.dataStorage.globalLoggedInUserData.userId + '%2F' + filenamefromlocal
  //   xhr.open('PUT', apiURL, true)
  //   xhr.setRequestHeader("Content-Type", contentType);
  //   xhr.onload = () => {
  //     try {
  //       // this.hideLoading()
  //     } catch (e) { }
  //     console.log(xhr);
  //     if (xhr.status == 200) {
  //       console.log('response',)
  //       // this.hideLoading();
  //       let uploadpath = environment.upload_path_url + environment.env + '/groupchat' + '/' + usertype + '/' + this.dataStorage.globalLoggedInUserData.userId + '/' + filenamefromlocal;
  //       console.log('final upload path', uploadpath);
  //       // this.toastService.presentToast('File Uploaded Successfully');
  //       this.SendMessageforAttachment(uploadpath, filenamefromlocal);
  //     }
  //   }
  //   xhr.send(blob);
  // }

  checkOnline() {
    if (!navigator.onLine) {
      this.commonService.showToast(MyAppHttpService.ToastType.ERROR, '', 'App is Offline.');
      return false;
    }
    else {
      return true;
    }
  }

  onSendMessageKeyup(event, message) {
    console.log('')
    if (event.keyCode == 13 && !event.altKey) {
      
      if (!message.trim()) {
        this.messageToSend = '';
        return false;
      }
      

      message = message.replace(/[\r\n]+/gm, "");
      console.log('Message: ', message, this.messageToSend);
      // this.onInsertMessageClick(message);
      this.onInsertMessageClickInGroup(message, 'groupChat');
      this.messageToSend = '';
    }
    if (event.keyCode == 13 && event.altKey) {
      
      this.messageToSend = this.messageToSend + "\r\n";
    }
  }

  onSendMessageKeyupforMentors(event, message) {
    console.log('')
    if (event.keyCode == 13 && !event.altKey) {
      if (!message.trim()) {
        this.editorMsg = '';
        return false;
      }
      
      message = message.replace(/[\r\n]+/gm, "");
      console.log('Message: ', message, this.messageToSend);
      this.SendMessageFromUser(message);
      this.editorMsg = '';
    }
    if (event.keyCode == 13 && event.altKey) {
      
      this.editorMsg = this.editorMsg + "\r\n";
    }
  }

  // onSendMessageKeyupforEmployers(event, message) {
  //   console.log('')
  //   if (event.keyCode == 13 && !event.altKey) {
  //     if (!message.trim()) {
  //       this.editorMsg = '';
  //       return false;
  //     }
  //     message = message.replace(/[\r\n]+/gm, "");
  //     console.log('Message: ', message, this.messageToSend);
  //     this.SendMessageFromUser(message);
  //     this.editorMsg = '';
  //   }
  //   if (event.keyCode == 13 && event.altKey) {
  //     this.editorMsg = this.editorMsg + "\r\n";
  //   }
  // }

  // onInsertMessageClick(message) {
  //   let datainserting = message;
  //   console.log('msg typed', datainserting);
  //   if (datainserting != '') {
  //     let emaildata = (/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).test(datainserting);
  //     console.log('email matched', emaildata);
  //     if (emaildata == true) {
  //       console.log('email matched');
  //     } else {
  //       datainserting = this.urlify(message);
  //     }
  //     // if (this.attachmentdata == false) {

  //     // }
  //     // if (this.dataStorage.selectedChatTab == 'Groups') {
  //     this.SendingMessageInGroupChat(datainserting);
  //     // }
  //     // this.editorMsg = '';
  //     // this.scrollToBottom();
  //   }
  // }

  async onInsertMessageClick(message, messageType='text') {
    // var requestObj = {
    //   "from": "admin",
    //   "to": this.selectedUserInfo.userId,
    //   "bodyType": null,
    //   "body": message,
    //   "files": null,
    //   "isRead": false,
    //   "isBOT": false,
    //   "hasEmail": false,
    //   "hasDeeplik": false,
    //   "hasHyperLink": false,
    //   "hasPhonenumber": false,
    //   "parentId": null
    // };

    // this.appChatsService.insertMessage(requestObj).subscribe((response) => {
    //   console.log("Response : ", response);
    // })
    if (this.checkOnline()) {
      let messageToSend;
      // let emaildata = (/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).test(message);
      let emaildata = message.match('@');
      console.log('email data 1', emaildata);
      if (messageType != 'file' && !emaildata) {
        messageToSend = this.urlify(message);
      }
      else {
        messageToSend = message;
      }

      if (messageToSend && messageToSend.trim().length != 0) {

        let adminId = null;
        console.log("Selected user info : ", this.selectedUserInfo);
        // let chatId = !!this.selectedUserInfo ? this.selectedUserInfo.chatId : '';
        // let email = this.selectedUserInfo ? this.selectedUserInfo.toEmailId : this.selectedUserInfo.destinationEmailId;
        // let mobileNumber = this.selectedUserInfo ? this.selectedUserInfo.toMobileNumber : this.selectedUserInfo.destinationMobileNumber;
        let m = {message : messageToSend};
        let msg = await this.getFormattedMessage(m);
        // let toUserType, toUserName, toUserId;

        // let message = {
        //   data: {
        //     userId: this.dataStorage.globalLoggedInUserData.userId, 
        //     userType: MyAppHttpService.CHAT_TYPES.RI, 
        //     userName: this.dataStorage.globalLoggedInUserData.userName, 
        //     chatId: chatId,
        //     toEmailId: email, 
        //     toMobileNumber: mobileNumber,
        //     toUserId: this.selectedUserInfo.toUserId, 
        //     toUserType: MyAppHttpService.CHAT_TYPES.RI, 
        //     toUserName: this.selectedUserInfo.destinationName, 
        //     message: msg.message, 
        //     thumbnail: msg.thumbnail, 
        //     msgType: msg.msgType
        //   },
        //   message: 'sendMessage'
        // }

        // console.log("Message to send : ", message);

        // this.wsService.messages.next(message);

        if(!!this.dataStorage.Adminchat || this.selectedTab == 'Members') {
          this.SendingMessagethroughSocket(messageToSend);
        }
        else if(this.selectedTab == 'Employers' && !this.dataStorage.Adminchat) {
          this.SendingMessagethroughSocketforEmployers(messageToSend);
        }
      }
    }


    // this.appChatsService.insertMessage(requestObj).subscribe((response) => {
    //   debugger;
    //   //if(response.message.split('-')[1])
    //   // var insertedChatObj = 
    //   // {"chatId": parseInt(response.message.split('-')[1]) ,"from": "admin","to": this.selectedUserInfo.userId,"bodyType":"","body": message,"files":null,"hasEmail":false,"hasDeeplik":false,"hasHyperLink":false,"hasPhonenumber":false,"parentId":null,"createdDate": Date(),"read":true,"bot":false};

    //   this.sendReceiveService.chatList.push(response.chat);
    //   this.sendReceiveService.chatList.sort((a, b) => (a.chatId > b.chatId) ? 1 : -1);

    //   setTimeout(() => {
    //     var objDiv = document.getElementById("chatbody");
    //     objDiv.scrollTop = objDiv.scrollHeight;
    //   }, 10);

    // }, (error) => { });

  }

  async SendingMessageInGroupChat(messagetosend) {
    
    

    console.log('message sending data', this.dataStorage.loggedInUserData);
    // this.dataStorage.NoLoaderForChat = true;
    let name: any = '';
    if (this.dataStorage.globalLoggedInUserData.userName == null || this.dataStorage.globalLoggedInUserData.userName == '') {
      if (this.dataStorage.globalLoggedInUserData.userType == 1) {
        name = 'JobSeeker';
      }
      if (this.dataStorage.globalLoggedInUserData.userType == 2) {
        name = 'Mentor';
      }
    } else {
      name = this.dataStorage.globalLoggedInUserData.userName;
    }

    let messagesending = messagetosend.trim();
    if (messagesending.length != 0) {
      let m = {message : messagesending};
        let msg = await this.getFormattedMessage(m);
      let request = {
        adminUserId: null,
        groupId: this.SelectedGroupData.groupId,
        groupName: this.SelectedGroupData.groupName,
        // message: messagesending,
        messageFromAdmin: false,
        userId: this.dataStorage.globalLoggedInUserData.userId,
        userName: name,
        userType: this.dataStorage.globalLoggedInUserData.userType,
        message: msg.message, 
        thumbnail: JSON.stringify(msg.thumbnail), 
        msgType: msg.msgType
      }
      console.log('request for sending message', request);
      // this.newsendReceiveService.send('chat/sendMessageToGroup', JSON.stringify(request)).subscribe((apiResponse) => {
      this.commonService.SendGroupChatMessage(request, false).subscribe(apiResponse => {
        console.log('response of send message from group chat', apiResponse);
        // this.attachmentdata = false;
        // this.dataStorage.NoLoaderForChat = false;
        // this.GettingChatConversation(false);
        setTimeout(() => {
          if (!!document.getElementById('chatnewbody')) {
            document.getElementById('chatnewbody').scrollTop = document.getElementById('chatnewbody').scrollHeight;
          }
        }, 300);
      }, (error) => {
        // this.dataStorage.NoLoaderForChat = false;
      })
    }
  }

  urlify(text) {
    var urlRegexWithHttp = /(https?:\/\/[^\s]+)/g;
    var urlRegex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi

    // if (text.match(urlRegex)) {
    //   text = text.toLowerCase()
    //   if (!text.match(urlRegexWithHttp)) {
    //     text = "http://" + text;
    //   }
    // }
    console.log('text', text);
    if (text.match(urlRegex)) {
      var temptext = text.toLowerCase();
      console.log('temp text', temptext);
      if (!temptext.match(urlRegexWithHttp)) {
        // text = "http://" + text;
        console.log('adding http', text);
      }
    }
    return text.replace(urlRegex, function (url) {
      // <a target="_blank" href="' + url + '">' + url + '</a>'
      return '<p class="mylink" name="urltype" id="' + url + '">' + url + '</p>';
    })
  }



  GroupSelected(data) {
    this.ClearAllClicks();
    data.clicked = true;
    this.dataStorage.clickedGroupId = data.groupId;
    this.SelectedGroupData = data;
    if (data.userId) {
      this.messageToSend = '';
      this.openGroupchat(data);
      this.dataStorage.ongrpchatdetails = true;
      this.dataStorage.chatlist = false;
      this.dataStorage.mentorJSChat = false;
      this.showjoiningroup = false;
      this.GroupUsersData = false;
      setTimeout(() => {
        let textnew = document.getElementById('groupinput');
        console.log('group selected', textnew);
        textnew.focus();
      }, 200);
    } else {
      this.showjoiningroup = true;
    }
  }

  ClearAllClicks() {
    if (this.dataStorage.globalRIGroupsChatList.length > 0) {
      for (let i = 0; i < this.dataStorage.globalRIGroupsChatList.length; i++) {
        this.dataStorage.globalRIGroupsChatList[i].clicked = false;
      }
    }
  }

  openGroupchat(data) {
    console.log('open group chat: ', data);
    // this.dataStorage.dataforconversation = data;
    // this.dataStorage.clickedGroupId = data.groupId;
    // this.SelectedGroupData = data;

    this.GetGroupChatData(data);
  }

  GetGroupChatData(data) {
    if (data.groupId != null) {
      let apiRequest = {
        groupId: data.groupId
      }
      // this.newsendReceiveService.send('chat/getUsersGroupChatByGroupId', JSON.stringify(request)).subscribe((apiResponse) => {
      this.commonService.GetAllGroupdetail(apiRequest).subscribe(apiResponse => {
        console.log("Group chat response : ", apiResponse);
        apiResponse.usersGroupChatList.forEach(async element => {
          console.log('Element: ', element);
           let msg = JSON.parse(JSON.stringify(element.message));
           let msg1;
           element = await this.getFormattedMessage(element);
           // msg1 = await this.getFormattedMessage(msg);
           element.message = !!msg1 ? msg1 : element.message;
           console.log('await Message: ', element.message, msg, element);
         });
        this.dataStorage.globalgroupchatdetailsconversation = apiResponse.usersGroupChatList;
        // this.dataStorage.ongrpchatdetails == true;
        // this.GroupUsersData = false;
        // this.showjoiningroup = false;
        this.UpdateReadCount();
        data.unreadCount = 0;
        this.scrollToBottom();
      })
    }
  }

  JoinGroupChatFromLeft(event, data) {
    this.joinGroupChat(data);
    event.stopPropagation();
  }

  joinGroupChat(data) {
    console.log('Join group: ', data);
    // if(navigator.onLine) {
    this.confirmationAlert(data);
    // }
    // else {
    //   this.toastCtrl.presentToast('Please check your Internet Connection');
    // }

  }

  confirmationAlert(data) {
    let dataforsending: any = {};
    dataforsending.header = 'Join Group';
    dataforsending.message = 'Are you sure you want to join in this group?';
    dataforsending.button1 = 'Cancel';
    dataforsending.button2 = 'Join';
    let modalRef = this.modalService.open(AlertCompComponent);
    modalRef.componentInstance.data = { AlertData: dataforsending };
    modalRef.result.then((e) => {
      if (e == true) {
        this.JoinIntoGroup(data);
      }
    });
  }

  JoinIntoGroup(data) {
    let inputData = {
      groupId: data.groupId,
      userId: this.dataStorage.globalLoggedInUserData.userId
    }
    console.log('Input data: ', inputData);
    this.commonService.joinGroupChat(inputData).subscribe(response => {
      console.log('Join chat response: ', response);
      if (response && response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
        data.userId = response.userId;
        data.messageTime = 'Just Now';
        this.GroupSelected(data);
        // this.ClearAllClicks();
        // data.clicked = true;
        // this.dataStorage.clickedGroupId = data.groupId;
        // this.SelectedGroupData = data;
        // this.GetGroupChatData(data);
        // this.showjoiningroup = false;
        // this.navCtrl.navigateForward('/group-chat-details', {});        

      }

    });
  }

  NoAttachment() {
    // this.commonService.showToast(MyAppHttpService.ToastType.WARNING, 'Upload Attachment', 'For Upload Functionality Download RI Mobile App');
    if(this.checkOnline()) {
      this.commonService.showToast(MyAppHttpService.ToastType.WARNING, 'Upload Attachment', 'Currently this functionality is not available for Employer chat.');
    }
    
  }


  GettingDataForGroupChatList(event = null, activity = null) {
    this.isGroupChatListLoaded = false;
    let apiRequest = {
      limit: this.limit,
      offSet: this.offSet,
      userId: this.userData.userId,
      // skills: this.selectedSkills.length != 0 ? this.selectedSkills.map(x => x.technologyId) : [],
      skills: this.selectedSkills,
      addUnjoinGroups: true
    }
    console.log('Input data for group chat list: ', apiRequest);
    this.commonService.GetAllGroupsList(apiRequest).subscribe(apiResponse => {
      console.log('Groups List', apiResponse);
      this.isGroupChatListLoaded = true;
      if (this.offSet == 0) {
        this.totalGroupChatsCount = apiResponse.totalCount;
      }
      // let chatslist: any = [];
      // if (apiResponse.userGroupsList != null) {
      //   chatslist = apiResponse.userGroupsList;
      //   if (chatslist.length != 0) {
      //     this.dataStorage.globalRIGroupsChatList = chatslist;
      //     this.dataStorage.globalRIGroupsChatList.forEach(element => {
      //       if(!!element.messageDate && element.messageDate != 'null') {
      //         element.eventTime = new Date(element.messageDate).getTime();
      //       }
      //       else {
      //         element.eventTime = 0;
      //       }

      //       // element.skillsList = element.skillsList.join(', ');
      //     });
      //     console.log('Group chat list: ', this.dataStorage.globalRIGroupsChatList);
      //     this.dataStorage.globalRIGroupsChatList.sort((a, b) => (b.eventTime > a.eventTime) ? 1 : -1);
      //     console.log('Group chat list: ', this.dataStorage.globalRIGroupsChatList);
      //   }
      // } else {
      //   this.dataStorage.globalRIGroupsChatList = [];
      // }
      if (apiResponse && apiResponse.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
        this.groupChatListLogic(activity, event, apiResponse);
      }
      else {
        this.groupChatListLogic(activity, event, apiResponse);
      }
    })
  }

  groupChatListLogic(activity, event, success) {
    if (activity == null) {
      this.dataStorage.globalRIGroupsChatList = [];
    }
    if (activity == this.activity.REFRESH) {
      this.dataStorage.globalRIGroupsChatList = [];
      event.target.complete();
    }


    if (activity == this.activity.LOAD_MORE) {
      //event.target.disabled = true;
    }

    this.dataStorage.globalRIGroupsChatList = [...this.dataStorage.globalRIGroupsChatList, ...(success.userGroupsList ? success.userGroupsList : [])];
    // this.dataStorage.globalRIGroupsChatList = [];
    this.isDataAvailable = true;
    console.log('Mentors list: ', this.dataStorage.globalRIGroupsChatList);
    let jGroups = [];
    let ujGroups = [];
    let joinedGroups = [];
    let unJoinedGroups = [];
    // this.dataStorage.globalRIGroupsChatList = success.dataStorage.globalRIGroupsChatList;
    this.dataStorage.globalRIGroupsChatList.forEach(element => {
      // element.show = false;
      // element.selectedMentorDataLoaded = false;
      element.clicked = false;
      if (!!element.messageDate && element.messageDate != 'null') {
        element.eventTime = new Date(element.messageDate).getTime();
        jGroups.push(element);
      }
      else {

        element.eventTime = new Date(element.groupCreatedDate).getTime();
        ujGroups.push(element);
      }
    });

    joinedGroups = jGroups.sort((a, b) => (b.eventTime > a.eventTime) ? 1 : -1);
    unJoinedGroups = ujGroups.sort((a, b) => (b.eventTime > a.eventTime) ? 1 : -1);
    // this.dataStorage.globalRIGroupsChatList.sort((a, b) => (b.eventTime > a.eventTime) ? 1 : -1);
    this.dataStorage.globalRIGroupsChatList = [...joinedGroups, ...unJoinedGroups];
    console.log('Group chat list: ', this.dataStorage.globalRIGroupsChatList);
    if ((this.dataStorage.globalRIGroupsChatList.length % this.paginationProps.itemsPerPage) != 0) {
      this.isBottomLoadingShow = false;
    }
    if (this.dataStorage.globalRIGroupsChatList.length > 0) {
      this.GroupSelected(this.dataStorage.globalRIGroupsChatList[0]);
    }
  }


  OpenGroupUserDetails(groupdata) {
    this.GroupUsersData = true;
    this.getGroupDetails(groupdata);
  }

  getFilteredData() {
    let text = this.search.value;
    if (text.length != 0) {
      this.filteredGroupUserDetails =
        this.GroupUserDetails.filter(element => element.userName.toLowerCase().indexOf(text.toLowerCase()) !== -1)
    }
    else {
      this.filteredGroupUserDetails = this.GroupUserDetails;
    }
  }

  getGroupDetails(data) {
    // if (this.networkService.checkOnline()) {
    // if (showload == true) {
    //   this.showLoading();
    // }
    // let data = this.dataStorage.selectedGroupDetails;
    console.log('data for getting conversation', data, this.dataStorage.selectedChatTab);
    // if (this.dataStorage.selectedChatTab == 'Groups') {
    // this.initialGroupInfo = data;
    // console.log('initial data : ', this.initialGroupInfo)
    if (data.groupId != null) {
      let apiRequest = {
        groupId: data.groupId
      }
      console.log('input data : ', apiRequest);

      // this.newsendReceiveService.send('chat/getGroupMembersByGroupId', JSON.stringify(request)).subscribe((apiResponse) => {
      this.commonService.GetChatMembersList(apiRequest).subscribe(apiResponse => {
        console.log("Group chat details response : ", apiResponse);
        if (apiResponse && apiResponse.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
          // this.isDataLoaded = true;
          this.GroupUserDetails = apiResponse.groupMembersList;
          this.filteredGroupUserDetails = this.GroupUserDetails;
          // console.log('response data : ', this.groupDetails);
        }

        // this.globalVars.globalgroupchatdetailsconversation = apiResponse.usersGroupChatList;
        // this.globalVars.globalgroupchatdetailsconversation.sort((a, b) => (b.postedDate < a.postedDate) ? 1 : -1);

        // this.hideLoading();
      });
    }
    // }
    // }
  }

  getMemberData(message) {
    let apiRequest = {
      userId: message.toUserId
    }
    this.CallingApiForUserData(apiRequest);
  }

  ShowUserData(message, type?) {
    // if (this.networkService.checkOnline()) {
    // if (this.userdetails == false) {
    //   this.userdetails = true;
    // if (message.userId != this.user.userId) {
    console.log('message', message);
    let apiRequest = {
      userId: message.userId
    }

    // console.log('input data : ', apiRequest);
    // // this.newsendReceiveService.send('getUser', JSON.stringify(request)).subscribe((apiResponse) => {
    // this.commonService.GetUserDetails(apiRequest).subscribe(apiResponse => {
    //   console.log("User details response : ", apiResponse);
    //   // this.userDetails = apiResponse;
    //   this.dataStorage.userdetailsformodal.userDetails = apiResponse;
    //   this.dataStorage.userdetailsformodal.chatType = 'group';
    //   this.UserDetailsModal(apiResponse);
    //   // this.OpenUserModal('group', apiResponse);
    //   // let modalcreating = this.modalCtrl.create(ChatUserDetailsPage, { userData: apiResponse, userType: 'group' });
    //   // modalcreating.onDidDismiss(data => {
    //   //   this.userdetails = false;
    //   // });
    //   // modalcreating.present();
    // })
    // // }
    // // }
    // // }
    this.CallingApiForUserData(apiRequest);
  }

  ShowGroupDetailsUserData(message) {
    console.log('message 1', message);
    if (message.senderUserId != 'ADMIN') {
      if (message.senderUserName != 'ADMIN') {
        let apiRequest = {
          userId: message.senderUserId
        }
        this.CallingApiForUserData(apiRequest);
      }
    }
  }

  CallingApiForUserData(apiRequest) {
    console.log('input data : ', apiRequest);
    this.commonService.GetUserDetails(apiRequest).subscribe(apiResponse => {
      console.log("User details response : ", apiResponse);
      // this.userDetails = apiResponse;
      this.dataStorage.userdetailsformodal.userDetails = apiResponse;
      this.dataStorage.userdetailsformodal.chatType = 'group';
      this.UserDetailsModal(apiResponse);
      // this.OpenUserModal('group', apiResponse);
      // let modalcreating = this.modalCtrl.create(ChatUserDetailsPage, { userData: apiResponse, userType: 'group' });
      // modalcreating.onDidDismiss(data => {
      //   this.userdetails = false;
      // });
      // modalcreating.present();
    })
  }

  UserDetailsModal(data) {
    console.log('data', data);
    let chatData = {
      'userData': data,
      'userType': 'group'
    }
    let modalRef = this.modalService.open(UserDetailsComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.data = { DataNew: chatData };
    modalRef.result.then((e) => {
      console.log('result back', e);
      if (e == true) {
        // job.isApplied = true;
      }
    });
  }

  ShowRemoveUserAlert(SelectedGroupData) {
    if (this.dataStorage.globalLoggedInUserData.userType == 1) {
      let dataforsending: any = {};
      dataforsending.header = 'Leave Group';
      dataforsending.message = 'You will no longer be able to chat. This group will be deleted from the list. Do you want to continue?';
      dataforsending.button1 = 'Cancel';
      dataforsending.button2 = 'Ok';
      let modalRef = this.modalService.open(AlertCompComponent);
      modalRef.componentInstance.data = { AlertData: dataforsending };
      modalRef.result.then((e) => {
        if (e == true) {
          this.RemoveUserFromGroup(SelectedGroupData);
        }
      });
    } else {
      // this.toastService.presentToast('If you want to exit, mail to  admin@rockinterview.in');
      this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Exit Group', 'If you want to exit, mail to  admin@rockinterview.in');
    }
  }

  RemoveUserFromGroup(SelectedGroupData) {
    // if (this.networkService.checkOnline()) {
    console.log('removing user from group', SelectedGroupData);
    let apiRequest = {
      adminUserId: null,
      fromAdmin: false,
      groupId: SelectedGroupData.groupId,
      userId: this.dataStorage.globalLoggedInUserData.userId
    }
    console.log('request for removing', apiRequest);
    // this.newsendReceiveService.send('chat/removeUserFromGroup', JSON.stringify(request)).subscribe((apiResponse) => {
    this.commonService.RemoveUserFromGroup(apiRequest).subscribe(apiResponse => {
      console.log('response of removing user', apiResponse);
      // this.navCtrl.navigateBack('/chat-list', {});
      // this.goToPage(MyAppHttp.PAGES.TABS.component, {}, false);
      // this.showSuccessToast('Group chat deleted successfully');
      SelectedGroupData.userId = null;
      this.dataStorage.ongrpchatdetails = false;
      this.GroupSelected(SelectedGroupData);
    })
    // }
  }

  RemovingIdFromGroup(SelectedGroupData) {
    if (this.dataStorage.globalRIGroupsChatList.length != 0) {
      for (let i = 0; i < this.dataStorage.globalRIGroupsChatList.length; i++) {
        // if(this.dataStorage.globalRIGroupsChatList[i].)
      }
    }
  }



  GettingDataForJobseekersChatList() {
    let apiRequest = {
      userId: this.userData.userId,
      userType: "RI",
      toUserType: "RI"
    }
    this.commonService.GetAllEmployerchatList(apiRequest).subscribe(apiResponse => {
      console.log('Jobseekers List', apiResponse);
      let chatslist: any = [];
      if (apiResponse.Items.length != 0) {
        chatslist = apiResponse.Items;
        if (chatslist.length != 0) {
          // this.globalVars.globalRIREChatList = chatslist;
          this.dataStorage.globalMentorJSChatList = chatslist;
          this.dataStorage.globalMentorJSChatList.sort((a, b) => (b.eventTime > a.eventTime) ? 1 : -1);
          // this.hideLoading();
          // this.dataStorage.globalMentorJSChatList.map(x => x.destinationName = ((x.destinationName == "NOT AVAILABLE" || x.destinationName == "RI" || x.destinationName.trim() == '') ? '' : x.destinationName));
          this.dataStorage.globalMentorJSChatList.forEach(async element => {
            element.clicked = false;
            if (!element.destinationName || element.destinationName == "NOT AVAILABLE" || element.destinationName == "RI" || element.destinationName.trim() == '' || element.destinationName == 'Not Available') {
              element.destinationName = '';
            }
            element = await this.getFormattedMessage(element);
          });
          console.log('Member chat list: ', this.dataStorage.globalMentorJSChatList);
        } else {
          // this.hideLoading();
        }
      } else {
        this.dataStorage.globalMentorJSChatList = [];
        this.isMembersChatListLoaded = true;
        // this.hideLoading();
      }
      if (this.dataStorage.globalMentorJSChatList.length > 0) {
        this.openMentorchat(this.dataStorage.globalMentorJSChatList[0]);
      }
      if (this.dataStorage.DataFromMentorsList != null) {
        this.dataStorage.fireformentorchat.next(true);
      }
    })
  }

  GettingDataForEmployerChatList() {
    let apiRequest = {
      userId: this.userData.userId,
      userType: "RI",
      toUserType: "RE"
    }
    this.commonService.GetAllEmployerchatList(apiRequest).subscribe(apiResponse => {
      console.log('Employers List', apiResponse);
      let chatslist: any = [];
      if (apiResponse.Items.length != 0) {
        chatslist = apiResponse.Items;
        if (chatslist.length != 0) {
          // this.globalVars.globalRIREChatList = chatslist;
          this.dataStorage.globalRIREChatList = chatslist;
          this.dataStorage.globalRIREChatList.sort((a, b) => (b.eventTime > a.eventTime) ? 1 : -1);
          this.dataStorage.globalRIREChatList.forEach(element => {
            element.clicked = false;
          })
          
           this.openEmployerchat(this.dataStorage.globalRIREChatList[0]);
          // this.hideLoading();
          console.log('chat list after date', this.dataStorage.globalRIGroupsChatList);
        } else {
          // this.hideLoading();
        }
      } else {
        this.dataStorage.globalRIREChatList = [];
        // this.hideLoading();
      }
    })
  }

  GettingChatUnread() {
    let apiRequest = {
      userId: this.dataStorage.globalLoggedInUserData.userId,
      userType: "RI"
    }

    this.commonService.getUnreadChatCounts(apiRequest).subscribe(apiResponse => {
      console.log('Response of total chat counts: ', apiResponse);
      if (apiResponse && apiResponse.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
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

  FiringSocketforAdminchatconversation() {
    let userName = this.userData.name ? this.userData.name : 'RI';
    console.log('userid', this.userData.userId, 'usertype', MyAppHttpService.CHAT_TYPES.RI, 'username', userName);
    var data = { userId: parseInt(this.userData.userId), userType: MyAppHttpService.CHAT_TYPES.RI, userName: userName, fromEmailId: this.userData.email, fromMobileNumber: this.userData.mobileNumber };
    console.log('data sending for admin conversation', data);
    this.wsService.invokeWebSocketFunction(data, MyAppHttpService.CHAT_EVENTS.LOAD_ADMIN_CONVERSATION);
  }

  // onmessageclick(msg) {
  //   console.log('msg', msg);
  //   let regex = new RegExp(/<([^\s]+).*?id="([^"]*?)".*?>(.+?)<\/\1>/gi);
  //   let matches = msg.match(regex);
  //   let i: any;
  //   let results = null;
  //   for (i in matches) {
  //     let parts = regex.exec(matches[i]);
  //     results = parts[2];
  //   }
  //   console.log('message', results);
  //   if (results != null) {
  //     var fileName = results.substr(results.lastIndexOf('/') + 1);
  //     //this.Navigatetobrowser(results);
  //     this.downloadFile(results, fileName);
  //   }
  // }

  onmessageclick(msg) {
    console.log('msg', msg);
    if (navigator.onLine) {
      let regex = new RegExp(/<([^\s]+).*?id="([^"]*?)".*?>(.+?)<\/\1>/gi);
      let regex1 = new RegExp(/<([^\s]+).*?name="([^"]*?)".*?>(.+?)<\/\1>/gi);
      let matches = msg.match(regex);
      let matches1 = msg.match(regex1);

      let imgRegex = new RegExp(/<img.*?src='(.*?)'.*?id='(.*?)'[^\>]+>/gi);
      let imgMatches = msg.match(imgRegex);

      let i: any;
      let results = null;
      let results1 = null;
      for (i in matches) {
        let parts = regex.exec(matches[i]);
        results = parts[2];
      }
      for (i in matches1) {
        let parts = regex1.exec(matches1[i]);
        console.log('pp', parts[2]);
        results1 = parts[2];
      }
      for (i in imgMatches) {
        let parts = imgRegex.exec(imgMatches[0]);
        console.log('Parts at results: ', parts);
        results = parts[2];
        let a = results.split('/');
        // filename = a[a.length - 1];
        results1 = 'urltype';
      }
      console.log('message', results, results1);
      if (results != null && results1 != null) {
        if (results1 == 'urltype') {
          this.Navigatetobrowser(results);
        } else {
          console.log('firing for download');
          let downloadobj: any = {}
          downloadobj.multimediaPath = results;
          downloadobj.attachmentName = results.substr(results.lastIndexOf('/') + 1);
          console.log('download data', downloadobj);
          this.downloadFile(downloadobj.multimediaPath, downloadobj.attachmentName);
        }
      }


    }
    else {
      this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Offline', 'You are offline now');
    }
  }

  Navigatetobrowser(url) {
    console.log('url', url);
    if (url.match('http://')) {
      console.log('matching http');
      let urlnew = url.split("//");
      console.log('splitted', urlnew);
      if (urlnew.length == 2) {
        url = urlnew[1];
        console.log('main url', url);
        url = "https://" + url;
        window.open(url);
      }
    } else if (url.match('https://')) {
      console.log('https matched', url);
      window.open(url);
    } else {
      console.log('no match', url);
      // if (navigator.onLine) {
      url = url.toString();
      url = "https://" + url;
      window.open(url);
    }
    // } else {
    //   // this.commonService.showToast('You are offline now', '', 2000);
    //   this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Offline', 'You are offline now');
    // }
  }

  // getFile1(event) {
  //   this.files = event.target.files
  //   this.files = event.target.files || event.srcElement.files;
  //   console.log('File list length : ', this.files.length);
  //   console.log('Resume : ', this.files);

  //   let name = '';
  //   let fileExt = '';
  //   let size = 0;
  //   if (!!this.files) {
  //     name = this.files[0].name;
  //     fileExt = name.split('.').pop();
  //     size = this.files[0].size;
  //   }

  //   console.log('Files, names : ', this.files);
  //   if (this.files === undefined) {

  //     // return;
  //   } else if (this.files.length == 0) {
  //     this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Upload File', 'File not selected.');

  //   } else if (size == 0) {
  //     this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Upload File', 'File not supported, Please select another file.');

  //   } else if (size > 1048576 * 150) {
  //     this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Upload File', 'Please select file less than 150 MB.');

  //   } else {
  //     // this.uploadResume(chatType);
  //     this.uploadAttachment1();
  //     // return;
  //   }
  // };

  // uploadAttachment1() {
  //   let fileData = new FormData();
  //   let fileName: string = '';
  //   console.log('Attachment : ', this.files);

  //   if (this.files.length > 0) {
  //     fileName = this.files[0].name;
  //     console.log('File name : ', fileName);
  //     fileData.append('attachment', this.files[0], fileName);
  //   }

  //   let xhr = new XMLHttpRequest();
  //   let apiUrl = environment.apiUrl + MyAppHttpService.REQUESTS.uploadTrainingAttachment;
  //   // console.log("URL : ",resUrl,apiUrl);
  //   xhr.open('POST', apiUrl, true);
  //   //xhr.setRequestHeader('content-type', 'multipart/form-data');
  //   xhr.setRequestHeader('token', localStorage.getItem('token'));
  //   xhr.setRequestHeader('courseId', this.courseId.toString());
  //   // this.commonService.showLoader();
  //   xhr.onload = () => {
  //     if (xhr.status == 200) {
  //       // this.commonService.hideLoader();
  //       console.log('server response:   ' + xhr.response);
  //       let response = JSON.parse(xhr.response);
  //       if (response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
  //         this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Upload File', 'Attachment added successfully');
  //         this.attachments.push(response);
  //       }
  //       else if (response.message == 'COURSE_EXCEEDED_ATTACHMENTS') {
  //         this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Upload File', "You can't upload more than 3 attachments");
  //       }
  //     }
  //   }
  //   xhr.send(fileData);
  // }

  // uploadAttachment() {
  //   // if (this.networkinit == true) {
  //   //   this.fileChooser.open().then((fileuri) => {
  //   //     this.filePath.resolveNativePath(fileuri).then((resolvednativepath) => {
  //         console.log('resolved native path', resolvednativepath);
  //         if (resolvednativepath != null && resolvednativepath != '') {
  //           var fileExt = resolvednativepath.substr(resolvednativepath.lastIndexOf('/') + 1).split('.')[1];
  //           var filenamefromlocal = resolvednativepath.substr(resolvednativepath.lastIndexOf('/') + 1);
  //           let fileData = { localURL: resolvednativepath, fullPath: resolvednativepath, type: 'file/' + fileExt }
  //           if (fileExt != undefined || fileExt != '') {
  //             let contentype = this.dataStorage.GettingContentType(fileExt);
  //             console.log('return extension', contentype);
  //             // if (this.matchextimg(fileDatafromLocal) == false) {
  //             this.isValidVideo(fileData, filenamefromlocal, contentype);
  //             // } else {
  //             //   this.showErrorToast('Image files are not allowed', true);
  //             //   this.hideLoading();
  //             // }
  //           } else {
  //             this.dataStorage.globalShowLoader = false;
  //           }
  //         } else {
  //           this.dataStorage.globalShowLoader = false;
  //         }
  //     //   }, (err) => {
  //     //     // error
  //     //     console.log('error in file path', err);
  //     //     this.dataStorage.globalShowLoader = false;
  //     //   })
  //     // }, (err) => {
  //     //   // error
  //     //   console.log('error in file chooser', err);
  //     //   this.dataStorage.globalShowLoader = false;
  //     // })
  //   // } else {

  //   // }
  // }

  // async isValidVideo(fileData, filenamefromlocal, contentType) {
  //   console.log('data for valid', fileData, filenamefromlocal, contentType, this.dataStorage.loggedInUserData);
  //   const size = await this.getFileSize(fileData.localURL)
  //   console.log('size of file', size);
  //   if (size > 10485760) {
  //     // this.filesize = true;
  //     // this.hideLoading();
  //     // 314572800 =~ binary 300 MB
  //     console.log('came in toast', size);
  //     // this.ShowDurationToast(this.Chatdetailsfromfirebase.EXCEEDED_LIMIT_TEXT.LABEL, true, 5000);
  //     // You can upload max 10mb only
  //     // return false
  //     this.toastService.presentToast('You can upload max 10mb only');
  //     this.dataStorage.globalShowLoader = false;
  //   } else {
  //     console.log('entered here');
  //     this.getFileBlob(fileData.localURL, fileData.type).then(mBlob => {
  //       return mBlob;
  //     }).then(mBlob => {
  //       console.log('mblob sending', mBlob, filenamefromlocal);
  //       this.fileData = mBlob;
  //       let usertype: any = 'JS';
  //       if (this.dataStorage.loggedInUserData.userType == 2) {
  //         usertype = 'M';
  //       }
  //       this.dataStorage.globalShowLoader = false;
  //       this.confirmalert(filenamefromlocal, usertype, contentType);
  //     })
  //   }
  //   // return true
  // }

  // async confirmalert(filenamefromlocal, usertype, contentType) {
  //   const confirm = await this.alertController.create({
  //     header: 'Attachment',
  //     message: 'Send' + " " + filenamefromlocal + " to " + this.initialGroupInfo.groupName,
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //           // this.hideLoading();
  //           return;
  //         }
  //       },
  //       {
  //         text: 'Send',
  //         handler: () => {
  //           console.log('Send clicked');
  //           if (this.networkinit) {
  //             this.SendAttachmentafterConfirmation(usertype, filenamefromlocal, contentType);
  //             this.dataStorage.globalShowLoader = true;
  //           } else {
  //             // this.hideLoading();
  //             this.dataStorage.globalShowLoader = false;
  //           }
  //         }
  //       }
  //     ]
  //   });
  //   confirm.present();
  // }

  // async getFileSize(fullPath) {
  //   return new Promise((resolve, reject) => {
  //     this.file.resolveLocalFilesystemUrl(fullPath)
  //       .then(fileEntry => {
  //         fileEntry.getMetadata((metadata) => {
  //           resolve(metadata.size)
  //         });
  //       }).catch(e => {
  //         reject(0)
  //       })
  //   })
  // }

  // async getFileBlob(fullPath, type) {
  //   return new Promise((resolve, reject) => {
  //     this.file.resolveLocalFilesystemUrl(fullPath)
  //       .then(fileEntry => {
  //         let { name, nativeURL } = fileEntry;
  //         let path = nativeURL.substring(0, nativeURL.lastIndexOf("/"));
  //         return this.file.readAsArrayBuffer(path, name);
  //       })
  //       .then(buffer => {
  //         let medBlob = new Blob([buffer], {
  //           type: type
  //         });
  //         resolve(medBlob)
  //       })
  //       .catch(e => {
  //         console.log(e)
  //         reject(e)
  //       });
  //   })
  // }


  // SendAttachmentafterConfirmation(usertype, filenamefromlocal, contentType) {
  //   console.log('data for sending', contentType);
  //   var xhr = new XMLHttpRequest();
  //   filenamefromlocal = filenamefromlocal.split(' ').join('_');
  //   filenamefromlocal = filenamefromlocal.split("+").join('_');
  //   var apiURL = environment.attachment_Upload_url + environment.env + '%2F' + 'groupchat' + '%2F' + usertype + '%2F' + this.dataStorage.loggedInUserData.userId + '%2F' + filenamefromlocal
  //   xhr.open('PUT', apiURL, true)
  //   xhr.setRequestHeader("Content-Type", contentType);
  //   xhr.onload = () => {
  //     try {
  //       // this.hideLoading()
  //     } catch (e) { }
  //     console.log(xhr);
  //     if (xhr.status == 200) {
  //       // this.hideLoading();
  //       let uploadpath = environment.upload_path_url + environment.env + '/groupchat' + '/' + usertype + '/' + this.dataStorage.loggedInUserData.userId + '/' + filenamefromlocal;
  //       console.log('final upload path', uploadpath);
  //       this.toastService.presentToast('File Uploaded Successfully');
  //       this.SendMessageforAttachment(uploadpath, filenamefromlocal);
  //     }
  //   }
  //   xhr.send(this.fileData);
  // }


  openMentorchat(data) {
    console.log('mentor clicked', data);
    this.ClearAllClicksMentor();
    if(!data.chatId){
      console.log('came here for disable');
      this.membersblockdisable = true;
    } else {
      console.log('came here for enable');
      this.membersblockdisable = false;
    }
    data.clicked = true;
    if (data.chatId) {
      this.dataStorage.openedchatId = JSON.parse(JSON.stringify(data.chatId));
    } else {
      this.dataStorage.openedchatId = null;
    }
    this.editorMsg = '';
    this.dataStorage.Adminchat = false;
    if (data.chatId != '' && data.chatId != undefined && data.chatId != null) {
      console.log('came here if it is not null');
      this.dataStorage.dataforconversation = JSON.parse(JSON.stringify(data));
      // this.dataStorage.dataforconversation = data;
    } else {
      if (data.chatId == '') {
        data.chatId = undefined;
      }
      console.log('data updating', data);
      this.dataStorage.dataforconversation = JSON.parse(JSON.stringify(data));
      this.dataStorage.dataforconversation.chatId = undefined;
      console.log('data for conversation', this.dataStorage.dataforconversation);
    }
    this.dataStorage.datasendingtochatdetails = JSON.parse(JSON.stringify(data));
    this.Mentorchat = true;
    this.Employerschat = false;
    this.dataStorage.globalMentorJSChatConversations = [];
    this.MentorData = data;
    this.selectedUserInfo = data;
    this.HandlingPageBasedonInviteStatus(JSON.parse(JSON.stringify(data)));
    if (this.dataStorage.dataforconversation.chatId != undefined) {
      this.UpdateReadcount1();
      
    }
    data.sourceUnreadCount = 0;
    if (data.inviteStatus == "2") {
      this.dataStorage.globalMemberChatUnreadCount = 0;
      this.dataStorage.globalTotalChatUnreadCount = 0;
    }
    setTimeout(() => {
      let textnew = document.getElementById('memberinput');
      console.log('group selected', textnew);
      textnew.focus();
    }, 200);
    // data.sourceUnreadCount = 0;
  }

  ClearAllClicksMentor() {
    if (this.dataStorage.globalMentorJSChatList.length > 0) {
      for (let i = 0; i < this.dataStorage.globalMentorJSChatList.length; i++) {
        this.dataStorage.globalMentorJSChatList[i].clicked = false;
      }
    }
  }

  HandlingPageBasedonInviteStatus(data) {
    console.log('invite status new', data.inviteStatus, this.userData, this.dataStorage.dataforconversation, this.dataStorage.Adminchat);
    console.log('data new1', this.dataStorage.Adminchat)
    // this.userData = JSON.parse(localStorage.getItem('userData'));
    // this.userId = this.dataStorage.globalLoggedInUserData.userId;
    if (data.inviteStatus == "2") {
      if (this.selectedTab == 'Members') {
        if (this.dataStorage.dataforconversation.toUserType == 'RI' && this.dataStorage.dataforconversation.toUserId != this.dataStorage.globalLoggedInUserData.userId) {
          if (this.dataStorage.dataforconversation.recentMessage != "you have rejected") {
            this.Acceprejreq = false;
            this.Hidebutton = true;
          } else {
            this.Acceprejreq = true;
            this.Hidebutton = false;
            this.dataStorage.globalchatdetailsconversation = [];
            this.GettingChatConversation(true);
          }
          this.DisablingStatusofChat();
          this.footershadeout = true;
        }
        else {
          this.Hidebutton = false;
          this.userblocked = false;
          this.Acceprejreq = true;
          this.EnablingStatusofChat();
          this.footershadeout = false;
          this.GettingChatConversation(true);
        }
      } else {
        this.Hidebutton = true;
        this.Acceprejreq = false;
        this.DisablingStatusofChat();
        this.footershadeout = true;
      }
    } else if (data.inviteStatus == "3") {
      this.Hidebutton = false;
      this.userblocked = true;
      this.Acceprejreq = true;
      this.DisablingStatusofChat();
      // this.footershadeout = true;
      this.GettingChatConversation(true);
    } else if (data.inviteStatus == "1") {
      this.Hidebutton = false;
      this.userblocked = false;
      this.Acceprejreq = true;
      this.EnablingStatusofChat();
      this.footershadeout = false;
      this.GettingChatConversation(true);
    } else if (data.inviteStatus == "0") {
      this.Hidebutton = false;
      this.userblocked = true;
      this.Acceprejreq = true;
      this.DisablingStatusofChat();
      // this.footershadeout = true;
      this.GettingChatConversation(true);
    } else if (data.inviteStatus == "4") {
      this.Hidebutton = true;
      this.Acceprejreq = true;
      this.DisablingStatusofChat();
      // this.footershadeout = true;
      this.GettingChatConversation(true);
    } else {
      this.Hidebutton = false;
      this.userblocked = false;
      this.Acceprejreq = true;
      this.EnablingStatusofChat();
      this.footershadeout = false;
      this.GettingChatConversation(true);
    }
  }

  DisablingStatusofChat() {
    console.log('fired disable');
    this.msgtyped.disable();
    this.senddisable = true;
    this.footershadeout = true;
  }

  EnablingStatusofChat() {
    console.log('fired enable');
    this.msgtyped.enable();
    this.senddisable = false;
    this.footershadeout = false;
  }

  NotAccepted() {
    // this.showLoading();
    var selectedChatIndex = this.dataStorage.globalRIREChatList.findIndex(x => x.chatId == this.selectedChatUserData.chatId);
    if (selectedChatIndex > -1) {
      this.dataStorage.globalRIREChatList[selectedChatIndex].inviteStatus = 0;
    }
    this.Acceprejreq = true;
    this.userblocked = true;
    this.footershadeout = false;
    this.Hidebutton = false;
    this.DisablingStatusofChat();
    this.InviteStatusUpdating("0");
    this.GettingChatConversation(false);
  }

  Accepted() {
    // this.showLoading();
    var selectedChatIndex = this.dataStorage.globalRIREChatList.findIndex(x => x.chatId == this.selectedChatUserData.chatId);
    if (selectedChatIndex > -1) {
      this.dataStorage.globalRIREChatList[selectedChatIndex].inviteStatus = 1;
    }
    this.Acceprejreq = true;
    this.userblocked = false;
    this.footershadeout = false;
    this.Hidebutton = false;
    this.EnablingStatusofChat();
    console.log('getting data for invite update', this.dataStorage.dataforconversation);
    // let status: any = "1";
    this.InviteStatusUpdating("1");
    this.GettingChatConversation(false);
  }

  InviteStatusUpdating(status) {
    // if (this.dataStorage.networkonline) {
    let data = this.dataStorage.dataforconversation;
    let username = "RI";
    if (this.dataStorage.globalLoggedInUserData.name != "") {
      username = this.dataStorage.globalLoggedInUserData.name;
    }
    let message = {
      data: {
        userId: this.dataStorage.globalLoggedInUserData.userId, userType: MyAppHttpService.CHAT_TYPES.RI, toUserId: data.toUserId, toUserType: data.toUserType, inviteStatus: status, chatId: data.chatId
      },
      message: 'inviteStatusUpdate'
    }

    console.log('message sending through socket for invite update', message);

    this.wsService.messages.next(message);
    // } else {
    //   // this.toastService.presentToast('You are offline now');
    // }
  }

  GettingChatConversation(showload: boolean) {
    console.log('Calling get conversation')
    // if (this.dataStorage.networkonline) {
    if (showload == true) {
      // this.showLoading();
    }
    let data = this.dataStorage.dataforconversation;
    console.log('data for getting conversation', data);
    if (data.chatId != "" && data.chatId != null) {
      let apiRequest = {
        chatId: data.chatId,
        userId: this.dataStorage.globalLoggedInUserData.userId
      }
      // this.chatreceivesrvc.send('/conversationbychatid', JSON.stringify(request)).subscribe((apiResponse) => {
      this.commonService.GetChatById(apiRequest).subscribe(apiResponse => {
        console.log('response of mentor chat', apiResponse);
        // if (apiResponse.Items != []) {
          apiResponse.Items.forEach(async element => {
            console.log('Element: ', element);
             let msg = JSON.parse(JSON.stringify(element.message));
             let msg1;
             element = await this.getFormattedMessage(element);
             // msg1 = await this.getFormattedMessage(msg);
             element.message = !!msg1 ? msg1 : element.message;
             console.log('await Message: ', element.message, msg, element);
          });
          if (this.selectedTab == "Members") {
            
            apiResponse.Items.forEach(async element => {
              console.log('Element: ', element);
               let msg = JSON.parse(JSON.stringify(element.message));
               let msg1;
               element = await this.getFormattedMessage(element);
               // msg1 = await this.getFormattedMessage(msg);
               element.message = !!msg1 ? msg1 : element.message;
               console.log('await Message: ', element.message, msg, element);
            });

            this.dataStorage.globalMentorJSChatConversations = apiResponse.Items;
            data.inviteStatus = "1";
            this.dataStorage.globalMemberChatUnreadCount = 0;
          } else if (this.selectedTab == 'Employers') {
             apiResponse.Items.forEach(async element => {
              console.log('Element: ', element);
               let msg = JSON.parse(JSON.stringify(element.message));
               let msg1;
               element = await this.getFormattedMessage(element);
               // msg1 = await this.getFormattedMessage(msg);
               element.message = !!msg1 ? msg1 : element.message;
               console.log('await Message: ', element.message, msg, element);
            });
            
            this.dataStorage.globalchatdetailsconversation = apiResponse.Items;
            console.log('New global chat details conversation list @1633: ', this.dataStorage.globalchatdetailsconversation);
            data.inviteStatus = "1";
            this.dataStorage.globalEmployerChatUnreadCount = 0;
          }
          this.scrollToBottom();
        // this.dataStorage.globalMentorJSChatList = apiResponse.Items;
        // this.scrollToBottom();
        // this.hideLoading();
        // }
      });
    } else {
      this.dataStorage.globalchatdetailsconversation = [];
    }
    // } else {
    //   // this.toastService.presentToast('You are offline now');
    // }
  }

  blockuser() {
    let dataforsending: any = {};
    dataforsending.header = 'Block User';
    dataforsending.message = this.dataStorage.dataforconversation.destinationName + ' will not be able to message you anymore. Would you like to continue?',
      dataforsending.button1 = 'Cancel';
    dataforsending.button2 = 'Confirm';
    let modalRef = this.modalService.open(AlertCompComponent);
    modalRef.componentInstance.data = { AlertData: dataforsending };
    modalRef.result.then((e) => {
      if (e == true) {
        this.DisablingStatusofChat();
        this.userblocked = true;
        this.InviteStatusUpdating("3");
      }
    });
  }

  unblockuser() {
    let dataforsending: any = {};
    dataforsending.header = 'UnBlock User';
    dataforsending.message = 'You will receive messages from ' + this.dataStorage.dataforconversation.destinationName + ' Would you like to continue?',
      dataforsending.button1 = 'Cancel';
    dataforsending.button2 = 'Confirm';
    let modalRef = this.modalService.open(AlertCompComponent);
    modalRef.componentInstance.data = { AlertData: dataforsending };
    modalRef.result.then((e) => {
      if (e == true) {
        this.EnablingStatusofChat();
        this.userblocked = false;
        this.InviteStatusUpdating("5");
      }
    });
  }

  SendMessageFromUser(message) {
    
    
    let datainserting = message;
    console.log('msg typed', datainserting);
    if (datainserting != '') {
      let emaildata = (/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).test(datainserting);
      console.log('email matched', emaildata);
      if (emaildata == true) {
        console.log('email matched');
      } else {
        datainserting = this.urlify(message);
      }
      // if (this.attachmentdata == false) {

      // }
      // if (this.dataStorage.selectedChatTab == 'Groups') {
      // this.SendingMessageInGroupChat(datainserting);
      if (this.selectedTab == 'Members') {
        if(this.membersblockdisable == true){
          this.membersblockdisable = false;
        }
        this.SendingMessagethroughSocket(datainserting);
      } else if (this.selectedTab == 'Employers') {
        console.log('firing for employers');
        this.SendingMessagethroughSocketforEmployers(datainserting);
      }

      // }
      this.editorMsg = '';
      this.scrollToBottom();
    }

  }


  async SendingMessagethroughSocket(messagetosend) {
    // if (this.dataStorage.networkonline) {
    // this.dataStorage.globalShowLoader = true;
    console.log('message to send new for check', messagetosend, this.dataStorage.dataforconversation);
    let data = this.dataStorage.dataforconversation;
    let usertypeto: any = MyAppHttpService.CHAT_TYPES.RI;
    if (this.dataStorage.Adminchat == true) {
      usertypeto = MyAppHttpService.CHAT_TYPES.RIADMIN;
    }
    else if (this.dataStorage.mentorJSChat == true) {
      usertypeto = MyAppHttpService.CHAT_TYPES.RI
    }
    let username = "RI";
    if (this.dataStorage.globalLoggedInUserData.userName != "") {
      username = this.userData.userName;
    }
    let messagesending = messagetosend.trim();
    if (messagesending.length != 0) {
      let m = {message : messagesending};
      let msg = await this.getFormattedMessage(m);
      let message = {
        data: {
          userId: this.dataStorage.globalLoggedInUserData.userId, 
          userType: MyAppHttpService.CHAT_TYPES.RI, userName: username, chatId: data.chatId,
          fromEmailId: this.userData.emailId,
          fromMobileNumber: this.userData.mobileNumber, toUserId: data.toUserId, toUserType: usertypeto,
          toUserName: data.destinationName,
          //  message: messagetosend, 
          fromUserId: this.userData.userId,
          destinationName: data.destinationName,
          message: msg.message,
          thumbnail: msg.thumbnail,
          msgType: msg.msgType
        },
        message: 'sendMessage'
      }

      console.log('message sending through socket', message);

      this.wsService.messages.next(message);
    }
    // } else {
    //   // this.toastService.presentToast('You are offline now');
    // }
  }

  async SendingMessagethroughSocketforEmployers(messagetosend) {
    // if (this.dataStorage.networkonline) {
    // this.dataStorage.globalShowLoader = true;
    console.log('message to send for emp', messagetosend, this.dataStorage.globalLoggedInUserData);
    let data = this.dataStorage.dataforconversation;
    let usertypeto: any = MyAppHttpService.CHAT_TYPES.RE;
    if (this.dataStorage.Adminchat == true) {
      usertypeto = MyAppHttpService.CHAT_TYPES.RIADMIN;
    }
    // else if (this.dataStorage.mentorJSChat == true) {
    //   usertypeto = MyAppHttpService.CHAT_TYPES.RI
    // }
    let username = "RI";
    if (this.dataStorage.globalLoggedInUserData.userName != "") {
      username = this.dataStorage.globalLoggedInUserData.userName;
    }
    let messagesending = messagetosend.trim();
    if (messagesending.length != 0) {
      let m = {message : messagesending};
      let msg = await this.getFormattedMessage(m);
      let message = {
        data: {
          userId: this.dataStorage.globalLoggedInUserData.userId, userType: MyAppHttpService.CHAT_TYPES.RI, 
          userName: username, chatId: data.chatId, fromEmailId: this.dataStorage.globalLoggedInUserData.emailId, 
          fromMobileNumber: this.dataStorage.globalLoggedInUserData.mobileNumber,
          toUserId: data.toUserId, toUserType: usertypeto, toUserName: data.destinationName, 
          // message: messagetosend
          message: msg.message,
          thumbnail: msg.thumbnail,
          msgType: msg.msgType
        },
        message: 'sendMessage'
      }

      console.log('message sending through socket', message);

      this.wsService.messages.next(message);
    }
    // } else {
    //   this.toastService.presentToast('You are offline now');
    // }
  }


  SendMessageforAttachment(url, filename) {
    // this.attachmentdata = true;
    // let msgtoSend = '<a target="_blank" href="' + url + '">' + filename + '</a>';
    let msgtoSend = '<p class="mylink" name="filetype" id="' + url + '">' + filename + '</p>';
    // if (this.dataStorage.selectedChatTab == 'Groups') {
    this.SendingMessageInGroupChat(msgtoSend);
    // }
    // this.editorMsg = '';
    // this.scrollToBottom();
  }


  UpdateReadCount() {
    console.log('read count data', this.SelectedGroupData.groupId, this.dataStorage.globalLoggedInUserData.userId);
    if (this.dataStorage.globalGroupChatUnreadCount > 0) {
      this.dataStorage.globalGroupChatUnreadCount = this.dataStorage.globalGroupChatUnreadCount - this.SelectedGroupData.unreadCount;
    }
    if (this.dataStorage.globalTotalChatUnreadCount > 0) {
      this.dataStorage.globalTotalChatUnreadCount = this.dataStorage.globalTotalChatUnreadCount - this.SelectedGroupData.unreadCount;
    }
    let apiRequest = {
      groupId: this.SelectedGroupData.groupId,
      userId: this.dataStorage.globalLoggedInUserData.userId
    }
    let request = JSON.parse(JSON.stringify(apiRequest));
    // this.newsendReceiveService.send('chat/readChatMessage', JSON.stringify(request)).subscribe((apiResponse) => {
    this.commonService.ReadChatMessage(apiRequest).subscribe(apiResponse => {
      console.log('After read chat message', apiResponse);
    })
  }

  // For Mentors
  UpdateReadcount1() {

    // if (this.dataStorage.networkonline) {
    let data = this.dataStorage.dataforconversation;
    console.log('data coming for update', data);
    let usertypeto: any = MyAppHttpService.CHAT_TYPES.RI;
    let touserid: any = 1;
    let tousername = MyAppHttpService.CHAT_TYPES.RIADMIN;
    if (this.dataStorage.globalMemberChatUnreadCount > 0) {
      this.dataStorage.globalMemberChatUnreadCount = this.dataStorage.globalMemberChatUnreadCount - data.sourceUnreadCount;
    }
    if (this.dataStorage.globalTotalChatUnreadCount > 0) {
      this.dataStorage.globalTotalChatUnreadCount = this.dataStorage.globalTotalChatUnreadCount - data.sourceUnreadCount;
    }
    console.log('Member Counts: ', this.dataStorage.globalMemberChatUnreadCount, data.sourceUnreadCount);
    if (this.dataStorage.globalMemberChatUnreadCount < 0) {
      this.dataStorage.globalMemberChatUnreadCount = 0;
    }
    this.cdr.detectChanges()
    if (this.dataStorage.Adminchat == true) {
      usertypeto = MyAppHttpService.CHAT_TYPES.RIADMIN;
    } else {
      touserid = data.toUserId;
      tousername = data.destinationName;
    }
    let username = "RI";
    if (this.dataStorage.globalLoggedInUserData.name != "") {
      username = this.dataStorage.globalLoggedInUserData.name;
    }
    var message = {
      data: {
        userId: this.dataStorage.globalLoggedInUserData.userId, userType: MyAppHttpService.CHAT_TYPES.RI, 
        userName: username, chatId: data.chatId,
        toUserId: touserid, toUserType: usertypeto, toUserName: tousername
        //  , message: messageToSend 
      },
      message: MyAppHttpService.CHAT_EVENTS.UPDATE_READ_COUNT
    }

    console.log('update read count calling', message);
    //alert("2032")
    this.dataStorage.dataforconversation.sourceUnreadCount = 0;
    this.wsService.messages.next(message);
    // } else {
    //   this.toastService.presentToast('You are offline now');
    // }
  }

  // For Employers and Admin
  UpdateReadcount2() {
    let data = this.dataStorage.dataforconversation;
    // let data = this.dataStorage.datasendingtochatdetails;
    console.log('data coming for update', data, this.dataStorage.datasendingtochatdetails);
    let usertypeto: any = MyAppHttpService.CHAT_TYPES.RE;
    let touserid: any = 1;
    let tousername = MyAppHttpService.CHAT_TYPES.RIADMIN;
    if (this.dataStorage.Adminchat == true) {
      usertypeto = MyAppHttpService.CHAT_TYPES.RIADMIN;
      if (this.dataStorage.globalEmployerTabChatUnreadCount > 0) {
        this.dataStorage.globalEmployerTabChatUnreadCount = this.dataStorage.globalEmployerTabChatUnreadCount - data.sourceUnreadCount;
      }
      if (this.dataStorage.globalTotalChatUnreadCount > 0) {
        this.dataStorage.globalTotalChatUnreadCount = this.dataStorage.globalTotalChatUnreadCount - data.sourceUnreadCount;
      }
    } else {
      touserid = data.toUserId;
      tousername = data.destinationName;
      if (data.inviteStatus != 2) {
        if (this.dataStorage.globalEmployerTabChatUnreadCount > 0) {
          this.dataStorage.globalEmployerTabChatUnreadCount = this.dataStorage.globalEmployerTabChatUnreadCount - data.sourceUnreadCount;
        }
        if (this.dataStorage.globalTotalChatUnreadCount > 0) {
          this.dataStorage.globalTotalChatUnreadCount = this.dataStorage.globalTotalChatUnreadCount - data.sourceUnreadCount;
        }
      }
    }
    let username = "RI";
    if (this.dataStorage.globalLoggedInUserData.name != "") {
      username = this.dataStorage.globalLoggedInUserData.name;
    }
    var message = {
      data: {
        userId: this.dataStorage.globalLoggedInUserData.userId, userType: MyAppHttpService.CHAT_TYPES.RI, 
        userName: username, chatId: data.chatId,
        toUserId: touserid, toUserType: usertypeto, toUserName: tousername
        //  , message: messageToSend 
      },
      message: MyAppHttpService.CHAT_EVENTS.UPDATE_READ_COUNT
    }

    console.log('update read count calling', message);
    this.dataStorage.dataforconversation.sourceUnreadCount = 0;
    this.wsService.messages.next(message);
  }


  // Employers Tab data

  GetEmployerData(message, area) {
    console.log('message sending', message);
    // if (this.networkService.checkOnline()) {
    if (this.userdetails == false) {
      this.userdetails = true;
      this.dataStorage.userdetailsformodal.userDetails = [];
      this.dataStorage.userdetailsformodal.chatType = '';
      let userid = message.toUserId;
      if (area == 'right') {
        userid = message.userId
      }
      let apiRequest = {
        enterpriseUserId: userid
      }

      console.log('input data : ', apiRequest);
      // this.newsendReceiveService.send('getEnterpriseUser', JSON.stringify(request)).subscribe((apiResponse) => {
      this.commonService.GetEmployerDetails(apiRequest).subscribe(apiResponse => {
        console.log("User details response : ", apiResponse);
        // this.userDetails = apiResponse;
        let userdetails = apiResponse;
        console.log('response data : ', userdetails);
        let chatType = 'employer';
        this.dataStorage.userdetailsformodal.userDetails = userdetails;
        this.dataStorage.userdetailsformodal.chatType = chatType;
        this.UserDetailsModal1(userdetails, chatType);
        // let modalcreating = this.modalCtrl.create(ChatUserDetailsPage, { userData: userdetails, userType: 'employer' });
        // modalcreating.onDidDismiss(data => {
        //   this.userdetails = false;
        // });
        // modalcreating.present();

      })
    }
    // }
  }

  UserDetailsModal1(data, chatType) {
    console.log('data', data);
    let chatData = {
      'userData': data,
      'userType': chatType
    }
    let modalRef = this.modalService.open(UserDetailsComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.data = { DataNew: chatData };
    modalRef.result.then((e) => {
      console.log('result back', e);
      if (e == true) {
        // job.isApplied = true;
        this.userdetails = false;
      }
    });
  }


  openAdminchat(data) {
    this.dataStorage.Adminchat = false;
    console.log('Admin chat data', this.dataStorage.Adminchat);
    if (this.dataStorage.Adminchat == false) {
      console.log('firing admin chat', data);
      this.dataStorage.dataforconversation = data;
      this.editorMsg = '';
      this.GettingChatConversationnew();
      this.ClearAllClicksEmployer();
      this.AdminClicked = true;
      this.dataStorage.Adminchatdetailsenabled = true;
      this.Acceprejreq = true;
      this.dataStorage.openedchatId = data.chatId;
      this.Mentorchat = false;
      this.dataStorage.Adminchat = true;

      this.dataStorage.datasendingtochatdetails = data;

      this.usernameforemployers = 'Rock Interview';
      this.compnameforemployers = 'Admin Chat Support';
      this.Employerschat = true;
      this.EnablingStatusofChat();
      // data.sourceUnreadCount = 0;
      this.UpdateReadcount2();
      // this.dataStorage.globalEmployerTabChatUnreadCount = this.dataStorage.globalEmployerTabChatUnreadCount - data.sourceUnreadCount;
      // this.dataStorage.globalTotalChatUnreadCount = this.dataStorage.globalTotalChatUnreadCount - data.sourceUnreadCount;
      // this.navCtrl.navigateForward('/chat-details', {});
      setTimeout(() => {
        let textnew = document.getElementById('employerinput');
        console.log('group selected', textnew);
        if (textnew != null) {
          textnew.focus();
        }
      }, 500);
    }
  }

  GettingChatConversationnew() {
    // if (this.dataStorage.networkonline) {
    // if (showload == true) {
    //   // this.showLoading();
    // }

    let data = this.dataStorage.dataforconversation;
    console.log('data for getting conversation admin chat', data);
    if (data.chatId != "" && data.chatId != null) {
      let apiRequest = {
        chatId: data.chatId,
        userId: this.dataStorage.globalLoggedInUserData.userId
      }
      // this.chatreceivesrvc.send('/conversationbychatid', JSON.stringify(request)).subscribe((apiResponse) => {
      this.commonService.GetChatById(apiRequest).subscribe(apiResponse => {
        console.log('response of employer chat', apiResponse);
        // if (apiResponse.Items != []) {
        
        apiResponse.Items.forEach(async element => {
          console.log('Element: ', element);
           let msg = JSON.parse(JSON.stringify(element.message));
           let msg1;
           element = await this.getFormattedMessage(element);
           // msg1 = await this.getFormattedMessage(msg);
           element.message = !!msg1 ? msg1 : element.message;
           console.log('await Message: ', element.message, msg, element);
        });
        this.dataStorage.globalchatdetailsconversation = apiResponse.Items;
        console.log('New global chat details conversation list @2053: ', this.dataStorage.globalchatdetailsconversation);
        this.scrollToBottom();
        // this.hideLoading();
        // }
      });
    }
    // } else {
    //   this.toastService.presentToast('You are offline now');
    // }
  }

  selectedChatUserData;
  openEmployerchat(data) {
    // if (this.networkService.checkOnline()) {
    this.selectedChatUserData = JSON.parse(JSON.stringify(data));
    this.ClearAllClicksEmployer();
    this.AdminClicked = false;
    this.dataStorage.Adminchatdetailsenabled = false;
    data.clicked = true;
    console.log('jdj', data);
    this.editorMsg = '';
    this.dataStorage.openedchatId = JSON.parse(JSON.stringify(data.chatId));
    this.dataStorage.Adminchat = false;
    this.dataStorage.dataforconversation = JSON.parse(JSON.stringify(data));
    this.dataStorage.datasendingtochatdetails = JSON.parse(JSON.stringify(data));
    this.HandlingPageBasedonInviteStatus(JSON.parse(JSON.stringify(data)));
    if (data.destinationName != '') {
      this.usernameforemployers = JSON.parse(JSON.stringify(data.destinationName));
    }
    this.compnameforemployers = this.dataStorage.dataforconversation.companyName;
    if (data.inviteStatus == "2") {
      this.dataStorage.globalEmployerTabChatUnreadCount = 0;
      this.dataStorage.globalTotalChatUnreadCount = 0;
      // if(this.dataStorage.globalEmployerTabChatUnreadCount > 0){
      //   this.dataStorage.globalEmployerTabChatUnreadCount
      // }
    }
    this.Employerschat = true;
    this.Mentorchat = false;
    // data.sourceUnreadCount = 0;
    this.UpdateReadcount2();
    data.sourceUnreadCount = 0;
    setTimeout(() => {
      let textnew = document.getElementById('employerinput');
      console.log('group selected', textnew);
      textnew.focus();
    }, 200);
  }

  ClearAllClicksEmployer() {
    if (this.dataStorage.globalRIREChatList.length > 0) {
      for (let i = 0; i < this.dataStorage.globalRIREChatList.length; i++) {
        this.dataStorage.globalRIREChatList[i].clicked = false;
      }
    }
  }


  //Chat from Group Users Page

  goToChat(user) {
    console.log('chat data: ', user);
    if (!navigator.onLine) {
      // this.networkService.showToast(ConnectionStatus.Offline);
      return false;
    }

    if (navigator.onLine) {
      this.userdetailsfornewchat = user;
      let data: any = {};
      if (this.dataStorage.DataFromMentorsList != null) {
        data = {
          // RecentMessageTime: "17 days",
          chatId: "",
          companyName: user.currentCompany,
          destinationEmailId: user.emailId,
          destinationId: user.userId + '_' + MyAppHttpService.CHAT_TYPES.RI,
          destinationMobileNumber: user.mobileNumber,
          destinationName: user.name,
          // eventTime: 1600346817891,
          // inviteStatus: "1",
          // sourceUnreadCount: 0,
          toUserId: user.userId,
          toUserType: MyAppHttpService.CHAT_TYPES.RI,
          // recentMessage: '<p class="mylink" name="urltype" id="https://reqa.rockinterview.in/hiring-id?hiringId=RI697235XMNV">https://reqa.rockinterview.in/hiring-id?hiringId=RI697235XMNV</p>'
        }
      } else {
        data = {
          // RecentMessageTime: "17 days",
          chatId: "",
          companyName: user.currentCompany,
          destinationEmailId: user.email,
          destinationId: user.userId + '_' + MyAppHttpService.CHAT_TYPES.RI,
          destinationMobileNumber: user.mobileNumber,
          destinationName: user.userName,
          // eventTime: 1600346817891,
          // inviteStatus: "1",
          // sourceUnreadCount: 0,
          toUserId: user.userId,
          toUserType: MyAppHttpService.CHAT_TYPES.RI,
          // recentMessage: '<p class="mylink" name="urltype" id="https://reqa.rockinterview.in/hiring-id?hiringId=RI697235XMNV">https://reqa.rockinterview.in/hiring-id?hiringId=RI697235XMNV</p>'
        }
      }


      console.log('chat data: ', data);

      let userChatInfo = {};

      if (this.dataStorage.DataFromMentorsList != null) {
        userChatInfo = {
          userId: this.userData.userId,
          fromUserId: this.userData.userId,
          userName: this.userData.userName,
          userType: MyAppHttpService.CHAT_TYPES.RI,
          sourceUnreadCount: 0,
          adminChatId: '',
          userChatId: '',
          toUserType: MyAppHttpService.CHAT_TYPES.RI,
          toUserName: user.name,
          toUserId: user.userId,
          toEmailId: user.emailId,
          toMobileNumber: user.mobileNumber,
          companyName: user.currentCompany,
          destinationEmailId: user.emailId,
          destinationId: user.userId + '_' + MyAppHttpService.CHAT_TYPES.RI,
          destinationMobileNumber: user.mobileNumber,
          destinationName: user.name
        };

      } else {
        userChatInfo = {
          userId: this.userData.userId,
          fromUserId: this.userData.userId,
          userName: this.userData.userName,
          userType: MyAppHttpService.CHAT_TYPES.RI,
          sourceUnreadCount: 0,
          adminChatId: '',
          userChatId: '',
          toUserType: MyAppHttpService.CHAT_TYPES.RI,
          toUserName: user.userName,
          toUserId: user.userId,
          toEmailId: user.email,
          toMobileNumber: user.mobileNumber,
          companyName: user.currentCompany,
          destinationEmailId: user.email,
          destinationId: user.userId + '_' + MyAppHttpService.CHAT_TYPES.RI,
          destinationMobileNumber: user.mobileNumber,
          destinationName: user.userName
        };
      }

      console.log('Input data for chat id: ', userChatInfo);

      this.wsService.invokeWebSocketFunction(userChatInfo, MyAppHttpService.CHAT_EVENTS.CHAT_ID_BY_USER);

      setTimeout(() => {
        this.getChatData(data);
      }, 1000);
    }
    // this.user = user;
    // let data = {
    //   // RecentMessageTime: "17 days",
    //   chatId: "",
    //   companyName: user.currentCompany,
    //   destinationEmailId: user.email,
    //   destinationId: user.userId + '_' + MyAppHttpService.CHAT_TYPES.RI,
    //   destinationMobileNumber: user.mobileNumber,
    //   destinationName: user.userName,
    //   // eventTime: 1600346817891,
    //   // inviteStatus: "1",
    //   // sourceUnreadCount: 0,
    //   toUserId: user.userId,
    //   toUserType: MyAppHttpService.CHAT_TYPES.RI,
    //   // recentMessage: '<p class="mylink" name="urltype" id="https://reqa.rockinterview.in/hiring-id?hiringId=RI697235XMNV">https://reqa.rockinterview.in/hiring-id?hiringId=RI697235XMNV</p>'
    // }
    // console.log('chat data: ', data);

    // let userChatInfo = {
    //   userId: this.userData.userId,
    //   fromUserId: this.userData.userId,
    //   userName: this.userData.userName,
    //   userType: MyAppHttpService.CHAT_TYPES.RI,
    //   sourceUnreadCount: 0,
    //   adminChatId: '',
    //   userChatId: '',
    //   toUserType: MyAppHttpService.CHAT_TYPES.RI,
    //   toUserName: user.userName,
    //   toUserId: user.userId,
    //   toEmailId: user.email,
    //   toMobileNumber: user.mobileNumber,
    //   companyName: user.currentCompany,
    //   destinationEmailId: user.email,
    //   destinationId: user.userId + '_' + MyAppHttpService.CHAT_TYPES.RI,
    //   destinationMobileNumber: user.mobileNumber,
    //   destinationName: user.userName
    // };

    // console.log('Input data for chat id: ', userChatInfo);

    // this.wsService.invokeWebSocketFunction(userChatInfo, MyAppHttpService.CHAT_EVENTS.CHAT_ID_BY_USER);

    // setTimeout(() => {
    //   this.getChatData(data);
    // }, 1000);

    // this.dataStorage.Adminchat = false;
    // this.dataStorage.mentorJSChat = true;
    // this.dataStorage.dataforconversation = data;
    // this.dataStorage.datasendingtochatdetails = data;
    // this.navCtrl.navigateForward('/mentor-js-chat-details', {});
  }


  getChatData(data) {
    // debugger 
    console.log('chat info: ', this.dataStorage.selectedMentorJSChatId, this.dataStorage.globalMentorJSChatUserInfo);
    // if(!!this.dataStorage.selectedMentorJSChatId) {
    let inputData = {
      chatId: this.dataStorage.selectedMentorJSChatId,
      userId: this.userData.userId,
      toUserId: data.toUserId,
      toUserType: MyAppHttpService.CHAT_TYPES.RI
    }
    console.log('Input data: ', inputData, this.userdetailsfornewchat);

    // this.commonService.GetChatById(this.dataStorage.globalGetChatIdInputData).subscribe((response) => {
    //   if (response && response.Items) {
    //     this.dataStorage.globalMentorJSChatConversations = response.Items;
    //     console.log('conversation: ', this.dataStorage.globalMentorJSChatConversations);
    let userChatInfo: any = {}
    if (this.dataStorage.DataFromMentorsList != null) {
      userChatInfo = {
        userId: this.userData.userId,
        userName: this.userData.userName,
        userType: MyAppHttpService.CHAT_TYPES.RI,
        // sourceUnreadCount: 0,
        adminChatId: '',
        // userChatId: this.dataStorage.globalMentorJSChatUserInfo.chatId,
        chatId: this.dataStorage.globalMentorJSChatUserInfo.chatId,
        toUserType: MyAppHttpService.CHAT_TYPES.RI,
        toUserName: !!this.userdetailsfornewchat.name ? this.userdetailsfornewchat.name : '',
        toUserId: this.userdetailsfornewchat.userId,
        toEmailId: this.userdetailsfornewchat.emailId,
        toMobileNumber: this.userdetailsfornewchat.mobileNumber,
        destinationName: this.userdetailsfornewchat.name,
        destinationEmailId: this.userdetailsfornewchat.emailId,
        destinationId: this.userdetailsfornewchat.userId + '_RI',
        destinationMobileNumber: this.userdetailsfornewchat.mobileNumber,
        companyName: this.userdetailsfornewchat.currentCompany,
        inviteStatus: this.dataStorage.globalMentorJSChatUserInfo.inviteStatus,
        sourceUnreadCount: this.dataStorage.globalMentorJSChatUserInfo.sourceUnreadCount,
        RecentMessageTime: this.dataStorage.globalMentorJSChatUserInfo.RecentMessageTime,
  
      };
    } else {
      userChatInfo = {
        userId: this.userData.userId,
        userName: this.userData.userName,
        userType: MyAppHttpService.CHAT_TYPES.RI,
        // sourceUnreadCount: 0,
        adminChatId: '',
        // userChatId: this.dataStorage.globalMentorJSChatUserInfo.chatId,
        chatId: this.dataStorage.globalMentorJSChatUserInfo.chatId,
        toUserType: MyAppHttpService.CHAT_TYPES.RI,
        toUserName: !!this.userdetailsfornewchat.userName ? this.userdetailsfornewchat.userName : '',
        toUserId: this.userdetailsfornewchat.userId,
        toEmailId: this.userdetailsfornewchat.email,
        toMobileNumber: this.userdetailsfornewchat.mobileNumber,
        destinationName: this.userdetailsfornewchat.userName,
        destinationEmailId: this.userdetailsfornewchat.email,
        destinationId: this.userdetailsfornewchat.userId + '_RI',
        destinationMobileNumber: this.userdetailsfornewchat.mobileNumber,
        companyName: this.userdetailsfornewchat.currentCompany,
        inviteStatus: this.dataStorage.globalMentorJSChatUserInfo.inviteStatus,
        sourceUnreadCount: this.dataStorage.globalMentorJSChatUserInfo.sourceUnreadCount,
        RecentMessageTime: this.dataStorage.globalMentorJSChatUserInfo.RecentMessageTime,
  
      };
    }

    

    this.dataStorage.Adminchat = false;
    this.dataStorage.mentorJSChat = false;
    this.dataStorage.dataforconversation = userChatInfo;
    this.dataStorage.datasendingtochatdetails = userChatInfo;
    this.dataStorage.newchatuserinfo = userChatInfo;
    console.log('Chat input data: ', this.dataStorage.datasendingtochatdetails);

    // this.dataStorage.selectedChatTab = 'Members';
    this.tabSet.select('tSecond');
    setTimeout(() => {
      this.CompareIdandSelectMember();
    }, 1000);

    // this.navCtrl.navigateForward('/mentor-js-chat-details', {});
    //   }
    // });
    // }

  }

  CompareIdandSelectMember() {
    console.log('vrfd', this.dataStorage.globalMentorJSChatUserInfo.chatId);
    if (this.dataStorage.globalMentorJSChatUserInfo.chatId) {
      console.log('fired match', this.dataStorage.globalMentorJSChatUserInfo.chatId, this.dataStorage.globalMentorJSChatList.length);
      for (let i = 0; i < this.dataStorage.globalMentorJSChatList.length; i++) {
        console.log('cdh', this.dataStorage.globalMentorJSChatList[i]);
        if (this.dataStorage.globalMentorJSChatList[i].chatId == this.dataStorage.globalMentorJSChatUserInfo.chatId) {
          console.log('fired match 1');
          // this.dataStorage.globalMentorJSChatList[i].clicked = true;
          this.openMentorchat(this.dataStorage.globalMentorJSChatList[i]);
        }
      }
    } else {
      setTimeout(() => {
        console.log('dada ', this.dataStorage.newchatuserinfo);
        this.dataStorage.globalMentorJSChatList.unshift(this.dataStorage.newchatuserinfo);
        this.openMentorchat(this.dataStorage.newchatuserinfo);
        
      }, 1000);

    }

    this.ClearMentordatafromList = true;
  }

  downloadFile(url, fileName) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", '' + url + '', true);
    xhr.responseType = "blob";
    xhr.onload = function () {
      //var urlCreator = window.URL || window.webkitURL;
      var urlCreator = window.URL;
      var imageUrl = urlCreator.createObjectURL(this.response);
      var tag = document.createElement('a');
      tag.href = imageUrl;
      tag.download = fileName;
      document.body.appendChild(tag);
      tag.click();
      document.body.removeChild(tag);
    }
    xhr.send();
  }

    // Method to convert the chat message media link to image and video
   async getFormattedMessage(element) {
    let message = element.message || element.recentMessage;
    console.log('Message in format: ', message);

    let regex = new RegExp(/<([^\s]+).*?id="([^"]*?)".*?>(.+?)<\/\1>/gi);
    let regex1 = new RegExp(/<([^\s]+).*?name="([^"]*?)".*?>(.+?)<\/\1>/gi);
    let imgRegex = new RegExp(/<img.*?src='(.*?)'.*?id='(.*?)'[^\>]+>/gi);
    let imgMatches, matches, matches1;
    if(!!message) {
      imgMatches = message.match(imgRegex);
      matches = message.match(regex);
      matches1 = message.match(regex1);
    }
    
    let i: any;
    let results = null;
    let results1 = null;
    let imgResults = null;
    let filename = '';
    console.log('Matches: ', matches, matches1, imgMatches);
    for(i in imgMatches) {
      let parts = imgRegex.exec(imgMatches[0]);
      console.log('Parts at results: ', parts);
      results = parts[2];
      let a = results.split('/');
      filename = a[a.length - 1];
    }
    
    for (i in matches) {
      let parts = regex.exec(matches[i]);
      results = parts[2];
      filename = parts[3];
    }
    for (i in matches1) {
      let parts = regex1.exec(matches1[i]);
      // console.log('pp', parts[2]);
      results1 = parts[2];
    }
    console.log('message formats', results, results1, filename);
    let filetype = filename.split('.')[filename.split('.').length - 1];
    let fileExtension = !!filetype ? this.dataStorage.GettingContentType(filetype) : '';
    let ft = !!fileExtension ? fileExtension.split('/')[0] : '';
    console.log('filetype: ', filetype, ft, filename);

    // debugger
    let thumbnailPath;
    let formattedMessage = message;

    if (!!ft && ft == 'image') {
      message = "<img src='" + results + "' class='chat-img' name='filetype' id='" + results + "' />";
      // formattedMessage =  message;
      element.message = message;
      element.msgType = 'image';
      // if(typeof thumbnailPath == 'object') {
      //   element.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnailPath.changingThisBreaksApplicationSecurity);
      // }
      // else {
      //   element.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnailPath);
      // }
      element.thumbnail = results;
    }
    else if (ft == 'video') {
      // console.log('Video Details: ', results, filetype);
      // setTimeout(() => {    
      await this.getThumbnailFromVideoURL(results).then(re => {
        console.log('res thumb: ', re);
        thumbnailPath = re;
        console.log('Thumbnail path: ', thumbnailPath.changingThisBreaksApplicationSecurity);
        if(!!thumbnailPath) {
          message = "<img src='" + thumbnailPath.changingThisBreaksApplicationSecurity + "' class='chat-img' name='filetype' id='" + results + "' />";
          console.log('Video Message: ', message);
          // formattedMessage = message; 
          element.message = message; 
          // element.thumbnail = thumbnailPath;
          if(typeof thumbnailPath == 'object') {
            element.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnailPath.changingThisBreaksApplicationSecurity);
          }
          else {
            element.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnailPath);
          }
          element.msgType = 'video';
        }
        
      });

      // console.log('Thumbnail path: ', thumbnailPath);  
      // message = "<img src='" + thumbnailPath + "' class='chat-img' name='filetype' id='" + results + "' /> <img  src='/assets/imgs/ri/white_play_button.png' alt='ri' style='height:70px; width:70px; position: absolute; display: block; top: 38%; bottom: 40%; left:40%;' id='btnPlayVideo'>" ;
      // console.log('Message: ', message);
      // }, 100);

    }
    else if(ft == 'application') {
      if(filetype == 'pdf') {
        element.message = message;
        element.msgType = 'pdf';
      }
      else if(filetype == 'doc' || filetype == 'docx') {
        element.message = message;
        element.msgType = 'doc';
      }
     
    }
    else if(ft == 'text' && filetype == 'txt') {
      element.message = message;
      element.msgType = 'doc';
    }
    else {
      element.msgType = 'text';
    }
    console.log('Formatted Message: ', formattedMessage, element);
    return element;
    // else {
    //   return message;
    // }
    // console.log('Message: ', message);
    // return message;
  }

  // Method to get thumbnail from video url
   getThumbnailFromVideoURL(videoPath) {
    return new Promise(async (resolve, reject) => {
      console.log('Video path from chat: ', videoPath);
      const metadata =  await getMetadata(videoPath);
      const thumbnails = await getThumbnails(videoPath, {
        quality: 0.6,
        start: 2
      });

      console.log('Video path Metadata and thumbnails: ', metadata, thumbnails);

      const url2 = URL.createObjectURL(thumbnails[0].blob);
      console.log('URLs: ', url2);

      let thumbnailPath1 = this.sanitizer.bypassSecurityTrustUrl(url2);
      console.log('my-src: ', thumbnailPath1);
      this.thumbnailPath = thumbnailPath1;
      resolve(thumbnailPath1);
    });
  }

  getFile(event, chatType) {
    if (this.checkOnline()) 
    {
    this.files = event.target.files
    this.files = event.target.files || event.srcElement.files;
    console.log("File list length : ", this.files.length);
    console.log("Resume : ", this.files);
    // this.uploadResume(this.uMobile);
    // console.log("Resume upload", this.resumePath);

    let name = '';
    let fileExt = '';
    let size = 0;
    if (!!this.files) {
      name = this.files[0].name;
      fileExt = name.split('.').pop();
      size = this.files[0].size;
    }

    console.log("Files, names : ", this.files);
    // let matchimg = (/\.(gif|jpe?g|tiff|png|webp|bmp)$/i).test(name);
    // console.log('matched data', matchimg);
    if (this.files === undefined) {
      // try {

      // } catch (e) {

      // }
      // return;
    } else if (this.files.length == 0) {
      this.commonService.showToast(MyAppHttpService.ToastType.ERROR, '', "File not selected.");
      // try {

      // } catch (e) {

      // }
      // return;
    } else if (size == 0) {
      this.commonService.showToast(MyAppHttpService.ToastType.ERROR, '', "File not supported, Please select another file.");
      // try {

      // } catch (e) {

      // }
      // return;
    } else if (size > 10485760) {
      this.commonService.showToast(MyAppHttpService.ToastType.ERROR, '', "Please select file less than 10 MB.");
      // try {

      // } catch (e) {

      // }
      // return;
    } else {
      // this.uploadResume(chatType);
      this.uploadBinaryFile(chatType);
      // return;
    }
   }
  }

  GettingContentType(fileExt) {
    console.log('file exension', fileExt);
    if (fileExt == 'html' || fileExt == 'htm' || fileExt == 'shtml') {
      return 'text/html';
    } else if (fileExt == 'css') {
      return 'text/css';
    } else if (fileExt == 'xml') {
      return 'text/xml';
    } else if (fileExt == 'gif') {
      return 'image/gif';
    } else if (fileExt == 'jpeg' || fileExt == 'jpg') {
      return 'image/jpeg';
    } else if (fileExt == 'js') {
      return 'application/x-javascript';
    } else if (fileExt == 'atom') {
      return 'application/atom+xml';
    } else if (fileExt == 'rss') {
      return 'application/rss+xml';
    } else if (fileExt == 'mml') {
      return 'text/mathml';
    } else if (fileExt == 'txt') {
      return 'text/plain';
    } else if (fileExt == 'jad') {
      return 'text/vnd.sun.j2me.app-descriptor';
    } else if (fileExt == 'wml') {
      return 'text/vnd.wap.wml';
    } else if (fileExt == 'htc') {
      return 'text/x-component';
    } else if (fileExt == 'png') {
      return 'image/png';
    } else if (fileExt == 'tif' || fileExt == 'tiff') {
      return 'image/tiff';
    } else if (fileExt == 'wbmp') {
      return 'image/vnd.wap.wbmp';
    } else if (fileExt == 'ico') {
      return 'image/x-icon';
    } else if (fileExt == 'jng') {
      return 'image/x-jng';
    } else if (fileExt == 'bmp') {
      return 'image/x-ms-bmp';
    } else if (fileExt == 'svg') {
      return 'image/svg+xml';
    } else if (fileExt == 'webp') {
      return 'image/webp';
    } else if (fileExt == 'jar' || fileExt == 'war' || fileExt == 'ear') {
      return 'application/java-archive';
    } else if (fileExt == 'hqx') {
      return 'application/mac-binhex40';
    } else if (fileExt == 'pdf') {
      return 'application/pdf';
    } else if (fileExt == 'ps' || fileExt == 'eps' || fileExt == 'ai') {
      return 'application/postscript';
    } else if (fileExt == 'rtf') {
      return 'application/rtf';
    } else if (fileExt == 'xls') {
      return 'application/vnd.ms-excel';
    } else if (fileExt == 'wmlc') {
      return 'application/vnd.wap.wmlc';
    } else if (fileExt == 'kml') {
      return 'application/vnd.google-earth.kml+xml';
    } else if (fileExt == 'kmz') {
      return 'application/vnd.google-earth.kmz';
    } else if (fileExt == '7z') {
      return 'application/x-7z-compressed';
    } else if (fileExt == 'cco') {
      return 'application/x-cocoa';
    } else if (fileExt == 'jardiff') {
      return 'application/x-java-archive-dif';
    } else if (fileExt == 'jnlp') {
      return 'application/x-java-jnlp-file';
    } else if (fileExt == 'run') {
      return 'application/x-makeself';
    } else if (fileExt == 'pl' || fileExt == 'pm') {
      return 'application/x-perl';
    } else if (fileExt == 'prc' || fileExt == 'pdb') {
      return 'application/x-pilot';
    } else if (fileExt == 'rar') {
      return 'application/x-rar-compressed';
    } else if (fileExt == 'rpm') {
      return 'application/x-redhat-package-manager';
    } else if (fileExt == 'sea') {
      return 'application/x-sea';
    } else if (fileExt == 'swf') {
      return 'application/x-shockwave-flash';
    } else if (fileExt == 'sit') {
      return 'application/x-stuffit';
    } else if (fileExt == 'tcl' || fileExt == 'tk') {
      return 'application/x-tcl';
    } else if (fileExt == 'der' || fileExt == 'pem' || fileExt == 'crt') {
      return 'application/x-x509-ca-cert';
    } else if (fileExt == 'xpi') {
      return 'application/x-xpinstall';
    } else if (fileExt == 'xhtml') {
      return 'application/xhtml+xml';
    } else if (fileExt == 'zip') {
      return 'application/zip';
    } else if (fileExt == 'odt' || fileExt == 'ppt' || fileExt == 'pptx' || fileExt == 'xlsx' || fileExt == 'docx' || fileExt == 'doc' || fileExt == 'ods' || fileExt == 'odp' || fileExt == 'bin' || fileExt == 'exe' || fileExt == 'dll' || fileExt == 'deb' || fileExt == 'dmg' || fileExt == 'eot' || fileExt == 'iso' || fileExt == 'img' || fileExt == 'msi' || fileExt == 'msp' || fileExt == 'msm') {
      return 'application/octet-stream';
    } else if (fileExt == 'mid' || fileExt == 'midi' || fileExt == 'kar') {
      return 'audio/midi';
    } else if (fileExt == 'mp3') {
      return 'audio/mpeg';
    } else if (fileExt == 'ogg') {
      return 'application/ogg';
    } else if (fileExt == 'ra') {
      return 'audio/x-realaudio';
    } else if (fileExt == '3gpp' || fileExt == '3gp') {
      return 'video/3gpp';
    } else if (fileExt == 'mpeg' || fileExt == 'mpg') {
      return 'audio/mpeg';
    } else if (fileExt == 'mov') {
      return 'video/quicktime';
    } else if (fileExt == 'flv') {
      return 'video/x-flv';
    } else if (fileExt == 'mng') {
      return 'video/x-mng';
    } else if (fileExt == 'asx' || fileExt == 'asf') {
      return 'video/x-ms-asf';
    } else if (fileExt == 'wmv') {
      return 'video/x-ms-wmv';
    } else if (fileExt == 'avi') {
      return 'video/x-msvideo';
    } else if (fileExt == 'm4v' || fileExt == 'mp4') {
      return 'video/mp4';
    } else if (fileExt == 'csv') {
      return 'text/csv';
    } else if (fileExt == 'apk') {
      return 'application/vnd.android.package-archive';
    } else if (fileExt == 'eml') {
      return 'message/rfc822';
    } else if (fileExt == 'vcf') {
      return 'application/vcard';
    } else {
      return null;
    }
  }

  uploadBinaryFile(chatType) {
    let file: File = this.files[0];
    let fileName: string = '';
    let username;
    if (this.files.length > 0) {
      fileName = this.files[0].name;
    }
    let chattype1 = 'groupchat';
    if (chatType == 'userChat') {
      chattype1 = 'chat';
    }

    if(chatType == 'groupChat') {
      username = this.SelectedGroupData.groupName;
    }
    else if(chatType == 'userChat') {
      if(this.dataStorage.Adminchat) {
        username = 'Admin';
      }
      else {
        username = this.dataStorage.dataforconversation.destinationName;
      }
    }
    console.log('Data for conversation: ', this.dataStorage.dataforconversation, this.SelectedGroupData, username);
    console.log('logged in userdata: ', this.dataStorage.loggedInUserData, this.dataStorage.globalLoggedInUserData);
    //replace the url with actual url
    // var URL = `https://i3mq9up7o3.execute-api.ap-south-1.amazonaws.com/dev/apis3test/${file.name}`;
       let usertype: any = 'JS';
    if (this.dataStorage.globalLoggedInUserData.userType == 2) {
      usertype = 'INT';
    }
    var URL = environment.chat_attachment_url + environment.env + '%2F' + chattype1 + '%2F' + usertype + '%2F' + this.dataStorage.globalLoggedInUserData.userId + '%2F' + fileName;
    var header = new HttpHeaders({
      'Content-Type': this.GettingContentType(file.name.split('.')[file.name.split('.').length - 1])
    });
    console.log('url for uploading attachment: ', URL);
    
    let confirmModalRef = this.modalService.open(ConfirmationPopupComponent, { windowClass: 'confirmation-dialog', centered: true });
    // confirmModalRef.componentInstance.data = { contentText: 'Are you sure you want to send this attachment ?', title: 'Send attachment' }
    confirmModalRef.componentInstance.data = { contentText: 'Send ' + file.name + ' to ' + username, title: 'Attachment' }

    confirmModalRef.result.then((value) => {
      if(!!value) {
        this.http.put(URL, file, { headers: header }).subscribe(
          (r) => {
            console.log('uploaded successfully', r)
            let uploadpath = 'https://richatattachments.s3.ap-south-1.amazonaws.com/' + environment.env + '/' + chattype1 + '/' + usertype + '/' + this.dataStorage.globalLoggedInUserData.userId + '/' + fileName;
            if (chatType == 'userChat') {
              this.onInsertMessageClick(this.fileUrlify(uploadpath, fileName), 'file');
            }
            else {
              this.onInsertMessageClickInGroup(this.fileUrlify(uploadpath, fileName), 'file');
            }
            this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, '', 'File Uploaded successfully.');
          }
        )
      }
    });

    
  }

  fileUrlify(url, fileName) {
    // var urlRegexWithHttp = /(https?:\/\/[^\s]+)/g;
    // var urlRegex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi

    // if (text.match(urlRegex)) {
    //   var temptext = text.toLowerCase()
    //   if (!temptext.match(urlRegexWithHttp)) {
    //     text = "http://" + text;
    //   }
    // }
    // return text.replace(urlRegex, function (url) {


    // return '<a target="_blank" href="' + url + '">' + fileName + '</a>';
    return '<p class="mylink" name="filetype" id="' + url + '">' + fileName + '</p>';
    
    // });
    // or alternatively
    // return text.replace(urlRegex, '<a href="$1">$1</a>')
  }

  async onInsertMessageClickInGroup(message, messageType) {

    if (this.checkOnline()) {

     
    
      let messageToSend;
      // let emaildata = (/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).test(message);
      let emaildata = message.match('@');
      console.log('email data 2', emaildata);
      if (messageType != 'file' && !emaildata) {
        messageToSend = this.urlify(message);
      }
      else {
        messageToSend = message;
      }
      console.log('Message to send : ', messageToSend);

      if (messageToSend && messageToSend.trim().length != 0) {
        let m = {message : messageToSend};
        let msg = await this.getFormattedMessage(m);
        
        let inputData = {
          adminUserId: null,
          groupId: this.dataStorage.clickedGroupId,
          groupName: this.SelectedGroupData.groupName,
          // message: messageToSend,
          messageFromAdmin: false,
          userId: this.dataStorage.globalLoggedInUserData.userId,
          userName: this.dataStorage.globalLoggedInUserData.userName,
          userType: this.dataStorage.globalLoggedInUserData.userType,
          message: msg.message, 
          thumbnail: JSON.stringify(msg.thumbnail), 
          msgType: msg.msgType
        }
        console.log('Input data : ', inputData);
        //debugger
        this.commonService.SendGroupChatMessage(inputData, false).subscribe(response => {
          console.log('Sent message response : ', response);
          if (response && response.statusCode == 200) {
            // this.getAllGroups();
            // this.getGroupChat(this.dataStorage.globalSelectedGroupChat);
            // this.dataStorage.addingNewGroup = false;
            setTimeout(() => {
              if (!!document.getElementById('chatbody')) {
                document.getElementById('chatbody').scrollTop = document.getElementById('chatbody').scrollHeight;
              }
            }, 100);
          }
        });
      }
    }

  }

}
