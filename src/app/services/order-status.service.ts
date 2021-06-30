import { environment } from './../../environments/environment';
import { ResponseModel } from './../models/responseModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderStatus } from './../models/orderStatus';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseMode';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {
  
  constructor(private httpClient:HttpClient) { }
  getAllStatus():Observable<ListResponseModel<OrderStatus>>{
    return this.httpClient.get<ListResponseModel<OrderStatus>>(environment.siteUrl+environment.statusApi+"getall");
  }
  getStatusById(statusId:number):Observable<SingleResponseModel<OrderStatus>>{
    return this.httpClient.get<SingleResponseModel<OrderStatus>>(environment.siteUrl+environment.statusApi+"getbyid?id="+statusId);
  }
  addStatus(status:OrderStatus){
    return this.httpClient.post<ResponseModel>(environment.siteUrl+environment.statusApi+"addstatus",status);
  }
  deleteStatus(statusid:number){
    return this.httpClient.get<ResponseModel>(environment.siteUrl+environment.statusApi+"deletestatus?statusid="+statusid);
  }
  
}
