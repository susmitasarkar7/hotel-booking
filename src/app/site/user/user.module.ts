import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UserComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UserModule { }
