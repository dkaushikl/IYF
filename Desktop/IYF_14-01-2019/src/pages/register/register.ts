import { GlobalVariableProvider } from './../../providers/global-variable/global-variable';
import { ApiCallProvider } from './../../providers/api-call/api-call';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  private loading: Loading;
  public registerData: any = {};
  public lName: any;
  public fName: any;
  public userInfo: any;

  constructor(
    public api: ApiCallProvider,
    public globalVariable: GlobalVariableProvider,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    public navParams: NavParams
  ) {
  }

  signin() {
    this.navCtrl.setRoot('LoginPage');
  }

  doRegister() {
    this.registerData.login_type = 'email';
    this.registerData.device_type = '';
    this.registerData.device_token = '';
    this.registerData.name = this.lName + this.fName;

    this.loading = this.loadingCtrl.create({ spinner: 'dots', content: 'Please wait' });
    this.loading.present();

    this.api.postApiCall(this.registerData, 'register').then((success: any) => {
      this.loading.dismiss();
      if (success && success.status == 1 && success.data) {
        this.globalVariable.userInfo = success.data.user;
        localStorage.setItem('userInfo', JSON.stringify(this.globalVariable.userInfo));
        localStorage.setItem('token', success.data.token);
        this.navCtrl.setRoot('HomePage');
      }
    }, (error: any) => {
      this.loading.dismiss();
      const result = error.error;
      if (result && result.status == 0 && result.data && result.data.errors) {
        this.globalVariable.showToast(result.data.errors[0]);
      } else {
        this.globalVariable.showToast(result.message);
      }
    });
  }
}
