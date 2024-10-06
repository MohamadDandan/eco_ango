import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { cart, logIn, product, signUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent implements OnInit {
  showLogin = true;
  authError: string= '';
  constructor(
    private usersService: UserService,
    private productService:ProductService) {}
  ngOnInit(): void {
    this.usersService.userAuthReload();
  }
  signUp(data: signUp) {
    this.usersService.userSignUp(data);
    this.usersService.invalidUserAuth.subscribe(err => {
      if(err){
        console.warn("somthing wrong");
        
      }else{
        this.localCartToRemoteCart();
      }
      
     });
  }
  logIn(data: logIn) {
    this.usersService.userLogin(data);
    this.usersService.invalidUserAuth.subscribe(err => {
      if(err){
        this.authError = 'Invalid email or password';
      }else{
        this.localCartToRemoteCart();
      }
      
     });
  }
  openLogin() {
    this.showLogin = false;
  }
  openReg() {
    this.showLogin = true;
  }
  localCartToRemoteCart(){
    let data=localStorage.getItem('localCart');
    let user =localStorage.getItem('user');
    let userId=user&& JSON.parse(user).id;
    if(data!=null){
      let cartDataList:product[]=JSON.parse(data);
     
      cartDataList.forEach((product:product,index)=>{
        let cartData:cart ={
          ...product,
          productId : product.id,
          userId
        }
        delete  cartData.id
       setTimeout(() => {
        this.productService.addToCart(cartData).subscribe((res)=>{
          if(res){
            console.warn("data is stord ei n db")
          }
        })
       }, 5000);
       if(cartDataList.length===index+1){
        localStorage.removeItem('localCart');
      
       }
      })
    }
   setTimeout(() => {
    this.productService.getCartList(userId)
   }, 2000);
  }
}
