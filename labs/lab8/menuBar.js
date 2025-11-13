

$(document).ready(function() {
  $.get({url: "../iit/resources/menuItems.json", function(data, status) {
  	alert("Data: " + data + "\nStatus: "+ status);
  }});

  document.getElementById("nav-bar").innerHTML += '<a class="Button" href="#">Hi</a>';
});