import { CurrencyPipe, JsonPipe } from '@angular/common';
import {
  Component,
  Injector,
  OnInit,
  Signal,
  inject,
  input,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product';
import { toSignal } from '@angular/core/rxjs-interop';
//import { CartStore } from '@shared/store/shopping-cart.store';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe, JsonPipe],
  templateUrl: './details.component.html',
})
export default class DetailsComponent implements OnInit {
  starsArray: number[] = new Array(5).fill(0);

  // @Input({ alias: 'id' }) productId!: number;
  productId = input<number>(0, { alias: 'id' });
 // product!: Signal<Product | undefined>;
  product2 = signal<Product>({});
  //cartStore = inject(CartStore);
   miproducto! : Signal<Product | undefined>;
 


  private readonly productsSvc = inject(ProductsService);
  private readonly _sanitizer = inject(DomSanitizer);


constructor(private injector: Injector){
  
}
  ngOnInit(): void {
  //primera forma de hacerlo 
         this.miproducto=toSignal(this.productsSvc.getProductById(this.productId()),{injector: this.injector});

  //segunda forma de hacerlo
    this.productsSvc
      .getProductById(this.productId())
      .subscribe((data: Product) => {
        this.product2.set(data);
      });
  }

  onAddToCart() {
    //this.productsSvc.addToCart(this.product() as Product);
    console.log(this.miproducto())
  }

  generateSVG(index: number): SafeHtml {
    let svgContent = null;

    const rate = this.product2().rating?.rate as number;

    if (index + 1 <= Math.floor(rate)) {
      svgContent = `<svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="2" class="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
              </path>
            </svg>`;
    } else if (index < rate) {
      svgContent = `<svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="partialFillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" style="stop-color:currentColor; stop-opacity:1" />
              <stop offset="50%" style="stop-color:currentColor; stop-opacity:0" />
            </linearGradient>
          </defs>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#partialFillGradient)"></path>
        </svg>`;
    } else {
      svgContent = `<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              class="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
              </path>
            </svg>`;
    }
    return this._sanitizer.bypassSecurityTrustHtml(svgContent);
  }
}
