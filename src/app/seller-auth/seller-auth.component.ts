import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { logIn, signUp } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css',
})
export class SellerAuthComponent implements OnInit {

  showLogin = false;
  authError:String = '';
  constructor(private sellerService: SellerService) {}
  ngOnInit(): void {
    this.sellerService.reloadSeller();
  }

  signUp(data: signUp): void {
    console.log(data);
    this.sellerService.userSignUp(data);
  }
  login(data: logIn) :void{
    this.sellerService.userLogin(data);
    this.sellerService.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError = 'Invalid email or password';
      }
    })
    }
  openLogin() {
    this.showLogin = true;
  }
  openReg() {
    this.showLogin = false;
  }
}
