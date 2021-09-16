import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductPost } from '../models/productPost.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class ProductPostService {

  constructor(private http:WebRequestService) { }

  createProductPost(userId:string, post:ProductPost):Observable<ProductPost>{
    return this.http.post<ProductPost>(`users/${userId}/productposts?isADraft=true`, post);
  }

  getProductPost(userId:string, isADraaft:boolean):Observable<ProductPost[]>{
    return this.http.get<ProductPost[]>(`users/${userId}/productposts?isADraft=${isADraaft}`);
  }

  patchProductPost(userId:string, postId:string,  post:ProductPost):Observable<any>{
    return this.http.patch(`users/${userId}/productposts/${postId}`, post);
  }
}
