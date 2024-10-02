import { product } from './../data-type';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import {faTrash,faEdit } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent implements OnInit {


  productList:undefined|product[];
  productMessage:undefined|string;
  iconDelete=faTrash
  iconEdite=faEdit
  constructor(private productService: ProductService){}
  ngOnInit(): void {
   this.getData();
   
  }
  delete(id: string) {
    this.productService.deleteProduct(id).subscribe((res:any)=>{
      if(res){
        this.getData();
         this.productMessage="You have successfully deleted"
      }
    });
    setTimeout(() => {
      this.productMessage=undefined;
    }, 3000);
    }
    getData(){
      this.productService.getProducts().subscribe((res:any)=>{
        if(res){
          this.productList=res;
         
        }
      }) 
    }


}
