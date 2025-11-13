

$(document).ready(function() {
  // alert("doc loaded");
  $.ajax({
  	type: "GET",
  	url: "../iit/resources/menuItems.json",
  	dataType: "json",
  	success: function(responseData, status) {
  	  var output = "";
  	  alert("success");
  	  $.each(responseData.items, function(i, menuItem) {
  	    output+= '<a class="button" href="' + menuItem.link + '">' + menuItem.title + '</a>';
  	  });
  	  document.getElementById("nav-bar").innerHTML += output;
  	}, error: function() {
  		alert("darnit");
  	}
  });

  // alert("past Ajax");
});