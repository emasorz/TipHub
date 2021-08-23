import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

import { Register } from 'src/app/models/register.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { AmazonLoginProvider, FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  model: Register;
  isLoading: boolean;
  successful:boolean;
  email1;

  socialUser:SocialUser;
  isLoggedin:boolean;

  constructor(private authService: AuthService, private spinner: NgxSpinnerService, private socialAuthService: SocialAuthService) {
    this.model = new Register();
    this.isLoading = false;
    this.successful = false;
  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      console.log(this.socialUser, this.isLoggedin);
    });
  }

  onSubmit(form) {
    console.log(form);
    if (form.valid) {
      //alert("Submitted: " + JSON.stringify(this.model));
      this.spinner.show();
      this.isLoading = true;
      this.authService.signup(this.model.username, this.model.email, this.model.password).subscribe((res: HttpResponse<any>) => {
        console.log(res);
        if(res.status==200){
          this.spinner.hide();  
          this.isLoading = false;
          this.successful = true;
        }
      });
    }
  }

  loginWithAmazon(): void{
    this.socialAuthService.signIn(AmazonLoginProvider.PROVIDER_ID);
  }

  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }



loginWithGoogle(): void {
  this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) =>{
    console.log(data);
  });
}

logOut(): void {
  this.socialAuthService.signOut();
}


}
