

$(document).ready(function() {
  $.ajax({url: "../resources/menuItems.json", success: function(result) {
  	alert(result);
  }});

  document.getElementById("nav-bar").innerHTML += '<a class="Button" href="#">Hi</a>';
});