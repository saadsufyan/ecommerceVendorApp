import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ProductstabPage } from '../productstab/productstab'


/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);
  }  
  goBack(){
    this.navCtrl.pop()
  }

  goToAddproducts(){
    // this.navCtrl.push(BasicPage, {animation: 'left'})
    this.navCtrl.push(ProductstabPage);
  }

}
