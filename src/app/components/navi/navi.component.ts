import { LocalStorageService } from './../../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from './../../services/admin.service';
import { AddCartService } from './../../services/add-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  pizzaName:string = "";
  constructor(private addCartService:AddCartService,private adminService:AdminService,private toastrService:ToastrService,private localStorageService:LocalStorageService) { }
  
  ngOnInit(): void {
  }
  cartItemCount(){
    return this.addCartService.cartItemCount();
  }
  toggleAdminMode(){
    this.adminService.toggleAdminMode();
    if(this.adminService.isAdminMode() == true){
      this.toastrService.success("Yönetici modu açıldı");
    }else{
      this.toastrService.success("Yönetici modu kapatıldı");
    }
  }
  isAdmin(){
    if(this.adminService.isAdminMode() == true){
      return true;
    }
    return false;
  }
  isAdminPerm(){
    return this.localStorageService.storageIsSet("isadmin");
  }
  logout(){
    let session = this.localStorageService.storageGetValue("sessionKey");
    this.adminService.logoutAccount(session).subscribe(response=>{
      this.toastrService.info(response.message);
      console.log(response);
      this.localStorageService.storageRemoveValue("sessionKey");
      this.localStorageService.storageRemoveValue("loggedUserId");
      this.localStorageService.storageRemoveValue("isadmin");
      this.localStorageService.storageRemoveValue("admin");
    },responseError=>{
      this.toastrService.error(responseError.error.message);
      this.isLoggedApiControl();
    })
  }
  isLogged(){
    return this.localStorageService.storageIsSet("sessionKey");
  }
  isLoggedApiControl(){
    this.adminService.isLogged().subscribe(response=>{
      if(response.success == false){
        this.localStorageService.storageRemoveValue("sessionKey");
        this.localStorageService.storageRemoveValue("loggedUserId");
        this.localStorageService.storageRemoveValue("isadmin");
        this.localStorageService.storageRemoveValue("admin");
        this.toastrService.warning("Session key sistemde mevcut değil çıkışınız zaten gerçekleştirilmiş");
      }
    })
  }

}
