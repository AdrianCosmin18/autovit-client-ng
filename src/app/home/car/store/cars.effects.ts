import * as CarAction from './cars.action';
import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CarNgRxService} from "../../../servicesNgRx/car-ng-rx.service";
import {catchError, EMPTY, map, switchMap, take} from "rxjs";
import {Car} from "../models/car-model";
import {getXHRResponse} from "rxjs/internal/ajax/getXHRResponse";

@Injectable()
export class CarsEffects{

  constructor(
    private action: Actions,
    private carService: CarNgRxService
  ) {}

  loadCars$ = createEffect(() => {
    return this.action.pipe(
      ofType(CarAction.SET_CARS),
      take(1), // vreau sa mi faca lista de masini de `count` ori
      switchMap(() => this.carService.getCars().pipe(
        map(response => new CarAction.SetCars(response)),
        catchError(err => {
          console.error(err);
          return EMPTY;
        })
      ))
    );
  });

  // @ts-ignore
  addCar$ = createEffect(() => {
    return this.action.pipe(
      ofType(CarAction.ADD_CAR),
      take(1),
      switchMap((car: Car) => this.carService.addCar(car).pipe(
        map(resp => {

          let aux = car;
          aux.id = Math.floor(Math.random() * 2000);
          new CarAction.AddCar(car)
        }),
        catchError(err => {
          console.log(err);
          return EMPTY;
        })
      ))
    )
  })



}










