import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController} from 'ionic-angular';
import { OrderService } from '../../services/orders';
import { NetworkService } from '../../services/network';
import { AlertView } from '../../uicomponents/alert';
import { UtilProvider } from '../../providers/util/util';
import { TranslateService } from 'ng2-translate';
import { HomePage } from '../home/home';

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

  public items =  {}
  public orderItems = {}

  public orderid: any
  public errorMessage: any=""

  public orderTitle
  public close

  public name_en
  public name_ar
  public price 
  public quantity
  public promotions
  public specification
  public delivery 


  public ordername_en
  public ordername_ar
  public orderprice
  public orderquantity
  public orderpromotion
  public orderspecification
  public orderdelivery
  public checklang : boolean = false
  public status : any
  public statusCheck : boolean = false
  public type : any
  public typeValue : any 
  public dispatchDiv : boolean = false

  constructor(public translate : TranslateService,public util: UtilProvider,private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public orderservice: OrderService, public popup: AlertView) {
  
    this.orderid = this.navParams.get('id')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderdetailPage');
  }
  ionViewWillEnter(){
    this.getOrderDetials()
    this.viewCtrl.showBackButton(false);

    let lang  = localStorage.getItem('lang')
    if(lang == "ar"){
      this.checklang = true
    }else{
      this.checklang = false
      }    
  }
  goBack(){
    this.navCtrl.pop()
  }


  tempfun(id){
    this.getItems(id)
    
  }

  presentAlert() {
    // this.getItems(id)

    if(this.popup.getLanguage() == "ar"){
      this.name_en = "اسم"
      this.name_ar = "الاسم العربي"
      this.price = "السعر"
      this.quantity = "كمية"
      this.promotions = "الترقيات"
      this.specification = "مواصفات"
      this.delivery = "تسليم"
      this.orderTitle = "طلب"
      this.close = "أغلق"
      
    }
    else{
      this.name_en = "Name"
      this.name_ar = "Arabic Name"
      this.price = "Price"
      this.quantity = "Quantity"
      this.promotions = "Promotions"
      this.specification = "Specifications"
      this.delivery = "Deliver on"
      this.orderTitle = "Order"
      this.close = "Close"


    }

    let alert = this.alertCtrl.create({
      title: this.orderTitle,
      message: '<div class="modal-body" style="padding: 20px 40px;"><table class="table table-details ltr"><tr> <td>'+this.name_en+'</td><td>'+this.ordername_en+'</td><tr><td>'+this.name_ar+'</td>	<td>'+this.ordername_ar+'</td>	</tr>	<tr><td>'+this.price+'</td>	<td>'+this.orderprice+'</td></tr>	<tr><td>'+this.quantity+'</td>	<td>'+this.orderquantity+'</td>	</tr>					<tr>	<td>'+this.promotions+'</td><td>'+this.orderpromotion+'</td>	</tr><tr><td>'+this.specification+'</td><td>'+this.orderspecification+'</td></tr><tr><td>'+this.delivery+'</td><td>'+this.orderdelivery+'</td></tr> </tr> </table> </div>',
      buttons: [this.close]
    });
    alert.present();
  }
  getOrderDetials(){
    this.popup.showLoader()
    this.orderservice.onGetOrderDetails(this.orderid).subscribe(res=>{
      console.log(res)
      res.status ? this.items = res.response : console.log("something went wrong")   
      this.popup.hideLoader()
      // this.getItems(res.response.id)
      console.log(res.response.status)
      this.status = res.response.status

      this.type = res.response.type

      console.log(this.statusCheck)
      // if(this.status == 'pending'){
      //   console.log(this.statusCheck)
      //   this.statusCheck = true
      //   console.log(this.statusCheck)
      // } else if(this.status == 'confirmed' || 'rejected') {
      //   console.log(this.statusCheck)
      //   this.statusCheck = false
      //   console.log(this.statusCheck)
      // } else {
      //   console.log(this.statusCheck)
      //   this.statusCheck = true
      // }


      if(this.type == 'product'){
        
        if(this.status == 'confirmed') {
          console.log(this.statusCheck)
          this.statusCheck = false
          this.dispatchDiv = true
          console.log(this.statusCheck)
        } 
      } else if(this.type == 'service'){
          if(this.status == 'pending'){
            this.statusCheck = true
            this.dispatchDiv = false
          } else if (this.status == 'confirmed'){
            this.statusCheck = false
            this.dispatchDiv = false
          }
      } 





      
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
  getItems(itemid){
    this.orderservice.onGetOrderItems(this.orderid,itemid).subscribe(res=>{
      console.log(res)
      
      res.status ? this.orderItems = res.response : console.log("something went wrong")

      console.log("api hit successfully")
      console.log("Original response ")
      console.log(res.response)

      console.log("Order Item")
      console.log(this.orderItems)
      this.ordername_en = res.response.name
      this.ordername_ar = res.response.name_ar
      this.orderprice = res.response.price
      this.orderquantity = res.response.quantity
      this.orderpromotion = res.response.promotion
      this.orderspecification = res.response.specifications
      this.orderdelivery = res.response.delivery_date

      // var currentDate = this.orderdelivery.delivery_date.getDate() + "/"
      // var currentMonth = this.orderdelivery.delivery_date.getMonth() + 1 + "/"
      // var currentYear = this.orderdelivery.delivery_date.getFullYear()

      // this.orderdelivery = currentDate + currentMonth + currentYear

      this.presentAlert()

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

      status: "confirmed"
    }
    this.orderservice.OnVendorOrderStatus(this.orderid, data).subscribe(res=>{
      console.log(res)
      this.navCtrl.push(HomePage)
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

      status: "rejected"
    }
    this.orderservice.OnVendorOrderStatus(this.orderid, data).subscribe(res=>{
      console.log(res)
      this.navCtrl.push(HomePage)
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
  
  VendorDispatch(){
    let data = {

      status: "dispatched"
    }
    this.orderservice.OnVendorOrderStatus(this.orderid, data).subscribe(res=>{
      console.log(res)
      this.navCtrl.push(HomePage)
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
