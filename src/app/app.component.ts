import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { StoreinformationPage } from '../pages/storeinformation/storeinformation';
import { ProductsPage } from '../pages/products/products';
import { PromotionsPage } from '../pages/promotions/promotions';
import { OrdersPage } from '../pages/orders/orders';
import { MessagesPage } from '../pages/messages/messages';
import { SettingsPage } from '../pages/settings/settings';
import { TopproductsPage } from '../pages/topproducts/topproducts';
import { MypaymentsPage } from '../pages/mypayments/mypayments';
import { FirstPage } from '../pages/first/first';
import { LanguagePage } from '../pages/language/language';

import { Keyboard } from '@ionic-native/keyboard';
import { TranslateService } from 'ng2-translate';
import { UtilProvider } from '../providers/util/util';
import { TranslateproviderProvider } from '../providers/translateprovider/translateprovider';
import { TermsPage } from '../pages/terms/terms';
import { Push, PushObject, PushOptions } from '@ionic-native/push';


@Component({
  templateUrl: 'app.html',
  providers: [Keyboard, Push]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  ActivePage: any


  pages: Array<{ title: string, component: any, img: string }>;

  public isLoggedIn = localStorage.getItem('isLoggedIn')

  public menuOpen = "left"
  public isRtl: any
  public exit : any
  public exittext : any
  public canceltext : any
  public networktext : any
  public networkmsg : any
  public networkok : any
  public alert  : any

  constructor(public translate: TranslateService, public util: UtilProvider, public push: Push, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public keyboard: Keyboard, public alertCtrl :AlertController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'menu_home_page', component: HomePage, img: 'assets/imgs/home_icon@2x-2.png' },
      { title: 'menu_store_page', component: StoreinformationPage, img: 'assets/imgs/icon_1.png' },
      { title: 'menu_product_page', component: ProductsPage, img: 'assets/imgs/icon_4.png' },
      { title: 'menu_promotion_page', component: PromotionsPage, img: 'assets/imgs/icon_6.png' },
      { title: 'menu_order_page', component: OrdersPage, img: 'assets/imgs/icon_3.png' },
      { title: 'menu_top_products_page', component: TopproductsPage, img: 'assets/imgs/icon_9.png' },
      { title: 'menu_my_payment_page', component: MypaymentsPage, img: 'assets/imgs/payment_icon@2x-2.png' },
      { title: 'menu_messages_page', component: MessagesPage, img: 'assets/imgs/icon_2.png' },
      { title: 'menu_settings_page', component: SettingsPage, img: 'assets/imgs/icon_5.png' }
    ];

    this.ActivePage = this.pages[0];


  }

  initializeApp() {

    this.platform.ready().then(() => {
      // this.translate.use('ar')

      let lang = localStorage.getItem('lang')
      if (lang == "ar") {
        this.translate.use('ar')
        this.platform.setDir('rtl', true)

        this.exit = "ىخرج"
        this.exittext = "هل أنت متأكد أنك تريد الخروج ؟"
        this.canceltext = "إلغاء"

      } else {
        this.translate.use('en')
        this.platform.setDir('ltr', true)
        localStorage.setItem('lang', 'en')

        this.exit = "Exit"
        this.exittext = "Are you sure you want to exit"
        this.canceltext = "Cancel"
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.keyboard.hideKeyboardAccessoryBar(false)
      this.keyboard.disableScroll(false);
      if (this.isLoggedIn == "true") {
        this.rootPage = HomePage;
      } else {
        console.log("Language page")
        this.rootPage = FirstPage
        localStorage.setItem('isLoggedIn', "false")
      }

      this.platform.registerBackButtonAction(() => { 
        // this.nav.canGoBack() ? this.nav.pop({animation : 'right'}) : this.showAlert()
        if(this.nav.canGoBack()){
          this.nav.pop({animation : 'right'})
        }else{
          this.showAlert()
        }
      })

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initPushNotification()
    });
  }

  public getTranslation(keyword) {
    console.log(keyword)
    return this.translate.get(keyword)
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  checkActive(page) {
    return page == this.ActivePage;
  }

  showAlert(){
    // this.getExitAppStrings()
    this.alert =true;
    this.alert = this.alertCtrl.create({
        title: this.exit,
        message: this.exittext,
        buttons: [
          {
            text: this.canceltext,
            role: 'cancel',
            handler: () => {
              this.alert =false
              console.log('Cancel pressed')
            }
          },
          {
            text: this.exit,
            handler: () => {
              this.alert = false
              this.platform.exitApp()
              console.log('Exit pressed')
            }
          }
        ]
      });
      this.alert.present();
  }


  initPushNotification() {
    console.log("push func called")
    if (!this.platform.is('cordova')) {
      console.log('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }
    const options: PushOptions = {
      android: {
        senderID: '594975278733',
        sound: 'true',
        icon: "icon1",
        iconColor: "#E55F66"
      },
      ios: {
        alert: 'true',
        badge: false,
        sound: 'true'
      },
      windows: {}
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
      console.log('device token -> ' + data.registrationId);
      //TODO - send device token to server
      // alert('device token' +data.registrationId)
      localStorage.setItem('gcmtoken', data.registrationId)
    });

    pushObject.on('notification').subscribe((data: any) => {
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin' + error));
  }

}
