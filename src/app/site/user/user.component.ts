import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  menuBackDrop: any;
  mainMenuWrap: any;
  isAuthenticated: Boolean | any;
  currentUser: any;

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.api.isAuthenticated();
    this.currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(this.currentUser);
    
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

}
