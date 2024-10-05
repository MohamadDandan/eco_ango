import { Component, OnInit } from '@angular/core';
import { logIn, signUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent implements OnInit {
  showLogin = true;
  authError: string= '';
  constructor(private usersService: UserService) {}
  ngOnInit(): void {
    this.usersService.userAuthReload();
  }
  signUp(data: signUp) {
    this.usersService.userSignUp(data);
  }
  logIn(data: logIn) {
    this.usersService.userLogin(data);
    this.usersService.invalidUserAuth.subscribe(err => {
      if(err){
        this.authError = 'Invalid email or password';
      }
      
     });
  }
  openLogin() {
    this.showLogin = false;
  }
  openReg() {
    this.showLogin = true;
  }
}
