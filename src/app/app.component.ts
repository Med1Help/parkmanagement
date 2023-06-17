import { Component, OnInit } from '@angular/core';
import { Manager } from './manager';
import { ManagerService, myObjService } from './manager.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {myObject} from './myObject'
import {Router} from '@angular/router'
@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public managers : Manager[] | undefined;
  public editManager : Manager | undefined;
  public title = ""; 
  public getManagersRight : boolean = false;

  constructor (private managerService : ManagerService , private router:Router){}
  
  ngOnInit(): void {
     if(sessionStorage.getItem('role') == 'admin'){
      this.getManagersRight = true;
      this.getManagers();
      console.log("should get managers")
     }
  }

  public hasRoute(route:string){
    return this.router.url === route;
  }

  public getManagers() : void{
     this.managerService.getManagers().subscribe(
      (response : Manager[]) =>{
        this.managers = response;
      },
      (error : HttpErrorResponse) =>{
        alert(error.message);
      }
     )
  }
  public onUpdateManager(manager : Manager):void{
    console.log(manager.e_mail);
    let myObj = new myObjService('name','e_mail',[manager.name,manager.e_mail]);
    this.managerService.updateManager(myObj).subscribe(
      (resp) => {
        console.log(resp);
        this.managerService.getManagers();
      },
      (error:HttpErrorResponse) =>{
        alert(error.message)
      }
    );

  }
  public onDeleteManager(email:string|undefined) : void{
    if(email == undefined)email="";
    let myObj = [email]
    this.managerService.deleteManager(myObj).subscribe(
      (resp) => {
        console.log(resp);
        this.managerService.getManagers();
        location.reload();
      },
      (error:HttpErrorResponse) =>{
        alert(error.message)
      }
    );
  }
  public onAddManager(form : NgForm) : void{
    const closeButt = document.getElementById('add-manager-form') ;
    closeButt!.click();
    form.value['secteur'] = sessionStorage.getItem('secteur');
    this.managerService.addManager(form.value).subscribe(
      (response:Manager) => {
        console.log(response);
        this.managerService.getManagers();
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
    console.log("open modal");
    if(mode === 'add'){
      butt.setAttribute('data-target','#addManagerModal');
      console.log("open two modal");
    }
    container?.appendChild(butt);
    butt.click();
  }
  public onOpenModalWithManager(manager:Manager,mode:string):void{
    const container     = document.getElementById('main-container')
    const butt          = document.createElement('button');
    butt.type           = 'button';
    butt.style.display  = 'none';
    butt.setAttribute('data-toggle','modal');
    if(mode === 'edit'){
      this.editManager = manager;
      butt.setAttribute('data-target','#updateManagerModal');
    }
    if(mode === 'delete'){
      this.editManager = manager;
      butt.setAttribute('data-target','#deleteManagerModal');
    }
    container?.appendChild(butt);
    butt.click();
  }
}
