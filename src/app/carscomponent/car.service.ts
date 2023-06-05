import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Car } from "./car";
import { myObject } from "../myObject";
@Injectable({
    providedIn : 'root'
})
export class CarService{
    private apiServerUrl = 'http://localhost:3001';

    constructor(private http: HttpClient){

    }

    public getCars(): Observable<Car[]>{
        return this.http.get<Car[]>(this.apiServerUrl+'/car/allcars');
    }
    // public getCar(myObj : myObject): Observable<Car[]>{
    //     return this.http.post<Car[]>(this.apiServerUrl+'/car/car',myObj);
    // }
    public addCar(Car : Car): Observable<Car>{
        return this.http.post<Car>(this.apiServerUrl+'/car/add_car',Car);
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