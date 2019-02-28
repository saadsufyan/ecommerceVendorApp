import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UtilProvider } from '../../providers/util/util';
import { TranslateService } from 'ng2-translate';
import { AlertView } from '../../uicomponents/alert';




/**
 * Generated class for the FirstPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-first',
  templateUrl: 'first.html',
  providers: [AlertView]
})
export class FirstPage {
  public checklang : boolean = false

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, public platform:Platform, public translate : TranslateService,public util: UtilProvider, public popup : AlertView) {
    this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstPage');
  }

  ionViewWillEnter(){
    let lang  = localStorage.getItem('lang')
    if(lang == "ar"){
      this.checklang = true
    }else{
      this.checklang = false
      }
  }  

  goToLogin(){
    this.navCtrl.push(LoginPage, {animation: 'left'})
  }
  onClickEnglish(){
    this.translate.use('en')
    this.popup.setLanguage('en')
    this.platform.setDir('ltr' ,true)
    this.util.dir = 'ltr'
    this.navCtrl.push(FirstPage, {animation: 'left'})
}
onClickArabic(){
    this.translate.use('ar')
    this.popup.setLanguage('ar')
    this.platform.setDir('rtl' ,true)
    this.util.dir = 'rtl'
    this.navCtrl.push(FirstPage, {animation: 'left'})

}

}
