import { Component } from '@angular/core';
import { Driver } from './driver';
import { DriverService } from './driver.service';
import { HttpErrorResponse } from '@angular/common/http';
import { myObjService } from '../manager.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'DriverscomponentComponent',
  templateUrl: './driverscomponent.component.html',
  styleUrls: ['./driverscomponent.component.css']
})
export class DriverscomponentComponent {
    public drivers : Driver[] | undefined;
    public editDriver : Driver | undefined;

    constructor(private driverService : DriverService ){}
    ngOnInit(): void {
      this.getDrivers();
    }
    public getDrivers():void{
      this.driverService.getDrivers().subscribe(
        (response:Driver[])=>{
          this.drivers = response;
        },
        (error : HttpErrorResponse)=>{
          console.log(error.message);
        }
      );

    }
    public onUpdatedriver(driver : Driver):void{
      console.log(driver.e_mail);
      let myObj = new myObjService('name','e_mail',[driver.name,driver.e_mail]);
      this.driverService.updateDriver(myObj).subscribe(
        (resp) => {
          console.log(resp);
          this.driverService.getDrivers();
        },
        (error:HttpErrorResponse) =>{
          alert(error.message)
        }
      );
  
    }
    public onDeletedriver(email:string|undefined) : void{
      if(email == undefined)email="";
      let myObj = [email]
      this.driverService.deleteDriver(myObj).subscribe(
        (resp) => {
          console.log(resp);
          this.driverService.getDrivers();
          location.reload();
        },
        (error:HttpErrorResponse) =>{
          alert(error.message)
        }
      );
    }
    public onAdddriver(form : NgForm) : void{
      const closeButt = document.getElementById('add-driver-form') ;
      closeButt!.click();
      this.driverService.addDriver(form.value).subscribe(
        (response:Driver) => {
          console.log(response);
          this.driverService.getDrivers();
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
        butt.setAttribute('data-target','#adddriverModal');
      }
      container?.appendChild(butt);
      butt.click();
    }
    public onOpenModalWithdriver(driver:Driver,mode:string):void{
      const container     = document.getElementById('main-container')
      const butt          = document.createElement('button');
      butt.type           = 'button';
      butt.style.display  = 'none';
      butt.setAttribute('data-toggle','modal');
      if(mode === 'edit'){
        this.editDriver = driver;
        butt.setAttribute('data-target','#updatedriverModal');
      }
      if(mode === 'delete'){
        this.editDriver = driver;
        butt.setAttribute('data-target','#deletedriverModal');
      }
      container?.appendChild(butt);
      butt.click();
    }

}
