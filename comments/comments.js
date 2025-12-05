/* Lab 5 JavaScript File 
   Place variables and functions in this file */

function validate(formObj) {
   // put your validation code here
   // it will be a series of if statements
   var formObj = document.getElementById("addForm");
   var error = false;
   for(var e = 1; e < formObj.elements.length-1; e++) {
      if(formObj.elements[e].value == "") {
         alert("Some fields are still blank");
         error = true;
         return false;
      }
   }
   var formData = "";
   for(var e = 1; e < formObj.elements.length-1; e++) {
      formData = formData + "<br>" + formObj.elements[e].value;
   }
   return true;
}

//I realize that there is a placeholder holder attribute in html that would have done this for me, 
//I did this for the sake of getting more practice with JavaScript.
// document.addEventListener("click", function() {
//    var formObj = document.getElementById("addForm");
//    var labels = document.getElementsByTagName("label");
//    for(var e = 1; e < formObj.elements.length-1; e++) {
//       if(formObj.elements[e].value == "" && document.activeElement.id != formObj.elements[e].id) {
//          formObj.elements[e].value = "Please enter your " + document.querySelector('label[for='+formObj.elements[e].id+']').innerHTML;
//       } else if(formObj.elements[e].value == "Please enter your " + document.querySelector('label[for='+formObj.elements[e].id+']').innerHTML && document.activeElement.id == formObj.elements[e].id) {
//          formObj.elements[e].value = "";
//       }

//       if(formObj.elements[e].id == document.activeElement.id) {
//          console.log(formObj.elements[e].value == "Please enter your " + document.querySelector('label[for='+formObj.elements[e].id+']').innerHTML);
//       }
//    }
// });

function displayResults(button) {
   var formObj = document.getElementById("addForm");
   console.log("displaying Results " + button);
   if(formObj.firstName.value == "Please enter your First Name" || formObj.firstName.value == "") {
      console.log("Lacking Information");
      button.innerHTML = "Lacking Information";
      return;
   }
   if(formObj.lastName.value == "Please enter your Last Name" || formObj.lastName.value == "") {
      console.log("Lacking Information");
      button.innerHTML = "Lacking Information";
      return;
   }
   if(formObj.pseudonym.value == "Please enter your Nickname" || formObj.pseudonym.value == "") {
      console.log("Lacking Information");
      button.innerHTML = "Lacking Information";
      return;
   }
   button.innerHTML = formObj.firstName.value + " " + formObj.lastName.value + " is " + formObj.pseudonym.value;
}

// unused, but he's here anyways <3 cute little guy
function goToRPI() {
   window.location = "https://www.rpi.edu";
}
