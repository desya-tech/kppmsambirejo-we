import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { Contact } from './contact';
import { Eventls } from './event';

@Injectable({
  providedIn: 'root'
})
export class HomeDashboardService {
  urlpath = environment.urlpath;
  constructor(
    private http: HttpClient, private router: Router
    ) { }

  // public getEventList(): Observable<Eventls[]>{
  //   return this.http.get<Eventls[]>(`${this.urlpath}/event`);
  // }

  public getEventList(){
    return this.http.get<any>(`${this.urlpath}/event`).pipe(map(res=>res.eventlist));
  }

  public getEventByShowId(id: number){
    return this.http.get<any>(`${this.urlpath}/event/geteventbyshowid/${id}`).pipe(map(res=>res.eventlist));
  }

  public getCount(){
    return this.http.get(`https://api.countapi.xyz/update/kppmgkjwsambirejo.herokuapp.com/625cf1a7-cfd7-49df-808c-feb8f153e5ab?amount=1`);
  }
}
