import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaymentService } from '../../services/payment';
import { NetworkService } from '../../services/network';
import { AlertView } from '../../uicomponents/alert';

/**
 * Generated class for the MypaymentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mypayments',
  templateUrl: 'mypayments.html',
  providers: [PaymentService, NetworkService, AlertView]
})
export class MypaymentsPage {

  public items: any = {}
  public errorMessage: any = ""
  public name: any
  public name_ar: any
  public errormsg : any = true

  constructor(public navCtrl: NavController, public navParams: NavParams, public paymentservice: PaymentService, public popup: AlertView) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MypaymentsPage');
    this.MyPayment()
  }

  MyPayment(){
    this.paymentservice.onGetMyPayments().subscribe(res=>{
      console.log(res)
      res.status && res.response.length > 0 ? this.items = res.response : this.popup.showToast('No Orders found', 1500, 'bottom', false, "")
      this.name = this.items.name
      this.name_ar = this.items.name_ar   

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
