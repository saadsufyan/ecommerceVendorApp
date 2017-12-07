import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { MapPage } from '../map/map';

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
})
export class StoreinformationPage {


  public countryname: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController, public alertCtrl: AlertController) {
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


  getCities(){

  }

presentPrompt() {
  console.log(this.countryname)
  let alert = this.alertCtrl.create({
    title: 'Select City',
    inputs: [
      {
         name: 'All',
         type:'checkbox',
         checked:false,
         label:'All',
         value:"true"
      },
      {
         name: 'riyadh',
         type:'checkbox',
         checked:false,
         label:'Al Riyadh',
         value:"true"
      },
      {
         name: 'majmaah',
         type:'checkbox',
         checked:false,
         label:'Al Majmaah',
         value:"true"
      },      {
         name: 'quwaiiyah',
         type:'checkbox',
         checked:false,
         label:'Al Quwaiiyah',
         value:"true"
      },
      {
         name: 'afif',
         type:'checkbox',
         checked:false,
         label:'Al Afif',
         value:"true"
      },          
      {
         name: 'tamim',
         type:'checkbox',
         checked:false,
         label:'Howtat bani tamim',
         value:"true"
      },
      {
         name: 'hayathem',
         type:'checkbox',
         checked:false,
         label:'Al hayathem',
         value:"true"
      },      {
         name: 'badayea',
         type:'checkbox',
         checked:false,
         label:'Al Badayea',
         value:"true"
      }, 
      {
         name: 'dammam',
         type:'checkbox',
         checked:false,
         label:'Dammam',
         value:"true"
      },
      {
         name: 'khobar',
         type:'checkbox',
         checked:false,
         label:'Al khobar',
         value:"true"
      },      {
         name: 'tannurah',
         type:'checkbox',
         checked:false,
         label:'Ras tannurah',
         value:"true"
      },
      {
         name: 'sayhat',
         type:'checkbox',
         checked:false,
         label:'Sayhat',
         value:"true"
      },      {
         name: 'jubail',
         type:'checkbox',
         checked:false,
         label:'Al Jubail',
         value:"true"
      },
      {
         name: 'buqayq',
         type:'checkbox',
         checked:false,
         label:'Buqayq',
         value:"true"
      },      
      {
         name: 'batin',
         type:'checkbox',
         checked:false,
         label:'Hafir Al Batin',
         value:"true"
      },
      {
         name: 'mecca',
         type:'checkbox',
         checked:false,
         label:'Mecca',
         value:"true"
      },    
      {
         name: 'rabigh',
         type:'checkbox',
         checked:false,
         label:'rabigh',
         value:"true"
      },
      {
         name: 'khulais',
         type:'checkbox',
         checked:false,
         label:'Khulais',
         value:"true"
      },    
      {
         name: 'mushayt',
         type:'checkbox',
         checked:false,
         label:'Khamis mushayt',
         value:"true"
      }
    ],
    buttons: [
      {
        text: 'Confirm',
        role: 'accept',
        handler: data => {
          console.log('Confirm clicked');
        }
      }
    ]
  });
  alert.present();
}  

}
