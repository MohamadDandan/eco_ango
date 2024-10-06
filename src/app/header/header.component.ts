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
  userName: string = '';
  sellerName: string = '';
  searchResult: undefined | product[];
  cartItems=0;
  constructor(private router: Router , private serviceProduct: ProductService) {}
  ngOnInit(): void {
    this.router.events.subscribe((value: any) => {
      if (value.url) {
        if (localStorage.getItem('seller') && value.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          this.menuType = 'seller';
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
          this.serviceProduct.getCartList(userData.id)
        } else {
          this.menuType = 'default';
        }
      }
    });
    let cartData=localStorage.getItem('localCart');
    if(cartData){
      this.cartItems=JSON.parse(cartData).length;
    }
    this.serviceProduct.cartData.subscribe((res)=>{
      this.cartItems= res.length; 
    })
  }
  logOut() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }
  userLogOut() {
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
    this.serviceProduct.cartData.emit([])
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
    this.router.navigate(['/product-details/' + value]);
  }
  submitSearch(value: string) {
    this.router.navigate([`search/${value}`]);
  }
}
