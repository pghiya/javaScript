import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchUserDetailsService {

  constructor(private httpService: HttpClient) { }

  getUserDetails(value){
    value = value == '' ? 'a' : value;
    var url = 'https://api.github.com/search/users?q=' //Passing 'a' as uservalue to fetch inital data
    return this.httpService.get(url + value)
    //return this.httpService.get('./assets/data.json');
  }

  getUserName(userName){
    return this.httpService.get(userName) //Appending user id to fetch specific users Full name
  }

  getRepoDetails(name){
    var url = 'https://api.github.com/users/' + name +'/repos' //Base URL
    return this.httpService.get(url) //Appending user id to fetch specific users Full name
    //return this.httpService.get('./assets/repo.json');
  }
}
