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

  constructor(public navCtrl: NavController, public navParams: NavParams, public calendar: Calendar,
    public globalVariable: GlobalVariableProvider) {
  }

  setReminder() {
    let options: any = {
      firstReminderMinutes: 5,
      secondReminderMinutes: 10
    };
    this.calendar.createEventWithOptions(this.reminderData.title, this.reminderData.address, this.reminderData.notes, new Date(this.reminderData.startDate), new Date(this.reminderData.endDate), options).then(
      () => {
        this.globalVariable.showToast('Add event in reminder successfully');
      },
      (err) => { alert(err); }
    );
  }
}
