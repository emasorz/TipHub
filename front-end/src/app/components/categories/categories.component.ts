import { Component, OnInit } from '@angular/core';
declare var $: any
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //script for tab animation
    $(".nav-tabs a").click(function() {
      var position = $(this).parent().position();
      var padding = $(this).parent()
      var width = $(this).parent().width();
        $(".slider").css({"left":+ position.left,"width":width});
        console.log(padding);
    });
    var actWidth = $(".nav-tabs .active").width();
    var actPosition = $(".nav-tabs .active").position();
    $(".slider").css({"left":+ actPosition.left,"width": actWidth});
    //------------------------------------------------------------//
  }

}
