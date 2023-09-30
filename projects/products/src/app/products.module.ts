import { NgModule } from '@angular/core';
import { ProductsRoutingModule } from './products-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ProductsService} from "../../../../src/_services/products.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    ProductsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgForOf,
    HttpClientModule,
    NgIf
  ],
  providers: [
    ProductsService,
    HttpClient,
  ],
  bootstrap: [AppComponent]
})
export class ProductsModule { }
