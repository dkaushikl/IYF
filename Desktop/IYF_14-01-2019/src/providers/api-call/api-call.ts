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
  public token: any;
  constructor(
    public http: HttpClient,
    public globalVariable: GlobalVariableProvider
  ) {
    console.log('Hello ApiCallProvider Provider');
    this.token = localStorage.getItem('token');
  }

  postApiCall(postData, apiName) {
    if (this.token) {
      let headers = new HttpHeaders().set('Authorization', this.token)
      return this.http.post(this.globalVariable.apiUrl + apiName, postData, {headers: headers}).toPromise();
    } else {
      return this.http.post(this.globalVariable.apiUrl + apiName, postData).toPromise();
    }
    
  }

  getApiCall(getUrl) {
    if (this.token) {
      let headers = new HttpHeaders().set('Authorization', this.token)
      return this.http.get(this.globalVariable.apiUrl + getUrl, {headers: headers}).toPromise()
    } else {
      return this.http.get(this.globalVariable.apiUrl + getUrl).toPromise()
    }
    
  }
  
}
