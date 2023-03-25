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
        carslist: action.payload,
        cosmin:"test",

      };

    case Actions.ADD_CAR:



      return{
        ...state,
        carslist: [...state.carslist, action.payload],
        cosmin: "test2"
      }

    case Actions.UPDATE_CAR:

      return {
        ...state,
        carslist: [...state.carslist.filter(e => e.brand != action.oldBrand && e.model != action.oldModel), action.payload]
      }

    default:
      return state;
  }
}
