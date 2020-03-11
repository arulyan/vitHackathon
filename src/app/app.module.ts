import { SuspectImagePage } from './../pages/suspect-image/suspect-image';
import { SignupPage } from './../pages/signup/signup';
import { LoginPage } from './../pages/login/login';
import { AddShoppingPage } from './../pages/add-shopping/add-shopping';
import { ShoppingListPage } from './../pages/shopping-list/shopping-list';
import { FIREBASE_CREDENTIALS } from './firebase.credentials';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { MyApp } from './app.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HttpClientModule } from '@angular/common/http';
import { DataProvider } from '../providers/data/data';
@NgModule({
  declarations: [
    MyApp,
    SignupPage,
    ShoppingListPage,
    AddShoppingPage,
    LoginPage,
    SuspectImagePage
  ],
  imports: [
    HttpClientModule,
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ShoppingListPage,
    AddShoppingPage,
    LoginPage,
    SignupPage,
    SuspectImagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule {}
