import { HttpClient } from '@angular/common/http';
import { logIn, signUp } from '../data-type';
import { environment } from './../../environments/environment';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUserAuth=new EventEmitter<boolean>(false);
private  basicURL=environment.urlUsers;
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  userSignUp(users:signUp){
    return this.http.post(this.basicURL,users,{observe:'response'})
    .subscribe((res)=>{
      if(res){
        localStorage.setItem('user',JSON.stringify(res.body));
        this.router.navigate(['/']);
        this.invalidUserAuth.emit(false);
      }
    });
  }
  userLogin(data:logIn){
    return this.http.get<signUp[]>(this.basicURL + `?email=${data.email}&password=${data.password}`, {
      observe: 'response',
    }).subscribe((res)=>{
      if(res && res.body?.length){
        localStorage.setItem('user',JSON.stringify(res.body[0]));
        this.router.navigate(['/']);
        this.invalidUserAuth.emit(false);
      }else{
        this.invalidUserAuth.emit(true);
      }
      
    })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }
}
