import * as CarAction from './cars.action';
import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CarNgRxService} from "../../../servicesNgRx/car-ng-rx.service";
import {catchError, EMPTY, map, switchMap, take, tap} from "rxjs";
import {Car} from "../models/car-model";
import {getXHRResponse} from "rxjs/internal/ajax/getXHRResponse";
import {ADD_CAR_SUCCESS} from "./cars.action";

const handleAddCAR=(car:Car)=>{
  return new CarAction.AddCarSuccess(car);
}


@Injectable()
export class CarsEffects{
  constructor(
    private action: Actions,
    private carService: CarNgRxService
  ) {}

  loadCars$ = createEffect(() => {
    return this.action.pipe(
      ofType(CarAction.SET_CARS),//action-ul pe care-l vreau
      take(1), // vreau sa mi faca lista de masini de `count` ori
      switchMap((carData: CarAction.SetCars) => this.carService.getCars().pipe(
        tap(()=>console.log("effect get cars")),
        map(response => new CarAction.SetCars(response)),
        catchError(err => {
          console.error(err);
          return EMPTY;
        })
      ))
    );
  });


  addCar$ = createEffect(() => {
    return this.action.pipe(
      ofType(CarAction.ADD_CAR),
      take(1),
      //carData este ce trimit din dispatch-ul de la add
      switchMap((carData: CarAction.AddCar) => this.carService.addCar(carData.payload).pipe(
        tap(()=>console.log("effect add car")),
        map(data=>{
          return handleAddCAR(data)
        }),
        catchError(err => {
          console.log(err);
          return EMPTY;
        })
      ))
    )
  })



}










