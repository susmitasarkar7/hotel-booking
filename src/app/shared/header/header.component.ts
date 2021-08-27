import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    menuBackDrop: any;
    mainMenuWrap: any;
  
    constructor() { }
  
    ngOnInit(): void {
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
