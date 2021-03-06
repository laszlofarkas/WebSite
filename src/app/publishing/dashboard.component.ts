import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';

import { PublishingService } from './publishing.service';
import { Publishing } from './publishing';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  publishingList: Publishing[] = [];
  private webSocket: WebSocketSubject<Publishing>;

  constructor(
    private publishingService: PublishingService
  ) { }

  ngOnInit(): void {
    this.listPublishing();
    this.listenWebSocket();
  }

  ngOnDestroy() {
    this.webSocket.unsubscribe();
  }

  /**
   * Ger list of publishing from web server
   */
  private listPublishing(): void {
    this.publishingService.list().subscribe((publishingList) => {
      this.publishingList = publishingList;
    });
  }

  /**
   * listen on websocket for new incoming Publishing
   */
  private listenWebSocket() {
    this.webSocket = this.publishingService.websocket();
    this.webSocket.subscribe(
      // new publish is received
      (publishing: Publishing) => {
        this.publishingList.push(publishing);
      },
      // error happened on websocket
      (error) => {
        console.log('WebSocket lost connection');
        // try to reconnect
        setTimeout(() => {
          console.log('WebSocket try to reconnect');
          this.listenWebSocket();
        }, 1000);
      });
  }
}
