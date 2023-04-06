import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, of, throwError} from "rxjs";
import {Car} from "../home/car/models/car-model";
import * as fromApp from '../store/app.reducer';
import * as carAction from '../home/car/store/cars.action';
import {Store} from "@ngrx/store";
import * as CarActions from "../home/car/store/cars.action";

@Injectable({
  providedIn: 'root'
})
export class CarNgRxService {
  private url = "http://localhost:8080/crudJS/car";

  constructor(private http: HttpClient,
              public store: Store<fromApp.AppState>) { }

  getCars(): Observable<Car[]>{
    return this.http.get<Car[]>(this.url)
      .pipe(catchError(err => of(err)));
  }

  addCar(car: Car): Observable<void>{
    // let aux = car;
    // aux.id = this.generateRandomId();
    // this.store.dispatch(new CarActions.AddCar(aux));

    return this.http.post<void>(this.url, car)
      .pipe(catchError(this.handleError));
  }

  updateCar(car: Car, oldBrand: string, oldModel: string): Observable<void>{
    let aux = car;
    aux.id = this.generateRandomId();
    this.store.dispatch(new CarActions.UpdateCar(aux, oldBrand, oldModel));

    let path = `${this.url}/update-car-by-brand-model?brand=${oldBrand}&model=${oldModel}`;

    return this.http.put<void>(path, car)
      .pipe(catchError(this.handleError));
  }

  deleteCar(brand: string, model: string): Observable<void>{
    this.store.dispatch(new CarActions.DeleteCar(brand, model));
    let path = `${this.url}/delete-car/${brand}/${model}`;

    return this.http.delete<void>(path)
      .pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse): Observable<never>{
    console.log(error);
    let errorMessage:string;

    errorMessage = error.error.message;
    return throwError(errorMessage);
  }

  private generateRandomId():number{

    let cars :Car[] = [];
    this.store.select("cars").subscribe(data => {
      cars = data.carslist;
    })

    let id=Math.floor(Math.random()*1000);
    while(cars.filter(e=>e.id==id).length>0){
      id=Math.floor(Math.random()*1000);
    }
    return id;
  }

}
