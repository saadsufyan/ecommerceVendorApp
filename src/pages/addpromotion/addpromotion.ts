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
  getPromotion(){
    this.promotionservice.onGetPromotionById(this.promotionId).subscribe(res=>{

      console.log(res)
      
      this.title = res.response.promotion
      this.title_ar = res.response.promotion_ar
      this.description = res.response.description_ar
      this.discount = res.response.discount
      this.image = res.response.image
    
      res.status && res.response.length > 0 ? this.promoDetails = res.response : this.popup.showToast('No Promotion found', 1500, 'bottom', false, "")
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
      product_id: this.product_id,
      discount: this.discount,
      image: "http://localhost/gomallbackend/public/avatar/1512729688"
    }
    this.promotionservice.onAddpromotion(data).subscribe(res=>{

      console.log(res)
      this.popup.hideLoader()
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


  updatePromotion(id){
    let data = {
      title: this.title,
      title_ar: this.title_ar,
      description: this.description,
      description_ar: this.description_ar,
      discount: this.discount,
      image: "http://localhost/gomallbackend/public/avatar/1512729688"
    }

    console.log(data)
    this.promotionservice.onUpdatePromotion(id,data).subscribe(res=>{
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
