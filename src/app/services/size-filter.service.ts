import { environment } from './../../environments/environment';

import { ListResponseModel } from './../models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Size } from '../models/size';

@Injectable({
  providedIn: 'root'
})
export class SizeFilterService {

  constructor(private httpClient:HttpClient) { }
  getSizes():Observable<ListResponseModel<Size>>{
    return this.httpClient.get<ListResponseModel<Size>>(environment.siteUrl+environment.sizesApi+"getall");
  }
}
