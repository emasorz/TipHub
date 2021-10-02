import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { AuthService } from './auth.service';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: WebRequestService) { }

  getProducts(userId:string, postId:string):Observable<Product[]>{
    return this.http.get<Product[]>(`users/${userId}/productposts/${postId}/product`);
  }

  postProduct(userId:string, postId:string, product:Product):Observable<Product>{
    return this.http.post<Product>(`users/${userId}/productposts/${postId}/product`, product);
  }
  patchProduct(userId:string, postId:string, productId:string , product:Product){
    return this.http.patch(`users/${userId}/productposts/${postId}/product/${productId}` , product);
  }
  deleteProduct(userId:string, postId:string, productId:string):Observable<Product>{
    return this.http.delete<Product>(`users/${userId}/productposts/${postId}/product/${productId}`);
  }
}
