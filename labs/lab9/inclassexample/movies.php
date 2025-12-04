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
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$dbOk = false;
$db = new mysqli($GLOBALS['DB_HOST'], $GLOBALS['DB_USERNAME'], $GLOBALS['DB_PASSWORD'], $GLOBALS['DB_NAME']);

if($db->connect_errno) {
  echo '<script>console.log(failed to connect to MySQL:' . $db->connect_error . ');</script>';
}  else {
  $dbOk = true;
  echo "<script>console.log(connected to db!);</script>";
}

// check for input:
$havePost = isset($_POST["save"]);

// If we just got input:
if($havePost) {
  echo '<script>console.log(`';
  echo  print_r($_POST);
  echo ' `);</script>'; 
  $title = htmlspecialchars(trim($_POST["title"]));
  $year = htmlspecialchars(trim($_POST["year"]));

  $errors = '';
  if($title == '') {
    $errors .= '<li>Title may not be blank</li>';
  }
  if($year == '') {
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

      echo "Proceding to input input to table";

      $titleInput = trim($_POST["title"]);
      $yearInput = trim($_POST["year"]);
      $insQuery = "INSERT INTO movies (title, year) VALUES (?, ?)";
      $statement = $db->prepare($insQuery);
      $statement->bind_param("ss", $title, $year);
      $statement->execute();
      echo '<div class="messages"><h4>Success: ' . $statement->affected_rows . ' movie added to database.</h4>';
         echo $titleInput . ', came out in ' . $yearInput . '</div>';
      $statement->close();
    } else {
      echo '$dbOk not true!';
    }
   }
}

// gay

?>


<p>Build the movie forms and output here.</p>

<form id="addForm" name="addForm" action="movies.php" method="post" onsubmit="return validateMovieForm(this);">
  <fieldset>
    <!-- <h1>This is where the form is.</h1> -->
    <label class="field" for="title">Title:</label>
    <input type="text" name="title" value="<?php if ($havePost && $errors != '') { echo $title; } ?>">
    <label class="field" for="year">Year:</label>
    <input type="text" name="year" value="<?php if ($havePost && $errors != '') { echo $year; } ?>">
    <input type="submit" name="save" value="Submit">
  </fieldset>
</form>



<h3>Movies</h3>

<table id="movieTable">
  <?php
    // load the db
    if($dbOk) {
                            /// GRAYDON!!!: Finish parsing this, figure out how tables work, then get back to allowing the inputting of new movies
      echo '<script>console.log("Movies:");</script>';
      $data = $db->query("SELECT * FROM movies ORDER BY title");
      $size = $data->num_rows;
      // echo '<script>console.log(`';
      // echo print_r($db);
      // echo '`);</script>';

      // construct table
      echo '<tr><th>Title</th><th>Year</th><th></th></tr>';
      for($i = 0; $i < $size; $i++) {
        $row = $data->fetch_assoc();
        if($i%2 == 0) {
          echo "\n" . '<tr id="movie">';
        } else {
          echo "\n" . '<tr class="odd" id="movie">';
        }
        echo '<td>' . htmlspecialchars($row['title']) . '</td>';
        echo '<td>' . htmlspecialchars($row['year']) . '</td>';
        echo '<td> <img src="resources/delete.png" class="deleteRow" width="16" height="16" alt="delete movie"/> </td>'; 
        echo "\n" . '</tr>';
      }
    }
  ?>
</table>

<?php include('includes/foot.inc.php'); 
  // footer info and closing tags
?>
