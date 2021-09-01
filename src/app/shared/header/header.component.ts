import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    menuBackDrop: any;
    mainMenuWrap: any;
    isAuthenticated: Boolean | any;
  
    constructor(private api:ApiService, private router: Router,
      private toastr: ToastrService) { }
  
    ngOnInit(): void {
      this.isAuthenticated = this.api.isAuthenticated();
    }
  
    openMenu() {
      this.menuBackDrop = document.querySelector('.menuBackDrop');
      this.menuBackDrop.classList.add('active');
      this.mainMenuWrap = document.querySelector('.mainMenuWrap')
      this.mainMenuWrap.classList.add('active');
    }
    closeMenu() {
      this.menuBackDrop = document.querySelector('.menuBackDrop')
      this.menuBackDrop.classList.remove('active');
      this.mainMenuWrap = document.querySelector('.mainMenuWrap')
      this.mainMenuWrap.classList.remove('active');
    }

    logout() {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('auth_token');
      this.router.navigate(['/home']);
      this.toastr.success('Logout Success!', 'Success');
      location.reload();
    }
  
  }
