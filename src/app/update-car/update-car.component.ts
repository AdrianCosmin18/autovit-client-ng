import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CarService} from "../services/car.service";
import {Car} from "../home/car/models/car-model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent implements OnInit {
  public formUpdate!: FormGroup;
  public car!: Car;

  constructor(private formBuilder: FormBuilder, private service: CarService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.formUpdate = this.formBuilder.group({
      brand: ["", [Validators.required, Validators.minLength(2)]],
      model: ["", [Validators.required, Validators.minLength(2)]],
      weight: ["", [Validators.required, Validators.min(500)]],
      availability: [false]
    });

    let id = 0;
    this.router.params.subscribe({
      next: url => {
        id = +url?.['id'];
        console.log(id);
      }
    });
  }

}
