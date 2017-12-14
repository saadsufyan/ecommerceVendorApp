import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { AddpromotionPage } from '../addpromotion/addpromotion';
import { PromotionsService } from '../../services/promotions';
import { NetworkService } from '../../services/network';
import { AlertView } from '../../uicomponents/alert';


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
  providers: [PromotionsService, NetworkService, AlertView]
})
export class PromotionsPage {

  PromoArray = [
    {
      id: 2,
      title: "Promotion 2",
      title_ar: "لانا",
      product: "product 1",
      product_ar: "إعلانات",
      description: "Promotion 2",
      description_ar: "لانا",
      Image: "http://localhost/gomallbackend/public/avatar/1512729451"
    },
    {
      id: 3,
      title: "Promotion 3",
      title_ar: "لانا",
      product: "product 2",
      product_ar: "إعلانات",
      description: "Promotion 3",
      description_ar: "لانا",
      Image: "http://localhost/gomallbackend/public/avatar/1512729451"
    }
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController, public alertCtrl: AlertController, public promotionservice: PromotionsService, public popup: AlertView) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromotionsPage');
    this.getPromotions()
  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);
  }
  goBack(){
    this.navCtrl.pop()
  }  

  goToUpdatePromotions(id){
    this.navCtrl.push(AddpromotionPage, {id: id}, {animation: 'left'})
  }

  goToAddPromotions(){
    this.navCtrl.push(AddpromotionPage,{animation: 'left'})
  } 

  getPromotions(){

    this.promotionservice.onGetPromotions().subscribe(res=>{
      console.log(res)
      res.status && res.response.length > 0 ? this.PromoArray = res.response : this.popup.showToast('No Promotions found', 1500, 'bottom', false, "")
    })
  }
}
