import { Component } from '@angular/core';
import { UsersService } from "./services/users.service";
import { DataSourceElement } from "./components/grid/models/types";

@Component({
  selector: 'gb-root',
  template: `
    <div id="container">
      <div class="container pt-5" *ngIf="users$ | async as users">
        <h2>Grid</h2>
        <gb-grid
          [title]="'Utenti'"
          [dataSource]="users"
          [showIndex]="false"
          [enableSearch]="true"
          [enableSort]="true"
          (clickRow)="clickedRow($event)"
        />
      </div>
    </div>
  `,
  styles: [`
    #container {
      width: 100vw;
      min-height: 100vh;
      background-color: #eeeeee;
    }
  `]
})
export class AppComponent {
  public users$ = this.usersService.getUsers();

  constructor(private usersService: UsersService) {}

  public clickedRow(event: { el: DataSourceElement, index: number }): void {
    console.log('Clicked', event.el);
    console.log('Index: ', event.index);
  }
}
