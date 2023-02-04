import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridModule } from './components/grid/grid.module';
import { HttpClientModule } from "@angular/common/http";
import { GridPageComponent } from './pages/grid-page.component';

@NgModule({
  declarations: [
    AppComponent,
    GridPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
