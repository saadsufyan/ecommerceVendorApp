import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { UserdetailPage } from '../userdetail/userdetail';
import { ChatPage } from '../chat/chat';
import { MessagesService } from '../../services/messages';
import { NetworkService } from '../../services/network';
import { AlertView } from '../../uicomponents/alert';
import { UtilProvider } from '../../providers/util/util';
import { TranslateService } from 'ng2-translate';
import { LoginPage } from '../login/login';
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
  public loginError
  public contacts = []
  public checklang : boolean = false
  // public errormsg : any = true

  constructor(public alertCtrl: AlertController,public translate : TranslateService,public util: UtilProvider,public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public messageservice: MessagesService, public popup : AlertView) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
    this.getMessages()
    this.getContacts()
  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);
    let lang  = localStorage.getItem('lang')
    if(lang == "ar"){
      this.checklang = true
      this.loginError = "لقد تم تسجيل الخروج"   
    }else{
      this.checklang = false
      this.loginError = "You have been logged out"
      }    
  }
  goBack(){
    this.navCtrl.pop()
  }  


  goToUserDetail(id){
    console.log(id)
    this.navCtrl.push(UserdetailPage, {id:id,animation: 'left'})
  }

  goToChat(id,name){
    this.navCtrl.push(ChatPage,{id:id,name:name}, {animation: 'left'})
    console.log(id)
  }

  getMessages(){
    this.popup.showLoader()

    this.messageservice.onGetAllMessages().subscribe(res=>{
      console.log(res)
      this.popup.hideLoader()
      res.status && res.response.length > 0 ? this.messageslist = res.response:console.log("no messages found")
      
      // if(res.status && res.response.length > 0 ){
      //   this.errormsg = false
      //   console.log(this.errormsg)
      // }   

    },err => {
      console.log("masla ha ")
      console.log(err);
      this.popup.hideLoader()
      this.errorMessage = JSON.parse(err._body)
      console.log(this.errorMessage)
      this.errorMessage = this.errorMessage.error.message[0]
      // this.popup.showToast(this.errorMessage , 2000 , 'bottom' ,false , "")
      if(this.errorMessage == "Unauthorized Request"){
        let alert = this.alertCtrl.create({
          title: 'Login Error',
          message: this.loginError,
          buttons: ['Dismiss']
        });
        alert.present();           
        this.navCtrl.push(LoginPage)
      } else{
        this.popup.showToast(this.errorMessage , 2000 , 'bottom' ,false , "")
      }
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
