

$(document).ready(function() {
  $.ajax({
  	type: "GET",
  	url: "http://bushgrpi.eastus.cloudapp.azure.com/iit/resources/menuItems.json",
  	dataType: "json",
  	success: function(responseData, status) {
  	  var output = "";
  	  // alert("success " + responseData);
      let menuItem = responseData[document.title]; // I implemented this for my home page as well, I am currently determining what json to load based on page title.
      if(!menuItem) {
        alert("error: menuItem array emptry");
      }
  	  $.each(menuItem, function(i, item) {
  	    output+= '<a class="button" href="' + item.link + '">' + item.title + '</a>';
  	  });
  	  document.getElementById("nav-bar").innerHTML += output;
  	}, error: function(msg) {
  		alert("darnit: " + msg.status + "\n" + msg.statusText);
  	}
  });

  // alert("past Ajax");


  document.querySelectorAll('.monty').forEach(function(object) {
    object.addEventListener("click", function() {
      // alert(object.src.substring(object.src[object.src.length-10], object.src[object.src.length-1]));
      // if(object.src.substring(object.src.lastIndexOf('/'), object.src[object.src.length-1]) == "mont1.jpg") {
      if(object.dataset.state=="1") {
        object.src = object.src.substring(0,object.src.lastIndexOf('/')+1) + "mont2.jpg";
        object.dataset.state = 2;
      } else {
        object.src = object.src.substring(0,object.src.lastIndexOf('/')+1) + "mont1.jpg";
        object.dataset.state = 1;
      }
    });
  });
});