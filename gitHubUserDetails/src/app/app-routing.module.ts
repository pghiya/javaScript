import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from '../app/home/home.component'; //Imported Home Component
import {ApplicationViewComponent} from '../app/application-view/application-view.component' //Imported Application View Component 

const routes: Routes = [
  {path:'home', component:HomeComponent}, // added route path for homepage
  {path:'appView', component:ApplicationViewComponent}, //added route path for application view page
  {path: '**', redirectTo: 'home'} //Implemented to make sure whnever application is loaded it lands on the home page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
