import { Component, OnInit, ViewChild } from '@angular/core';  
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { MessageBoxComponent, MsgCode } from '../common/message-box/message-box.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;
  isLoading:boolean;
  rememberMe:boolean;

  @ViewChild(MessageBoxComponent) messageBox: MessageBoxComponent;

  constructor(private authService:AuthService, private spinner: NgxSpinnerService, private router: Router) { 
    this.isLoading = false;
    this.rememberMe = false;
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.isLoading = true;
    this.spinner.show();
    this.authService.login(this.email, this.password, this.rememberMe).subscribe(res => {
      console.log(res);
      if(!res.body.error){
        this.messageBox.fire("Log in avvenuto con successo! Puoi andare sul tuo profilo da", MsgCode.Success);
        window.location.href = '/profile/emasorz';
      }else{
        this.messageBox.fire("Qualcosa è andato storto: " + res.body.error, MsgCode.Danger);
      }
      this.spinner.hide();
      this.isLoading = false;
    })
  }

}
