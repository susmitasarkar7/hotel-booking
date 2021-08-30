import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {
  hotelData: any;
  hotel_price: any;

  constructor(private api: ApiService,
    public router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.hotel_price = localStorage.getItem('hotel_price');
    this.getContent();
  }

  getContent(): void {
    let hotel_id: any = localStorage.getItem('hotel_id');
    let paginate = new HttpParams().set("id", hotel_id)
    this.api.get(`hotels`, paginate).subscribe((res: any) => {
      if (res != '') {
        this.hotelData = res[0];
      } else {
        console.warn(res.message, 'warning');
      }
    }, (err: any) => {
      console.log(err);
    });
  }

  bookHotel() {
    console.log('Hotel Booked successfully');
    this.router.navigate(['/home']);
    this.toastr.success('Hotel Booked successfully', 'Success!');
  }
}
