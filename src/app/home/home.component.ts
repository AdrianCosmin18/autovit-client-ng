import {Component, OnDestroy, OnInit} from '@angular/core';
import { Car } from './car/models/car-model';
import {Observable, Subscription, throwError} from "rxjs";
import {Router} from "@angular/router";
import {CarNgRxService} from "../servicesNgRx/car-ng-rx.service";
import {HttpErrorResponse} from "@angular/common/http";

import * as fromApp from '../store/app.reducer';
import * as CarActions from  '../home/car/store/cars.action';
import {Store} from "@ngrx/store";
import {Action} from "rxjs/internal/scheduler/Action";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit ,OnDestroy {

  public cars:Car[] = [];

  public subscription= new Subscription();
  constructor(private store:Store<fromApp.AppState>,
              private router: Router,
              private serviceNgRx: CarNgRxService
  ) { }

  ngOnInit(): void {
    this.store.select("cars").subscribe(data=>{
      this.cars = data.carslist;
    });
    // this.store.dispatch(new CarActions.SetCars(this.cars));
  }

  getCars(){
    this.subscription.add(
      this.serviceNgRx.getCars().subscribe({
        next: (cars) => {

          this.store.dispatch(new CarActions.SetCars(cars));
        },
        error: (err: HttpErrorResponse) =>{
          alert(err);
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goToAddCar(){
    this.router.navigate(['/add-car']);
  }


  onClick(){

    // this.getCars();
    this.store.dispatch(new CarActions.SetCars(this.cars));
    //la click se activeaza SetCars => se creaza efectul de a lua masinile din bd
  }
}
