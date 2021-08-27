import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';


const COMPONENTS = [
  HeaderComponent, 
  FooterComponent,
];

@NgModule({
declarations: [
  COMPONENTS
],
exports: [
  COMPONENTS
],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
