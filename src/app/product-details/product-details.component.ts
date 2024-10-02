import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  productResult: product|undefined
  productQuantity: number=1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ){} 
  ngOnInit(): void {
   this.getResult();
  }
  getResult(){
      let productID=this.activatedRoute.snapshot.paramMap.get('id')
    if(productID!=null){
     this.productService.getProductById(productID).subscribe((res)=>{
       console.warn(res)
       this.productResult=res
     })
    }
  }
  handleQuantity(value: string) {
    if(this.productQuantity<20 && value==='plus'){
      this.productQuantity++;
    }else if(this.productQuantity>1 && value==='min'){
      this.productQuantity--;
    }
    }
}
