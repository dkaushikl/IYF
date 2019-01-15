import { GlobalVariableProvider } from './../global-variable/global-variable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
  Generated class for the ApiCallProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiCallProvider {

  constructor(
    public http: HttpClient,
    public globalVariable: GlobalVariableProvider
  ) {
    console.log('Hello ApiCallProvider Provider');
  }

  postApiCall(postData, apiName) {
    return this.http.post(this.globalVariable.apiUrl + apiName, postData).toPromise();
  }

  getApiCall(getUrl) {
    return this.http.get(this.globalVariable.apiUrl + getUrl).toPromise()
  }
}
