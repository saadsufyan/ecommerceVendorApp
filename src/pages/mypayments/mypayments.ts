import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaymentService } from '../../services/payment';
import { NetworkService } from '../../services/network';
import { AlertView } from '../../uicomponents/alert';
import { UtilProvider } from '../../providers/util/util';
import { TranslateService } from 'ng2-translate';

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
  public payments

  constructor(public translate : TranslateService,public util: UtilProvider,public navCtrl: NavController, public navParams: NavParams, public paymentservice: PaymentService, public popup: AlertView) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MypaymentsPage');
    this.MyPayment()
  }

  MyPayment(){
    this.paymentservice.onGetMyPayments().subscribe(res=>{
      console.log(res)
      res.status && res.response.length > 0 ? this.items = res.response : console.log("no orders found")
      this.name = res.response.name
      this.name_ar = res.response.name_ar   
      this.payments = res.response.payments

      console.log(this.items)

      console.log(this.name)
      console.log(this.name_ar)

      if(res.status && res.response.payments.length > 0 ){
        this.errormsg = false
        console.log(this.errormsg)


        this.payments = this.payments.map((value, index) => {

          var datetime = new Date(value.created_at * 1000)


          console.log(datetime)

          // console.log(formattedDate)
          var day = datetime.getDate()
          var month = datetime.getMonth()
          var year = datetime.getFullYear()
          var strTime = day + '/' + month + '/' + year;
  
  
          var temp = {
            ...value,
            created_at : strTime
          }
          // console.log(temp)
          return temp
        })



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
