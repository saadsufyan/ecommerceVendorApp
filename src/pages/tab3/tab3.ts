import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, App } from 'ionic-angular';
import { ProductsPage } from '../products/products';
/**
 * Generated class for the Tab3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab3',
  templateUrl: 'tab3.html',
})
export class Tab3Page {

  public val
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public app: App) {
  
    this.val = this.navParams.get('data')
    console.log(this.val)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab3Page');
  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);
  }
  goBack(){
    this.app.navPop()
  }  

}
