import { CurrencyPipe } from '@angular/common';
import { Component, Signal, computed, inject } from '@angular/core';
import { CartItem } from 'app/interfaces/cart-item';
import { CartService } from 'app/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export default class CartComponent {
 
  cartService=inject(CartService)
 
  cart = this.cartService.cart();
  cartTotal = computed(() => {
    return this.cart.reduce((acc, cartItem) => acc + cartItem.product.price! * cartItem.quantity, 0);
  });
 
  removeFromCart(productId: number) {
    this.cartService.removeProductFromCart(productId);
  }

  updateProductQuantity(productId: number, quantity: number) {
    this.cartService.updateProductQuantity(productId, quantity);
  }
}
