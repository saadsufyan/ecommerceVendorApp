import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ProductstabPage } from '../productstab/productstab';
import { ProductsService } from '../../services/products';
import { NetworkService } from '../../services/network';
import { AlertView } from '../../uicomponents/alert';
import { SharedService } from '../../services/sharedService';
import { Tab1Page } from '../tab1/tab1';


/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
  providers: [ProductsService, NetworkService, SharedService, AlertView]
})
export class ProductsPage {

  public items

  public errorMessage
  public errormsg : any = true
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController, public productservice: ProductsService, public popup: AlertView, public sharedservice: SharedService) {
  
    this.getAllProducts()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
    
  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);
  }  
  goBack(){
    this.navCtrl.pop()
  }

  goToAddproducts(){
    // this.navCtrl.push(BasicPage, {animation: 'left'})
    this.navCtrl.push(ProductstabPage);
    // this.navCtrl.push(Tab1Page)
  }
  editProduct(id){
    console.log(id)
    // this.sharedservice.sendProductId(id)
    this.navCtrl.push(ProductstabPage, {id:id}, {animation: 'left'})
  }

  getAllProducts(){
    this.productservice.onGetAllProducts().subscribe(res=>{
      console.log(res)
      res.status && res.response.length > 0 ? this.items = res.response : console.log("no products found")
    
      if(res.status && res.response.length > 0 ){
        this.errormsg = false
        console.log(this.errormsg)
      }      
    },err => {
      console.log("masla ha ")
      console.log(err);
      // this.popup.hideLoader()
      this.errorMessage = JSON.parse(err._body)
      console.log(this.errorMessage)
      this.errorMessage = this.errorMessage.error.message[0]
      this.popup.showToast(this.errorMessage , 2000 , 'bottom' ,false , "")
    })
  }

  deleteProduct(id){
    this.popup.showLoader()
    this.productservice.onDeleteProduct(id).subscribe(res=>{
      console.log(res)
      this.popup.hideLoader()
      location.reload();
      
    },err => {
      console.log("masla ha ")
      console.log(err);
      // this.popup.hideLoader()
      this.errorMessage = JSON.parse(err._body)
      console.log(this.errorMessage)
      this.errorMessage = this.errorMessage.error.message[0]
      this.popup.showToast(this.errorMessage , 2000 , 'bottom' ,false , "")
    })
  }

}
