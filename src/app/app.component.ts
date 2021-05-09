import { Component, OnInit } from '@angular/core';
import{Title} from '@angular/platform-browser'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  constructor(private titleservice:Title, private router: Router,private activePage: ActivatedRoute){}
  ngOnInit(){
    this.chageTitle()
  }

  chageTitle(){
    this.router.events.subscribe(event =>{
      switch (true) {
        case event instanceof NavigationEnd:
          this.titleservice.setTitle(this.activePage.firstChild.snapshot.data.title);          
          break;
        default:
          break;
      }
    });
  }

  
}
