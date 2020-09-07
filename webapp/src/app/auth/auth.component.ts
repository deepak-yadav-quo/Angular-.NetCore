import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService, AuthResponsePayload } from './auth.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{

  isLoginMode = true;
  authForm: FormGroup;

  error: string = '';
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if(!this.authForm.valid){
      return;
    }
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    let authObs: Observable<AuthResponsePayload>;

    if(this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      responePayload => {
        console.log(responePayload);
        //this.router.navigate(['/books'])
      },
      errorMessage => {
        this.error = errorMessage;
        console.log(errorMessage);
      }
    )
    
  }
}
