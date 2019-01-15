import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShedulePage } from './shedule';

@NgModule({
  declarations: [
    ShedulePage,
  ],
  imports: [
    IonicPageModule.forChild(ShedulePage),
  ],
})
export class ShedulePageModule {}
