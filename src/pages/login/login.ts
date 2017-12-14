import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginService } from '../../services/login';
import { NetworkService } from '../../services/network';
import { AlertView } from '../../uicomponents/alert';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private menu: MenuController, public service : LoginService, public popup : AlertView) {
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
        localStorage.setItem('user' , JSON.stringify(res.response[0]))
        localStorage.setItem('isLoggedIn', "true")
        this.navCtrl.setRoot(HomePage , {} , {animation:'left'})
        }
      }, err => {
                console.log(err);
                this.popup.hideLoader()
                this.errorMessage = JSON.parse(err._body)
                console.log(this.errorMessage)
                this.errorMessage = this.errorMessage.error.message[0]
                this.popup.showToast(this.errorMessage , 2000 , 'bottom' ,false , "")
      })
    }else {
      this.popup.showToast('Invalid information' , 2000 , 'bottom' ,false , "")
    }
}  

}
