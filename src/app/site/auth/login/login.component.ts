import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData: any;
  loginForm: FormGroup | any;

  constructor(
    private api: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.formInit(); 
    this.api.get('users').subscribe((res: any) => {
      if (res !== {}) {
        this.loginData = res;
      } else {
        this.loginForm.markAllAsTouched();
      }
    }, (err: any) => {
      console.log(err);
    });   
  }
  
  formInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  public login() {
    if (this.loginForm.valid) {

      const data = {
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value,
      };

      this.loginData.find((e: any) => {
          if (e.email === data.email && e.password === data.password) {
            this.loginForm.reset();
            this.router.navigate(['/dashboard']);
            localStorage.setItem('auth_token', 'true');
            localStorage.setItem('currentUser', JSON.stringify(e));
          } else {
            this.loginForm.markAllAsTouched();
          }
      });
      

      }
    }

  }
