import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/AuthService';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginResp } from './LoginResp';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username!: string;
  password!: string;
  secteur! : string ;
  errorMessage = 'Invalid Credentials';
  successMessage: string | undefined;
  invalidLogin = false;
  loginSuccess = false;
  apiServerUrl : string = "http://localhost:3001";
  loginResp     : LoginResp|undefined;
  constructor(private router:Router, private http: HttpClient){
    
  }

  ngOnInit(): void {
  }

  public handleLogin(form : NgForm):void{
    
    this.http.post<LoginResp>(this.apiServerUrl+'/user/login',{"e_mail":form.value['username'],"password":form.value['password']}).subscribe(
      (response) => {
        this.loginResp = response;
        sessionStorage.setItem("secteur",this.loginResp!.secteur.charAt(3));
        sessionStorage.setItem("token",this.loginResp!.token);
        window.location.href = 'http://localhost:4200/';
      },
      (error) => {
        console.log(error.message)
      }
    );
    console.log("login clicked: "+form.value['secteur']);
    
  }
}
