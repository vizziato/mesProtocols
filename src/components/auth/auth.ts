import { Component } from '@angular/core';
//AngulkarFire 2 -- Firebase - Injectiion Srvice
import { AuthProvider } from '../../providers/auth/auth';

import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
/**
 * Generated class for the AuthComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'auth',
  templateUrl: 'auth.html'
})
export class AuthComponent {

  text: string;

  email: string;
  password: string;

  orderForm: FormGroup;

  credentialsForm: FormGroup;

  constructor(public authService: AuthProvider,private formBuilder:FormBuilder ) {
    console.log('Hello AuthComponent Component');
    this.text = 'Hello World';

    this.credentialsForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';    
  }

  logout() {
    this.authService.logout();
  }

}
