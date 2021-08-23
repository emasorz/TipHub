import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor() { }
  prices = [32, 23, 1000, 49];
  reducer = (accumulator, currentValue) => accumulator + currentValue;
  ngOnInit(): void {
  }

  remove(price){
    this.prices.splice(this.prices.indexOf(price),1);
  }

  total(){
    return this.prices.reduce(this.reducer);
  }

}
