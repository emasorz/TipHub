import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentMethod } from 'src/app/models/payment-method.model';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentMethodService } from 'src/app/services/payment-method.service';


@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css']
})
export class PaymentMethodsComponent implements OnInit {
  user;
  model:PaymentMethod;


  paymentMethods:PaymentMethod[];
  constructor(private auth:AuthService, private router:Router, private paymentService: PaymentMethodService) {
    this.model = new PaymentMethod();

    this.auth.isLoggedIn().then((user)=>{
      if(user[0]){
        console.log("user:", user[0]);
        this.user = user[0];
      }else{
        console.log("redirecting");
        this.router.navigate(['login']);
      }
    }).catch(e =>{
      console.log(e);
    })

    this.paymentService.getPaymentMethods(this.auth.getUserId()).subscribe((paymentMethods:PaymentMethod[])=>{
      console.log(paymentMethods);
      this.paymentMethods = paymentMethods;
    })
   }

  ngOnInit(): void {
  }

  onEyeClick(el){
    if(el.classList.contains("fa-eye")){
      el.classList.remove('fa-eye');
      el.classList.add('fa-eye-slash');
    }else{
      el.classList.remove('fa-eye-slash');
      el.classList.add('fa-eye');
    }
  }

  onSubmit(){
    console.log(this.model);
    this.paymentService.postPaymentMethod(this.auth.getUserId(), this.model).subscribe((newPaymentMethod:PaymentMethod)=>{
      console.log(newPaymentMethod);
      this.paymentMethods.push(newPaymentMethod);
    })
  }

  onDelete(paymentMethodId:string){
    this.paymentService.deletePaymentMethod(this.auth.getUserId(), paymentMethodId).subscribe((deletedPaymentMethod:PaymentMethod)=>{
      console.log(deletedPaymentMethod);
      this.paymentMethods.splice(this.paymentMethods.map(e=>{return e['_id']}).indexOf(paymentMethodId),1);
    })
  }
}
