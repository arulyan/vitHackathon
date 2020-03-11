import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formgroup: FormGroup;
  cname: AbstractControl;
  mail: AbstractControl;
  pass: AbstractControl;

  //Variable being used--
  public name1: any;
  public pass1: any;
  public email1: any;

  constructor(public navCtrl: NavController, public formbuilder: FormBuilder, public navParams: NavParams, private http: HttpClient, ) {

    this.formgroup = this.formbuilder.group({
      cname: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      mail: ['', Validators.compose([Validators.required, Validators.pattern('^[A-Z0-9a-z\\._%+-]+@([A-Za-z0-9-]+\\.)+[A-Za-z]{2,4}$')])],
      pass: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern('[a-zA-Z0-9]*')])],
    })

    this.cname = this.formgroup.controls['cname'];
    this.mail = this.formgroup.controls['mail'];
    this.pass = this.formgroup.controls['pass'];

  }

  back() {
    this.navCtrl.pop();
  }

  insertdata() {
    let body = {
      password: this.pass1,
      email: this.email1,
      name: this.name1,
    }
    this.http.post('http://localhost:4999/signUp', body).subscribe(response => {
      console.log('POST Response:', response);

    });
    this.navCtrl.pop();
    alert('Registration Confirmed');

  }

}
