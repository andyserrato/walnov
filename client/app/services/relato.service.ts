import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RelatoService {

  private relatosUrl = '/apiv1/relatos';

  constructor(private http: Http,
              private auth: AuthenticationService) { }

  createRelato (body: Object): Observable<any> {
    const bodyString = JSON.stringify(body); // Stringify payload
    const headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    const options       = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(this.relatosUrl, bodyString, options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .do(data => console.log('createRelato' + JSON.stringify(data)))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
  }

}
