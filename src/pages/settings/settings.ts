import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { SettingsService } from '../../services/settings';
import { NetworkService } from '../../services/network';
import { AlertView } from '../../uicomponents/alert';
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
  public password
  public terms: any = {}
  public terms_ar: any = {}
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
      this.terms = res.response.terms
      this.terms_ar = res.response.terms_ar
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
        name: 'Password',
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

          this.password = data
          console.log(this.password)
          
          this.settingservice.onchangePassword(this.password).subscribe(res=>{
            console.log(res)
          },err=>{
            console.log("masla ha ")
            console.log(err)
            this.errorMessage = JSON.parse(err._body)
            console.log(this.errorMessage)
            this.errorMessage = this.errorMessage.error.message[0]


          })

        }
      }
    ]
  });
  alert.present();
}
}