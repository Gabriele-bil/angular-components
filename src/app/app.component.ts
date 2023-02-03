import { Component } from '@angular/core';
import { Element } from './components/grid/grid.component';

@Component({
  selector: 'gb-root',
  template: `
    <div id="container">
      <div class="container pt-5">
        <h2>Grid</h2>
        <gb-grid
          [title]="'Utenti'"
          [dataSource]="test"
          [showIndex]="true"
          [enableSearch]="true"
          [enableSort]="true"
          (clickRow)="clickedRow($event)"
        />
      </div>
    </div>
  `,
  styles: [`
    #container {
      width: 100vw;
      min-height: 100vh;
      background-color: #eeeeee;
    }
  `]
})
export class AppComponent {
  public test = [
    {
      "id": 1,
      "firstName": "Terry",
      "lastName": "Medhurst",
      "age": 50,
      "gender": "male",
      "email": "atuny0@sohu.com",
    },
    {
      "id": 2,
      "firstName": "Gabriele",
      "lastName": "Elis",
      "age": 10,
      "gender": "female",
      "email": "atuny0@sohu.com",
    },
  ]

  public clickedRow(event: {el: Element, index: number }): void {
    console.log('Clicked', event.el);
    console.log('Index: ', event.index);
  }
}
