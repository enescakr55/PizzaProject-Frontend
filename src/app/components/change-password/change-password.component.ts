import { ChangePasswordDto } from './../../models/changePasswordDto';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  txtOldPassword: string;
  txtNewPassword: string;
  txtRePassword: string;
  constructor(
    private authServie: AuthService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}
  changePassword() {
    if (this.txtNewPassword == this.txtRePassword) {
      let changepasswordDto: ChangePasswordDto = {"newPassword":this.txtNewPassword,"oldPassword":this.txtOldPassword}
      this.authServie.changePasswordForLoggedUser(changepasswordDto).subscribe(
        (response) => {
          if (response.success) {
            this.toastrService.success(response.message);
          } else {
            this.toastrService.error(response.message);
          }
        },
        (responseError) => {
          console.log(responseError);
          if (responseError.error.data != undefined) {
            responseError.error.data.forEach((data) => {
              this.toastrService.error(data.errorMessage);
            });
          } else {
            if (responseError.error.message != undefined) {
              this.toastrService.error(responseError.error.message);
            }
          }
        }
      );
    } else {
      this.toastrService.error('Yeni Şifre ve Şifre Tekrarı aynı değil');
    }
  }
}
