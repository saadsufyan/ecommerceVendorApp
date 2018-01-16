import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LanguagePage } from '../pages/language/language';
import { FirstPage } from '../pages/first/first';
import { LoginPage } from '../pages/login/login';
import { StoreinformationPage } from '../pages/storeinformation/storeinformation';
import { ProductsPage } from '../pages/products/products';
import { PromotionsPage } from '../pages/promotions/promotions';
import { OrdersPage } from '../pages/orders/orders';
import { MessagesPage } from '../pages/messages/messages';
import { SettingsPage } from '../pages/settings/settings';
import { AddpromotionPage } from '../pages/addpromotion/addpromotion';
import { OrderdetailPage } from '../pages/orderdetail/orderdetail';
import { UserdetailPage } from '../pages/userdetail/userdetail';
import { ChatPage } from '../pages/chat/chat';
import { TopproductsPage } from '../pages/topproducts/topproducts';
import { MypaymentsPage } from '../pages/mypayments/mypayments';
import { Tab1Page } from '../pages/tab1/tab1';
// import { Tab2Page } from '../pages/tab2/tab2';
// import { Tab3Page } from '../pages/tab3/tab3';
import { ProductstabPage } from '../pages/productstab/productstab'
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { Geolocation } from '@ionic-native/geolocation';
import { MapPage } from '../pages/map/map';

import { SharedService } from '../services/sharedService';
import { NetworkService } from '../services/network';
import { AlertView } from '../uicomponents/alert';

import { PhotoViewer } from '@ionic-native/photo-viewer';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http,HttpModule, RequestOptions } from '@angular/http';
import { NativeHttpFallbackD, NativeHttpModuleD } from 'ionic-native-http-connection-backend';

export function createTranslateLoader(http: Http) {  
    return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LanguagePage,
    FirstPage,
    LoginPage,
    StoreinformationPage,
    ProductsPage,
    PromotionsPage,
    OrdersPage,
    OrderdetailPage,
    MessagesPage,
    UserdetailPage,
    SettingsPage,
    AddpromotionPage,
    ProductstabPage,
    ChatPage,
    TopproductsPage,
    MypaymentsPage,
    MapPage
    // PhotoViewer
    // Tab1Page,
    // Tab2Page,
    // Tab3Page


  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    NativeHttpModuleD,
    IonicImageViewerModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LanguagePage,
    FirstPage,
    LoginPage,
    StoreinformationPage,
    ProductsPage,
    PromotionsPage,
    OrdersPage,
    OrderdetailPage,
    MessagesPage,
    UserdetailPage,
    SettingsPage,
    AddpromotionPage,
    ProductstabPage,
    ChatPage,
    TopproductsPage,
    MypaymentsPage,
    MapPage
    // PhotoViewer
    // Tab1Page,
    // Tab2Page,
    // Tab3Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NetworkService,
    SharedService,
    PhotoViewer,
    Geolocation,
    {provide: Http, useClass: Http, deps: [NativeHttpFallbackD, RequestOptions]}
  ]
})
export class AppModule {}
