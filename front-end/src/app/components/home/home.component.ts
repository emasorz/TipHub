import { Component, OnInit } from '@angular/core';
import TypeIt from "typeit";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  //   new TypeIt("#hero", {
  //     speed: 100,
  //     startDelay: 900
  //   })
  //     .type("Inspiration comes before the", {delay: 100})
  //     .type("<b> TREND</b>", {speed:150,delay:600})
  //     .delete(5,{speed:150})
  //     .type("<b>SOCIAL</b>", {speed:150,delay:900})
  //     .delete(6,{speed:150})
  //     .type("<b>PEOPLE</b>", {speed:150,delay:900})
  //     .delete(6, {speed:150})
  //     .type("<b>TREND</b>", {speed:150,delay:900})
  //     .go();
  }

}
