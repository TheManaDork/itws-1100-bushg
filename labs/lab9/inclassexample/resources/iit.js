function validate(formObj) {
  
  if (formObj.firstNames.value == "") {
    alert("Please enter a first name");
    formObj.firstNames.focus();
    return false;
  }
  
  if (formObj.lastName.value == "") {
    alert("Please enter a last name");
    formObj.lastName.focus();
    return false;
  }
  
  if (formObj.dob.value == "") {
    alert("Please enter a date of birth");
    formObj.dob.focus();
    return false;
  }
    
  return true;
}


function validateMovieForm(formObj) {
  console.log("ERROR: validateMovieForm unimplemented");  
  return true;
}


$(document).ready(function() {
  
  // focus the name field on first load of the page
  console.log(document.documentURI);
  var tableName = '';
  var rowName = '';
  console.log("file name = " + document.documentURI.split("/")[document.documentURI.length - 1]);
  if(document.documentURI.split("/")[document.documentURI.length - 1] == "index.php") {
    $("#firstNames").focus();
    tableName = 'actors';
    rowName = 'actor';
  } else if(document.documentURI.split("/")[document.documentURI.length - 1] == "movies.php") {
    console.log("first element not focused");
    tableName = 'movies';
    rowName = 'movie';
  } else {
    console.log("ERROR: table type not found");
  }
     
  $(".deleteRow").click(function() {
    if(confirm("Remove "+rowName+"? (This action cannot be undone.)")) {
      
      // get the id of the clicked element's row
      var curId = $(this).closest("tr").attr("id");
      // Extract the db id of the actor from the dom id of the clicked element
      var rowId = curId.substr(curId.indexOf("-")+1);
      // Build the data to send. 
      var postData = {
        "id": rowId,
        "table": tableName
      };
      console.log(postData["table"]);
      // we could also format this as json ... jQuery will (by default) 
      // convert it into a query string anyway, e.g. 
      // var postData = { "id" : actorId };
      
      $.ajax({
        type: "post",
        url: "actor-delete.php",
        dataType: "json",
        data: postData,
        success: function(responseData, status){
          if (responseData.errors) {
            alert(responseData.errno + " " + responseData.error);
          } else {
            // Uncomment the following line to see the repsonse message from the server
            // alert(responseData.message);
            
            // remove the table row in which the image was clicked
            $("#" + curId).closest("tr").remove();
            
            // if a php generated message box is up, hide it:
            $(".messages").hide();
            
            // populate the js message box and show it:
            $("#jsMessages").html("<h4>Actor deleted</h4>").show();
            
            // re-zebra the table
            $("#"+rowName+"Table tr").each(function(i){
              if (i % 2 == 0) {
                // we must compensate for the header row...
                $(this).addClass("odd"); 
              } else {
                $(this).removeClass("odd");
              }
            });
          }
        },
        error: function(msg) {
          // there was a problem
          alert(msg.status + " " + msg.statusText);
        }
      });
      
    }
  });
  
  
});
