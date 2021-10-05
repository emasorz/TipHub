import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private webService: WebRequestService, private router: Router, private http: HttpClient, private crypto: CryptoService) { }

  login(email: string, password: string) {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        console.log(res);
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        console.log("LOGGED IN!");
      })
    )
  }

  signup(user) {
    return this.webService.signup(user).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        console.log("Successfully signed up and now logged in!");
      })
    )
  }

  isLoggedIn() {
    if (this.getUserId()) {
      let id = this.getUserId();
      return this.webService.get(`users/` + id).toPromise().then((res) => {
          return res;
      }).catch((e) => {
        console.error(e);
      })
    } else {
      return undefined;
    }
  }

  verifyEmail(idtoken: Object, email: string, vtoken: Object) {
    console.log(`${this.webService.ROOT_URL}/users/verifyemail`);
    return this.webService.post(`users/verifyemail`, { 'id_token': idtoken, 'email': email, 'v_token': vtoken });
  }

  logout() {
    this.removeSession();

    window.location.href = '/login';
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  getUserId() {
    if (localStorage.getItem('user-id'))
      return this.crypto.get(localStorage.getItem('user-id'));
    else
      return undefined;
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken)
  }

  private setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', this.crypto.set(userId));
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }

  getNewAccessToken() {
    return this.http.get(`${this.webService.ROOT_URL}/users/me/access-token`, {
      headers: {
        'x-refresh-token': this.getRefreshToken(),
        '_id': this.getUserId()
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        this.setAccessToken(res.headers.get('x-access-token'));
      })
    )
  }
}
