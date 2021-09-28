import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
  user;

  constructor(private auth:AuthService, private router:Router) {
    this.auth.isLoggedIn().then((user)=>{
      if(user[0]){
        console.log("user:", user[0]);
        this.user = user[0];
      }else{
        console.log("redirecting");
        this.router.navigate(['login']);
      }
    }).catch(e =>{
      console.log(e);
    })
  }

  

  ngOnInit(): void {
    
  }

  onClick(el){
    console.log(el);
    if(!el.classList.contains('selected')){
      var selecteds = document.getElementsByClassName('selected');
      for(let i = 0; i < selecteds.length; i++){
        selecteds[i].classList.remove('selected');
      }
      el.classList.add('selected');
    }
  }

  onLogOut(){
    this.auth.logout();
  }

}
