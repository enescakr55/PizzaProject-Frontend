import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent implements OnInit {
  categories:Category[] = [];
  constructor(private categoryService:CategoryService,private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
  
    this.getAllCategories();
    this.localStorageService.storageRemoveValue("categoryFilter");
  }
  getAllCategories(){
    this.categoryService.getCategories().subscribe(response=>{
      this.categories = response.data;
    })
  }
  setCategoryFilter(categoryId:number){
    this.localStorageService.storageSetValue("categoryFilter",categoryId.toString());
  }

  removeCategoryFilter(){
    this.localStorageService.storageRemoveValue("categoryFilter");
  }
  isCategoryFilter(){
    if(this.localStorageService.storageIsSet("categoryFilter")){
      return true;
    }
    return false;
  }
  isActive(id:number){
    if(this.localStorageService.storageIsSet("categoryFilter")){
      if(this.localStorageService.storageGetValue("categoryFilter") == id.toString()){
        return "active";
      }
    }
    return "";
  }

}
