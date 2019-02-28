import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginService } from '../../services/login';
import { NetworkService } from '../../services/network';
import { AlertView } from '../../uicomponents/alert';
import { UtilProvider } from '../../providers/util/util';
import { TranslateService } from 'ng2-translate';
import { TermsPage } from '../terms/terms';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginService , AlertView, NetworkService]
})
export class LoginPage {

  public errorMessage : any = "";
  public gcmtoken : any 

  constructor(public translate : TranslateService,public util: UtilProvider,public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private menu: MenuController, public service : LoginService, public popup : AlertView) {
    this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);
  }  

  goToHome(){
    this.navCtrl.setRoot(HomePage , {} , {animation:'left'})
  }

  onNotification(){
    this.gcmtoken = localStorage.getItem('gcmtoken')
    // alert(this.gcmtoken)
    console.log(this.gcmtoken)
    let data = {
      "gcm_token": this.gcmtoken
    }
    console.log(data)
    this.service.onGCMtoken(data).subscribe(res=>{
      console.log(res)
    }, err => {
      // alert(err)
      console.log(err);
      this.errorMessage = JSON.parse(err._body)
      console.log(this.errorMessage)
      this.errorMessage = this.errorMessage.error.message[0]
      console.log(this.errorMessage)
      this.popup.showToast(this.errorMessage , 2000 , 'bottom' ,false , "")
    })
  }

  onUserLogin(username,password){
    if(username != undefined && password != undefined){
      this.popup.showLoader()
      //this.showLoading()
      let data = {
        "email": username,
        "password": password
      }
      this.service.onUserLogin(data).subscribe(res => {
      this.popup.hideLoader()
      if(res.status){
        console.log(res)
        console.log(res.response.terms_accepted)
        localStorage.setItem('user' , JSON.stringify(res.response))
        console.log(localStorage)
        
        if(res.response.terms_accepted == true){
          localStorage.setItem('isLoggedIn', "true")
          this.onNotification()
          this.navCtrl.setRoot(HomePage , {} , {animation:'left'})
        }
        else if(res.response.terms_accepted == false){
          this.navCtrl.push(TermsPage)
        }
        // this.navCtrl.setRoot(HomePage , {} , {animation:'left'})
        }
      }, err => {
                // alert(err)
                console.log(err);
                this.popup.hideLoader()
                this.errorMessage = JSON.parse(err._body)
                console.log(this.errorMessage)
                this.errorMessage = this.errorMessage.error.message[0]
                this.popup.showToast(this.errorMessage , 2000 , 'bottom' ,false , "")
      })
    }else {
      // alert("something went wrong")
      let lang  = localStorage.getItem('lang')
      if(lang == "ar"){
        this.popup.showToast('معلومات غير صالحة' , 2000 , 'bottom' ,false , "")
      }else{
        this.popup.showToast('Invalid information' , 2000 , 'bottom' ,false , "")
        }  
      
    }
}  

}
