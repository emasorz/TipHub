import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService:WebRequestService) { }

  createUser(){
    this.webRequestService.post('/users',{})
  }
}
