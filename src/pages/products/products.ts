import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { ProductstabPage } from '../productstab/productstab';
import { ProductsService } from '../../services/products';
import { NetworkService } from '../../services/network';
import { AlertView } from '../../uicomponents/alert';
import { SharedService } from '../../services/sharedService';
import { Tab1Page } from '../tab1/tab1';
import { UtilProvider } from '../../providers/util/util';
import { TranslateService } from 'ng2-translate';
import { LoginPage } from '../login/login';


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
  public checklang : boolean = false
  public loginError
  
  constructor(public alertCtrl:AlertController, public translate : TranslateService,public util: UtilProvider,public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController, public productservice: ProductsService, public popup: AlertView, public sharedservice: SharedService) {
  
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
    
  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);

    this.getAllProducts()

    let lang  = localStorage.getItem('lang')
    if(lang == "ar"){
      this.checklang = true
      this.loginError = "لقد تم تسجيل الخروج"   
    }else{
      this.checklang = false
      this.loginError = "You have been logged out"
      }        
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
      // this.popup.showToast(this.errorMessage , 2000 , 'bottom' ,false , "")
      if(this.errorMessage == "Unauthorized Request"){
        let alert = this.alertCtrl.create({
          title: 'Login Error',
          message: this.loginError,
          buttons: ['Dismiss']
        });
        alert.present(); 
        localStorage.setItem('user' , null)
        localStorage.setItem('isLoggedIn', "false")
        this.navCtrl.push(LoginPage)
      } else{
        this.popup.showToast(this.errorMessage , 2000 , 'bottom' ,false , "")
      }
    })
  }

  deleteProduct(id){
    this.popup.showLoader()
    this.productservice.onDeleteProduct(id).subscribe(res=>{
      console.log(res)
      this.popup.hideLoader()
      this.navCtrl.push(ProductsPage,{animation: 'left'})
      
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
