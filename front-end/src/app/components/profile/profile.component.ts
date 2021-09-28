import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import MagicGrid from "magic-grid";
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';


declare var $: any

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any; //todo class
  name: string;


  video:any;
  v:any;

  constructor(private auth: AuthService, private router: Router) {
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
      window.location.href = "/login";  
    }
  }

  ngOnInit(): void {
    //script for tab animation
    $(".nav-tabs a").click(function() {
      var position = $(this).parent().position();
      var padding = $(this).parent();
      var width = $(this).parent().width();
      $(".slider").css({"left": position.left,"width":width});
    });

    var actWidth = $(".nav-tabs .active").parent().width();
    var actPosition = $(".nav-tabs .active").position();
    $(".slider").css({"left":+ actPosition.left,"width": actWidth});
    //------------------------------------------------------------//
  }

 


  refresh(): void {
   
  }


}
