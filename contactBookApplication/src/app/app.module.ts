import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomePageComponent } from './views/home-page/home-page.component';
import { ContactListComponent } from './views/contact-list/contact-list.component';
import { AddContactComponent } from './shared/add-contact/add-contact.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';

import { ContactsServiceService } from './shared/services/contacts-service.service';

import { MaterialModule } from './shared/material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ContactListComponent,
    AddContactComponent,
    ConfirmDialogComponent
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
  entryComponents: [
    AddContactComponent,
    ConfirmDialogComponent
  ]
})
export class AppModule { }
