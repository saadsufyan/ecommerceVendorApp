import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductstabPage } from './productstab';

@NgModule({
  declarations: [
    ProductstabPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductstabPage),
  ]
})
export class ProductstabPageModule {}
