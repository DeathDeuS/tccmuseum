import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult} from '@ionic-native/barcode-scanner';




@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html',
})
export class ScannerPage {

  result: BarcodeScanResult;
  constructor(public navCtrl: NavController, public navParams: NavParams, private bcs: BarcodeScanner, private toastCtrl: ToastController) {
    
  }
  ionViewWillEnter() {
    console.log("I'm alive!");
    this.scanBarcode();
    
  }
  clearHistory(){};

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