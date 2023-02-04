import {ChangeDetectionStrategy, Component, Input, TemplateRef} from '@angular/core';

@Component({
  selector: 'gb-tab',
  template: `
    <div [hidden]="!active">
      <ng-content *ngIf="!template"></ng-content>
      <ng-container
        *ngIf="template"
        [ngTemplateOutlet]="template"
        [ngTemplateOutletContext]="{ data: dataContext }">
      </ng-container>
    </div>
  `,
})
export class TabComponent {
  @Input() tabTitle = '';
  @Input() active = false;
  @Input() template!: TemplateRef<any>;
  @Input() dataContext: any = null;
  @Input() isCloseable = false;
}
