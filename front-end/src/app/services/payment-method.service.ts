import { Injectable } from '@angular/core';
import { PaymentMethod } from '../models/payment-method.model';
import { WebRequestService } from './web-request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  constructor(private http: WebRequestService) { }

  getPaymentMethods(userId:string):Observable<PaymentMethod[]>{
    return this.http.get<PaymentMethod[]>(`users/${userId}/payment-methods`);
  }
  postPaymentMethod(userId:string, paymentMethod:PaymentMethod):Observable<PaymentMethod>{
    return this.http.post<PaymentMethod>(`users/${userId}/payment-methods`, paymentMethod);
  }
  deletePaymentMethod(userId:string, paymentMethodId:string):Observable<PaymentMethod>{
    return this.http.delete<PaymentMethod>(`users/${userId}/payment-methods/${paymentMethodId}`);
  }
}

