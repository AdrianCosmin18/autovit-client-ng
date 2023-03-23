import {Car} from "../models/car-model";
import * as Actions from './cars.action';


export interface State{
  carslist: Car[];
}

const initialState: State = {
  carslist :[]
}

export function carsReducer(
  state: State = initialState,
  action: Actions.CarListAction
){
  switch (action.type){
    case Actions.SET_CARS:
      return{
        ...state,
        carslist: action.payload
      };
    default:
      return state;
  }
}
