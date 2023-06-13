import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Affectation} from './affectation'
import {myObject} from '../myObject'
@Injectable({
    providedIn : 'root'
})
export class AffectationService{
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
    public getSec():string{
        return this.secteur!;
    }

    public getAffectations(): Observable<Affectation[]>{
        return this.http.get<Affectation[]>(this.apiServerUrl+'/affectation/allaffectations',{headers:this.headers});
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