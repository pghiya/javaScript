import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ApplicationViewComponent } from './application-view/application-view.component';
import { HttpClientModule } from '@angular/common/http'; //Offers a simplified client HTTP API for application
import { FetchUserDetailsService } from './service/fetch-user-details.service';
import { NgxPaginationModule } from 'ngx-pagination'; //Imported for pagination

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ApplicationViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [FetchUserDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
