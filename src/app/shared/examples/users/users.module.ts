import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list.component';
import { UserEditComponent } from './components/user-edit.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    UserListComponent,
    UserEditComponent
  ],
  imports: [
      CommonModule,
      ReactiveFormsModule
  ],
  exports: [
    UserListComponent,
    UserEditComponent
  ]
})
export class UsersModule { }
