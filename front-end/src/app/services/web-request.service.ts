import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;
  constructor(private http: HttpClient) { 
    this.ROOT_URL = "https://frozen-waters-15704.herokuapp.com";
    //this.ROOT_URL = "http://localhost:3000";
  }

  get<T>(uri:string):Observable<any>{
    return this.http.get<T>(`${this.ROOT_URL}/${uri}`);
  } 

  post<T>(uri:string, payload:Object):Observable<any>{
    return this.http.post<T>(`${this.ROOT_URL}/${uri}`, payload);
  }

  patch(uri:string, payload:Object){
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete<T>(uri:string):Observable<any>{
    return this.http.delete<T>(`${this.ROOT_URL}/${uri}`);
  }

  login(email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/users/login`, {
      email,
      password
    }, {
        observe: 'response'
      });
  }

  signup(user) {
    return this.http.post(`${this.ROOT_URL}/users`, user, {
        observe: 'response'
      });
  }
}
