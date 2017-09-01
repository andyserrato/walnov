import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ChatStory } from '../models/chatstory.model';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ChatstoryService {

  private chatStoriesUrl = '/apiv1/chatstories';

  constructor(private http: Http) { }

  getChatStories(): Observable<ChatStory[]> {
    return this.http.get(this.chatStoriesUrl)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getChatStory(id: any): Observable<any> {
    console.log('Inicio getChatStory');
    console.log(this.chatStoriesUrl + id);
    return this.http.get(this.chatStoriesUrl + '/' + id)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getChatStoryByQueryParams(myParams?: URLSearchParams): Observable<ChatStory[]> {
    console.log('Inicio getChatStory');
    const myHeaders = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    console.log('myParams: ' + myParams);
    const options = new RequestOptions({ headers: myHeaders, params: myParams  });
    return this.http.get('/apiv1/chatstories?' + myParams, options)
      .map((res: Response) => {
        return res.json();
      })
      // .do(data => console.log('getChatStoryByQueryParams' + JSON.stringify(data)))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  addChatStory (body: Object): Observable<any> {
    const bodyString = JSON.stringify(body); // Stringify payload
    const headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    const options       = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(this.chatStoriesUrl, bodyString, options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
  }

  updateChatStory(body: Object, id?: any): Observable<any> {
    const bodyString = JSON.stringify(body); // Stringify payload
    const headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    const options       = new RequestOptions({ headers: headers }); // Create a request option
    console.log('body ' + body);
    console.log('bodu ' + body['chatStory']);
    console.log('bodu ' + body['chatStory']['id']);
    return this.http.put(`${this.chatStoriesUrl}/${body['chatStory']['id']}`, bodyString, options) // ...using put request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
  }

}
