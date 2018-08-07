import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import {AuthComponent} from '../../components/auth/auth'

/**
 * Generated class for the AuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {

  titlePage: string;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.titlePage = "Autentification";
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
  }

}
