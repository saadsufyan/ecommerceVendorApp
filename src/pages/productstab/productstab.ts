import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Tab1Page } from '../tab1/tab1';
import { Tab2Page } from '../tab2/tab2';
import { Tab3Page } from '../tab3/tab3';
import { UtilProvider } from '../../providers/util/util';
import { TranslateService } from 'ng2-translate';


/**
 * Generated class for the ProductstabPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productstab',
  templateUrl: 'productstab.html'
})
export class ProductstabPage {

  tab1Root = 'Tab1Page'
  tab2Root = 'Tab2Page'
  tab3Root = 'Tab3Page'

  public id


  constructor(public translate : TranslateService,public util: UtilProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.tab1Root
    this.navParams = navParams;
    console.log(this.navParams)
    this.id = this.navParams.data
    console.log(this.id)


  }

}
