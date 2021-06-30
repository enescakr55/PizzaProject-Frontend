import { environment } from './../../environments/environment';
import { ResponseModel } from './../models/responseModel';
import { Pizza } from './../models/pizza';
import { SingleResponseModel } from './../models/singleResponseMode';

import { ListResponseModel } from './../models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor(private httpClient:HttpClient) { }
  getPizzas():Observable<ListResponseModel<Pizza>>{
    return this.httpClient.get<ListResponseModel<Pizza>>(environment.siteUrl+environment.pizzasApi+"getall");
  }
  getPizzasByName(name:string):Observable<ListResponseModel<Pizza>>{
    return this.httpClient.get<ListResponseModel<Pizza>>(environment.siteUrl+environment.pizzasApi+"getbyname?name="+name);
  }
  getPizzaById(pizzaId:number):Observable<SingleResponseModel<Pizza>>{
    return this.httpClient.get<SingleResponseModel<Pizza>>(environment.siteUrl+environment.pizzasApi+"getbyid?id="+pizzaId);
  }
  addPizza(pizza:Pizza){
    return this.httpClient.post<ResponseModel>(environment.siteUrl+environment.pizzasApi+"add",pizza);
  }
  deletePizza(pizza:Pizza):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.siteUrl+environment.pizzasApi+"delete",pizza);
  }
  updatePizza(pizza:Pizza):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.siteUrl+environment.pizzasApi+"update",pizza);
  }

}
