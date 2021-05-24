<?php
    require_once '../Log/logcheck.php';
    if(!isset($_SESSION["usernamelog"])){
        header("Location: ../Log/login.php");
        exit;
    }
    $conn = mysqli_connect($dbcredentials['host'], $dbcredentials['user'], $dbcredentials['password'], $dbcredentials['name']) or die(mysqli_error($conn));
    if(logcheck()){
        $user=$_SESSION["usernamelog"];
        $query="SELECT * FROM utente WHERE username='$user'";
        $res = mysqli_query($conn, $query);
        if(mysqli_num_rows($res)){
            $values=mysqli_fetch_assoc($res);
            echo json_encode($values);
        }
    }
?>