import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  campaignOne: FormGroup;
  hotelList: [] | any;
  searchHotelForm: FormGroup | any;

  constructor(private api: ApiService) {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 16)),
      end: new FormControl(new Date(year, month, 20))
    });
    this.searchHotelForm = new FormGroup({
      guests: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      rooms: new FormControl('', [Validators.required]),
    });
  } 

  ngOnInit(): void {
    this.getContent();
  }

  searchHotels() {
    let params = new HttpParams().set("location", this.searchHotelForm.value.location).set("rooms", this.searchHotelForm.value.rooms).set("guests", this.searchHotelForm.value.guests);
    this.api.get(`hotels`, params).subscribe((res: any) => {
      if (res != []) {
        this.hotelList = res;
      } else {
        console.warn(res.message, 'warning');
      }
    }, (err: any) => {
      console.log(err);
    });

  }

  getContent(): void {
    let paginate = new HttpParams().set("_page", 1).set("_limit", 4)
    this.api.get(`hotels`, paginate).subscribe((res: any) => {
      if (res != []) {
        this.hotelList = res;
      } else {
        console.warn(res.message, 'warning');
      }
    }, (err: any) => {
      console.log(err);
    });
  }

  viewAll() {
    this.api.get(`hotels`).subscribe((res: any) => {
      if (res != []) {
        this.hotelList = res;
      } else {
        console.warn(res.message, 'warning');
      }
    }, (err: any) => {
      console.log(err);
    });
  }

  hotelDetail(id: any, price: any, guests: any) {
    localStorage.setItem('hotel_id', id);
    
    var a = moment(this.campaignOne.value.start, "YYYY-MM-DD");
    var b = moment(this.campaignOne.value.end, "YYYY-MM-DD");
    let hotel_price: any = Math.round(moment.duration(b.diff(a)).asDays() * price * guests);
    localStorage.setItem('hotel_price', '$'+hotel_price);
  }

}
