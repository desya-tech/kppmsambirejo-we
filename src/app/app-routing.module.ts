import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home-dashboard/home/home.component';
import { ProfileComponent } from './profile-dashboard/profile/profile.component';


const routes: Routes = [
{path : 'profile', component : ProfileComponent, data:{title: 'Profile'}},
{path : 'home', component : HomeComponent, data:{title: 'Home'}},
{path : '', redirectTo : '/home', pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
