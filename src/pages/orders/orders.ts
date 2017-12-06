import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { OrderdetailPage } from '../orderdetail/orderdetail';

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  public myDate : any
  public filter: boolean = false
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);
  }
  
  goBack(){
    this.navCtrl.pop()
  }
  goToDetails(){
    this.navCtrl.push(OrderdetailPage, {animation: 'left'})
  }

  showFilter(){
    this.filter == true ? this.filter = false : this.filter = true
  }
}
