import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | any;

  constructor(
    private api: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.formInit(); 
  }
  
  formInit() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    });
  }

  public register() {
    console.log(this.registerForm.value);
    // return;
    if (this.registerForm.valid) {

      const data = {
        email: this.registerForm.controls.email.value,
        password: this.registerForm.controls.password.value,
        firstName: this.registerForm.controls.firstName.value,
        lastName: this.registerForm.controls.lastName.value,
        address: this.registerForm.controls.address.value,
      };

        this.api.post('users', data).subscribe((res: any) => {
          console.log(res);
          if (res.status === 200) {
            this.registerForm.reset();
            this.router.navigate(['/login']);
          } else {
            this.registerForm.markAllAsTouched();
          }
        }, (err: any) => {
          console.log(err);
        });   
      }
    }

  }

