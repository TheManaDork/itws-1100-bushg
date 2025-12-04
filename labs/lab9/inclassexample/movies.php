<?php 
  include('includes/init.inc.php'); // include the DOCTYPE and opening tags
  include('includes/functions.inc.php'); // functions
?>
<title>PHP &amp; MySQL - ITWS</title>   

<?php include('includes/head.inc.php'); ?>

<h1>PHP &amp; MySQL</h1>
      
<?php include('includes/menubody.inc.php'); ?>


<!-- Here we will access the db -->
<?php

$db = new mysqli($GLOBALS['DB_HOST'], $GLOBALS['DB_USERNAME'], $GLOBALS['DB_PASSWORD'], $GLOBALS['DB_NAME']);

if($db->connect_errno) {
  echo 'failed to connect to MySQL:' . $db->connect_error;
}  else {
  echo "connected to db!";
}

?>


<p>Build the movie forms and output here.</p>

<form id="addForm" name="addForm" actions="index.php" method="post" onsubmit="return validateMoveForm(this);">
  <h1>This is where the form is.</h1>
</form>

<h3>Movies</h3>

<table id="movieTable">
  <?php
    
  ?>
</table>

<?php include('includes/foot.inc.php'); 
  // footer info and closing tags
?>
