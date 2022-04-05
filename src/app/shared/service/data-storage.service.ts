import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MyAppHttpService } from './my-app-http.service';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { getMetadata, getThumbnails, Video } from 'video-metadata-thumbnails';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  public globalSkillsList: any;
  public globalLocationsList: any;

  public globalSelectedSKillsList: any;
  public globalSelectedLocationsList: any;
  public globalModuleNames = MyAppHttpService.MODULES;
  public globalOfferTypes = MyAppHttpService.OFFER_TYPES;
  public globalPathInformation = MyAppHttpService.PathInformation;
  public showOpportunities: boolean;
  public globalDownloadAppUrls = MyAppHttpService.DownloadAppUrls;
  public isLaunchScreenOpened = false;

  public globalIsLoggedInUser = false;
  public globalLoggedInUserData: any = { mobileNumber: '', userType: 0, userName: '', userId: 0 };

  public globalShowLoader = true;
  public globalJODUrl: string;

  public sub_GlobalSkills = new Subject();

  public loggedInFromMenu = new Subject();

  public globalNgbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false
  };
  bankNamesList: any[];
  loggedInUserData: any;
  EditTraining: boolean = false;
  FromMentor: boolean = false;



  public globalRIGroupsChatList: any = [];
  public globalMentorJSChatList: any = [];
  public globalRIREChatList: any = [];

  public globalAdminChatInformation: any = [];
  public globalRIREChatConversations: any = [];
  public EnteredChatlist: boolean = false;
  public globalRIGroupChatConversations: any = [];
  public globalgroupchatdetailsconversation: any = [];
  public selectedGroupDetails: any = [];
  public chatcount: any = 0;
  public chatlist: boolean = true;
  public mentorJSChat: boolean = false;
  public selectedChatTab: any = '';
  public openedchatId: any = null;


  public globalMentorJSChatUserInfo: any = {};
  public globalMentorJSChatConversations: any = [];
  public datasendingtochatdetails: any = null;
  public globalchatdetailsconversation: any = [];
  public ongrpchatdetails: boolean = false;
  public clickedGroupId: any = null;
  public globalUnread_ChatIdInfo: any = {adminChatId: '', userChatId: '', adminUnreadCount: 0, RIUnreadCount: 0, REUnreadCount: 0};
  public globalGetChatIdInputData: any = {};
  public selectedMentorJSChatId: any = '';

  public FiringInvite = new Subject();
  public scrolldown = new Subject();
  public admindataloaded = new Subject();
  public newchatformember = new Subject();
  public oldchatformember = new Subject();
  public fireformentorchat = new Subject();

  public userdetailsformodal: any = {};
  public Adminchat: boolean = false;
  public dataforconversation: any = null;
  public newchatuserinfo: any = null;

  public globalGroupChatUnreadCount: any = 0;
  public globalRIMemberChatUnreadCount: any = 0;
  public globalRIREChatUnreadCount: any = 0;
  public globalTotalChatUnreadCount: any = 0;
  public globalAdminChatUnreadCount: any = 0;
  public globalMemberChatUnreadCount: any = 0;
  public globalEmployerChatUnreadCount: any = 0;
  public globalEmployerTabChatUnreadCount: any = 0;
  
  public totalInterviewsCount: any = 0;

  public Adminchatdetailsenabled: boolean = false;
  public Employerchatdetailsenabled: boolean = false;
  public Groupchatdetailsopened: boolean = false;
  public DataFromMentorsList: any = null;

  public UserLoggedIn: boolean = false;

//   public sanitizer: DomSanitizer;
  public thumbnailPath: any;

  constructor(public sanitizer: DomSanitizer) {}

  ClearChatData() {
    this.globalRIGroupChatConversations = [];
    this.globalRIGroupsChatList = [];
    this.globalRIREChatConversations = [];
    this.globalRIREChatList = [];
    this.globalchatdetailsconversation = [];
    this.globalgroupchatdetailsconversation = [];
    this.selectedGroupDetails = [];
    this.clickedGroupId = null;
    this.selectedChatTab = '';
    this.EnteredChatlist = false;
    this.ongrpchatdetails = false;
    this.chatcount = 0;
    this.chatlist = true;
    this.datasendingtochatdetails = null;
    this.dataforconversation = null;
    this.userdetailsformodal = {};
    this.selectedChatTab = '';
    this.Adminchat = false;
    this.newchatuserinfo = null;

    this.globalMentorJSChatList = [];
    this.mentorJSChat = false;
    this.globalMentorJSChatUserInfo = {};
    this.globalMentorJSChatConversations = [];
    this.globalUnread_ChatIdInfo = {adminChatId: '', userChatId: '', adminUnreadCount: 0, RIUnreadCount: 0, REUnreadCount: 0};
    this.globalGetChatIdInputData = {};
    this.selectedMentorJSChatId = '';
    this.globalGroupChatUnreadCount = 0;
    this.globalRIMemberChatUnreadCount = 0;
    this.globalRIREChatUnreadCount = 0;
    // this.globalTotalChatUnreadCount = 0;
    // this.globalAdminChatUnreadCount = 0;
    // this.globalMemberChatUnreadCount = 0;
    // this.globalEmployerChatUnreadCount = 0;
    // this.globalEmployerTabChatUnreadCount = 0;

    this.Adminchatdetailsenabled = false;
    this.Employerchatdetailsenabled = false;
    this.Groupchatdetailsopened = false;
    this.DataFromMentorsList = null;
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
    }
    //  else if (fileExt == 'doc') {
    //     return 'application/msword';
    // } 
    else if (fileExt == 'pdf') {
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
    } else if (fileExt == 'bin' || fileExt == 'xlsx' || fileExt == 'ppt' || fileExt == 'pptx' || fileExt == 'exe' || fileExt == 'dll' || fileExt == 'deb' || fileExt == 'dmg' || fileExt == 'eot' || fileExt == 'iso' || fileExt == 'img' || fileExt == 'msi' || fileExt == 'msp' || fileExt == 'msm' || fileExt == 'docx' || fileExt == 'doc') {
        return 'application/octet-stream';
    } else if (fileExt == 'mid' || fileExt == 'midi' || fileExt == 'kar') {
        return 'audio/midi';
    } else if (fileExt == 'mp3') {
        return 'audio/mpeg';
    } else if (fileExt == 'ogg') {
        return 'audio/ogg';
    } else if (fileExt == 'ra') {
        return 'audio/x-realaudio';
    } else if (fileExt == '3gpp' || fileExt == '3gp') {
        return 'video/3gpp';
    } else if (fileExt == 'mpeg' || fileExt == 'mpg') {
        return 'video/mpeg';
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
    } else if (fileExt == 'xlsx') {
        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    } else {
        return null;
    }
}

    // Method to convert the chat message media link to image and video
    async getFormattedMessage(element) {
        let message = element.message;
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
        let fileExtension = !!filetype ? this.GettingContentType(filetype) : '';
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
}
