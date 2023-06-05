import { Component } from '@angular/core';
import { CarService } from './car.service'
import { HttpErrorResponse } from '@angular/common/http';
import { myObjService } from '../manager.service';
import { NgForm } from '@angular/forms';
import { Car } from './car';

@Component({
  selector: 'app-carscomponent',
  templateUrl: './carscomponent.component.html',
  styleUrls: ['./carscomponent.component.css']
})
export class CarscomponentComponent {

  public Cars : Car[] | undefined;
  public editCar : Car | undefined;
  public title = ""; 
  constructor (private CarService : CarService){}
  ngOnInit(): void {
    this.getCars();
  }

  public getCars() : void{
     this.CarService.getCars().subscribe(
      (response : Car[]) =>{
        this.Cars = response;
      },
      (error : HttpErrorResponse) =>{
        alert(error.message);
      }
     )
  }
  public onUpdateCar(Car : Car):void{
    // console.log(Car.e_mail);
    // let myObj = new myObjService('name','e_mail',[Car.name,Car.e_mail]);
    // this.CarService.updateCar(myObj).subscribe(
    //   (resp) => {
    //     console.log(resp);
    //     this.CarService.getCars();
    //   },
    //   (error:HttpErrorResponse) =>{
    //     alert(error.message)
    //   }
    // );

  }
  public onDeleteCar(email:string|undefined) : void{
    if(email == undefined)email="";
    let myObj = [email]
    this.CarService.deleteCar(myObj).subscribe(
      (resp) => {
        console.log(resp);
        this.CarService.getCars();
        location.reload();
      },
      (error:HttpErrorResponse) =>{
        alert(error.message)
      }
    );
  }
  public onAddCar(form : NgForm) : void{
    const closeButt = document.getElementById('add-Car-form') ;
    closeButt!.click();
    this.CarService.addCar(form.value).subscribe(
      (response:Car) => {
        console.log(response);
        this.CarService.getCars();
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
      butt.setAttribute('data-target','#addCarModal');
    }
    container?.appendChild(butt);
    butt.click();
  }
  public onOpenModalWithCar(Car:Car,mode:string):void{
    const container     = document.getElementById('main-container')
    const butt          = document.createElement('button');
    butt.type           = 'button';
    butt.style.display  = 'none';
    butt.setAttribute('data-toggle','modal');
    if(mode === 'edit'){
      this.editCar = Car;
      butt.setAttribute('data-target','#updateCarModal');
    }
    if(mode === 'delete'){
      this.editCar = Car;
      butt.setAttribute('data-target','#deleteCarModal');
    }
    container?.appendChild(butt);
    butt.click();
  }
}
