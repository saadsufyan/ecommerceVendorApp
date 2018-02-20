import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util';
import { TranslateService } from 'ng2-translate';
import { AlertView } from '../../uicomponents/alert';
import { LoginPage } from '../login/login';

/**
 * Generated class for the LanguagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-language',
  templateUrl: 'language.html',
  providers: [AlertView]
})
export class LanguagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public platform:Platform, public translate : TranslateService,public util: UtilProvider, public popup : AlertView) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LanguagePage');
  }

onClickEnglish(){
    this.translate.use('en')
    this.popup.setLanguage('en')
    this.platform.setDir('ltr' ,true)
    this.util.dir = 'ltr'
    this.navCtrl.push(LoginPage, {animation: 'left'})
}
onClickArabic(){
    this.translate.use('ar')
    this.popup.setLanguage('ar')
    this.platform.setDir('rtl' ,true)
    this.util.dir = 'rtl'
    this.navCtrl.push(LoginPage, {animation: 'left'})

} 

}
