import { Component, EventEmitter, Output, input, output } from '@angular/core';
import { Product } from 'app/interfaces/product';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  product = input.required<Product>();
  public addToCartEvent = output<Product>();

  onAddToCart(): void {
    this.addToCartEvent.emit(this.product());
  }
}
