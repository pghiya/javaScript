import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FetchUserDetailsService } from '../service/fetch-user-details.service'

@Component({
  selector: 'app-application-view',
  templateUrl: './application-view.component.html',
  styleUrls: ['./application-view.component.css']
})

export class ApplicationViewComponent implements OnInit {

  userDetails: any; //to store API fetched userdetails
  repoDetails: String[]; //to store API fecthed user specific repository details
  p: number = 1; //Default page
  paginationConfig : any; //Object for pagination config
  timeoutId: any;
  
  constructor(private fetchUserDetails: FetchUserDetailsService) { }

  //Method to fetch initial data when the application is loaded.
  ngOnInit(): void {
    //Setting parameters for pagination
    this.paginationConfig = {
      itemsPerPage : 3,
      currentPage : this.p
    }
    this.fetchInitialData('')
  }

  fetchInitialData(value) {
    this.fetchUserDetails.getUserDetails(value).subscribe(data => {
        //Aded to remove screen masking
        document.getElementById('loadingScreen').style.display = 'none';

        this.userDetails = data as String[];
        //Method to fetch user's fullname
        this.fetchUserNames(this.userDetails)
    }, (err: HttpErrorResponse) => {
        //Added to remove masking and show generic failure message to user and log actual reason in console.
        document.getElementById('loadingScreen').style.display = 'none';
      
        alert('Operation could not be completed.Please try in sometime')
        console.log(err.message);
    });
}

  fetchUserNames(data){
    //Iterating over all the users object fetched as respone during initial fetch call.
    data.items.forEach(element => {
      //element is the user object element.url is property which holds api pointing to user specific details
      this.fetchUserDetails.getUserName(element.url).subscribe(data => {
        document.getElementById('loadingScreen').style.display = 'none';
        //Storing users full name recived in response to main user object as property
        element.fullName = data as String[];
      }, (err: HttpErrorResponse) => {
        document.getElementById('loadingScreen').style.display = 'none';
        console.log(err.message);
      })
    });
  }

  //Logic to fetch details of a particular users repository, when requested.
  /*
  Parameters passed are :
  name = user,
  blockId = user specific details block id based on index
  detailsButton = id for details button based on index
  collapseButton = id for collapse button based on index 
  */
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

  //Method to be called when details button is clicked
  onShow(i,name) {
    //Generating ids to be used further by appending fixed string with specific unique index
    var blockId = 'detailsBlock_'+i,
        detailButton = 'details_'+i,
        collapseButton = 'collapse_'+i;

    document.getElementById('loadingScreen').style.display = 'block';

    //Logic to make sure at a time only single user can view details.
    for(let j = 0; j < this.paginationConfig.itemsPerPage; j++){
      if(i != j){
        this.onCollapse(j);
      }
    }
    this.fetchRepoDetails(name,blockId,detailButton,collapseButton)
  }

  //Method to be called when details are to be hidden or clicked on collapse button.
  onCollapse(i) {
    var blockId = 'detailsBlock_'+i,
       detailButton = 'details_'+i,
       collapseButton = 'collapse_'+i;

    if(document.getElementById(blockId)){
      document.getElementById(blockId).style.display = 'none';
      document.getElementById(detailButton).style.display = 'block';
      document.getElementById(collapseButton).style.display = 'none';
    }   
 }

 //Method to be called every time when user types anything search box
 onSearch(value){
   this.fetchUserDetails.getUserDetails(value).subscribe(data => {
    document.getElementById('loadingScreen').style.display = 'none';
     this.userDetails = data as String[];
     this.fetchUserNames(this.userDetails)
   },(err: HttpErrorResponse) => {
     document.getElementById('loadingScreen').style.display = 'none';
     alert('Operation could not be completed.Please try in sometime')
     console.log(err.message);
   });
}

onType(event){
  var me = this; // to Retain scope

  //Validation to allow only alphanumeric values
  if((event.target.value).match(/[^a-zA-Z0-9' ']/)){
      alert('Only alpha numeric values are accepted');
      event.target.value ='';
      return
  }

  //logic to not make API call for each key stroke but after 1 sec timeout to reduce the number of API interaction
  clearTimeout(this.timeoutId);
  this.timeoutId = setTimeout(function(){me.onSearch(event.target.value)},1000)
}

//Method to called when dropdown option is selected. Based on selection redirect to appropriate sorting method logic.
onSelect(event){
  var sortType = event.target.value;
  if(sortType == "Sort By Name (A-Z)"){
    this.userDetails.items.sort(this.sortAZ)
  } else if(sortType == "Sort By Name (Z-A)"){
    this.userDetails.items.sort(this.sortZA);
  } else if(sortType == "Sort By Rank ↑"){
    this.userDetails.items.sort(this.sortByRankAsc)
  } else if(sortType == "Sort By Rank ↓"){
    this.userDetails.items.sort(this.sortByRankDesc)
  }
}

//Sort descending based on username
sortZA( a, b ) {
  //condition to skip records with null username
  if(a.fullName.name == null || b.fullName.name == null ){
    return
  }else{
    //Logic to implement sorting & conversion toUpperCase for better sort results
    if ( a.fullName.name.toUpperCase() > b.fullName.name.toUpperCase() ){
      return -1;
    }
    if ( a.fullName.name.toUpperCase() < b.fullName.name.toUpperCase() ){
      return 1;
    }
    return 0;
  }
}

//Sort ascending based on username
sortAZ( a, b ) {
  //condition to skip records with null username
  if(a.fullName.name == null || b.fullName.name == null ){
    return
  }else{
    //Logic to implement sorting & conversion toUpperCase for better sort results
    if ( a.fullName.name.toUpperCase() < b.fullName.name.toUpperCase() ){
      return -1;
    }
    if ( a.fullName.name.toUpperCase() > b.fullName.name.toUpperCase() ){
      return 1;
    }
    return 0;
  }
}

//Sort ascending based on rank
sortByRankAsc(a,b){
  return a.score - b.score
}

//Sort descending based on rank
sortByRankDesc(a,b){
  return b.score - a.score
}

onPageChange(event){
  this.paginationConfig.currentPage = event
}

}
