import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App} from 'ionic-angular';
import { ProductsPage } from '../products/products';
import { ProductsService } from '../../services/products';
import { NetworkService } from '../../services/network';
import { SharedService } from '../../services/sharedService';
import { AlertView } from '../../uicomponents/alert';
import { Tab2Page } from '../tab2/tab2';

/**
 * Generated class for the Tab1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab1',
  templateUrl: 'tab1.html',
  providers: [ProductsService, NetworkService, SharedService,AlertView]
})
export class Tab1Page {

  public categoryList : any  = []
  public errorMessage :any = ""
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public app: App, public productservice: ProductsService, public sharedservice: SharedService, public popup: AlertView) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab1Page');
    // this.getAllCategory()
  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);
  }
  goBack(){
    // this.navCtrl.pop()
  this.app.navPop()
  }  

  goToSpecifications(){
    this.navCtrl.parent.select(1)
  }
  getAllCategory(){
    this.productservice.onGetAllParentCategory().subscribe(res=>{
      console.log(res)
      res.status && res.response.length > 0 ? this.categoryList = res.response : console.log("no category found")

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

  addProduct(name, name_ar, description, description_ar, sub_cat, thumbnail,images,price,show_calender,show_time){
    let data = {
      name: name,
      name_ar : name_ar,
      description: description,
      description_ar: description_ar,
      sub_cat : sub_cat,
      thumbnail : thumbnail,
      images : images,
      price : price,
      type : "product",
      show_calender : show_calender,
      show_time : show_time,

    }
    console.log(data)

    this.sharedservice.send(data)

    this.navCtrl.parent.select(1).rootParams = {
      name: name
    }

  }
}
