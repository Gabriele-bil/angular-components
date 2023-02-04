import { Component } from '@angular/core';

@Component({
  selector: 'gb-root',
  template: `
    <div id="container">
      <div class="container pt-5">
        <div class="d-flex border-bottom my-3">
            <a routerLink="grid" class="display-5 text-decoration-none">Grid</a>
        </div>
        <router-outlet></router-outlet>
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
export class AppComponent {}
