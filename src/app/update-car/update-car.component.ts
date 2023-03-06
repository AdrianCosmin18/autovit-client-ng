import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CarService} from "../services/car.service";
import {Car} from "../home/car/models/car-model";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent implements OnInit, OnDestroy {
  public formUpdate!: FormGroup;
  public car!: Car;
  public brandFromUrl = '';
  public modelFromUrl = '';
  public subscription = new Subscription();

  public get brand(){
    return this.formUpdate.get("brand");
  }

  public get model(){
    return this.formUpdate.get("model");
  }

  public get weight(){
    return this.formUpdate.get("weight");
  }


  constructor(
    private formBuilder: FormBuilder,
    private service: CarService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.formUpdate = this.formBuilder.group({
      brand: ["", [Validators.required, Validators.minLength(2), Validators.pattern('^[A-Z]+[a-zA-Z]*$')]],
      model: ["", [Validators.required, Validators.minLength(2), Validators.pattern('^\\S*$')]],
      weight: ["", [Validators.required, Validators.min(500), Validators.pattern('^\\d*[.]?\\d$')]],
      isAvailable: [false]
    });

    this.route.params.subscribe({
      next: url => {
        this.brandFromUrl = url?.['brand'];
        this.modelFromUrl = url?.['model'];
        console.log(this.brandFromUrl);
        console.log(this.modelFromUrl);
      }
    });

    this.getCar();
    console.log("formUpdate.value: " + this.formUpdate.value);
  }

  getCar(): void{
    this.subscription.add(
      this.service.getCarByBrandAndModel(this.brandFromUrl, this.modelFromUrl).subscribe({
        next: (car) => {
          this.car = car;
          console.log(this.car);
          this.intializeForm();
          },
        error: (err) => throwError(err)
      })
    )
  }

  intializeForm(){
    this.formUpdate.patchValue({
      brand: this.car.brand,
      model: this.car.model,
      weight: this.car.weight,
      isAvailable: this.car.isAvailable
    })
  }

  updateCar(){
    let car: Car = this.formUpdate.value;
    console.log(this.brandFromUrl, car);

    this.subscription.add(
      this.service.updateCarByBrandAndModel(this.brandFromUrl, this.modelFromUrl, car).subscribe({
        next: () => {
          this.goHome();
          },
        error: (err: HttpErrorResponse) => alert(err)
      })
    )
  }

  goHome(){
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
