import { ToastrService } from 'ngx-toastr';
import { SizeService } from './../../services/size.service';
import { OrderService } from './../../services/order.service';
import { OrderStatus } from './../../models/orderStatus';
import { Size } from './../../models/size';
import { PizzaOrder } from './../../models/pizzaOrder';
import { Component, OnInit } from '@angular/core';
import { Pizza } from 'src/app/models/pizza';
import { PizzaService } from 'src/app/services/pizza.service';
import { OrderStatusService } from 'src/app/services/order-status.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  pizzaOrders:PizzaOrder[] = [];
  pizzas:Pizza[] = [];
  sizes:Size[];
  statuses:OrderStatus[] = [];
  dataLoaded=false;
  loadingError=false;

  
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
    this.orderService.getPizzaOrdersBySession().subscribe(response=>{
      if(response.success){
        this.dataLoaded = true;
      }else{
        this.dataLoaded = true;
        this.loadingError = true;
      }
      this.pizzaOrders = response.data;
      this.pizzaOrders.forEach(pizzaOrder => {
        pizzaOrder.orderHelpers.forEach(helper=> {
          this.getPizzaById(helper.productId);
          
        });
      });
      console.log(this.pizzaOrders);
    },errorResponse=>{
      this.dataLoaded = true;
      this.loadingError = true;
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
