import { Component } from '@angular/core';
import { Affectation } from './affectation';
import { AffectationService } from './affectation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { myObjService } from '../manager.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'AffectationscomponentComponent',
  templateUrl: './affectationscomponent.component.html',
  styleUrls: ['./affectationscomponent.component.css']
})
export class AffectationscomponentComponent {
  public Affectations : Affectation[] | undefined;
  public editAffectation : Affectation | undefined;

  constructor(private AffectationService : AffectationService ){}
  ngOnInit(): void {
    this.getAffectations();
  }
  public getAffectations():void{
    this.AffectationService.getAffectations().subscribe(
      (response:Affectation[])=>{
        this.Affectations = response;
      },
      (error : HttpErrorResponse)=>{
        console.log(error.message);
      }
    );

  }
  public onUpdateAffectation(Affectation : Affectation):void{
    let myObj = new myObjService('date_fin','date_debut',[Affectation.date_fin.toString(),Affectation.date_fin.toString()]);
    this.AffectationService.updateAffectation(myObj).subscribe(
      (resp) => {
        console.log(resp);
        this.AffectationService.getAffectations();
      },
      (error:HttpErrorResponse) =>{
        alert(error.message)
      }
    );

  }
  public onDeleteAffectation(email:string|undefined) : void{
    if(email == undefined)email="";
    let myObj = [email]
    this.AffectationService.deleteAffectation(myObj).subscribe(
      (resp) => {
        console.log(resp);
        this.AffectationService.getAffectations();
        location.reload();
      },
      (error:HttpErrorResponse) =>{
        alert(error.message)
      }
    );
  }
  public onAddAffectation(form : NgForm) : void{
    const closeButt = document.getElementById('add-Affectation-form') ;
    closeButt!.click();
    this.AffectationService.addAffectation(form.value).subscribe(
      (response:Affectation) => {
        console.log(response);
        this.AffectationService.getAffectations();
        form.reset();
      },
      (error:HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public onOpenModal(mode:string):void{
    const container     = document.getElementById('main-container')
    const butt          = document.createElement('button');
    butt.type           = 'button';
    butt.style.display  = 'none';
    butt.setAttribute('data-toggle','modal');
    if(mode === 'add'){
      butt.setAttribute('data-target','#addAffectationModal');
    }
    container?.appendChild(butt);
    butt.click();
  }
  public onOpenModalWithAffectation(Affectation:Affectation,mode:string):void{
    const container     = document.getElementById('main-container')
    const butt          = document.createElement('button');
    butt.type           = 'button';
    butt.style.display  = 'none';
    butt.setAttribute('data-toggle','modal');
    if(mode === 'edit'){
      this.editAffectation = Affectation;
      butt.setAttribute('data-target','#updateAffectationModal');
    }
    if(mode === 'delete'){
      this.editAffectation = Affectation;
      butt.setAttribute('data-target','#deleteAffectationModal');
    }
    container?.appendChild(butt);
    butt.click();
  }
}
