import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User  ;
  isloading: boolean = true;
  constructor(private router: Router, private auth: AuthService) {
    if (this.auth.isLoggedIn()) {
      this.auth.isLoggedIn().then((user) => {
        if (user[0]) {
          console.log("user:", user[0]);
          
          this.user = user[0];
        } else {
          console.log("redirecting");
          this.router.navigate(['login']);
        }
      }).catch(e => {
        console.log(e);
      })
    }else{
      this.isloading = false;
    }
  }

  ngOnInit(): void {
  }

  enterSubmit(event) {
    if (event.keyCode == 13) {
      this.search(event.target.value);
    }
  }

  search(value) {
    window.location.href = '/results?search=' + value;
  }
}
