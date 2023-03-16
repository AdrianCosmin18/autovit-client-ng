import { Injectable } from '@angular/core';
import {Car} from "../home/car/models/car-model";
import {catchError, Observable, throwError, of, BehaviorSubject, tap} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class CarService {
  private url = "http://localhost:8080/crudJS/car";

  public carsState$= new BehaviorSubject<Car[]>([]);

  constructor(private http: HttpClient) {


    this.getCars().subscribe((data)=>{
        this.carsState$.next(data);
      }
    );
  }

  getCars(): Observable<Car[]>{

    return this.http.get<Car[]>(this.url).pipe(
      catchError(err=>of(err)));
  }

  getCarById(id: number): Observable<Car>{
    let url2 = `${this.url}/${id}`;
    return this.http.get<Car>(url2).pipe(catchError(this.handleError));
  }

  addCar(car: Car): Observable<void>{
    let aux=car;
    aux.id=this.generateRandomId();
    this.carsState$.next([...this.carsState$.value,aux])
    return  this.http.post<void>(this.url, car).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never>{
    console.log(error);
    let errorMessage:string;

    errorMessage = error.error.message;
    return throwError(errorMessage);
  }


  private generateRandomId():number{

    let id=Math.floor(Math.random()*1000);
    while(this.carsState$.getValue().filter(e=>e.id==id).length>0){
       id=Math.floor(Math.random()*1000);
    }
    return id;
  }


}
