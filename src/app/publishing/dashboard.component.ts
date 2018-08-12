import { Component, OnInit } from '@angular/core';

import { PublishingService } from './publishing.service';
import { Publishing } from './publishing';

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  title = 'Hello Publishing!';
  publishingList: Publishing[];

  constructor(private publishingService: PublishingService) {}

  ngOnInit(): void {
    this.listPublishing();
  }

  listPublishing(): void {
    this.publishingService.list().subscribe((publishingList) => {
      console.log(publishingList);
      this.publishingList = publishingList;
    });
  }
}
