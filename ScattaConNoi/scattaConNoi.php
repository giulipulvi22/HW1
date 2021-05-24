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
            <title>Polo Foto - Scatta con noi</title>
            <link rel="stylesheet" href="ScattaConNoi.css">
            <meta name="viewport" content="width=device-width,initial-scale=1.0">
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">
            <script src="ScattaConNoi.js" defer></script>
            <script src='http://www.bing.com/api/maps/mapcontrol' async defer></script>
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
                programma le tue foto
            </span>
            <p>Polo Foto > Home > Scatta con noi</p> 
        </header>

        <section>
            <span class="introduzione">
                Miriam Monti e Salvo Storti sono due dei fotografi che lavorano qui in Polo Foto offrendoci 
                una vasta gamma di foto, disponibili nella sezione "Products" del nostro sito. <br>
                I loro generi preferiti sono rispettivamente paesaggistica e astrofotografia e, entrambe le categorie,
                sono tuttavia caratterizzate da un attento studio delle condizioni ambientali e dei fattori esterni,
                fondamentali per raggiungere e riprodurre gli obiettivi prefissati. È per questo motivo che hanno deciso
                di offire la loro esperienza e le loro conoscenze per fornire delle linee guida su come comportarsi sul campo,
                le decisioni da prendere in base alle condizioni esterne, dispensando ottimi consigli.
            </span>
            <div id="player"></div>
            <span class="introduzione">
                Questa sezione permette di ottenere informazioni utili per programmare una sessione fotografica in un dato giorno a una data ora.  
            </span>
            <form>
                <input type="text" id="citta" placeholder="Torino">
                <input type="date" id="data">
                <input type="submit" id="submit" value="find">
            </form>


            <article>
            </article>
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