import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { GlobalVariableProvider } from '../../providers/global-variable/global-variable';
import { ApiCallProvider } from './../../providers/api-call/api-call';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private loading: Loading;
  public loginData: any = {};

  constructor(
    public api: ApiCallProvider,
    public globalVariable: GlobalVariableProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController
  ) {
  }

  doLogin() {
    this.loginData.device_token = '';
    this.loginData.device_type = '';

    this.loading = this.loadingCtrl.create({ spinner: 'dots', content: 'Please wait' });
    this.loading.present();

    this.api.postApiCall(this.loginData, 'login').then((success: any) => {
      this.loading.dismiss();
      if (success && success.data && success.status == 1) {
        localStorage.setItem('userInfo', success.data.user);
        localStorage.setItem('token', success.data.token);
        this.navCtrl.setRoot('HomePage');
      }
    }, (error) => {
      this.loading.dismiss();
      const result = error.error;
      if (result && result.status == 0 && result.data && result.data.errors) {
        this.globalVariable.showToast(result.data.errors[0]);
      } else {
        this.globalVariable.showToast(result.message);
      }
    });
  }

  forgotPwd() {
    this.navCtrl.push('ForgotPage');
  }

  signUp() {
    this.navCtrl.push('RegisterPage');
  }


}
