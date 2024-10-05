import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  productResult: product | undefined;
  productQuantity: number = 1;
  removeCart = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.getResult();
  }
  getResult() {
    let productID = this.activatedRoute.snapshot.paramMap.get('id');
    if (productID != null) {
      this.productService.getProductById(productID).subscribe((res) => {
        this.productResult = res;
        this.checkCart(productID);
      });
    }
  }
  checkCart(productID: any) {
    let cartData = localStorage.getItem('localCart');
    if (productID && cartData) {
      let items = JSON.parse(cartData);
      items = items.filter((item: product) => productID === item.id.toString());
      if (items.length) {
        this.removeCart = true;
      } else {
        this.removeCart = false;
      }
    }
  }
 
  handleQuantity(value: string) {
    if (this.productQuantity < 20 && value === 'plus') {
      this.productQuantity++;
    } else if (this.productQuantity > 1 && value === 'min') {
      this.productQuantity--;
    }
  }

  addtoCart() {
    if (this.productResult) {
      this.productResult.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.productService.localAddToCart(this.productResult);
        this.removeCart = true;
      }
    }
  }

  removeFromCart(productID: string) {
   this.productService.removeItemFromCart(productID); 
    this.removeCart = false;
    }
}
