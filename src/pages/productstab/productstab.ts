import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Tab1Page } from '../tab1/tab1';
import { Tab2Page } from '../tab2/tab2';
import { Tab3Page } from '../tab3/tab3';


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


  constructor(public navCtrl: NavController) {}

}
