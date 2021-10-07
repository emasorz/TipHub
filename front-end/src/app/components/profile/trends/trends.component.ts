import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  col = 1;
  newPostId: string;


  constructor(private webService: WebRequestService, private auth: AuthService, private router: Router, private productPostService: ProductPostService) {
    this.auth.isLoggedIn().then((user) => {
      if (user[0]) {
        this.user = user[0];
        this.productPostService.getProductPost(this.auth.getUserId(), false)
          .subscribe((productPosts: ProductPost[]) => {
            this.productPosts = productPosts;
            this.refreshCol();
          })
      } else {
        console.log("redirecting");
        this.router.navigate(['login']);
      }
    }).catch(e => {
      console.log(e);
    })
  }

  refreshCol() {
    if (this.productPosts.length > 0)
      this.col = 2
    else
      this.col = 1;
  }


  ngOnInit(): void {

  }

  initProductPost() {
    this.productPostService.createProductPost(this.auth.getUserId(), new ProductPost()).subscribe((newProductPost: ProductPost) => {
      this.newPostId = newProductPost['_id'];
    })
  }

  addProductPost(newPost) {
    
    this.productPosts.push(newPost);
    this.refreshCol();
  }

  onDelete(post,postId: string) {
    console.log(post);
    this.productPostService.deleteProductPost(this.auth.getUserId(), postId).subscribe((deletedProductPost: ProductPost) => {
      this.productPosts.splice(this.productPosts.map((e) => { return e['_id'] }).indexOf(postId), 1);
      this.refreshCol();
    });
  }

  redirectToPost(postId){
    this.router.navigate(['/profile', 'name', 'product', postId]);
  }
}
