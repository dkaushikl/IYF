import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiCallProvider } from '../../providers/api-call/api-call';
import { GlobalVariableProvider } from '../../providers/global-variable/global-variable';

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  public eventId: any;
  public event: any;

  constructor(public api: ApiCallProvider, public globalVariable: GlobalVariableProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.eventId = this.navParams.get('eventId');
    this.getEventDetails();
  }

  getEventDetails() {
    let param: any = {
      event_id: this.eventId
    }
    this.api.postApiCall(param, 'event-view').then((res: any) => {
      if (res && res.data && res.status == 1) {
        this.event = res.data;
        console.log(this.event);
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


  addReminder() {
    this.navCtrl.push('AddReminderPage');
  }

  goToSchedule(eventId) {
    this.navCtrl.push('ShedulePage', {
      eventId: eventId
    });
    // this.navCtrl.push('ShedulePage');
  }
}
