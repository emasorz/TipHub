import { Component, OnDestroy, OnInit } from '@angular/core';
import MagicGrid from "magic-grid";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {

  constructor() { }
  magicGridPosts:any;
  ngOnInit(): void {
    this.magicGridPosts = new MagicGrid({
      container: '.merch-grid-posts',
      animate: true,
      gutter: 30,
      static: true,
      useMin: true
    });
    
    this.magicGridPosts.listen();
    this.refresh();
  }

  
  ngAfterContentInit(): void {
   
  }

  ngOnDestroy(){
    delete this.magicGridPosts;
  }

  refresh(): void {
    setTimeout(() => this.magicGridPosts.positionItems(),200);
  }

}
