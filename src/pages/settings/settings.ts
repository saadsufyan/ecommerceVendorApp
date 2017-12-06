import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  public password

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController, public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);
  }

  goBack(){
    this.navCtrl.pop()
  }

  presentPrompt() {

  let alert = this.alertCtrl.create({
    title: 'Update Password',
    inputs: [
      {
        name: 'Password',
        placeholder: 'Type Here',
        type: 'password',

      }
    ],
    buttons: [
      {
        text: 'Save',
        role: 'cancel',
        handler: data => {

          console.log('Save clicked');

          this.password = data
          console.log(this.password)

        }
      }
    ]
  });
  alert.present();
}
}