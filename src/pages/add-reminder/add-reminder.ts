import { ApiCallProvider } from './../../providers/api-call/api-call';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { GlobalVariableProvider } from '../../providers/global-variable/global-variable';

@IonicPage()
@Component({
  selector: 'page-add-reminder',
  templateUrl: 'add-reminder.html',
})
export class AddReminderPage {
  public reminderData: any = {};
  public eventId: any;

  constructor(
    public api: ApiCallProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public calendar: Calendar,
    public globalVariable: GlobalVariableProvider
  ) {
    this.eventId = this.navParams.get('eventId');
  }

  setReminder() {

    let options: any = {
      firstReminderMinutes: 5,
      secondReminderMinutes: 10
    };

    this.calendar.createEventWithOptions(this.reminderData.reminder_title, this.reminderData.address, this.reminderData.note, new Date(this.reminderData.start_date), new Date(this.reminderData.end_date), options);

    this.reminderData.event_id = this.eventId;
    this.api.postApiCall(this.reminderData, 'add-reminder').then((res: any) => {
      if (res && res.status == 1) {
        this.navCtrl.push('EventDetailPage', {
          eventId: this.eventId
        });
      } else if (res && res.status == 9) {
        this.doLogout();
      }
    }, (error) => {
      const result = error.error;
      if (result && result.status == 9) {
        this.globalVariable.showToast(result.message);
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
