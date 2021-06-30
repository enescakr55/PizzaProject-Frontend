import { CommentInfo } from './../../models/commentInfo';
import { CommentService } from './../../services/comment.service';
import { Size } from 'src/app/models/size';
import { SizeService } from './../../services/size.service';
import { SizeFilterService } from './../../services/size-filter.service';
import { AddCartService } from './../../services/add-cart.service';
import { Pizza } from './../../models/pizza';
import { PizzaService } from './../../services/pizza.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pizza-detail',
  templateUrl: './pizza-detail.component.html',
  styleUrls: ['./pizza-detail.component.css']
})
export class PizzaDetailComponent implements OnInit {
  error:Boolean = false;
  pizza:Pizza;
  sizes:Size[];
  commentInfos:CommentInfo[];
  isLoaded = false;
  constructor(private activatedRoute:ActivatedRoute,private pizzaService:PizzaService,private addCartService:AddCartService,private sizeService:SizeService,private commentService:CommentService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["pizzaid"]){
        console.log(params["pizzaid"]);
        this.pizzaService.getPizzaById(parseInt(params["pizzaid"])).subscribe(response=>{
          this.pizza = response.data;
          this.isLoaded = true;
          this.error = false;
        },responseError=>{
          this.error=true;
        })
        this.getComments(params["pizzaid"]);
      }else{
        this.error = true;
      }
      
    })
    this.sizeService.getSizes().subscribe(response=>{
      console.log("asdasd");
      console.log(response.data);
      this.sizes = response.data;
    })
  }
  addToCart(pizzaId:number,pizzaName:string){
    this.addCartService.addToCart(pizzaId,pizzaName);
  }
  getSizeName(id:number){
    if(this.sizes != undefined){
      let size:Size = this.sizes.find(p=>p.id == id);
      console.log(size);
      return size.sizeName;
    }
    return null;

  }
  getComments(pizzaId:number){
    this.commentService.getComments(pizzaId).subscribe(response=>{
      this.commentInfos = response.data;
    })
  }
  

}
