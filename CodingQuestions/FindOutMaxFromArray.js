
// Q. FIND OUT MAXIMUM NUM. FROM A ARRAY OF SIZE N WITHOUT USING INBUILT METHODS

// There are 2 ways in wich I prefer to solve this
// 1st - This can be also used if asked to sort array in descending.
var a, size, temp;

a = [1, 10, 5, 12, 4, 13, 19]; //Give any random inputs
size = a.length; //Find Array Length
temp; //Temp variable used for swapping

for (var i = 0; i < 7; i++) {  //Outer loop to hold the elemnt value in each iteration
  for (var j = 0; j < 7; j++) {  //Inner loop to iterate over array and consider element for comparison
    if (a[i] > a[j] && i != j) { //Condition for checking Max value
      temp = a[i];
      a[i] = a[j];
      a[j] = temp;
    }
  }
}

console.log(a[0]);

//--------------------------------------------------------------------------------------------------

// 2nd
var a, max;

a = [1, 10, 50, 12, 41, 13, 19];  //Give any random inputs
Max = a[0];  //Consider 1st element as Max

for (var i = 1; i < 7; i++) { //Iterate over array starting 2nd element.
  if (a[i] > Max) { //Check if element at current index is greater than Max
    Max = a[i];  //If yes, now assign Max to new value i.e. element at that index 
  }
}

console.log(Max);

//-------------------------------------------------------------------------------------------------

//3rd If allowed to used Sort() method

a.sort(function(a,b){return a-b;}) //Sorting works alphabetically, So need to add function to sort numerically