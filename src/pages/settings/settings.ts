import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { SettingsService } from '../../services/settings';
import { NetworkService } from '../../services/network';
import { AlertView } from '../../uicomponents/alert';
import { HomePage } from '../home/home';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [SettingsService, NetworkService, AlertView]
})
export class SettingsPage {
  public password : string
  public terms: any = {}
  public errorMessage : any = ""

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController, public alertCtrl: AlertController, public settingservice : SettingsService, public popup : AlertView) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.getTermsAndConditions()
  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);
  }

  goBack(){
    this.navCtrl.pop()
  }

  getTermsAndConditions(){
    this.settingservice.onGetTermsAndConditions().subscribe(res=>{
      console.log(res)
      this.terms = res.response
      
    }, err => {
      console.log("masla ha ")
      console.log(err);
      // this.popup.hideLoader()
      this.errorMessage = JSON.parse(err._body)
      console.log(this.errorMessage)
      this.errorMessage = this.errorMessage.error.message[0]
      this.popup.showToast(this.errorMessage , 2000 , 'bottom' ,false , "")
    })
  }


  presentPrompt() {

  let alert = this.alertCtrl.create({
    title: 'Update Password',
    inputs: [
      {
        name: 'new_password',
        placeholder: 'Type Here',
        type: 'password',

      }
    ],
    buttons: [
      {
        text: 'Save',
        role: 'cancel',
        handler: data => {

          console.log('Save clicked');
          if(data != null){
            this.popup.showLoader()
            this.settingservice.onchangePassword(data).subscribe(res=>{
              console.log(res)
              this.popup.hideLoader()
              this.navCtrl.push(HomePage, {animation: 'left'})
            },err=>{
              console.log("masla ha ")
              console.log(err)
              this.popup.hideLoader()
              this.errorMessage = JSON.parse(err._body)
              console.log(this.errorMessage)
              this.errorMessage = this.errorMessage.error.message[0]
              this.popup.showToast(this.errorMessage, 1500, 'bottom', false, "")
            })
          }
          else {
            this.popup.showToast('password field is required', 1500, 'bottom', false, "")
          }
        }
      }
    ]
  });
  alert.present();
}
}