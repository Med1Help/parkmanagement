import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import {Affectation} from './affectation'
import {myObject} from '../myObject'
@Injectable({
    providedIn : 'root'
})
export class AffectationService{
    private apiServerUrl = 'http://localhost:3001';

    constructor(private http: HttpClient){

    }

    public getAffectations(): Observable<Affectation[]>{
        return this.http.get<Affectation[]>(this.apiServerUrl+'/affectation/allaffectations');
    }
    // public getAffectation(myObj : myObject): Observable<Affectation[]>{
    //     return this.http.post<Affectation[]>(this.apiServerUrl+'/affectation/Affectation',myObj);
    // }
    public addAffectation(Affectation : Affectation): Observable<Affectation>{
        return this.http.post<Affectation>(this.apiServerUrl+'/affectation/add_affectation',Affectation);
    }
    public updateAffectation(myObj : myObject): Observable<any>{
        return this.http.post(this.apiServerUrl+'/affectation/update_affectation',myObj,{responseType: 'text'});
    }
    public deleteAffectation(myObj : string[]): Observable<any>{
        return this.http.post(this.apiServerUrl+'/affectation/delete',myObj,{responseType: 'text'});
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