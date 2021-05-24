<?php
    require_once '../Log/logcheck.php';
    if(!isset($_SESSION["usernamelog"])){
        header("Location: ../Log/login.php");
        exit;
    }
    $conn = mysqli_connect($dbcredentials['host'], $dbcredentials['user'], $dbcredentials['password'], $dbcredentials['name']) or die(mysqli_error($conn));
    if(logcheck()){
        $user=$_SESSION["usernamelog"];
        $query="SELECT r.voto as voto, r.testo as testo, st.materiale as materiale, st.prezzo as prezzo, st.larghezza as larghezza, st.altezza as altezza, f.titolo as titolo FROM RECENSIONE r join SUPPORTO s on r.id=s.recensione join ACQUISTO a on s.acquisto=a.id join STAMPA st on a.stampa=st.id join foto f on st.foto=f.id WHERE a.utente='$user'";
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