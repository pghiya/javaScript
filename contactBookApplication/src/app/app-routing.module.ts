import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from '../app/views/home-page/home-page.component';
import { ContactListComponent } from '../app/views/contact-list/contact-list.component'
import { from } from 'rxjs';


const routes: Routes = [
  {path : 'home',component:HomePageComponent},
  {path : 'contactList',component:ContactListComponent},
  {path : '**',component:HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
