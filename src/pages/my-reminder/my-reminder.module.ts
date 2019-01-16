import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyReminderPage } from './my-reminder';

@NgModule({
  declarations: [
    MyReminderPage,
  ],
  imports: [
    IonicPageModule.forChild(MyReminderPage),
  ],
})
export class MyReminderPageModule {}
