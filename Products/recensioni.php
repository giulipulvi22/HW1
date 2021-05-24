<?php
    require_once '../Log/logcheck.php';
    $conn = mysqli_connect($dbcredentials['host'], $dbcredentials['user'], $dbcredentials['password'], $dbcredentials['name']) or die(mysqli_error($conn));
    $foto=$_GET['t'];
    $query="SELECT r.voto as voto, r.testo as testo, a.utente as utente, st.altezza as altezza, st.larghezza as larghezza, st.materiale as materiale FROM RECENSIONE r join SUPPORTO s on r.id=s.recensione join ACQUISTO a on s.acquisto=a.id join STAMPA st on a.stampa=st.id join foto f on st.foto=f.id WHERE f.id='$foto'";
    $res = mysqli_query($conn, $query);
    $item = array();
        while($row = mysqli_fetch_array($res, MYSQLI_ASSOC)){
        $item[] = $row;
    }
    $array=['items'=>$item];
    echo json_encode($array);
    mysqli_close($conn);
    exit;
    
?>