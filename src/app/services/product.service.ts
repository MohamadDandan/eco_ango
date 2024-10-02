import { Injectable } from '@angular/core';
import { product } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  basicURL=environment.urlProduct;
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
}
 