import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from '../form.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _HttpClient:HttpClient, private _Router:Router, private _FormService:FormService) { }

  LoginForm:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{4,12}$/)])
  })

  erro:string = ''; 
  SendLoginData( formData:FormGroup ){
    if( formData.valid ){
      this._FormService.SignIn(formData.value).subscribe( response => {

        if(response.message == "success"){
          localStorage.setItem('UserToken', response.token);
          this._FormService.DecodeUserData();
          this._Router.navigate(['home']);
        }
        else{
          this.erro = response.message;
        }
      })
    }
  }

  Register(){
    this._Router.navigate(['register'])
  }

  ngOnInit(): void {
  }

}
