import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  searchResult:product[]|undefined;
  constructor(
    private activeRoute: ActivatedRoute,
    private productService:ProductService
  ){}
  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    console.log(query);
    if(query!=null){
      this.productService.searchProduct(query).subscribe((res) => {
        this.searchResult = res;
      })
    }
  }


}
