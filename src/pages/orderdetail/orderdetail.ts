import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController} from 'ionic-angular';

/**
 * Generated class for the OrderdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orderdetail',
  templateUrl: 'orderdetail.html',
})
export class OrderdetailPage {

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderdetailPage');
  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);
  }
  goBack(){
    this.navCtrl.pop()
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Order',
      message: '<div class="modal-body" style="padding: 20px 40px;"><table class="table table-details ltr"><tr> <td>Name:</td><td>Red Dress</td><tr><td>Arabic Name:</td>	<td>Red Dress</td>	</tr>	<tr><td>Price:</td>	<td>200 SAR</td></tr>	<tr><td>Quantity:</td>	<td>01</td>	</tr>					<tr>	<td>Promotions:</td><td>Dresses</td>	</tr><tr><td>Specifications:</td><td>20-11-2017</td></tr><tr><td>Deliver On:</td><td>04-05-2017</td></tr> </tr> </table> </div>',
      buttons: ['Close']
    });
    alert.present();
  }  
}
