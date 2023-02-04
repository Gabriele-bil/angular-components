import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { User } from "../shared/models/user.model";
import { TabsComponent } from "../components/tabs/components/tabs.component";
import {UsersService} from "../shared/services/users.service";

@Component({
  template: `
    <div class="container p-3">
      <gb-tabs>
        <gb-tab tabTitle="Lista utenti">
          <gb-user-list [users]="users" (addUser)="addUser()" (editUser)="onEditUser($event)"/>
        </gb-tab>
      </gb-tabs>

      <ng-template #personEdit let-person="data">
        <gb-user-edit [user]="person" (saveUser)="onPersonFormSubmit($event)"/>
      </ng-template>
    </div>
  `,
})
export class DynamicTabsPageComponent implements OnInit {
  @ViewChild('personEdit') userEditTemplate!: TemplateRef<any>;
  @ViewChild(TabsComponent) tabListComponent!: TabsComponent;
  public users: User[] = [];

  constructor(private usersService: UsersService) {}

  public ngOnInit(): void {
    this.usersService.getUsers().subscribe(users => this.users = users);
  }

  public addUser(): void {
    this.tabListComponent.openTab('Nuovo utente', this.userEditTemplate, {}, true)
  }

  public onEditUser(person: User): void {
    this.tabListComponent.openTab(`Modifica ${person.name}`, this.userEditTemplate, person, true)
  }

  public onPersonFormSubmit(dataModel: User): void {
    if (dataModel.id > 0) {
      this.users = this.users.map(user => user.id === dataModel.id ? dataModel : user);
    } else {
      dataModel.id = Math.round(Math.random() * 100);
      this.users = [...this.users, dataModel]
    }

    this.tabListComponent.closeActiveTab()
  }
}
