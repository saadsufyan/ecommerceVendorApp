import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController,App , Platform} from 'ionic-angular';
import { SettingsService } from '../../services/settings';
import { NetworkService } from '../../services/network';
import { AlertView } from '../../uicomponents/alert';
import { HomePage } from '../home/home';
import { UtilProvider } from '../../providers/util/util';
import { TranslateService } from 'ng2-translate';
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
  public Language : any
  public updatedPassword
  public savePassword
  public typePlaceholder
  public checklang : boolean = false


  constructor(public translate : TranslateService,public util: UtilProvider,public platform:Platform, public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController, public alertCtrl: AlertController, public settingservice : SettingsService, public popup : AlertView,public app : App) {}


  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.getTermsAndConditions()
  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);
    this.getPreferedLanguage()

    let lang  = localStorage.getItem('lang')
    if(lang == "ar"){
      this.checklang = true
    }else{
      this.checklang = false
      }        
  }

  goBack(){
    this.navCtrl.pop()
  }

  getPreferedLanguage(){
    if(this.popup.getLanguage() == "ar"){
      this.Language = true
    }
    else{
      this.Language = false
    }
  }

  setLanguage(value){
    console.log(value)
    if(value == true){
      this.platform.setDir('rtl',true)
      this.translate.use('ar')
      this.util.dir = 'rtl'
      this.app.getRootNav().setRoot(HomePage , {} , {animation : 'left'});
      this.popup.setLanguage('ar')
    }else if (value == false){
      this.platform.setDir('ltr',true)
      this.translate.use('en')
      this.util.dir = 'ltr'
      this.popup.setLanguage('en')
      this.app.getRootNav().setRoot(HomePage , {} , {animation : 'left'});
    }else{
      this.platform.setDir('ltr',true)
      this.translate.use('en')
      this.util.dir = 'ltr'
      this.app.getRootNav().setRoot(HomePage , {} , {animation : 'left'});
      this.popup.setLanguage('en')
    }

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
    if(this.popup.getLanguage() == "ar"){
      this.updatedPassword = "تحديث الرقم السري"
      this.savePassword = "حفظ"
      this.typePlaceholder = "نوع"
    }
    else{
      this.updatedPassword = "Update Password"
      this.savePassword = "save"
      this.typePlaceholder = "Type"
    }

  let alert = this.alertCtrl.create({  

    title: this.updatedPassword,
    inputs: [
      {
        name: 'new_password',
        placeholder: this.typePlaceholder,
        type: 'password',

      }
    ],
    buttons: [
      {
        text: this.savePassword,
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