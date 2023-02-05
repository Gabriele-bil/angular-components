import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './components/tab.component';
import { TabsComponent } from './components/tabs.component';
import { DynamicTabAnchorDirective } from './directives/dynamic-tab-anchor.directive';

@NgModule({
  declarations: [
    TabsComponent,
    TabComponent,
    TabsComponent,
    DynamicTabAnchorDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [TabsComponent, TabComponent]
})
export class TabsModule { }
