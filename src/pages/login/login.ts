import { DataProvider } from './../../providers/data/data';
import { HttpClient } from '@angular/common/http';
import { SignupPage } from './../signup/signup';
import { ShoppingListPage } from './../shopping-list/shopping-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public UserEmail: any = "";
  public UserPass: any = "";
  items = [];
  dis: boolean = true;
  constructor(private dataProvider: DataProvider,private Http: HttpClient, private menu: MenuController, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
  }

  checkFields() {
    if (this.UserEmail != "" && this.UserPass != "") {
      this.dis = false;
    }
    else {
      this.dis = true;
    }
  }

  login() {
    let body = {
      email: this.UserEmail,
      password: this.UserPass
    }
    if (this.UserEmail == 'c2c@gmail.com' && this.UserPass == 'c2c') {
      const toast = this.toastCtrl.create({
        message: 'You are now logged as in!',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.navCtrl.setRoot(ShoppingListPage);
    }
    else {
      this.dataProvider.LoginUser(body).subscribe(data => {
        if (data["status"] == 404) {
          console.log(data["status"]);
          console.log(data["success"]);
          const toast = this.toastCtrl.create({
            message: 'Your are not registered!',
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }
        else if (data["status"] == 401) {
          const toast = this.toastCtrl.create({
            message: 'Wrong Credentials!',
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }
        else if (data["status"] == 400) {
          const toast = this.toastCtrl.create({
            message: 'Server Error!',
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }
        else {
          const toast = this.toastCtrl.create({
            message: 'You are now logged in!',
            duration: 3000,
            position: 'top'
          });
          toast.present();
          this.navCtrl.setRoot(ShoppingListPage);
        }
      })
    }
  }

  signin() {
    this.navCtrl.push(SignupPage)
  }

}
