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
    this.fetchInitialData()
  }

  fetchInitialData(){
    this.fetchUserDetails.getUserDetails('').subscribe(data => {
      this.userDetails = data as String[];
      //this.fetchUserNames(this.userDetails)
    }, (err: HttpErrorResponse) => {
      alert(err.message);
    });
  }

  fetchUserNames(data){
    data.items.forEach(element => {
      var id = element.login;
      this.fetchUserDetails.getUserName(id).subscribe(data => {
        element.fullName = data as String[];
      }, (err: HttpErrorResponse) => {
        console.log(err.message);
      })
    });
  }

  onShow(i) {
    var blockId = 'dummy_'+i,
        detailButton = 'details_'+i,
        collapseButton = 'collapse_'+i;

    document.getElementById(blockId).style.display = 'block';
    document.getElementById(detailButton).style.display = 'none';
    document.getElementById(collapseButton).style.display = 'block';
  }

  onCollapse(i) {
    var blockId = 'dummy_'+i,
       detailButton = 'details_'+i,
       collapseButton = 'collapse_'+i;

   document.getElementById(blockId).style.display = 'none';
   document.getElementById(detailButton).style.display = 'block';
   document.getElementById(collapseButton).style.display = 'none';
 }

 onSearch(event){
   this.fetchUserDetails.getUserDetails(event.target.value).subscribe(data => {
     this.userDetails = data as String[];
     //this.fetchUserNames(this.userDetails)
   },(err: HttpErrorResponse) => {
     console.log(err.message);
   });
}

onSelect(){
  var sortType = event.target.value;
  if(sortType == "[A-Z]"){
    this.userDetails.items.sort(this.sortAsc)
  } else if(sortType == "[Z-A]"){
    this.userDetails.items.sort(this.sortDesc);
  } else if(sortType == "By Rank - Ascending"){
    this.userDetails.items.sort(this.sortByRankAsc)
  } else if(sortType == "By Rank - Descending"){
    this.userDetails.items.sort(this.sortByRankDesc)
  }
  debugger
}

sortAsc( a, b ) {
  if ( a.login > b.login ){
    return -1;
  }
  if ( a.login < b.login ){
    return 1;
  }
  return 0;
}

sortDesc( a, b ) {
  if ( a.login < b.login ){
    return -1;
  }
  if ( a.login > b.login ){
    return 1;
  }
  return 0;
}

sortByRankAsc(a,b){
  return a.score - b.score
}

sortByRankDesc(a,b){
  return b.score - a.score
}
}
