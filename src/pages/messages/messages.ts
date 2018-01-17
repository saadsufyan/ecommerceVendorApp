import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserdetailPage } from '../userdetail/userdetail';
import { ChatPage } from '../chat/chat';
import { MessagesService } from '../../services/messages';
import { NetworkService } from '../../services/network';
import { AlertView } from '../../uicomponents/alert';
import { UtilProvider } from '../../providers/util/util';
import { TranslateService } from 'ng2-translate';
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
  public messageslist: any = []

  public contacts = []
  // public errormsg : any = true

  constructor(public translate : TranslateService,public util: UtilProvider,public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public messageservice: MessagesService, public popup : AlertView) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
    this.getMessages()
    this.getContacts()
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

  goToChat(id){
    this.navCtrl.push(ChatPage,{id:id}, {animation: 'left'})
    console.log(id)
  }

  getMessages(){
    this.popup.showLoader()

    this.messageservice.onGetAllMessages().subscribe(res=>{
      console.log(res)
      res.status && res.response.length > 0 ? this.messageslist = res.response:console.log("no messages found")
      
      // if(res.status && res.response.length > 0 ){
      //   this.errormsg = false
      //   console.log(this.errormsg)
      // }   

      this.popup.hideLoader()
    },err => {
      console.log("masla ha ")
      console.log(err);
      this.popup.hideLoader()
      this.errorMessage = JSON.parse(err._body)
      console.log(this.errorMessage)
      this.errorMessage = this.errorMessage.error.message[0]
      this.popup.showToast(this.errorMessage , 2000 , 'bottom' ,false , "")
    })
  }

  getContacts(){

    this.messageservice.onGetContacts().subscribe(res=>{
      console.log(res)
      res.status && res.response.length > 0 ? this.contacts = res.response:console.log("no messages found")

      // if(res.status && res.response.length > 0 ){
      //   this.errormsg = false
      //   console.log(this.errormsg)
      // }

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
