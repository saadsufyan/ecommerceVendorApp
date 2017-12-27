import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { ProductsPage } from '../products/products';
import { ProductsService } from '../../services/products';
import { NetworkService } from '../../services/network';
import { SharedService } from '../../services/sharedService';
import { AlertView } from '../../uicomponents/alert';
/**
 * Generated class for the Tab2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab2',
  templateUrl: 'tab2.html',
  providers: [ProductsService, NetworkService, SharedService,AlertView]
})
export class Tab2Page {

  public data = {}


  public name
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public app: App, public sharedservice: SharedService,) {
  
    this.data = this.sharedservice.fetchData()
    console.log(this.data)
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab2Page');
  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);
  }

  goBack(){
    this.app.navPop()
  }

  goToStocks(){
    this.navCtrl.parent.select(2);
  }
  

}
