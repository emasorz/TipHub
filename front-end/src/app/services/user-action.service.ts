import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class UserActionService {

  userId:string;
  productpostId:string;

  constructor(private http: WebRequestService) { }

  // getProduct(): Observable<Product[]> {
  //   let userId = '60efccf23f045226ac85337b';
  //   let productPostId = '610007be58ce5f248037e126';
  //   return this.webService.get(`users/${userId}/productposts/${productPostId}/product`)
  //     .pipe(
      
  //       map((data: any) => {
  //         console.log(data);
  //         return data.map((product) => {
  //           return new Product({
  //             price: product['price'],
  //             quantity: product['quantity'],
  //             thingsCategory: product['thingsCategory'],
  //             img: product['img']
  //           });
  //         });
  //       }),
  //     )
  // }
}
