import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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


import{Title} from '@angular/platform-browser'
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};


@Component({
  selector: 'app-home',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  eventls : Eventls[]=[];
  eventByShowType: Eventls[]=[];
  countVisitors: number;
  calenderEvent:CalendarEvent[]=[];
  // events: CalendarEvent[]=[];
  events: CalendarEvent[]=[]

  showOnlineView: boolean=false;

  constructor(
    private HomeDashboardService: HomeDashboardService,
    public dialog: MatDialog,
    private titleservice:Title,
    private modal: NgbModal,
    // encapsulation: ViewEncapsulation.None,
  ) { }

  ngOnInit(): void {
    this.geteventlist();
    this.geteventByShowType();
    this.getCount()
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
        // console.log("dataaaaaaaaaaaaaaaaaaaaaaaa")
        // console.log(this.eventls)
        this.eventls.forEach(element => {
          let data = {
            start: new Date(element.start_event.toString().replace('.000Z','')),
            end: new Date(element.end_event.toString().replace('.000Z','')),
            actions: this.actions,
            title: (element.nama_event+" ("+element.ayat+")"),
            color: colors.blue,
            path: element.path
            }
          this.events.push(data)
          // console.log(this.events,"even tssssssssssss")
        });
        this.refresh.next();
      }
    )
  }

  change(){
    console.log("cekkkk")
  }

  getCount(){
    this.HomeDashboardService.getCount().subscribe(
      res=>{
        this.countVisitors = Number(Object.values(res));
      }
    )
  }

  //create visitor api
  //https://api.countapi.xyz/create?namespace=kppmgkjwsambirejo.herokuapp.com&value=1
  //call visitor api
  //https://api.countapi.xyz/update/kppmgkjwsambirejo.herokuapp.com/625cf1a7-cfd7-49df-808c-feb8f153e5ab?amount=1

  geteventByShowType(){
    this.HomeDashboardService.getEventByShowId(1).subscribe(
      res=>{
        this.eventByShowType = res;
        if(this.eventByShowType[0].nama_tipe_pelaksanaan=="online"){
          this.showOnlineView=true;
        }
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

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa fa-info-circle"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    }
  ];

  activeDayIsOpen: boolean = true;
  

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  // addEvent(): void {
  //   this.events = [
  //     ...this.events,
  //     {
  //       title: 'New event',
  //       start: startOfDay(new Date()),
  //       end: endOfDay(new Date()),
  //       color: colors.red,
  //       draggable: true,
  //       resizable: {
  //         beforeStart: true,
  //         afterEnd: true,
  //       },
  //     },
  //   ];
  // }

  // deleteEvent(eventToDelete: CalendarEvent) {
  //   this.events = this.events.filter((event) => event !== eventToDelete);
  // }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
