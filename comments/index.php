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
    <style>
      .comment {
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
}

.comment-odd {
    background-color: #f9f9f9;
}

.comment-header {
    font-size: 0.9em;
    /*color: #555;*/
}

.comment-date {
    font-size: 0.8em;
    /*color: #999;*/
}

.comment-body {
    margin-top: 5px;
    font-size: 1em;
}

    </style>

  </head>
  <body>
    <?php
    // create database connection
    $dbOk = false;
    $db = new mysqli($GLOBALS['DB_HOST'], $GLOBALS['DB_USERNAME'], $GLOBALS['DB_PASSWORD'], $GLOBALS['DB_NAME']);
    if ($db->connect_error) {
      echo '<div class="messages">Could not connect to the database. Error: ';
      echo $db->connect_errno . ' - ' . $db->connect_error . '</div>';
    } else {
      $dbOk = true;
    }
    
    $havePost = isset($_POST["save"]);
    //validation has already been done via comments.js
    if($dbOk && $havePost) {
      $focusId = ''; // trap the first field that needs updating, better would be to save errors in an array

      if ($firstNames == '') {
        $errors .= '<li>First name may not be blank</li>';
        if ($focusId == '') $focusId = '#firstNames';
      }
      if ($lastName == '') {
        $errors .= '<li>Last name may not be blank</li>';
        if ($focusId == '') $focusId = '#lastName';
      }
      if ($dob == '') {
        $errors .= '<li>Date of birth may not be blank</li>';
        if ($focusId == '') $focusId = '#dob';
      }
      if (!$dobOk) {
        $errors .= '<li>Enter a valid date in yyyy-mm-dd format</li>';
        if ($focusId == '') $focusId = '#dob';
      }

      if ($errors != '') {
        echo '<div class="messages"><h4>Please correct the following errors:</h4><ul>';
        echo $errors;
        echo '</ul></div>';
        echo '<script type="text/javascript">';
        echo '  $(document).ready(function() {';
        echo '    $("' . $focusId . '").focus();';
        echo '  });';
        echo '</script>';
      } else {
        $nameInput = trim($_POST["name"]);
        $emailInput = trim($_POST["email"]);
        $commentInput = trim($_POST["comment"]);
        // construct auto-generated db vals
        $timestampInput = date("Y-m-d h:i:s");
        $statusPending = Status::pending->value;

        $insQuery = "insert into comments (`name`,`email`,`comment`, `timestamp`, `status`) values(?,?,?,?,?)";
        $statement = $db->prepare($insQuery);
        $statement->bind_param("sssss", $nameInput, $emailInput, $commentInput, $timestampInput, $statusPending);
        $statement->execute();
        echo '<script>console.log("comment added!");</script>';
        header("Location: " . $_SERVER['PHP_SELF']);
        exit();
      }
    }

    ?>


    <div id="nav-bar">
      <h1><a href="../"><-Intro to ITWS</a> <===> Comments</h1>
    </div>
    <div id="page-trifurcation">
      <img   class="page-item monty" data-set="1" src="/iit/resources/images/mont1.jpg" alt="pic of my cat">
      <div style="max-width: 50%" class="textbox page-item">
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
      <table id="actorTable">
        <?php
   if ($dbOk) {

      $query = "SELECT * FROM comments ORDER BY visitorId DESC";
      $result = $db->query($query);
      $numRecords = $result->num_rows;
      for ($i = 0; $i < $numRecords; $i++) {
        $record = $result->fetch_assoc();
        $rowClass = ($i % 2 == 0) ? 'comment-even' : 'comment-odd';
        $formattedDate = date("F j, Y h:i:sa", strtotime($record['timestamp'])); // nice date format

        echo '<div class="comment ' . $rowClass . '">';
        echo '<div class="comment-header">';
        echo '<strong>' . htmlspecialchars($record['name']) . '</strong>';
        echo ' (<a href="mailto:' . htmlspecialchars($record['email']) . '">' . htmlspecialchars($record['email']) . '</a>)';
        echo ' <span class="comment-date">' . $formattedDate . '</span>';
        echo '</div>'; // comment-header
        echo '<div class="comment-body">';
        echo nl2br(htmlspecialchars($record['comment'])); // preserve line  breaks
        echo '</div>'; // comment-body
        echo '</div>'; // comment
        // Uncomment the following three lines to see the underlying
        // associative array for each record.
        // echo '<tr><td colspan="3" style="white-space: pre;">';
        // print_r($record);
        // echo '</td></tr>';
      }

      $result->free();

      $db->close();
   }

   ?>
      </table>

      </div>
      <img style=" transform: scaleX(-1);" class="page-item monty" data-set="1" src="/iit/resources/images/mont1.jpg" alt="pic of my cat">
      </div>
    </div>
  </body>
  </html>
