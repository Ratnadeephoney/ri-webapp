import { Injectable } from '@angular/core';

@Injectable()

export class MyAppHttpService {

  public static VALIDATION_PATTERNS = {
    NAME: /^[a-z ]+$/i,
    EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    MOBILE_NUMBER: /^([0|\+[0-9]{1,5})?([5-9][0-9]{9})$/,
    OTP: /^[0-9]{6}$/,
    LOCATION: /^[a-z ]+$/i,
    DESIGNATION: /^[a-z. ]+$/i,
    QUALIFICATION: /^[a-z. ]+$/i,
    CURRENT_COMPANY: /^[a-z. ]+$/i,
    BANK_ACCOUNT_NUMBER: /^[0-9]+$/,
    BANK_IFSC_CODE: /^[a-zA-Z0-9]+$/,
    BANK_BRANCH_NAME: /^[a-zA-Z\s]+$/,
    PREVIOUS_COMPANY: /^[a-z. , ]+$/i,
    // PASSWORDS:/(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    // PASSWORD: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
    PASSWORD: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}/,
    NUM_OF_OPENJOBS: /\d/,
    alphanumericWithOneSpace: /^[a-z](\w+\s)*\w+$/i,
    ONLY_ALPHABETS: /^[a-zA-Z ]*$/,
    ALPHABETS_WITH_ONE_SPACE: /[a-zA-Z][a-zA-Z ]+$/,
    YOUTUBE_PATTERN: /^((https?|ftp|smtp):\/\/)?(www.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/,
    WEBSITE_PATTERN: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    // LINKEDIN:/(ftp|http|https):\/\/?(?:www\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
    // GITHUB:/(https):\/\/?(?:www\.)?github.com\/(?<login>[A-z0-9_-]+)\/?/
    LINKEDIN:/^(http(s)?:\/\/([w]{3}\.)?)?linkedin\.com\/in\/([a-zA-Z0-9-]{5,30})\/?/,
    GITHUB:/^(http(s)?:\/\/([w]{3}\.)?)?github\.com\/([a-zA-Z0-9-]{5,30})\/?/,

  }

  public static RESPONSE_CODES = {
    SUCCESS: 200,
    UNAUTHORIZED: 401,
    CONFLICT: 409,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    SERVER_ERROR: 500,
    USER_NOT_EXISTS: 204,
    JOB_APPLY_INACTIVE: 415,
    SETUP_INTERVIEW_DATE_SHOULD_BE_MORE_THAN_24HRS_FROM_NOW: 20101,
    SETUP_INTERVIEW_TIME_SHOULD_NOT_BE_BETWEEN_12AM_AND_6AM: 20102,
    SETUP_INTERVIEW_TIME_SHOULD_HAVE_2HR_GAP_FOR_INTERVIEW: 20103,
    SETUP_INTERVIEW_DATE_IS_MORE_THAN_MAX_DAYS_FROM_TOMORROW: 20106,
    SLOT_BOOKED: 28001
  };

  public static CHAT_EVENTS = {
    UPDATE: 'update',
    SEND_MESSAGE: 'sendMessage',
    UPDATE_READ_COUNT: 'updateReadCount',
    LOAD_ADMIN_CONVERSATION: 'loadAdminConversation',
    INVITE_STATUS_UPDATE: 'inviteStatusUpdate',
    GROUP_MESSAGE: 'sendGroupMessage',
    CHAT_ID_BY_USER: 'chatIdByUser'
  }

  public static CHAT_TYPES = {
    RI: "RI",
    RE: "RE",
    RIADMIN: "RIADMIN",
    READMIN: "READMIN"
  }

  public static REQUESTS = {
    Registration: 'register',
    Login: 'Login',
    GetAllSkills: 'api/v2/shared/getAllTechnologies',
    GetAllLocations: 'api/v2/shared/getAllLocations',
    GetAllSearchedJobs: 'searchJobs',
    GetSelectedJobByJobId: 'jobDetailsById',
    GetAllTrainings: 'searchTrainings',
    // GetTrainingInfoByTrainingId: 'getTrainingDetails',
    GetTrainingInfoByTrainingId: 'api/v2/training/getTrainingDetails',
    getTrainerInfoByMentorId: 'api/v2/training/getTrainerDetails',
    getTrainingTopicsByMentorId: 'api/v2/training/getAllTopics',
    postContactUs: 'saveContactUs',
    downloadEbook: 'saveDownloadEbook',
    leaveMessage: 'saveSendFeedBack',
    getJobOfferStatus: 'getJobOfferStatus',
    rejectJobOffer: 'jobOfferReject',
    acceptJobOffer: 'jobOfferAccept',
    sendAppLink: 'sendAppLink',
    sendOtp: 'sendOtp',
    verifyOtp: 'verifyOtp',
    resumeUpload: 'api/v2/multimedia/uploadResume',
    registerUser: 'api/v2/completeReg',
    applyJob: 'api/v2/jobs/web/apply',
    registerTraining: 'api/v2/training/web/register',
    getTrainingAmount: 'api/v2/training/getTrainingAmount',
    getSuggestedTrainingsToMe: 'api/v2/training/web/search/shareToMe',
    getUserProfileInfo: 'api/v2/user/profile',
    jobRead: 'api/v2/jobs/markRead',
    getMasterData: 'api/v2/shared/masterdata/editprofile',
    editUserProfile: 'api/v2/profile/edit',
    getInterviewLevels: 'api/v2/interview/levels',
    getProfileSkills: 'api/v2/profile/skills',
    getSetupInterviewMetadata: 'api/v2/interview/metadata',
    getInterviewersBySkillIds: 'api/v2/interview/interviewers',
    getInterviewTimeSlots: 'api/v2/interview/timeslots',
    submitSetupInterview: 'api/v2/interview/setup',
    paymentCancel: 'api/v2/shared/paymentcancelled',
    getAllInterviewsList: 'api/v2/interview/list',
    cancelInterview: 'api/v2/interview/cancel',
    getJSFeedback: 'api/v2/interview/feedback/js',
    getIntFeedback: 'api/v2/interview/feedback/int',
    postJSFeedback: 'api/v2/interview/feedback/js',
    postIntFeedback: 'api/v2/interview/feedback/int',
    getTopJobsCounts: 'jobs/count',
    getTopTrainingsCounts: 'trainings/count',
    createTraining: 'api/v2/training/addCourse',
    // editTraining: 'api/v2/training/web/editTraining',
    editTraining: 'api/v2/training/editCourse',
    deleteTraining: 'api/v2/training/deleteTraining',
    getCourseDetails: 'api/v2/training/getCourseDetails',
    getAttachmentsByCourseId: 'api/v2/multimedia/getMultimediaFromCourse',
    deleteAttachmentByAttachmentId: 'api/v2/multimedia/deleteMultimediaFromCourse',
    uploadTrainingImage: 'api/v2/multimedia/uploadTrainingImage',
    addTopic: 'api/v2/training/addTopic',
    deleteTopic: 'api/v2/training/deleteTopic',
    getAllTopics: 'api/v2/training/getAllTopics',
    updateTopic: 'api/v2/training/editTopic',
    uploadTrainingAttachment: 'api/v2/multimedia/attachMultimediaWithCourse',
    getHiringId: 'api/v2/getHiringIdDetails',
    requestRoleChange: 'user/requestVerification',
    roleChangeStatus: "user/getRoleChangeStatus",
    getInterviewedJobseekers: 'api/v2/training/getAllJobSeekersList',
    shareTrainingToJobseekers: 'api/v2/training/shareToJobSeekers',
    shareTrainingToAll: 'api/v2/training/suggestCourseToAll',
    getRegisteredUsers: 'api/v2/training/getTrainingSession',
    getProfileVideoDetails:'api/v2/multimedia/getProfileVideoDetails',
    // uploadProfileVideo:'api/v2/multimedia/uploadProfileVideo',
    deleteProfileVideo:'api/v2/multimedia/deleteProfileVideo',
    getAllSettings:'api/v2/settings/getAllSettingsForUser_V1',
    updateSettings:'api/v2/settings/updateSettings_V1',
    getAllBanks:'api/v2/getAllBanks',
    getBankdetails:'api/v2/getBankDetails',
    saveBankDetails:'api/v2/addOrUpdateBankDetails',
    getAllCertificates:'api/v2/shared/getallcerts',
   // downloadCertificate:'api/v2/shared/getallcerts',
    downloadCertificate:'api/v2/multimedia/downloads/files/certificate',
    postchatgroups: 'api/v2/chat/getUserGroupsByUserId',
    postgetchat: 'chat',
    postgetgroupchatdetails: 'api/v2/chat/getUsersGroupChatByGroupId',
    postReadchatmsg: 'api/v2/chat/readChatMessage',
    GetChatUnreadCounts: 'api/v2/chat/getChatUnreadCount',
    SendGroupChatMessage: 'api/v2/chat/sendMessageToGroup',
    GetMembersList: 'api/v2/chat/getGroupMembersByGroupId',
    GetUserDetails: 'api/v2/getUser',
    RemoveUserFromGroup: 'api/v2/chat/removeUserFromGroup',
    JoinGroupChat: 'api/v2/chat/joinGroup',
    PostGetchatbyId: 'conversationbychatid',
    GetEmployerDetails: 'api/v2/getEnterpriseUser',
    GetAllMentorsList: 'api/v2/mentors/list',
    // ------>
    GetALLReferalList:'api/v2/refferal/getListOfRefferalUser',
    UpdateReferal : 'api/v2/refferal/updateReferalStatus',
    AddReferalUser : 'api/v2/refferal/addRefferalUser',
    GiveRefFeedback : 'api/v2/refferal/giveFeedBack',
    ViewRefFeedback : 'api/v2/refferal/viewFeedBack'
  };

  public static MODULES =  {JOBS: 'Jobs', TRAININGS: 'Trainings', FIND_PROFILES: 'Find Profiles'};

  public static OFFER_TYPES = {
    ACCEPT: 'Accept',
    REJECT: 'Reject'
  }

  public static TRAINING_STATUS_CODES = {
    CREATED: { Key: 1, Value: 'Created'},
    ASSIGNED: { Key: 2, Value: 'Assigned'},
    SUGGESTED: { Key: 3, Value: 'Suggested'},
    REGISTERED: { Key: 4, Value: 'Registered'},
    INPROGRESS: { Key: 5, Value: 'InProgress'},
    COMPLETED: { Key: 6, Value: 'Completed'},
  }



  public static MWType = {
    APP: 'APP',
    ENTERPRISE: 'ENTERPRISE',
    CHAT: 'CHAT'
  }

  public static httpVerb = {
    Get: 'Get', 
    Post: 'Post',
    Put: 'Put',
    Delete: 'Delete'
  };

  // public static Roles ={
  //   JOB_SEEKER: 1,
  //   INTERVIEWER: 2
  // }

  public static Roles = {
    JOB_SEEKER: { roleId: 1, roleName: 'JS' },
    INTERVIEWER: { roleId: 2, roleName: 'INT' }
  };
  // -------->
  public static Refferal = {
    ASKFORREFERENCE: { roleId: 1, roleName: 'ASK_FOR_REFERENCE' },
    REFERALREQUESTS: {  roleId: 2, roleName: 'REFFRABLE_USER' }
  };

  public static PathInformation ={
    JOBS: { PATH: '/jobs', PAGE_NAME: 'Jobs'},
    TRAININGS: { PATH: '/trainings', PAGE_NAME: 'Trainings'},
    INTERVIEWER: { PATH: '/interviewer', PAGE_NAME: 'Interviewer'},
    COMPANY_TEAM: { PATH: '/company/team', PAGE_NAME: 'Company / Team'},
    COMPANY_CAREERS: { PATH: '/company/careers', PAGE_NAME: 'Company / Careers'},
    COMPANY_OPPORTUNITIES: { PATH: '/career-opportunities', PAGE_NAME: 'Company / Career Opportunities'},
    COMPANY_FAQ: { PATH: '/company/faq', PAGE_NAME: 'Company / FAQ'},
    CONTACT_US: { PATH: '/contact-us', PAGE_NAME: 'Contact'},
    DOWNLOAD_EBOOK: { PATH: '/download-ebook', PAGE_NAME: 'Download EBook'},
    ACCEPT_OFFER: { PATH: '/accept-offer', PAGE_NAME: 'Accept Offer'},
    REJECT_OFFER : {PATH: '/reject-offer', PAGE_NAME: 'Reject Offer'},
    TERMS : {PATH: '/terms', PAGE_NAME: 'Terms'},
    JOBSEEKER: { PATH: '/job-seeker', PAGE_NAME: 'Job Seeker'},
    JOBSEEKER_FAQ: { PATH: '/job-seeker/faqs', PAGE_NAME: 'Job Seeker / FAQ'},
    INTERVIEWER_FAQ: { PATH: '/interviewer/faq', PAGE_NAME: 'Interviewer / FAQ'},
    JOBSEEKER_TRAININGS: { PATH: '/job-seeker/training', PAGE_NAME: 'Job Seeker / Trainings'},
    JOB_ASSURANCE_PROGRAM: {PATH: '/job-assurance-program', PAGE_NAME: 'Job Assurance Program'},
    SETUP_INTERVIEW: {PATH: '/setup-interview', PAGE_NAME: 'Setup Interview'},
    MY_PROFILE: {PATH: '/my-profile', PAGE_NAME: 'My Profile'},
    COMING_SOON: {PATH: '/coming-soon', PAGE_NAME: 'Coming Soon'},
    INTERVIEWS: {PATH: '/interviews', PAGE_NAME: 'Interviews'},
    CREATE_TRAINING: {PATH: '/create-training', PAGE_NAME: 'Create Training'},
    EDIT_TRAINING: {PATH: '/edit-training', PAGE_NAME: 'Edit Training'},
    SETTINGS: {PATH: '/settings', PAGE_NAME: 'Settings'}, 
    MY_VIDEOS: {PATH: '/my-videos', PAGE_NAME: 'My-videos'},
    HIRING_ID: {PATH: '/hiring-id', PAGE_NAME: 'Hiring Id'},
    JOB_DETAILS: { PATH: '/job-details', PAGE_NAME: 'Job Details'},
    BECOME_A_MENTOR: { PATH: '/become-mentor-new', PAGE_NAME: 'Become Mentor'},
    MENTOR_VERIFICATION: { PATH: '/mentor-verification', PAGE_NAME: 'Mentor Verification'},
    TRAINING_DETAILS: { PATH: '/training-details', PAGE_NAME: 'Training-details'},
    BANK_DETAILS: { PATH: '/bank-details', PAGE_NAME: 'bank details'},
    CERTIFICATES: { PATH: '/certificates', PAGE_NAME: 'certificate details'},
    CHAT: { PATH: '/chat', PAGE_NAME: 'chat'},
    MENTORSLIST: { PATH: '/mentorslist', PAGE_NAME: 'mentors list'},
    REFFERAL: { PATH: '/refferal', PAGE_NAME: 'Refferal'}
  };

  public static DownloadAppUrls = {
    PLAY_STORE: 'https://play.google.com/store/apps/details?id=com.ionicframework.someapp771914&hl=en',
    APPLE_STORE: 'https://apps.apple.com/in/app/rock-interview/id1118648900'
  }

  public static ToastType = {
    ERROR: 'error',
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning'
  };

  static isValidInput(input) {
    if (this.isNull(input) || this.isUndefined(input) || this.isEmpty(input)) {
      return false;
    } else {
      return true;
    }
  };

  static isEmpty(input) {
    if (typeof input == "undefined") {
      return true;
    } else {
      let lstrTempstring = new String(input);
      lstrTempstring = lstrTempstring.trim();
      if (lstrTempstring == "" || lstrTempstring == "undefined") {
        return true;
      } else {
        return false;
      }
    }
  };

  static isUndefined(input) {
    if (typeof input == "undefined") {
      return true;
    } else {
      return false;
    }
  };

  static isNull(input) {
    if (input != null) {
      return false;
    } else {
      return true;
    }
  };

  public static InterviewStatus = [
    {id: 7, value: 'All'},
    {id: 1, value: 'Created'},
    {id: 2, value: 'Scheduled'},
    {id: 3, value: 'Rejected'},
    {id: 4, value: 'Completed'},
    {id: 5, value: 'Rescheduled'},
     // { id: 6, value: 'Cancelled' }
     { id: 6, value: 'Cancelled by Mentor' },
     { id: 8, value: 'Cancelled by Admin' },
     { id: 9, value: 'Cancelled by Enterprise' }
  ];

  public static InterviewStatusIds = {
    ALL_INTERVIEWS: 7,
    CREATED_INTERVIEW : 1,
    SCHEDULED_INTERVIEW: 2,
    REJECTED_INTERVIEW: 3,
    COMPLETED_INTERVIEW: 4,
    RESCHEDULED_INTERVIEW: 5,
    CANCELLED_INTERVIEW: 6,
    CANCELLED_BY_ADMIN_INTERVIEW: 8,
    CANCELLED_BY_ENTERPRISE_INTERVIEW: 9
  }


  constructor() { }
  onInit() {

  }

}