import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TranslateService } from 'ng2-translate';
// import { NavController, ViewController, MenuController } from 'ionic-angular';

import 'rxjs/add/operator/map';
import { LoginPage } from '../../pages/login/login';

/*
  Generated class for the UtilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilProvider {

  public dir : any
  public lang
  constructor(public http: Http,public translate: TranslateService) {
    console.log('Hello Util Provider');
    this.checkLocale()
  }
  checkLocale(){
    this.lang = localStorage.getItem('lang')
    if(this.lang == 'ar'){
      this.dir = 'rtl'
    }
    else{
      this.dir = 'ltr'
    }
  }

  public getTranslation(keyword){
    return this.translate.get(keyword)
  }

  // checkLoggedin(errormsg){
  //   if(errormsg == "Unauthorized Request"){
  //     localStorage.setItem('user' , null)
  //     localStorage.setItem('isLoggedIn', "false")
  //     this.navCtrl.push(LoginPage)
  //   }
  // }

}
