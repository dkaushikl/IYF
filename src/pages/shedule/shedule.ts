import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiCallProvider } from '../../providers/api-call/api-call';
import { GlobalVariableProvider } from '../../providers/global-variable/global-variable';

@IonicPage()
@Component({
  selector: 'page-shedule',
  templateUrl: 'shedule.html',
})
export class ShedulePage {
  public mySchedule: string = "puppies";
  public scheduleList: any;
  public eventId: any;

  constructor(public api: ApiCallProvider, public globalVariable: GlobalVariableProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.eventId = this.navParams.get('eventId');
    this.getEventSchedule();
  }

  getEventSchedule() {
    let param: any = {
      event_id: this.eventId
    }

    this.api.postApiCall(param, 'event-schedule').then((res: any) => {
      console.log(res);
      if (res && res.data && res.status == 1) {
        this.scheduleList = res.data;
        console.log(this.scheduleList);
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
}
