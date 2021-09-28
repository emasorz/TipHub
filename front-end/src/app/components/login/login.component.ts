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

  @ViewChild(MessageBoxComponent) messageBox: MessageBoxComponent;

  constructor(private authService:AuthService, private spinner: NgxSpinnerService, private router: Router) { 
    this.isLoading = false;
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.isLoading = true;
    this.spinner.show();
    this.authService.login(this.email, this.password).subscribe(res => {
      console.log(res);
      if(res.ok){
        this.messageBox.fire("Log in avvenuto con successo! Puoi andare sul tuo profilo da", MsgCode.Success);
        this.router.navigate(['/profile/emasorz']);
      }else{
        this.messageBox.fire("Qualcosa è andato storto! Riprova controllando che email e password siano corrette!", MsgCode.Danger);
      }
      this.spinner.hide();
      this.isLoading = false;
    })
  }

}
