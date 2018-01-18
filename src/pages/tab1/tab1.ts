import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App} from 'ionic-angular';
import { ProductsPage } from '../products/products';
import { ProductsService } from '../../services/products';
import { NetworkService } from '../../services/network';
import { SharedService } from '../../services/sharedService';
import { AlertView } from '../../uicomponents/alert';
import { Tab2Page } from '../tab2/tab2';
import { UtilProvider } from '../../providers/util/util';
import { TranslateService } from 'ng2-translate';


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

  public errorMessage :any = ""

  public name
  public name_ar
  public description
  public description_ar
  public sub_cat
  public thumbnail
  public images = []
  public imageArray = []
  public price
  public show_calender : boolean = false
  public show_time : boolean = false

  public imageFile
  public productId
  public specifications = []
  public completeData

  public categoryObj
  public subcategoryObj
  public subcategoryid
  public specificsubcategory
  public parent_cat : any

  public categoryList : any  = []
  public subcategoryList : any = []
  public specificsubcategoryList : any = []

  public categoryArray : any 
  public tempSubCatId : any
  public tempCatId : any

  public tempArray = []



  public count

  
  public product_details : any 
  public categoryButton : boolean = true
  public producttype

  constructor(public translate : TranslateService,public util: UtilProvider,public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public app: App, public productservice: ProductsService, public sharedservice: SharedService, public popup: AlertView) {
  
    this.productId= this.navParams.get('id')
    console.log("new id " + this.productId)
    // this.productId = this.sharedservice.fetchProductId()
    // // console.log(this.productId)
    // this.sharedservice.sendProductId(this.productId)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab1Page');
    $('#Cat_button').attr('disabled','disabled');
    $('#Undo_button').attr('disabled','disabled');
    this.getAllCategory()
    if(this.productId != null){
      this.getProductDetails()
    }
    
  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);
  }
  goBack(){
    // this.navCtrl.pop()
  this.app.navPop()
  }  

  goToSpecifications(){
    
    this.sharedservice.sendSpecifications(this.specifications)
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

  getSubCategory(){
    console.log(this.categoryObj)

    console.log("Category Name: " + this.categoryObj.name)

    this.tempArray.push(this.categoryObj.name)

    console.log(this.tempArray)
    console.log(this.categoryList)

    this.tempCatId = this.categoryObj.id
    console.log(this.tempCatId)

    this.getSubCategories()
  }

  onSubCategoryChange(){
    console.log("outside Loop on change sub Category")
    if(this.tempCatId!=null){
      console.log("inside loop on change sub category")
      this.categoryButton = false
      $('#Cat_button').removeAttr('disabled');
    }
  }

  getSubCategories(){
    this.productservice.onGetSubCategory(this.tempCatId).subscribe(res=>{
      console.log(res)
      res.status && res.response.subcategories.length > 0 ? this.subcategoryList = res.response.subcategories : console.log("no category found")

      this.count = res.response.count
      console.log("intermediate Count: " + this.count)
      console.log(this.subcategoryList)

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

  onChangeGetSubCategory(){
    console.log(this.subcategoryObj)
    if(this.count> 0){
      this.tempCatId = this.subcategoryObj.id
      console.log("last sub category: " + this.tempCatId)
      
     this.getSubCategories() 
    }
    else{
      $('#Undo_button').removeAttr('disabled');
      this.popup.showToast('No sub catoegories', 1000, 'bottom', false, "")
    }    
  }

  onClickUndo(){
    if(this.count== 0){
      this.getParentCategoryOfSpecificSubCategory()
    }
    
  }

  getParentCategoryOfSpecificSubCategory(){
    this.productservice.onGetParentCategoryOfSpecificSubCategory(this.tempCatId).subscribe(res=>{
      console.log(res)

      res.status && res.response.subcategories.length > 0 ? this.subcategoryList = res.response.subcategories : console.log("no category found")
      
      this.count = res.response.count

      console.log("lat sub cat: " + this.tempCatId)
      console.log("final count: " + this.count)

      console.log(this.subcategoryList)


      console.log("sub cat id: " + this.subcategoryObj.id)
      console.log("sub cat name: " + this.subcategoryObj.name)

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
    console.log("mil gai id: "  + this.productId)

    this.productservice.onGetProductDetails(this.productId).subscribe(res=>{
      console.log(res)

      this.product_details = res.response

      this.name = res.response.name
      this.name_ar = res.response.name_ar
      this.description = res.response.description
      this.description_ar = res.response.description_ar
      this.parent_cat = res.response.parent_cat
      this.sub_cat = res.response.sub_cat
      this.thumbnail = res.response.thumbnail
      this.images = res.response.images
      this.price = res.response.price
      this.show_calender = res.response.show_calender
      this.show_time = res.response.show_time
      this.specifications = res.response.specifications

      console.log(this.parent_cat)

      console.log(this.images.length)
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

  addProduct(){
    let data = {
      name: this.name,
      name_ar : this.name_ar,
      description: this.description,
      description_ar: this.description_ar,
      sub_cat : this.tempCatId,
      thumbnail : this.thumbnail,
      images : this.imageArray,
      price : this.price,
      type : this.producttype,
      show_calender : this.show_calender,
      show_time : this.show_time,
      specifications: [] 
    }
    console.log(data)

    if(this.name != null && this.name_ar != null && this.description != null && this.description_ar != null && this.tempCatId !=null && this.price !=null){
      if(this.productId != null && this.product_details != null){
        console.log("product Update ")
        this.sharedservice.send(data)
        this.sharedservice.sendSpecifications(this.specifications)
        this.navCtrl.parent.select(1)
      }
      else{
        console.log("Add product ")
        this.sharedservice.send(data)
        this.navCtrl.parent.select(1)
      }
    }else{
      this.popup.showToast('please fill all required fields ', 2000 , 'bottom' ,false , "")
    }


  }
  

  onChange(event) {
    this.popup.showLoader()

    if(event != null){
      this.imageFile = event.srcElement.files[0];
    
    let file = event.srcElement.files[0];

    var formdata = new FormData();

      formdata.append('avatar', file);
      this.productservice.uploadPicture(formdata).subscribe(res => {
      console.log(res)
      if(res.status > 0){
        this.popup.hideLoader()
        this.popup.showToast('picture uploaded successfully' , 1500 , 'bottom' , false , "")
        let user = JSON.parse(localStorage.getItem('user'))

        var tempimage = res.response.avatar

        this.imageArray = this.images.concat(tempimage)
        console.log(this.imageArray)

        this.images = this.imageArray

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
 
  onChange1(event) {
    this.popup.showLoader()

    this.imageFile = event.srcElement.files[0];

    console.log(this.imageFile)
    
    let file = event.srcElement.files[0];

    var formdata = new FormData();

      formdata.append('avatar', file);
      this.productservice.uploadPicture(formdata).subscribe(res => {
      console.log(res)
      if(res.status > 0){
        this.popup.hideLoader()
        this.popup.showToast('picture uploaded successfully' , 1500 , 'bottom' , false , "")
        let user = JSON.parse(localStorage.getItem('user'))

        this.thumbnail = res.response.avatar

        console.log(this.thumbnail)

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
