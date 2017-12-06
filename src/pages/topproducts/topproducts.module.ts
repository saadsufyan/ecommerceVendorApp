import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopproductsPage } from './topproducts';

@NgModule({
  declarations: [
    TopproductsPage,
  ],
  imports: [
    IonicPageModule.forChild(TopproductsPage),
  ],
})
export class TopproductsPageModule {}
