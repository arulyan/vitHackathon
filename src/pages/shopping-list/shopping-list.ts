import { SuspectImagePage } from './../suspect-image/suspect-image';
import { LoginPage } from './../login/login';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { AddShoppingPage } from './../add-shopping/add-shopping';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import * as firebase from 'firebase';
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  // itemsRef: FirebaseListObservable<any>;
  // emp: Observable<any[]>;
  imgSrc;
  empPic;
  constructor(private database: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {
    this.shoppingListRef$ = this.database.list('shopping-list');
    this.shoppingListRef$.subscribe(x => console.log(x));
    // this.imgSrc = 'Tokachi';
    // this.getPhotoUrl();
  }

  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>


  getPhotoUrl() {
    firebase.storage().ref().child('imgs/'+this.imgSrc+'.jpg').getDownloadURL()
    .then((url)=>{
      this.empPic = url;
    })
  }

  showUnkown(item) {
    this.navCtrl.push(SuspectImagePage,{imgNo:item});
  }

  // navigateToAddShoppingPage() {
  //   this.navCtrl.push(AddShoppingPage);
  // }

  Logout() {
    alert("You have Logged Out!")
    this.navCtrl.setRoot(LoginPage);
  }

}
