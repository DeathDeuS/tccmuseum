import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ScannerPage } from '../pages/scanner/scanner';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SQLitePage } from '../pages/sqlite/sqlite';
import { StartPage } from '../pages/start/start';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SQLite } from '@ionic-native/sqlite';
import { NativePageTransitions} from '@ionic-native/native-page-transitions';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ScannerPage,
    HomePage,
    TabsPage,
    SQLitePage,
    StartPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ScannerPage,
    HomePage,
    TabsPage,
    SQLitePage,
    StartPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner, 
    SQLite, 
    NativePageTransitions, 
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
