import 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  user: any;

  private _signinURL = 'api/auth/signin';
  private _signupURL = 'api/auth/signup';

  constructor (private http: Http) {

  }

  primerLogueoSocial(): Observable<any> {
    console.log('Inicio primer Logueo Social');
    return this.http.get('/oauth/userdata')
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

  isLoggedIn(): boolean {
    return (!!this.user);
  }

  signin(credentials: any): Observable<any> {
    const body = JSON.stringify(credentials);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this._signinURL, body, options)
      .map(res => this.user = res.json())
      .catch(this.handleError);
  }

  signup(user: any): Observable<any> {
    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this._signupURL, body, options)
      .map(res => this.user = res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().message || 'Server error');
  }
}
