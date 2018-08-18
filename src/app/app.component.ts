import { Component } from '@angular/core';
import { PublishingService } from './publishing/publishing.service';
import { ReachService } from './reach/reach.service';
import { Reach, PostImpressions } from './reach/reach';
import { Publishing, Content, Media } from './publishing/publishing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showMenu = false;

  constructor(
    private publishingService: PublishingService,
    private reachService: ReachService
  ) { }

  /**
   * Demo section
   * These codes are created for demonstrating websocket behavior
   */

  submittingReach = false;
  submittingPublish = false;

  /**
   * Add a new Reach
   */
  addDemoReach() {
    this.submittingReach = true;
    let post_impressions = new PostImpressions();
    post_impressions.timestamp = new Date();
    post_impressions.value = '0';

    const reach = new Reach();
    reach.post_impressions_organic = [post_impressions];
    reach.post_impressions_viral = [post_impressions];

    post_impressions = new PostImpressions();
    post_impressions.timestamp = new Date();
    post_impressions.value = '10000';
    reach.post_impressions = [post_impressions];
    reach.post_impressions_paid = [post_impressions];

    this.reachService.create(reach).subscribe(() => {
      this.submittingReach = false;
    });
  }

  addPublishing() {
    this.submittingPublish = true;

    const publishing = new Publishing();
    publishing.content = new Content();
    publishing.content.network = 'facebook';
    publishing.content.message = 'Lorem ipsum dolor sit amet, eum reque molestie no, ' +
      'quando veniam id nam. Vix at efficiendi consequuntur, cu homero expetendis mel.';
    publishing.content.postType = 'photo';
    publishing.content.media = new Media();
    publishing.content.media.url = 'https://www.dutchwatersector.com/uploads/2016/05/dws-hofman-rubber-duck-macao-770px.jpg';
    publishing.content.media.fileName = 'dws-hofman-rubber-duck-macao-770px.jpg';
    publishing.status = 'draft';
    publishing.scheduled = new Date();

    this.publishingService.create(publishing).subscribe(() => {
      this.submittingPublish = false;
    });
  }
}
