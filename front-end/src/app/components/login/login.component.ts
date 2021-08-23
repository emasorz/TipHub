import { Component, OnInit } from '@angular/core';  
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;
  isLoading:boolean;

  constructor(private authService:AuthService, private spinner: NgxSpinnerService) { 
    this.isLoading = false;
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.isLoading = true;
    this.spinner.show();
    this.authService.login(this.email, this.password).subscribe(res => {
      console.log(res);
      this.spinner.hide();
      this.isLoading = false;
    })
  }

}
