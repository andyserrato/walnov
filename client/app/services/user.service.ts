import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AppConfig } from '../app.config';
import { User } from '../models/user';

@Injectable()
export class UserService {
    private userUrl = '/apiv1/users/auth';

    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        console.log('Inicio UserService.getAll');
        return this.http.get('/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get(this.userUrl+'/' + _id)
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(user: User) {
        return this.http.post('/users/auth/signup', user, this.jwt());
    }

    update(body: any) {
      const bodyString = JSON.stringify(body); // Stringify payload
      const headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      const options       = new RequestOptions({ headers: headers }); // Create a request option
      return this.http.put(`${this.userUrl}/${body.id}`, bodyString, options) // ...using put request
        .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
        .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
    }

    delete(_id: string) {
        return this.http.delete(this.config.apiUrl + '/users/' + _id, this.jwt());
    }

    createByFaceBook() {
      return this.http.get('/users/oauth/facebook');
    }

    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log('Current User', currentUser);
        if (currentUser && currentUser.token) {
            const headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
