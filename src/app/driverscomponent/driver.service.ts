import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import {Driver} from './driver'
import {myObject} from '../myObject'
@Injectable({
    providedIn : 'root'
})
export class DriverService{
    private apiServerUrl = 'http://localhost:3001';
    
    private secteur : string | null;
    private headers : HttpHeaders;
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
    }

    public getDrivers(): Observable<Driver[]>{
        return this.http.get<Driver[]>(this.apiServerUrl+'/rider/allriders',{headers:this.headers});
    }
    // public getDriver(myObj : myObject): Observable<Driver[]>{
    //     return this.http.post<Driver[]>(this.apiServerUrl+'/rider/Driver',myObj);
    // }
    public addDriver(Driver : Driver): Observable<Driver>{
        return this.http.post<Driver>(this.apiServerUrl+'/rider/add_rider',Driver,{headers:this.headers});
    }
    public updateDriver(myObj : myObject): Observable<any>{
        return this.http.post(this.apiServerUrl+'/rider/update_rider',myObj,{responseType: 'text'});
    }
    public deleteDriver(myObj : string[]): Observable<any>{
        return this.http.post(this.apiServerUrl+'/rider/delete',myObj,{responseType: 'text'});
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