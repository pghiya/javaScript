
// Q. FIND OUT MINIMUM NUM. FROM A ARRAY OF SIZE N WITHOUT USING INBUILT METHODS

// There are 2 ways in wich I prefer to solve this
// 1st - This can be also used if asked to sort array in ascending
var a, size, temp;

a = [1, 10, 5, 12, 4, 13, 19]; //Give any random inputs
size = a.length; //Find Array Length
temp; //Temp variable used for swapping

for (var i = 0; i < 7; i++) {  //Outer loop to hold the elemnt value in each iteration
  for (var j = 0; j < 7; j++) {  //Inner loop to iterate over array and consider element for comparison
    if (a[i] < a[j] && i != j) { //Condition for checking Min value
      temp = a[i];
      a[i] = a[j];
      a[j] = temp;
    }
  }
}

console.log(a[0]);

//--------------------------------------------------------------------------------------------------

// 2nd
var a, Min;

a = [1, 10, 50, 12, 41, 13, 19];  //Give any random inputs
Min = a[0];  //Consider 1st element as Min

for (var i = 1; i < 7; i++) { //Iterate over array starting 2nd element.
  if (a[i] < Min) { //Check if element at current index is less than Min
    Min = a[i];  //If yes, now assign Min to new value i.e. element at that index 
  }
}

console.log(Min);

//-------------------------------------------------------------------------------------------------

//3rd If allowed to used Sort() method

a.sort(function(a,b){return b-a;}) //Sorting works alphabetically, So need to add function to sort numerically