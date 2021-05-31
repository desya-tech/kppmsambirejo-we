import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import{FormsModule} from '@angular/forms'
import { DataTablesModule } from 'angular-datatables';

import { HomeDashboardRoutingModule } from './home-dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HomeComponent],
  entryComponents:[DialogExampleComponent]
  ,
  imports: [
    CommonModule,
    HomeDashboardRoutingModule,
    BrowserModule,
    FormsModule,
    DataTablesModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ]
})
export class HomeDashboardModule { }
