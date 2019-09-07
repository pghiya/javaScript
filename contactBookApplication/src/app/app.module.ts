import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './views/home-page/home-page.component';

import { MaterialModule } from './shared/material/material.module'
import { from } from 'rxjs';
import { ContactListComponent } from './views/contact-list/contact-list.component';
import { AddContactComponent } from './shared/add-contact/add-contact.component';
import { ContactsServiceService } from './shared/services/contacts-service.service';
import {FormsModule, ReactiveFormsModule } from '@angular/forms'
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ContactListComponent,
    AddContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ContactsServiceService],
  bootstrap: [AppComponent],
  entryComponents: [AddContactComponent]
})
export class AppModule { }
