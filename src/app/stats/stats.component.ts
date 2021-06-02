import { Component, OnInit } from '@angular/core';
import {Handler} from '../handler'
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    Handler
  }

}
