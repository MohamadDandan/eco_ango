import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  searchResult: undefined | product[];
  constructor(private router: Router, private serviceProduct: ProductService) {}
  ngOnInit(): void {
    this.router.events.subscribe((value: any) => {
      if (value.url) {
        if (localStorage.getItem('seller') && value.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          this.menuType = 'seller';
        } else {
          this.menuType = 'default';
        }
      }
    });
  }
  logOut() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }
  searchProduct(event: KeyboardEvent) {
    if (event) {
      const element = event.target as HTMLInputElement;
      this.serviceProduct.searchProduct(element.value).subscribe((res) => {
        if (res.length > 5) {
          res.length = length;
        }
        this.searchResult = res;
      });
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }
  redirectToDetails(value: string) {
   this.router.navigate(['/product-details/'+value]);
  }
  submitSearch(value: string) {
    this.router.navigate([`search/${value}`]);
  }
  
}
