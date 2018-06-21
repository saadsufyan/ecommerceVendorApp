import { Component, transition } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { MessagesService } from '../../services/messages';
import { NetworkService } from '../../services/network';
import { AlertView } from '../../uicomponents/alert';
import { UtilProvider } from '../../providers/util/util';
import { TranslateService } from 'ng2-translate';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
  providers: [MessagesService, NetworkService, AlertView]
})
export class ChatPage {

  public userid: any
  public errorMessage : any
  public receviemsgs: any = []
  public sendmsgs : any = {}
  public data :any = {}
  public send :string = ""
  public temp
  public sendArray = []
  public showImage : boolean = true
  public checklang: boolean = false
  public name

  constructor(public translate : TranslateService,public util: UtilProvider,public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public messageservice: MessagesService, public popup : AlertView) {
  

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.userid = this.navParams.get('id')
    console.log(this.userid)
    this.name = this.navParams.get('name')
    this.RecieveMessages()

  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);
    let lang  = localStorage.getItem('lang')
    if(lang == "ar"){
      this.checklang = true
    }else{
      this.checklang = false
      }
  }
  goBack(){
    this.navCtrl.pop()
  }  

  RecieveMessages(){
    this.popup.showLoader()
    this.messageservice.onGetChatMessage(this.userid).subscribe(res=>{
      console.log(res)
      this.popup.hideLoader()

      res.status && res.response.length > 0 ? this.receviemsgs = res.response : console.log("no messages recevies")

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

  sendMessages(){
    this.data = {
      message: this.send 
    }
    this.showImage = false
    let text = this.send
    this.send = ""
    this.receviemsgs.push({
      message : text,
      sender : "vendor"
    })
    console.log(this.data)
    this.messageservice.onSendChatMessages(this.userid, this.data).subscribe(res=>{
      console.log(res)
      if(res.status){
        this.showImage = true
      }      
    },err => {
      console.log("masla ha ")
      console.log(err);
      // this.popup.hideLoader()
      this.showImage = false
      this.errorMessage = JSON.parse(err._body)
      console.log(this.errorMessage)
      this.errorMessage = this.errorMessage.error.message[0]
      this.popup.showToast(this.errorMessage , 2000 , 'bottom' ,false , "")
    })
  }

}
