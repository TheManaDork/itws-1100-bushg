

$(document).ready(function() {
  // alert("doc loaded");
  $.ajax({
  	type: "GET",
  	url: "resources/menuItems.json",
  	dataType: "json",
  	success: function(responseData, status) {
  	  var output = "";
  	  alert("success " + responseData);
      let menuItem = responseData[document.title];
  	  $.each(menuItem, function(i, item) {
        alert(item.title);
  	    output+= '<a class="button" href="' + item.link + '">' + item.title + '</a>';
  	  });
  	  document.getElementById("nav-bar").innerHTML += output;
      alert("|"+output+"|");
      // hi
  	}, error: function(msg) {
  		alert("darnit: " + msg.status + "\n" + msg.statusText);
  	}
  });

  // alert("past Ajax");
});