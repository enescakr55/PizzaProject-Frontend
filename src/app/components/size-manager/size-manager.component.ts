import { PizzaService } from './../../services/pizza.service';
import { Size } from './../../models/size';
import { ToastrService } from 'ngx-toastr';
import { SizeService } from './../../services/size.service';
import { Component, OnInit } from '@angular/core';
import { Pizza } from 'src/app/models/pizza';

@Component({
  selector: 'app-size-manager',
  templateUrl: './size-manager.component.html',
  styleUrls: ['./size-manager.component.css']
})
export class SizeManagerComponent implements OnInit {
  sizes:Size[];
  txtSizeName:string;
  pizzas:Pizza[];
  constructor(private sizeService:SizeService,private toastrService:ToastrService,private pizzaService:PizzaService) { }

  ngOnInit(): void {
    this.getSizes();
    this.getPizzas();
  }
  getSizes(){
    this.sizeService.getSizes().subscribe(response=>{
      this.sizes = response.data;
    })
  }
  addSize(){
    let size:Size = {"sizeName":this.txtSizeName};
    this.sizeService.addSize(size).subscribe(response=>{
      if(response.success){
        this.toastrService.success(response.message);
      }else{
        this.toastrService.error(response.message);
      }
    },responseError=>{
      this.toastrService.error(responseError.error.message);
    })
  }
  deleteSize(size:Size){
    this.sizeService.deleteSize(size).subscribe(response=>{
      if(response.success){
        this.toastrService.success(response.message);
      }else{
        this.toastrService.error(response.message);
      }
    },responseError=>{
      this.toastrService.error(responseError.error.message);
    })
  }
  findPizzaCountBySize(sizeId:number){
    if(this.pizzas == undefined){
      return "";
    }
    return this.pizzas.filter(p=>p.sizeId == sizeId).length;
  }
  getPizzas(){
    return this.pizzaService.getPizzas().subscribe(response=>{
      this.pizzas = response.data;
    })
  }

}
