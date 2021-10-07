import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
  handleImg: boolean;
  @Input() images;
  @Input() postId;


  @ViewChild('camera') camera: ElementRef<HTMLElement>
  @ViewChild('price') price: ElementRef;
  @ViewChild('quantity') quantity: ElementRef;
  @Output() setPriceEmit = new EventEmitter<number>();

  constructor(private spinner: NgxSpinnerService, private webService: WebRequestService, private http: HttpClient, private auth: AuthService, private prodService:ProductService) { 
    this.options = JSON.parse(JSON.stringify(defaultVariantsOptions)) ;
    this.spinner.show();
    this.selected = [];
    this.newProduct = new Product();
    this.products = [];
    this.handleImg = true;

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
      this.clearInput();
      this.setPriceEmit.emit(this.postId);
    })
  }

 checkPriceInput(el) {
   console.log(el.value);
   var clean;

  if((el.value.split(".").length - 1) > 1)
    clean = el.value.substring(0, el.value.length-1);
  else
    clean = el.value.replace(/[^0-9.]/g, "");

    console.log(clean.split("."));
    if(clean.split(".").length > 1){
      console.log("comma");
      var len = clean.split(".")[1].length;
      if(len > 2){
        clean = clean.substring(0,clean.length-(len-2));
      }
    }

    if (clean !== el.value) el.value = clean;

    console.log(parseFloat(el.value));
    this.newProduct.price = parseFloat(el.value);
}

checkQuantityInput(el){
  var  clean = el.value.replace(/[^0-9]/g, "");
  if (clean !== el.value) el.value = clean;

  this.newProduct.quantity = parseInt(el.value);
}


clearInput(){
  this.price.nativeElement.value =  "";
  this.quantity.nativeElement.value = "";
}

  cameraClick(){
    let el: HTMLElement = this.camera.nativeElement;
    el.click();
  }

}
