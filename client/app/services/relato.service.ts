import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs/Observable';
import {RegisterPopoverService} from './register-popover.service';

@Injectable()
export class RelatoService {

  private relatosUrl = '/apiv1/relatos';

  constructor(private http: Http,
              private auth: AuthenticationService,
              private registerPopOverService: RegisterPopoverService) {
  }

  createRelato(body: Object): Observable<any> {
    const bodyString = JSON.stringify(body); // Stringify payload
    const headers = new Headers({'Content-Type': 'application/json'}); // ... Set content type to JSON
    const options = new RequestOptions({headers: headers}); // Create a request option

    return this.http.post(this.relatosUrl, bodyString, options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .do(data => console.log('createRelato' + JSON.stringify(data)))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
  }

  updateRelato(body: Object): Observable<any> {
    const bodyString = JSON.stringify(body); // Stringify payload
    const headers = new Headers({'Content-Type': 'application/json'}); // ... Set content type to JSON
    const options = new RequestOptions({headers: headers}); // Create a request option

    return this.http.put(this.relatosUrl, bodyString, options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      // .do(data => console.log('updateRelato' + JSON.stringify(data)))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
  }

  getRelatoById(id: any): Observable<any> {
    let query = this.relatosUrl + '/' + id;
    if (this.auth.isLoggedIn()) {
      query += '?usuarioId=' + this.auth.getUser().id;
    }
    return this.http.get(query)
      .map((res: Response) => {
        return res.json();
      })
      // .do(data => console.log(data))
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  likeRelato(relatoId: string, usuarioId: string): Observable<any> {
    const body = {
      relatoId: relatoId,
      usuarioId: usuarioId
    };
    const bodyString = JSON.stringify(body);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.put(`${this.relatosUrl}/like`, bodyString, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getRelatoByQueryParams(myParams?: URLSearchParams): Observable<any> {
    const myHeaders = new Headers({'Content-Type': 'application/json'}); // ... Set content type to JSON
    const options = new RequestOptions({headers: myHeaders, params: myParams});
    return this.http.get(this.relatosUrl + '?' + myParams, options)
      .map((res: Response) => {
        return res.json();
      })
      // .do(data => console.log('getChatStoryByQueryParams' + JSON.stringify(data)))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  addOpinionToRelato(body: Object): Observable<any> {
    const bodyString = JSON.stringify(body); // Stringify payload
    const headers = new Headers({'Content-Type': 'application/json'}); // ... Set content type to JSON
    const options = new RequestOptions({headers: headers}); // Create a request option

    return this.http.post(this.relatosUrl + '/opinion', bodyString, options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      // .do(data => console.log('addOpinionToRelato' + JSON.stringify(data)))
      .catch((error: any) => Observable.throw(error || 'Server error')); // ...errors if any
  }

  reportRelato(opinionId: any): Observable<any> {
    if (this.auth.isLoggedIn()) {
      const body = {
        opinionId: opinionId,
        usuarioId: this.auth.getUser().id
      };
      const bodyString = JSON.stringify(body); // Stringify payload
      const headers = new Headers({'Content-Type': 'application/json'}); // ... Set content type to JSON
      const options = new RequestOptions({headers: headers}); // Create a request option

      return this.http.put(this.relatosUrl + '/reportOpinion', bodyString, options) // ...using post request
        .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
        .do(data => console.log('updateRelato' + JSON.stringify(data)))
        .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
    } else {
      this.registerPopOverService.setVisible(true);
    }
  }

}
