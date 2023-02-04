import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from './pipes/search.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { GridHeaderComponent } from './components/grid-header.component';
import { GridBodyComponent } from './components/grid-body.component';

@NgModule({
  declarations: [
    GridComponent,
    SearchPipe,
    SortPipe,
    GridHeaderComponent,
    GridBodyComponent,
  ],
  exports: [
    GridComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class GridModule { }
