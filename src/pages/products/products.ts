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
  public prompt_logout : any
  public loginError : any
  public prompt_cancel : any
  public deleteProductTitle : any
  public deleteProductMessage : any
  public promptYes : any
  public promptNo : any

  
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
      this.prompt_logout = "الخروج"
      this.prompt_cancel = "إلغاء"   
      this.loginError = "لقد تم تسجيل الخروج"  
      this.deleteProductTitle  = "حذف المنتج"
      this.deleteProductMessage = "هل انت متأكد من حذف هذا المنتج؟"
      this.promptYes = "نعم فعلا"
      this.promptNo = "لا" 
    }else{
      this.checklang = false
      this.loginError = "You have been logged out"
      this.prompt_logout = "Logout"
      this.prompt_cancel = "Cancel" 
      this.deleteProductTitle  = "Delete Product"
      this.deleteProductMessage = "are you sure you want to delete this product?"
      this.promptYes = "Yes"
      this.promptNo = "No"
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
    this.popup.showLoader()
    this.productservice.onGetAllProducts().subscribe(res=>{
      console.log(res)
      this.popup.hideLoader()
      res.status && res.response.length > 0 ? this.items = res.response : console.log("no products found")
    
      if(res.status && res.response.length > 0 ){
        this.errormsg = false
        console.log(this.errormsg)
      }      
    },err => {
      console.log("masla ha ")
      console.log(err);
      this.popup.hideLoader()
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

  // deleteProduct(id){
  //   this.popup.showLoader()
  //   this.productservice.onDeleteProduct(id).subscribe(res=>{
  //     console.log(res)
  //     this.popup.hideLoader()
  //     this.navCtrl.push(ProductsPage,{animation: 'left'})
      
  //   },err => {
  //     console.log("masla ha ")
  //     console.log(err);
  //     // this.popup.hideLoader()
  //     this.errorMessage = JSON.parse(err._body)
  //     console.log(this.errorMessage)
  //     this.errorMessage = this.errorMessage.error.message[0]
  //     this.popup.showToast(this.errorMessage , 2000 , 'bottom' ,false , "")
  //   })
  // }
  deleteProduct(id){
    let alert = this.alertCtrl.create({
      title: this.deleteProductTitle,
      message: this.deleteProductMessage,
      buttons: [
        {
          text: this.promptNo,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.promptYes,
          handler: () => {
            console.log('Buy clicked');
            this.popup.showLoader()

            this.productservice.onDeleteProduct(id).subscribe(res=>{
              console.log(res)
              this.popup.hideLoader()
              this.navCtrl.push(ProductsPage,{animation: 'left'})
              // this.sidemenuprovider.NavigationHandler(this.navCtrl, Products, 'Products', {})
              
            },err => {
              console.log("masla ha ")
              console.log(err);
              this.popup.hideLoader()
              this.errorMessage = JSON.parse(err._body)
              console.log(this.errorMessage)
              this.errorMessage = this.errorMessage.error.message[0]
              this.popup.showToast(this.errorMessage , 2000 , 'bottom' ,false , "")
            })            
          }
        }
      ]
    });
    alert.present();
  }  


}
