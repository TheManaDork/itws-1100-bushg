<?php
include('\iit\resources\config\config.inc.php');
include('\iit\resources\config\status.php');
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
    $dbOk = false;
    @$db = new mysqli($GLOBALS['DB_HOST'], $GLOBALS['DB_USERNAME'], $GLOBALS['DB_PASSWORD'], $GLOBALS['DB_NAME']);
    if ($db->connect_error) {
      echo '<div class="messages">Could not connect to the database. Error: ';
      echo $db->connect_errno . ' - ' . $db->connect_error . '</div>';
    } else {
      $dbOk = true;
    }
    
    $havePost = isset($_POST["save"]);
    //validation has already been done via comments.js
    if($dbOk) {
      $nameInput = trim($_POST["name"]);
      $emailInput = trim($_POST["email"]);
      $commentInput = trim($_POST["comment"]);
      // construct auto-generated db vals
      $timestampInput = date("Y-m-d");

      $insQuery = "insert into comments (`name`,`email`,`comment`, `timestamp`, `status`) values(?,?,?,?,?)";
      $statement = $db->prepare($insQuery);
      $statement->bind_param("sssss", $nameInput, $emailInput, $commentInput, $timestampInput, Status::pending->value);
      $statement->execute();
      echo '<script>console.log("comment added!");</script>';
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
      <form id="addForm" name="addForm" class="" action="#" method="post" onsubmit="return validate(this);">
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

      echo '<tr><th>Name:</th><th>Date of Birth:</th><th></th></tr>';
      for ($i = 0; $i < $numRecords; $i++) {
         $record = $result->fetch_assoc();
         if ($i % 2 == 0) {
            echo "\n" . '<tr id="actor-' . $record['actorid'] . '"><td>';
         } else {
            echo "\n" . '<tr class="odd" id="actor-' . $record['actorid'] . '"><td>';
         }
         echo htmlspecialchars($record['last_name']) . ', ';
         echo htmlspecialchars($record['first_names']);
         echo '</td><td>';
         echo htmlspecialchars($record['dob']);
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
