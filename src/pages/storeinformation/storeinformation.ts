import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { MapPage } from '../map/map';
import { StoreInformationService } from '../../services/storeinformation';
import { NetworkService } from '../../services/network';
import { AlertView } from '../../uicomponents/alert';

/**
 * Generated class for the StoreinformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-storeinformation',
  templateUrl: 'storeinformation.html',
  providers: [StoreInformationService, NetworkService, AlertView]
})
export class StoreinformationPage {


  public countrylist = []

  public citylist = []

  public vendorData = {}

  public vendorname: any 
  public vendorname_ar : any 
  public description: any 
  public description_ar: any 
  public phone: any 
  public in_city_shipment_charges: any
  public out_city_shipment_charges: any 
  public countryname: any
  public offdays: any

  public errorMessage: any = ""
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController, public alertCtrl: AlertController, public storeinfoservice: StoreInformationService, public popup: AlertView) {
  
    // this.getCities()
  }

  ionViewDidLoad() { 
    console.log('ionViewDidLoad StoreinformationPage');
    this.getVendorData()
    this.getCountries()
    // this.getCities()
  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);
  }
  goBack(){
    this.navCtrl.pop()
  }
    
  openMap(){
    this.navCtrl.push(MapPage,{animation: 'left'})
  }

  getCountry(){
    console.log("country: " + this.countryname)
    this.getCities()
  }
  getCountries(){
    this.storeinfoservice.onGetCountries().subscribe(res=>{
      console.log(res)
      res.status && res.response.length ? this.countrylist = res.response : console.log("countries not found")

    },err=>{

      console.log("masla ha ")
      console.log(err)
      this.errorMessage = JSON.parse(err._body)
      console.log(this.errorMessage)
      this.errorMessage = this.errorMessage.error.message[0]
      this.popup.showToast(this.errorMessage , 2000 , 'bottom' ,false , "")      
    })
  }

  getCities(){

    console.log(this.countryname)
    this.storeinfoservice.onGetCities(this.countryname).subscribe(res=>{
      console.log(res)
      res.status && res.response.length > 0 ? this.citylist = res.response : this.popup.showToast('No cities found', 1500, 'bottom', false, "")
      console.log(this.citylist)
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

  getVendorData(){
    this.storeinfoservice.onGetVendor().subscribe(res=>{
      console.log(res)
      this.vendorData = res.response

      this.vendorname = res.response.name
      this.vendorname_ar = res.response.name_ar
      this.description = res.response.description
      this.description_ar = res.response.description_ar
      this.phone = res.response.phone
      this.in_city_shipment_charges = res.response.in_city_shipment_charges
      this.out_city_shipment_charges = res.response.out_city_shipment_charges
      this.offdays = res.response.weekends

    }, err=>{

      console.log("masla ha ");
      console.log(err)
      this.errorMessage = JSON.parse(err._body)
      console.log(this.errorMessage)
      this.errorMessage = this.errorMessage.error.message[0]
    })
    
  }

  updateVendor(){
    this.popup.showLoader()
    let data = {

      name: this.vendorname,
      name_ar: this.vendorname_ar,
      description: this.description,
      description_ar: this.description_ar,
      phone: this.phone,
      in_city_shipment_charges: this.in_city_shipment_charges,
      out_city_shipment_charges: this.out_city_shipment_charges,
      country: this.countryname,
      weekends: this.offdays,
      lat: "29.3104398",
      long: "47.6274115",
      city: "Kuwait"
    }
    console.log(data)
    this.storeinfoservice.onUpdateVendor(data).subscribe(res=>{
      console.log(res)
      this.popup.hideLoader()
      this.navCtrl.pop()
    },  err => {
      console.log("masla ha ")
      console.log(err);
      this.popup.hideLoader()
      this.errorMessage = JSON.parse(err._body)
      console.log(this.errorMessage)
      this.errorMessage = this.errorMessage.error.message[0]
      this.popup.showToast(this.errorMessage , 2000 , 'bottom' ,false , "")
    })
  }

presentPrompt() {
  // this.getCities()
  console.log("in prompt")
  let alert = this.alertCtrl.create();
  
  alert.setTitle('Select City');

    for (let i = 0; i< this.citylist.length; i++ ){

      alert.addInput({
        type: 'checkbox',
        label: this.citylist[i].city,
        value: this.citylist[i].id,
        checked: this.citylist[i].checked
      },
    )
    };
    alert.addButton({
      text: 'Confirm',
      role: 'accept',
      handler: data => {
        console.log(data);
        let selectedCities = {
          cities : data
        }
        console.log(selectedCities)
        this.storeinfoservice.onUpdateCities(this.countryname,selectedCities).subscribe(res=>{
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
      
    });


  alert.present();
}  


}
