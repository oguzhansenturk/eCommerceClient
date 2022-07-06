import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModule } from './product/product.module';
import { HomeModule } from './home/home.module';
import { BasketModule } from './basket/basket.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductModule,
    HomeModule,
    BasketModule
  ]
})
export class ComponentsModule { }
