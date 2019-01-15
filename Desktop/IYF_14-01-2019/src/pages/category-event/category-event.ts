import { ApiCallProvider } from './../../providers/api-call/api-call';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalVariableProvider } from '../../providers/global-variable/global-variable';

@IonicPage()
@Component({
  selector: 'page-category-event',
  templateUrl: 'category-event.html',
})
export class CategoryEventPage {
  public cateId: any;
  public eventListData: any;
  public categoryName: any;
  constructor(
    public api: ApiCallProvider,
    public globalVariable: GlobalVariableProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.cateId = this.navParams.get('catId');
    this.categoryName = this.navParams.get('catName');
    this.cateWiseEvent();
  }

  cateWiseEvent() {
    let param: any = {
      category_id: this.cateId
    }

    this.api.postApiCall(param, 'catogory-event').then((res: any) => {
      if (res && res.data && res.status == 1) {
        this.eventListData = res.data;
        console.log(this.eventListData);
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

  eventDetail(eventId) {
    this.navCtrl.push('EventDetailPage', {
      eventId: eventId
    });
  }
}
