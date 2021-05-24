<?php
require_once '../Log/logcheck.php';
$conn = mysqli_connect($dbcredentials['host'], $dbcredentials['user'], $dbcredentials['password'], $dbcredentials['name']) or die(mysqli_error($conn));

if(logcheck()){
    $user=$_SESSION["usernamelog"];
    $query="SELECT u.username FROM utente u JOIN proprietario p ON u.username=p.username WHERE u.username='$user'";
    $res = mysqli_query($conn, $query);
    if(mysqli_num_rows($res) > 0){
        $proprietario=$user;
    }
}
?>
<!DOCTYPE html>
    <html>
        <head>
            <title>Polo Foto - Dove Siamo</title>
            <link rel="stylesheet" href="doveSiamo.css">
            <meta name="viewport" content="width=device-width,initial-scale=1.0">
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">
            <script src="doveSiamo.js" defer></script>
            <script src='http://www.bing.com/api/maps/mapcontrol?callback=GetMap' async defer></script>
        </head>


    <body>
        <header>
            <nav>
                <span id="nome">
                    Polo Foto
                </span>

                <div id="link">
                    <a href="../Products/Products.php">Products</a>
                    <a href="../ScattaConNoi/scattaConNoi.php">Scatta con noi</a>
                    <a href="../About Us/AboutUs.php">About Us</a>
                    <a href="../DoveSiamo/doveSiamo.php">Dove siamo</a>
                    <?php 
                        if(!isset($_SESSION["usernamelog"])){
                            echo '<a href="../Log/login.php">Login</a>';
                        }
                        else{
                            echo '<a href="../Log/logout.php">Logout</a>';
                            if(isset($proprietario)){
                                echo '<a href="../Proprietario/homeProprietario.php"><img src="../immagini/user.png"></a>';
                            }
                            else{
                                echo '<a href="../User Area/userArea.php"><img src="../immagini/user.png"></a>';
                            }
                        }
                        ?> 
                </div>

                <div id="menu">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </nav>
            <span id="intestazione">
                vieni a trovarci
            </span>
            <p>Polo Foto > Dove siamo</p> 
        </header>

        <section>
            <h4>Noi siamo qui!</h4>
            <div id="info">
                <div id="map"></div>
            </div>  
        </section>

        <footer>
            <span id="utils">
                created by <br>
                Giulia Pulvirenti <br>
                O46002059
            </span>
            <div class="logo">
                <img src="../immagini/logo.png">
                <p>Polo Foto</p>
            </div>
        </footer>
    </body>
</html>