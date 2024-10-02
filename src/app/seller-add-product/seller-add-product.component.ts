import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css',
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined;

  constructor(private productService: ProductService) {}

  submit(data: product) {
    this.productService.addProdcut(data).subscribe((res) => {
      if (res) {
        this.addProductMessage = 'product added successfully';
      }
    });
    setTimeout(() => {
      this.addProductMessage = undefined;
    }, 3000);
  }
}
