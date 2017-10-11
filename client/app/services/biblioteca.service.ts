import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class BibliotecaService {

  private bibliotecaUrl = '/apiv1/biblioteca';
  private biblioteca: any;
  constructor(
    private http: Http,
    private auth: AuthenticationService) {
  }

  getBibliotecaByCurrentUserId(): Observable<any> {
    const usuarioId = this.auth.getUser().id;
    return this.http.get(this.bibliotecaUrl + '/' + usuarioId)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateBiblioteca(b: any) {
    this.biblioteca = b;
  }

  getCurrentBiblioteca() {
    return this.biblioteca;
  }

  getChatStoryBibliotecaByCurrentUserId(): Observable<any> {
    const usuarioId = this.auth.getUser().id;
    return this.http.get(this.bibliotecaUrl + '/' + usuarioId + '/chatstories')
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  addChatStoryOnBibliotecaByUserId(idChatStory: any): Observable<any> {
    const usuarioId = this.auth.getUser().id;
    const bodyString = JSON.stringify({id: idChatStory}); // Stringify payload
    const headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    const options       = new RequestOptions({ headers: headers }); // Create a request option
    const bibliotecaChatStoriesUrl = this.bibliotecaUrl + '/' + usuarioId + '/chatstories';
    return this.http.post(bibliotecaChatStoriesUrl, bodyString, options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
  }

  deleteChatStoryOnBibliotecaByUserId(idChatStory: any): Observable<any> {
    const usuarioId = this.auth.getUser().id;
    const bodyString = JSON.stringify({id: idChatStory}); // Stringify payload
    const headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    const options       = new RequestOptions({
                                    headers: headers,
                                    body: bodyString
                                  }); // Create a request option
    const bibliotecaChatStoriesUrl = this.bibliotecaUrl + '/' + usuarioId + '/chatstories';
    return this.http.delete(bibliotecaChatStoriesUrl, options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
  }

  getRelatoBibliotecaByCurrentUserId(): Observable<any> {
    const usuarioId = this.auth.getUser().id;
    return this.http.get(this.bibliotecaUrl + '/' + usuarioId + '/relatos')
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  addRelatoOnBibliotecaByUserId(idRelato: any): Observable<any> {
    const usuarioId = this.auth.getUser().id;
    const bodyString = JSON.stringify({id: idRelato}); // Stringify payload
    const headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    const options       = new RequestOptions({ headers: headers }); // Create a request option
    const bibliotecaRelatosUrl = this.bibliotecaUrl + '/' + usuarioId + '/relatos';
    return this.http.post(bibliotecaRelatosUrl, bodyString, options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
  }

  deleteRelatoOnBibliotecaByUserId(idRelato: any): Observable<any> {
    const usuarioId = this.auth.getUser().id;
    const bodyString = JSON.stringify({id: idRelato}); // Stringify payload
    const headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    const options       = new RequestOptions({
      headers: headers,
      body: bodyString
    }); // Create a request option
    const bibliotecaRelatosUrl = this.bibliotecaUrl + '/' + usuarioId + '/relatos';
    return this.http.delete(bibliotecaRelatosUrl, options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
  }

  getWallBibliotecaByCurrentUserId(): Observable<any> {
    const usuarioId = this.auth.getUser().id;
    return this.http.get(this.bibliotecaUrl + '/' + usuarioId + '/walls')
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  addWallOnBibliotecaByUserId(idWall: any): Observable<any> {
    const usuarioId = this.auth.getUser().id;
    const bodyString = JSON.stringify({id: idWall}); // Stringify payload
    const headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    const options       = new RequestOptions({ headers: headers }); // Create a request option
    const bibliotecaWallsUrl = this.bibliotecaUrl + '/' + usuarioId + '/walls';
    return this.http.post(bibliotecaWallsUrl, bodyString, options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
  }

  deleteWallOnBibliotecaByUserId(idWall: any): Observable<any> {
    const usuarioId = this.auth.getUser().id;
    const bodyString = JSON.stringify({id: idWall}); // Stringify payload
    const headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    const options       = new RequestOptions({ headers: headers }); // Create a request option
    const bibliotecaWallsUrl = this.bibliotecaUrl + '/' + usuarioId + '/walls';
    return this.http.delete(bibliotecaWallsUrl, bodyString) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
  }
}
