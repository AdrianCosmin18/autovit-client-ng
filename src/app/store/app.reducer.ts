import {ActionReducerMap} from "@ngrx/store";
import * as fromCars from "../home/car/store/cars.reducer"


export interface AppState{

  cars: fromCars.State;
}


export const appReducer:ActionReducerMap<AppState>={


  //@ts-ignore
  cars:fromCars.carsReducer

}


