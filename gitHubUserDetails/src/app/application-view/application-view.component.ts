import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FetchUserDetailsService } from '../service/fetch-user-details.service'

@Component({
  selector: 'app-application-view',
  templateUrl: './application-view.component.html',
  styleUrls: ['./application-view.component.css']
})
export class ApplicationViewComponent implements OnInit {

  userDetails: String[] //to store the returned data

  constructor(private fetchUserDetails: FetchUserDetailsService) { }

  ngOnInit(): void {
    this.fetchUserDetails.getUserDetails().subscribe(data => {
      this.userDetails = data as String[];
    }, (err: HttpErrorResponse) => {
      alert(err.message);
    });
  }

}
