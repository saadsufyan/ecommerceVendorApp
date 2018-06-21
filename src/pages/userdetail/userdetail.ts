import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { MessagesService } from '../../services/messages';
import { NetworkService } from '../../services/network';
import { AlertView } from '../../uicomponents/alert';
import { UtilProvider } from '../../providers/util/util';
import { TranslateService } from 'ng2-translate';
/**
 * Generated class for the UserdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userdetail',
  templateUrl: 'userdetail.html',
  providers: [MessagesService, NetworkService, AlertView]
})
export class UserdetailPage {

  public errorMessage: any = ""
  public contactDetails : any = {}
  public userid: any
  public checklang : boolean = false
  constructor(public translate : TranslateService,public util: UtilProvider,public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public messageservice: MessagesService, public popup : AlertView) {
  
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserdetailPage');
    this.userid = this.navParams.get('id')
    console.log(this.userid)
    this.getContactDetails()
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
  getContactDetails(){
    this.popup.showLoader()
    this.messageservice.onGetContactDetails(this.userid).subscribe(res=>{
      console.log(res)
      this.popup.hideLoader()
      res.status ? this.contactDetails = res.response : console.log("data not found")

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
}
