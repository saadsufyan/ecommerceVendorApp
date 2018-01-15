import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { PromotionsService } from '../../services/promotions';
import { NetworkService } from '../../services/network';
import { AlertView } from '../../uicomponents/alert'; 
import { HomePage } from '../home/home';


/**
 * Generated class for the AddpromotionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addpromotion',
  templateUrl: 'addpromotion.html',
  providers: [PromotionsService, NetworkService, AlertView]
})
export class AddpromotionPage {

  public promoDetails = {}
    public title: any
    public title_ar: any 
    public description : any 
    public description_ar : any
    public discount : any
    public image : any 
    public productname : any

    public imageFile

  public updatePromo = {}
  public promotionId: any
  public product_id
  public errorMessage : any = ""

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController, public promotionservice: PromotionsService, public popup: AlertView) {
  
    this.promotionId = this.navParams.get('id')
    if(this.promotionId != null){
      this.getPromotion()
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpromotionPage');
    // this.getPromotion()
    
  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);
  }
  goBack(){
    this.navCtrl.pop()
  }

  promotionButton(){
    if(this.promotionId != null){

      this.updatePromotion(this.promotionId)
    }
    else{
      this.addPromotion()
    }
  }

  getPromotion(){
    this.promotionservice.onGetPromotionById(this.promotionId).subscribe(res=>{

      console.log(res)
      
      this.title = res.response.promotion
      this.title_ar = res.response.promotion_ar
      this.description = res.response.description
      this.description_ar = res.response.description_ar
      this.productname = res.response.product
      this.discount = res.response.discount
      this.image = res.response.image

      if(res.status){
        this.promoDetails = res.response
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

  addPromotion(){
    this.popup.showLoader()

    let data = {
      title: this.title,
      title_ar: this.title_ar,
      description: this.description,
      description_ar: this.description_ar,
      product_id: this.productname,
      discount: this.discount,
      image: this.image
    }
    this.promotionservice.onAddpromotion(data).subscribe(res=>{

      console.log(res)
      this.popup.hideLoader()
      this.navCtrl.push(HomePage)

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


  updatePromotion(id){

    this.popup.showLoader()
    let data = {
      title: this.title,
      title_ar: this.title_ar,
      description: this.description,
      description_ar: this.description_ar,
      discount: this.discount,
      image: this.image
    }

    console.log(data)
    this.promotionservice.onUpdatePromotion(id,data).subscribe(res=>{
      console.log(res)
      this.popup.hideLoader()
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
      this.promotionservice.uploadPicture(formdata).subscribe(res => {
      console.log(res)
      if(res.status > 0){
        this.popup.hideLoader()
        this.popup.showToast('picture uploaded successfully' , 1500 , 'bottom' , false , "")
        let user = JSON.parse(localStorage.getItem('user'))
          
        //this.pictures.file = res.response.file
        this.image = res.response.avatar

        console.log(this.image)

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
