import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import { environment } from '../../../environments/environment';
import { map, take } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { DataStorageService } from '../../shared/service/data-storage.service';
import { MyAppHttpService } from '../../shared/service/my-app-http.service';
import { DomSanitizer } from '@angular/platform-browser';
import { } from 'src/app/layouts/chat/chat.component'
// import { MentorsListPage } from '../pages/mentors-list/mentors-list.page';
// import { User } from '../../../providers/providers';
// import { Events } from '@ionic/angular';
// import { JobsService } from './jobs.service';
// import { ChatSendReceiveService } from './chatsendreceive.service';
export interface Message {
  data: Object,
  message: string
}

@Injectable(
  //     {
  //   providedIn: 'root'
  // }
)

export class WebsocketService {

  constructor(private gv: DataStorageService, private sanitizer: DomSanitizer
    // , public mentorChatRef: MentorsListPage
  ) {
    this.messages = <Subject<Message>>this
      .connect(environment.WS_CHAT_URL)
      .pipe(map((response: MessageEvent): Message => {
        // debugger
        console.log('data return back from socket 1st', response);
        var responseData = JSON.parse(response.data);
        if (responseData.eventName == MyAppHttpService.CHAT_EVENTS.LOAD_ADMIN_CONVERSATION) {
          if (response.data.message == "Internal server error") {
          } else {
            console.log('response of load admin conversation 101 1st', responseData.data);
            this.gv.globalAdminChatInformation = responseData.data;
          }
          console.log('global varaibales data service websocket 1st', this.gv.globalRIREChatConversations);
        }
        if (responseData.eventName == MyAppHttpService.CHAT_EVENTS.SEND_MESSAGE) {
          if (responseData.message == "Internal server error") {

          } else {
            console.log('response data 11 1st', responseData, this.gv.selectedChatTab, this.gv.Adminchatdetailsenabled, this.gv.chatlist, this.gv.EnteredChatlist);
            if(!!responseData.data) {
              if(!!responseData.data.thumbnail) {
                // let thumbnail = JSON.parse(responseData.data.thumbnail);
                let thumbnail = responseData.data.thumbnail;
                console.log('thumbnail: ', thumbnail);
                if(typeof thumbnail == 'object') {
                  if(thumbnail.changingThisBreaksApplicationSecurity.indexOf('blob') != -1) {
                    responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail.changingThisBreaksApplicationSecurity);
                  }
                } 
                else if(thumbnail.indexOf('blob') != -1) {
                  responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail);
                }
                else {
                  responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail);
                }
              }
            }
           
            // messages from Rock Interview Admin comes here
            if (responseData.data.userType == 'RIADMIN') {
              if (this.gv.selectedChatTab == 'Employers') {
                console.log('RI Admin messages in Employers tab 1st');
                console.log('Entered for Rock Admin message 1st');
                if (this.gv.Adminchatdetailsenabled == true) {
                  console.log('In Chat details 1st');
                  if(!!responseData.data.thumbnail) {
                    // let thumbnail = JSON.parse(responseData.data.thumbnail);
                    let thumbnail = responseData.data.thumbnail;
                    console.log('thumbnail: ', thumbnail);
                    if(typeof thumbnail == 'object') {
                      if(thumbnail.changingThisBreaksApplicationSecurity.indexOf('blob') != -1) {
                        responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail.changingThisBreaksApplicationSecurity);
                      }
                    } 
                    else if(thumbnail.indexOf('blob') != -1) {
                      responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail);
                    }
                    else {
                      responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail);
                    }
                  }
                  this.gv.globalchatdetailsconversation.push(responseData.data);
                  this.gv.scrolldown.next();
                } else {
                  console.log('else chat details 1st');
                  let count = parseInt(this.gv.globalAdminChatInformation.sourceUnreadCount) + 1;
                  this.gv.globalAdminChatInformation.sourceUnreadCount = count.toString();
                }
                this.gv.globalAdminChatInformation.recentMessage = responseData.data.message;
                this.gv.globalAdminChatInformation.RecentMessageTime = responseData.data.RecentMessageTime;
              } else {
                // if not employers tab
                console.log('Employers tab count increasing 1 1st');
                this.gv.globalEmployerTabChatUnreadCount = this.gv.globalEmployerTabChatUnreadCount + 1;
              }

              if (this.gv.selectedChatTab == 'Members') {
                console.log('RI Admin messages in Members tab 1st');
              }

              if (this.gv.selectedChatTab == 'Groups') {
                console.log('RI Admin messages in Groups tab 1st');
              }
            }

