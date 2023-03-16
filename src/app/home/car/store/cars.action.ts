import {Action} from "@ngrx/store";
import {Car} from "../models/car-model";

export const SET_CARS = 'Set Cars';
export const ADD_CAR = 'ADD CAR';
export const UPDATE_CAR = 'UPDATE CAR';
export const DELETE_BOOK = 'DELETE BOOK';

export class SetCars implements Action{
  readonly type = SET_CARS;

  constructor(public payload: Car[]) {


  }
}

export type CarListAction = SetCars;
