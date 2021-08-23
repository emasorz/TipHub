import { ArrayType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SocialsService } from '../../services/socials.service'


interface Insta1{
  id: String;
  access_token: String;
};

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
  public code:String = null;
  public userId: String;
  public access_token: String;
  public username: String;
  public r: Object;
  public mediaIds: number[] = [];
  public medias: String[] = [];

  constructor(public socialservice: SocialsService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params =>{
      this.code = params['code'];
    });

    if(this.code){
      this.socialservice.getAccessToken(this.code)
      .subscribe((data:any) => {
        this.userId = data.user_id;
        this.access_token = data.access_token;
        this.socialservice.getInstaInfo(this.access_token)
        .subscribe((res:any)=>{
          this.username = res.username;
          res.media.data.forEach(element => {
            this.mediaIds.push(element.id);
          });
          console.log(this.mediaIds);
          this.mediaIds.forEach(id =>{
            this.socialservice.getInstaMultimedia(id, this.access_token).subscribe(res =>{
              this.medias.push(res.media_url);
            })
          })
          console.log(this.medias);
          
        })
      })
    }
   }

  
  


  ngOnInit(): void {
    
  }
}
