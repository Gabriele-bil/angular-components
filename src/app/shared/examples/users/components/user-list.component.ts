import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../../models/user.model";

@Component({
  selector: 'gb-user-list',
  template: `
    <table class="table table-striped">
      <thead>
      <th>Name</th>
      <th>Surname</th>
      <th></th>
      </thead>
      <tbody *ngIf="users.length">
      <tr *ngFor="let user of users">
        <td>{{ user.name }}</td>
        <td>{{ user.username }}</td>
        <td><button class="btn btn-sm btn-secondary" (click)="editUser.emit(user)">Modifica</button></td>
      </tr>
      </tbody>
    </table>
    <button class="btn btn-primary" (click)="addUser.emit()">Aggiungi nuovo utente</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  @Input() users: User[] = [];
  @Output() addUser = new EventEmitter<void>();
  @Output() editUser = new EventEmitter<User>();
}
