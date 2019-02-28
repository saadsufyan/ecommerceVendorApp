import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, App, normalizeURL} from 'ionic-angular';
import { ProductsPage } from '../products/products';
import { ProductsService } from '../../services/products';
import { NetworkService } from '../../services/network';
import { SharedService } from '../../services/sharedService';
import { AlertView } from '../../uicomponents/alert';
import { Tab2Page } from '../tab2/tab2';
import { UtilProvider } from '../../providers/util/util';
// import { TranslateService } from 'ng2-translate';

import { TranslateproviderProvider } from '../../providers/translateprovider/translateprovider'
import $ from "jquery";
import { LoginPage } from '../login/login';

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
  public sub_cat : string
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
  public parent_cat_name : any
  public sub_cat_name : any

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
  public serviceDiv : boolean = false
  valueStrings  = []
  tempArry = [
    'tab1_page','products_name_en', 
    'products_name_placeholder_en' , 
    'products_name_ar', 
    'products_name_placeholder_ar', 
    'promotion_description_en', 
    'promotion_description_en_placeholder' , 
    'promotion_description_ar', 
    'promotion_description_ar_placeholder', 
    'product_category', 
    'select_category',
    'product_subcategory' , 
    'select_sub_category' , 
    'product_type', 
    'select_product',
    'product_type_product',
    'product_type_service', 
    'thumbnail_image', 
    'choose_file', 
    'product_image', 
    'choose_file', 
    'product_price_in_local', 
    'product_price_in_local_placeholder', 
    'show_calender', 
    'show_time', 
    'price_placeholder',
    'save', 

  ]
  public checklang : boolean = false
  public prompt_logout : any
  public loginError : any
  public prompt_cancel : any
  public deleteProductTitle : any
  public deleteProductMessage : any
  public promptYes : any
  public promptNo : any
  public lang : any


  constructor(public translateprovider : TranslateproviderProvider, public util: UtilProvider,public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public app: App, public productservice: ProductsService, public sharedservice: SharedService, public alertCtrl: AlertController,public popup: AlertView) {
  // console.log(translate)
    this.productId = this.navParams.get('id')
    console.log("new id " + this.productId)
    // this.productId = this.sharedservice.fetchProductId()
    // // console.log(this.productId)
    // this.sharedservice.sendProductId(this.productId)

    //  console.log(this.sharedservice.translate)
    
    for(var item in this.tempArry){
      this.translateprovider.getTranslation(this.tempArry[item]).subscribe((value)=>{
        let title = this.tempArry[item]
        this.valueStrings.push({
           title : value
        })
      })
    }
    // console.log(this.valueStrings)

  }

  ionViewDidLoad() {
    this.lang = localStorage.getItem('lang')
    console.log('ionViewDidLoad Tab1Page');
    $('#Cat_button').attr('disabled','disabled');
    $('#Undo_button').attr('disabled','disabled');

    // this.getAllCategory()
    // if(this.productId != null){
    //   this.getProductDetails()
    // }
    
    
  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);

    this.lang = localStorage.getItem('lang')
    if(this.lang == "ar"){
      this.checklang = true
      this.prompt_logout = "الخروج"
      this.prompt_cancel = "إلغاء"   
      this.loginError = "لقد تم تسجيل الخروج"  
      this.deleteProductTitle  = "حذف المنتج"
      this.deleteProductMessage = "هل انت متأكد من حذف هذا المنتج؟"
      this.promptYes = "نعم فعلا"
      this.promptNo = "لا" 
    }else{
      this.checklang = false
      this.loginError = "You have been logged out"
      this.prompt_logout = "Logout"
      this.prompt_cancel = "Cancel" 
      this.deleteProductTitle  = "Delete image"
      this.deleteProductMessage = "are you sure you want to delete this image?"
      this.promptYes = "Yes"
      this.promptNo = "No"
      }         

      // this.getAllCategory().then(()=>{if(this.productId != null){this.getProductDetails().then(()=>{ console.log('here for sure'); this.getSubCategories()})}}).then(()=>this.getSubCategoryValue());

      this.getAllCategory()
      if(this.productId != null){
        this.getProductDetails()
      }

      ;
      
  }
  goBack(){
    // this.navCtrl.pop()
  this.app.navPop()
  }  

  getAllCategory= async()=>{

    await this.productservice.onGetAllParentCategory(this.lang).subscribe(res=>{
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

  getSubCategory=async()=>{
    console.log(this.categoryObj)


    this.tempArray.push(this.categoryObj.name)

    console.log(this.tempArray)
    console.log(this.categoryList)

    this.tempCatId = this.categoryObj.id
    console.log(this.tempCatId)

    await this.getSubCategories()
  }

  onSubCategoryChange(){
    console.log("outside Loop on change sub Category")
    if(this.tempCatId!=null){
      console.log("inside loop on change sub category")
      this.categoryButton = false
      $('#Cat_button').removeAttr('disabled');
    }


    console.log(this.subcategoryObj)
    this.sub_cat = this.subcategoryObj.id
    console.log(this.sub_cat)


  }

  getSubCategories = async()=>{


    if(this.tempCatId != null){
      this.popup.showLoader()
     await this.productservice.onGetSubCategory(this.tempCatId,this.lang).subscribe(res=>{
        console.log(res)
        res.status && res.response.subcategories.length > 0 ? this.subcategoryList = res.response.subcategories : this.subcategoryList= [] && console.log("no category found")
        this.popup.hideLoader()

        console.log(this.subcategoryList)
        console.log('here we are in if statement')
  
  
      },err => {
        console.log("masla ha ")
        console.log(err);
        this.popup.hideLoader()
        this.errorMessage = JSON.parse(err._body)
        console.log(this.errorMessage)
        this.errorMessage = this.errorMessage.error.message[0]
        this.popup.showToast(this.errorMessage , 2000 , 'bottom' ,false , "")
      })
    } else {
      this.popup.showLoader()
      console.log(this.parent_cat)
      await this.productservice.onGetSubCategory(this.parent_cat,this.lang).subscribe(res=>{
        console.log(res)
        res.status && res.response.subcategories.length > 0 ? this.subcategoryList = res.response.subcategories : console.log("no category found")
        this.popup.hideLoader()



        console.log(this.subcategoryList)
        console.log('here we are in else statement')
        // this.sub_cat = this.product_details.sub_cat
        // console.log(this.sub_cat)
        console.log("sub category")
        // setTimeout(() => this.getSubCategoryValue(), 1000)



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



  }


  // onChangeGetSubCategory(){
  //   console.log(this.subcategoryObj)
  //   if(this.count> 0){
  //     this.tempCatId = this.subcategoryObj.id
  //     console.log("sub cat")
  //     console.log(this.tempCatId)
  //     console.log("last sub category: " + this.tempCatId)
      
  //    this.getSubCategories() 
  //   }
  //   else{
  //     $('#Undo_button').removeAttr('disabled');
  //     this.popup.showToast('No sub catoegories', 1000, 'bottom', false, "")
  //   }    
  // }

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


  getProductType(){
    console.log(this.producttype)
    if(this.producttype == 'service'){
      console.log("im here")
      this.serviceDiv == true ? this.serviceDiv = false : this.serviceDiv = true
      // this.serviceDiv = true
    }
    else if(this.producttype == 'product'){
      this.serviceDiv = false
    }
    else if(this.producttype == 'noproduct'){
      this.serviceDiv = false
    }
  }

  getSubCategoryValue=async()=>{

        this.sub_cat = await this.product_details.sub_cat
        // this.sub_cat = "Sweets & Cake"
        // this.sub_cat = this.sub_cat.toString();
        console.log(this.sub_cat)
  }
  getProductDetails = async()=>{
    console.log("mil gai id: "  + this.productId)

    await this.productservice.onGetProductDetails(this.productId).subscribe(res=>{
      console.log(res)

      this.product_details = res.response

      this.name = res.response.name
      this.name_ar = res.response.name_ar
      this.description = res.response.description
      this.description_ar = res.response.description_ar
      this.parent_cat = res.response.parent_cat
      // this.sub_cat = res.response.sub_cat;

      
      this.getSubCategories()
      // this.getSubCategories().then(() => {this.getSubCategoryValue})
      // this.getSubCategoryValue()
      setTimeout(() => this.getSubCategoryValue(), 2000)
      

      console.log($('#selected_subcats'));

      this.thumbnail = res.response.thumbnail
      this.images = res.response.images
      this.price = res.response.price
      this.producttype = res.response.type
      this.show_calender = res.response.show_calender
      this.show_time = res.response.show_time
      this.specifications = res.response.specifications

      // setTimeout(setSubcategory,10000);

      // function setSubcategory(){
      //   // this.sub_cat = res.response.sub_cat;
      //   console.log($('#selected_subcats'));
      //   $('#selected_subcats').val(res.response.sub_cat);

      //   console.log(res.response.sub_cat)
      // }
      // this.sub_cat = res.response.sub_cat

      // console.log(this.specifications)

      console.log(this.parent_cat)

      for(let i = 0; i < this.categoryList.length; i++){
        if(this.parent_cat == this.categoryList[i].id){
          this.parent_cat_name = this.categoryList[i].name
          console.log(this.parent_cat_name)
        }
      }

      // if(this.sub_cat != null){
      //   this.getSubCategories()
      //   console.log("when sub category called")
      // }
      // console.log(this.images.length)
      

    },err => {
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
          buttons: ['Dismiss']
        });
        alert.present();  
        localStorage.setItem('user' , null)
        localStorage.setItem('isLoggedIn', "false")
        this.navCtrl.push(LoginPage)
      } else{
        this.popup.showToast(this.errorMessage , 2000 , 'bottom' ,false , "")
      }
    })
    
  }

  checkNumber(id){

    if(this.lang=='ar'){
      var language = "فقط عدد الانجليزية المسموح به";
    }else{
      var language = "Only English Numbers allowed";
    }

    var reg = /^\d+$/;

    var e = $('#'+id);

    console.log(e);
    console.log(id);
    console.log(e.val());

    if(!$.isNumeric(e.val())){

    e.val('');
    e.attr('placeholder',language);
    }
  }

  // validation_spec_ar(key_id){

  //   var tb = $('#spec_name_'+key_id+'_ar');
  //   var tb_value: any = tb.val();        

  //     if(!this.validate_arabic_without_spaces(tb_value)){
  //       tb.val('');
  //       tb.attr('placeholder','Only Arabic Allowed');
  //     }      
  // }

  addProduct(){
    console.log(this.specifications)
    let data = {
      name: this.name,
      name_ar : this.name_ar,
      description: this.description,
      description_ar: this.description_ar,
      sub_cat : this.sub_cat,
      thumbnail : this.thumbnail,
      images : this.images,
      price : this.price,
      type : this.producttype,
      show_calender : this.show_calender,
      show_time : this.show_time,
      specifications: [] 
    }
    console.log(data)

  
    if(this.name_ar != null){
      var a = this.name_ar.indexOf(' ') >= 0;
      console.log(a)
    }




    if(this.name != null && this.name_ar != null && this.description != null && this.description_ar != null && this.sub_cat !=null && this.thumbnail !=null){
      if(this.productId != null && this.product_details != null){
        console.log("product Update ")
        console.log(this.specifications)
        this.sharedservice.sendProductId(this.productId)
        this.sharedservice.sendSpecifications(this.specifications)
        this.sharedservice.send(data)
        this.navCtrl.parent.select(1)
      }
      else{
        console.log("Add product ")
        this.sharedservice.sendProductId(null)
        this.sharedservice.sendSpecifications([])
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
      if(res.status){
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
 
  deleteImage(id){
    console.log(id)

    let alert = this.alertCtrl.create({
      title: this.deleteProductTitle,
      message: this.deleteProductMessage,
      buttons: [
        {
          text: this.promptNo,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.promptYes,
          handler: () => {
            console.log('delete clicked');

            // let index = this.images.indexOf(id);

            // console.log(index)
            // if(index > -1){
            //   this.images.splice(index, 1);
            // }

            this.images.splice(id,1)

            console.log(this.images)
            // this.popup.showLoader()

            // this.productservice.onDeleteProduct(id).subscribe(res=>{
            //   console.log(res)
            //   this.popup.hideLoader()
            //   this.navCtrl.push(ProductsPage,{animation: 'left'})
            //   // this.sidemenuprovider.NavigationHandler(this.navCtrl, Products, 'Products', {})
              
            // },err => {
            //   console.log("masla ha ")
            //   console.log(err);
            //   this.popup.hideLoader()
            //   this.errorMessage = JSON.parse(err._body)
            //   console.log(this.errorMessage)
            //   this.errorMessage = this.errorMessage.error.message[0]
            //   this.popup.showToast(this.errorMessage , 2000 , 'bottom' ,false , "")
            // })            
          }
        }
      ]
    });
    alert.present();

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
      if(res.status){
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
