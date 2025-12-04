<?php 
  include('includes/init.inc.php'); // include the DOCTYPE and opening tags
  include('includes/config.inc.php'); // database configuration
  include('includes/functions.inc.php'); // functions
?>
<title>PHP &amp; MySQL - ITWS</title>   

<?php include('includes/head.inc.php'); ?>

<h1>PHP &amp; MySQL</h1>
      
<?php include('includes/menubody.inc.php'); ?>


<!-- Here we will access the db -->
<?php
$dbOk = false;
$db = new mysqli($GLOBALS['DB_HOST'], $GLOBALS['DB_USERNAME'], $GLOBALS['DB_PASSWORD'], $GLOBALS['DB_NAME']);

if($db->connect_errno) {
  echo 'failed to connect to MySQL:' . $db->connect_error;
}  else {
  $dbOk = true;
  echo "connected to db!";
}

// check for input:
$havePost = isset($_POST["save"]);

// If we just got input:
if($havePost) {
  $title = htmlspecialchars(trim($_POST["title"]));
  $year = htmlspecialchars(trim($_POST["year"]));

  $errors = '';
  if($title == '') {
    $errors .= '<li>Title may not be blank</li>';
  } else if($year == '') {
    $errors .= '<li>Year may not be blank</li>';
  }
  if ($errors != '') {
      echo '<div class="messages"><h4>Please correct the following errors:</h4><ul>';
      echo $errors;
      echo '</ul></div>';
      echo '<script type="text/javascript">';
      echo '  $(document).ready(function() {';
      echo '  });';
      echo '</script>';
   } else {
    if($dbOk == true) {

      echo "<h3>Proceding to input input to table<h3>";
      console.log("Proceding to input input to table");
    }
   }
}

?>


<p>Build the movie forms and output here.</p>

<form id="addForm" name="addForm" actions="index.php" method="post" onsubmit="return validateMovieForm(this);">
  <!-- <h1>This is where the form is.</h1> -->
  <input type="text" name="title" value="WW2">
  <input type="text" name="year" value="1936">
  <input type="submit" value="Submit">
</form>

<h3>Movies</h3>

<table id="movieTable">
  <?php
    // load the db
  ?>
</table>

<?php include('includes/foot.inc.php'); 
  // footer info and closing tags
?>
