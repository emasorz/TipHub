import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  user:User;
  constructor(private auth:AuthService, private router:Router, private userService:UserService) {
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

  onSubmit(){
    console.log(this.user);
    this.userService.patchUser(this.auth.getUserId(), this.user).subscribe((res)=>{
      console.log(res);
    })
  }

}
