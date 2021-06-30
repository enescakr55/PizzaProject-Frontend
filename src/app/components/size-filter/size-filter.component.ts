import { LocalStorageService } from './../../services/local-storage.service';
import { SizeFilterService } from './../../services/size-filter.service';
import { Component, OnInit } from '@angular/core';
import { Size } from 'src/app/models/size';

@Component({
  selector: 'app-size-filter',
  templateUrl: './size-filter.component.html',
  styleUrls: ['./size-filter.component.css']
})
export class SizeFilterComponent implements OnInit {
  isSizeFilter:boolean = false;
  sizeFilter:Size = null;
  sizes:Size[];
  constructor(private sizeFilterService:SizeFilterService,private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.getSizes();
    this.removeSizeFilter();
  
  }
  getSizes(){
    this.sizeFilterService.getSizes().subscribe(response=>{
      this.sizes = response.data;
    })
  }
  setSize(sizeId:number){
    this.sizeFilter = undefined;
    this.sizes.forEach(size => {
      if(size.id == sizeId){
        this.sizeFilter = size;
        this.isSizeFilter = true;
      }
    });
  }
  selectSize(sizeId:number){
    this.localStorageService.storageSetValue("size",sizeId.toString());
    this.isSizeFilter = true;
  }
  removeSizeFilter(){
    this.sizeFilter = undefined;
    this.localStorageService.storageRemoveValue("size");
    this.isSizeFilter = false;
  }
  isSelected(id:number){
    if(id == 1){
      return "selected";
    }
    return null;
  }
  isActive(id:number){
    if(this.localStorageService.storageIsSet("size")){
      if(this.localStorageService.storageGetValue("size") == id.toString()){
        return "active";
      }
    }
    return "";
  }

}
