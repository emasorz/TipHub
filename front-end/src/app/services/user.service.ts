import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:WebRequestService) { }


  searchUser(value:string){
    return this.http.get(`users?search=${value}`);
  }

  patchUser(userId:string, user:User){
    let copy = Object.assign(new User(), user);
    delete copy['_id'];
    delete copy['__v'];
    return this.http.patch(`users/${userId}`, copy);
  }

}
