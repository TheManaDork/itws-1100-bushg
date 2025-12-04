<?php
  /* Delete an actor */
  ini_set('display_errors', 1);

  /* Create a new database connection object, passing in the host, username,
     password, and database to use. The "@" suppresses errors. */
  $db = new mysqli('localhost', 'root', 'root', 'iit');
  
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
      $table = $_POST["table"];
      if($table != "actors" && $table != "movies") {
        // echo '<script>console.log("Error in actor-delete.php: Invalid table");</script>';
      } else {
        // echo '<script>console.log("Table is '.$table.'");</script>';
      }
      // Setup a prepared statement. 
      $query = "delete from ".$table."s where rowId = ?";
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
