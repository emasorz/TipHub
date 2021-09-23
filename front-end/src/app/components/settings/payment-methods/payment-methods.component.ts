import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css']
})
export class PaymentMethodsComponent implements OnInit {
  constructor() {
    
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
}
