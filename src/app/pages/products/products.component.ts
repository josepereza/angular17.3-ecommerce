import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CardComponent } from 'app/components/card/card.component';
import { Product } from 'app/interfaces/product';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [JsonPipe, CardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export default class ProductsComponent {
  private readonly productSvc = inject(ProductsService);
  products = this.productSvc.products;
 

  onAddToCart(product: Product): void {
   console.log(product)
  }
}
