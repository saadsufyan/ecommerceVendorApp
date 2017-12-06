import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MypaymentsPage } from './mypayments';

@NgModule({
  declarations: [
    MypaymentsPage,
  ],
  imports: [
    IonicPageModule.forChild(MypaymentsPage),
  ],
})
export class MypaymentsPageModule {}
