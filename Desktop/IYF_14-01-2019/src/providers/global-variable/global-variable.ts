import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the GlobalVariableProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalVariableProvider {

  public apiUrl: string = 'http://13.127.141.151/yoga-festival/api/'; //'http://ithetasolution.com/yoga-festival/api/';
  public userInfo: any;
  public token: string;

  constructor(public http: HttpClient, private toastCtrl: ToastController) {
    console.log('Hello GlobalVariableProvider Provider');
  }

  async showToast(message: string, duration?: number) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration || 2000
    });
    toast.present();
  }
}
