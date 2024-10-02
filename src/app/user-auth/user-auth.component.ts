import { Component } from '@angular/core';
import { signUp } from '../data-type';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {
signUp(data: signUp) {
console.warn(data);

}

}
