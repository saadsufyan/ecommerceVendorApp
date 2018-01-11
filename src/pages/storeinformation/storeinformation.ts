import { Component,ViewChild, ElementRef   } from '@angular/core';
import { Nav ,IonicPage, NavController, NavParams, ViewController, AlertController, Loading, LoadingController } from 'ionic-angular';
import { MapPage } from '../map/map';
import { StoreInformationService } from '../../services/storeinformation';
import { LoginPage } from '../login/login';
import { NetworkService } from '../../services/network';
import { LoginService } from '../../services/login';
import { AlertView } from '../../uicomponents/alert';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the StoreinformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google; 

@IonicPage()
@Component({
  selector: 'page-storeinformation',
  templateUrl: 'storeinformation.html',
  providers: [StoreInformationService, NetworkService,LoginService, AlertView]
})
export class StoreinformationPage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild(Nav) nav: Nav;
  map: any;
  loc : any

  loading : Loading

  currentLocation : any

  public countrylist = []

  public citylist = []

  public vendorData = {}

  public imageFile 
  public logo

  public vendorname: any 
  public vendorname_ar : any 
  public description: any 
  public description_ar: any 
  public phone: any 
  public in_city_shipment_charges: any
  public out_city_shipment_charges: any 
  public countryname: any
  public offdays: any
  public lat : any
  public long :any

  public errorMessage: any = ""
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController, public loadingCtrl:LoadingController,public geolocation: Geolocation, public loginservice : LoginService,public alertCtrl: AlertController, public storeinfoservice: StoreInformationService, public popup: AlertView) {
  
    // this.getCities()
  }

  ionViewDidLoad() { 
    console.log('ionViewDidLoad StoreinformationPage');
    this.getVendorData()
    this.getCountries()
    this.loadMap()
    // this.getCities()
  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);
  }
  goBack(){
    this.navCtrl.pop()
  }
    
  openMap(){
    console.log(this.loc)
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
      this.lat = res.response.lat,
      this.long = res.response.long,
      this.logo = res.response.logo

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

    if(this.vendorname != null && this.vendorname_ar != null && this.description != null && this.description_ar != null && this.phone != null && this.in_city_shipment_charges != null && this.out_city_shipment_charges != null){
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
        lat: this.lat,
        long: this.long,
        logo: this.logo
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
    else{
      this.popup.showToast("Please Fill all required fields",1500, 'bottom', false, "")
    }
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
    this.storeinfoservice.uploadPicture(formdata).subscribe(res => {
    console.log(res)
    if(res.status > 0){
      this.popup.hideLoader()
      this.popup.showToast('picture uploaded successfully' , 1500 , 'bottom' , false , "")
      let user = JSON.parse(localStorage.getItem('user'))
        
      //this.pictures.file = res.response.file
      this.logo = res.response.avatar

      console.log(this.logo)

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

loadMap(){
 
  this.geolocation.getCurrentPosition().then((position) => {


    this.loc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    this.lat = position.coords.latitude
    this.long = position.coords.longitude
    console.log("lat "  + position.coords.latitude)
    console.log("long "  + position.coords.longitude)


  }, (err) => {
    console.log(err);
  });

}


onUserLogout(){
  //this.popup.showLoader()
  this.showLoading()
  this.loginservice.onUserLogout().subscribe((res) => {
            
    
    console.log(res)
    //this.popup.hideLoader()
    if(res.status){
      localStorage.setItem('isLoggedIn', null)
      //localStorage.setItem('user' , null)

      this.navCtrl.push(LoginPage,{animation: 'left'})
    }
  },
  err => {
    console.log("logged out")
    //this.popup.hideLoader()
    //this.popup.showToast(err.data.error.message[0] , 1500 , 'bottom' , false , "")
  })  

}

showLoading(){
  this.loading = this.loadingCtrl.create({
    spinner: 'bubbles',
    dismissOnPageChange: true
  });
  this.loading.present();
}



}
