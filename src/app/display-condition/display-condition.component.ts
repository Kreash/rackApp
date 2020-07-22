import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display-condition',
  templateUrl: './display-condition.component.html',
  styleUrls: ['./display-condition.component.scss']
})
export class DisplayConditionComponent {

  @Input() display;

}

