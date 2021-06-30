import { LocalStorageService } from './../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private toastrService:ToastrService,private localStorageService:LocalStorageService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.localStorageService.storageIsSet("isadmin")){
        return true;
      }
    this.toastrService.error("Bu sayfaya giriş için yetkili olmalısınız");
    return false;
  }
  
}
