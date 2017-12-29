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

  public user = JSON.parse(localStorage.getItem('user'))

  public categoryList : any  = []
  public errorMessage :any = ""

  public name
  public name_ar
  public description
  public description_ar
  public sub_cat
  public thumbnail
  public images = []
  public price
  public show_calender
  public show_time

  public imageFile
  public productId
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public app: App, public productservice: ProductsService, public sharedservice: SharedService, public popup: AlertView) {
  
    this.productId = this.navParams.get('id')
    console.log(this.productId)
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

  getProductDetails(){

    this.productservice.onGetProductDetails(this.productId).subscribe(res=>{
      console.log(res)

      this.name = res.response.name
      this.name_ar = res.response.name_ar
      this.description = res.response.description
      this.description_ar = res.response.description_ar
      this.sub_cat = res.response.sub_cat
      this.thumbnail = res.response.thumbnail
      this.images = res.response.images
      this.price = res.response.price
      this.show_calender = res.response.show_calender
      this.show_time = res.response.show_time
      
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
      images : this.images,
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

  onChange(event) {
    this.popup.showLoader()

    this.imageFile = event.srcElement.files[0];

    // this.imageFile = this.imageFile.split('.').pop();

    console.log(this.imageFile)
    
    let file = event.srcElement.files[0];

    var formdata = new FormData();
    console.log(file.type.substring(0,5))

    if(file.type.substring(0,5) == "image"){
      //image
      formdata.append('avatar', file);
      this.productservice.uploadPicture(formdata).subscribe(res => {
      console.log(res)
      if(res.status > 0){
        this.popup.hideLoader()
        this.popup.showToast('picture uploaded successfully' , 1500 , 'bottom' , false , "")
        let user = JSON.parse(localStorage.getItem('user'))
          
        //this.pictures.file = res.response.file

        this.images.push(res.response.avatar)

        console.log(this.images)

        localStorage.setItem('user' , JSON.stringify(user))
        console.log(JSON.parse(localStorage.getItem('user'))) 
      }
    },
    err => {
      console.log(err)
      this.popup.hideLoader()
      this.errorMessage = JSON.parse(err._body)
      this.errorMessage = this.errorMessage.error.message[0]
      this.popup.showToast(this.errorMessage,1500,'bottom',false,"")
    })

    }

  }  

  
}
