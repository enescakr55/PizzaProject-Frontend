import { OrderStatusService } from './../../services/order-status.service';
import { OrderStatus } from './../../models/orderStatus';
import { ToastrService } from 'ngx-toastr';
import { SizeService } from './../../services/size.service';
import { Size } from './../../models/size';
import { OrderHelper } from './../../models/orderHelper';
import { PizzaOrder } from './../../models/pizzaOrder';
import { Order } from './../../models/order';
import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { PizzaService } from 'src/app/services/pizza.service';
import { Pizza } from 'src/app/models/pizza';
import { AsyncSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-current-orders',
  templateUrl: './current-orders.component.html',
  styleUrls: ['./current-orders.component.css']
})
export class CurrentOrdersComponent implements OnInit {
  pizzaOrders:PizzaOrder[] = [];
  pizzas:Pizza[] = [];
  sizes:Size[];
  statuses:OrderStatus[] = [];
  
  constructor(private orderService:OrderService,private pizzaService:PizzaService,private sizeService:SizeService,private toastrService:ToastrService,private statusService:OrderStatusService) { }

  ngOnInit(): void {
    this.getOrders();
    this.getSizes();
    this.getAllStatuses();

    console.log(this.pizzaOrders);
  }
  hideCompletedPizzas(){
    this.pizzaOrders = this.pizzaOrders.filter(p=>p.order.statusId !== 4);
  }
  getOrders(){
    this.orderService.getPizzaOrders().subscribe(response=>{
      this.pizzaOrders = response.data;
      this.pizzaOrders.forEach(pizzaOrder => {
        pizzaOrder.orderHelpers.forEach(helper=> {
          this.getPizzaById(helper.productId);
          
        });
      });
      console.log(this.pizzaOrders);
    },errorResponse=>{
      this.toastrService.error(errorResponse.error.message);
    })
  }
  getPizzaById(pizzaId:number){
    this.pizzaService.getPizzaById(pizzaId).subscribe(response=>{
      this.pizzas[pizzaId] = response.data;
    })
  }
  getSizes(){
    this.sizeService.getSizes().subscribe(response=>{
      this.sizes = response.data;
    })
  }
  paymentType(paytype:boolean){
    if(paytype)
      return "Kart ile ödendi";
    return "Kapıda ödeme ile ödenecek";
  }
  getSizeName(id:number){
    if(this.sizes != undefined){
      let size:Size = this.sizes.find(p=>p.id == id);
     // console.log(size);
      return size.sizeName;
    }
    return null;

  }
  updateStatus(tracker:string,statusId:number){
    this.orderService.getOrderByTrackerCode(tracker).subscribe(response=>{
      let order = response.data;
      if(order != null){
        order.statusId = statusId;
        this.orderService.updateOrder(order).subscribe(response=>{
          if(response.success){
            this.toastrService.success("Sipariş durumu güncellendi");
            this.getOrders();
          }
        },errorResponse=>{
          this.toastrService.error(errorResponse.error.message);
        })
      }
    })
  }
  getAllStatuses(){
    this.statusService.getAllStatus().subscribe(response=>{
      this.statuses = response.data;
    })
  }
  statusNames(id:number){
    return this.statuses.find(p=>p.id === id).statusName;
  }
}
