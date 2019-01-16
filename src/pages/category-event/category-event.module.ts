import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryEventPage } from './category-event';

@NgModule({
  declarations: [
    CategoryEventPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryEventPage),
  ],
})
export class CategoryEventPageModule {}
