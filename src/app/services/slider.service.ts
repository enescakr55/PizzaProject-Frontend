import { ListResponseModel } from './../models/listResponseModel';
import { Slider } from './../models/slider';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor(private httpClient:HttpClient) { }
  getSlides():Observable<ListResponseModel<Slider>>{
    return this.httpClient.get<ListResponseModel<Slider>>(environment.siteUrl+environment.slidersApi+"getall");
  }
  addSlides(slider:Slider):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.siteUrl+environment.slidersApi+"addslider",slider);
  }
  deleteSlides(slider:Slider):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.siteUrl+environment.slidersApi+"deleteslider",slider);
  }
}
