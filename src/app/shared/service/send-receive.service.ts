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
//import { MatDialog } from '@angular/material';
// import { catchError } from 'rxjs/internal/operators/catchError';
// import { InfoDialogComponent } from '../../views/app-dialogs/info-dialog/info-dialog.component';
// import Utils from 'src/app/services/common/utils';

declare var jsSHA: any;

@Injectable()
export class SendReceiveService {
    private _sequence: number = 1;

    //myAppUrl: string = environment.apiUrl;
    header: HttpHeaders;
    accessToken: any = 'anonymous';
    public httpVerb = MyAppHttpService.httpVerb;
    backflag1: boolean = false;

    private HTTP_REQUEST_PARAMS = {
        HEADER_CONTENT_TYPE: { value: "application/json; charset=UTF-8", valueContains: "application/json;" }
    };

    // Resolve HTTP using the constructor private dialog: MatDialog
    constructor(private http: Http, private _http: HttpClient, private router: Router, 
        private dataStorage: DataStorageService) { }

    onInit() {
    }


    public send(method = null, apiUrl = null, data = null, mwType = null): Observable<any> {
        try {
            var mwURL;
            if(mwType == MyAppHttpService.MWType.APP){
                mwURL = environment.apiUrl + apiUrl;
            }
            else if(mwType == MyAppHttpService.MWType.ENTERPRISE){
                mwURL = environment.enterpriseApiUrl + apiUrl;
            }
            else {
                mwURL = environment.apiUrl + apiUrl;
            }

            
           if(localStorage.getItem('token')){
            this.accessToken = localStorage.getItem('token');
           }
           else{
            this.accessToken = 'anonymous';
           }
           

            this.header = new HttpHeaders({
                'Content-Type': 'application/json',
                'token': this.accessToken
            });
            console.log('loader', mwType);
            if(mwType == null){
            this.dataStorage.globalShowLoader = true;
            }
            if (method == this.httpVerb.Get) {
                return this._http.get<any>(mwURL, { headers: this.header, observe: 'response' })
                    .pipe(map((response) => {
                        setTimeout(() => {
                            this.dataStorage.globalShowLoader = false;
                        }, 1000);

                      
                        return response.body;
                    }, (error) => {
                        setTimeout(() => {
                            this.dataStorage.globalShowLoader = false;
                        }, 1000);

                        console.log(error);
                    }), catchError(this.errorHandler)
                    );
            }
            else if (method == this.httpVerb.Post) {
                return this._http.post<any>(mwURL, data, { headers: this.header, observe: 'response' })
                    .pipe(map((response) => {
                        setTimeout(() => {
                            this.dataStorage.globalShowLoader = false;
                        }, 1000);

                        return response.body;
                    }, (error) => {
                        setTimeout(() => {
                            this.dataStorage.globalShowLoader = false;
                        }, 1000);

                        console.log(error);
                    }), catchError(this.errorHandler));
            }
            else if (method == this.httpVerb.Put) {
                return new Observable;
            }
            else if (method == this.httpVerb.Delete) {
                return new Observable;
            }
            else { }


        } catch (e) {
            //Utils.logMessage("Error", e);
        }
    }

    public sendforchat(method = null, apiUrl = null, data = null, mwType = null): Observable<any> {
        try {
            var mwURL;
            if(mwType == MyAppHttpService.MWType.APP){
                mwURL = environment.apiUrl + apiUrl;
            }
            else if(mwType == MyAppHttpService.MWType.ENTERPRISE){
                mwURL = environment.enterpriseApiUrl + apiUrl;
            }
            else {
                mwURL = environment.chatUrl + apiUrl;
            }

            
           if(localStorage.getItem('token')){
            this.accessToken = localStorage.getItem('token');
           }
           else{
            this.accessToken = 'anonymous';
           }
           

            this.header = new HttpHeaders({
                'Content-Type': 'application/json',
                // 'token': this.accessToken
            });
            this.dataStorage.globalShowLoader = true;
            if (method == this.httpVerb.Get) {
                return this._http.get<any>(mwURL, { headers: this.header, observe: 'response' })
                    .pipe(map((response) => {
                        setTimeout(() => {
                            this.dataStorage.globalShowLoader = false;
                        }, 1000);

                      
                        return response.body;
                    }, (error) => {
                        setTimeout(() => {
                            this.dataStorage.globalShowLoader = false;
                        }, 1000);

                        console.log(error);
                    }), catchError(this.errorHandler)
                    );
            }
            else if (method == this.httpVerb.Post) {
                return this._http.post<any>(mwURL, data, { headers: this.header, observe: 'response' })
                    .pipe(map((response) => {
                        setTimeout(() => {
                            this.dataStorage.globalShowLoader = false;
                        }, 1000);

                        return response.body;
                    }, (error) => {
                        setTimeout(() => {
                            this.dataStorage.globalShowLoader = false;
                        }, 1000);

                        console.log(error);
                    }), catchError(this.errorHandler));
            }
            else if (method == this.httpVerb.Put) {
                return new Observable;
            }
            else if (method == this.httpVerb.Delete) {
                return new Observable;
            }
            else { }


        } catch (e) {
            //Utils.logMessage("Error", e);
        }
    }
    

    public downloadImage(apiUrl){
        this.header = new HttpHeaders({
            'token': this.accessToken
        });
        return this._http.get(apiUrl, {headers: this.header,  responseType: "blob"});
    }


    errorHandler(error: Response) {
        setTimeout(() => {
            this.dataStorage.globalShowLoader = false;
        }, 1000);

        //console.log(error);
        // if(error.status  == 401 || error.status == 500){
        if (error.status == 401) {
            // debugger;

            localStorage.clear();
            // this.router.navigate(['/']);
            location.href = '/';
            return of(undefined);
        }
        return of(undefined);

    }

    showDialog(message) {
        // let dialogInstance = this.dialog.open(
        //     InfoDialogComponent, {
        //     data: {
        //       message: message  
        //     }
        //   });

        //   setTimeout(() => {
        //     dialogInstance.close();
        //   }, 5000);
    }


}


