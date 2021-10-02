import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { WebRequestService } from 'src/app/services/web-request.service';
import { Option } from 'src/app/models/option.model';
import { ProductPost } from 'src/app/models/productPost.model';
import { Product } from 'src/app/models/product.model';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
var  defaultVariantsOptions = require('../../../../assets/defaults/variantsoptions.default.json');


@Component({
  selector: 'app-select-varians',
  templateUrl: './select-varians.component.html',
  styleUrls: ['./select-varians.component.css']
})
export class SelectVariansComponent implements OnInit {
  options: Option[];
  selected: Option[];
  products: Product[];
  newProduct: Product;

  @Input() images;
  @Input() postId;

  @Output() setPriceEmit = new EventEmitter<number>();

  constructor(private spinner: NgxSpinnerService, private webService: WebRequestService, private http: HttpClient, private auth: AuthService, private prodService:ProductService) { 
    this.options = JSON.parse(JSON.stringify(defaultVariantsOptions)) ;
    this.spinner.show();
    this.selected = [];
    this.newProduct = new Product();
    this.products = [];

    //todo refactor: servizio a parte
    this.webService.get(`users/${this.auth.getUserId()}/variantsoptions`).subscribe((res: any) => {

      console.log(this.auth.getUserId());
      console.log("Risposta:", res);
      if (res && res.length >= 0) {
        this.spinner.hide();
        for (let i = 0; i < res.length; i++) {
          this.options.push(new Option(res[i].title, res[i].options));
        }
      }

      this.prodService.getProducts(this.auth.getUserId(), this.postId).subscribe((products:Product[])=>{
        console.log(products);
        this.products = products;
      })
    })
  }

  ngOnInit(): void { }


  onSelectedClick(target, option: Option) {
    if (target.classList.contains('select')) {
      target.classList.remove('select');
      this.selected.splice(this.selected.map(function (e) { return e.getTitle(); }).indexOf(option.getTitle()), 1);
    } else {
      target.classList.add('select')
      this.selected.push(option);
    }
  }

  onDelete(productId){
    this.prodService.deleteProduct(this.auth.getUserId(),this.postId,  productId).subscribe(res=>{
      console.log(this.products);
      console.log(this.products.map((e) =>{return e['_id']}).indexOf(productId));
      this.products.splice(this.products.map((e) =>{return e['_id']}).indexOf(productId ),1);
    })
  }

  createNewProduct(){
    this.prodService.postProduct(this.auth.getUserId(),this.postId, this.newProduct).subscribe((res:Product)=>{
      this.products.push(res);
      this.setPriceEmit.emit(this.postId);
    })
  }

  limitPrice(event){
    let value = event.target.value;
    let decimal = value - Math.floor(value);
    if(decimal > 0 && event.key != 'Backspace')
      event.target.value = parseFloat(event.target.value).toFixed(2);   
  }


}
