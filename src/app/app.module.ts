import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { ManagerService } from './manager.service';
import { HttpClientModule } from '@angular/common/http';
import { DriverscomponentComponent } from './driverscomponent/driverscomponent.component';
import { CarscomponentComponent } from './carscomponent/carscomponent.component';
import { AffectationscomponentComponent } from './affectationscomponent/affectationscomponent.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [ 
  {path: '' , component: AppComponent},
  {path: 'login' , component: LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    DriverscomponentComponent,
    CarscomponentComponent,
    AffectationscomponentComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes,{enableTracing:true})  
  ],
  providers: [ManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
