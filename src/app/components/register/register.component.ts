import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { User } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  txtUsername:string;
  txtPassword:string;
  txtFirstName:string;
  txtLastName:string;
  txtPhoneNumber:string;
  txtAddress:string;
  constructor(private authService:AuthService,private toastrService:ToastrService) { }

  ngOnInit(): void {

  }
  register(){
    let user:User = {"firstName":this.txtFirstName,"lastName":this.txtLastName,"password":this.txtPassword,"phoneNumber":this.txtPhoneNumber,"username":this.txtUsername,"address":this.txtAddress};
    this.authService.register(user).subscribe(response=>{
      console.log(response);
      if(response.success){
        this.toastrService.success(response.message);
      }else{
        this.toastrService.error(response.message);
      }
    },responseError=>{
      console.log(responseError);
      if(responseError.error.data != undefined){
        responseError.error.data.forEach(data => {
          this.toastrService.error(data.errorMessage);
        });
      }else{
        if(responseError.error.message != undefined){
          this.toastrService.error(responseError.error.message);
        }
      }

    })
  }
}
