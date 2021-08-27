import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData: any = {
    email: "test@mail.com",
    password: "12345678"
  }
  loginForm: FormGroup | any;

  constructor(
    private router: Router) { }

  ngOnInit(): void {
    this.formInit(); 
  }
  
  formInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  public login() {
    console.log(this.loginForm.value);
    // return;
    if (this.loginForm.valid) {

      const data = {
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value,
      };

      if (JSON.stringify(data) === JSON.stringify(this.loginData)) {
        this.loginForm.reset();
        this.router.navigate(['/home']);
        localStorage.setItem('auth_token', 'true');
        localStorage.setItem('currentUser', JSON.stringify(data));
      } else {
        this.loginForm.markAllAsTouched();
      }

    // this.apiservice.post('user', data).subscribe((res: any) => {
        // console.log('Resp--->', res);
        // if (res.status === 200) {
    //       if (res.success) {
    //         this.loginForm.reset();
    //         this.router.navigate(['/home']);
    //       } else {
    //       }
    //     }, (err: any) => {
    //       console.log(err);
    //     });
    // // } else {
    //   this.loginForm.markAllAsTouched();
    }
  }    


}
