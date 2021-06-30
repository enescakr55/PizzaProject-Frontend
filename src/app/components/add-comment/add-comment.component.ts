import { ToastrService } from 'ngx-toastr';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PizzaService } from 'src/app/services/pizza.service';
import { Pizza } from 'src/app/models/pizza';
import { Comment } from 'src/app/models/comment';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  txtComment:string;
  txtScore:number;
  pizzaId:number;
  oldComment:Comment;
  currentComment:Comment = {"pizzaId":0,"score":0,"text":"","userid":0};
  currentPizza:Pizza;
  update:boolean = false;
  constructor(private commentService:CommentService,private activatedRoute:ActivatedRoute,private pizzaService:PizzaService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.pizzaId = parseInt(params["pizzaid"]);
      console.log(params["pizzaid"]);
      this.pizzaService.getPizzaById(this.pizzaId).subscribe(response=>{
        this.currentPizza = response.data;
      })
      this.getComments();
      
    })
  }
  getActive(num:number){
    if(num == this.txtScore){
      return "active";
    }
    return "";
  }
  changeScore(num:number){
    this.txtScore = num;
  }
  addComment(){
    console.log(this.pizzaId)
    this.currentComment.pizzaId = this.pizzaId;
    this.currentComment.score = this.txtScore;
    this.currentComment.text = this.txtComment;
    this.currentComment.userid = 0;
    this.commentService.addComment(this.currentComment).subscribe(response=>{
      if(response.success){
        this.toastrService.success(response.message);
      }else{
        this.toastrService.error(response.message);
      }
    },errorResponse=>{
      this.toastrService.error("Değerlendirme Eklenemedi");
    });
  }
  getComments(){
    this.commentService.getMyComments(this.pizzaId).subscribe(response=>{
      if(response.data.length > 0){
        this.update = true;
        this.oldComment = response.data[0];
        this.txtComment = this.oldComment.text;
        this.txtScore = this.oldComment.score;
      }
    });
  }
  deleteComment(){
    this.commentService.deleteComment(this.oldComment.id).subscribe(response=>{
      if(response.success){
        this.toastrService.success(response.message);
      }else{
        this.toastrService.error(response.message);
      }
    },responseError=>{
      this.toastrService.error("Değerlendirme silinemedi");
    })
  }
}
