import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-description-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card (click)="on = !on" [ngClass]="{'off': !on}">
      <div class="icon-container">
        <div class="icon status-{{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title h6">{{ title }}</div>
        <div class="status paragraph-1">{{ description }}</div>
      </div>
    </nb-card>
  `,
})
export class DescriptionCardComponent {

  @Input() title: string;
  @Input() type: string;
  @Input() on = true;
  @Input() description = true;
}
