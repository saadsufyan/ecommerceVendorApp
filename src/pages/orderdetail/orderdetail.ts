import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController} from 'ionic-angular';
import { OrderService } from '../../services/orders';
import { NetworkService } from '../../services/network';
import { AlertView } from '../../uicomponents/alert';

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

  public items = {
    name : "user_name",
    phone : 1234567,
    order_amount: 300,
    shipment_charges : 200,
    type : "product",
    date : 1452850218,
    status : "pending",
    address : "abc street",
    details : [
            {
                name : "product name",
                name_ar : "اسم المنتج",
                price : 200,
                quantity : 1,
                promotion : "promotion",
                delivery_date : 1452850218,
                specifications : "color|red size|large"
            },
            {
                name : "product name",
                name_ar : "اسم المنتج",
                price : 100,
                quantity : 2,
                promotion : "promotion2",
                delivery_date : 1452850218,
                specifications : "color|blu size|small"
            }
    ]
  }
  public orderItems = {
    id : 1,
    name : "product name",
    name_ar : "اسم المنتج",
    price : 200,
    quantity : 1,
    promotion : "promotion",
    delivery_date : 1452850218,
    specifications : "color|red size|large"
  }

  public orderid: any
  public errorMessage: any=""
  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public orderservice: OrderService, public popup: AlertView) {
  
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
