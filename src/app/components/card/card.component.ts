import { Component, EventEmitter, Input, Output, input, output } from '@angular/core';
import { Product } from 'app/interfaces/product';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from 'app/services/cart.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  constructor(private cartService: CartService) {}
  @Input() product!: Product;
  quantity: number = 1;
  // product = input.required<Product>();
  public addToCartEvent = output<Product>();

  onAddToCart(): void {
    this.cartService.addProductToCart(this.product, this.quantity);
  }

  updateValue(event: KeyboardEvent) {
    console.log('pulsando tecla');
  }
}
