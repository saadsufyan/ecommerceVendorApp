import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AddpromotionPage } from '../addpromotion/addpromotion';


/**
 * Generated class for the PromotionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-promotions',
  templateUrl: 'promotions.html',
})
export class PromotionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromotionsPage');
  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);
  }
  goBack(){
    this.navCtrl.pop()
  }  

  goToAddPromotions(){
    this.navCtrl.push(AddpromotionPage,{animation: 'left'})
  } 
}
