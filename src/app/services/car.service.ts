import { Injectable } from '@angular/core';
import {Car} from "../home/car/models/car-model";
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class CarService {
  private getCarsUrl = "http://localhost:8080/crudJS/car";

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]>{
    return this.http.get<Car[]>(this.getCarsUrl).pipe(catchError(this.handleError))
  }
  



  private handleError(error:HttpErrorResponse):Observable<never>{
    console.log(error);
    let errorMessage:string;

    if(error.error instanceof ErrorEvent){
      errorMessage=`A client error ocurred -${error.error.message}`;
    }else{

      if(error.error.reason){
        errorMessage=`${error.error.reason} - Error code ${error.status}`;
      }else{
        errorMessage=` An error ocurred -Error code ${error.status}`
      }
    }
    return throwError(errorMessage);

  }
}
