import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { WebRequestService } from 'src/app/services/web-request.service';
import { Option } from 'src/app/models/option.model';
import { ProductPost } from 'src/app/models/productPost.model';
import { Product } from 'src/app/models/product.model';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


export class User {
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;

  constructor(user: User) {
    Object.assign(this, user);
  }
}

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

  constructor(private spinner: NgxSpinnerService, private webService: WebRequestService, private http: HttpClient, private auth: AuthService) {
    let userId = '60efccf23f045226ac85337b';
    let productPostId = '610007be58ce5f248037e126';
    this.options = [];
    this.spinner.show();
    this.selected = [];
    this.newProduct = new Product();
    this.products = [];

    //todo refactor: servizio a parte
    this.webService.get(`users/${this.auth.getUserId()}/variantsoptions`).subscribe((res: any) => {
      console.log("Risposta:", res);
      if (res && res.length >= 0) {
        this.spinner.hide();
        for (let i = 0; i < res.length; i++) {
          this.options.push(new Option(res[i].title, res[i].options));
        
        }
      }
    })

    //todo refactor
    this.getProduct()
      .subscribe((products: Product[]) => {
        console.log(products);
        this.products = products;
      });

  }

  ngOnInit(): void { }

  getProduct(): Observable<Product[]> {
    let userId = '60efccf23f045226ac85337b';
    let productPostId = '610007be58ce5f248037e126';
    return this.webService.get(`users/${this.auth.getUserId()}/productposts/${this.postId}/product`)
      .pipe(
      
        map((data: any) => {
          console.log(data);
          return data.map((product) => {
            return new Product({
              price: product['price'],
              quantity: product['quantity'],
              thingsCategory: product['thingsCategory'],
              img: product['img']
            });
          });
        }),
      )
  }

  onSelectedClick(target, option: Option) {
    if (target.classList.contains('select')) {
      target.classList.remove('select');
      this.selected.splice(this.selected.map(function (e) { return e.getTitle(); }).indexOf(option.getTitle()), 1);
    } else {
      target.classList.add('select')
      this.selected.push(option);
    }
  }

  createNewProduct(){
    let userId = '60efccf23f045226ac85337b';
    let productPostId = '610007be58ce5f248037e126';
    this.webService.post(`users/${this.auth.getUserId()}/productposts/${this.postId}/product`, this.newProduct).subscribe((res)=>{
      console.log(res);
      this.products.push(this.newProduct);
    })
  }
}
