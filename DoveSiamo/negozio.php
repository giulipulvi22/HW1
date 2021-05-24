<?php
    require_once '../Log/logcheck.php';
    $conn = mysqli_connect($dbcredentials['host'], $dbcredentials['user'], $dbcredentials['password'], $dbcredentials['name']) or die(mysqli_error($conn));
    $query="SELECT * FROM NEGOZIO n join PROPRIETARIO p on n.proprietario=p.username";
    $res = mysqli_query($conn, $query);
    $row = mysqli_fetch_assoc($res);
    echo json_encode($row);
    mysqli_close($conn);
    exit;
    
?>