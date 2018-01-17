import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UtilProvider } from '../../providers/util/util';
import { TranslateService } from 'ng2-translate';



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
})
export class FirstPage {

  constructor(public translate : TranslateService,public util: UtilProvider,public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
    this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstPage');
  }

  goToLogin(){
    this.navCtrl.push(LoginPage, {animation: 'left'})
  }
}
