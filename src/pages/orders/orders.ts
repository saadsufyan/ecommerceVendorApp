import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, AlertController } from 'ionic-angular';
import { OrderdetailPage } from '../orderdetail/orderdetail';
import { OrderService } from '../../services/orders';
import { NetworkService } from '../../services/network';
import { AlertView } from '../../uicomponents/alert';
import { UtilProvider } from '../../providers/util/util';
import { TranslateService } from 'ng2-translate';
import { LoginPage } from '../login/login';

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
  providers: [OrderService, NetworkService, AlertView]
})
export class OrdersPage {

  public myDate : any
  public filter: boolean = false

  public items: any = []
  public filterValue : any
  public startdate: any
  public enddate: any
  public newStartdate: any
  public newEnddate: any
  public errorMessage : any = "";
  public errormsg : any = true
  public checklang : boolean = false
  public loginError
  constructor(public alertCtrl:AlertController,public translate : TranslateService,public util: UtilProvider,public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController, public orderservice: OrderService, public popup: AlertView) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
    
  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);
    this.getOrders()
    
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
  goToDetails(id){
    this.navCtrl.push(OrderdetailPage,{id: id}, {animation: 'left'})
  }

  showFilter(){
    this.filter == true ? this.filter = false : this.filter = true
  }
  search(){
    this.getOrdersWithFilters()
  }
  getOrders(){
    this.orderservice.onGetVendorOrders().subscribe(res=>{
      console.log(res)
      res.status && res.response.length > 0 ? this.items = res.response : this.popup.showToast('No Orders found', 1500, 'bottom', false, "") 
      
      if(res.status && res.response.length > 0 ){
        this.errormsg = false
        console.log(this.errormsg)
      }

    }, err => {
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
        this.navCtrl.push(LoginPage)
      } else{
        this.popup.showToast(this.errorMessage , 2000 , 'bottom' ,false , "")
      }
    })
  }

  getOrdersWithFilters(){
    console.log(this.filterValue)

    this.newStartdate = new Date(this.startdate);
    console.log(this.newStartdate.getTime()/1000)

    this.newEnddate = new Date(this.enddate);

    // alert(time.getTime());
    console.log(this.newEnddate.getTime()/1000)

    console.log("Start date: " + this.newStartdate, "End Date " + this.newEnddate)    

    if(this.items){
      // this.errormsg = false
      console.log("inside loop")
      this.items = this.items.map((value, index) => {

      var datetime = new Date(value.date * 1000)
      console.log(datetime)

      var newdate = datetime.getDate()  + "/" + datetime.getMonth() + 1 + "/" + datetime.getFullYear()
      console.log(newdate)
      var temp = {
        ...value,
        date : newdate
      }
      console.log(temp)
      return temp
    })
    
    }      
    
    this.orderservice.onGetVendorsFilter(this.filterValue,this.newStartdate.getTime()/1000, this.newEnddate.getTime()/1000).subscribe(res=>{
      console.log(res)
      res.status && res.response.length > 0 ? this.items = res.response : this.popup.showToast('No Orders found', 1500, 'bottom', false, "")   

      if(res.status && res.response.length > 0 ){
        this.errormsg = false
        console.log(this.errormsg)
      }

      console.log("inside api call")
      if(this.items){
        // this.errormsg = false
        console.log("inside loop")
        this.items = this.items.map((value, index) => {

        var datetime = new Date(value.date * 1000)

        var newdate = datetime.getDate()  + "/" + datetime.getMonth() + "/" + datetime.getFullYear()
        console.log(newdate)
        var temp = {
          ...value,
          date : newdate
        }
        console.log(temp)
        return temp
      })

      }    
    }, err => {
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
