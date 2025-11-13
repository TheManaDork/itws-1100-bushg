

$(document).ready(function() {
  $.ajax({
  	type: "GET",
  	url: "../iit/resources/menuItems.json",
  	dataType: "json",
  	success: function(responseData, status) {
  	  var output = "";
  	  alert("success");
  	  $.each(responseData.items, function(i, item) {
  	    output+= '<a class="button" href="' + menuItem.link + '">' + menuItem.title + '</a>';
  	  });
  	  document.getElementById("nav-bar").innerHTML += output;
  	}, failure: function() {
  		alert("darnit");
  	}
  });

});