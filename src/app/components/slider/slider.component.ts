import { Slider } from './../../models/slider';
import { SliderService } from './../../services/slider.service';
import { Component, OnInit } from '@angular/core';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  sliders:Slider[];
  count:number = 0;
  constructor(private pizzaService:PizzaService,private sliderService:SliderService) { }

  ngOnInit(): void {
    this.getSliders();
  }
  getSliders(){
    this.count = 0;
    this.sliderService.getSlides().subscribe(response=>{
      this.sliders = response.data;
      this.count = response.data.length;
    })
  }
  setClass(itemId:number){
    if(itemId == this.sliders[0].id){
      return "active";
    }
    return "";
  }

}
