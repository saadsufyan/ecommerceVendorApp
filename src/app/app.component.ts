import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  ActivePage: any

  pages: Array<{title: string, component: any, img:string}>;

  public isLoggedIn = localStorage.getItem('isLoggedIn') 

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage , img: 'assets/imgs/home_icon@2x-2.png' },
      { title: 'Store Information', component: StoreinformationPage, img: 'assets/imgs/icon_1.png' },
      { title: 'Products', component: ProductsPage, img: 'assets/imgs/icon_4.png' },
      { title: 'Promotions', component: PromotionsPage, img: 'assets/imgs/icon_6.png' },
      { title: 'Orders', component: OrdersPage, img: 'assets/imgs/icon_3.png'  },
      { title: 'Top Products', component: TopproductsPage, img: 'assets/imgs/icon_9.png'},
      { title: 'My Payments', component: MypaymentsPage, img: 'assets/imgs/payment_icon@2x-2.png'},
      { title: 'Messages', component: MessagesPage, img: 'assets/imgs/icon_2.png' },
      { title: 'Settings', component: SettingsPage, img: 'assets/imgs/icon_5.png' }
    ];

    this.ActivePage = this.pages[0];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

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

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  checkActive(page){
    return page == this.ActivePage ;
  }  
}
