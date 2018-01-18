import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController} from 'ionic-angular';
import { OrderService } from '../../services/orders';
import { NetworkService } from '../../services/network';
import { AlertView } from '../../uicomponents/alert';
import { UtilProvider } from '../../providers/util/util';
import { TranslateService } from 'ng2-translate';

/**
 * Generated class for the OrderdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orderdetail',
  templateUrl: 'orderdetail.html',
  providers: [OrderService, NetworkService, AlertView]
})
export class OrderdetailPage {

  public items = {}
  public orderItems = {}

  public orderid: any
  public errorMessage: any=""
  constructor(public translate : TranslateService,public util: UtilProvider,private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public orderservice: OrderService, public popup: AlertView) {
  
    this.orderid = this.navParams.get('id')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderdetailPage');
  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);
  }
  goBack(){
    this.navCtrl.pop()
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Order',
      message: '<div class="modal-body" style="padding: 20px 40px;"><table class="table table-details ltr"><tr> <td>Name:</td><td>{{orderItems.name}}</td><tr><td>Arabic Name:</td>	<td>{{orderItems.name_ar}}</td>	</tr>	<tr><td>Price:</td>	<td>{{orderItems.price}} SAR</td></tr>	<tr><td>Quantity:</td>	<td>{{orderItems.quantity}}</td>	</tr>					<tr>	<td>Promotions:</td><td>{{orderItems.promotion}}</td>	</tr><tr><td>Specifications:</td><td>20-11-2017</td></tr><tr><td>Deliver On:</td><td>04-05-2017</td></tr> </tr> </table> </div>',
      buttons: ['Close']
    });
    alert.present();
  }
  getOrderDetials(){

    this.orderservice.onGetOrderDetails(this.orderid).subscribe(res=>{
      console.log(res)
      res.status && res.response.length > 0 ? this.items = res.response : console.log("something went wrong")      
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
  getItems(itemid){
    this.orderservice.onGetOrderItems(this.orderid,itemid).subscribe(res=>{
      console.log(res)
      res.status && res.response ? this.orderItems : console.log("something went wrong")
    },err=>{
      console.log("masla ha ");
      console.log(err)
      this.errorMessage = JSON.parse(err.body)
      console.log(this.errorMessage)
      this.errorMessage = this.errorMessage.error.message[0]
      this.popup.showToast(this.errorMessage, 200,'botom', false, "")
    })
    
  }

  VendorAccept(){
    let data = {

      status: "confirm"
    }
    this.orderservice.OnVendorOrderStatus(this.orderid, data).subscribe(res=>{
      console.log(res)
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

  VendorReject(){
    let data = {

      status: "reject"
    }
    this.orderservice.OnVendorOrderStatus(this.orderid, data).subscribe(res=>{
      console.log(res)
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
