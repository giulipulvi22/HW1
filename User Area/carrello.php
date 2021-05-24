<?php
    require_once '../Log/logcheck.php';
    if(!isset($_SESSION["usernamelog"])){
        header("Location: ../Log/login.php");
        exit;
    }
    $conn = mysqli_connect($dbcredentials['host'], $dbcredentials['user'], $dbcredentials['password'], $dbcredentials['name']) or die(mysqli_error($conn));
    if(logcheck()){
        $user=$_SESSION["usernamelog"];
        $query="SELECT * FROM CARRELLO C join STAMPA S on C.stampa=S.id JOIN FOTO F on S.foto = F.id WHERE utente='$user'";
        $res = mysqli_query($conn, $query);
        $item = array();
            while($row = mysqli_fetch_array($res, MYSQLI_ASSOC)){
            $item[] = $row;
        }
        if ($res) {
            $array=['items'=>$item];
            echo json_encode($array);
            mysqli_close($conn);
            exit;
        }
    }
?>