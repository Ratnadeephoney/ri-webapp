// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //apiUrl: 'http://webapp-mw-dev.ap-south-1.elasticbeanstalk.com/',
  // dev url
  // apiUrl: 'http://app-dev.ap-south-1.elasticbeanstalk.com/',
  // enterpriseApiUrl: 'https://reapiqa.rockinterview.in/',
  // // enterpriseUrl: 'http://rientdev-env.rvi4bhm3pw.ap-south-1.elasticbeanstalk.com/',
  // enterpriseUrl: 'https://d208auwvdsmrdt.cloudfront.net/',
  // attachment_Upload_url: 'https://i3mq9up7o3.execute-api.ap-south-1.amazonaws.com/dev/richatattachments/',
  // chatUrl: 'https://cvgzllug55.execute-api.ap-south-1.amazonaws.com/dev/',
  // WS_CHAT_URL: 'wss://9cu71dp6cf.execute-api.ap-south-1.amazonaws.com/dev',
  // upload_path_url: 'https://richatattachments.s3.ap-south-1.amazonaws.com/',
  // env: 'dev',
  // chat_attachment_url: 'https://i3mq9up7o3.execute-api.ap-south-1.amazonaws.com/dev/richatattachments/',
  
  // qa url
  apiUrl: 'https://testapi.rockinterview.in/',
  enterpriseApiUrl: 'https://reapiqa.rockinterview.in/',
  enterpriseUrl: 'https://reqa.rockinterview.in/',
  attachment_Upload_url: 'https://i3mq9up7o3.execute-api.ap-south-1.amazonaws.com/dev/richatattachments/',
  chatUrl: 'https://cvgzllug55.execute-api.ap-south-1.amazonaws.com/qa/',
  WS_CHAT_URL: 'wss://9cu71dp6cf.execute-api.ap-south-1.amazonaws.com/qa',
  upload_path_url: 'https://richatattachments.s3.ap-south-1.amazonaws.com/',
  env: 'qa',
  chat_attachment_url: 'https://i3mq9up7o3.execute-api.ap-south-1.amazonaws.com/qa/richatattachments/',
  firebaseConfig: {
    apiKey: "AIzaSyDVZgtR3lM-ORgNzXTuCLBAKIVd10yM0Mk",
    authDomain: "rockinterview2-dev.firebaseapp.com",
    databaseURL: "https://rockinterview2-dev.firebaseio.com",
    projectId: "rockinterview2-dev",
    storageBucket: "rockinterview2-dev.appspot.com",
    messagingSenderId: "207541386672",
    appId: "1:207541386672:web:a08b316ae2cace8ac1aa75",
    measurementId: "G-E9TQX13BDF"
  },
  AES_SECURITY: {
    URL_PARAMS: 'URL_EN_DE'
  },
  payment: {
    image: 'https://s3.ap-south-1.amazonaws.com/riglobal/template/app/image/Rupee_icon.svg',
    key: 'rzp_test_1DP5mmOlF5G5ag'
}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
