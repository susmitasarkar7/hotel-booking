import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmsComponent } from './cms.component';
import { HomeComponent } from './home/home.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CmsComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'hotelDetail',
        component: HotelDetailComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
      },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
