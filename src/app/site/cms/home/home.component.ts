import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { hotelListModel } from 'src/app/dataModels/hotelList.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  campaignOne: FormGroup;
  hotelList: hotelListModel[] = [];
  searchHotelForm: FormGroup;
  paginate: any;

  constructor(private api: ApiService, public router: Router,
    private toastr: ToastrService) {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 16)),
      end: new FormControl(new Date(year, month, 20))
    });

    this.searchHotelForm = new FormGroup({
      guests: new FormControl('1', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      rooms: new FormControl('1', [Validators.required]),
    });
  } 

  ngOnInit(): void {
    this.viewAll('short');
  }

  searchHotels() {
    const params: any = {
      location: this.searchHotelForm.value.location,
      rooms: this.searchHotelForm.value.rooms,
      guests: this.searchHotelForm.value.guests
    }
    

    if (!Object.values(params).some(x => x == null || x == '')) {
      this.api.get(`hotels1`, params).subscribe((res: any) => {
        if (res.length!=0) {
          this.hotelList = res;
        } else {
          this.toastr.warning('Sorry! No Hotels Available', 'Information!');
        }
      }, (err: any) => {
        console.log(err);
      });
    } else {
      this.toastr.error('Enter all details', 'Error!');
    }    

  }

  viewAll(list: string) {
    if(list === 'long') {
      this.paginate = {}
    } else if (list === 'short') {
      this.paginate = {
        _page: 1,
        _limit: 4
      }
    }
    console.log(typeof(this.paginate));
    this.api.get(`hotels`, this.paginate).subscribe((res: any) => {
      if (res != []) {
        this.hotelList = res;
      } else {
        console.warn(res.message, 'warning');
      }
    }, (err: any) => {
      console.log(err);
    });
  }

  hotelDetail(id: any) {
    var a = moment(this.campaignOne.value.start, "YYYY-MM-DD");
    var b = moment(this.campaignOne.value.end, "YYYY-MM-DD");
    let stay: any = moment.duration(b.diff(a)).asDays();  
    
    this.router.navigate(['/hotelDetail'], 
      {queryParams: 
        { 
          id, 
          stay, 
          start_date : this.campaignOne.value.start,
          end_date : this.campaignOne.value.end,
        }
      })
  }

}
