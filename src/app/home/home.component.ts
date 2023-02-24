import {Component, OnDestroy, OnInit} from '@angular/core';
import { Car } from './car/models/car-model';
import {Observable, Subscription, throwError} from "rxjs";
import {CarService} from "../services/car.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit ,OnDestroy {

  public cars:Car[] = [];

  public subscription= new Subscription();
  constructor(private service: CarService) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(){

    this.subscription.add(
      this.service.getCars().subscribe({
        next: (cars) => this.cars = cars,
        error: err => throwError(err)
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



}
