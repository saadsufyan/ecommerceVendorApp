import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { ProductsService } from '../../services/products';
import { NetworkService } from '../../services/network';
import { AlertView } from '../../uicomponents/alert';
import { UtilProvider } from '../../providers/util/util';
import { TranslateService } from 'ng2-translate';
import { LoginPage } from '../login/login';
/**
 * Generated class for the TopproductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-topproducts',
  templateUrl: 'topproducts.html',
  providers: [ProductsService, NetworkService, AlertView]
})
export class TopproductsPage {

  public items: any = []
  public errorMessage: any = ""
  public errormsg : any = true
  public checklang : boolean = false
  public loginError

  constructor(public alertCtrl: AlertController,public translate : TranslateService,public util: UtilProvider,public navCtrl: NavController, public navParams: NavParams, public productservice: ProductsService, public popup: AlertView) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TopproductsPage');
    this.getTopProducts()

    let lang  = localStorage.getItem('lang')
    if(lang == "ar"){
      this.checklang = true
      this.loginError = "لقد تم تسجيل الخروج"   
    }else{
      this.checklang = false
      this.loginError = " You have been logged out"
      }        
  }

  getTopProducts(){
    this.popup.showLoader()
    this.productservice.onGetTopProducts().subscribe(res=>{
      console.log(res)
      res.status && res.response.length > 0 ? this.items = res.response : this.popup.showToast('No products found', 1500, 'bottom', false, "")
      this.popup.hideLoader()
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

}
