import { Component, OnInit } from '@angular/core';
import { WebRequestService } from 'src/app/services/web-request.service';

@Component({
  selector: 'app-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.css']
})
export class BackendComponent implements OnInit {
  public users;

  constructor(private webRequestService:WebRequestService) { 
    this.getUsers().subscribe((res)=>{
      this.users = res;
      console.log(res);
      console.log(res[0]._id);
    })
  }
  
  ngOnInit(): void {
  }


  getUsers(){
    return this.webRequestService.get('users');
  }

}
