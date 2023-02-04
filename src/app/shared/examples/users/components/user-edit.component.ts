import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NonNullableFormBuilder } from "@angular/forms";
import { User } from "../../../models/user.model";

@Component({
  selector: 'gb-user-edit',
  template: `
    <form class="mt-4" [formGroup]="userForm" (ngSubmit)="onPersonFormSubmit()">
      <input type="hidden" formControlName="id">
      <div class="form-group">
        <label for="firstname">Firstname</label>
        <input type="text" class="form-control" id="firstname" placeholder="Firstname" formControlName="name">
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" class="form-control" id="username" placeholder="Username" formControlName="username">
      </div>
      <button type="submit" class="btn btn-primary mt-3">Save</button>
    </form>
  `,
})
export class UserEditComponent implements OnInit {
  @Input() user: User | null = null;
  @Output() saveUser = new EventEmitter<User>();

  public userForm = this.fb.group({
    id: -1,
    name: '',
    username: '',
  });

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit() {
    if (this.user?.id) {
      this.userForm.setValue({
        id: this.user.id,
        name: this.user.name,
        username: this.user.username
      })
    }
  }

  onPersonFormSubmit() {
    this.saveUser.emit(this.userForm.value as User);
  }
}
