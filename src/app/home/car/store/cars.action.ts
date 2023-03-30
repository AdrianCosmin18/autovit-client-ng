import {Action} from "@ngrx/store";
import {Car} from "../models/car-model";

export const SET_CARS = 'Set Cars';
export const ADD_CAR = 'ADD CAR';
export const UPDATE_CAR = 'UPDATE CAR';
export const DELETE_CAR = 'DELETE BOOK';

export class SetCars implements Action{
  readonly type = SET_CARS;

  constructor(public payload: Car[]) {
  }
}

export class AddCar implements Action{
  readonly type = ADD_CAR;

  constructor(public payload: Car) {
  }
}

export class UpdateCar implements Action{
  readonly type = UPDATE_CAR;

  constructor(public payload: Car, public oldBrand: string, public oldModel: string) {
  }
}

export class DeleteCar implements Action{
  readonly type = DELETE_CAR;

  constructor(public brand: string, public model: string) {
  }
}

export type CarListAction = SetCars | AddCar | UpdateCar | DeleteCar;
