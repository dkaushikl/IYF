import { ApiCallProvider } from './../../providers/api-call/api-call';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public bannerData: any;
  public eventListData: any;
  private loading: Loading;
  public eventTypeData: any;

  constructor(
    public api: ApiCallProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController
  ) {
    this.getBannerImg();
    this.getEventList();
    this.getEventType();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  getBannerImg() {
    this.api.getApiCall('banner-image').then((res: any) => {
      if (res && res.data && res.status == 1) {
        this.bannerData = res.data;
      }
    });
  }

  getEventList() {
    this.loading = this.loadingCtrl.create({ spinner: 'dots', content: 'Please wait' });
    this.loading.present();
    this.api.getApiCall('event').then((res: any) => {
      this.loading.dismiss();
      if (res && res.data && res.status == 1) {
        this.eventListData = res.data;
      }
    });
  }

  eventDetail(eventId) {
    this.navCtrl.push('EventDetailPage', {
      eventId: eventId
    });
  }

  cateEvent(catId, catName) {
    this.navCtrl.push('CategoryEventPage', {
      catId: catId,
      catName: catName
    });
  }

  getEventType() {
    this.api.getApiCall('event-type').then((res: any) => {
      console.log('event-type', res);
      if (res && res.data && res.status == 1) {
        this.eventTypeData = res.data;
      }
    })
  }
}
