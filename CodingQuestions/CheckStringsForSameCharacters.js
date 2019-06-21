
// Q. FROM THE GIVEN 2 STRINGS OF SAME LENGTH, CHECK WETHER THEY HAVE SAME CHARACTERS

var str1,str2;

//Have any 2 string with same length. Like 1 used below or AGO/GOA or any random string
str1 = "CAR";
str2 = "ARC";

var a,b; // 2 variables to store the results after performing operations

//Using methods we converted string to array, sorted it and then back to string. And then perform String comparison
//split('') returns the array of characters in String => ["C", "A", "R"]
//sort() further on array alphabetically => ["A", "C", "R"]
//join() converted array back to string => "ACR"

a = str1.split('').sort().join('');
b = str2.split('').sort().join('');

console.log(a==b); //Returns true if found matching else false
