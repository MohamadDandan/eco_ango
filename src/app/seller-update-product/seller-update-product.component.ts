import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css',
})
export class SellerUpdateProductComponent implements OnInit {
  productData: product | undefined;
  constructor(
    private activeRoute: ActivatedRoute,
    private serviceProduct: ProductService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getProductbyID(this.getID());
  }
  getID(): string {
    let productId = this.activeRoute.snapshot.paramMap.get('id');
    if (productId != null) return productId;
    return '';
  }
  getProductbyID(productId: string) {
    if (productId != null) {
      this.serviceProduct
        .getProductById(productId)
        .subscribe((product: any) => {
          this.productData = product;
        });
    } else {
      console.warn('Invalid product id');
    }
  }
  submit(data: product) {
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.serviceProduct.editProduct(data).subscribe((res: any) => {
      if (res) {
        this.router.navigate(['seller-home']);
      }
    });
  }
}
