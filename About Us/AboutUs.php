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
<html>
    <head>
        <title>Polo Foto - About us</title>
        <link rel="stylesheet" href="AboutUs.css">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <script src="AboutUs.js" defer></script>
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
                chi siamo
            </span>
            <p>Polo Foto > About us</p> 
        </header>

        <section>
            <h1>Proprietario</h1>
            <div class="proprietario">
                <div class="info1">
                    <p class="nome">Elia Episcopo<br></p>
                    <p class="citta">Venezia - 15/03/1994 <br></p>
                </div>
                <img class="foto" src="../immagini/Elia.jpg">
            </div>
            <button>Scopri i fotografi</button>

            <div id="player"></div>
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