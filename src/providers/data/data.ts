import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {


  urlLogIn:string = "http://localhost:4999/login";
  public email:string; //LoggedIn Email

  constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');
  }

  LoginUser(body){
    this.email = body.email;
    console.log(this.email);
    return this.http.post(this.urlLogIn,body);
  }

}
