import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Car } from "./car";
import { myObject } from "../myObject";
@Injectable({
    providedIn : 'root'
})
export class CarService{
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

    public getCars(): Observable<Car[]>{
        return this.http.get<Car[]>(this.apiServerUrl+'/car/allcars',{headers:this.headers});
    }
    // public getCar(myObj : myObject): Observable<Car[]>{
    //     return this.http.post<Car[]>(this.apiServerUrl+'/car/car',myObj);
    // }
    public addCar(Car : Car): Observable<Car>{
        return this.http.post<Car>(this.apiServerUrl+'/car/add_car',Car,{headers:this.headers});
    }
    public updateCar(myObj : myObject): Observable<any>{
        return this.http.post(this.apiServerUrl+'/car/update_car',myObj,{responseType: 'text'});
    }
    public deleteCar(myObj : string[]): Observable<any>{
        return this.http.post(this.apiServerUrl+'/car/delete',myObj,{responseType: 'text'});
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