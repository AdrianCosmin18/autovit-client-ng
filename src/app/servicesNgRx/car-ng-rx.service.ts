import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, of, throwError} from "rxjs";
import {Car} from "../home/car/models/car-model";

@Injectable({
  providedIn: 'root'
})
export class CarNgRxService {
  private url = "http://localhost:8080/crudJS/car";

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]>{
    return this.http.get<Car[]>(this.url)
      .pipe(catchError(err => of(err)));
  }




  private handleError(error: HttpErrorResponse): Observable<never>{
    console.log(error);
    let errorMessage:string;

    errorMessage = error.error.message;
    return throwError(errorMessage);
  }
}
