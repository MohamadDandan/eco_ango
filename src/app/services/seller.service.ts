import { environment } from './../../environments/environment.development';


import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { logIn, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  basicURL=environment.urlSeller
  constructor(
    private http: HttpClient, 
    private router: Router,
    ) {}

  userSignUp(data: signUp) {
    return this.http
      .post(this.basicURL, data, { observe: 'response' })
      .subscribe((res) => {
        console.log(res);
        if (res) {
          this.isSellerLoggedIn.next(true);
          localStorage.setItem('seller', JSON.stringify(res.body));
          this.router.navigate(['seller-home']);
        }
      });
  }
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
  userLogin(data: logIn) {
    this.http
      .get(this.basicURL + `?email=${data.email}&password=${data.password}`, {
        observe: 'response',
      })
      .subscribe((res: any) => {
        if (res && res.body && res.body.length === 1) {
          this.isLoginError.emit(false);
          localStorage.setItem('seller', JSON.stringify(res.body));
          this.router.navigate(['seller-home']);
        } else {
          console.warn('login failed');
          this.isLoginError.emit(true);
        }
      });
  }
}
