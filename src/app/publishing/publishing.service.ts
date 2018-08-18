import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

import { Publishing } from './publishing';

@Injectable({
  providedIn: 'root'
})
export class PublishingService {

  private publishingUrl = 'http://localhost:3000/publishing';
  private publishingWS = 'ws://localhost:3001/publishing';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * List all publication
   */
  list(): Observable<Publishing[]> {
    return this.http.get<Publishing[]>(this.publishingUrl);
  }

  /**
   * Find one publication by the given id
   * @param {string} id id of the publication
   */
  find(id: string): Observable<Publishing> {
    return this.http.get<Publishing>(this.publishingUrl + '/' + id);
  }

  /**
   * Create a new publishing
   * @param {Publishing} publishing publishing to be created
   */
  create(publishing: Publishing): Observable<any> {
    return this.http.put(this.publishingUrl, publishing);
  }

  /**
   * Update a publishing by the given id
   * @param id id of the publication to be updated
   * @param publishing new version of the publishing
   */
  update(id: string, publishing: Publishing): Observable<any> {
    return this.http.post(this.publishingUrl + '/' + id, publishing);
  }

  /**
   * Delet the given publication
   * @param id id of the publishing to be deleted
   */
  delete(id: string): Observable<any> {
    // https://github.com/angular/angular/issues/18586 -> as 'json' is required
    return this.http.delete<string>(this.publishingUrl + '/' + id, {responseType: 'text' as 'json'});
  }

  /**
   * Creat an observable WebSocket for listening new Publishing
   */
  websocket(): WebSocketSubject<Publishing> {
    return webSocket<Publishing>(this.publishingWS);
  }
}
