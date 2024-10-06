import { cart } from './../data-type';
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
  cartData:product|undefined;

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
        let user = localStorage.getItem('user');
        if (user) {
          let userId = user && JSON.parse(user).id;
          this.productService.getCartList(userId);
          this.productService.cartData.subscribe((res) => {
            let item = res.filter(
              (item: product) =>
                productID.toString() === item.productId?.toString()
            );
            if (item.length) {
              this.cartData = item[0];
              this.removeCart = true;
            } else {
              this.removeCart = false;
            }
          });
        }
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
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...this.productResult,
          productId: this.productResult.id,
          userId,
        };
        delete cartData.id;
        this.productService.addToCart(cartData).subscribe((res) => {
          if (res) {
            this.productService.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }

  removeFromCart(productID: string) {
    if (!localStorage.getItem('user')) {
      this.productService.removeItemFromCart(productID);
    
    }else{
      this.cartData && this.productService.removeToCart(this.cartData.id)
        .subscribe((res)=>{
          
            let user=localStorage.getItem('user');
            let userId= user&& JSON.parse(user).id;
            this.productService.getCartList(userId);
           
          
        })
    }
    this.removeCart = false;
  }
}
