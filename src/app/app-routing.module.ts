import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductsComponentModule } from './components/products/products.component-module';

@NgModule({
  imports: [RouterModule.forRoot([{ path: 'products', component: ProductsComponent }]), ProductsComponentModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
