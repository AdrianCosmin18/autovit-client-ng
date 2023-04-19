import {Action} from "@ngrx/store";
import {Car} from "../models/car-model";

export const SET_CARS = 'Set Cars';
export const ADD_CAR = 'ADD CAR';
export const ADD_CAR_SUCCESS = 'ADD CAR SUCCESS';
export const UPDATE_CAR = 'UPDATE CAR';
export const UPDATE_CAR_SUCCESS = 'UPDATE CAR SUCCESS';
export const DELETE_CAR = 'DELETE BOOK';
export const DELETE_CAR_SUCCESS = 'DELETE_CAR_SUCCESS' ;


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

export class AddCarSuccess implements Action{
  readonly type = ADD_CAR_SUCCESS

  constructor(public payload: Car) {
  }
}

export class UpdateCar implements Action{
  readonly type = UPDATE_CAR;

  constructor(public payload: Car, public oldBrand: string, public oldModel: string) {
  }
}

export class UpdateCarSuccess implements Action{
  readonly type = UPDATE_CAR_SUCCESS;

  constructor(public payload: Car) {
  }
}

export class DeleteCar implements Action{
  readonly type = DELETE_CAR;

  constructor(public brand: string, public model: string) {
  }
}

export class DeleteCarSuccess implements Action{
  readonly type = DELETE_CAR_SUCCESS;

  constructor() {
  }
}

export type CarListAction = SetCars | AddCar | UpdateCar | DeleteCar | AddCarSuccess | UpdateCarSuccess | DeleteCarSuccess;
