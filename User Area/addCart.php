<?php
    require_once '../Log/logcheck.php';
    if(!isset($_SESSION["usernamelog"])){
        header("Location: ../Log/login.php");
        exit;
    }
    $conn = mysqli_connect($dbcredentials['host'], $dbcredentials['user'], $dbcredentials['password'], $dbcredentials['name']) or die(mysqli_error($conn));
    if(logcheck()){
        $user=$_SESSION["usernamelog"];
        $stampa = mysqli_real_escape_string($conn, $_POST["stampa"]);
        $query1="INSERT INTO CARRELLO (ID_CARRELLO, stampa, utente) VALUES ('0', '$stampa', '$user')";
        $query2 = "SELECT * FROM CARRELLO C join STAMPA S on C.stampa=S.id JOIN FOTO F on S.foto = F.id WHERE s.id='$stampa'and utente='$user' order by C.ID_CARRELLO desc limit 1";
        $res = mysqli_query($conn, $query1);
        if($res){
            
            $res = mysqli_query($conn, $query2);
            $item = array();
            while($row = mysqli_fetch_array($res, MYSQLI_ASSOC)){
            $item[] = $row;
            }
            if (mysqli_num_rows($res) >0) {
                $array=['items'=>$item];
                echo json_encode($array);
                mysqli_close($conn);
            exit;
            }
        }
        mysqli_close($conn);
    }
?>