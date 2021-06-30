import { AddCartService } from './../../services/add-cart.service';
import { User } from 'src/app/models/user';
import { AdminService } from './../../services/admin.service';
import { OrderService } from './../../services/order.service';
import { CreditCard } from './../../models/creditCard';
import { PizzaOrder } from './../../models/pizzaOrder';
import { OrderHelper } from './../../models/orderHelper';
import { Order } from './../../models/order';
import { Component, OnInit } from '@angular/core';
import { Pizza } from 'src/app/models/pizza';
import { PizzaService } from 'src/app/services/pizza.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cartandpay',
  templateUrl: './cartandpay.component.html',
  styleUrls: ['./cartandpay.component.css']
})
export class CartandpayComponent implements OnInit {
  pizzaids:Array<number> = [];
  uniqueids:Array<number> = [];
  order:Order;
  creditCard:CreditCard;
  orderHelper:OrderHelper;
  orderHelpers:Array<OrderHelper> = [];
  pizzaOrder:PizzaOrder;
  isHelperComplete = false;
  isOrderComplete = false;
  isCardComplete= false;
  pizzas:Array<Pizza> = [];
  pizzaLoading;
  totalPrice:number = 0;
  //Order Bilgileri
  txtFirstName:string;
  txtLastName:string;
  txtAddress:string;
  txtPhoneNumber:string;
  //CreditCard Bilgileri
  txtCardNumber:string;
  txtFullName:string;
  txtCvv:string;
  txtLastDate:string;
  txtBilgi:string|null;
  //ShowTracker
  showTracker:boolean = false;
  showInfoAndPay:boolean = false;
  payWithCard:boolean = true;
  islogged:boolean = false;
  user:User;
  constructor(private pizzaService:PizzaService,private localStorageService:LocalStorageService,private addCartService:AddCartService,private toastrService:ToastrService,private OrderService:OrderService,private authService:AuthService,private adminService:AdminService) { }

  ngOnInit(): void {
    this.getCart(); 
    this.addPizzasToArray();
    let getTotalInterval = setInterval(()=>{
      
      this.getTotal(this.pizzas,this.pizzaids)
      if(this.totalPrice != 0){
        clearInterval(getTotalInterval);
      }
      if(this.pizzaids.length == 0){
        clearInterval(getTotalInterval);
      }
    },200);
    this.createOrderHelper();
    this.isLogged();
  }
  cartItemCount(){
    return this.addCartService.cartItemCount();
  }
  getTotal(pzs:Array<Pizza>,ids:Array<Number>){
    this.totalPrice = 0;
    if(this.pizzas.length !== 0){
      console.log(this.pizzas);
      ids.forEach(id => {
        var price = this.pizzas.find(p=>p.id == id).price.toString();
        this.totalPrice +=parseFloat(price);
     });
    }

  }
  kapidaOdeme(){
    this.payWithCard = false;
  }
  kartileOdeme(){
    this.payWithCard = true;
  }
  removeCart(pizzaid:number){
    this.pizzaids = this.pizzaids.filter(p=>p !== pizzaid);
    console.log(this.pizzaids);
    this.localStorageService.storageSetValue("sepet",this.pizzaids.join());
    if(this.localStorageService.storageGetValue("sepet") == ""){
      this.localStorageService.storageRemoveValue("sepet");
    }
    this.uniqueids = this.uniqueids.filter(p=>p !== pizzaid);
    //Inıt Codes
    this.getCart(); 
    this.addPizzasToArray();
    let getTotalInterval = setInterval(()=>{
      
      this.getTotal(this.pizzas,this.pizzaids)
      if(this.totalPrice != 0){
        clearInterval(getTotalInterval);
      }
      if(this.pizzaids.length == 0){
        clearInterval(getTotalInterval);
      }
    },200);
    this.createOrderHelper();
  }
  getCart(){
    this.pizzaids = [];
    if(this.addCartService.getCartArray() != undefined){
      this.addCartService.getCartArray().forEach(pizzaId => {
        this.pizzaids.push(parseInt(pizzaId));
      });
      this.pizzaids.forEach(pizzaid => {
        this.orderHelper = {"id":0,"orderId":0,"productId":pizzaid};
        this.orderHelpers.push(this.orderHelper);
      });
      console.log(this.orderHelpers);
      this.isHelperComplete = true;
    
    }    
  }
  getPizzaById(id:number){
    this.pizzaService.getPizzaById(id).subscribe(response=>{
        this.pizzas.push(response.data);
    })
  }

