import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FetchUserDetailsService } from '../service/fetch-user-details.service'

@Component({
  selector: 'app-application-view',
  templateUrl: './application-view.component.html',
  styleUrls: ['./application-view.component.css']
})
export class ApplicationViewComponent implements OnInit {

  userDetails: any //to store the returned data
  repoDetails: String[]
  
  constructor(private fetchUserDetails: FetchUserDetailsService) { }

  ngOnInit(): void {
    this.fetchInitialData()
  }

  fetchInitialData(){
    this.fetchUserDetails.getUserDetails('').subscribe(data => {
      document.getElementById('loadingScreen').style.display = 'none';
      this.userDetails = data as String[];
      this.fetchUserNames(this.userDetails)
    }, (err: HttpErrorResponse) => {
      document.getElementById('loadingScreen').style.display = 'none';
      alert('Operation could not be completed.Please try in sometime')
      console.log(err.message);
    });
  }

  fetchUserNames(data){
    data.items.forEach(element => {
      this.fetchUserDetails.getUserName(element.url).subscribe(data => {
        document.getElementById('loadingScreen').style.display = 'none';
        element.fullName = data as String[];
      }, (err: HttpErrorResponse) => {
        document.getElementById('loadingScreen').style.display = 'none';
        console.log(err.message);
      })
    });
  }

  fetchRepoDetails(name,blockId,detailButton,collapseButton){
    this.fetchUserDetails.getRepoDetails(name).subscribe(data => {
      document.getElementById('loadingScreen').style.display = 'none';

      document.getElementById(blockId).style.display = 'block';
      document.getElementById(detailButton).style.display = 'none';
      document.getElementById(collapseButton).style.display = 'block';

      this.repoDetails = data as String[];
      console.log(this.repoDetails)
    }, (err: HttpErrorResponse) => {
      document.getElementById('loadingScreen').style.display = 'none';
      alert('Operation could not be completed.Please try in sometime')
      console.log(err.message);
    });
  }

  onShow(i,name) {
    var blockId = 'dummy_'+i,
        detailButton = 'details_'+i,
        collapseButton = 'collapse_'+i;

    // document.getElementById(blockId).style.display = 'block';
    // document.getElementById(detailButton).style.display = 'none';
    // document.getElementById(collapseButton).style.display = 'block';

    document.getElementById('loadingScreen').style.display = 'block';

    for(let j = 0; j < 3; j++){
      if(i != j){
        this.onCollapse(j);
      }
    }
    this.fetchRepoDetails(name,blockId,detailButton,collapseButton)
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
     this.fetchUserNames(this.userDetails)
   },(err: HttpErrorResponse) => {
     console.log(err.message);
   });
}

onSelect(event){
  var sortType = event.target.value;
  if(sortType == "Sort By Name - [A-Z]"){
    this.userDetails.items.sort(this.sortAZ)
  } else if(sortType == "Sort By Name - [Z-A]"){
    this.userDetails.items.sort(this.sortZA);
  } else if(sortType == "Sort By Rank - Ascending"){
    this.userDetails.items.sort(this.sortByRankAsc)
  } else if(sortType == "Sort By Rank - Descending"){
    this.userDetails.items.sort(this.sortByRankDesc)
  }
}

sortZA( a, b ) {
  if ( a.login > b.login ){
    return -1;
  }
  if ( a.login < b.login ){
    return 1;
  }
  return 0;
}

sortAZ( a, b ) {
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
