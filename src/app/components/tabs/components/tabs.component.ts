import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList, TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { TabComponent } from "./tab.component";
import { DynamicTabAnchorDirective } from "../directives/dynamic-tab-anchor.directive";

@Component({
  selector: 'gb-tabs',
  template: `
    <ul class="nav nav-tabs mb-3">
      <li *ngFor="let tab of tabs" class="nav-item me-3" (click)="selectTab(tab)" [class.active]="tab.active">
        <a class="nav-link">{{ tab.tabTitle }}</a>
      </li>

      <li *ngFor="let tab of dynamicTabs" class="nav-item me-3" (click)="selectTab(tab)" [class.active]="tab.active">
        <a class="nav-link">{{ tab.tabTitle }} <span class="tab-close" *ngIf="tab.isCloseable" (click)="closeTab(tab)">x</span></a>
      </li>
    </ul>
    <ng-content></ng-content>
    <ng-template gbDynamicTabAnchor #container></ng-template>
  `,
  styles: [`
    .nav-item {
      border: 1px solid #cfcfcf;
      cursor: pointer;
    }
  `]
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;
  @ViewChild(DynamicTabAnchorDirective) dynamicTabPlaceholder!: DynamicTabAnchorDirective;
  @ViewChild('container', { read: ViewContainerRef }) placeHolder!: ViewContainerRef;

  dynamicTabs: TabComponent[] = [];

  public ngAfterContentInit(): void {
    const activeTabs = this.tabs.filter(tab => tab.active);

    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  public selectTab(tab: TabComponent): void {
    this.tabs.toArray().forEach(tab => (tab.active = false));
    this.dynamicTabs.forEach(tab => (tab.active = false));

    tab.active = true;
  }

  public openTab(title: string, template: TemplateRef<any>, data: any, isCloseable = false): void {
    const componentRef = this.dynamicTabPlaceholder.viewContainer.createComponent(TabComponent);
    const instance: TabComponent = componentRef.instance as TabComponent;

    instance.tabTitle = title;
    instance.template = template;
    instance.dataContext = data;
    instance.isCloseable = isCloseable;

    this.dynamicTabs = [...this.dynamicTabs, instance];
    this.selectTab(instance)
  }

  public closeTab(tab: TabComponent): void {
    this.dynamicTabs.forEach((dynamicTab, index) => {
      if (dynamicTab === tab) {
        this.dynamicTabs.splice(index, 1);
        this.dynamicTabPlaceholder.viewContainer.remove(index);
        this.selectTab(this.tabs.first);
      }
    })
  }

  public closeActiveTab(): void {
    const activeTab = this.dynamicTabs.find(tab => tab.active);
    if (activeTab) {
      this.closeTab(activeTab);
    }
  }
}
