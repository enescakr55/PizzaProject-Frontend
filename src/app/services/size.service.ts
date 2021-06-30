import { environment } from './../../environments/environment';
import { SingleResponseModel } from './../models/singleResponseMode';
import { ResponseModel } from './../models/responseModel';

import { ListResponseModel } from './../models/listResponseModel';
import { Size } from 'src/app/models/size';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  constructor(private httpClient:HttpClient) { }
  getSizes():Observable<ListResponseModel<Size>>{
    return this.httpClient.get<ListResponseModel<Size>>(environment.siteUrl+environment.sizesApi+"getall");
   }
   getSizeById(id:number):Observable<SingleResponseModel<Size>>{
    return this.httpClient.get<SingleResponseModel<Size>>(environment.siteUrl+environment.sizesApi+"getbyid?id="+id);
   }
   addSize(size:Size):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.siteUrl+environment.sizesApi+"add",size);
   }
   deleteSize(size:Size):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.siteUrl+environment.sizesApi+"delete",size);
   }
}
