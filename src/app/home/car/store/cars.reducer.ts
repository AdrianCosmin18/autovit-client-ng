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

    case Actions.ADD_CAR_SUCCESS:

      return{
        ...state,
        carslist: [...state.carslist, action.payload],
        cosmin: "test2"
      }


    case Actions.UPDATE_CAR_SUCCESS:
      return {
        ...state,
        carslist: [...state.carslist.filter(e => e.id != action.payload.id), action.payload]
      }

    case Actions.DELETE_CAR:
      return {
        ...state,
        carslist: [...state.carslist.filter(e => e.brand != action.brand && e.model != action.model)],
        cosmin: "delete car"
      }

    default:
      return state;
  }
}
