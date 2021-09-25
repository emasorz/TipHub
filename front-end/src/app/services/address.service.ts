import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../models/address.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http:WebRequestService) { }

  getAddress(userId):Observable<Address[]>{
    return this.http.get<Address[]>(`users/${userId}/addresses`);
  }

  postAddress(userId:string, address:Address):Observable<Address>{
    return this.http.post<Address>(`users/${userId}/addresses`, address);
  }

  deleteAddress(userId:string, addressId:string):Observable<Address>{
    return this.http.delete<Address>(`users/${userId}/addresses/${addressId}`);
  }
}
