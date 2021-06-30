import { LocalStorageService } from './../services/local-storage.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AccountInterceptor implements HttpInterceptor {

  constructor(private localStorageService:LocalStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    let sessionKey = this.localStorageService.storageGetValue("sessionKey");
    if(sessionKey != null){
      let newRequest:HttpRequest<any>;
      newRequest = request.clone({
        headers:request.headers.set("sessionKey",sessionKey)
      });
      return next.handle(newRequest);
    }
    return next.handle(request);

  }
}
