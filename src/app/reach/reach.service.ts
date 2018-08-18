import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

import { environment } from '../../environments/environment';

import { Reach } from './reach';

@Injectable({
  providedIn: 'root'
})
export class ReachService {

  private reachUrl = environment.httpServerUrl + '/reach';
  private reachWS = environment.httpServerUrl + '/reach';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * List all existing Reaches
   */
  list(): Observable<Reach[]> {
    return this.http.get<Reach[]>(this.reachUrl);
  }

  /**
   * Create a new Reach
   * @param {Reach} reach Reach to be create
   */
  create(reach: Reach): Observable<string> {
    return this.http.put<string>(this.reachUrl, reach, {responseType: 'text' as 'json'});
  }

  /**
   * Creat an observable WebSocket for listening new Reaches
   */
  websocket(): WebSocketSubject<Reach> {
    return webSocket<Reach>(this.reachWS);
  }
}
