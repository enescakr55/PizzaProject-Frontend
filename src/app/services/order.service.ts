import { environment } from './../../environments/environment';
import { ResponseModel } from './../models/responseModel';

import { ListResponseModel } from './../models/listResponseModel';
import { OrderInfo } from './../models/orderInfo';
import { SingleResponseModel } from './../models/singleResponseMode';
import { PizzaOrder } from './../models/pizzaOrder';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient:HttpClient) { }
  saveOrder(pizzaOrder:PizzaOrder):Observable<SingleResponseModel<OrderInfo>>{
    return this.httpClient.post<SingleResponseModel<OrderInfo>>(environment.siteUrl+environment.ordersApi+"addpizzaorder",pizzaOrder);
  }
  getPizzaOrders():Observable<ListResponseModel<PizzaOrder>>{
    return this.httpClient.get<ListResponseModel<PizzaOrder>>(environment.siteUrl+environment.ordersApi+"getallpizzaorders");
  }
  getPizzaOrdersBySession():Observable<ListResponseModel<PizzaOrder>>{
    return this.httpClient.get<ListResponseModel<PizzaOrder>>(environment.siteUrl+environment.ordersApi+"getordersbysession");
  }
  getOrderByTrackerCode(tracker:string):Observable<SingleResponseModel<Order>>{
    return this.httpClient.get<SingleResponseModel<Order>>(environment.siteUrl+environment.ordersApi+"getbytracker?tracker="+tracker);
  }
  updateOrder(order:Order):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.siteUrl+environment.ordersApi+"update",order);
  }
}
