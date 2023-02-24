import { Injectable } from '@angular/core';
import {Car} from "../home/car/models/car-model";
import {catchError, Observable, throwError, of} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class CarService {
  private url = "http://localhost:8080/crudJS/car";

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]>{
    return this.http.get<Car[]>(this.url).pipe(catchError(err=>of(err)));
  }

  getCarById(id: number): Observable<Car>{
    let url2 = `${this.url}/${id}`;
    return this.http.get<Car>(url2).pipe(catchError(err=>of(err)));
  }

  addCar(car: Car): Observable<void>{
    return this.http.post<void>(this.url, car);
  }




}
