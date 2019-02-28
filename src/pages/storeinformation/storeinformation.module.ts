import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreinformationPage } from './storeinformation';

@NgModule({
  declarations: [
    StoreinformationPage,
  ],
  imports: [
    IonicPageModule.forChild(StoreinformationPage),
  ],
})
export class StoreinformationPageModule {}
