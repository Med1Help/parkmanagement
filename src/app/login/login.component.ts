import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/AuthService';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private router:Router){
    
  }

  ngOnInit(): void {
  }

  public handleLogin(form : NgForm):void{
    sessionStorage.setItem("secteur",form.value['secteur']);
    sessionStorage.setItem("username",form.value['username']);
    console.log("login clicked: "+form.value['secteur']);
    window.location.href = 'http://localhost:4200/';
  }
}
