import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridModule } from './components/grid/grid.module';
import { HttpClientModule } from "@angular/common/http";
import { GridPageComponent } from './pages/grid-page.component';
import { DynamicTabsPageComponent } from './pages/dynamic-tabs-page.component';
import { TabsModule } from "./components/tabs/tabs.module";
import { UsersModule } from "./shared/examples/users/users.module";

@NgModule({
  declarations: [
    AppComponent,
    GridPageComponent,
    DynamicTabsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GridModule,
    TabsModule,
    UsersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
