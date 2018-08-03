import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
////Pages
import { HomePage } from '../pages/home/home';
import {AuthPage} from '../pages/auth/auth'
import { ListPage } from '../pages/list/list';
import {CrudFirebasePage} from '../pages/crud-firebase/crud-firebase'
//////////////////////////////////////////////

//Native Components
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
////////////////////////////////////////////////

import {AuthComponent } from '../components/auth/auth'
import {CrudFirebaseComponent} from '../components/crud-firebase/crud-firebase'

//AngularFire2 -- Start
// ...

import { AngularFireModule } from 'angularfire2';
import { environment } from './environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
//import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../providers/auth/auth';

//AngularFire 2 - end

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AuthPage,
    ListPage,
    AuthComponent,
    CrudFirebaseComponent,
    CrudFirebasePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    //AngularFireDatabase
    //AngularFireDatabaseModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AuthPage,
    AuthComponent,
    CrudFirebaseComponent,
    CrudFirebasePage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,AngularFireDatabase

  ]
})
export class AppModule {}
