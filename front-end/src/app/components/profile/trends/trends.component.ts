import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import MagicGrid from "magic-grid";
import { map } from 'rxjs/operators';
import { ProductPost } from 'src/app/models/productPost.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductPostService } from 'src/app/services/product-post.service';
import { WebRequestService } from 'src/app/services/web-request.service';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})

export class TrendsComponent implements OnInit {
  user: any;
  productPosts: ProductPost[];

  newPostId:string;


  constructor(private webService: WebRequestService, private auth: AuthService, private router: Router,private productPostService:ProductPostService) {
    this.auth.isLoggedIn().then((user) => {
      if (user[0]) {
        this.user = user[0];
        this.productPostService.getProductPost(this.auth.getUserId(), false)
          .subscribe((productPosts:ProductPost[]) => {
            this.productPosts = productPosts;
            this.refresh();
          })
      } else {
        console.log("redirecting");
        this.router.navigate(['login']);
      }
    }).catch(e => {
      console.log(e);
    })
  }

  // () {
  //   let userId = this.user['_id'];
  //   return this.webService.get(`users/${userId}/productposts?isADraft=true`)
  //     .pipe(
  //       map((data: any) => {
  //         return data.map((productPost:ProductPost) => {
  //            return productPost;
  //         });
  //       }),
  //     )
  // }

  magicGridTrends: any;
  posts: ProductPost[];

  ngOnInit(): void {

  }

  initProductPost(){
    this.productPostService.createProductPost(this.auth.getUserId(), new ProductPost()).subscribe((newProductPost:ProductPost)=>{
      this.newPostId = newProductPost['_id'];
    })
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.magicGridTrends = new MagicGrid({
        container: '.merch-grid-trends',
        animate: true,
        gutter: 30,
        static: true,
        useMin: true
      });

      this.magicGridTrends.listen();
      this.refresh();
    }, 300);

  }

  refresh(): void {
    setTimeout(() => this.magicGridTrends.positionItems(), 300);
  }

}
