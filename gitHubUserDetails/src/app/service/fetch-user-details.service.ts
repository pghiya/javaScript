import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchUserDetailsService {

  constructor(private httpService: HttpClient) { }

  getUserDetails(){
    var url = 'https://api.github.com/search/users?q=a' //Passing 'a' as uservalue to fetch inital data
    return this.httpService.get(url)
  }


}
