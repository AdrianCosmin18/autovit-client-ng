import { Component, Input, OnInit } from '@angular/core';
import { Car } from './models/car-model';

@Component({
  selector: '.car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  @Input() car: Car = {
    id: 0,
    brand:"",
    model: "",
    weight: 0,
    isAvailable: false
  };

  constructor() { }

  ngOnInit(): void {
  }

  putUrl(): string{
    return this.car.brand + "/" + this.car.model;
  }
}
