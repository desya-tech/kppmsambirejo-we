import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import{FormsModule} from '@angular/forms'
import { DataTablesModule } from 'angular-datatables';

import { HomeDashboardRoutingModule } from './home-dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';


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
  ]
})
export class HomeDashboardModule { }
