import { Component, OnInit } from '@angular/core';

import { PublishingService } from './publishing.service';
import { Publishing } from './publishing';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = 'Hello Publishing!';
  publishingList: Publishing[] = [];
  newHovered = false;

  constructor(private publishingService: PublishingService) {}

  ngOnInit(): void {
    this.listPublishing();
  }

  listPublishing(): void {
    this.publishingService.list().subscribe((publishingList) => {
      this.publishingList = publishingList;
    });
  }
}
