import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartItem } from 'app/interfaces/cart-item';
import { CartService } from 'app/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
cartServ=inject (CartService)
cartQuantity = computed(() => {
  return this.cartServ.cart().reduce((acc, cartItem: CartItem) => acc + cartItem.quantity, 0);
});

}
