import { ApiCallProvider } from './../../providers/api-call/api-call';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

/**
 * Generated class for the MyReminderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-my-reminder',
    templateUrl: 'my-reminder.html',
})
export class MyReminderPage {
    public reminderData: any;
    private loading: Loading;
    constructor(
        public api: ApiCallProvider,
        public navCtrl: NavController,
        public navParams: NavParams,
        private loadingCtrl: LoadingController
    ) {
        this.getReminderData();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MyReminderPage');
    }

    getReminderData() {
        this.loading = this.loadingCtrl.create({ spinner: 'dots', content: 'Please wait' });
        this.loading.present();
        this.api.getApiCall('user-reminder').then((res: any) => {
            console.log('user reminder', res);
            this.loading.dismiss();
            if (res && res.status == 1) {
                this.reminderData = res.data;
            } else if (res.status == 9) {
                this.doLogout();
            }
        });
    }

    doLogout() {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
        this.navCtrl.setRoot('LoginPage');
    }

}
