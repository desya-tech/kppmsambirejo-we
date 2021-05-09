import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HomeDashboardService } from '../../home-dashboard/home-dashboard.service';
import { Contact } from '../contact';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-buttons';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogExampleComponent } from 'src/app/dialog-example/dialog-example.component';
import { Eventls } from '../event';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  eventls : Eventls[]=[];
  eventByShowType: Eventls[]=[];

  constructor(
    private HomeDashboardService: HomeDashboardService,public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.geteventlist();
    this.geteventByShowType();
  }

  countdown(eventdata){
    let waktu;
    let countDownDate = new Date(eventdata.start_event).getTime();
 
    var now = new Date().getTime();
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if(days == 0){
      return " Kurang dari sehari: " + hours + "h "+ minutes + "m lagi";
    }else if(hours==0){
      return "Yok Jangan Sampai Telat: "+ minutes + "m Lagi";
    }else{
      return "kurang : "+ days + " Hari Lagi";
    }
  }

  geteventlist(){
    this.HomeDashboardService.getEventList().subscribe(
      res=>{
        this.eventls = res;
        console.log("dataaaaaaaaaaaaaaaaaaaaaaaa")
        console.log(this.eventls)
      }
    )
  }

  geteventByShowType(){
    this.HomeDashboardService.getEventByShowId(1).subscribe(
      res=>{
        this.eventByShowType = res;
        console.log("showID 111111111111111111111111")
        console.log(this.eventByShowType)
        
      }
    )
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }

  openDialog() {
    this.dialog.open(DialogExampleComponent, {
      data: {
        animal: 'panda'
      }
    });
  }


}
