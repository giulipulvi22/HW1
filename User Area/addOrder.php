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
        $data = date('Y-m-d');
        $query1="INSERT INTO ACQUISTO (ID, stampa, utente, dataordine) VALUES ('0', '$stampa', '$user', '$data')";
        $query2 = "SELECT *, C.ID as ID_ACQUISTO FROM ACQUISTO C join STAMPA S on C.stampa=S.id JOIN FOTO F on S.foto = F.id WHERE s.id='$stampa'and utente='$user' order by C.ID desc limit 1";
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