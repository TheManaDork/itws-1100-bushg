//Quiz 2
//  Put your javascript here in a document.ready function
var defaultTitle;

$(document).ready(function () {
  // alert("Document is loaded!");
  document.title = "Intro to ITWS - Quiz 2";
  defaultTitle = document.getElementsByTagName("title")[0].innerHTML;

  $("button").click(function() {
  	// console.log("YO");
  	// console.log(document.getElementsByTagName("title")[0].innerHTML);
  	// console.log(document.title.innerHTML);
  	// document.getElementsByTagName("title")[0].innerHTML = defaultTitle;
  	if(document.getElementsByTagName("title")[0].innerHTML == defaultTitle) {
  	  document.getElementsByTagName("title")[0].innerHTML = "Graydon Bush - Quiz 2";
  	} else {
  	  document.getElementsByTagName("title")[0].innerHTML = defaultTitle;
  	}
  });


  jQuery("#lastName").hover(function() {
  	//mouseOver
  	$("#lastName").addClass("makeItPurple");
  }, function(){
  	//mouseLeave
  	$("#lastName").removeClass("makeItPurple");
  });
  //.makeItPurple

});