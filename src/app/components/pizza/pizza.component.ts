import { ToastrService } from 'ngx-toastr';
import { AdminService } from './../../services/admin.service';
import { Size } from 'src/app/models/size';
import { SizeService } from './../../services/size.service';
import { AddCartService } from './../../services/add-cart.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { PizzaService } from './../../services/pizza.service';
import { Component, OnInit } from '@angular/core';
import { Pizza } from 'src/app/models/pizza';
import { ParsedEvent } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent implements OnInit {

  constructor(private pizzaService:PizzaService,private localStorageService:LocalStorageService,private addCartService:AddCartService,private activatedRoute:ActivatedRoute,private sizeService:SizeService,private adminService:AdminService,private toastrService:ToastrService) { }
  pizzas:Pizza[]=[];
  dataLoaded:boolean = false;
  sizes:Size[];
  loadingError:boolean;
  pipePizzaName:string | null = null;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["pizzaName"]){
        this.pizzaService.getPizzasByName(params["pizzaName"]).subscribe(response=>{
          this.pizzas = response.data;
          this.localStorageService.storageRemoveValue("size");
          this.dataLoaded = true;
        })
      }else{
        this.pizzaService.getPizzas().subscribe(response=>{
          this.pizzas = response.data;
         // console.log(this.pizzas);
          this.dataLoaded = true;
        },responseError=>{
          this.toastrService.error("Ürünler sunucudan getirilemedi");
          this.dataLoaded = true;
          this.loadingError = true;
        })
      }
    })
    this.sizeService.getSizes().subscribe(response=>{
      this.sizes = response.data;
    })
  }
  isAdminMode(){
    if(this.adminService.isAdminMode() == true){
      return true;
    }
    return false;
  }
  getSize(){
    return this.localStorageService.storageIsSet("size") != null ? parseInt(this.localStorageService.storageGetValue("size"))  : null;
  }
  getCategory(){
    return this.localStorageService.storageIsSet("categoryFilter") != null ? parseInt(this.localStorageService.storageGetValue("categoryFilter"))  : null;
  }
  getPizzaById(id:number){
    this.pizzaService.getPizzaById(id).subscribe(response=>{
      //console.log(response.data);
      return response.data;
    })
  }
  addToCart(pizzaId:number,pizzaName:string){
    this.addCartService.addToCart(pizzaId,pizzaName);
  }
  getSizeName(id:number){
    if(this.sizes != undefined){
      let size:Size = this.sizes.find(p=>p.id == id);
     // console.log(size);
      return size.sizeName;
    }
    return null;

  }
  deletePizza(pizza:Pizza){
    this.pizzaService.deletePizza(pizza).subscribe(response=>{
      if(response.success){
        this.toastrService.success(response.message);
      }else{
        this.toastrService.error(response.message);
      }
    },responseError=>{
      this.toastrService.error(responseError.error.message);
    })
  }
  pizzaLoader(){
    
  }
}
