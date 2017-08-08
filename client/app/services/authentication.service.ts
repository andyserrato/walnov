import {EventEmitter, Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

import {AppConfig} from '../app.config';
import {WindowService} from './window.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  private windowHandle: any = null;
  private locationWatcher = new EventEmitter();
  constructor(private http: Http, private config: AppConfig, private windowService: WindowService) {
  }

  login(username: string, password: string) {

    return this.http.post('/apiv1/users/authenticate', {username: username, password: password})
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }

  signup(user: any): Observable<any> {
    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post('/apiv1/', body, options)
      .map(res => user = res.json())
      .catch(this.handleError);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  getUser(): any {
    const user = localStorage.getItem('currentUser');

    if (user !== null) {
      JSON.parse(user);
    }

    return user;
  }

  isLoggedIn(): any {
    return this.getUser() !== null;
  }

  doSocialLogin(url: string) {
    this.windowHandle = this.windowService.createWindow(url, 'OAuth2 Login');
  }

  getSocialProfile(): Observable<any> {
    console.log('Inicio primer Logueo Social');
    return this.http.get('/apiv1/users/oauth/userdataPassportLoggedIn')
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        console.log(response.json());
        const user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      }).catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().message || 'Server error');
  }

}
