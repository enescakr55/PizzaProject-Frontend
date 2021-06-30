import { Pipe, PipeTransform } from '@angular/core';
import { Pizza } from '../models/pizza';

@Pipe({
  name: 'pizzaFilter'
})
export class PizzaFilterPipe implements PipeTransform {

  transform(value: Pizza[], pizzaName:string|null,pizzaSize:number | null,pizzaCategory:number|null): Pizza[] {
    let filteredPizzas;
    filteredPizzas = value;
    if(pizzaCategory){
      filteredPizzas = filteredPizzas.filter(p=>p.categoryId == pizzaCategory);
    }
    if(pizzaSize){
      filteredPizzas = filteredPizzas.filter(p=>p.sizeId == pizzaSize);
    }
    if(pizzaName){
      filteredPizzas = filteredPizzas.filter(p=>p.pizzaName.toLowerCase().indexOf(pizzaName.toLowerCase()) !== -1);
    }
    return filteredPizzas;
  }

}
