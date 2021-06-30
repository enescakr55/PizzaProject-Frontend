import { environment } from './../../environments/environment';

import { ResponseModel } from './../models/responseModel';
import { Category } from './../models/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient:HttpClient) { }
  getCategories():Observable<ListResponseModel<Category>>{
   return this.httpClient.get<ListResponseModel<Category>>(environment.siteUrl+environment.categoriesApi+"getall");
  }
  addCategory(category:Category){
    return this.httpClient.post<ResponseModel>(environment.siteUrl+environment.categoriesApi+"add",category);
  }
  removeCategory(category:Category){
    return this.httpClient.post<ResponseModel>(environment.siteUrl+environment.categoriesApi+"delete",category);
  }
}
