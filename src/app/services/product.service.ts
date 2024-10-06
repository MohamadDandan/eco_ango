import { cart, product } from './../data-type';
import { Injectable, EventEmitter } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  basicURL=environment.urlProduct;
  cartURL=environment.urlCart;
  cartData=new EventEmitter<product[]|[]>()
  constructor(private http:HttpClient) { }
  addProdcut(data:product){
   return this.http.post(this.basicURL,data);
  }
  getProducts(){
    return this.http.get<product[]>(this.basicURL);
  }
  getProductById(id:string){
    return this.http.get<product>(this.basicURL+`/${id}`);
  }
  deleteProduct(id:string){
    return this.http.delete(this.basicURL+`/${id}`);
  }
  editProduct(data:product){
    return this.http.put<product>(this.basicURL+`/${data.id}`,data);
  }
  popularProduct(){
    return this.http.get<product[]>(this.basicURL+'?_limit=3');
  }
  trendyProducts(){
    return this.http.get<product[]>(this.basicURL+'?_limit=8');
  }
  searchProduct(query:string){
    return this.http.get<product[]>(this.basicURL+`?q=${query}`);
  }
   localAddToCart(data:product){
    let cartData=[];
    let localCart=localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]));
      this.cartData.emit([data]);
    }else{
      cartData=JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart',JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
   }
  removeItemFromCart(productId:string){
    let cartData=localStorage.getItem('localCart');
    if(cartData){
      let items:product[]=JSON.parse(cartData);
      items=items.filter((item:product)=>productId!==item.id)
      localStorage.setItem('localCart',JSON.stringify(items));
      this.cartData.emit(items);
    }
  } 

  addToCart(cartData:cart){
    return this.http.post(this.cartURL,cartData); 
  }

  getCartList(userId:string){
    return this.http.get<product[]>(this.cartURL+'?userId='+userId,{
      observe:'response',
    }).subscribe((res)=>{
      if(res && res.body){
        this.cartData.emit(res.body);
      }
    })
  }

  removeToCart(cartId:string){
    return this.http.delete(this.cartURL+'/'+cartId);
  }
}
 