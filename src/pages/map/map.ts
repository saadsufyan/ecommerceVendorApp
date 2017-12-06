import { Component,  ViewChild, ElementRef  } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google; 

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  loc : any
  currentLocation : any
  public lat : number
  public long : number

  public currentLat : number
  public currentLng : number
  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public viewCtrl : ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.loadMap();
  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);
  }  
  goBack(){
    this.navCtrl.pop()
  }
 loadMap(){
 
    this.geolocation.getCurrentPosition().then((position) => {


      this.loc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: this.loc,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
      }
      console.log("load map "  + this.loc)
 
      
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      var marker = new google.maps.Marker({
                    map: this.map,
                    animation: google.maps.Animation.DROP,
                    position: this.loc

                });

                var infoWindow = new google.maps.InfoWindow({
                    content: name
                });
                    google.maps.event.addListener(marker, 'click', function () {
                    infoWindow.open(this.map, marker);
                });
 
    }, (err) => {
      console.log(err);
    });
 
  }

  
}
