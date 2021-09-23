import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {
  user;
  constructor(private auth: AuthService, private router:Router) { 
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

}
