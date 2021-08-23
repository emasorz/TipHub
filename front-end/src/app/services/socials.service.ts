import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

let InstaAPIenvironment = {
  instaAppCode : 472805627292058,
  redirectURL : 'https://localhost:4200/settings/',
  secretKey: '0b05874f59c384b07a50f5e041388101'
}

@Injectable({
  providedIn: 'root'
})

export class SocialsService {

  yt_apikey: string = 'AIzaSyDRU2WF5vvf_4G_ls_ZtZ8iR-ZAKXl6OPU';
  constructor(public http:HttpClient) {}

  getYtVideoInfo(videoId:string){
    let url = 'https://www.googleapis.com/youtube/v3/videos?id='+videoId+'&key='+this.yt_apikey+'&part=snippet,contentDetails,statistics,status'
    return this.http.get(url);
  }

  requestInstagramPermissions(){
    let baseURL = 'https://api.instagram.com/oauth/authorize?client_id='+InstaAPIenvironment.instaAppCode+'&redirect_uri='+InstaAPIenvironment.redirectURL+'&scope=user_profile,user_media&response_type=code';
    window.location.replace(baseURL);
  }

  getAccessToken(reqCode:String) : Observable<string>{   
    var formData: any = new FormData();
    formData.append("client_id", InstaAPIenvironment.instaAppCode);
    formData.append("client_secret", InstaAPIenvironment.secretKey);
    formData.append("grant_type", 'authorization_code');
    formData.append("redirect_uri", InstaAPIenvironment.redirectURL);
    formData.append("code", reqCode);
    
    return this.http.post<any>('https://api.instagram.com/oauth/access_token', formData);
  }

  getInstaInfo(access_token){
    let url = 'https://graph.instagram.com/me?fields=id,username,media&access_token='+ access_token;
    let r = this.http.get<any>(url);
    r.subscribe(data => {
      console.log(data);
    })
    return r;
  }

  getInstaMultimedia(id, access_token){
    let url = 'https://graph.instagram.com/'+id+'?fields=media_url&access_token=' + access_token;
    console.log(url);
    return this.http.get<any>(url);
  }
}
