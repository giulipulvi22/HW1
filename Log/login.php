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

    if(!empty($_POST["username"]) && !empty($_POST["password"])){
        $username = mysqli_real_escape_string($conn, $_POST['username']);
        $password = mysqli_real_escape_string($conn, $_POST['password']);

        $changeInput = filter_var($username, FILTER_VALIDATE_EMAIL) ? "email" : "username";

        $query = 'SELECT username, pswd FROM utente WHERE '.$changeInput.' = "'.$username.'"';
        $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
        if(mysqli_num_rows($res)>0){
            $values = mysqli_fetch_assoc($res);
            if(password_verify($_POST['password'], $values['pswd'])){
                $_SESSION["usernamelog"]=$values["username"];
                $user=$_SESSION["usernamelog"];
                $query="SELECT u.username FROM utente u JOIN proprietario p ON u.username=p.username WHERE u.username='$user'";
                $res = mysqli_query($conn, $query);
                if(mysqli_num_rows($res) > 0){
                    header("Location: ../Proprietario/homeProprietario.php");
                    mysqli_free_result($res);
                    mysqli_close($conn);
                    exit;
                }
                else{
                    header("Location: ../User Area/userArea.php");
                    mysqli_free_result($res);
                    mysqli_close($conn);
                    exit;
                }
            }
        }

        $error="Username o password errati.";
    }
    else if(isset($_POST["username"]) || isset($_POST["password"])){
        $error = "Riempi tutti i campi.";
    }
?>
<html>
    <head>
    <title>Login</title>
    <link rel="stylesheet" href="login.css">
    
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">
</head>
<body>
    <div id="singUp">
        <div id="logo">
            <img src="../immagini/logo.png">
        </div>
        <div id="info">
            <h1>Bentornato su Polo Foto</h1>
            <span>Non sei registrato? <a href="registrazione.php"> Registrati!</a></span>
        </div>
    </div>
    <div id="space">
    <form action="login.php" name="registrazione" id="login" method="POST">
        <input type="text" name="username" placeholder="username o email">
        <input type="password" name="password" placeholder="password">
        <div id="invio">
        <span>
        <?php if(isset($error)){echo $error;}?>
        </span>
        <input type="submit" value="Accedi" id="submit">
        </div>
    </form>

    <div id="foto"></div>

    </div>
</body>

</html>