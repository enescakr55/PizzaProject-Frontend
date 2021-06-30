import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddCartService {

  constructor(private httpClient:HttpClient,private localStorageService:LocalStorageService,private toastrService:ToastrService) { }
  addToCart(pizzaid:number,productName:string=null){
    if(this.localStorageService.storageIsSet("sepet")){
      let sepet = localStorage.getItem("sepet")+","+pizzaid;
      console.log("Sepetiniz");
      console.log(sepet);
      localStorage.setItem("sepet",sepet);
    }else{
      localStorage.setItem("sepet",pizzaid.toString());
    }
    if(productName == null){
      this.toastrService.success("Sepete eklendi","İşlem Başarılı");
    }else{
      this.toastrService.success(productName+ " sepete eklendi","İşlem Başarılı");
    }
    
  }
  getCartArray(){
    if(this.localStorageService.storageIsSet("sepet")){
      let arr = localStorage.getItem("sepet").split(",");
      return arr;
    }
    return undefined;

  }
  clearCart(){
    this.localStorageService.storageRemoveValue("sepet");
  }
  cartItemCount(){
    if(this.localStorageService.storageIsSet("sepet")){
      return this.getCartArray().length;
    }else{
      return 0;
    }
  }
}
