import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;
  constructor(private http: HttpClient) { 
    // this.ROOT_URL = "https://beautiful-hot-springs-47087.herokuapp.com";
    this.ROOT_URL = "http://localhost:3000";
  }

  get(uri:string):Observable<any>{
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri:string, payload:Object){
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  patch(uri:string, payload:Object){
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete(uri:string){
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }

  login(email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/users/login`, {
      email,
      password
    }, {
        observe: 'response'
      });
  }

  signup(name: string, email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/users`, {
      name,
      email,
      password
    }, {
        observe: 'response'
      });
  }
}
