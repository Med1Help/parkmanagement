import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import {Manager} from './manager'
import {myObject} from './myObject'
@Injectable({
    providedIn : 'root'
})
export class ManagerService{
    private apiServerUrl = 'http://localhost:3001';
    private headers : HttpHeaders;
    private options : {};
    private httpParams: HttpParamsOptions;
    private secteur : string | null;
    constructor(private http: HttpClient){
        if(sessionStorage.getItem("secteur") == null){
            this.secteur = "";
        }else{
            this.secteur = sessionStorage.getItem("secteur");
        }
        console.log("thisis the sec from app component: "+this.secteur );
        this.headers = new HttpHeaders({
            'Content-Type'                  : 'application/json',
            'secteur'                       : this.secteur!,
            'Access-Control-Allow-Origin'   : 'http://localhost:4200',
            'Access-Control-Allow-Credentials' : "true",


        });
        this.options = {headers: this.headers}
        this.httpParams = { fromObject: this.options } as HttpParamsOptions;
    }

    public getManagers(): Observable<any>{
        return this.http.get(this.apiServerUrl+'/manager/allmanagers',{headers:this.headers});
    }
    public getManager(myObj : myObject): Observable<Manager[]>{
        return this.http.post<Manager[]>(this.apiServerUrl+'/manager/manager',myObj);
    }
    public addManager(manager : Manager): Observable<Manager>{
        return this.http.post<Manager>(this.apiServerUrl+'/manager/add_manager',manager,{headers:this.headers});
    }
    public updateManager(myObj : myObject): Observable<any>{
        return this.http.post(this.apiServerUrl+'/manager/update_manager',myObj,{responseType: 'text'});
    }
    public deleteManager(myObj : string[]): Observable<any>{
        return this.http.post(this.apiServerUrl+'/manager/delete',myObj,{responseType: 'text'});
    }
}
export class myObjService implements myObject {
    update: string;
    reference: string;
    params: string[];
    constructor(update:string,reference:string,params : string[]){
        this.update     = update;
        this.reference  = reference;
        this.params     = params;
    }

}