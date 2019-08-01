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

  getUserName(userName){
    var url = 'https://api.github.com/users/' //Base URL
      return this.httpService.get(url + userName) //Appending user id to fetch specific users Full name
  }
}
