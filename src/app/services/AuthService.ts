import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private apiServerUrl = 'http://localhost:3001';
    public username: string | undefined;
    public password: string | undefined;

  constructor(private http: HttpClient) {

  }

  login(username: string, password: string) {
    return this.http.get(this.apiServerUrl+`/api/v1/login`,
      { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
        this.username = username;
        this.password = password;
        this.registerSuccessfulLogin(username, password);
      }));
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ":" + password);
  }

  registerSuccessfulLogin(username:string, password:string) {
    // save the username to session
  }
}