import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsService } from '../../services/products';
import { NetworkService } from '../../services/network';
import { AlertView } from '../../uicomponents/alert';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public productservice: ProductsService, public popup: AlertView) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TopproductsPage');
    this.getTopProducts()
  }

  getTopProducts(){

    this.productservice.onGetTopProducts().subscribe(res=>{
      console.log(res)
      res.status && res.response.length > 0 ? this.items = res.response : this.popup.showToast('No products found', 1500, 'bottom', false, "")
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

}
