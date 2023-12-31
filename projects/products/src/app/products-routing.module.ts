import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {ListComponent} from "./list/list.component";
import {FormComponent} from "./form/form.component";

const routes: Routes = [{
  path: '',
  component: AppComponent,
  children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    {
      path: 'list',
      component: ListComponent,
    },
    {
      path: 'form',
      component: FormComponent
    },
    {
      path: 'form/:id',
      component: FormComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
