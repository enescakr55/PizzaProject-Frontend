import { Size } from 'src/app/models/size';
import { SizeService } from './../../services/size.service';
import { CategoryService } from './../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { PizzaService } from './../../services/pizza.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms';
import { Category } from 'src/app/models/category';


@Component({
  selector: 'app-add-new-pizza',
  templateUrl: './add-new-pizza.component.html',
  styleUrls: ['./add-new-pizza.component.css']
})
export class AddNewPizzaComponent implements OnInit {
  pizzaAddForm:FormGroup;
  categories:Category[];
  sizes:Size[];
  constructor(private formBuilder:FormBuilder,private pizzaService:PizzaService,private toastrService:ToastrService,private categoryService:CategoryService,private sizeService:SizeService) { }

  ngOnInit(): void {
    this.createPizzaAddForm();
    this.categoryService.getCategories().subscribe(response=>{
      this.categories = response.data;
    })
    this.sizeService.getSizes().subscribe(response=>{
      this.sizes = response.data;
      console.log(this.sizes);
    })
  }
  createPizzaAddForm(){
    this.pizzaAddForm = this.formBuilder.group({
      pizzaName:["",Validators.required],
      sizeId:["",Validators.required],
      categoryId:["",Validators.required],
      description:["",Validators.required],
      price:["",Validators.required],
      pictureLink:["",Validators.required]

    })
  }
  addPizza(){
    if(this.pizzaAddForm.valid){
      let pizzaModel = Object.assign({},this.pizzaAddForm.value);
      pizzaModel.sizeId = parseInt(pizzaModel.sizeId);
      pizzaModel.categoryId = parseInt(pizzaModel.categoryId);
      pizzaModel.price = parseFloat(pizzaModel.price);
      this.pizzaService.addPizza(pizzaModel).subscribe(response=>{
        this.toastrService.success(response.message,"İşlem başarılı");
      },responseError=>{
        this.toastrService.error(responseError.error.message,"İşlem başarısız");
      })
    }else{
      this.toastrService.error("Formdaki bilgileri kontrol ediniz","İşlem başarısız");
    }
  }

}
