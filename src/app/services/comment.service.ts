import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { CommentInfo } from '../models/commentInfo';
import { ResponseModel } from '../models/responseModel';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient:HttpClient) { }
  getComments(pizzaId:number):Observable<ListResponseModel<CommentInfo>>{
    return this.httpClient.get<ListResponseModel<CommentInfo>>(environment.siteUrl+environment.commentsApi+"getcomments?pizzaid="+pizzaId);
  }
  addComment(comment:Comment):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.siteUrl+environment.commentsApi+"addcomment",comment);
  }
  deleteComment(commentId:number):Observable<ResponseModel>{
    return this.httpClient.get<ResponseModel>(environment.siteUrl+environment.commentsApi+"deletecomment?commentid="+commentId);
  }
  getMyComments(pizzaId:number):Observable<ListResponseModel<Comment>>{
    return this.httpClient.get<ListResponseModel<Comment>>(environment.siteUrl+environment.commentsApi+"getmycommentsbypizzaid?pizzaid="+pizzaId);
  }
}
