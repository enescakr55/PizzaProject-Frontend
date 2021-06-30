import { LocalStorageService } from 'src/app/services/local-storage.service';
import { OrderStatus } from './../../models/orderStatus';
import { Order } from './../../models/order';
import { OrderStatusService } from './../../services/order-status.service';
import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pizza-tracker',
  templateUrl: './pizza-tracker.component.html',
  styleUrls: ['./pizza-tracker.component.css']
})
export class PizzaTrackerComponent implements OnInit {
  trackerCode:string;
  order:Order;
  status:OrderStatus;
  success:boolean;
  otomatikIslem:boolean = false;
  constructor(private orderService:OrderService,private statusService:OrderStatusService,private localStorageService:LocalStorageService ) { }

  ngOnInit(): void {
    if(this.getCurrentCode != null){
      this.trackerCode = this.getCurrentCode();
      this.otomatikIslem = true;
      this.getOrder();
    }
  }
  getCurrentCode(){
    if(this.localStorageService.storageIsSet("tracker")){
      return this.localStorageService.storageGetValue("tracker");
    }
    return null;
  }
  getOrder(){
    this.orderService.getOrderByTrackerCode(this.trackerCode).subscribe(response=>{
      this.order = response.data;
      if(response.data != null){
      if(this.order.statusId != null){
        this.success = true;
        this.getStatusById(response.data.statusId);
      }
      }else{
        this.success =false;
      }
      
      
    })
  }
  getStatusById(id:number){
    this.statusService.getStatusById(id).subscribe(response=>{
      console.log(response);
      this.status = response.data;
    })
  }

}
