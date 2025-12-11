<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="text/javascript" src="../resources/jquery-3.6.1.min.js"></script>
    <title>Pet Net - Find Your New Best Friend</title>
    <script>
        const theme = localStorage.getItem('theme') || 'light';
        if (theme === 'dark') {
            document.documentElement.classList.add('dark-mode');
        }
    </script>
    <link rel="stylesheet" href="../resources/font_awesome/css/fontawesome.min.css">
    <link rel="stylesheet" href="../resources/font_awesome/css/all.min.css">
    <link rel="stylesheet" href="../styles.css">
    <link rel="stylesheet" href="./search.css">
    <script src="../settings.js" defer></script>
    <script src="search.js" defer></script>
</head>

<body>
<div class="site-container">
    <header  class="site-header">
        <div class="logo-container">
            <h1  class="logo-text">Pet Net</h1>
        </div>
        <nav class="main-nav">
            <ul>
                <li><a href="../index.html" class="active">Home</a></li>
                <li><a href="./index.html">Search</a></li>
                <li><a href="../about_page/index.html">About</a></li>
                <li><a href="../contact_page/index.html">Contact</a></li>
                <li><a href="../verify_page/index.html">Verify</a></li>
                <li><a href="../adopt_page/index.html" class="nav-button">Adopt Now</a></li>
            </ul>
        </nav>
    </header>

    <main class="main-content">
        <section class="hero">
            <h2>Find Your New Best Friend</h2>
            <p>Browse loving pets waiting for a home.</p>

            <div class="search-form-container">
            <form id="search-form" class="search-form">

                <div class="form-group">
                    <label style="align-self: center;" for="tag-group"><h3>Filter by tag, age, and more!</h3></label>
                    <div id="tag-group" class="form-column search-form">
                        <div class="form-group">
                            <div id="tag-group" class="inline-checkbox">
                                <input type="checkbox" id="all" name="all" value="1" <?php if(isset($_GET['all'])) echo 'checked'; ?>>
                                <label for="all">all</label>
                            </div>

                        </div>
                    </div>
                </div>


                <div id="other-group" class="search-form">
                <div class="form-group">
                    <label for="pet-type">Pet Type</label>
                    <select id="pet-type" name="type">
                        <option value="" <?php if(isset($_GET['type']) && $_GET['type'] === '') echo 'selected'; ?>>Any</option>
                        <option value="Cat" <?php if(isset($_GET['type']) && $_GET['type'] === 'Cat') echo 'selected'; ?>>Cat</option>
                        <option value="Dog" <?php if(isset($_GET['type']) && $_GET['type'] === 'Dog') echo 'selected'; ?>>Dog</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="pet-type">Breed</label>
                    <select id="pet-type" name="breed">
                        <option value="" <?php if(isset($_GET['type']) && $_GET['breed'] === '') echo 'selected'; ?>>Any</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="pet-age">Age</label>
                    <select id="pet-age" name="age">
                        <option value="" <?php if(isset($_GET['age']) && $_GET['age'] === '') echo 'selected'; ?>>Any</option>
                        <option value="0-1" <?php if(isset($_GET['age']) && $_GET['age'] === '0-1') echo 'selected'; ?>>0-1</option>
                        <option value="1-2" <?php if(isset($_GET['age']) && $_GET['age'] === '1-2') echo 'selected'; ?>>1-2</option>
                        <option value="2-5" <?php if(isset($_GET['age']) && $_GET['age'] === '2-5') echo 'selected'; ?>>2-5</option>
                        <option value="5-10" <?php if(isset($_GET['age']) && $_GET['age'] === '5-10') echo 'selected'; ?>>5-10</option>
                        <option value="10-15" <?php if(isset($_GET['age']) && $_GET['age'] === '10-15') echo 'selected'; ?>>10-15</option>
                        <option value="15+" <?php if(isset($_GET['age']) && $_GET['age'] === '15+') echo 'selected'; ?>>15+</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="sort-type">Sort By</label>
                    <select id="sort-type" name="sort-type">
                        <option value="" <?php if(isset($_GET['sort-type']) && $_GET['sort-type'] === '') echo 'selected'; ?>>Best Match</option>
                        <option value="age" <?php if(isset($_GET['sort-type']) && $_GET['sort-type'] === 'age') echo 'selected'; ?>>Age</option>
                        <option value="name" <?php if(isset($_GET['sort-type']) && $_GET['sort-type'] === 'name') echo 'selected'; ?>><i class="fa-solid fa-arrow-down-a-z"></i> Name</option>
                        <option value="breed" <?php if(isset($_GET['sort-type']) && $_GET['sort-type'] === 'breed') echo 'selected'; ?>><i class="fa-solid fa-arrow-down-a-z"></i> Breed</option>
                    </select>
                </div>
<!-- // size, weight, color, maintenance,  -->
                <div class="form-group">
                    <label for="sort-direction">Sort Direction</label>
                    <select id="sort-direction" name="sort-direction">
                        <option value="Ascending" <?php if(isset($_GET['sort-direction']) && $_GET['sort-direction'] === 'Ascending') echo 'selected'; ?>>Ascending</option>
                        <option value="Descending" <?php if(isset($_GET['sort-direction']) && $_GET['sort-direction'] === 'Descending') echo 'selected'; ?>>Descending</option>
                    </select>
                </div>


                <div class="form-group">
                    <label id="submit-label">&nbsp;</label>
                    <button type="submit" class="btn">Search</button>
                </div>

                <div class="form-group">
                    <label>&nbsp;</label>
                    <button style="background-color: rgb(170, 170, 170); border-color: rgb(170, 170, 170);" type="reset" value="reset" class="btn">Reset</button>
                </div>
            </div>
            </form>
            </div>
        </section>

        <section id="pet-grid" class="pet-grid">
        <!-- This is where our javascript will load our pets! -->
        <?php
        /*

        */
        ?>
        </section>
    </main>

    <footer class="site-footer">
        <p>&copy; 2025 Pet Net</p>
    </footer>
</div>

</body>
</html>