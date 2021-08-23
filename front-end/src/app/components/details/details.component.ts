import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  isExpanded:boolean;
  constructor() { }

  ngOnInit(): void {
    this.isExpanded = false;
  }

  expand(){
    this.isExpanded = !this.isExpanded;
  }
}
