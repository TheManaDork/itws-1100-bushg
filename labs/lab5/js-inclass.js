/* In-class JavaScript File 
   Place variables and functions in this file */

// variables declared outside of functions are global (scope)
var ex = "An example."
var firstName = "Hector";
var age = 19;
var insuranceCutOffAge = 26;


function example() {
  // alert(example);
  document.getElementById("output").innerHTML = "HO";
  // return "HI";  
}

function example2() {
  // variables declared inside a function are local to that function (scope)
  var ex = "A different example.";
  alert(example);
}

function text() {

}
