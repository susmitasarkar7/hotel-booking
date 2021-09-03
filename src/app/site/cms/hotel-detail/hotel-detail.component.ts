import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';
import { hotelListModel } from 'src/app/dataModels/hotelList.model';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {
  hotelData: any;
  hotel_price: Number | undefined;
  pageData: any;
  campaignOne: FormGroup;
  hotelList: hotelListModel[] = [];
  searchHotelForm: FormGroup;

  constructor(private api: ApiService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    public router: Router) {

    this.route.queryParams
      .subscribe(params => {
        this.pageData = params;
      }
    ); 
    

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date( Number(moment(this.pageData.start_date).format('YYYY')),  Number(moment(this.pageData.start_date).format('MM')), Number(moment(this.pageData.start_date).format('DD')))),
      end: new FormControl(new Date( Number(moment(this.pageData.end_date).format('YYYY')),  Number(moment(this.pageData.end_date).format('MM')),  Number(moment(this.pageData.end_date).format('DD'))))
    });

    this.searchHotelForm = new FormGroup({
      guests: new FormControl('', [Validators.required]),
      rooms: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getContent();
  }

  getContent(): void {
    const data: any = {id : this.pageData.id}
    this.api.get(`hotels`, data).subscribe((res: any) => {
      if (res != '') {
        this.hotelData = res[0];
        
        this.searchHotelForm = new FormGroup({
          guests: new FormControl(this.hotelData.guests, [Validators.required]),
          rooms: new FormControl(this.hotelData.rooms, [Validators.required]),
        });
        this.hotel_price = Math.round(this.pageData.stay * this.hotelData.guests * this.hotelData.rooms * this.hotelData.per_day_price_for_a_person);
      } else {
        console.warn(res.message, 'warning');
      }
    }, (err: any) => {
      console.log(err);
    });
  }

  bookHotel() {
    this.calculatePrice();
    
    if(this.api.isAuthenticated()) {
      const data: any = {
        "name": this.hotelData.name,
        "location": this.hotelData.location,
        "image": this.hotelData.image,
        "rooms": this.searchHotelForm.value.rooms,
        "guests": this.searchHotelForm.value.guests,
        "desc": this.hotelData.desc,
        "total_price": this.hotel_price,
        "stay_start": moment(this.campaignOne.value.start).format('YYYY-MM-DD'),
        "stay_end": moment(this.campaignOne.value.end).format('YYYY-MM-DD'),
        "per_day_price_for_a_person": this.hotelData.per_day_price_for_a_person
      }
      if (!Object.values(data).some(x => x == null || x == '')) {
        this.api.post('bookings', data).subscribe((res: any) => {
          if (res != {}) {
            this.toastr.success('Hotel Booked successfully', 'Success!');
          } else {
            this.toastr.error('Something went wrong', 'Error!');
          }
        }, (err: any) => {
          console.log(err);
        }); 
      } else {
        this.toastr.error('Enter all details', 'Error!');
      }    
    } else {
      this.router.navigate(['/login'])
    }
  }

  calculatePrice() {
    var a = moment(this.campaignOne.value.start, "YYYY-MM-DD");
    var b = moment(this.campaignOne.value.end, "YYYY-MM-DD");
    let stay: any = moment.duration(b.diff(a)).asDays();  

    this.hotel_price = Math.round(stay * this.searchHotelForm.value.guests * this.searchHotelForm.value.rooms * this.hotelData.per_day_price_for_a_person);
  }
}
