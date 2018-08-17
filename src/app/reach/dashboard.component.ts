import { Component, OnInit, AfterContentInit } from '@angular/core';
import * as d3 from 'd3';

import { ReachService } from './reach.service';
import { Reach } from './reach';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterContentInit {

  private svg: d3.Selection<any, any, any, any>;
  reaches: Reach[];

  constructor(
    private reachService: ReachService
  ) { }

  ngOnInit() {
    this.reachService.list().subscribe((reaches) => {
      console.log(reaches);

      this.reaches = reaches;
    });
  }

  ngAfterContentInit() {
    this.svg = d3.select('#ReachGraph');
    this.svg.style('background-color', '#f5f5f5');

    const width = +this.svg.attr('width');
    const height = +this.svg.attr('height');

    const text = this.svg.selectAll('text')
      .data([{}])
      .enter()
      .append('text');
    text.text(() => 'Coming soon')
      .attr('x', () => width / 2 - 96 / 2)
      .attr('y', () => height / 2)
      .attr('color', '#363636')
      .attr('font-family', 'Segoe UI, sans-serif')
      .attr('font-size', '1rem');

    const x = d3.scaleTime().rangeRound([0, width]);
    const y = d3.scaleLinear().rangeRound([height, 0]);
    const line = d3.line()
        .x((d: any) => x(d.date))
        .y((d: any) => y(d.close));
  }


}
