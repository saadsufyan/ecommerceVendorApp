import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { AddpromotionPage } from '../addpromotion/addpromotion';
import { PromotionsService } from '../../services/promotions';
import { NetworkService } from '../../services/network';
import { AlertView } from '../../uicomponents/alert';
import { UtilProvider } from '../../providers/util/util';
import { TranslateService } from 'ng2-translate';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';


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

  PromoArray = []
  public errorMessage: any = ""
  public errormsg : any = true
  public checklang:boolean =false
  public loginError
  constructor(public translate : TranslateService,public util: UtilProvider,public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController, public alertCtrl: AlertController, public promotionservice: PromotionsService, public popup: AlertView) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromotionsPage');
    this.getPromotions()
  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);

    let lang  = localStorage.getItem('lang')
    if(lang == "ar"){
      this.checklang = true
      this.loginError = "لقد تم تسجيل الخروج"   
    }else{
      this.checklang = false
      this.loginError = "You have been logged out"
      }        
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
    this.popup.showLoader()
    this.promotionservice.onGetPromotions().subscribe(res=>{
      console.log(res)
      res.status && res.response.length > 0 ? this.PromoArray = res.response : this.popup.showToast('No Promotions found', 1500, 'bottom', false, "")
      this.popup.hideLoader()
      if(res.status && res.response.length > 0 ){
        this.errormsg = false
        console.log(this.errormsg)
      }
    },err => {
      console.log("masla ha ")
      console.log(err);
      this.popup.hideLoader()
      this.errorMessage = JSON.parse(err._body)
      console.log(this.errorMessage)
      this.errorMessage = this.errorMessage.error.message[0]
      // this.popup.showToast(this.errorMessage , 2000 , 'bottom' ,false , "")
      if(this.errorMessage == "Unauthorized Request"){
        let alert = this.alertCtrl.create({
          title: 'Login Error',
          message : this.loginError,
          buttons: ['Dismiss']
        });
        alert.present(); 
        localStorage.setItem('user' , null)
        localStorage.setItem('isLoggedIn', "false")
        this.navCtrl.push(LoginPage)
      } else{
        this.popup.showToast(this.errorMessage , 2000 , 'bottom' ,false , "")
      }
})
  }

  deletePromotion(id){

    this.popup.showLoader()
    this.promotionservice.onDeletePromotion(id).subscribe(res=>{
      console.log(res)
      this.popup.hideLoader()
      this.navCtrl.push(HomePage)
    },err => {
      console.log("masla ha ")
      console.log(err);
      this.popup.hideLoader()
      this.errorMessage = JSON.parse(err._body)
      console.log(this.errorMessage)
      this.errorMessage = this.errorMessage.error.message[0]
      this.popup.showToast(this.errorMessage , 2000 , 'bottom' ,false , "")
})
  }
}
