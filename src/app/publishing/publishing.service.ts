import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Publishing } from './publishing';

const httpOptions = {
  header: new  HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PublishingService {

  private publishingUrl = 'http://localhost:3000/publishing';

  constructor(
    private http: HttpClient
  ) {}

  list(): Observable<Publishing[]> {
    return this.http.get<Publishing[]>(this.publishingUrl);
  }

  find(id: String): Observable<Publishing> {
    return this.http.get<Publishing>(this.publishingUrl + '/' + id);
  }

  create(publishing: Publishing): Observable<any> {
    return this.http.put(this.publishingUrl, publishing);
  }

  update(id: String, publishing: Publishing): Observable<any> {
    return this.http.post(this.publishingUrl + '/' + id, publishing);
  }
}
