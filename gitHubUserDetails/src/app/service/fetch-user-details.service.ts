import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchUserDetailsService {

  constructor(private httpService: HttpClient) { }

  getUserDetails(value){
    document.getElementById('loadingScreen').style.display = 'block';

    //for inital loading set undefined else set based on user input in searchbox
    value = value == '' ? undefined : value;

    var url = 'https://api.github.com/search/users?q=' //Fixed URL
    return this.httpService.get(url + value +'&per_page=100') //Appended with parameter & page limit
  }

  getUserName(userName){
    return this.httpService.get('./assets/names.json')
    //return this.httpService.get(userName + '?client_id=a&client_secret=b') //Appending user id to fetch specific users Full name
  }

  getRepoDetails(name){
    var url = 'https://api.github.com/users/' + name +'/repos' //Base URL with username as parameter
    return this.httpService.get(url)
  }
}
