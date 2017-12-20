import { Component } from '@angular/core';
import { NavController, ViewController, MenuController } from 'ionic-angular';
import { StoreinformationPage } from '../storeinformation/storeinformation';
import { ProductsPage } from '../products/products';
import { PromotionsPage } from '../promotions/promotions';
import { OrdersPage } from '../orders/orders';
import { MessagesPage } from '../messages/messages';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public menu: MenuController) {
    this.menu.swipeEnable(true);
  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);
  }
  goToStoreInfo(){

    this.navCtrl.push(StoreinformationPage, {animation: 'left'})
  }

  goToPromotions(){
    this.navCtrl.push(PromotionsPage, {animation: 'left'})
  }

  goToProducts(){
    this.navCtrl.push(ProductsPage, {animation:'left'})
  }

  goToOrders(){
    this.navCtrl.push(OrdersPage, {animation: 'left'})
  }

  goToMessages(){
    this.navCtrl.push(MessagesPage, {animation: 'left'})
  }
  goToSettings(){
    this.navCtrl.push(SettingsPage, {animation: 'left'})
  }
}
