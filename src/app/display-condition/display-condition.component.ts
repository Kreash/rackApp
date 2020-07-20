import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-condition',
  templateUrl: './display-condition.component.html',
  styleUrls: ['./display-condition.component.scss']
})
export class DisplayConditionComponent implements OnInit {

@Input() display;

  condition = [];

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.condition = this.display;
    }, 1000)
  }



}

