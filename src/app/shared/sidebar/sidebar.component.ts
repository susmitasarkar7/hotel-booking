import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public router : Router, private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('auth_token');
    this.router.navigate(['/home']);
    this.toastr.success('Logout Success!', 'Success');
    window.location.reload();
  }
}
