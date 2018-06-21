import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, App } from 'ionic-angular';
import { SettingsService } from '../../services/settings';
import { NetworkService } from '../../services/network';
import { AlertView } from '../../uicomponents/alert';
import { HomePage } from '../home/home';
import { UtilProvider } from '../../providers/util/util';
import { TranslateService } from 'ng2-translate';

/**
 * Generated class for the TermsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html',
  providers: [SettingsService, NetworkService, AlertView]
})
export class TermsPage {
  public lang
  public terms: any 
  public errorMessage : any = ""
  public checklang


  constructor(public translate : TranslateService,public util: UtilProvider,public navCtrl: NavController, public navParams: NavParams, public settingservice : SettingsService, public viewCtrl : ViewController, public popup : AlertView) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsPage');
    this.lang  = localStorage.getItem('lang')
    console.log(this.lang)

    if(this.lang == "ar"){
      this.checklang = true
    }else{
      this.checklang = false
    } 
    this.getTermsAndConditions()
  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);
  }  

  getTermsAndConditions(){
    this.popup.showLoader()
    console.log(this.lang)
    this.settingservice.onGetMainTerms(this.lang).subscribe(res=>{
      console.log(res)

      // this.terms = res.response
      this.popup.hideLoader()
      this.terms = res.response.terms
      
      // if(this.lang=="ar"){
      //   this.terms = res.response.terms_ar
      // }else{
      //   this.terms = res.response.terms
      // }
      
    }, err => {
      console.log("masla ha ")
      console.log(err);
      this.popup.hideLoader()
      this.errorMessage = JSON.parse(err._body)
      console.log(this.errorMessage)
      this.errorMessage = this.errorMessage.error.message[0]
      this.popup.showToast(this.errorMessage , 2000 , 'bottom' ,false , "")
    })
  }

  acceptTermsAndConditions(){
    this.popup.showLoader()

    let data = {
      "terms_accepted": true
    }
    console.log(localStorage)
    localStorage.setItem('isLoggedIn', "true") 

    this.settingservice.onAcceptTerms(data).subscribe(res=>{
      console.log(res)
      this.popup.hideLoader()
      
      this.navCtrl.setRoot(HomePage , {} , {animation:'left'})

    }, err => {
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
