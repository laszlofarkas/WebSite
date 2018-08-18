import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import * as d3 from 'd3';

import { ReachService } from './reach.service';
import { Reach } from './reach';
import { WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterContentInit, OnDestroy {

  private reaches: Reach[];
  private totalCounter = 0;
  private organicCounter = 0;
  private viralCounter = 0;
  private paidCounter = 0;
  private webSocket: WebSocketSubject<Reach>;

  constructor(
    private reachService: ReachService
  ) { }

  ngOnInit() {
    this.listenWebSocket();
  }

  ngOnDestroy() {
    this.webSocket.unsubscribe();
  }

  /**
   * Called by Angular after the template has been rendered
   */
  ngAfterContentInit() {

    this.loadReaches();
  }

  /**
   * Get all reaches from ReachService
   */
  private loadReaches() {
    this.reachService.list().subscribe((reaches) => {
      this.reaches = reaches;
      this.aggregatePieData(this.reaches);
    });
  }

  private listenWebSocket() {
    this.webSocket = this.reachService.websocket();
    this.webSocket.subscribe(
      // new reach arrived
      (reach: Reach) => {
        this.reaches.push(reach);
        this.aggregatePieData([reach]);
      },
      // error on websocket connection
      (error) => {
        console.log('WebSocket lost connection');
        // try to reconnect
        setTimeout(() => {
          console.log('WebSocket try to reconnect');
          this.listenWebSocket();
        }, 1000);
      });
  }

  /**
   * Aggregate value data form the given processes
   * @param reaches List of reach to be process
   */
  private aggregatePieData(reaches: Reach[]) {
    reaches.forEach(reach => {
      try {
        this.totalCounter += +reach.post_impressions[0].value;
        this.organicCounter += +reach.post_impressions_organic[0].value;
        this.viralCounter += +reach.post_impressions_viral[0].value;
        this.paidCounter += +reach.post_impressions_paid[0].value;
      } catch { }
    });
    this.drawPieChart();
  }

  /**
   * Trigger redrawing when the screen has resized
   */
  resize() {
    this.drawPieChart();
  }

  /**
   * Draw the content of the pie chart
   */
  private drawPieChart() {
console.log('Draw');


    const pieChart: d3.Selection<any, any, any, any> = d3.select('#ReachPieChart');

    // reset
    pieChart.html('');

    // get dimensions of SVG
    const width = +pieChart.node().getBoundingClientRect().width;
    const height = +pieChart.node().getBoundingClientRect().height;
    const padding = height * 0.05;

    // calculate pie chart parameters
    const radius = height / 2 - padding;
    const chartColors = ['#1aad4d', '#ff470f', '#cfa500'];

    // creat the root element of the pieChart in the correct position
    const g = pieChart.append('g')
      .attr('transform', 'translate(' + (width - radius - padding) + ',' + height / 2 + ')');

    // calculate pile size
    const pie = d3.pie().value((d: any) => d);

    // add the pies one-by-one
    const arc = g.selectAll('.arc')
      .data(pie([
        this.organicCounter,
        this.viralCounter,
        this.paidCounter]))
      .enter()
      .append('g')
      .attr('class', 'arc');

    // set up appearance of the pies
    const path = d3.arc().outerRadius(radius).innerRadius(0);
    arc.append('path')
      .attr('d', path as any)
      // set color of pie
      .attr('fill', (d, i) => chartColors[i]);

    // draw title
    const title: d3.Selection<any, any, any, any> = pieChart.append('text')
      .text('Impression')
      .attr('class', 'subtitle')
      .attr('x', padding);
    // y calculated based on the element height
    title.attr('y', title.node().getBoundingClientRect().height / 2 + padding);

    // draw organic text
    pieChart.append('text')
      .text('organic: ' + this.organicCounter)
      .attr('x', padding)
      .attr('y', height / 2 - 25)
      .attr('fill', chartColors[0]);

    // draw viral text
    pieChart.append('text')
      .text('viral: ' + this.viralCounter)
      .attr('x', padding)
      .attr('y', height / 2)
      .attr('fill', chartColors[1]);

    // draw paid text
    pieChart.append('text')
      .text('paid: ' + this.paidCounter)
      .attr('x', padding)
      .attr('y', height / 2 + 25)
      .attr('fill', chartColors[2]);

    // draw total text
    pieChart.append('text')
      .text('total: ' + this.totalCounter)
      .attr('x', padding)
      .attr('y', height / 2 + 50);
  }
}
