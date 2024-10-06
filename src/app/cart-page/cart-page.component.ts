import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, cartSummary } from '../data-type';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {

  cartProductData: cart[]|undefined
  priceSummary: cartSummary={
    price:0,
    discount:0,
    tax:0,
    delivary:0, 
    total:0
  }
  constructor(
    private productService: ProductService
  ){}

  ngOnInit(): void {
  this.productService.getCartData().subscribe(data => {
    this.cartProductData=data
    let price=0;
    data.forEach((item)=>{
      if(item.quantity){
        price+=item.price*item.quantity
      }
      this.priceSummary.price=price;
      this.priceSummary.discount=price/10;
      this.priceSummary.tax=price*0.05;
      this.priceSummary.delivary=price*0.02;
      this.priceSummary.total=price+price*0.05+price*0.02-(price/10);

    })
  })
  }

}