  addPizzasToArray(){
    this.pizzas = [];
    let x;
    this.pizzaids.forEach(id => {
      x = false;
      this.uniqueids.forEach(uniq => {
        if(uniq == id){
          x = true;
        }
      });
      if(x == false){
        this.uniqueids.push(id);
      }
    });
    this.uniqueids.forEach(uniq => {
      this.pizzaLoading = this.pizzaService.getPizzaById(uniq).subscribe(response=>{
        this.pizzas.push(response.data);
      })
    });
  }

  countByProductId(id:number){
    let count = 0;
    this.pizzaids.forEach(element => {
      if(element == id){
        count += 1;
      }
    });
    return count;
  }
  createCreditCard(){
    let cardNumber = this.txtCardNumber;
    let cvv = this.txtCvv;
    let lastDate = this.txtLastDate;
    let fullName = this.txtFullName;
    console.log(cardNumber,cvv,lastDate,fullName);
    this.creditCard = {"id":0,"cardNumber":cardNumber,"cvv":cvv,"fullName":fullName,"lastDate":lastDate};
    console.log(this.creditCard);
    this.isCardComplete = true;
  }
  createOrder(){
    this.order = {"id":0,"firstName":this.txtFirstName,"lastName":this.txtLastName,"address":this.txtAddress,"phoneNumber":this.txtPhoneNumber,"orderCode":"0","userId":0,"payWithCard":this.payWithCard,desc:this.txtBilgi};
    this.isOrderComplete = true;
  }

  createPizzaOrder(){
    console.log("here");
    this.createOrder();
    this.createCreditCard();
    console.log(this.isOrderComplete);
    console.log(this.isHelperComplete);
    console.log(this.isCardComplete);
    let createInterval = setInterval(()=>{
      if(this.isOrderComplete && this.isHelperComplete && this.isCardComplete){
        this.pizzaOrder = {"order":this.order,"orderHelpers":this.orderHelpers,"creditCard":this.creditCard};
        this.OrderService.saveOrder(this.pizzaOrder).subscribe(response=>{
          if(response.success){
            this.toastrService.success("Sipariş başarıyla verildi");
            this.localStorageService.storageSetValue("tracker",response.data.orderCode);
            this.showTracker = true;
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
        clearInterval(createInterval);
      }
    },500);

    
  }
  showInfoAndPayToggler(bool:boolean){
    this.showInfoAndPay = bool;
  }
  getLastTrackerCode(){
    return this.localStorageService.storageGetValue("tracker");
  }
  clearCart(){
    this.addCartService.clearCart();
    this.toastrService.info("Sepetiniz temizlendi","Pizza");
  }
  logInfos(){
    console.log(this.txtAddress,this.txtCardNumber,this.txtCvv,this.txtFirstName,this.txtFullName,this.txtLastDate);
  }
  createOrderHelper(){
    this.orderHelpers = [];
    let currentCart = this.pizzaids;
    currentCart.forEach(pizzaid => {
      this.orderHelper = {"id":0,"orderId":0,"productId":pizzaid};
      this.orderHelpers.push(this.orderHelper);

    });
    this.isHelperComplete = true;
  }
  isLogged(){
    this.adminService.isLogged().subscribe(response=>{
      this.islogged = response.success;
    })
  }
  fillForm(){
    this.authService.getLoggedUser().subscribe(response=>{
      this.user = response.data;
      this.txtAddress = this.user.address;
      this.txtFirstName = this.user.firstName;
      this.txtLastName = this.user.lastName;
      this.txtPhoneNumber = this.user.phoneNumber;
    })
  }
}
