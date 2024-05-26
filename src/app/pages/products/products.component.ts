import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CardComponent } from 'app/components/card/card.component';
import { Product } from 'app/interfaces/product';
import { CartService } from 'app/services/cart.service';
import { ProductsService } from 'app/services/products.service';

@Component({
  host:{
    '(click)': 'updateValue($event)',
  },
  selector: 'app-products',
  standalone: true,
  imports: [JsonPipe, CardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export default class ProductsComponent {
  private readonly productSvc = inject(ProductsService);
  private readonly cartSvc= inject (CartService);
  products = this.productSvc.products;
 
  updateValue(event: KeyboardEvent) {
    console.log('raton click')
  }


 
}
