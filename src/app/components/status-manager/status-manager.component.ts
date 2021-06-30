import { ToastrService } from 'ngx-toastr';
import { OrderStatus } from './../../models/orderStatus';
import { Component, OnInit } from '@angular/core';
import { OrderStatusService } from 'src/app/services/order-status.service';

@Component({
  selector: 'app-status-manager',
  templateUrl: './status-manager.component.html',
  styleUrls: ['./status-manager.component.css']
})
export class StatusManagerComponent implements OnInit {
txtStatusName:string;
txtIdStr:string;
statuses:OrderStatus[];
  constructor(private statusService:OrderStatusService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getStatuses();
  }
  addStatus(){
    let orderStatus:OrderStatus = {"idStr":this.txtIdStr,"statusName":this.txtStatusName};
    this.statusService.addStatus(orderStatus).subscribe(response=>{
      if(response.success){
        this.toastrService.success("Durum eklendi");
        this.getStatuses();
      }else{
        this.toastrService.error("Durum eklenemedi");
      }
    },responseError=>{
      console.log(responseError);
      this.toastrService.error(responseError.error.message);
    })
  }
  getStatuses(){
    this.statusService.getAllStatus().subscribe(response=>{
      this.statuses = response.data;
    })
  }
  deleteStatus(statusId:number){
    this.statusService.deleteStatus(statusId).subscribe(response=>{
      console.log(response);
      if(response.success){
        this.toastrService.success("Durum silindi");
        this.getStatuses();
      }else{
        this.toastrService.error("Durum silinemedi");
      }
    },responseError=>{
      console.log(responseError);
      this.toastrService.error("Durum silinemedi. Lütfen hiçbir siparişin durumunun silmeye çalıştığınız durumda olmadığından emin olun");
    })
  }
}