            // messages from Rock Enterprise comes here
            if (responseData.data.userType == 'RE') {
              console.log('Entered for Rock Enterprise message 1st');
              if (this.gv.selectedChatTab == 'Employers') {
                if (responseData.data.toUserType == 'RI') {
                  if (Object.keys(responseData.newChatInitiationInfo).length > 0) {
                    console.log('Added new chat 1st', responseData.newChatInitiationInfo);
                    this.gv.globalRIREChatList.push(responseData.newChatInitiationInfo);
                    this.gv.globalRIREChatList.sort((a, b) => (b.eventTime > a.eventTime) ? 1 : -1);
                  } else {
                    console.log('Added new message 1st', responseData.data);
                    let chatidfound: boolean = false;
                    for (let i = 0; i < this.gv.globalRIREChatList.length; i++) {
                      if (this.gv.globalRIREChatList[i].chatId == responseData.data.chatId) {
                        chatidfound = true;
                        let count = parseInt(this.gv.globalRIREChatList[i].sourceUnreadCount) + 1;
                        if (responseData.data.chatId != this.gv.openedchatId) {
                          this.gv.globalRIREChatList[i].sourceUnreadCount = count.toString();
                        }
                        this.gv.globalRIREChatList[i].recentMessage = responseData.data.message;
                        this.gv.globalRIREChatList[i].RecentMessageTime = responseData.data.RecentMessageTime;
                        this.gv.globalRIREChatList[i].eventTime = responseData.data.eventTime;
                        this.gv.globalRIREChatList.sort((a, b) => (b.eventTime > a.eventTime) ? 1 : -1);
                      }
                    }
                    if (responseData.data.chatId == this.gv.openedchatId) {
                      if(!!responseData.data.thumbnail) {
                        // let thumbnail = JSON.parse(responseData.data.thumbnail);
                        let thumbnail = responseData.data.thumbnail;
                        console.log('thumbnail: ', thumbnail);
                        if(typeof thumbnail == 'object') {
                          if(thumbnail.changingThisBreaksApplicationSecurity.indexOf('blob') != -1) {
                            responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail.changingThisBreaksApplicationSecurity);
                          }
                        } 
                        else if(thumbnail.indexOf('blob') != -1) {
                          responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail);
                        }
                        else {
                          responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail);
                        }
                      }
                      this.gv.globalchatdetailsconversation.push(responseData.data);
                      this.gv.scrolldown.next();
                    }
                  }
                }
              } else {
                // if not employers tab
                this.gv.globalEmployerTabChatUnreadCount = this.gv.globalEmployerTabChatUnreadCount + 1;
                console.log('Employers tab count increasing 2 1st');
              }
            }

            // messages from Rock Interview App or Web comes here (own sending messages also)
            if (responseData.data.userType == 'RI') {
              console.log('Entered for Rock Interview message 1st');
              if (responseData.data.toUserType == 'RIADMIN') {
                if (this.gv.selectedChatTab == 'Employers') {
                  // messages pushing to Admin chat details page
                  console.log('to user type RI Admin 1st');
                  if (this.gv.Adminchatdetailsenabled == true) {
                    console.log('In Chat details 1 1st');
                    if(!!responseData.data.thumbnail) {
                      // let thumbnail = JSON.parse(responseData.data.thumbnail);
                      let thumbnail = responseData.data.thumbnail;
                      console.log('thumbnail: ', thumbnail);
                      if(typeof thumbnail == 'object') {
                        if(thumbnail.changingThisBreaksApplicationSecurity.indexOf('blob') != -1) {
                          responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail.changingThisBreaksApplicationSecurity);
                        }
                      } 
                      else if(thumbnail.indexOf('blob') != -1) {
                        responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail);
                      }
                      else {
                        responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail);
                      }
                    }
                    this.gv.globalchatdetailsconversation.push(responseData.data);
                    this.gv.scrolldown.next();
                  } else {
                    console.log('else chat details 1 1st');
                    let count = parseInt(this.gv.globalAdminChatInformation.sourceUnreadCount) + 1;
                    this.gv.globalAdminChatInformation.sourceUnreadCount = count.toString();
                  }
                  this.gv.globalAdminChatInformation.recentMessage = responseData.data.message;
                  this.gv.globalAdminChatInformation.RecentMessageTime = responseData.data.RecentMessageTime;
                } else {
                  this.gv.globalEmployerTabChatUnreadCount = this.gv.globalEmployerTabChatUnreadCount + 1;
                  console.log('Employers tab count increasing 3 1st');
                }
              }

              if (responseData.data.toUserType == 'RI') {
                console.log('to user type == RI 1st');
                if (this.gv.selectedChatTab == 'Members') {
                  //alert("213")
                  if (Object.keys(responseData.newChatInitiationInfo).length > 0) {
                    console.log('Added new chat 1st', responseData.newChatInitiationInfo);
                    this.gv.globalMentorJSChatList.push(responseData.newChatInitiationInfo);
                    this.gv.globalMentorJSChatList.sort((a, b) => (b.eventTime > a.eventTime) ? 1 : -1);
                  } else {
                    console.log('Added new message 1st', responseData.data, this.gv.globalMentorJSChatList, this.gv.openedchatId);
                    if (this.gv.openedchatId == null || this.gv.openedchatId == undefined) {
                      console.log('came here if it is new 1st');
                      this.gv.openedchatId = responseData.data.chatId;
                      this.gv.dataforconversation.chatId = responseData.data.chatId;
                    }
                    let chatidfound: boolean = false;
                    console.log('list 1st', this.gv.globalMentorJSChatList);
                    for (let i = 0; i < this.gv.globalMentorJSChatList.length; i++) {
                      if (this.gv.globalMentorJSChatList[i].chatId != null && this.gv.globalMentorJSChatList[i].chatId != '') {
                        console.log('chat ids 1st', this.gv.openedchatId, responseData.data.chatId);
                        // record is old which is having chat id
                        // debugger
                        if (this.gv.globalMentorJSChatList[i].chatId == responseData.data.chatId) {
                          console.log('chat id matched 1st');
                          chatidfound = true;
                          if (this.gv.openedchatId != this.gv.globalMentorJSChatList[i].chatId) {
                            let count = parseInt(this.gv.globalMentorJSChatList[i].sourceUnreadCount) + 1;
                            this.gv.globalMentorJSChatList[i].sourceUnreadCount = count.toString();
                          }
                          this.gv.globalMentorJSChatList[i].recentMessage = responseData.data.message;
                          this.gv.globalMentorJSChatList[i].RecentMessageTime = responseData.data.RecentMessageTime;
                          this.gv.globalMentorJSChatList[i].eventTime = responseData.data.eventTime;
                          this.gv.globalMentorJSChatList.sort((a, b) => (b.eventTime > a.eventTime) ? 1 : -1);
                        }
                      } else {
                        console.log('chat id not matched 1st');
                        // if record is new from group chat
                        this.gv.globalMentorJSChatList[i].chatId = responseData.data.chatId;
                        this.gv.globalMentorJSChatList[i].recentMessage = responseData.data.message;
                        this.gv.globalMentorJSChatList[i].RecentMessageTime = responseData.data.RecentMessageTime;
                        this.gv.globalMentorJSChatList[i].eventTime = responseData.data.eventTime;
                        this.gv.globalMentorJSChatList[i].inviteStatus = 1;
                        this.gv.globalMentorJSChatList.sort((a, b) => (b.eventTime > a.eventTime) ? 1 : -1);
                      }
                    }
                  }
                  console.log('opened chat id 1st', this.gv.openedchatId);
                  if (this.gv.openedchatId == responseData.data.chatId) {
                    // if opened chat matched
                    if(!!responseData.data.thumbnail) {
                      // let thumbnail = JSON.parse(responseData.data.thumbnail);
                      let thumbnail = responseData.data.thumbnail;
                      console.log('thumbnail: ', thumbnail);
                      if(typeof thumbnail == 'object') {
                        if(thumbnail.changingThisBreaksApplicationSecurity.indexOf('blob') != -1) {
                          responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail.changingThisBreaksApplicationSecurity);
                        }
                      } 
                      else if(thumbnail.indexOf('blob') != -1) {
                        responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail);
                      }
                      else {
                        responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail);
                      }
                    }
                    this.gv.globalMentorJSChatConversations.push(responseData.data);
                    this.gv.scrolldown.next();
                  }

                } else {
                  console.log('Members tab count increasing 1 1st');
                  //alert("281")
                  this.gv.globalMemberChatUnreadCount = this.gv.globalMemberChatUnreadCount + 1;
                }
              }

              if (responseData.data.toUserType == 'RE') {
                console.log('to usertype == RE 1st');
                // messages pushing to employers chat list and details page.
                if (this.gv.selectedChatTab == 'Employers') {
                  for (let i = 0; i < this.gv.globalRIREChatList.length; i++) {
                    if (this.gv.globalRIREChatList[i].chatId == responseData.data.chatId) {
                      let count = parseInt(this.gv.globalRIREChatList[i].sourceUnreadCount) + 1;
                      if (responseData.data.chatId != this.gv.openedchatId) {
                        this.gv.globalRIREChatList[i].sourceUnreadCount = count.toString();
                      }
                      this.gv.globalRIREChatList[i].recentMessage = responseData.data.message;
                      this.gv.globalRIREChatList[i].RecentMessageTime = responseData.data.RecentMessageTime;
                      this.gv.globalRIREChatList[i].eventTime = responseData.data.eventTime;
                      this.gv.globalRIREChatList.sort((a, b) => (b.eventTime > a.eventTime) ? 1 : -1);
                    }
                  }
                  if (responseData.data.chatId == this.gv.openedchatId) {
                    if(!!responseData.data.thumbnail) {
                      // let thumbnail = JSON.parse(responseData.data.thumbnail);
                      let thumbnail = responseData.data.thumbnail;
                      console.log('thumbnail: ', thumbnail);
                      if(typeof thumbnail == 'object') {
                        if(thumbnail.changingThisBreaksApplicationSecurity.indexOf('blob') != -1) {
                          responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail.changingThisBreaksApplicationSecurity);
                        }
                      } 
                      else if(thumbnail.indexOf('blob') != -1) {
                        responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail);
                      }
                      else {
                        responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail);
                      }
                    }
                    this.gv.globalchatdetailsconversation.push(responseData.data);
                    this.gv.scrolldown.next();
                  }
                } else {
                  this.gv.globalEmployerTabChatUnreadCount = this.gv.globalEmployerTabChatUnreadCount + 1;
                  console.log('Employers tab count increasing 4 1st');
                }
              }
            }

            // if no tab selected
            if (this.gv.selectedChatTab != 'Groups' && this.gv.selectedChatTab != 'Members' && this.gv.selectedChatTab != 'Employers') {
              //alert("331")
              console.log('came here if no tab selected 1st', this.gv.globalTotalChatUnreadCount);
              this.gv.globalTotalChatUnreadCount = this.gv.globalTotalChatUnreadCount + 1;
            }
          }
        }
        if (responseData.eventName == MyAppHttpService.CHAT_EVENTS.INVITE_STATUS_UPDATE) {
          console.log('invite status update websocket 1st', responseData.data);
          if (responseData.message == "Internal server error") {

          } else {
            console.log('response data 2 1st', responseData);
          }
        }
        if (responseData.eventName == MyAppHttpService.CHAT_EVENTS.GROUP_MESSAGE) {
          console.log('Group Message response from Websocket1', responseData.data, response.data);
          if (response.data.message == "Internal server error") {
          } else {
            console.log('response data 33', responseData);
            if (responseData.data.eventType == "Delete") {
              console.log('Group message Delete');
              if (this.gv.chatlist == false) {
                console.log('chat list data2', this.gv.ongrpchatdetails);
                if (this.gv.ongrpchatdetails == true) {
                  console.log('chat list data3', this.gv.clickedGroupId, responseData.data.groupId, this.gv.globalgroupchatdetailsconversation);
                  if (this.gv.clickedGroupId == responseData.data.groupId) {
                    console.log('chat list data4');
                    for (let i = 0; i < this.gv.globalgroupchatdetailsconversation.length; i++) {
                      console.log('chat list dat5');
                      if (responseData.data.messageId == this.gv.globalgroupchatdetailsconversation[i].messageId) {
                        console.log('delete name changed');
                        this.gv.globalgroupchatdetailsconversation[i].message = responseData.data.message;
                        this.gv.globalgroupchatdetailsconversation[i].msgType = 'text';
                      }
                    }
                  }
                }
              }
            } else {
              if (this.gv.selectedChatTab == 'Groups') {
                console.log('If not Delete');
                for (let i = 0; i < this.gv.globalRIGroupsChatList.length; i++) {
                  if (this.gv.globalRIGroupsChatList[i].groupId == responseData.data.groupId) {
                    if ((this.gv.clickedGroupId != responseData.data.groupId)) {
                      let count = parseInt(this.gv.globalRIGroupsChatList[i].unreadCount) + 1;
                      this.gv.globalRIGroupsChatList[i].unreadCount = count.toString();
                    }

                    this.gv.globalRIGroupsChatList[i].message = responseData.data.message;
                    this.gv.globalRIGroupsChatList[i].messageTime = responseData.data.messageTime;
                    this.gv.globalRIGroupsChatList[i].messageDate = responseData.data.messageDate;
                    this.gv.globalRIGroupsChatList[i].eventTime = new Date(responseData.data.messageDate).getTime();
                    this.gv.globalRIGroupsChatList.sort((a, b) => (b.eventTime > a.eventTime) ? 1 : -1);
                  }
                }
                if (this.gv.clickedGroupId == responseData.data.groupId) {
                  responseData.data.postedDate = responseData.data.messageDate;
                  if(!!responseData.data.thumbnail) {
                    // let thumbnail = JSON.parse(responseData.data.thumbnail);
                    let thumbnail = responseData.data.thumbnail;
                    console.log('thumbnail: ', thumbnail);
                    if(typeof thumbnail == 'object') {
                      if(thumbnail.changingThisBreaksApplicationSecurity.indexOf('blob') != -1) {
                        responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail.changingThisBreaksApplicationSecurity);
                      }
                    } 
                    else if(thumbnail.indexOf('blob') != -1) {
                      responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail);
                    }
                    else {
                      responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail);
                    }
                  }
                  debugger
                  // responseData.data = this.gv.getFormattedMessage(responseData.data);
                  console.log('Response after formatting: ', this.gv.getFormattedMessage(responseData.data));
                  this.gv.globalgroupchatdetailsconversation.push(responseData.data);
                  this.gv.scrolldown.next();
                }
              } else {
                console.log('Not groups tab', this.gv.globalGroupChatUnreadCount);
                this.gv.globalGroupChatUnreadCount = this.gv.globalGroupChatUnreadCount + 1;
              }
            }

            // if no tab selected
            if (this.gv.selectedChatTab != 'Groups' && this.gv.selectedChatTab != 'Members' && this.gv.selectedChatTab != 'Employers') {
              //alert(418)
              console.log('came here if no tab selected', this.gv.globalTotalChatUnreadCount);
              this.gv.globalTotalChatUnreadCount = this.gv.globalTotalChatUnreadCount + 1;
            }

          }
        }
        if (responseData.eventName == MyAppHttpService.CHAT_EVENTS.CHAT_ID_BY_USER) {
          console.log('response data 4 1st', responseData);
          console.log('response data 44 1st', responseData);
          this.gv.globalMentorJSChatConversations = [];
          this.gv.globalMentorJSChatUserInfo = responseData.data;
          this.gv.globalUnread_ChatIdInfo.userChatId = responseData.data.chatId;
          if (responseData.data.chatId) {
            this.gv.selectedMentorJSChatId = responseData.data.chatId;
            this.gv.oldchatformember.next(true);
            console.log('Selected mentors chat id: new 1st', this.gv.selectedMentorJSChatId);
          }
          else {
            this.gv.newchatformember.next(true);
          }
        }
        return {
          data: response.data,
          message: 'update',
        }
      }))
  }

  public subject: Rx.Subject<MessageEvent>;
  public messages: Subject<Message>;

  public connect(url): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully Connected: 2nd" + url);
      console.log('user data 2nd', this.gv.globalLoggedInUserData);
      if (this.gv.globalLoggedInUserData.userId != "") {
        setTimeout(() => {
          var data = { userId: this.gv.globalLoggedInUserData.userId, userType: MyAppHttpService.CHAT_TYPES.RI };
          this.invokeWebSocketFunction(data, MyAppHttpService.CHAT_EVENTS.UPDATE);

        }, 2000);
      }

    }
    return this.subject;
  }

  public wsocket;
  private create(url): Rx.Subject<MessageEvent> 
  {
    this.wsocket = new WebSocket(url);

    this.wsocket.onclose = (response) => {
      console.log('praveen closed connection 2nd')
      this.wsocket.close();
    };

    this.wsocket.onopen = (response) => {
      console.log('praveen open connection 2nd');
      if (!this.wsocket)
        this.wsocket = new WebSocket(url);
    };
    this.wsocket.onmessage = async (response) => {
      console.log('praveen message connection 2nd');
      //alert("websocket 479")

      console.log('data return back from socket 2nd', response, response.data);
      var responseData = JSON.parse(response.data);
      if (responseData.eventName == MyAppHttpService.CHAT_EVENTS.LOAD_ADMIN_CONVERSATION) {
        if (response.data.message == "Internal server error") {

        } else {
          console.log('response of load admin conversation 111 2nd', responseData.data);
          this.gv.globalAdminChatInformation = responseData.data;
          this.gv.admindataloaded.next(true);
        }

        console.log('global varaibales data service websocket 2nd', this.gv.globalRIREChatConversations);
      }
      if (responseData.eventName == MyAppHttpService.CHAT_EVENTS.SEND_MESSAGE) {
        if (responseData.message == "Internal server error") {

        } else {
          console.log('response data 11 2nd', responseData, this.gv.selectedChatTab, this.gv.Adminchatdetailsenabled, this.gv.chatlist, this.gv.EnteredChatlist);
          // messages from Rock Interview Admin comes here
          if (responseData.data.userType == 'RIADMIN') {
            if (this.gv.selectedChatTab == 'Employers') {
              console.log('RI Admin messages in Employers tab 2nd');
              console.log('Entered for Rock Admin message 2nd');
              if (this.gv.Adminchatdetailsenabled == true) {
                console.log('In Chat details 2nd');
                if(!!responseData.data.thumbnail) {
                  // let thumbnail = JSON.parse(responseData.data.thumbnail);
                  let thumbnail = responseData.data.thumbnail;
                  console.log('thumbnail: ', thumbnail);
                  if(typeof thumbnail == 'object') {
                    if(thumbnail.changingThisBreaksApplicationSecurity.indexOf('blob') != -1) {
                      responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail.changingThisBreaksApplicationSecurity);
                    }
                  } 
                  else if(thumbnail.indexOf('blob') != -1) {
                    responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail);
                  }
                  else {
                    responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail);
                  }
                }
                this.gv.globalchatdetailsconversation.push(responseData.data);
                this.gv.scrolldown.next();
              } else {
                console.log('else chat details 2nd');
                let count = parseInt(this.gv.globalAdminChatInformation.sourceUnreadCount) + 1;
                this.gv.globalAdminChatInformation.sourceUnreadCount = count.toString();
              }
              this.gv.globalAdminChatInformation.recentMessage = responseData.data.message;
              //alert(this.gv.globalAdminChatInformation.recentMessage+ 530)
              this.gv.globalAdminChatInformation.RecentMessageTime = responseData.data.RecentMessageTime;
            } else {
              // if not employers tab
              console.log('Employers tab count increasing 1 2nd', this.gv.globalEmployerTabChatUnreadCount);
              if(this.gv.globalEmployerTabChatUnreadCount >= 0){
              this.gv.globalEmployerTabChatUnreadCount = this.gv.globalEmployerTabChatUnreadCount + 1;
              } else {
                this.gv.globalEmployerTabChatUnreadCount = 0;
                this.gv.globalEmployerTabChatUnreadCount = this.gv.globalEmployerTabChatUnreadCount + 1;
              }
            }

            if (this.gv.selectedChatTab == 'Members') {
              //alert(548)
              console.log('RI Admin messages in Members tab 2nd');
            }

            if (this.gv.selectedChatTab == 'Groups') {
              console.log('RI Admin messages in Groups tab 2nd');
            }
          }

          // messages from Rock Enterprise comes here
          if (responseData.data.userType == 'RE') {
            console.log('Entered for Rock Enterprise message 2nd');
            if (this.gv.selectedChatTab == 'Employers') {
              if (responseData.data.toUserType == 'RI') {
                if (Object.keys(responseData.newChatInitiationInfo).length > 0) {
                  console.log('Added new chat 2nd', responseData.newChatInitiationInfo);
                  this.gv.globalRIREChatList.push(responseData.newChatInitiationInfo);
                  this.gv.globalRIREChatList.sort((a, b) => (b.eventTime > a.eventTime) ? 1 : -1);
                } else {
                  console.log('Added new message 2nd', responseData.data);
                  let chatidfound: boolean = false;
                  for (let i = 0; i < this.gv.globalRIREChatList.length; i++) {
                    if (this.gv.globalRIREChatList[i].chatId == responseData.data.chatId) {
                      chatidfound = true;
                      let count = parseInt(this.gv.globalRIREChatList[i].sourceUnreadCount) + 1;
                      if (responseData.data.chatId != this.gv.openedchatId) {
                        this.gv.globalRIREChatList[i].sourceUnreadCount = count.toString();
                      }
                      this.gv.globalRIREChatList[i].recentMessage = responseData.data.message;
                      this.gv.globalRIREChatList[i].RecentMessageTime = responseData.data.RecentMessageTime;
                      this.gv.globalRIREChatList[i].eventTime = responseData.data.eventTime;
                      this.gv.globalRIREChatList.sort((a, b) => (b.eventTime > a.eventTime) ? 1 : -1);
                    }
                  }
                  if (responseData.data.chatId == this.gv.openedchatId) {
                    if(!!responseData.data.thumbnail) {
                      // let thumbnail = JSON.parse(responseData.data.thumbnail);
                    let thumbnail = responseData.data.thumbnail;
                      console.log('thumbnail: ', thumbnail);
                      if(typeof thumbnail == 'object') {
                        if(thumbnail.changingThisBreaksApplicationSecurity.indexOf('blob') != -1) {
                          responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail.changingThisBreaksApplicationSecurity);
                        }
                      } 
                      else if(thumbnail.indexOf('blob') != -1) {
                        responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail);
                      }
                      else {
                        responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail);
                      }
                    }
                    this.gv.globalchatdetailsconversation.push(responseData.data);
                    this.gv.scrolldown.next();
                  }
                }
              }
            } else {
              // if not employers tab
              this.gv.globalEmployerTabChatUnreadCount = this.gv.globalEmployerTabChatUnreadCount + 1;
              console.log('Employers tab count increasing 2 2nd', this.gv.globalEmployerTabChatUnreadCount);
            }
          }

          // messages from Rock Interview App or Web comes here (own sending messages also)
          if (responseData.data.userType == 'RI') {
            console.log('Entered for Rock Interview message 2nd');
            if (responseData.data.toUserType == 'RIADMIN') {
              if (this.gv.selectedChatTab == 'Employers') {
                // messages pushing to Admin chat details page
                console.log('to user type RI Admin 2nd');
                if (this.gv.Adminchatdetailsenabled == true) {
                  console.log('In Chat details 1 2nd');
                  if(!!responseData.data.thumbnail) {
                    // let thumbnail = JSON.parse(responseData.data.thumbnail);
                    let thumbnail = responseData.data.thumbnail;
                    console.log('thumbnail: ', thumbnail);
                    if(typeof thumbnail == 'object') {
                      if(thumbnail.changingThisBreaksApplicationSecurity.indexOf('blob') != -1) {
                        responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail.changingThisBreaksApplicationSecurity);
                      }
                    } 
                    else if(thumbnail.indexOf('blob') != -1) {
                      responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail);
                    }
                    else {
                      responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail);
                    }
                  }
                  this.gv.globalchatdetailsconversation.push(responseData.data);
                  this.gv.scrolldown.next();
                } else {
                  console.log('else chat details 1 2nd');
                  let count = parseInt(this.gv.globalAdminChatInformation.sourceUnreadCount) + 1;
                  this.gv.globalAdminChatInformation.sourceUnreadCount = count.toString();
                }
                this.gv.globalAdminChatInformation.recentMessage = responseData.data.message;
                this.gv.globalAdminChatInformation.RecentMessageTime = responseData.data.RecentMessageTime;
              } else {
                this.gv.globalEmployerTabChatUnreadCount = this.gv.globalEmployerTabChatUnreadCount + 1;
                console.log('Employers tab count increasing 3 2nd');
              }
            }

            if (responseData.data.toUserType == 'RI') {
              console.log('to user type == RI 2nd', responseData.data);
              if (this.gv.selectedChatTab == 'Members') {
                //alert(654)
                if (Object.keys(responseData.newChatInitiationInfo).length > 0) {
                  console.log('Added new chat 2nd', responseData.newChatInitiationInfo);
                  this.gv.globalMentorJSChatList.push(responseData.newChatInitiationInfo);
                  this.gv.globalMentorJSChatList.sort((a, b) => (b.eventTime > a.eventTime) ? 1 : -1);
                } else {
                  console.log('Added new message 2nd', responseData.data, this.gv.globalMentorJSChatList, this.gv.openedchatId);
                  if (this.gv.openedchatId == null || this.gv.openedchatId == undefined) {
                    console.log('came here if it is new 2nd');
                    this.gv.openedchatId = responseData.data.chatId;
                    this.gv.dataforconversation.chatId = responseData.data.chatId;
                  }
                  let chatidfound: boolean = false;
                  console.log('list 2nd', this.gv.globalMentorJSChatList, this.gv.globalMentorJSChatList.length);
                  for (let i = 0; i < this.gv.globalMentorJSChatList.length; i++) {
                    // if (this.gv.globalMentorJSChatList[i].chatId != null && this.gv.globalMentorJSChatList[i].chatId != '' && this.gv.globalMentorJSChatList[i].chatId != undefined && this.gv.globalMentorJSChatList[i].recentMessage) {
                    console.log('chat ids 2nd', i, this.gv.openedchatId, responseData.data.chatId);
                    // record is old which is having chat id
                    // debugger
                    if (this.gv.globalMentorJSChatList[i].chatId == responseData.data.chatId) {
                      console.log('chat id matched 2nd');
                      chatidfound = true;
                      if (this.gv.openedchatId != this.gv.globalMentorJSChatList[i].chatId) {
                        let count = parseInt(this.gv.globalMentorJSChatList[i].sourceUnreadCount) + 1;
                        this.gv.globalMentorJSChatList[i].sourceUnreadCount = count.toString();
                      }
                      if (responseData.data.inviteStatus) {
                        this.gv.globalMentorJSChatList[i].inviteStatus = responseData.data.inviteStatus;
                      }
                      this.gv.globalMentorJSChatList[i].recentMessage = responseData.data.message;
                      this.gv.globalMentorJSChatList[i].RecentMessageTime = responseData.data.RecentMessageTime;
                      this.gv.globalMentorJSChatList[i].eventTime = responseData.data.eventTime;
                      this.gv.globalMentorJSChatList.sort((a, b) => (b.eventTime > a.eventTime) ? 1 : -1);
                    }

                    if (this.gv.globalMentorJSChatList.length - 1 == i) {
                      if (chatidfound == true) {
                        console.log('chat already found');
                      } else {
                        console.log('chat not found');
                        if (this.gv.globalMentorJSChatList[i].chatId == undefined) {
                          this.gv.globalMentorJSChatList[i].chatId = responseData.data.chatId;
                          this.gv.globalMentorJSChatList[i].recentMessage = responseData.data.message;
                          this.gv.globalMentorJSChatList[i].RecentMessageTime = responseData.data.RecentMessageTime;
                          this.gv.globalMentorJSChatList[i].eventTime = responseData.data.eventTime;
                          this.gv.globalMentorJSChatList[i].inviteStatus = 1;
                          this.gv.globalMentorJSChatList.sort((a, b) => (b.eventTime > a.eventTime) ? 1 : -1);
                        }
                      }
                    }
                    // } else {
                    console.log('chat id not matched 2nd', this.gv.globalMentorJSChatList[i]);
                    // if record is new from group chat
                    // if (this.gv.globalMentorJSChatList[i].chatId == "" || this.gv.globalMentorJSChatList[i].chatId == undefined) {
                    //   this.gv.globalMentorJSChatList[i].chatId = responseData.data.chatId;
                    //   this.gv.globalMentorJSChatList[i].recentMessage = responseData.data.message;
                    //   this.gv.globalMentorJSChatList[i].RecentMessageTime = responseData.data.RecentMessageTime;
                    //   this.gv.globalMentorJSChatList[i].eventTime = responseData.data.eventTime;
                    //   this.gv.globalMentorJSChatList[i].inviteStatus = 1;
                    //   this.gv.globalMentorJSChatList.sort((a, b) => (b.eventTime > a.eventTime) ? 1 : -1);
                    // }Your chat session has ended
                    // }User has unblocked you inviteStatus this.gv.globalMentorJSChatList[i].recentMessage == "You will not able to send/receive message from this user" || this.gv.globalMentorJSChatList[i].recentMessage == "User has unblocked you"
                    
                    if(true)
                    {
                      ///alert(this.gv.globalMentorJSChatList[i].eventType)
                      if(this.gv.globalMentorJSChatList[i].recentMessage == "You will not able to send/receive message from this user")
                      {
                      //alert(this.gv.globalMentorJSChatList[i].recentMessage)
                        // localStorage.setItem("sendBlockUnblockDataFromWebsockettochat","sendBlockUnblockDataFromWebsockettochattrue")
                        // setTimeout(() => {
                        //    localStorage.setItem("sendBlockUnblockDataFromWebsockettochat","sendBlockUnblockDataFromWebsockettochatFalse")
                        // }, 2000);
                      }
                      if(this.gv.globalMentorJSChatList[i].recentMessage == "User has unblocked you")
                      {
                        //alert(this.gv.globalMentorJSChatList[i].recentMessage)
                        //alert(this.gv.globalMentorJSChatList[i].recentMessage)
                        // localStorage.setItem("sendBlockUnblockDataFromWebsockettochat","sendBlockUnblockDataFromWebsockettochattrue")
                      
                        // setTimeout(() => {
                        //    localStorage.setItem("sendBlockUnblockDataFromWebsockettochat","sendBlockUnblockDataFromWebsockettochatFalse")
                        // }, 2000);
                      }
                      // if(this.gv.globalMentorJSChatList[i].recentMessage == "You will not able to send/receive message from this user")
                      // {
                      //   alert(this.gv.globalMentorJSChatList[i].recentMessage)
                      // }
                    }             
                   
                    
                    
                  }
                }
                console.log('opened chat id 2nd', this.gv.openedchatId);
                if (this.gv.openedchatId == responseData.data.chatId) {
                  // if opened chat matched
                  console.log('response data @702: ', responseData.data);
                  //alert(responseData.data)
                  if(!!responseData.data.thumbnail) {
                    // let thumbnail = JSON.parse(responseData.data.thumbnail);
                    let thumbnail = responseData.data.thumbnail;
                    console.log('thumbnail: ', thumbnail);
                    if(typeof thumbnail == 'object') {
                      if(thumbnail.changingThisBreaksApplicationSecurity.indexOf('blob') != -1) {
                        responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail.changingThisBreaksApplicationSecurity);
                      }
                    } 
                    else if(thumbnail.indexOf('blob') != -1) {
                      responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail);
                    }
                    else {
                      responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail);
                    }
                  }
                  this.gv.globalMentorJSChatConversations.push(responseData.data);
                  this.gv.scrolldown.next();
                }

              } else {
                console.log('Members tab count increasing 1 2nd');
                //alert("774")
                this.gv.globalMemberChatUnreadCount = this.gv.globalMemberChatUnreadCount + 1;
              }
            }

            if (responseData.data.toUserType == 'RE') {
              console.log('to usertype == RE 2nd');
              // messages pushing to employers chat list and details page.
              if (this.gv.selectedChatTab == 'Employers') {
                for (let i = 0; i < this.gv.globalRIREChatList.length; i++) {
                  if (this.gv.globalRIREChatList[i].chatId == responseData.data.chatId) {
                    console.log('Enterprise msg 1 2nd');
                    let count = parseInt(this.gv.globalRIREChatList[i].sourceUnreadCount) + 1;
                    if (responseData.data.chatId != this.gv.openedchatId) {
                      this.gv.globalRIREChatList[i].sourceUnreadCount = count.toString();
                    }
                    this.gv.globalRIREChatList[i].recentMessage = responseData.data.message;
                    if (responseData.data.RecentMessageTime) {
                      this.gv.globalRIREChatList[i].RecentMessageTime = responseData.data.RecentMessageTime;
                      console.log('Enterprise msg 2 2nd');
                    } else {
                      this.gv.globalRIREChatList[i].RecentMessageTime = '0 Secs';
                      console.log('Enterprise msg 3 2nd');
                    }
                    if (responseData.data.inviteStatus) {
                      console.log('entered into invite status update 2nd', responseData.data.inviteStatus);
                      this.gv.globalRIREChatList[i].inviteStatus = responseData.data.inviteStatus;
                    }
                    this.gv.globalRIREChatList[i].eventTime = responseData.data.eventTime;
                    this.gv.globalRIREChatList.sort((a, b) => (b.eventTime > a.eventTime) ? 1 : -1);
                  }
                }
                if (responseData.data.chatId == this.gv.openedchatId) {
                  console.log('Enterprise msg 4 2nd');
                  if(!!responseData.data.thumbnail) {
                    // let thumbnail = JSON.parse(responseData.data.thumbnail);
                    let thumbnail = responseData.data.thumbnail;
                    console.log('thumbnail: ', thumbnail);
                    if(typeof thumbnail == 'object') {
                      if(thumbnail.changingThisBreaksApplicationSecurity.indexOf('blob') != -1) {
                        responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail.changingThisBreaksApplicationSecurity);
                      }
                    } 
                    else if(thumbnail.indexOf('blob') != -1) {
                      responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail);
                    }
                    else {
                      responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail);
                    }
                  }
                  this.gv.globalchatdetailsconversation.push(responseData.data);
                  this.gv.scrolldown.next();
                }
              } else {
                this.gv.globalEmployerTabChatUnreadCount = this.gv.globalEmployerTabChatUnreadCount + 1;
                console.log('Employers tab count increasing 4 2nd');
              }
            }
          }

          // if no tab selected
          if (this.gv.selectedChatTab != 'Groups' && this.gv.selectedChatTab != 'Members' && this.gv.selectedChatTab != 'Employers') {
            //alert(836)
            console.log('came here if no tab selected 2nd', this.gv.globalTotalChatUnreadCount);
            this.gv.globalTotalChatUnreadCount = this.gv.globalTotalChatUnreadCount + 1;
          }
        }
      }

      if (responseData.eventName == MyAppHttpService.CHAT_EVENTS.INVITE_STATUS_UPDATE) {
        console.log('invite status update websocket 2nd', responseData.data);
        if (responseData.message == "Internal server error") {

        } else {
          console.log('response data 22 2nd', responseData);
        }
      }


      if (responseData.eventName == MyAppHttpService.CHAT_EVENTS.GROUP_MESSAGE) {
        console.log('Group Message response from Websocket 2 2nd', responseData.data, response.data);
        if (response.data.message == "Internal server error") {
        } else {
          console.log('response data 33 2nd', responseData);
          if (responseData.data.eventType == "Delete") {
            console.log('Group message Delete 2nd');
            if (this.gv.chatlist == false) {
              console.log('chat list data2 2nd', this.gv.ongrpchatdetails);
              if (this.gv.ongrpchatdetails == true) {
                console.log('chat list data3 2nd', this.gv.clickedGroupId, responseData.data.groupId, this.gv.globalgroupchatdetailsconversation);
                if (this.gv.clickedGroupId == responseData.data.groupId) {
                  console.log('chat list data4 2nd');
                  for (let i = 0; i < this.gv.globalgroupchatdetailsconversation.length; i++) {
                    console.log('chat list dat5 2nd');
                    if (responseData.data.messageId == this.gv.globalgroupchatdetailsconversation[i].messageId) {
                      console.log('delete name changed 2nd');
                      this.gv.globalgroupchatdetailsconversation[i].message = responseData.data.message;
                      this.gv.globalgroupchatdetailsconversation[i].msgType = 'text';
                    }
                  }
                }
              }
            }
          } else {
            if (this.gv.selectedChatTab == 'Groups') {
              console.log('If not Delete 2nd');
              for (let i = 0; i < this.gv.globalRIGroupsChatList.length; i++) {
                if (this.gv.globalRIGroupsChatList[i].groupId == responseData.data.groupId) {
                  if ((this.gv.clickedGroupId != responseData.data.groupId)) {
                    let count = parseInt(this.gv.globalRIGroupsChatList[i].unreadCount) + 1;
                    this.gv.globalRIGroupsChatList[i].unreadCount = count.toString();
                  }

                  this.gv.globalRIGroupsChatList[i].message = responseData.data.message;
                  this.gv.globalRIGroupsChatList[i].messageTime = responseData.data.messageTime;
                  this.gv.globalRIGroupsChatList[i].messageDate = responseData.data.messageDate;
                  this.gv.globalRIGroupsChatList[i].eventTime = new Date(responseData.data.messageDate).getTime();
                  this.gv.globalRIGroupsChatList.sort((a, b) => (b.eventTime > a.eventTime) ? 1 : -1);
                }
              }
              if (this.gv.clickedGroupId == responseData.data.groupId) {

                responseData.data.postedDate = responseData.data.messageDate;
                if(!!responseData.data.thumbnail) {
                  // let thumbnail = JSON.parse(responseData.data.thumbnail);
                  let thumbnail = responseData.data.thumbnail;
                  console.log('thumbnail: ', thumbnail);
                  if(typeof thumbnail == 'object') {
                    if(thumbnail.changingThisBreaksApplicationSecurity.indexOf('blob') != -1) {
                      responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail.changingThisBreaksApplicationSecurity);
                    }
                  } 
                  else if(thumbnail.indexOf('blob') != -1) {
                    responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail);
                  }
                  else {
                    responseData.data.thumbnail = this.sanitizer.bypassSecurityTrustUrl(thumbnail);
                  }
                }
                //debugger
                console.log('Response after formatting: ', await this.gv.getFormattedMessage(responseData.data));
                // responseData.data = await this.gv.getFormattedMessage(responseData.data);
                this.gv.globalgroupchatdetailsconversation.push(responseData.data);
                this.gv.scrolldown.next();
              }
            } else {
              console.log('Not groups tab 2nd', this.gv.globalGroupChatUnreadCount);
              this.gv.globalGroupChatUnreadCount = this.gv.globalGroupChatUnreadCount + 1;
            }
          }

          // if no tab selected
          if (this.gv.selectedChatTab != 'Groups' && this.gv.selectedChatTab != 'Members' && this.gv.selectedChatTab != 'Employers') {
            //alert(927)
            console.log('came here if no tab selected 2nd', this.gv.globalTotalChatUnreadCount);
            this.gv.globalTotalChatUnreadCount = this.gv.globalTotalChatUnreadCount + 1;
          }

        }
      }
      if (responseData.eventName == MyAppHttpService.CHAT_EVENTS.CHAT_ID_BY_USER) {
        console.log('response data 44 2nd', responseData);
        this.gv.globalMentorJSChatConversations = [];
        this.gv.globalMentorJSChatUserInfo = responseData.data;
        this.gv.globalUnread_ChatIdInfo.userChatId = responseData.data.chatId;
        if (responseData.data.chatId) {
          this.gv.selectedMentorJSChatId = responseData.data.chatId;
          this.gv.oldchatformember.next(true);
          console.log('Selected mentors chat id: new 2nd', this.gv.selectedMentorJSChatId);
        }
        else {
          this.gv.newchatformember.next(true);
        }
      }
      return {
        data: response.data,
        message: 'update',
      }
    };


    let observable = Rx.Observable.create(
      (obs: Rx.Observer<MessageEvent>) => {
        /*this.wsocket.onmessage = obs.next.bind(obs);
        this.wsocket.onerror = obs.error.bind(obs);
        this.wsocket.onclose = obs.complete.bind(obs);
        // ws.onclose =  () => { // Try to reconnect in 5 seconds 
        //   setInterval(() => { this.connect(environment.WS_CHAT_URL);
        //   console.log('firing interval');
        //   }, 5000);
        //   console.log('on close');
        // };
        return this.wsocket.close.bind(this.wsocket);
        */
      }
    )

    let observer = {
      next: (data: Object) => {
        if (this.wsocket.readyState === WebSocket.OPEN) {
          this.wsocket.send(JSON.stringify(data));
        }
        else {
          this.subject = undefined;
          // ws.readyState = websock;
          this.connect(environment.WS_CHAT_URL);
        }
      }
    }

    return Rx.Subject.create(observer, observable);
  }

  public invokeWebSocketFunction(data, functionName) {
    var message = {
      data: data,
      message: functionName
    };
    this.messages.next(message);
  }



}
