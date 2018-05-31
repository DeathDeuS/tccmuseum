import { Component } from '@angular/core';

import { SQLitePage } from '../sqlite/sqlite';
import { ScannerPage } from '../scanner/scanner';
import { HomePage } from '../home/home';


import { NavController, NavParams, ToastController } from 'ionic-angular';
// Native
import { BarcodeScanner, BarcodeScanResult, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@Component({
  templateUrl: 'tabs.html'
})



export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ScannerPage;
  tab3Root = SQLitePage;

  result: BarcodeScanResult;
  constructor(public navCtrl: NavController, public navParams: NavParams, private bcs: BarcodeScanner, private toastCtrl: ToastController) {
    this.scanBarcode();
  }


  
  scanBarcode(){
    
    const options: BarcodeScannerOptions = {
      prompt: 'Veuillez scanner l\'oeuvre',
      torchOn: false
    };
    
    this.bcs.scan(options)
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
