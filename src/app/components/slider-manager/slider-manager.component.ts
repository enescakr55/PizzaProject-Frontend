import { PizzaService } from './../../services/pizza.service';
import { ToastrService } from 'ngx-toastr';
import { SliderService } from './../../services/slider.service';
import { Component, OnInit } from '@angular/core';
import { Slider } from 'src/app/models/slider';
import { Pizza } from 'src/app/models/pizza';

@Component({
  selector: 'app-slider-manager',
  templateUrl: './slider-manager.component.html',
  styleUrls: ['./slider-manager.component.css']
})
export class SliderManagerComponent implements OnInit {
  sliders:Slider[];
  txtSliderTitle:string;
  txtSliderDesc:string;
  txtSliderImg:string;
  txtSliderPizzaId:string;
  pizzas:Pizza[];
  constructor(private sliderService:SliderService,private toastrService:ToastrService,private pizzaService:PizzaService) { }

  ngOnInit(): void {
  this.getSliders();
  this.getPizzas();
  }
  getPizzas(){
    this.pizzaService.getPizzas().subscribe(response=>{
      this.pizzas = response.data;
    })
  }
  getPizzaPrice(pizzaId:number){
    return this.pizzas.find(p=>p.id == pizzaId).price;
  }
  findPizzaNameById(pizzaid:number){
    if(this.pizzas){
     return this.pizzas.find(p=>p.id == pizzaid).pizzaName;
    }
    return "";
    
  }
  getSliders(){
    this.sliderService.getSlides().subscribe(response=>{
      this.sliders = response.data;
    })
  }
  deleteSlider(slider:Slider){
    this.sliderService.deleteSlides(slider).subscribe(response=>{
      if(response.success){
        this.toastrService.success(response.message);
        this.getSliders();
      }else{
        this.toastrService.error(response.message);
      }
    },responseError=>{
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
  addSlider(){
    if(this.txtSliderPizzaId == null){
      this.toastrService.error("Lütfen kampanya için bir pizza seçin");
      return;
    }
    let slider:Slider = {"title":this.txtSliderTitle,"pizzaId":parseInt(this.txtSliderPizzaId),"imageUrl":this.txtSliderImg,"description":this.txtSliderDesc};
    this.sliderService.addSlides(slider).subscribe(response=>{
      console.log(response);
      if(response.success){
        this.toastrService.success(response.message);
      }
      else{
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
