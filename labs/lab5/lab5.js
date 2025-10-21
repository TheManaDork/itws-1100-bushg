/* Lab 5 JavaScript File 
   Place variables and functions in this file */

function validate(formObj) {
   // put your validation code here
   // it will be a series of if statements
   var formObj = document.getElementById("addForm");
   var error = false;
   for(var e = 1; e < formObj.elements.length-1; e++) {
      if(formObj.elements[e].value == "" || formObj.elements[e].value == "Please enter your " + document.querySelector('label[for='+formObj.elements[e].id+']').innerHTML) {
         alert("The " + document.querySelector('label[for='+formObj.elements[e].id+']').innerHTML + " cannot be empty");
         error = true;
      }
   }
   if(error) {
      return false;
   }
   var formData = "";
   for(var e = 1; e < formObj.elements.length-1; e++) {
      formData = formData + "<br>" + formObj.elements[e].value;
      console.log("Element " + e + ":", formObj.elements[e].value);
   }
   document.getElementById("results").innerHTML = formData;
   // event.preventDefault();
   return false;
}


document.addEventListener("click", function() {
   var formObj = document.getElementById("addForm");
   var labels = document.getElementsByTagName("label");
   for(var e = 1; e < formObj.elements.length-1; e++) {
      if(formObj.elements[e].value == "" && document.activeElement.id != formObj.elements[e].id) {
         formObj.elements[e].value = "Please enter your " + document.querySelector('label[for='+formObj.elements[e].id+']').innerHTML;
         // console.log("text restored");
      } else if(formObj.elements[e].value == "Please enter your " + document.querySelector('label[for='+formObj.elements[e].id+']').innerHTML && document.activeElement.id == formObj.elements[e].id) {
         formObj.elements[e].value = "";
         // console.log("text cleared");
      }

      if(formObj.elements[e].id == document.activeElement.id) {
         console.log(formObj.elements[e].value == "Please enter your " + document.querySelector('label[for='+formObj.elements[e].id+']').innerHTML);
      }
   }
});



function goToRPI() {
   window.location = "https://www.rpi.edu";
}
