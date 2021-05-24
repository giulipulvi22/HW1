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
        <title>Polo Foto - Products</title>
        <link rel="stylesheet" href="products.css">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">
        <script src="products.js" defer></script>
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
                    le nostre foto
                </span>
                <p>Polo Foto > Products</p> 
            </header>

        <section>
            <div id="filtri">
            <div id="fltr">
                <div id="gmin">
                    <h4 id="filtro">Grandezza minima</h4>
                    <p data-gmin="20">20cm</p>
                    <p data-gmin="60">60cm</p>
                    <p data-gmin="100">100cm</p>
                </div>
                <div id="gmax">
                    <h4 id="filtro">Grandezza massima</h4>
                    <p data-gmax="50">50cm</p>
                    <p data-gmax="100">100cm</p>
                    <p data-gmax="200">200cm</p>
                </div>
                <div id="pmin">
                    <h4 id="filtro">Prezzo minimo</h4>
                    <p data-pmin="20">20eur</p>
                    <p data-pmin="45">45eur</p>
                    <p data-pmin="60">60eur</p>
                </div>
                <div id="pmax">
                    <h4 id="filtro">Prezzo Massimo</h4>
                    <p data-pmax="50">50eur</p>
                    <p data-pmax="100">100eur</p>
                    <p data-pmax="200">200eur</p>
                </div>
            </div>

            <input type="text" id="barra" placeholder="Cerca" onkeyup="find()">

            </div>
            <article>
            </article>

            <div id="carrello" class="hidden">
                <h5>Articoli nel carrello</h5>
                <div id="elementi"></div>
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