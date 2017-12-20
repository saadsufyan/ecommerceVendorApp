import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserdetailPage } from '../userdetail/userdetail';
import { ChatPage } from '../chat/chat';
import { MessagesService } from '../../services/messages';
import { NetworkService } from '../../services/network';
import { AlertView } from '../../uicomponents/alert';

/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
  providers: [MessagesService, NetworkService, AlertView]

})
export class MessagesPage {


  public errorMessage : any = "";
  public customerMessages: string = "customerMessages"
  public messageslist: any = [
    {
      user_id: 1,
      user_name: "Kamal",
      user_image: "<image_url>"
    },
    {
      user_id: 2,
      user_name: "Abd al Alim",
      user_image: "<image_url>"
    },
    {
      user_id: 3,
      user_name: "Asad",
      user_image: "<image_url>"
    }
  ]

  public contacts = [
    {
      id: 1,
      user_name: "user1",
      user_email: "user1@hotmail.com"
    },
    {
      id: 2,
      user_name: "user2",
      user_email: "user2@hotmail.com"
    },
    {
      id: 3,
      user_name: "user3",
      user_email: "user3@hotmail.com"
    },
    {
      id: 4,
      user_name: "use43",
      user_email: "user4@hotmail.com"
    }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public messageservice: MessagesService, public popup : AlertView) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);
  }
  goBack(){
    this.navCtrl.pop()
  }  


  goToUserDetail(){
    this.navCtrl.push(UserdetailPage, {animation: 'left'})
  }

  goToChat(){
    this.navCtrl.push(ChatPage, {animation: 'left'})
  }

  getMessages(){

    this.messageservice.onGetAllMessages().subscribe(res=>{
      console.log(res)
      // res.status && res.response > 0 ? this.messageslist = res.response:console.log("no messages found")
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
