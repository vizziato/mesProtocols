import { Component,Input,ViewChild } from '@angular/core';
import { NavController} from 'ionic-angular';
import {HomePage}from '../../pages/home/home';

import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {
  
  @Input() titlePage : string ;
  private currentUser: firebase.User;

  
  
  

  constructor(public authService: AuthProvider,public navCtrl: NavController) {
    try {
      authService.user.subscribe((user: firebase.User) =>{
        this.currentUser = user;});
        console.log('current user header',this.currentUser)
     } catch (error) {
       console.error('no user is logged');
       this.currentUser = null;
     }
  }

  openPage() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(HomePage);
  }



}

