import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  hotelData: any;
  hotel_price: any;
  campaignOne: FormGroup | any;
  searchHotelForm: FormGroup | any;

  constructor(private api: ApiService,
    private toastr: ToastrService,
    public router: Router) {
      this.campaignOne = new FormGroup({
        start: new FormControl(''),
        end: new FormControl('')
      });

      this.searchHotelForm = new FormGroup({
        guests: new FormControl('', [Validators.required]),
        rooms: new FormControl('', [Validators.required]),
      });
  }

  ngOnInit(): void {
    this.getContent();
  }

  getContent() {
    this.api.get(`bookings`).subscribe((res: any) => {
      if (res?.length != 0) {
        this.hotelData = res;

        this.hotelData.map((e: any)=> {
          
          this.campaignOne = new FormGroup({
            start: new FormControl(new Date( Number(moment(e?.stay_start).format('YYYY')),  Number(moment(e?.stay_start).format('MM')), Number(moment(e?.stay_start).format('DD')))),
            end: new FormControl(new Date( Number(moment(e?.stay_end).format('YYYY')),  Number(moment(e?.stay_end).format('MM')),  Number(moment(e?.stay_end).format('DD'))))
          });

          this.searchHotelForm = new FormGroup({
            guests: new FormControl(e?.guests, [Validators.required]),
            rooms: new FormControl(e?.rooms, [Validators.required]),
          });
        });

      } else {
        console.warn(res.message, 'warning');
      }
    }, (err: any) => {
      console.log(err);
    });
  }

  updateBooking(id: any) {
    var a = moment(this.campaignOne.value.start, "YYYY-MM-DD");
    var b = moment(this.campaignOne.value.end, "YYYY-MM-DD");
    let stay: any = moment.duration(b.diff(a)).asDays();  

    let hData: any = this.hotelData.find((e: any) => e.id === id);
    this.hotel_price = '$' + Math.round(stay * this.searchHotelForm.value.guests * this.searchHotelForm.value.rooms * hData.per_day_price_for_a_person);

    const data: any = {
      "name": hData.name,
      "location": hData.location,
      "image": hData.image,
      "rooms": this.searchHotelForm.value.rooms,
      "guests": this.searchHotelForm.value.guests,
      "desc": hData.desc,
      "total_price": this.hotel_price,
      "stay_start": this.campaignOne.value.start,
      "stay_end": this.campaignOne.value.end,
    }
    console.log(this.hotel_price);
    
    if (!Object.values(data).some(x => x == null || x == '')) {
      this.api.put(`bookings/${id}`, data).subscribe((res: any) => {
        if (res != {}) {
          this.toastr.success('Booking updated successfully', 'Success!');
          location.reload();
        } else {
          this.toastr.error('Something went wrong', 'Error!');
        }
      }, (err: any) => {
        console.log(err);
      }); 
    } else {
      this.toastr.error('Enter all details', 'Error!');
    }
  }

  calculatePrice(id: any) {
    var a = moment(this.campaignOne.value.start, "YYYY-MM-DD");
    var b = moment(this.campaignOne.value.end, "YYYY-MM-DD");
    let stay: any = moment.duration(b.diff(a)).asDays();  

    let data: any = this.hotelData.find((e: any) => e.id === id);
    this.hotel_price = '$' + Math.round(stay * this.searchHotelForm.value.guests * this.searchHotelForm.value.rooms * data.per_day_price_for_a_person);
    data.total_price = this.hotel_price;
  }

  deleteBooking(id: any) {
    this.api.delete(`bookings/${id}`).subscribe((res: any) => {
      if (res != '') {
        this.toastr.success('Booking deleted successfully!', 'Success');
        location.reload();
      } else {
        console.warn(res.message, 'warning');
      }
    }, (err: any) => {
      console.log(err);
    });
  }

}
