

$(document).ready(function() {
  // alert("doc loaded");
  $.ajax({
  	type: "GET",
  	url: "resources/menuItems.json",
  	dataType: "json",
  	success: function(responseData, status) {
  	  var output = "";
  	  alert("success " + responseData);
  	  $.each(responseData.items, function(i, menuItem) {
  	    output+= '<a class="button" href="' + menuItem.link + '">' + menuItem.title + '</a>';
  	  });
  	  document.getElementById("nav-bar").innerHTML += output;
      alert("|"output+"|");
      // hi
  	}, error: function(msg) {
  		alert("darnit: " + msg.status + "\n" + msg.statusText);
  	}
  });

  // alert("past Ajax");
});