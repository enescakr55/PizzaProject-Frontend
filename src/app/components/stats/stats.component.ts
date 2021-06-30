import { OrderService } from './../../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { PizzaOrder } from './../../models/pizzaOrder';
import { Component, OnInit } from '@angular/core';
import { PizzaService } from 'src/app/services/pizza.service';
import { Pizza } from 'src/app/models/pizza';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  pizzaOrders:PizzaOrder[] =[];
  pizzas:Pizza[] = [];
  allpizzas:Pizza[] = [];
  totalPrice:number = 0;
  satilanPizzaSayisi = 0;
  alinanSiparisSayisi = 0;
  encoksatilanurun:Pizza = undefined;
  enazsatilanurun:Pizza = undefined;
  encoksatilanurunadet:number;
  enazsatilanurunadet:number;
  pizzaids:Array<number> = Array<number>();
  pizzasatissayilari:Array<{pizza:Pizza,count:number}>;
  constructor(private toastrService:ToastrService,private orderService:OrderService,private pizzaService:PizzaService) { }

  ngOnInit(): void {
    this.getOrders();
    
    
  }
  findSellCount(){
    let satislar:Array<{pizza,count}> = [];
    this.allpizzas.forEach(selectedmainpizza => {
      let count = 0;
      this.pizzaids.forEach(sp => {
        if(sp == selectedmainpizza.id){
          count+=1;
        }
      });
      satislar.push({"pizza":selectedmainpizza,"count":count});
    });
    this.pizzasatissayilari = satislar;
    console.log("asd");
    console.log(this.pizzasatissayilari);
    this.enCokSatilaniBul();
    this.enAzSatilaniBul();
  }
  enCokSatilaniBul(){
    let maxid:Pizza;
    let maxcount:number = 0;
    this.pizzasatissayilari.forEach(p => {
      if(p.count>=maxcount){
        maxcount = p.count;
        maxid = p.pizza;
      }
    });
    console.log("Max ids");
    console.log(maxcount);
    this.encoksatilanurun = maxid;
    this.encoksatilanurunadet = maxcount;
    return maxid;
  }
  enAzSatilaniBul(){
    let minid:Pizza;
    let mincount:number = 999999999;
    this.pizzasatissayilari.forEach(p => {
      if(p.count <= mincount){
        minid = p.pizza;
        mincount = p.count;
      }
    });
    this.enazsatilanurunadet = mincount;
    console.log("Min");
    console.log(mincount);
    this.enazsatilanurun = minid;
    return minid;
  }
  getOrders(){
    let ids:number[] = [];
    this.orderService.getPizzaOrders().subscribe(response=>{
      this.pizzaOrders = response.data;
      this.pizzaOrders.forEach(pizzaOrder => {
        pizzaOrder.orderHelpers.forEach(helper=> {
          this.getPizzaById(helper.productId);
          this.satilanPizzaSayisi+=1;
          ids.push(helper.productId);
        });
        
      });
      this.pizzaids = ids;
      this.alinanSiparisSayisi = this.pizzaOrders.length;
      this.getTotalEarnings();
      console.log(this.pizzaOrders);
      this.getPizzass();
    },errorResponse=>{
      this.toastrService.error(errorResponse.error.message);
    })
  }
  getPizzaById(pizzaId:number){
    this.pizzaService.getPizzaById(pizzaId).subscribe(response=>{
      this.pizzas[pizzaId] = response.data;
    })
  }
  getTotalEarnings(){
    this.totalPrice = 0;
    this.pizzaOrders.forEach(pizzaorder => {
      this.totalPrice += pizzaorder.order.totalPrice;
      
    });
    console.log(this.totalPrice);
    
  }
  getPizzass(){
    this.pizzaService.getPizzas().subscribe(response=>{
      this.allpizzas = response.data;
      this.findSellCount();
    });
    
  }
}
