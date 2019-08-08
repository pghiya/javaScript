import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchUserDetailsService {

  //Added clientId & clientSecret key to increase rate limit of API by registering github app
  private clientId = 'cd2209e829740222b473';
  private clientSecret = '64e256f2ea24174d3d04c1ec81a9db5d4c7055c3';

  constructor(private httpService: HttpClient) { }

  getUserDetails(value){
    document.getElementById('loadingScreen').style.display = 'block';

    //for inital loading set undefined else set based on user input in searchbox
    value = value == '' ? undefined : value;

    var url = 'https://api.github.com/search/users?q=' //Fixed URL
    return this.httpService.get(url + value + '&per_page=60&client_id=' +this.clientId+ '&client_secret=' +this.clientSecret)//Appended with parameter & page limit along with clientId & secet key
  }

  getUserName(userName){
    var url = userName + '?client_id=' +this.clientId+ '&client_secret=' +this.clientSecret;
    return this.httpService.get(url) //API to fetch specific users Full name
  }

  getRepoDetails(name){
    var url = 'https://api.github.com/users/' + name +'/repos?client_id=' +this.clientId+ '&client_secret=' +this.clientSecret; //Base URL with username as parameter & clientId with secret key
    return this.httpService.get(url)
  }
}
