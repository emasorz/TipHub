import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:WebRequestService) { }


  searchUser(value:string){
    return this.http.get(`users?search=${value}`);
  }

}
