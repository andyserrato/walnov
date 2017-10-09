import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {AppConfig} from '../app.config';

@Injectable()
export class UserService {

  constructor(private http: Http, private config: AppConfig) {
  }

  getById(_id: string) {
    return this.http.get(this.config.USERS_AUTH_ENDPOINT + '/' + _id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  update(body: any) {
    const bodyString = JSON.stringify(body); // Stringify payload
    const headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    const options       = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.put(`${this.config.USERS_AUTH_ENDPOINT}/${body.id}`, bodyString, options) // ...using put request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
  }

  follow(body: any) {
    const bodyString = JSON.stringify(body); // Stringify payload
    const headers = new Headers({'Content-Type': 'application/json'}); // ... Set content type to JSON
    const options = new RequestOptions({headers: headers}); // Create a request option
    return this.http.put(`${this.config.USERS_ENDPOINT}/follow`, bodyString, options) // ...using put request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
  }

  unFollow(body: any) {
    const bodyString = JSON.stringify(body); // Stringify payload
    const headers = new Headers({'Content-Type': 'application/json'}); // ... Set content type to JSON
    const options = new RequestOptions({headers: headers}); // Create a request option
    return this.http.put(`${this.config.USERS_ENDPOINT}/unfollow`, bodyString, options) // ...using put request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
  }

  // private helper methods
  private jwt() {
    // create authorization header with jwt token
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // console.log('Current User', currentUser);
    if (currentUser && currentUser.token) {
      const headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
      return new RequestOptions({headers: headers});
    }
  }
}
