import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { MessageBoxComponent,MsgCode } from '../common/message-box/message-box.component';

@Component({
  selector: 'app-mail-verification',
  templateUrl: './mail-verification.component.html',
  styleUrls: ['./mail-verification.component.css']
})
export class MailVerificationComponent implements OnInit {
  idtoken:Object;
  email:string;
  vtoken:Object;

  @ViewChild(MessageBoxComponent) messageBox: MessageBoxComponent;ù

  constructor(private route: ActivatedRoute, private auth: AuthService, private userService:UserService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe( res => {
      this.idtoken = this.generateEncryptObj(res.id_token);
      this.email = res.mail;
      this.vtoken = this.generateEncryptObj(res.v_token);
      this.auth.verifyEmail(this.idtoken,this.email, this.vtoken).subscribe((res:User)=> {
        if(res.email){
          res.emailVerified = true;
          this.userService.patchUser(res['_id'],res).subscribe((ok) =>{
            if(ok == "OK"){
              this.messageBox.fire("Mail verificata con successo!", MsgCode.Success);
            }
          })
        }else{
          this.messageBox.fire("Qualcosa è andato storto!", MsgCode.Danger);
        }
      })
  })


  }

  private generateEncryptObj(parmhash:string):Object{
    let tmp = parmhash.split('-');
    if(tmp.length == 2)
      return {'content': tmp[0], 'iv':tmp[1]}
    else
      return null;
  }


}
