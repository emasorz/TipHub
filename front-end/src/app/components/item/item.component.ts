import { Component, OnInit } from '@angular/core';

import {ActivatedRoute} from '@angular/router';

declare var $: any

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {

  product:string;
  id:string;
  
  constructor(private route:ActivatedRoute) {
    this.product = this.route.snapshot.paramMap.get('product');
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    $(document).ready(function () {
      $("#owl-demo").owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        items: 1,
        itemsDesktop: false,
        itemsDesktopSmall: false,
        itemsTablet: false,
        itemsMobile: false,
        dots: true,
      });

    });
  }


}
