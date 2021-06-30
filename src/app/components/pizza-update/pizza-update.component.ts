import { ActivatedRoute } from '@angular/router';
import { SizeService } from './../../services/size.service';
import { CategoryService } from './../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { Size } from './../../models/size';
import { Category } from './../../models/category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PizzaService } from 'src/app/services/pizza.service';
import { Pizza } from 'src/app/models/pizza';

@Component({
  selector: 'app-pizza-update',
  templateUrl: './pizza-update.component.html',
  styleUrls: ['./pizza-update.component.css']
})
export class PizzaUpdateComponent implements OnInit {
  pizzaUpdateForm:FormGroup;
  categories:Category[];
  sizes:Size[];
  pizzaid:number;
  currentPizza:Pizza;
  constructor(private formBuilder:FormBuilder,private pizzaService:PizzaService,private toastrService:ToastrService,private categoryService:CategoryService,private sizeService:SizeService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["pizzaid"]){
        this.pizzaid = params["pizzaid"];
        this.getPizza();
      }
    })
    this.categoryService.getCategories().subscribe(response=>{
      this.categories = response.data;
      this.createForm();
    })
    this.sizeService.getSizes().subscribe(response=>{
      this.sizes = response.data;
      this.createForm();
      console.log(this.sizes);
    })
  }
  createPizzaUpdateForm(){
    this.pizzaUpdateForm = this.formBuilder.group({
      id:[this.currentPizza.id,Validators.required],
      pizzaName:[this.currentPizza.pizzaName,Validators.required],
      sizeId:[this.currentPizza.sizeId,Validators.required],
      categoryId:[this.currentPizza.categoryId,Validators.required],
      description:[this.currentPizza.description,Validators.required],
      price:[this.currentPizza.price,Validators.required],
      pictureLink:[this.currentPizza.pictureLink,Validators.required]

    })
  }
  createForm(){
    if(this.sizes && this.categories && this.currentPizza){
      this.createPizzaUpdateForm();
    }
  }
  updatePizza(){
    if(this.pizzaUpdateForm.valid){
      let pizzaModel = Object.assign({},this.pizzaUpdateForm.value);
      pizzaModel.sizeId = parseInt(pizzaModel.sizeId);
      pizzaModel.categoryId = parseInt(pizzaModel.categoryId);
      pizzaModel.price = parseFloat(pizzaModel.price);
      this.pizzaService.updatePizza(pizzaModel).subscribe(response=>{
        this.toastrService.success(response.message,"İşlem başarılı");
      },responseError=>{
        this.toastrService.error(responseError.error.message,"İşlem başarısız");
      })
    }else{
      this.toastrService.error("Formdaki bilgileri kontrol ediniz","İşlem başarısız");
    }
  }
  getPizza(){
    this.pizzaService.getPizzaById(this.pizzaid).subscribe(response=>{
      this.currentPizza = response.data;
      this.createForm();
    })
  }

}
