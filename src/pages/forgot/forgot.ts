import { ApiCallProvider } from './../../providers/api-call/api-call';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalVariableProvider } from '../../providers/global-variable/global-variable';

/**
 * Generated class for the ForgotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {

  public forgotData: any = {};

  constructor(
    public api: ApiCallProvider,
    public globalVariable: GlobalVariableProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPage');
  }

  doForgot() {
    this.api.postApiCall(this.forgotData, 'forget-password').then((success: any) => {
      if (success && success.data && success.status == 1) {
        this.navCtrl.setRoot('LoginPage');
      }
    }, (error) => {
      const result = error.error;
      if (result && result.status == 0 && result.data && result.data.errors) {
        this.globalVariable.showToast(result.data.errors[0]);
      } else {
        this.globalVariable.showToast(result.message);
      }
    });
  }

  signin() {
    this.navCtrl.push('LoginPage');
  }
}
