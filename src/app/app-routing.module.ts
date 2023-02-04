import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridPageComponent } from "./pages/grid-page.component";

const routes: Routes = [
  { path: '', redirectTo: 'grid', pathMatch: 'full' },
  { path: 'grid', component: GridPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
