import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from './pipes/search.pipe';
import { SortPipe } from './pipes/sort.pipe';



@NgModule({
  declarations: [
    GridComponent,
    SearchPipe,
    SortPipe
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
