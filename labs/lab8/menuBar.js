

$(document).ready(function() {
  $.ajax({
  	type: "GET",
  	url: "../iit/resources/menuItems.json",
  	dataType: "json",
  	success: function(responseData, status) {
  	  var output = "";
  	  output+= '<a class="button" href="' + menuItem.link + '">' + menuItem.title + '</a>'
  	  document.getElementById("nav-bar").innerHTML += output;
  	}
  });

});