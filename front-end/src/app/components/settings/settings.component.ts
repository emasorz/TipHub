import { ArrayType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';



interface Insta1{
  id: String;
  access_token: String;
};

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {


  constructor() {


   }

  
  


  ngOnInit(): void {
    
  }
}
