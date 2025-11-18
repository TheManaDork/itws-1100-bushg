

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


  document.getElementsByClassName('monty').addEventListener("click", function() {
    alert(this.src.substring(this.src[this.src.length-10], this.src[this.src.length-1]));
    // if(this.src.substring(this.src.lastIndexOf('/'), this.src[this.src.length-1]) == "mont1.jpg") {
    if(this.dataset.state="1") {
      this.src = this.src.substring(0,this.src.lastIndexOf('/')+1) + "mont2.jpg";
      this.dataset.state = 2;
    } else {
      this.src = this.src.substring(0,this.src.lastIndexOf('/')+1) + "mont1.jpg";
      this.dataset.state = 1;
    }
  });
});