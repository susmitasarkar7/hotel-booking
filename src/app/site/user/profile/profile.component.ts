import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup | any;
  loginData: any;

  constructor(
    private api: ApiService,
    private toastr: ToastrService) {
      this.profileForm = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        address: new FormControl('', [Validators.required]),
      });
    }

  ngOnInit(): void {
    this.formInit();
  }
  
  formInit() {
    let data: any = localStorage.getItem('currentUser');
    data = JSON.parse(data);
    this.api.get('users').subscribe((res: any) => {
      if (res.length != 0) {
        this.loginData = res.filter((e: any)=> e?.email === data?.email && e?.password === data?.password);
        
        this.profileForm = new FormGroup({
          firstName: new FormControl(this.loginData[0]?.firstName, [Validators.required]),
          lastName: new FormControl(this.loginData[0]?.lastName, [Validators.required]),
          email: new FormControl({value: this.loginData[0]?.email,  disabled: true}, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
          password: new FormControl({value: this.loginData[0]?.password,  disabled: true}, [Validators.required, Validators.minLength(8)]),
          address: new FormControl(this.loginData[0]?.address, [Validators.required]),
        });
      } else {
        this.profileForm.markAllAsTouched();
      }
    }, (err: any) => {
      console.log(err);
    });   
  }

  public update() {
    
    let data: any = localStorage.getItem('currentUser');
    data = JSON.parse(data);
    this.api.get('users').subscribe((res: any) => {
      if (res?.length != 0) {
        this.loginData = res.filter((e: any)=> e?.email === data?.email && e?.password === data?.password);
        if (this.profileForm.valid) {
          
          const data = {
            email: this.profileForm.controls.email.value,
            password: this.profileForm.controls.password.value,
            firstName: this.profileForm.controls.firstName.value,
            lastName: this.profileForm.controls.lastName.value,
            address: this.profileForm.controls.address.value,
          };

          this.api.put(`users/${this.loginData[0].id}`, data).subscribe((res: any) => {
            if (res?.length !== 0) {
              this.toastr.success('Profile updated successfully!', 'Success');
              location.reload();
            } else {
              this.toastr.error('Incorrect input', 'Error');
            }
          }, (err: any) => {
            console.log(err);
          });   
        }
      }
    })
  }

}
