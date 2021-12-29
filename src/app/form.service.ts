import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private _HttpClient:HttpClient) {
    if( localStorage.getItem('UserToken') != null ){
      this.DecodeUserData();
    }
  }

  UserData = new BehaviorSubject(null);
  // GET USER DATA ...............
  DecodeUserData(){
    let decodeData = JSON.stringify(localStorage.getItem('UserToken'));
    this.UserData.next( jwtDecode( decodeData ) );
  }

  // SIGN-UP .....................
  SignUp(formData:object): Observable<any>{
    return this._HttpClient.post(`https://route-egypt-api.herokuapp.com/signup`, formData);
  }

  // SIGN-IN .....................
  SignIn(formData:object): Observable<any>{
    return this._HttpClient.post(`https://route-egypt-api.herokuapp.com/signin`, formData);
  }

  // LOG-OUT ....................
  DeleteUserData(){
    localStorage.removeItem('UserToken');
    this.UserData.next(null);
  }
}

