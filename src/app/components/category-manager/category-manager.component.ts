import { Category } from 'src/app/models/category';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.css']
})
export class CategoryManagerComponent implements OnInit {
  txtCategoryName:string;
  categories:Category[];
  constructor(private categoryService:CategoryService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getCategories();
  }
  addCategory(){
    let category:Category = {"categoryName":this.txtCategoryName};
    this.categoryService.addCategory(category).subscribe(response=>{
      if(response.success){
        this.toastrService.success("Kategori eklendi");
        this.getCategories();
      }else{
        this.toastrService.error("Kategori eklenemedi");
      }
    },responseError=>{
      console.log(responseError);
      this.toastrService.error(responseError.error.message);
    })
  }
  getCategories(){
    this.categoryService.getCategories().subscribe(response=>{
      this.categories = response.data;
    })
  }
  deleteCategory(category:Category){
    this.categoryService.removeCategory(category).subscribe(response=>{
      if(response.success){
        this.toastrService.success("Kategori silindi");
        this.getCategories();
      }else{
        this.toastrService.error("Kategori silinemedi");
      }
    },responseError=>{
      console.log(responseError);
      this.toastrService.error(responseError.error.message);
    })
  }
}
