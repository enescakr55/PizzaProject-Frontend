import { ToastrService } from 'ngx-toastr';
import { User } from './../../models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { StringifyOptions } from 'querystring';

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.css']
})
export class AccountUpdateComponent implements OnInit {
  currentUser:User;
  txtFirstName:string;
  txtLastName:string;
  txtAddress:string;
  txtPhoneNumber:string;
  constructor(private authService:AuthService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.authService.getLoggedUser().subscribe(response=>{
      this.currentUser = response.data;
      this.txtFirstName = this.currentUser.firstName;
      this.txtLastName = this.currentUser.lastName;
      this.txtAddress = this.currentUser.address;
      this.txtPhoneNumber = this.currentUser.phoneNumber;
    });
  }
  updateProfile(){
    let newUser:User = {"address":this.txtAddress,"firstName":this.txtFirstName,"lastName":this.txtLastName,"password":"","phoneNumber":this.txtPhoneNumber,"username":""};
    this.authService.updateUser(newUser).subscribe(response=>{
      if(response.success){
        this.toastrService.success(response.message);
      }else{
        this.toastrService.error(response.message);
      }
    },responseError=>{
      this.toastrService.error("Hesap bilgileri güncellenemedi");
    })
  }

}
