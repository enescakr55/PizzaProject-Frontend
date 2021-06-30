import { environment } from './../../environments/environment';
import { SingleResponseModel } from './../models/singleResponseMode';
import { User } from './../models/user';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }
  register(user:User):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.siteUrl+environment.authApi+"register",user);
  }
  getLoggedUser():Observable<SingleResponseModel<User>>{
    return this.httpClient.get<SingleResponseModel<User>>(environment.siteUrl+environment.authApi+"getuserbysession");
  }
  updateUser(user:User){
    return this.httpClient.post<ResponseModel>(environment.siteUrl+environment.authApi+"update",user);
  }
}
