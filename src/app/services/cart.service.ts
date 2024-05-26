import { Injectable, effect, signal } from '@angular/core';
import { CartItem } from 'app/interfaces/cart-item';
import { Product } from 'app/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cart = signal<CartItem[]>([]);

  constructor() {
    effect(() => {
      console.log('updating cart')
      localStorage.setItem('cart', JSON.stringify(this.cart()));
    });
  }

  addProductToCart(product: Product, quantity: number) {
    console.log(product)
    const cartItem: CartItem = {product, quantity};
    this.cart.update(cart => [...cart, cartItem]);
    console.log(this.cart())
  }

  updateProductQuantity(productId: number, quantity: number) {
    if (quantity === 0) {
      this.removeProductFromCart(productId);
      return;
    }
    this.cart.update(cart => cart.map(cartItem => {
      if (cartItem.product.id === productId) {
        cartItem.quantity = quantity;
      }
      return cartItem;
    }));
  }

  removeProductFromCart(productId: number) {
    this.cart.update(cart => cart.filter(cartItem => cartItem.product.id !== productId));
  }

  fetchCart() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cart.set(JSON.parse(cart));
    }
  }
}
