<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include('../resources/config/config.inc.php');
include('../resources/config/status.php');
use App\Enums\Status;
?>

<!DOCTYPE html>

<html>
  <head>
    <title>GRAYDON BUSH - COMMENTS</title>
    <link rel="stylesheet" href="/iit/resources/nav-pages.css">
    <script type="text/javascript" src="comments.js"></script>
  </head>
  <body>
    <?php
    // create database connection
      echo '<script>console.log("hi!");</script>';
    $dbOk = false;
    $db = new mysqli($GLOBALS['DB_HOST'], $GLOBALS['DB_USERNAME'], $GLOBALS['DB_PASSWORD'], $GLOBALS['DB_NAME']);
    if ($db->connect_error) {
      echo '<div class="messages">Could not connect to the database. Error: ';
      echo $db->connect_errno . ' - ' . $db->connect_error . '</div>';
    } else {
      echo '<script>console.log("db connected!");</script>';
      $dbOk = true;
    }
    
    $havePost = isset($_POST["save"]);
    //validation has already been done via comments.js
    if($dbOk && $havePost) {
      $nameInput = trim($_POST["name"]);
      $emailInput = trim($_POST["email"]);
      $commentInput = trim($_POST["comment"]);
      // construct auto-generated db vals
      $timestampInput = date("Y-m-d");
      $statusPending = Status::pending->value;

      $insQuery = "insert into comments (`name`,`email`,`comment`, `timestamp`, `status`) values(?,?,?,?,?)";
      $statement = $db->prepare($insQuery);
      $statement->bind_param("sssss", $nameInput, $emailInput, $commentInput, $timestampInput, $statusPending);
      $statement->execute();
      echo '<script>console.log("comment added!");</script>';
      header("Location: " . $_SERVER['PHP_SELF']);
      exit();
    }

    ?>


    <div id="nav-bar">
      <h1><a href="../"><-Intro to ITWS</a> <===> Comments</h1>
    </div>
    <div id="page-trifurcation">
      <img  class="page-item monty" data-set="1" src="/iit/resources/images/mont1.jpg" alt="pic of my cat">
      <div class="textbox page-item">
      <h3>Welcome to my comments section!</h3>
      <h3>Please politely join the convo!</h3>
      <form id="addForm" name="addForm" class="" action="" method="post" onsubmit="return validate(this);">
        <fieldset>
          <legend><h3 style="margin: 0 0;">Add Your Comment</h3></legend>
          <!-- <div class="formData"> -->

          <label for="name" class="field"><h3>Name</h3></label>
          <div class="value"><input type="text" size="60" placeholder="Please enter your name" name="name" id="name" /></div>

          <label for="email" class="field"><h3>Email</h3></label>
          <div class="value"><input type="text" size="60" placeholder="Please enter your email" name="email" id="email" /></div>

          <label for="comments" class="field"><h3>Comment</h3></label>
          <div class="value"><textarea rows="4" cols="40" name="comment" id="comment" placeholder="Please enter your Comments"></textarea></div>

          <input type="submit" value="save" id="save" name="save" />
       </fieldset>
      </form>
      <button id="results" onclick="displayResults(this)">Results</button>
        <!-- </div> -->
      <table id="actorTable">
        <?php
   if ($dbOk) {

      $query = 'select * from comments order by timestamp';
      $result = $db->query($query);
      $numRecords = $result->num_rows;
      echo '<script>console.log(`';
      echo print_r($result);
      echo '`);</script>';
      echo '<tr><th>Name:</th><th>Email:</th><th></th></tr>';
      for ($i = 0; $i < $numRecords; $i++) {
         $record = $result->fetch_assoc();
         if ($i % 2 == 0) {
            echo "\n" . '<tr id=""><td>';
         } else {
            echo "\n" . '<tr class="odd" id=""><td>';
         }
         echo htmlspecialchars($record['name']) . ', ';
         echo htmlspecialchars($record['email']);
         echo '</td><td>';
         echo htmlspecialchars($record['timestamp']);
         echo '</td><td>';
         echo '<img src="resources/delete.png" class="deleteActor" width="16" height="16" alt="delete actor"/>';
         echo '</td></tr>';
         // Uncomment the following three lines to see the underlying
         // associative array for each record.
         // echo '<tr><td colspan="3" style="white-space: pre;">';
         // print_r($record);
         // echo '</td></tr>';
      }

      $result->free();

      // Finally, let's close the database
      $db->close();
   }

   ?>
      </table>

      </div>
      <img style="transform: scaleX(-1);" class="page-item monty" data-set="1" src="/iit/resources/images/mont1.jpg" alt="pic of my cat">
      </div>
    </div>
  </body>
  </html>
