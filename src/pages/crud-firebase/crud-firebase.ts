import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CrudFirebasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-crud-firebase',
  templateUrl: 'crud-firebase.html',
})
export class CrudFirebasePage {

  titlePage: string;


  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.titlePage = "Firebase";
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrudFirebasePage');
    
  }

}
