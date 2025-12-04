<?php
  /* Delete a row */
  
  /* Create a new database connection object, passing in the host, username,
     password, and database to use. The "@" suppresses errors. */
  @ $db = new mysqli('localhost', 'root', 'root', 'iit');
  
  if ($db->connect_error) {
    $connectErrors = array(
      'errors' => true,
      'errno' => mysqli_connect_errno(),
      'error' => mysqli_connect_error()
    );
    echo json_encode($connectErrors);
  } else {
    if (isset($_POST["id"])) {
      // get our id and cast as an integer
      $rowId = (int) $_POST["id"];
      
      // Setup a prepared statement. 
      $query = "";
      if($_POST["table"] == "actors") {
        $query = "delete from actors where rowId = ?";
      } else if($_POST["table"] == "movies") {
        $query = "delete from movies where rowId = ?";
      } else {
        //help
      }
      $statement = $db->prepare($query);
      // bind our variable to the question mark
      $statement->bind_param("i",$rowId);
      // make it so:
      $statement->execute();
      
      // return a json object that indicates success
      $success = array('errors'=>false,'message'=>'Delete successful');
      echo json_encode($success);
      
      // close the prepared statement obj and the db connection
      $statement->close();
      $db->close();
    }
  }
?>
