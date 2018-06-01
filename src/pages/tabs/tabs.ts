import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ScannerPage } from '../scanner/scanner';
import { HomePage } from '../home/home';

import { BarcodeScanner, BarcodeScanResult, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@Component({
  templateUrl: 'tabs.html'
})



export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ScannerPage;
  tab3Root = AboutPage;

  // result: BarcodeScanResult;
  // constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, private toastCtrl: ToastController) {
    // this.scanBarcode();
  // }
  result: BarcodeScanResult;
  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, private toastCtrl: ToastController) {
    
  }

  
  scanBarcode(){
    
    const options: BarcodeScannerOptions = {
      prompt: 'Veuillez scanner l\'oeuvre',
      torchOn: false
    };
    
    this.barcodeScanner.scan(options)
    .then(res => {
      this.result = res;
    })
    
    .catch(err => {
      this.toastCtrl.create({
        message: err.message
      }).present();
    })
  }

}
