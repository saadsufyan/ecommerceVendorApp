import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, App } from 'ionic-angular';
import { ProductsPage } from '../products/products';import { ProductsService } from '../../services/products';
import { NetworkService } from '../../services/network';
import { SharedService } from '../../services/sharedService';
import { StockService } from '../../services/stock';
import { AlertView } from '../../uicomponents/alert';

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
  providers: [ProductsService, NetworkService,StockService, SharedService,AlertView]
})
export class Tab3Page {

  public val
  public stockData
  public specifications
  public errorMessage : any = ""

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public app: App,public stockservice : StockService, public sharedservice: SharedService, public productservice: ProductsService, public popup: AlertView) {
  
    this.val = this.navParams.get('data')
    console.log(this.val)

    this.stockData = this.sharedservice.fetchStockData()
    console.log(this.stockData)
    this.specifications = this.stockData.specs
    
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

  onStock(){
    this.stockservice.onUpdateStock(data).subscribe(res=>{
      console.log(res)
    },    
    err => {
      console.log(err)
      this.popup.hideLoader()
      this.errorMessage = JSON.parse(err._body)
      this.errorMessage = this.errorMessage.error.message[0]
      this.popup.showToast(this.errorMessage,1500,'bottom',false,"")
    })
  }
}
