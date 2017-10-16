import {EventEmitter, Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

import {AppConfig} from '../app.config';
import {WindowService} from './window.service';
import {Observable} from 'rxjs/Observable';
import {AlertService} from './alert.service';
import {UserService} from "./user.service";

@Injectable()
export class AuthenticationService {
  private windowHandle: any = null;
  private locationWatcher = new EventEmitter();
  constructor(private http: Http,
              private config: AppConfig,
              private windowService: WindowService,
              private alertService: AlertService,
              private userService: UserService) {
  }

  login(username: string, password: string): Observable<any> {
    const body = JSON.stringify({username: username, password: password});
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post('/apiv1/users/auth/signin', body, options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const user = response.json();
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      })
      .catch(this.handleError);
  }

  signup(user: any): Observable<any> {
    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post('/apiv1/users/auth/signup/', body, options)
      .map(res => user = res.json())
      .catch(this.handleError);
  }

  logout(): Observable<any> {
    // remove user from local storage to log user out
    return this.http.get('/apiv1/users/auth/signout')
      .map((response: Response) => {
        localStorage.removeItem('currentUser');
      }).catch(this.handleError);
  }

  getUser(): any {
    let user = localStorage.getItem('currentUser');

    if (user !== null) {
      user = JSON.parse(user);
    }

    return user;
  }

  isLoggedIn(): any {
    return this.getUser() !== null;
  }

  revalidateUser() {
    this.userService.getById(this.getUser().id).subscribe(
      (user) => {
        localStorage.removeItem('currentUser');
        localStorage.setItem('currentUser', JSON.stringify(user));
      });
  }

  doSocialLogin(url: string) {
    this.windowHandle = this.windowService.createWindow(url, 'OAuth2 Login');
  }

  getSocialProfile(): Observable<any> {
    return this.http.get('/apiv1/users/oauth/userdataPassportLoggedIn')
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        console.log(response.json());
        const user = response.json();
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      }).catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().message || 'Server error');
  }
}
