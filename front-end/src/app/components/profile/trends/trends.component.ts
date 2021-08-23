import { Component, OnInit } from '@angular/core';
import MagicGrid from "magic-grid";
import { map } from 'rxjs/operators';
import { ProductPost } from 'src/app/models/productPost.model';
import { WebRequestService } from 'src/app/services/web-request.service';


@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit {

  productPosts:ProductPost[];
  constructor(private webService: WebRequestService) {
  

    this.getPosts()
    .subscribe((res)=>{
      this.productPosts = res;
      console.log(this.productPosts);
      this.refresh();
    })
   }

   getPosts(){
    let userId = '60efccf23f045226ac85337b';
    return  this.webService.get(`users/${userId}/productposts/`)
    .pipe(
      map((data: any) => {
        console.log(data);
        return data.map((productPost) => {
          return new ProductPost({
            title: productPost['title'],
            description: productPost['description'],
            summary: productPost['summary'],
            isADraft: productPost['isADraft'],
            img:productPost['img']
          });
        });
      }),
    )
   }

  magicGridTrends:any;
  posts:ProductPost[];

  ngOnInit(): void {
 
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
    },300);
   
  }

  refresh(): void {
    setTimeout(() => this.magicGridTrends.positionItems(),300);
  }

}
