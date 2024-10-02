import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  popularProducts: product[]|undefined;
  products: product[]|undefined;
  constructor(
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.productService.popularProduct().subscribe((res)=>{
      this.popularProducts=res;
    })
    this.getData()
  }
  getData() {
    this.productService.trendyProducts().subscribe((res)=>{
      this.products=res
    });
  }
}
