import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantData } from '../restaurent.model';
import { RestroService } from '../restro.service';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css']
})
export class RestaurantDashComponent implements OnInit {
  formValue!: FormGroup
  // restroModel = new RestaurantData;
  restroModel: RestaurantData = new RestaurantData;
  allRestaurantData: any;
  showAdd!: boolean;
  showBtn!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private retroService: RestroService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      service: ['']
    })
    this.getAllData();
  }

  clickAddResto() {
    this.formValue.reset();
    this.showAdd = true;
    this.showBtn = false;
  }

  addRestro() {
    this.restroModel.name = this.formValue.value.name;
    this.restroModel.email = this.formValue.value.email;
    this.restroModel.mobile = this.formValue.value.mobile;
    this.restroModel.address = this.formValue.value.address;
    this.restroModel.service = this.formValue.value.service;

    this.retroService.postRestaurant(this.restroModel).subscribe(res => {
      console.log(res);

      alert("recoed success");
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.getAllData();
    },
      err => {
        alert("something wrong");
      })
  }

  getAllData() {
    this.retroService.getReaturnt().subscribe(res => {
      this.allRestaurantData = res;
    })
  }

  deleteRestro(data: any) {
    this.retroService.deleteRestaurant(data.id).subscribe(res => {
      alert("delete success");
      this.getAllData();
    })
  }

  onEditResto(data: any) {
    this.showAdd = false;
    this.showBtn = true;

    this.restroModel.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['service'].setValue(data.service);
  }
  updateRestro() {
    this.restroModel.name = this.formValue.value.name;
    this.restroModel.email = this.formValue.value.email;
    this.restroModel.mobile = this.formValue.value.mobile;
    this.restroModel.address = this.formValue.value.address;
    this.restroModel.service = this.formValue.value.service;

    this.retroService.
      updateretaurant(this.restroModel, this.restroModel.id)
      .subscribe(res => {
        alert("update done");
        let ref = document.getElementById('clear');
        ref?.click();
        this.formValue.reset();
        this.getAllData();
      })

  }

  logout(){
    alert("logout Success");
    this.router.navigate(["login"])

  }
}
