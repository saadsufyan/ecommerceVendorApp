import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, App } from 'ionic-angular';
import { ProductsPage } from '../products/products';import { ProductsService } from '../../services/products';
import { NetworkService } from '../../services/network';
import { SharedService } from '../../services/sharedService';
import { StockService } from '../../services/stock';
import { AlertView } from '../../uicomponents/alert';
import { HomePage } from '../home/home';
import { UtilProvider } from '../../providers/util/util';
import { TranslateproviderProvider } from '../../providers/translateprovider/translateprovider';

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
  public stockUpdate = []
  public quantity
  public errorMessage : any = ""

  valueStrings  = []
  tempArry = ['tab3_page', 'Stock_specification_value_en', 'Stock_specification_value_ar' , 'tab3_page', 'save']

  constructor(public translateprovider : TranslateproviderProvider, public util: UtilProvider,public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public app: App,public stockservice : StockService, public sharedservice: SharedService, public productservice: ProductsService, public popup: AlertView) {
  
    this.val = this.navParams.get('data')
    console.log(this.val)

    this.stockData = this.sharedservice.fetchStockData()
    console.log(this.stockData)
    this.specifications = this.stockData.specs
  
    for(var item in this.tempArry){
      this.translateprovider.getTranslation(this.tempArry[item]).subscribe((value)=>{
        let title = this.tempArry[item]
        this.valueStrings.push({
           title : value
        })
      })
    }
    console.log(this.valueStrings)    
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
    this.popup.showLoader()

    for(var i=0; i<this.specifications.length; i++){

      let data = {
        id: this.specifications[i].id,
        quantity: this.specifications[i].stock
      }
  
      this.stockUpdate.push(data)
    }
    let temp  = {
      stock: this.stockUpdate
    }
    console.log(this.stockUpdate)
    console.log(temp)

    this.stockservice.onUpdateStock(temp).subscribe(res=>{
      console.log(res)
      this.popup.hideLoader()
      // this.navCtrl.push(HomePage, {animation: 'left'})
      this.app.getRootNav().setRoot(HomePage , {} , {animation : 'left'});

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
