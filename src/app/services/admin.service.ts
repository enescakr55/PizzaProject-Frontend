import { environment } from './../../environments/environment';
import { ResponseModel } from './../models/responseModel';
import { LoginModel } from './../models/loginModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { SingleResponseModel } from '../models/singleResponseMode';
import { LoginInfo } from '../models/loginInfo';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private localStorageService:LocalStorageService,private httpClient:HttpClient) { }
  login(loginModel:LoginModel):Observable<SingleResponseModel<LoginInfo>>{
    return this.httpClient.post<SingleResponseModel<LoginInfo>>(environment.siteUrl+environment.authApi+"login",loginModel);
  }
  isAdminMode():boolean{
    return this.localStorageService.storageIsSet("admin");
  }
  toggleAdminMode(){
    if(this.localStorageService.storageIsSet("admin")){
      this.localStorageService.storageRemoveValue("admin");
    }else{
      this.localStorageService.storageSetValue("admin","1");
    }
  }
  logoutAccount(sessionKey:string):Observable<ResponseModel>{
    return this.httpClient.get<ResponseModel>(environment.siteUrl+environment.authApi+"logout?sessionKey="+sessionKey);
  }
  isLogged(){
    return this.httpClient.get<ResponseModel>(environment.siteUrl+environment.authApi+"islogged");
  }
  isStaff(){
    return this.httpClient.get<ResponseModel>(environment.siteUrl+environment.authApi+"isstaff");
  }
}
