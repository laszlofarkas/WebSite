import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Reach } from './reach';


@Injectable({
  providedIn: 'root'
})
export class ReachService {

  private reachUrl = 'http://localhost:3000/reach';

  constructor(
    private http: HttpClient
  ) { }

  list(): Observable<Reach[]> {
    return this.http.get<Reach[]>(this.reachUrl);
  }
}
