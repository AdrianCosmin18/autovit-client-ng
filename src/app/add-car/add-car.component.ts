import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {Car} from "../home/car/models/car-model";
import {CarService} from "../services/car.service";
import {catchError, Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit, OnDestroy {

  public myForm!: FormGroup;

  private subscription= new Subscription();
  constructor(private service: CarService) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(){
    this.myForm = new FormGroup({
      brand: new FormControl("", [Validators.required, Validators.minLength(2)]),
      model: new FormControl("", [Validators.required, Validators.minLength(2)]),
      weight: new FormControl("", [Validators.required, Validators.min(800)]),
      availability: new FormControl(false)
    });
  }

  addCar() {

    let car = {
      brand: this.myForm?.get("brand")?.value,
      model: this.myForm?.get("model")?.value,
      weight: this.myForm?.get("weight")?.value,
      isAvailable: this.myForm?.get("availability")?.value
    }

    this.subscription.add(
      this.service.addCar(car as Car).subscribe({
        next: () => window.location.reload(),
        error: (err: HttpErrorResponse) =>{
          alert(err.error.message),
            console.log(err.error.message);
        }
      })
    )
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
