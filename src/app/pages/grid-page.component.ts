import { Component } from '@angular/core';
import { UsersService } from "../shared/services/users.service";
import { DataSourceElement } from "../components/grid/models/types";

@Component({
  selector: 'gb-grid-page',
  template: `
    <h2>Grid</h2>
    <gb-grid
      *ngIf="users$ | async as users"
      [title]="'Utenti'"
      [dataSource]="users"
      [showIndex]="false"
      [enableSearch]="true"
      [enableSort]="true"
      (clickRow)="clickedRow($event)"
    >
      <ng-template #itemTemplate let-item>
        <p>Actions</p>
      </ng-template>
    </gb-grid>
  `,
})
export class GridPageComponent {
  public users$ = this.usersService.getUsers();

  constructor(private usersService: UsersService) {}

  public clickedRow(event: { el: DataSourceElement, index: number }): void {
    console.log('Clicked', event.el);
    console.log('Index: ', event.index);
  }
}
