<?php
require_once '../Log/logcheck.php';
$conn = mysqli_connect($dbcredentials['host'], $dbcredentials['user'], $dbcredentials['password'], $dbcredentials['name']) or die(mysqli_error($conn));
if(logcheck()){
    $user=$_SESSION["usernamelog"];
    $proprietario=$user;
    $query="SELECT u.username FROM utente u JOIN proprietario p ON u.username=p.username WHERE u.username='$user'";
    $res = mysqli_query($conn, $query);
    if(mysqli_num_rows($res) == 0){
        header("Location: ../User Area/userArea.php");
        exit;
    }
}
if(!isset($_SESSION["usernamelog"])){
    header("Location: ../Log/login.php");
    exit;
}

?>
<html>
    <head>
        <title>Polo Foto - Management Area</title>
        <link rel="stylesheet" href="homeProprietario.css">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">
        <script src="homeProprietario.js" defer></script>
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
            Management Area
        </span>
        <p>Polo Foto > Management Area</p> 
    </header>
        
    <section>
        <ul>
        <li><a href="#fotografi">Fotografi</a></li>
        <li><a href="#foto">Foto</a></li>
        <li><a href="#stampe">Stampe</a></li>
        </ul>
        <article data-type="fotografi">
        <div id='form1' class="hidden">
        <form name='caricaFotografo' method='post' enctype="multipart/form-data" action="dataManagement.php?q=addFo">
                <input type="text" name="nome" placeholder="Nome">
                <input type="text" name="cognome" placeholder="Cognome">
                <input type="text" name="citta" placeholder="Città di nascita">
                <input type="date" name="datan" placeholder="Data di nascita">
                <input type="text" name="cf" placeholder="Codice fiscale">
                <input type="date" name="datai" placeholder="Data inizio">
                <input type="text" name="fb" placeholder="Facebook">
                <input type="text" name="ig" placeholder="Instagram">
                <input type="text" name="sp" placeholder="Spotify">
                <input type="file" name="propic">
                <input type="submit" id="button1" value="Invia">
            </form>
            </div>
        </article>
        <article data-type="foto">
            <div id='form2'class="hidden">
                <form name='caricaFoto' method='post' enctype="multipart/form-data" action="dataManagement.php?q=addF">
                <input type="date" name="data" placeholder="Data scatto">
                <input type="text" name="descrizione" placeholder="Descrizione">
                <select id="cfFotografo" name="cfFotografo" placeholder="Foto"></select>
                <input type="text" name="genere" placeholder="Genere">
                <input type="text" name="titolo" placeholder="Titolo">
                <input type="file" name="foto">
                <input type="submit" id="button2" value="Invia">
                </form>
        </div>
        </article>
        <article data-type="stampe">
            <div id='form3' class="hidden">
                <input type="number" name="altezza" step="0.01" min="0" placeholder="Altezza">
                <input type="number" name="larghezza" step="0.01" min="0" placeholder="Larghezza">
                <input type="text" name="materiale" placeholder="Materiale">
                <input type="number" name="prezzo" step="0.01" min="0" placeholder="Prezzo">
                <select id="idFoto" name="idFoto" placeholder="Foto"></select>
                <button id="button3">Invia</button>
            </div>
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