/* Lab 5 JavaScript File 
   Place variables and functions in this file */

function validate(formObj) {
   // put your validation code here
   // it will be a series of if statements

   // if(formObj.firstName.value == "") {
   //    alert("You must enter a first name");
   //    formObj.firstName.focus();
   //    return false;
   // }
   // if(formObj.lastName.value == "") {
   //    alert("You must enter a last name");
   //    formObj.lastName.focus();
   //    return false;
   // }
   // if(formObj.title.value == "") {
   //    alert("You must enter a title");
   //    formObj.title.focus();
   //    return false;
   // }
   // if(formObj.org.value == "") {
   //    alert("You must enter an organization");
   //    formObj.org.focus();
   //    return false;
   // }
   // if(formObj.pseudonym.value == "") {
   //    alert("You must enter a nickname");
   //    formObj.pseudonym.focus();
   //    return false;
   // }
   var formData = "";
   for(var e = 1; e < formObj.elements.length-1; e++) {
      formData = formData + "<br>" + formObj.elements[e].value;
   //    alert(formObj.elements[e].name + " : " + formObj.elements[e].value);
   // }
   // console.log("Form has " + formObj.elements.length + " elements.");
   // for (var e = 0; e < formObj.elements.length; e++) {
      console.log("Element " + e + ":", formObj.elements[e]);
   }
   document.getElementById("results").innerHTML = formData;
   // event.preventDefault();
   return false;
}


function clearPlaceholderText(textbox) {
   console.log(textbox);
   console.log(textbox.innerHTML);
   if(textbox.innerHTML == "Please enter your comments") {
      textbox.innerHTML = "";
   }
}

document.addEventListener("click", restorePlaceholderText());
function restorePlaceholderText() {
   textbox = document.getElementById("comments");
   console.log("textbox: " + textbox);
   // if(textbox.innerHTML == "") {
      // textbox.innerHTML = "Please enter your comments";
   // }
}



function goToRPI() {
   window.location = "https://www.rpi.edu";
}
