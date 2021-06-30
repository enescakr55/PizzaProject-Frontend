import { AuthService } from './../../services/auth.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { LoginInfo } from './../../models/loginInfo';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from './../../models/loginModel';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  txtUsername:string;
  txtPassword:string;
  islogged:boolean = false;
  currentUser:User;
  isLoggedLoaded:boolean = false;
  constructor(private adminService:AdminService,private toastrService:ToastrService,private localStorageService:LocalStorageService,private authService:AuthService) { }

  ngOnInit(): void {
    this.isLogged();
    this.getLoggedUser();
  }
  login(){
    let loginModel:LoginModel = {"username":this.txtUsername,"password":this.txtPassword};
    this.adminService.login(loginModel).subscribe(response=>{
      this.localStorageService.storageRemoveValue("sessionKey");
      this.localStorageService.storageRemoveValue("loggedUserId");
      this.localStorageService.storageRemoveValue("isadmin");
      if(response.success){

        this.toastrService.success(response.message);
        this.localStorageService.storageSetValue("sessionKey",response.data.sessionKey);
        this.localStorageService.storageSetValue("loggedUserId",response.data.userId.toString());
        this.adminService.isStaff().subscribe(response=>{
          if(response.success){
            this.localStorageService.storageSetValue("isadmin","1");
          }
        })
        this.isLogged();
        
      }
    },responseError=>{
      this.toastrService.error(responseError.error.message);
      this.isLogged();
    })
  }
  isLogged(){
    return this.adminService.isLogged().subscribe(response=>{
      this.isLoggedLoaded = true;
      this.islogged = response.success;
      this.getLoggedUser();
    })
  }
  getLoggedUser(){
    if(this.islogged == true){
      this.authService.getLoggedUser().subscribe(response=>{
        if(response.success){
          this.currentUser = response.data;
          console.log(this.currentUser);
        }
      },responseError=>{
        console.log(responseError);
        this.toastrService.error(responseError.error.message);
      })
    }

  }
}
