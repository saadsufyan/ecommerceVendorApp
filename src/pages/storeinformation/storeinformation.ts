import { Component,ViewChild, ElementRef   } from '@angular/core';
import { Nav ,IonicPage, NavController, NavParams, ViewController, AlertController, Loading, LoadingController, ModalController, normalizeURL } from 'ionic-angular';
import { MapPage } from '../map/map';
import { StoreInformationService } from '../../services/storeinformation';
import { LoginPage } from '../login/login';
import { NetworkService } from '../../services/network';
import { LoginService } from '../../services/login';
import { AlertView } from '../../uicomponents/alert';
import { Geolocation } from '@ionic-native/geolocation';
import { UtilProvider } from '../../providers/util/util';
import { TranslateService } from 'ng2-translate';
import { LocationSelectPage } from '../location-select/location-select';
import { HomePage } from '../home/home';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
// import { Camera, CameraOptions } from '@ionic-native/camera';

// import { HTTP } from '@ionic-native/http';
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

  public ios_Client_key : string = 'Z29tYWxsLWFwcC1pb3M6NWFlZTMyZjItYTgyOS00Y2I2LWE5MzgtOGQxZmYwYjJhMTg4DQo=';
  public android_client_key : string = 'Z29tYWxsLWFwcC1hbmRyb2lkOjY2ZmU3MzBmLWQ2M2UtNDI2OS04ZmJhLTkwMGYxMDY4ZDdmOQ==';


  loading : Loading

  currentLocation : any
  private imageSrc: string;
  public imagePath

  public countrylist = []

  public citylist = []

  public vendorData = {}

  public imageURI:any;
  public imageFileName:any;
  public logo

  public vendorname: any 
  public vendorname_ar : any 
  public description: any 
  public description_ar: any 
  public phone: any 
  public in_city_shipment_charges: any
  public out_city_shipment_charges: any 
  public countryname: any
  public selectedcountry : any
  public offdays: any
  public lat : any
  public long :any

  public errorMessage: any = ""
  public checklang : boolean = false

  public prompt_cityname
  public prompt_confirm
  public prompt_cancel
  public prompt_logout
  public prompt_logut_message
  public loginError
  public cityError
  public lang
  public preselectedcountries
  constructor(public translate : TranslateService,public util: UtilProvider,public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController, public loadingCtrl:LoadingController,public geolocation: Geolocation, public loginservice : LoginService,public alertCtrl: AlertController, public storeinfoservice: StoreInformationService, public popup: AlertView, public modalCtrl: ModalController,) {
  
    // this.getCities()
  }

  ionViewDidLoad() { 
    console.log('ionViewDidLoad StoreinformationPage');

    this.lang  = localStorage.getItem('lang')
    console.log(this.lang)

    this.getVendorData()
    this.getCountries()
    this.getSelectedCountries()


    // this.getCities()
  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);

    if(this.popup.getLanguage() == "ar"){
      this.checklang = true
      this.prompt_cityname = "اختر المدينة التي يمكنك التوصيل لها (خدمته) "
      this.prompt_confirm = "تؤكد"
      this.prompt_logout = "الخروج"
      this.prompt_logut_message = "هل أنت متأكد أنك تريد تسجيل الخروج ؟"
      this.prompt_cancel = "إلغاء"   
      this.loginError = "لقد تم تسجيل الخروج"   
      this.cityError = "لم يتم تحديد أي بلد"
    }
    else{
      this.checklang = false
      this.prompt_cityname = "Select City"
      this.prompt_confirm = "Confirm"
      this.prompt_logout = "Logout"
      this.prompt_logut_message = "Are you sure you want to logout ?"
      this.prompt_cancel = "Cancel" 
      this.loginError = "You have been logged out"  
      this.cityError = "No country selected"   
    }      
  }
  goBack(){
    this.navCtrl.pop()
  }
    
  openMap(){
    console.log(this.loc)
    this.navCtrl.push(MapPage,{animation: 'left'})
  }

  getCountry(){
    console.log("Country name: ")
    console.log(this.countryname)
    if(this.countryname != "opt"){
      console.log("im here")
      this.getCities()
    }
    
  }
  getCountries(){

    this.storeinfoservice.onGetCountries(this.lang).subscribe(res=>{
      console.log(res)
      res.status && res.response.length ? this.countrylist = res.response : console.log("countries not found")

    },err=>{

      console.log("masla ha ")
      console.log(err)
      this.errorMessage = JSON.parse(err._body)
      console.log(this.errorMessage)
      this.errorMessage = this.errorMessage.error.message[0]
      // this.popup.showToast(this.errorMessage , 2000 , 'bottom' ,false , "")      
    })
  }

  getCities(){

    console.log(this.countryname)
    this.storeinfoservice.onGetCities(this.countryname,this.lang).subscribe(res=>{
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
  getSelectedCountries(){
    this.storeinfoservice.onGetSelectedCountries(this.lang).subscribe(res=>{
      console.log(res)

      this.preselectedcountries = res.response.countries
      console.log(this.preselectedcountries)
    },  err => {
        console.log("masla ha ")
        console.log(err);
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
      this.countryname = res.response.country
      this.offdays = res.response.weekends
      this.lat = res.response.lat,
      this.long = res.response.long,
      this.logo = res.response.image

    }, err=>{

      console.log("masla ha ");
      console.log(err)
      this.errorMessage = JSON.parse(err._body)
      console.log(this.errorMessage)
      this.errorMessage = this.errorMessage.error.message[0]
      console.log(this.errorMessage)
      this.popup.showToast(this.errorMessage , 2000 , 'bottom' ,false , "")
      if(this.errorMessage == "Unauthorized Request"){
        let alert = this.alertCtrl.create({
          title: 'Login Error',
          message: this.loginError,
          buttons: ['Dismiss']
        });
        alert.present();  
        localStorage.setItem('user' , null)
        localStorage.setItem('isLoggedIn', "false")
      
        this.navCtrl.push(LoginPage)
      } else{
        
      }
    })
    
  }


  updateVendor(){
    

    if(this.vendorname != null && this.vendorname_ar != null && this.description != null && this.description_ar != null && this.phone != null && this.in_city_shipment_charges != null && this.out_city_shipment_charges != null){
      console.log("lat")
      console.log (this.lat)
      console.log("long")
      console.log(this.long)
      if(this.lat == 0 || this.long == 0){
        console.log("Lat" + this.lat)
        console.log("long" + this.long)
        this.popup.showToast("Please select location first",1500, 'bottom', false, "")

      }else{
        this.popup.showLoader()
        console.log("im here")
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


    }
    else{
      this.popup.showToast("Please Fill all required fields",1500, 'bottom', false, "")
    }
  }

presentPrompt() {
  // this.getCities()
  console.log("in prompt")
  if(this.countryname != null){
    this.cityError = null
  }

  let alert = this.alertCtrl.create({
    title: this.prompt_cityname,
    message: this.cityError
  });  



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
      text: this.prompt_confirm,
      role: 'accept',
      handler: data => {
        console.log(data);
        let selectedCities = {
          cities : data
        }
        console.log(selectedCities)
        console.log(this.countryname)
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
  
  var image = event.srcElement.files[0];

  var formdata = new FormData();

    formdata.append('avatar',  image);       


    this.popup.showLoader()
    
    this.storeinfoservice.uploadPicture(formdata).subscribe(res => {
    console.log(res)
    if(res.status){
      this.popup.hideLoader()
      
      let user = JSON.parse(localStorage.getItem('user'))
      this.logo = res.response.avatar

      console.log(this.logo)
      this.popup.showToast('picture uploaded successfully' , 1500 , 'bottom' , false , "")

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
onUserLogout() {

    let alert = this.alertCtrl.create({
      title: this.prompt_logout,
      message: this.prompt_logut_message,
      buttons: [
        {
          text: this.prompt_cancel,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.prompt_confirm,
          handler: () => {
            console.log('Confirm clicked');
            
            this.popup.showLoader()

            this.loginservice.onUserLogout().subscribe((res) => {
            
    
              console.log(res)
              this.popup.hideLoader()
              if(res.status){
                localStorage.setItem('isLoggedIn', null)
                //localStorage.setItem('user' , null)
          
                this.navCtrl.push(LoginPage,{animation: 'left'})
              }
            },
            err => {
              console.log("logged out")
              this.popup.hideLoader()
              this.popup.showToast(err.data.error.message[0] , 1500 , 'bottom' , false , "")
            })              
          }
        }
      ]
    });
    alert.present();
  }

showLoading(){
  this.loading = this.loadingCtrl.create({
    spinner: 'bubbles',
    dismissOnPageChange: true
  });
  this.loading.present();
}


launchLocationPage(){
 
  let modal = this.modalCtrl.create(LocationSelectPage);

  modal.onDidDismiss((location) => {
      console.log(location);
      if(location !=null){
        this.lat = location.lat
        this.long = location.lng 
      }


      console.log(this.lat + " --- "  + this.long)
  });

  modal.present();   

}


}
