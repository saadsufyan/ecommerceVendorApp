import { Component, ViewChild } from '@angular/core';
import { Nav, Platform} from 'ionic-angular';
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
@Component({
  templateUrl: 'app.html',
  providers: [Keyboard]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  ActivePage: any
  

  pages: Array<{title: string, component: any, img:string}>;

  public isLoggedIn = localStorage.getItem('isLoggedIn') 

  public menuOpen = "left"
  public isRtl : any

  constructor(public translate : TranslateService, public util: UtilProvider, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public keyboard : Keyboard) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'menu_home_page', component: HomePage , img: 'assets/imgs/home_icon@2x-2.png' },
      { title: 'menu_store_page', component: StoreinformationPage, img: 'assets/imgs/icon_1.png' },
      { title: 'menu_product_page', component: ProductsPage, img: 'assets/imgs/icon_4.png' },
      { title: 'menu_promotion_page', component: PromotionsPage, img: 'assets/imgs/icon_6.png' },
      { title: 'menu_order_page', component: OrdersPage, img: 'assets/imgs/icon_3.png'  },
      { title: 'menu_top_products_page', component: TopproductsPage, img: 'assets/imgs/icon_9.png'},
      { title: 'menu_my_payment_page', component: MypaymentsPage, img: 'assets/imgs/payment_icon@2x-2.png'},
      { title: 'menu_messages_page', component: MessagesPage, img: 'assets/imgs/icon_2.png' },
      { title: 'menu_settings_page', component: SettingsPage, img: 'assets/imgs/icon_5.png' }
    ];

    this.ActivePage = this.pages[0];

    
  }

  initializeApp() {
    
    this.platform.ready().then(() => {
      // this.translate.use('ar')
      
      let lang  = localStorage.getItem('lang')
      if(lang == "ar"){
        this.translate.use('ar')
        this.platform.setDir('rtl',true)
      }else{
        this.translate.use('en')
        this.platform.setDir('ltr',true)
        localStorage.setItem('lang','en')
        }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
        this.keyboard.hideKeyboardAccessoryBar(false)
        this.keyboard.disableScroll(false);
      if(this.isLoggedIn == "true"){
            this.rootPage = HomePage;
        }else{
          console.log("Language page")
          this.rootPage = FirstPage
          localStorage.setItem('isLoggedIn', "false")
        }


      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  public getTranslation(keyword){
    console.log(keyword)
    return this.translate.get(keyword)
  }
  
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  checkActive(page){
    return page == this.ActivePage ;
  }  
}
