import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CarService} from "../services/car.service";
import {Car} from "../home/car/models/car-model";
import {ActivatedRoute, Router} from "@angular/router";
import {CarNgRxService} from "../servicesNgRx/car-ng-rx.service";
import * as fromApp from '../store/app.reducer';
import * as carAction from '../home/car/store/cars.action';
import {Store} from "@ngrx/store";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent implements OnInit {
  public formUpdate!: FormGroup;
  public car!: Car;
  public brand: string = '';
  public model: string = '';

  constructor(private formBuilder: FormBuilder,
              private service: CarService,
              private activatedRoute: ActivatedRoute,
              private ngRxService: CarNgRxService,
              private router: Router,
              public store: Store<fromApp.AppState>) { }

  ngOnInit(): void {

    this.formUpdate = this.formBuilder.group({
      brand: ["", [Validators.required, Validators.minLength(2)]],
      model: ["", [Validators.required, Validators.minLength(2)]],
      weight: ["", [Validators.required, Validators.min(500)]],
      availability: [false]
    });

    this.putCarInForm();

    this.completeForm();
  }

  cancel(){
    this.router.navigate(['/home']);
  }

  putCarInForm(){
    this.activatedRoute.params.subscribe({
      next: url => {
        this.brand = url['brand'];
        this.model = url['model'];

        console.log(this.brand + " " + this.model);
        let cars : Car[] = [];

      this.store.select("cars").subscribe(data => {
        cars = data.carslist.filter(e => e.brand === this.brand && e.model === this.model);
        console.log(cars);
        this.car = cars[0];
      })

      }
    });
  }

  completeForm(){
    this.formUpdate.setValue({
      brand: this.car.brand,
      model: this.car.model,
      weight: this.car.weight,
      availability: this.car.isAvailable
    })
  }

  saveCar(){
    this.ngRxService.updateCar(this.car, this.brand, this.model).subscribe({
      next: () => {
        this.goHome();
      },
      error: (err: HttpErrorResponse) =>{
        alert(err)
      }
    })
  }

  goHome(){
    this.router.navigate(['/home']);
  }

}
