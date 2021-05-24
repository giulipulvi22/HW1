<?php

require_once 'logcheck.php';
$conn = mysqli_connect($dbcredentials['host'], $dbcredentials['user'], $dbcredentials['password'], $dbcredentials['name']) or die(mysqli_error($conn));
if(logcheck()){
    $user=$_SESSION["usernamelog"];
    $query="SELECT u.username FROM utente u JOIN proprietario p ON u.username=p.username WHERE u.username='$user'";
    $res = mysqli_query($conn, $query);
    if(mysqli_num_rows($res) > 0){
        header("Location: ../Proprietario/homeProprietario.php");
        exit;
    }
    else{
        header("Location: ../User Area/userArea.php");
        exit;
    }

    
}

if(!empty($_POST["nome"]) && !empty($_POST["cognome"]) && !empty($_POST["data"]) && !empty($_POST["citta"]) && !empty($_POST["email"]) && !empty($_POST["username"]) && !empty($_POST["password"]) && !empty($_POST["confpassword"])){
     


    //check data
    $birth = new DateTime($_POST['data']);
    $now = new DateTime();
    $interval = $now->diff($birth);
    $eta = $interval->y;
    if($eta>16){
        $data=$_POST['data'];
         
    }
    else{
        $error=1;
    }


    //check username
    if(!preg_match('/^[a-zA-Z0-9]{1,16}$/', $_POST['username'])){
        $error=1;
    }
    else{
        $username = mysqli_real_escape_string($conn, $_POST['username']);

        $query="SELECT username FROM utente WHERE username = '$username'";
        $res = mysqli_query($conn, $query);
        if(mysqli_num_rows($res) > 0){
           $error=1;
        }
    }

    //check password
    if (strlen($_POST["password"]) < 8) {
        $error=1;
    }



    //check email
    if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $error=1;
    } else {
         ;
        $email = mysqli_real_escape_string($conn, strtolower($_POST['email']));
        $res = mysqli_query($conn, "SELECT email FROM utente WHERE email = '$email'");
        if (mysqli_num_rows($res) > 0) {
           $error=1;
        }
    }

    //insert dati sign up
    if ($error == 0) {
        $nome = mysqli_real_escape_string($conn, $_POST['nome']);
        $cognome = mysqli_real_escape_string($conn, $_POST['cognome']);
        $citta = mysqli_real_escape_string($conn, $_POST['citta']);
        $password = mysqli_real_escape_string($conn, $_POST['password']);
        $password = password_hash($password, PASSWORD_BCRYPT);

        $query = "INSERT INTO utente (nome, cognome, datanascita, citta, email, username, pswd) VALUES('$nome', '$cognome', '$data', '$citta', '$email', '$username', '$password')";

        if (mysqli_query($conn, $query)) {
            $query="SELECT username FROM PROPRIETARIO WHERE username = '$username' AND nome='$nome' AND cognome='$cognome'";
            $res = mysqli_query($conn, $query);
            if(mysqli_num_rows($res) > 0){
                $_SESSION["usernamelog"] = $_POST["username"];
                mysqli_close($conn);
                header("Location: ../Proprietario/homeProprietario.php");
            exit;
            }else{
                $_SESSION["usernamelog"] = $_POST["username"];
                mysqli_close($conn);
                header("Location: ../User Area/userArea.php");
                exit;
            }

        } else {
            echo mysqli_error($conn);
            $error=1;
        }
    }

    mysqli_close($conn);
}
else if (isset($_POST["username"])) {
    $error=1;
    $errore='Compilare correttamente tutti i campi.';
}
?>

<html>
    <head>
    <title>Sign Up</title>
    <link rel="stylesheet" href="login.css">
    <script src="login.js" defer></script>
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">
</head>
<body>
    <div id="singUp">
        <div id="logo">
            <img src="../immagini/logo.png">
        </div>
        <div id="info">
            <h1>Benvenuto su Polo Foto</h1>
            <span>Sei già registrato? <a href="login.php"> Accedi!</a></span>
        </div>
    </div>
    <form action="registrazione.php" name="registrazione" id="registrazione" method="POST">
        <div>
            <input type="text" name="nome" placeholder="nome" <?php if(isset($_POST["nome"])){echo "value=".$_POST["nome"];} ?>>
            <span></span>
        </div>

        <div>
        <input type="text" name="cognome" placeholder="cognome" <?php if(isset($_POST["cognome"])){echo "value=".$_POST["cognome"];} ?>> <span>
        </span> </div>
        <div>
        <input type="data" name="data" placeholder="data di nascita" onfocus="(this.type='date')" onblur="(this.type='text')" <?php if(isset($_POST["data"])){echo "value=".$_POST["data"];} ?>>
        <span></span>
        </div>
        <div>
        <input type="text" name="citta" placeholder="città di nascita" <?php if(isset($_POST["citta"])){echo "value=".$_POST["citta"];} ?>>
        <span></span>
        </div>
        <div>
        <input type="text" name="email" placeholder="email" <?php if(isset($_POST["email"])){echo "value=".$_POST["email"];} ?>> <span>
        </span>
        </div>
        <div>
            <input type="text" name="username" placeholder="username" <?php if(isset($_POST["username"])){echo "value=".$_POST["username"];} ?>>
            <span> </span>
        </div>
        <div>
        <input type="password" name="password" placeholder="password" <?php if(isset($_POST["password"])){echo "value=".$_POST["password"];} ?>>
        <span> </span>    
    </div>
    <div>
        <input type="password" name="confpassword" placeholder="conferma password" <?php if(isset($_POST["confpassword"])){echo "value=".$_POST["confpassword"];} ?>>
        <span></span>    
    </div>
    <div id="invio">
        <span>
        <?php if(isset($errore)){echo $errore;}?>
        </span><input type="submit" value="Registrati" id="submit">
    </div>
    </form>
</body>
</html>