import { Injectable , Component} from "@angular/core";
import { AlertController  , LoadingController , ToastController , NavController} from 'ionic-angular'



@Injectable()
export class AlertView {

    public enTitle : string
    public enMessage : string
    public enButtons : any
    public loading : any 
    public toastMessage : string
    public toastDuration : number 
    public toastPosition : string
    public toastShowCloseButton : boolean
    public toastCloseButtonText : string

    constructor(public alertCtrl : AlertController , public loadingCtrl : LoadingController , public toastCtrl : ToastController, public navCtrl : NavController){

    }

    showEnglishAlert(title : string , message : string , buttonsText : String[])  {
        this.enTitle = title
        this.enMessage = message
        this.enButtons = buttonsText
        let enAlert = this.alertCtrl.create({
            title : this.enTitle,
            subTitle : this.enMessage,
            buttons : this.enButtons
        })
        enAlert.present()
    }

    showLoader(){
         this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
        })
        this.loading.present()
    }
    
    hideLoader(){
        this.loading.dismiss()
    }

    showToast(message : string , duration : number , position : string , showclosebutton : boolean, text : string){
        this.toastMessage = message
        this.toastDuration = duration
        this.toastPosition = position
        this.toastShowCloseButton = showclosebutton
        this.toastCloseButtonText = text
        const toast = this.toastCtrl.create({
            message : this.toastMessage,
            duration : this.toastDuration,
            position : this.toastPosition,
            showCloseButton : this.toastShowCloseButton,
            closeButtonText : this.toastCloseButtonText
        })
        toast.present()
    }


}