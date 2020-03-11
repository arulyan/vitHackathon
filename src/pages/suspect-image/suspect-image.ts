import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
/**
 * Generated class for the SuspectImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-suspect-image',
  templateUrl: 'suspect-image.html',
})
export class SuspectImagePage {

  imgSrc;
  empPic;
  constructor(private database: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {
    this.imgSrc = this.navParams.get('imgNo');
    this.getPhotoUrl();
  }

  getPhotoUrl() {
    firebase.storage().ref().child('imgs/'+this.imgSrc+'.jpg').getDownloadURL()
    .then((url)=>{
      this.empPic = url;
    })
  }

}
