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



  public citylist = [
    {
      'id': "6",
      'checked': true,
      'city': "LA"
    },
    {
      'id': "7",
      'checked': true,
      'city': "NY"
    },
    {
      'id': "8",
      'checked': true,
      'city': "Kuwait city"
    },
    {
      'id': "9",
      'checked': false,
      'city': "Mecca"
    },
    {
      'id': "10",
      'checked': false,
      'city': "Dehli"
    },

  ]

  public vendorData = {
    name: "Zara",
    name_ar: "زارا",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    description_ar: "أبجد هوز هو مجرد دمية النص من الطباعة والتنضيد الصناعة.",
    phone: "+9116854878",
    in_city_shipment_charges: 500,
    out_city_shipment_charges: 800,
    weekends: "Friday",
    lat: "29.3104398",
    long: "47.6274115",
    logo: "http..."
  }

  public vendorname: any = this.vendorData.name
  public vendorname_ar : any = this.vendorData.name_ar
  public description: any = this.vendorData.description
  public description_ar: any = this.vendorData.description_ar
  public phone: any = this.vendorData.phone
  public in_city_shipment_charges: any = this.vendorData.in_city_shipment_charges
  public out_city_shipment_charges: any = this.vendorData.out_city_shipment_charges
  public countryname: any
  public offdays: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController, public alertCtrl: AlertController, public storeinfoservice: StoreInformationService, public popup: AlertView) {
  
    // this.getCities()
  }

  ionViewDidLoad() { 
    console.log('ionViewDidLoad StoreinformationPage');
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
  }

  getCities(){

    this.storeinfoservice.onGetCities(this.countryname).subscribe(res=>{
      console.log(res)
      res.status && res.response.length > 0 ? this.citylist = res.response : this.popup.showToast('No cities found', 1500, 'bottom', false, "")
    })
  }

  getLocation(){
    
  }

  updateVendor(){
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
    })
  }

presentPrompt() {
  this.getCities()
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
        this.storeinfoservice.onUpdateCities(this.countryname,data).subscribe(res=>{
          console.log(res)
        })
      }
      
    });


  alert.present();
}  


}
